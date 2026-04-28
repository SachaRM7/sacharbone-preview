"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type StoredReservation = {
  reference?: string;
  sessionLabel?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  desiredDate?: string;
};

export function ConfirmationContent() {
  const [reservation, setReservation] = useState<StoredReservation | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("sacharbone-demarches-reservation");
    if (!raw) return;
    try {
      setReservation(JSON.parse(raw) as StoredReservation);
    } catch {
      setReservation(null);
    }
  }, []);

  const reference = useMemo(
    () => reservation?.reference ?? `SR-DEM-${Math.floor(10000 + Math.random() * 90000)}`,
    [reservation?.reference],
  );

  return (
    <section className="bg-cream px-5 py-24 text-navy md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <CheckCircle2 className="mx-auto size-20 text-[#2D7A4F]" strokeWidth={1.5} />
        <h1 className="mt-8 font-heading text-4xl font-bold md:text-6xl">
          Demande envoyée avec succès.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-anthracite">
          Merci pour votre confiance. Nous reviendrons vers vous sous 24h ouvrées.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-navy/10 bg-[#fbfbf8] p-8 shadow-[0_18px_48px_rgba(26,35,64,0.08)]">
          <h2 className="font-heading text-2xl font-bold text-navy">Récapitulatif de votre demande</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <SummaryRow label="Type de session" value={reservation?.sessionLabel ?? "Session standard (1h30, 45 €)"} />
            <SummaryRow
              label="Coordonnées"
              value={
                reservation?.firstName || reservation?.lastName
                  ? `${reservation.firstName ?? ""} ${reservation.lastName ?? ""}`.trim()
                  : "À compléter lors de notre appel"
              }
            />
            <SummaryRow label="Date souhaitée" value={reservation?.desiredDate || "À définir ensemble"} />
            <SummaryRow label="Numéro de référence" value={reference} />
          </dl>
        </article>

        <article className="rounded-xl border border-navy/10 bg-[#fbfbf8] p-8 shadow-[0_18px_48px_rgba(26,35,64,0.08)]">
          <h2 className="font-heading text-2xl font-bold text-navy">Prochaines étapes</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-anthracite">
            <li>Vous recevrez un email de confirmation à {reservation?.email ?? "[email]"}.</li>
            <li>Nous vous appellerons sous 24h au {reservation?.phone ?? "[téléphone]"}.</li>
            <li>Préparez vos documents (RIB, dernier avis d'imposition si crédit d'impôt).</li>
          </ul>
        </article>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-navy px-7 py-3 font-semibold text-navy transition hover:bg-navy hover:text-cream"
        >
          Retour à l'accueil
        </Link>
        <Link
          href="/#expertises"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-navy px-7 py-3 font-semibold text-cream transition hover:bg-anthracite"
        >
          Découvrir les autres pôles SachaRbone
        </Link>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-5 border-b border-navy/10 pb-3">
      <dt className="text-anthracite">{label}</dt>
      <dd className="text-right font-medium text-navy">{value}</dd>
    </div>
  );
}
