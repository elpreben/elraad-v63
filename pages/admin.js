import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setLoggedIn(true);
      fetchCases();
    } else {
      alert('Feil passord');
    }
  };

  const fetchCases = async () => {
    setLoading(true);
    const res = await fetch('/api/get-cases');
    const data = await res.json();
    setCases(data.cases || []);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await fetch('/api/update-case', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchCases();
  };

  if (!loggedIn) {
    return (
      <Layout>
        <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg mt-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Skriv inn passord"
            className="border w-full p-2 rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold w-full"
          >
            Logg inn
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg mt-8">
        <h1 className="text-2xl font-bold mb-4">Adminpanel</h1>
        {loading ? (
          <p>Laster saker...</p>
        ) : (
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Saksnr</th>
                <th className="border p-2">E-post</th>
                <th className="border p-2">Beskrivelse</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Oppdater</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((sak) => (
                <tr key={sak.id}>
                  <td className="border p-2">{sak.id}</td>
                  <td className="border p-2">{sak.email}</td>
                  <td className="border p-2">{sak.description}</td>
                  <td className="border p-2">
                    <select
                      value={sak.status}
                      onChange={(e) => updateStatus(sak.id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option>Ny</option>
                      <option>Under behandling</option>
                      <option>Fullført</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => updateStatus(sak.id, sak.status)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Lagre
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}