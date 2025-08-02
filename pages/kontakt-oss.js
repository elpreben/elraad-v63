import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function KontaktOss() {
  const [saknummer, setSaknummer] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sn = params.get('saknummer');
    if (sn) setSaknummer(sn);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const melding = e.target.melding.value;

    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, saknummer, melding }),
    });

    alert('Din melding er sendt til Elråd.');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Kontakt oss</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="E-postadresse"
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="text"
            name="saknummer"
            value={saknummer}
            onChange={(e) => setSaknummer(e.target.value)}
            placeholder="Saksnummer (hvis tilgjengelig)"
            className="w-full border p-3 rounded"
          />
          <textarea
            name="melding"
            placeholder="Skriv din melding..."
            className="w-full border p-3 rounded"
            rows="5"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded font-bold w-full"
          >
            Send melding
          </button>
        </form>
      </div>
    </Layout>
  );
}