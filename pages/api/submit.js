import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { navn, epost, beskrivelse } = req.body;

  if (!epost || !beskrivelse) {
    return res.status(400).json({ message: 'Epost og beskrivelse er påkrevd.' });
  }

  // Send rask respons til frontend slik at UI viser "Sendt" umiddelbart
  res.status(200).json({ success: true });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const subject = 'Takk for at du kontaktet Elråd';

    // E-post til kunden
    await transporter.sendMail({
      from: `"Elråd" <${process.env.SMTP_USER}>`,
      to: epost,
      subject,
      html: `<p>Hei ${navn || ''},</p>
             <p>Takk for at du kontaktet Elråd! Vi har mottatt meldingen din:</p>
             <blockquote>${beskrivelse}</blockquote>
             <p>Vi vil svare deg så snart som mulig.</p>`
    });

    // Kopi til Elråd
    await transporter.sendMail({
      from: `"Elråd Nettside" <${process.env.SMTP_USER}>`,
      to: 'post@elraad.no',
      subject: `Ny henvendelse fra ${navn || 'kunde'}`,
      html: `<p>Navn: ${navn || 'Ikke oppgitt'}</p>
             <p>E-post: ${epost}</p>
             <p>Melding:</p>
             <blockquote>${beskrivelse}</blockquote>`
    });

    console.log('Eposter sendt til bruker og post@elraad.no');
  } catch (error) {
    console.error('Feil ved sending av epost:', error);
  }
}
