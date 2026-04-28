import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  ClipboardList,
  FileCheck2,
  FileText,
  Home,
  Lock,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import CreditImpotCalculator from "../../components/widgets/credit-impot-calculator";
import { FaqAccordion, type FaqItem } from "../components/faq-accordion";
import { Footer, Header } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "SachaRbone Démarches — Aide administrative à domicile, crédit d'impôt 50%",
  description:
    "Administratif, abonnements, contrats : SachaRbone Démarches vous accompagne à domicile, en toute confidentialité.",
};

const serviceItems = [
  "CAF, Ameli, France Travail, impôts",
  "ANTS, carte grise, permis, identité",
  "Résiliations, abonnements, contrats",
  "Dossiers logement, retraite, aides",
  "Classement numérique de vos documents",
  "Accompagnement pas à pas à domicile",
];

const assurances = [
  {
    icon: Shield,
    title: "Service déclaré SAP",
    text: "Prestations éligibles au crédit d'impôt 50%, selon le dispositif Services à la Personne.",
  },
  {
    icon: Lock,
    title: "Confidentialité stricte",
    text: "Mandat écrit, charte de confidentialité, suppression des données après séance.",
  },
  {
    icon: Users,
    title: "Accompagnement humain",
    text: "On avance avec vous, à votre rythme, sans jargon et sans jugement.",
  },
];

const steps = [
  {
    icon: Phone,
    title: "Premier échange",
    text: "Nous comprenons votre situation et choisissons la formule la plus adaptée.",
  },
  {
    icon: FileText,
    title: "Cadre clair",
    text: "Vous recevez le mandat écrit, les informations utiles et les éléments de confidentialité.",
  },
  {
    icon: Home,
    title: "Session à domicile",
    text: "Nous réalisons les démarches ensemble, chez vous, en toute sérénité.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Est-ce que vous faites les démarches à ma place ?",
    answer:
      "Nous vous accompagnons dans la réalisation des démarches, avec un mandat écrit lorsque c'est nécessaire. Vous gardez toujours la maîtrise de vos informations et des décisions importantes.",
  },
  {
    question: "Puis-je réserver pour un parent ou un proche ?",
    answer:
      "Oui. Le formulaire de réservation permet d'indiquer que vous réservez pour un proche. Le bénéficiaire devra simplement valider le mandat lors de la première session.",
  },
  {
    question: "Quelles démarches pouvez-vous traiter ?",
    answer:
      "Nous pouvons intervenir sur les démarches administratives courantes : CAF, impôts, Ameli, France Travail, ANTS, résiliations, contrats, logement, retraite, aides et organisation de documents.",
  },
  {
    question: "Comment fonctionne le crédit d'impôt 50% ?",
    answer:
      "Les prestations SachaRbone Démarches relèvent du dispositif Services à la Personne. Selon votre situation fiscale et dans la limite du plafond légal, 50% du montant peut être récupéré en crédit d'impôt.",
  },
];

