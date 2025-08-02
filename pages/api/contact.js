import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, saknummer, melding } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Elråd Kontakt" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Ny henvendelse fra kontakt-skjema (sak: ${saknummer || 'ingen'})`,
      html: `<p><strong>E-post:</strong> ${email}</p>
             <p><strong>Saksnummer:</strong> ${saknummer || 'Ikke oppgitt'}</p>
             <p><strong>Melding:</strong><br>${melding}</p>`,
    });

    return res.status(200).json({ message: 'Kontaktmelding sendt' });
  } catch (error) {
    return res.status(500).json({ error: 'Kunne ikke sende melding' });
  }
}