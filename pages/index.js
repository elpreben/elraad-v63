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
            <h1 className="text-3xl font-bold mb-4 text-center">
              Velkommen til Elråd – din digitale elektroassistent
            </h1>
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
            Takk for innsendt skjema. Du vil snart motta en e-post fra vår elektro-AI med råd og veiledning.
          </p>
        )}
      </div>
    </Layout>
  );
}