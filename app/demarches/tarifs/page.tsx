import type { Metadata } from "next";
import {
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  Check,
  CheckCircle,
  CreditCard,
  FileText,
  Shield,
  Ticket,
  Wallet,
  Zap,
} from "lucide-react";
import { FaqAccordion, type FaqItem } from "../../components/faq-accordion";
import { Footer, Header } from "../../components/site-chrome";

export const metadata: Metadata = {
  title:
    "Tarifs SachaRbone Démarches — Aide administrative à partir de 15€/h après crédit d'impôt",
  description:
    "Tarification claire et transparente pour l'aide aux démarches administratives à domicile. Session découverte 30€, session standard 45€, pack 5 sessions 135€. Crédit d'impôt 50%.",
};

type PriceLine = {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
};

type PricingCardProps = {
  tag: string;
  name: string;
  duration: string;
  hourlyPrice: string;
  details: PriceLine[];
  recap: string;
  features: string[];
  href: string;
  highlighted?: boolean;
};

const nbsp = "\u00a0";

const pricingCards: PricingCardProps[] = [
  {
    tag: "POUR DÉCOUVRIR",
    name: "Session découverte",
    duration: "1 heure",
    hourlyPrice: `15${nbsp}€ / h`,
    details: [
      { label: "Prix de la séance (1h)", value: `30${nbsp}€` },
      {
        label: "Crédit d'impôt 50%",
        value: `−15${nbsp}€`,
        valueClassName: "text-[#2D7A4F]",
      },
    ],
    recap: `= 15${nbsp}€ net après remboursement de l'État`,
    features: [
      "Évaluation complète de votre besoin",
      "Première session de démarche",
      "Mandat écrit fourni",
      "Charte de confidentialité remise",
    ],
    href: "/demarches/reserver?formule=decouverte",
  },
  {
    tag: "POUR DÉMARCHES MULTIPLES",
    name: "Session standard",
    duration: "1h30",
    hourlyPrice: `15${nbsp}€ / h`,
    details: [
      { label: "Prix de la séance (1h30)", value: `45${nbsp}€` },
      {
        label: "Crédit d'impôt 50%",
        value: `−22,50${nbsp}€`,
        valueClassName: "text-[#2D7A4F]",
      },
    ],
    recap: `= 22,50${nbsp}€ net après remboursement de l'État`,
    features: [
      "Tous les éléments de la session découverte",
      "Démarches multiples possibles dans une session",
      "Récapitulatif écrit envoyé après séance",
      "Suivi téléphonique pendant 7 jours",
      "Conseils personnalisés sur vos prochaines démarches",
    ],
    href: "/demarches/reserver?formule=standard",
    highlighted: true,
  },
  {
    tag: "POUR ACCOMPAGNEMENT DURABLE",
    name: "Pack 5 sessions",
    duration: "5 × 1 heure",
    hourlyPrice: `13,50${nbsp}€ / h`,
    details: [
      {
        label: "Pack de 5 sessions (5h)",
        value: (
          <span className="inline-flex flex-wrap items-center justify-end gap-2">
            <span className="text-warm-gray line-through">150{nbsp}€</span>
            <span>135{nbsp}€</span>
            <span className="rounded-full bg-[#dfeee6] px-2 py-0.5 text-xs font-semibold text-[#2D7A4F]">
              −10%
            </span>
          </span>
        ),
      },
      {
        label: "Crédit d'impôt 50%",
        value: `−67,50${nbsp}€`,
        valueClassName: "text-[#2D7A4F]",
      },
    ],
    recap: `= 67,50${nbsp}€ net après remboursement de l'État, soit 13,50${nbsp}€/h`,
    features: [
      "5 sessions à utiliser sur 6 mois maximum",
      "Sessions modulables (durée flexible 30 min à 2h)",
      "Suivi personnalisé entre les sessions",
      "Priorité sur la prise de rendez-vous",
      "Récapitulatif consolidé en fin de pack",
    ],
    href: "/demarches/reserver?formule=pack5",
  },
];

const creditBullets = [
  {
    icon: CheckCircle,
    text: "Notre activité est déclarée Services à la Personne (SAP), enregistrée auprès de l'État",
  },
  {
    icon: Banknote,
    text: "L'État vous rembourse 50% du montant via crédit d'impôt",
  },
  {
    icon: Zap,
    text: "Avec l'avance immédiate URSSAF, vous ne payez que 50% à la facture, sans attendre",
  },
  {
    icon: Shield,
    text: `Aucune condition de revenus, dans la limite du plafond annuel SAP (12 000${nbsp}€)`,
  },
];

const paymentMethods = [
  { icon: CreditCard, label: "Carte bancaire" },
  { icon: ArrowLeftRight, label: "Virement" },
  { icon: Banknote, label: "Espèces" },
  { icon: FileText, label: "Chèque" },
  { icon: Wallet, label: "CESU préfinancé" },
  { icon: Ticket, label: "Chèques ANCV" },
];

