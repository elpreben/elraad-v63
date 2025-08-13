import { useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Vis "Sendt" umiddelbart

    const formData = new FormData(e.target);
    const plainFormData = Object.fromEntries(formData.entries());

    const sendToAPI = async (data) => {
      try {
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (error) {
        console.error('Feil ved sending til API:', error);
      }
    };

    const file = formData.get('bilde');
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        plainFormData.bilde = reader.result;
        sendToAPI(plainFormData);
      };
      reader.readAsDataURL(file);
    } else {
      sendToAPI(plainFormData);
    }
  };

  return (
    <Layout>
      <h1>Velkommen til Elråd</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="navn" placeholder="Navn" />
        <input type="email" name="epost" placeholder="Din e-post" required />
        <textarea name="beskrivelse" placeholder="Beskriv problemet" required />
        <input type="file" name="bilde" />
        <button type="submit">Send</button>
      </form>
      {submitted && <p>Meldingen din er sendt!</p>}
    </Layout>
  );
}
