"use client";

import Link from "next/link";
import { useState } from "react";

const formatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

function formatEuros(value: number) {
  return `${formatter.format(value)}\u00a0€`;
}

export default function CreditImpotCalculator() {
  const [heuresParMois, setHeuresParMois] = useState(5);

  const prixBrut = heuresParMois * 30;
  const creditImpot = prixBrut * 0.5;
  const resteACharge = prixBrut - creditImpot;
  const sliderPercent = ((heuresParMois - 1) / 19) * 100;

  return (
    <article className="mx-auto max-w-[700px] rounded-xl border border-navy/10 bg-white p-8 shadow-[0_4px_24px_rgba(26,35,64,0.08)] md:p-12">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">Simulateur</p>
        <h3 className="mt-3 font-heading text-2xl font-bold text-navy">
          Combien d'heures par mois souhaitez-vous ?
        </h3>
      </header>

      <div className="mt-9 text-center" aria-live="polite">
        <span className="font-heading text-7xl font-bold leading-none text-navy">{heuresParMois}</span>
        <span className="ml-1 font-heading text-5xl font-bold text-silver">h</span>
      </div>

      <div className="mt-8">
        <input
          aria-label="Nombre d'heures par mois"
          className="calculator-slider h-12 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
          type="range"
          min="1"
          max="20"
          step="1"
          value={heuresParMois}
          onChange={(event) => setHeuresParMois(Number(event.target.value))}
          style={{
            background: `linear-gradient(90deg, #1A2340 ${sliderPercent}%, rgba(26,35,64,0.16) ${sliderPercent}%)`,
          }}
        />
        <div className="mt-2 flex justify-between text-sm text-warm-gray">
          <span>1h</span>
          <span>20h</span>
        </div>
      </div>

      <div className="my-9 h-px bg-[#e5e5e5]" />

      <div className="grid gap-7 text-center md:grid-cols-3 md:text-left" aria-live="polite">
        <ResultColumn
          label="PRIX BRUT"
          value={formatEuros(prixBrut)}
          helper="à 30 € / h"
          valueClassName="font-sans text-3xl font-normal text-navy"
        />
        <ResultColumn
          label="CRÉDIT D'IMPÔT 50%"
          value={`−${formatEuros(creditImpot)}`}
          helper="remboursé par l'État"
          valueClassName="font-sans text-3xl font-normal text-[#2D7A4F]"
        />
        <ResultColumn
          label="RESTE À VOTRE CHARGE"
          value={formatEuros(resteACharge)}
          helper="soit 15 € / h après crédit d'impôt"
          labelClassName="font-bold text-navy"
          valueClassName="font-heading text-5xl font-bold text-navy md:text-6xl"
        />
      </div>

      <div className="my-9 h-px bg-[#e5e5e5]" />

      <p className="text-center text-xs italic leading-6 text-anthracite/60">
        Activité déclarée Services à la Personne. Avance immédiate URSSAF possible.
        Article 199 sexdecies du CGI.
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          href="/demarches/reserver"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-navy px-8 py-3 font-heading font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-anthracite focus-visible:bg-anthracite"
        >
          Réserver maintenant <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function ResultColumn({
  label,
  value,
  helper,
  labelClassName = "text-warm-gray",
  valueClassName,
}: {
  label: string;
  value: string;
  helper: string;
  labelClassName?: string;
  valueClassName: string;
}) {
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${labelClassName}`}>{label}</p>
      <p className={`mt-3 leading-none ${valueClassName}`}>{value}</p>
      <p className="mt-3 text-sm leading-6 text-anthracite/68">{helper}</p>
    </div>
  );
}
