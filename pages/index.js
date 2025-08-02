import { useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const description = e.target.problem.value;
    const boenhet = e.target.boenhet.value;
    const aarstall = e.target.aarstall.value;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, description, boenhet, aarstall }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Det oppstod en feil. Prøv igjen.');
      }
    } catch (error) {
      console.error('Feil ved sending:', error);
      alert('En uventet feil oppstod.');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="bg-white shadow p-6 rounded-xl max-w-2xl w-full mt-6 text-gray-800">
        {!submitted ? (
          <>
            {/* Overskrift */}
            <h1 className="text-3xl font-bold mb-3 text-center">
              Velkommen til Elråd – din digitale elektroassistent
            </h1>

            {/* Introduksjon */}
            <p className="text-center text-gray-600 mb-6">
              Hos Elråd hjelper vi deg med å løse problemer knyttet til ditt elektriske anlegg på en enkel og trygg måte.
              Vår løsning kombinerer kunstig intelligens og ekte fagkompetanse for å gi deg raske og presise råd.
            </p>

            {/* Grå boks med steg-for-steg */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6 text-sm">
              <h2 className="font-semibold mb-2">Hvordan fungerer Elråd.no?</h2>
              <p>
                <strong>Steg 1:</strong> Fyll ut skjemaet på forsiden og beskriv problemet ditt. Vår elektro-AI analyserer informasjonen og gir deg råd og veiledning med en gang.
              </p>
              <p className="mt-2">
                <strong>Steg 2:</strong> Hvis problemet ikke blir løst, kan en av våre kvalifiserte fagpersoner – autorisert installatør og elektriker – ta kontakt. Du får da en profesjonell vurdering om problemet kan løses av deg selv, eller om en autorisert elektriker må utføre arbeidet. Ved behov kan vi også gi deg et prisestimat fra Elråd.no for jobben.
              </p>
              <p className="mt-2">
                <strong>Steg 3:</strong> Elråd.no kontakter en lokal elektrikerbedrift og videreformidler all relevant informasjon, inkludert prisestimat. Din lokale elektriker tar deretter kontakt for å gi et konkret tilbud og avtale utførelsen.
              </p>
            </div>

            {/* Skjema */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                name="problem"
                className="w-full border p-3 rounded text-sm"
                placeholder="Beskriv problemet ditt..."
                required
                rows="4"
              />
              <input
                name="boenhet"
                type="text"
                className="w-full border p-3 rounded text-sm"
                placeholder="Hvilken type boenhet?"
                required
              />
              <input
                name="aarstall"
                type="text"
                className="w-full border p-3 rounded text-sm"
                placeholder="Årstall for elektroinstallasjonen"
                required
              />
              <input
                name="email"
                type="email"
                className="w-full border p-3 rounded text-sm"
                placeholder="E-postadresse"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold py-3 rounded-lg text-md mt-2"
              >
                {loading ? 'Sender...' : 'SEND INN'}
              </button>
            </form>
          </>
        ) : (
          <p className="text-center font-semibold text-lg">
            Takk for innsendt skjema. Du vil snart motta en e-post fra vår elektro-AI med råd og veiledning.
          </p>
        )}
      </div>
    </Layout>
  );
}
