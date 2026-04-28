import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos de SachaRbone — Sacha & Maria, les fondateurs",
};

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-cream px-5 py-24 text-navy md:px-8">
      <section className="mx-auto max-w-4xl rounded-xl border border-navy/10 bg-[#fbfbf8] p-8 shadow-[0_18px_48px_rgba(26,35,64,0.08)] md:p-12">
        <Link href="/" className="text-sm font-semibold text-navy hover:text-anthracite">
          Retour à SachaRbone
        </Link>
        <h1 className="mt-10 font-heading text-4xl font-bold md:text-6xl">
          À propos de SachaRbone
        </h1>
        <p className="mt-6 text-lg leading-8 text-anthracite">
          Sacha & Maria portent une marque familiale, sérieuse et chaleureuse,
          au service d'un accompagnement utile, clair et humain.
        </p>
      </section>
    </main>
  );
}
