import Link from 'next/link';
import Layout from '../components/Layout';

export default function Om() {
  return (
    <Layout>
      <div className="bg-white shadow p-6 rounded-xl max-w-3xl w-full mt-4 text-gray-800">
        
        {/* Overskrift */}
        <h1 className="text-2xl font-bold mb-4 text-center">Om Elråd</h1>

        {/* Beskrivelse */}
        <p className="mb-4 text-base leading-relaxed text-center">
          Elråd er din digitale elektroassistent. Vi tilbyr trygg og pålitelig rådgivning knyttet til ditt elektriske anlegg.
          Vårt mål er å kombinere kunstig intelligens med solid fagkompetanse, slik at du får raske, presise og kostnadseffektive løsninger.
        </p>

        {/* Kompetanse */}
        <h2 className="text-lg font-semibold mb-2">Vår kompetanse</h2>
        <ul className="list-disc list-inside mb-6 text-sm">
          <li>Autorisert elektroinstallatør</li>
          <li>Gruppe L fagbrev (elektrikerfagbrevet)</li>
          <li>NEK 405-2-3 sertifisering for avhendingskontroll av bolig</li>
        </ul>
        <p>
          Vårt mål er å gjøre det enklere og tryggere for deg å håndtere elektriske problemer – enten det gjelder småfeil eller større installasjoner.
        </p>
      </div>
    </Layout>
  );
}
