export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ reply: "Method not allowed" });
  const message = String(req.body?.message || "").trim();
  if (!message) return res.status(400).json({ reply: "Message is empty." });

  // Keep the API key on Vercel/server side — never put it in index.html.
  if (!process.env.OPENAI_API_KEY) {
    return res.status(200).json({
      reply: "Demo mode ❤️ Vercel Settings → Environment Variables mein OPENAI_API_KEY add karne ke baad real AI reply chalega."
    });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6-luna",
        instructions: "You are a warm, respectful private AI companion for a couple's personal app. Reply briefly in the language the user uses. Do not claim to be a real human.",
        input: message
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ reply: "AI server error. Check your Vercel API settings." });
    return res.status(200).json({ reply: data.output_text || "❤️" });
  } catch {
    return res.status(500).json({ reply: "AI server error." });
  }
}
