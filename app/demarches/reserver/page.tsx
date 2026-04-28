import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer, Header } from "../../components/site-chrome";
import { ReservationForm } from "./reservation-form";

export const metadata: Metadata = {
  title: "Réserver une session — SachaRbone Démarches",
  description:
    "Réservez votre session d'aide aux démarches administratives à domicile. Réponse sous 24h ouvrées. Aucun engagement à la réservation.",
};

export default function ReservationPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream">
      <Header />
      <section className="bg-navy px-5 pb-16 pt-32 text-cream md:px-8 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-silver/82">Accueil &gt; SachaRbone Démarches &gt; Réserver</p>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-silver">
            PÔLE SACHARBONE DÉMARCHES
          </p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight text-cream md:text-6xl">
            Réservez votre session
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/82">
            Quelques informations et nous revenons vers vous sous 24h ouvrées. Aucun engagement à ce stade.
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="bg-cream px-5 py-20 text-center text-navy">Chargement du formulaire...</div>}>
        <ReservationForm />
      </Suspense>
      <Footer />
    </main>
  );
}
