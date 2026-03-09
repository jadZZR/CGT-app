export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST requis' });

  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ reply: "Désolé, nous n'avons pas configuré la clé API sur le serveur." });
  }

  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: message }] }],
        systemInstruction: { 
          parts: [{ text: "Tu es l'assistant syndical de la CGT TotalEnergies. Utilise systématiquement 'nous' au nom du syndicat. Phrases courtes et percutantes. Ton but est de conseiller sur les droits et la NAO." }] 
        },
        generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
      })
    });

    if (!response.ok) throw new Error('API Error');

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Nous ne pouvons pas répondre précisément.";
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ reply: "Nous rencontrons un problème de connexion avec nos serveurs IA." });
  }
}
