import nodemailer from "nodemailer";
import { redis } from "../../utils/upstashClient";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, description } = req.body;
  if (!email || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const caseNumber = await redis.incr("caseCounter");
    const newCase = {
      id: caseNumber.toString(),
      email,
      description,
      status: "Ny",
    };
    await redis.rpush("cases", JSON.stringify(newCase));

    const prompt = `
    Du er en autorisert elektriker. Gi trygge, konkrete råd basert på problemet:
    ${description}
    Gi en kort forklaring, sikkerhetsråd og om kunden bør kontakte elektriker.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du er en hjelpsom elektriker-assistent." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    });

    const aiAdvice = response.choices[0].message.content;

    const kontaktLink = `https://dittdomene.no/kontakt-oss?saknummer=${caseNumber}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Elråd - Sak ${caseNumber}</h2>
        <p><strong>Saksnummer:</strong> ${caseNumber}</p>
        <p><strong>AI-råd:</strong></p>
        <p>${aiAdvice}</p>
        <hr />
        <a href="${kontaktLink}" style="display:inline-block;margin-top:20px;padding:12px 20px;background:#0070f3;color:#fff;text-decoration:none;border-radius:8px;">
          Trenger du fortsatt hjelp? Få personlig veiledning fra en autorisert elektroinstallatør.
        </a>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Elråd" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Bekreftelse - Sak ${caseNumber}`,
      html: htmlContent,
    });

    return res.status(200).json({ message: "E-post sendt", caseNumber });
  } catch (error) {
    console.error("Feil ved sending av e-post:", error);
    return res.status(500).json({ error: "Kunne ikke sende e-post" });
  }
}