const faqItems: FaqItem[] = [
  {
    question: "Pourquoi proposez-vous des prix plus bas que d'autres services ?",
    answer:
      "Notre modèle est volontairement accessible. Nous croyons que l'aide aux démarches doit être à la portée de tous, pas réservée à une élite. Le crédit d'impôt 50% rend nos tarifs équivalents à ceux d'une heure de ménage, alors que la valeur apportée est bien supérieure : nous résolvons des blocages qui empêchent souvent l'accès à des droits ou à des aides.",
  },
  {
    question: "Le pack 5 sessions est-il vraiment avantageux ?",
    answer:
      `Oui, vous économisez 15${nbsp}€ par rapport à 5 sessions découvertes payées séparément. Mais surtout, le pack est pensé pour les situations complexes (montage de dossier retraite, gestion d'une succession, accompagnement d'un proche dans la durée) où plusieurs sessions sont nécessaires. La flexibilité de la durée (30 min à 2h par session) vous permet d'adapter à votre rythme.`,
  },
  {
    question: "Que se passe-t-il si une session prend moins de temps que prévu ?",
    answer:
      "La session est facturée au forfait, pas à la minute. Si nous terminons en 45 minutes au lieu d'1 heure, c'est tant mieux pour vous : la session est validée, vous n'avez rien de plus à payer. À l'inverse, si nous dépassons légèrement (15-20 minutes), c'est offert.",
  },
  {
    question: "Puis-je transformer une session découverte en pack si je suis satisfait(e) ?",
    answer:
      "Absolument. Si après votre session découverte vous souhaitez passer à un pack, nous déduisons le montant déjà payé du tarif du pack. Vous ne payez jamais deux fois.",
  },
  {
    question: "Comment fonctionne l'avance immédiate URSSAF concrètement ?",
    answer:
      "C'est un dispositif officiel qui permet de ne payer que 50% à la facture, sans attendre la déclaration d'impôts. Pour l'activer : il faut créer un compte sur particulier.urssaf.fr et déclarer SachaRbone Démarches comme prestataire. Nous vous accompagnons gratuitement dans cette démarche lors de la première session si besoin (5-10 minutes en moyenne). Une fois activé, vous voyez directement le prix réduit sur vos factures suivantes.",
  },
];

function PricingCard({
  tag,
  name,
  duration,
  hourlyPrice,
  details,
  recap,
  features,
  href,
  highlighted,
}: PricingCardProps) {
  return (
    <div className={`relative flex h-full ${highlighted ? "md:-mt-5 md:pb-5" : ""}`}>
      {highlighted ? (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-navy px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cream">
          LE PLUS POPULAIRE
        </div>
      ) : null}
      <article
        className={`flex h-full w-full flex-col rounded-xl bg-[#fbfbf8] p-8 shadow-[0_18px_48px_rgba(26,35,64,0.08)] ${
          highlighted ? "border border-navy pt-10" : "border border-navy/10"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-warm-gray">{tag}</p>
        <h3 className="mt-5 font-heading text-2xl font-bold text-navy">{name}</h3>
        <p className="mt-2 font-medium text-warm-gray">{duration}</p>

        <div className="mt-8">
          <p className="text-sm text-anthracite/70">À partir de</p>
          <p className="mt-1 font-heading text-5xl font-bold leading-none text-navy md:text-[3.4rem]">
            {hourlyPrice}
          </p>
        </div>

        <div className="my-7 h-px bg-navy/10" />

        <div className="space-y-4">
          {details.map((detail) => (
            <div key={detail.label} className="flex items-start justify-between gap-5 text-sm">
              <span className="font-medium leading-6 text-anthracite/78">{detail.label}</span>
              <span className={`text-right leading-6 text-navy ${detail.valueClassName ?? ""}`}>
                {detail.value}
              </span>
            </div>
          ))}
          <p className="pt-1 text-sm italic leading-6 text-anthracite/72">{recap}</p>
        </div>

        <div className="my-7 h-px bg-navy/10" />

        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-6 text-anthracite">
              <Check className="mt-1 size-4 shrink-0 text-warm-gray" strokeWidth={1.5} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 font-semibold transition ${
            highlighted
              ? "bg-navy text-cream hover:bg-anthracite focus-visible:bg-anthracite"
              : "border border-navy text-navy hover:bg-navy hover:text-cream focus-visible:bg-navy focus-visible:text-cream"
          }`}
        >
          Réserver <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
        </a>
      </article>
    </div>
  );
}

