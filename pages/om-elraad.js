import Layout from '../components/Layout';

export default function OmElraad() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Om Elråd</h1>
        <p className="mb-4">
          Elråd drives av Preben Nygård, som har følgende kompetanse:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Sertifisert elektroinstallatør.</li>
          <li>Elektriker med gruppe L fagbrev.</li>
          <li>NEK 405-2-3 Avhendig bolig elektrokontrollør.</li>
        </ul>
        <p>
          Vårt mål er å gjøre det enklere og tryggere for deg å håndtere elektriske problemer – enten det gjelder småfeil eller større installasjoner.
        </p>
      </div>
    </Layout>
  );
}