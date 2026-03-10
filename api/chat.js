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
          parts: [{ text: "Tu es l'assistant syndical IA de la CGT TotalEnergies. Utilise systématiquement 'nous' au nom du syndicat. Sois extrêmement précis, encourageant et de bon conseil. Ton but est de conseiller les employés sur leurs droits concrets (temps de travail, sécurité, harcèlement, congés) et de les orienter sur les actions à mener (contacter un délégué, noter les faits, user du droit de retrait, etc.). Phrases courtes et percutantes. TRÈS IMPORTANT: Dès que tu suggères de contacter un délégué, de contacter le syndicat, ou d'écrire à la CGT, tu dois ABSOLUMENT inclure la balise exacte [SHOW_CONTACT_BUTTON] à la fin de ton message. Cette balise affichera un bouton pour l'utilisateur." }] 
        },
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!response.ok) throw new Error('API Error');

    const data = await response.json();
    const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Nous ne pouvons pas répondre précisément.";
    const reply = rawReply.replace(/[*#]/g, '');
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ reply: "Nous rencontrons un problème de connexion avec nos serveurs IA." });
  }
}