export default function TarifsPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream">
      <Header />

      <section className="bg-navy px-5 pb-20 pt-32 text-cream md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-silver/82">Accueil &gt; SachaRbone Démarches &gt; Tarifs</p>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-silver">
            PÔLE SACHARBONE DÉMARCHES
          </p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight text-cream md:text-6xl">
            Une tarification claire, sans surprise.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/82">
            Transparence totale sur nos prix. Crédit d'impôt 50% applicable sur toutes nos prestations.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {[
              "Services à la Personne déclaré",
              "CESU acceptés",
              "Avance immédiate URSSAF",
              "RC Pro souscrite",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-silver/60 px-4 py-2 text-sm text-cream/86"
              >
                <Check className="size-4 text-silver" strokeWidth={1.5} />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">Nos formules</p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-navy md:text-5xl">
              Choisissez la formule adaptée à votre besoin
            </h2>
            <p className="mt-5 text-lg leading-8 text-anthracite">
              Toutes nos formules incluent le mandat écrit, la charte de confidentialité et la suppression des données après séance.
            </p>
          </div>

          <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
            {pricingCards.map((card) => (
              <PricingCard key={card.name} {...card} />
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-5xl text-center text-xs italic leading-6 text-anthracite/60">
            Les prix affichés sont indicatifs après application du crédit d'impôt 50% (Article 199 sexdecies du CGI). Le prix réel facturé correspond au prix de la séance avant déduction. Le crédit d'impôt nécessite une déclaration fiscale en France et l'activation du dispositif Services à la Personne. Les CESU préfinancés peuvent réduire davantage le reste à charge.
          </p>
        </div>
      </section>

      <section className="bg-navy px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-silver">
              Comprendre le dispositif
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-cream md:text-5xl">
              Le crédit d'impôt en 1 minute
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/82">
              Voici comment l'État prend en charge la moitié du coût de nos prestations.
            </p>
            <div className="mt-10 space-y-6">
              {creditBullets.map(({ icon: Icon, text }) => (
                <div key={text} className="flex gap-4">
                  <Icon className="mt-1 size-6 shrink-0 text-silver" strokeWidth={1.5} />
                  <p className="text-base leading-8 text-cream/82">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-xl bg-cream/96 p-8 text-navy shadow-[0_18px_48px_rgba(0,0,0,0.14)]">
            <h3 className="font-heading text-2xl font-bold">Exemple concret</h3>
            <p className="mt-2 text-anthracite">4 sessions standard sur 1 mois</p>
            <div className="mt-8 space-y-5">
              <div className="flex justify-between gap-5 text-anthracite">
                <span>Prix brut</span>
                <span>180{nbsp}€</span>
              </div>
              <div className="flex justify-between gap-5 text-[#2D7A4F]">
                <span>Crédit d'impôt 50%</span>
                <span>−90{nbsp}€</span>
              </div>
              <div className="h-px bg-navy/10" />
              <div className="flex items-end justify-between gap-5">
                <span className="font-heading text-lg font-bold">Reste à votre charge</span>
                <span className="font-heading text-3xl font-bold text-navy">90{nbsp}€</span>
              </div>
            </div>
            <p className="mt-8 rounded-xl border border-navy/10 bg-[#fbfbf8] px-4 py-3 text-sm leading-6 text-anthracite">
              Avec CESU préfinancés (mutuelle, employeur), votre reste à charge peut être proche de zéro.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">
              Moyens de paiement acceptés
            </h2>
            <p className="mt-4 text-lg text-anthracite">
              Une grande flexibilité pour s'adapter à votre situation.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {paymentMethods.map(({ icon: Icon, label }) => (
              <article key={label} className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl border border-navy/10 bg-[#fbfbf8] text-anthracite">
                  <Icon className="size-6" strokeWidth={1.5} />
                </div>
                <p className="mt-4 text-sm font-medium text-anthracite">{label}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-14 max-w-5xl rounded-xl border border-navy/10 bg-[#fbfbf8] p-8 shadow-[0_18px_48px_rgba(26,35,64,0.06)]">
            <h3 className="font-heading text-2xl font-bold text-navy">Bon à savoir</h3>
            <p className="mt-4 text-base leading-8 text-anthracite">
              Les CESU préfinancés (employeurs, mutuelles, CCAS, conseils départementaux) sont acceptés et viennent s'ajouter au crédit d'impôt 50%. Selon votre situation, votre reste à charge peut devenir quasi-nul. Nous vous aidons à vérifier votre éligibilité lors du premier appel.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeeea] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-navy md:text-5xl">
              Questions sur la tarification
            </h2>
            <p className="mt-5 text-lg text-anthracite">Tout ce qu'il faut savoir avant de choisir.</p>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <section className="bg-navy px-5 py-20 text-center text-cream md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            Une question sur les tarifs ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cream/78">
            Nous prenons le temps de vous expliquer en détail. Sans pression, sans engagement.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:0123456789"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cream px-7 py-3 font-semibold text-navy transition hover:bg-silver focus-visible:bg-silver"
            >
              Nous appeler <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-silver px-7 py-3 font-semibold text-cream transition hover:bg-cream/10 focus-visible:bg-cream/10"
            >
              Envoyer un message
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
