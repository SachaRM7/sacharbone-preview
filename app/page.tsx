import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  IceCream,
  Image as ImageIcon,
  Laptop,
  Lock,
  MapPin,
  MessagesSquare,
  Scale,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { Footer, Header } from "./components/site-chrome";

type PoleCardProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  status: "Disponible" | "Bientôt";
  action: string;
  highlighted?: boolean;
};

type ValueCardProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
};

type FounderCardProps = {
  initial: string;
  name: string;
  role: string;
  description: string;
  quote: string;
};

const poles: PoleCardProps[] = [
  {
    icon: BriefcaseBusiness,
    title: "SachaRbone Démarches",
    description: "Vos démarches administratives, à domicile.",
    status: "Disponible",
    action: "Découvrir",
    highlighted: true,
  },
  {
    icon: MessagesSquare,
    title: "SachaRbone Conseil",
    description: "Transformation digitale pour TPE/PME",
    status: "Bientôt",
    action: "Être notifié",
  },
  {
    icon: MapPin,
    title: "SachaRbone Halal",
    description: "Annuaire des commerces halal certifiés",
    status: "Bientôt",
    action: "Être notifié",
  },
  {
    icon: ImageIcon,
    title: "SachaRbone Photo",
    description: "Restauration de vos photos anciennes",
    status: "Bientôt",
    action: "Être notifié",
  },
  {
    icon: IceCream,
    title: "SachaRbone Sweet",
    description: "Le marchand de glace itinérant nostalgique",
    status: "Bientôt",
    action: "Être notifié",
  },
];

const values: ValueCardProps[] = [
  {
    icon: Shield,
    title: "TRANSPARENCE",
    description: "Une communication claire et honnête",
  },
  {
    icon: Users,
    title: "PROXIMITÉ",
    description: "Être proche, à l'écoute et disponible",
  },
  {
    icon: Scale,
    title: "ÉTHIQUE",
    description: "Agir avec intégrité, responsabilité et respect",
  },
  {
    icon: Lock,
    title: "ACCESSIBILITÉ",
    description: "Des solutions claires, utiles et accessibles à tous",
  },
];

const pillars: ValueCardProps[] = [
  {
    icon: Sparkles,
    title: "Premium accessible",
    description: "Un service de haute qualité, pensé pour tous, sans élitisme.",
  },
  {
    icon: Laptop,
    title: "Technologique & Humain",
    description:
      "Des outils modernes au service d'un accompagnement profondément humain.",
  },
  {
    icon: Check,
    title: "Engagés et déclarés",
    description:
      "Services à la Personne déclaré, RC Pro souscrite, conformité RGPD.",
  },
];

