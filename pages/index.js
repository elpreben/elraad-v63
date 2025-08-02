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
      <div className="bg-white shadow p-4 rounded-xl max-w-2xl w-full mt-4 text-gray-800">
        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold mb-2 text-center">
              Velkommen til Elråd – din digitale elektroassistent
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Hvordan fungerer Elråd.no?
            </h2>
            <p className="mb-4 text-sm text-left">
              <strong>Steg 1:</strong> Fyll ut skjemaet på forsiden og beskriv problemet ditt. Vår elektro-AI analyserer informasjonen og gir deg råd og veiledning med en gang.
              <br /><br />
              <strong>Steg 2:</strong> Hvis problemet ikke blir løst, kan en av våre kvalifiserte fagpersoner – autorisert installatør og elektriker – ta kontakt. Du får da en profesjonell vurdering om problemet kan løses av deg selv, eller om en autorisert elektriker må utføre arbeidet. Ved behov kan vi også gi deg et prisestimat fra Elråd.no for jobben.
              <br /><br />
              <strong>Steg 3:</strong> Elråd.no kontakter en lokal elektrikerbedrift og videreformidler all relevant informasjon, inkludert prisestimat. Din lokale elektriker tar deretter kontakt for å gi et konkret tilbud og avtale utførelsen.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <textarea
                name="problem"
                className="w-full border p-2 rounded text-sm"
                placeholder="Beskriv problemet..."
                required
                rows="3"
              />
              <input
                name="boenhet"
                type="text"
                className="w-full border p-2 rounded text-sm"
                placeholder="Hvilken type boenhet?"
                required
              />
              <input
                name="aarstall"
                type="text"
                className="w-full border p-2 rounded text-sm"
                placeholder="Årstall for elektroinstallasjonen"
                required
              />
              <input
                name="email"
                type="email"
                className="w-full border p-2 rounded text-sm"
                placeholder="E-postadresse"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold py-2 rounded-lg text-sm mt-2"
              >
                {loading ? 'Sender...' : 'SEND INN'}
              </button>
            </form>
          </>
        ) : (
          <p className="text-center font-semibold text-md">
            Takk! Vi har sendt deg en e-post med AI-råd og mer informasjon.
          </p>
        )}
      </div>
    </Layout>
  );
}