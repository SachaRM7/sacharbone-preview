import Image from "next/image";

const navItems = [
  "Démarches",
  "Conseil",
  "Halal",
  "Photo",
  "Sweet",
  "À propos",
  "Prescripteurs",
  "Contact",
];

export function getNavigationHref(item: string) {
  if (item === "Démarches") return "/demarches";
  if (item === "À propos") return "/a-propos";
  if (item === "Prescripteurs") return "/prescripteurs";
  if (item === "Contact") return "#contact";
  return "/#expertises";
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-silver/20 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="/" aria-label="Retour à l'accueil SachaRbone" className="shrink-0">
          <Image
            src="/brand/logo-horizontal-white-sacharbone.jpg"
            alt="Logo SachaRbone"
            width={210}
            height={85}
            priority
            className="h-12 w-auto object-contain"
          />
        </a>
        <nav aria-label="Navigation principale" className="hidden items-center gap-4 xl:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={getNavigationHref(item)}
              className="text-sm text-cream/88 transition hover:text-cream focus-visible:text-cream"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a className="text-sm font-medium text-cream/90 hover:text-cream" href="mailto:contact@sacharbone.fr">
            Contact
          </a>
          <a
            href="#contact"
            className="rounded-xl bg-cream px-5 py-3 text-sm font-semibold text-navy transition hover:bg-silver focus-visible:bg-silver"
          >
            Réserver une session
          </a>
        </div>
      </div>
    </header>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-silver">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm text-cream/76">
        {items.map((item) => (
          <li key={item}>
            <a className="transition hover:text-cream focus-visible:text-cream" href={getNavigationHref(item)}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-navy px-5 py-16 text-cream md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/logo-horizontal-white-sacharbone.jpg"
              alt="Logo SachaRbone"
              width={220}
              height={90}
              className="h-14 w-auto object-contain"
            />
            <p className="mt-5 max-w-xs text-sm leading-7 text-cream/72">
              Premium accessible — Technologique & Humain
            </p>
          </div>
          <FooterList title="Navigation" items={["Démarches", "Conseil", "Halal", "Photo", "Sweet"]} />
          <FooterList title="À découvrir" items={["À propos", "Prescripteurs", "Contact"]} />
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-silver">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/76">
              <li>contact@sacharbone.fr</li>
              <li>01 23 45 67 89</li>
              <li>SIRET : à compléter</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-silver/18 pt-7 text-sm text-cream/64">
          © 2026 SachaRbone — Tous droits réservés. · Mentions légales · Confidentialité · CGV
        </div>
      </div>
    </footer>
  );
}