function PoleCard({ icon: Icon, title, description, status, action, highlighted }: PoleCardProps) {
  const isAvailable = status === "Disponible";

  return (
    <article
      className={`group flex min-h-72 flex-col rounded-xl bg-[#fbfbf8] p-7 shadow-[0_18px_48px_rgba(26,35,64,0.08)] transition duration-300 hover:-translate-y-1 ${
        highlighted ? "border border-silver" : "border border-navy/8"
      }`}
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <span className="flex size-13 items-center justify-center rounded-xl border border-silver/80 bg-cream text-navy">
          <Icon className="size-6" strokeWidth={1.5} />
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isAvailable ? "bg-[#dfeee6] text-[#174d37]" : "bg-silver/70 text-anthracite"
          }`}
        >
          {status}
        </span>
      </div>
      <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
      <p className="mt-3 flex-1 text-base leading-7 text-anthracite">{description}</p>
      <a
        href={title === "SachaRbone Démarches" ? "/demarches" : "#contact"}
        className="mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-navy transition group-hover:gap-3"
      >
        {action} <ArrowRight className="size-4" strokeWidth={1.5} />
      </a>
    </article>
  );
}

function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <article className="border-t border-silver/30 pt-8">
      <Icon className="mb-7 size-10 text-silver" strokeWidth={1.5} />
      <h3 className="font-heading text-lg font-bold text-cream">{title}</h3>
      <p className="mt-3 text-base leading-7 text-cream/78">{description}</p>
    </article>
  );
}

function PillarCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <article className="rounded-xl border border-navy/10 bg-[#fbfbf8] p-8">
      <Icon className="mb-8 size-9 text-navy" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl font-bold text-navy">{title}</h3>
      <p className="mt-4 text-base leading-8 text-anthracite">{description}</p>
    </article>
  );
}

function FounderCard({ initial, name, role, description, quote }: FounderCardProps) {
  return (
    <article className="rounded-xl border border-navy/10 bg-cream p-8 text-center shadow-[0_18px_50px_rgba(26,35,64,0.07)]">
      <div className="mx-auto flex size-[180px] items-center justify-center rounded-full bg-navy">
        <span className="font-heading text-7xl font-bold text-silver">{initial}</span>
      </div>
      <h3 className="mt-8 font-heading text-2xl font-bold text-navy">{name}</h3>
      <p className="mt-2 font-medium text-warm-gray">{role}</p>
      <p className="mx-auto mt-5 max-w-md text-base leading-8 text-anthracite">{description}</p>
      <blockquote className="mx-auto mt-6 max-w-md text-base italic leading-8 text-navy">
        {quote}
      </blockquote>
    </article>
  );
}

export default function Home() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream">
      <Header />

      <section className="relative flex min-h-screen items-center justify-center bg-navy px-5 pb-20 pt-32 text-center text-cream md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <Image
            src="/brand/logo-vertical-chrome-sacharbone.jpg"
            alt="Logo chromé SachaRbone"
            width={360}
            height={294}
            priority
            className="h-auto w-56 object-contain sm:w-72 md:w-80"
          />
          <h1 className="mt-12 max-w-5xl font-heading text-4xl font-bold leading-tight text-cream sm:text-5xl md:text-6xl">
            L'humain au cœur du service.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-cream/82 md:text-xl">
            SachaRbone accompagne les Français dans leurs défis du quotidien — administratif,
            professionnel, créatif. Avec proximité, transparence et sens du service.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#expertises"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cream px-7 py-3 font-semibold text-navy transition hover:bg-silver focus-visible:bg-silver"
            >
              Découvrir nos expertises <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
            </a>
            <a
              href="#prescripteurs"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-silver px-7 py-3 font-semibold text-cream transition hover:bg-cream/10 focus-visible:bg-cream/10"
            >
              Devenir prescripteur
            </a>
          </div>
        </div>
        <div className="metal-line absolute inset-x-0 bottom-0 h-px" />
      </section>

      <section id="expertises" className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-navy md:text-5xl">
              Une marque, plusieurs expertises.
            </h2>
            <p className="mt-5 text-lg text-anthracite">
              Cinq pôles de services, une seule promesse de qualité.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-6">
            {poles.slice(0, 3).map((pole) => (
              <div key={pole.title} className="md:col-span-2">
                <PoleCard {...pole} />
              </div>
            ))}
            {poles.slice(3).map((pole, index) => (
              <div key={pole.title} className={`md:col-span-2 ${index === 0 ? "md:col-start-2" : ""}`}>
                <PoleCard {...pole} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-heading text-3xl font-bold text-cream md:text-5xl">
            Nos valeurs
          </h2>
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.title} {...pillar} />
          ))}
        </div>
      </section>

      <section className="bg-[#eeeeea] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-heading text-3xl font-bold text-navy md:text-5xl">
            Une histoire de famille.
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <FounderCard
              initial="S"
              name="Sacha"
              role="Fondateur"
              description="Vision technologique & humaine — Sacha allie son expertise technique à une obsession pour l'humain dans le service."
              quote="« Un bon service, c'est celui qu'on fournit comme on aimerait le recevoir. »"
            />
            <FounderCard
              initial="M"
              name="Maria"
              role="Co-fondatrice"
              description="Garante de la qualité — Maria veille à ce que chaque promesse soit tenue, chaque détail compte."
              quote="« La qualité, c'est l'attention portée à chaque détail. »"
            />
          </div>
        </div>
      </section>

      <section id="prescripteurs" className="bg-navy px-5 py-20 text-center text-cream md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">Vous êtes prescripteur ?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cream/78">
            Médecin, pharmacien, CCAS, gardien d'immeuble : aidez vos publics fragiles.
          </p>
          <a
            href="#contact"
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-xl bg-silver px-7 py-3 font-semibold text-navy transition hover:bg-cream focus-visible:bg-cream"
          >
            Découvrir l'espace prescripteurs <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
