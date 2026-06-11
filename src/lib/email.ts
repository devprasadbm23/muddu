"use server";

export async function sendNotificationEmail() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error("Missing RESEND_API_KEY or TO_EMAIL in environment variables.");
    return { success: false, error: "Email configuration missing" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Love Proposal <onboarding@resend.dev>",
        to: [toEmail],
        subject: "Muddu said YES! 💖💍",
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h1 style="color: #ff4a80;">She Said Yes! 💖</h1>
            <p style="font-size: 16px;">Congratulations! Muddu clicked the <strong>Yes</strong> button on your proposal page.</p>
            <p style="font-size: 14px; color: #666;">Sent at: ${new Date().toLocaleString()}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Resend API error: ${errText}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return { success: false, error: error.message };
  }
}
