import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function KontaktOss() {
  const [saknummer, setSaknummer] = useState('');

  // Autofyll saksnummer fra URL (?saknummer=123)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sn = params.get('saknummer');
    if (sn) setSaknummer(sn);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fulltNavn = e.target.fulltnavn.value;
    const telefonnummer = e.target.telefonnummer.value;
    const adresse = e.target.adresse.value;
    const postnummer = e.target.postnummer.value;
    const email = e.target.email.value;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fulltNavn,
          telefonnummer,
          adresse,
          postnummer,
          email,
          saknummer,
        }),
      });

      if (response.ok) {
        alert('Din melding er sendt til Elråd. Vi kontakter deg innen 48 timer.');
        e.target.reset();
        setSaknummer('');
      } else {
        alert('Det oppstod en feil. Prøv igjen.');
      }
    } catch (error) {
      console.error('Feil ved sending:', error);
      alert('En uventet feil oppstod.');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg mt-6">
        {/* Overskrift */}
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Kontakt oss
        </h1>

        {/* Info tekst */}
        <p className="text-center text-gray-700 text-base mb-6">
          Fyll ut skjema, og vi vil kontakte deg innen 48 timer på telefon.
          <br />
          <span className="text-sm text-gray-500">
            (Estimert avsatt tid: 10–15 minutter per samtale, Kr 50,- inkl. MVA)
          </span>
        </p>

        {/* Skjema */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fulltnavn"
            placeholder="Fullt navn"
            className="w-full border p-3 rounded text-sm"
            required
          />
          <input
            type="text"
            name="telefonnummer"
            placeholder="Telefonnummer"
            className="w-full border p-3 rounded text-sm"
            required
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            className="w-full border p-3 rounded text-sm"
            required
          />
          <input
            type="text"
            name="postnummer"
            placeholder="Postnummer"
            className="w-full border p-3 rounded text-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-postadresse"
            className="w-full border p-3 rounded text-sm"
            required
          />
          <input
            type="text"
            name="saknummer"
            value={saknummer}
            onChange={(e) => setSaknummer(e.target.value)}
            placeholder="Saksnummer (hvis tilgjengelig)"
            className="w-full border p-3 rounded text-sm"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold py-3 rounded-lg text-md mt-2"
          >
            SEND MELDING
          </button>
        </form>
      </div>
    </Layout>
  );
}
