import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function KontaktOss() {
  const [saknummer, setSaknummer] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const saknummerParam = urlParams.get('saknummer');
    if (saknummerParam) {
      setSaknummer(saknummerParam);
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Kontakt oss</h1>
        <form className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="E-postadresse"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="saknummer"
            placeholder="Saksnummer"
            value={saknummer}
            onChange={(e) => setSaknummer(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="melding"
            placeholder="Skriv din melding..."
            className="w-full border p-2 rounded"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
          >
            Send melding
          </button>
        </form>
      </div>
    </Layout>
  );
}