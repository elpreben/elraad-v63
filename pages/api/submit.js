import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { navn, epost, beskrivelse } = req.body;

  if (!epost || !beskrivelse) {
    return res.status(400).json({ message: 'Epost og beskrivelse er påkrevd.' });
  }

  // Send svar til klienten umiddelbart
  res.status(200).json({ success: true });

  // Send e-post i bakgrunnen
  setImmediate(async () => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      // Send e-post til bruker
      await transporter.sendMail({
        from: `"Elråd" <${process.env.SMTP_USER}>`,
        to: epost,
        subject: 'Takk for at du kontaktet Elråd',
        html: `<p>Hei ${navn || ''},</p>
               <p>Takk for at du kontaktet oss. Vi har mottatt meldingen din:</p>
               <blockquote>${beskrivelse}</blockquote>
               <p>Vi svarer deg så snart vi kan.</p>`
      });

      // Send kopi til post@elraad.no
      await transporter.sendMail({
        from: `"Elråd Nettside" <${process.env.SMTP_USER}>`,
        to: 'post@elraad.no',
        subject: `Ny henvendelse fra ${navn || 'kunde'}`,
        html: `<p>Navn: ${navn || 'Ikke oppgitt'}</p>
               <p>E-post: ${epost}</p>
               <p>Melding:</p>
               <blockquote>${beskrivelse}</blockquote>`
      });

      console.log('✅ E-post sendt til kunde og post@elraad.no');
    } catch (error) {
      console.error('❌ Feil ved sending av epost:', error);
    }
  });
}
