import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Espace prescripteurs — SachaRbone",
};

export default function PrescripteursPage() {
  return (
    <main className="min-h-screen bg-navy px-5 py-24 text-cream md:px-8">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-semibold text-cream/80 hover:text-cream">
          Retour à SachaRbone
        </Link>
        <h1 className="mt-10 font-heading text-4xl font-bold md:text-6xl">
          Espace prescripteurs
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/78">
          Médecin, pharmacien, CCAS, gardien d'immeuble : aidez vos publics fragiles.
        </p>
      </section>
    </main>
  );
}