export default function DemarchesPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream">
      <Header />

      <section className="relative bg-navy px-5 pb-20 pt-32 text-cream md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm text-silver/82">Accueil &gt; SachaRbone Démarches</p>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-silver">
              PÔLE SACHARBONE DÉMARCHES
            </p>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight text-cream md:text-6xl">
              Vos démarches administratives, à domicile.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/82">
              Administratif, abonnements, contrats : on s'occupe de tout. CAF, impôts,
              France Travail, Ameli, ANTS, résiliations, dossiers logement... Chez vous,
              en toute confidentialité.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/demarches/reserver"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cream px-7 py-3 font-semibold text-navy transition hover:bg-silver focus-visible:bg-silver"
              >
                Réserver une session <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
              </a>
              <a
                href="/demarches/tarifs"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-silver px-7 py-3 font-semibold text-cream transition hover:bg-cream/10 focus-visible:bg-cream/10"
              >
                Voir les tarifs
              </a>
            </div>
          </div>

          <aside className="rounded-xl border border-silver/25 bg-cream/95 p-7 text-navy shadow-[0_18px_48px_rgba(0,0,0,0.14)]">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-warm-gray">
              À partir de
            </p>
            <p className="mt-2 font-heading text-5xl font-bold">15&nbsp;€ / h</p>
            <p className="mt-3 text-sm leading-6 text-anthracite">
              Après crédit d'impôt 50%. Session découverte 30&nbsp;€, soit 15&nbsp;€
              après remboursement de l'État.
            </p>
            <div className="my-7 h-px bg-navy/10" />
            <ul className="space-y-4 text-sm leading-6 text-anthracite">
              {["Réponse sous 24h ouvrées", "Mandat écrit fourni", "CESU acceptés", "Avance immédiate URSSAF"].map(
                (item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-warm-gray" strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </aside>
        </div>
        <div className="metal-line absolute inset-x-0 bottom-0 h-px" />
      </section>

      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
              Ce que nous traitons
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-navy md:text-5xl">
              Des démarches débloquées, sans stress inutile.
            </h2>
            <p className="mt-5 text-lg leading-8 text-anthracite">
              Une aide concrète pour avancer dans les dossiers qui prennent du temps,
              demandent de la méthode ou génèrent de l'inquiétude.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((item) => (
              <article
                key={item}
                className="rounded-xl border border-navy/10 bg-[#fbfbf8] p-6 shadow-[0_18px_48px_rgba(26,35,64,0.06)]"
              >
                <FileCheck2 className="mb-5 size-7 text-navy" strokeWidth={1.5} />
                <h3 className="font-heading text-lg font-bold text-navy">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              Un cadre rassurant, du premier appel à la séance.
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {assurances.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border-t border-silver/30 pt-8">
                <Icon className="mb-7 size-10 text-silver" strokeWidth={1.5} />
                <h3 className="font-heading text-xl font-bold text-cream">{title}</h3>
                <p className="mt-4 text-base leading-8 text-cream/78">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
              Comment ça marche
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-navy md:text-5xl">
              Trois étapes simples.
            </h2>
            <p className="mt-5 text-lg leading-8 text-anthracite">
              Vous n'avez pas besoin de tout préparer seul. Nous clarifions le besoin,
              posons le cadre, puis avançons avec vous.
            </p>
          </div>
          <div className="grid gap-5">
            {steps.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="flex gap-5 rounded-xl border border-navy/10 bg-[#fbfbf8] p-6 shadow-[0_18px_48px_rgba(26,35,64,0.06)]"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cream text-navy">
                  <Icon className="size-6" strokeWidth={1.5} />
                </span>
                <span>
                  <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-base leading-7 text-anthracite">{text}</p>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
              Votre tarif réel
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-navy md:text-5xl">
              Calculez votre crédit d'impôt en direct
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-lg leading-8 text-anthracite">
              Grâce au dispositif Services à la Personne, l'État prend en charge 50%
              du coût. Voyez immédiatement votre reste à payer.
            </p>
          </div>
          <CreditImpotCalculator />
        </div>
      </section>

      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-navy md:text-5xl">
              Questions fréquentes
            </h2>
            <p className="mt-5 text-lg text-anthracite">
              Les réponses essentielles avant de réserver.
            </p>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <section className="bg-navy px-5 py-20 text-center text-cream md:px-8">
        <div className="mx-auto max-w-4xl">
          <ClipboardList className="mx-auto mb-7 size-10 text-silver" strokeWidth={1.5} />
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            Prêt à débloquer vos démarches ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cream/78">
            Quelques informations suffisent. Nous revenons vers vous sous 24h ouvrées,
            sans engagement à ce stade.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/demarches/reserver"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cream px-7 py-3 font-semibold text-navy transition hover:bg-silver focus-visible:bg-silver"
            >
              Réserver une session <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
            </a>
            <a
              href="/demarches/tarifs"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-silver px-7 py-3 font-semibold text-cream transition hover:bg-cream/10 focus-visible:bg-cream/10"
            >
              Comparer les formules
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
