"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Check,
  FileText,
  Home,
  Phone,
  Star,
  User,
  Users,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";

const phoneRegex = /^(?:(?:\+|00)33[\s.-]?[1-9]|0[1-9])(?:[\s.-]?\d{2}){4}$/;
const postalCodeRegex = /^\d{5}$/;

const schema = z
  .object({
    profile: z.enum(["particulier", "famille", "prescripteur"]),
    firstName: z.string().min(1, "Le prénom est obligatoire."),
    lastName: z.string().min(1, "Le nom est obligatoire."),
    email: z.string().min(1, "L'email est obligatoire.").email("L'email doit être valide."),
    phone: z
      .string()
      .min(1, "Le téléphone est obligatoire.")
      .regex(phoneRegex, "Le téléphone doit être un numéro français valide."),
    beneficiaryFirstName: z.string().optional(),
    beneficiaryRelation: z.string().optional(),
    structureType: z.string().optional(),
    structureName: z.string().optional(),
    beneficiaryConsent: z.boolean().optional(),
    city: z.string().min(1, "La ville est obligatoire."),
    postalCode: z
      .string()
      .min(1, "Le code postal est obligatoire.")
      .regex(postalCodeRegex, "Le code postal doit contenir 5 chiffres."),
    sessionType: z.enum(["decouverte", "standard", "pack5", "conseil"]),
    desiredDate: z.string().optional(),
    situation: z.string().max(500, "Votre message ne peut pas dépasser 500 caractères.").optional(),
    contactConsent: z.boolean().refine((value) => value, {
      message: "Vous devez accepter d'être recontacté(e).",
    }),
    marketingConsent: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.profile === "famille") {
      if (!data.beneficiaryFirstName?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["beneficiaryFirstName"],
          message: "Le prénom du bénéficiaire est obligatoire.",
        });
      }
      if (!data.beneficiaryRelation?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["beneficiaryRelation"],
          message: "Le lien avec vous est obligatoire.",
        });
      }
    }

    if (data.profile === "prescripteur") {
      if (!data.structureName?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["structureName"],
          message: "Le nom de la structure est obligatoire.",
        });
      }
      if (!data.beneficiaryConsent) {
        ctx.addIssue({
          code: "custom",
          path: ["beneficiaryConsent"],
          message: "L'accord du bénéficiaire est obligatoire.",
        });
      }
    }
  });

type ReservationFormData = z.infer<typeof schema>;

const sessionLabels: Record<ReservationFormData["sessionType"], string> = {
  decouverte: "Session découverte (1h, 30 €)",
  standard: "Session standard (1h30, 45 €)",
  pack5: "Pack 5 sessions (5h, 135 €)",
  conseil: "Je ne sais pas encore, conseillez-moi",
};

const profileCards = [
  {
    value: "particulier",
    icon: User,
    title: "Pour moi",
    description: "Je fais ma demande personnellement",
  },
  {
    value: "famille",
    icon: Users,
    title: "Pour un proche",
    description: "Je fais une demande pour un parent, un aidé, ou un proche",
  },
  {
    value: "prescripteur",
    icon: Building2,
    title: "Je suis prescripteur",
    description: "Médecin, pharmacien, CCAS, association",
  },
] as const;

function normalizeFormula(value: string | null): ReservationFormData["sessionType"] {
  if (value === "decouverte" || value === "standard" || value === "pack5") return value;
  return "standard";
}

function normalizeProfile(value: string | null): ReservationFormData["profile"] {
  if (value === "famille" || value === "prescripteur") return value;
  return "particulier";
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-[#9b2c2c]">{message}</p>;
}

export function ReservationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [characterCount, setCharacterCount] = useState(0);

  const defaultValues = useMemo<ReservationFormData>(
    () => ({
      profile: normalizeProfile(searchParams.get("profil")),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      beneficiaryFirstName: "",
      beneficiaryRelation: "",
      structureType: "Médecin",
      structureName: "",
      beneficiaryConsent: false,
      city: "",
      postalCode: "",
      sessionType: normalizeFormula(searchParams.get("formule")),
      desiredDate: "",
      situation: "",
      contactConsent: false,
      marketingConsent: false,
    }),
    [searchParams],
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const profile = watch("profile");
  const situation = watch("situation") ?? "";

  useEffect(() => {
    setValue("profile", normalizeProfile(searchParams.get("profil")), { shouldValidate: true });
    setValue("sessionType", normalizeFormula(searchParams.get("formule")), { shouldValidate: true });
  }, [searchParams, setValue]);

  useEffect(() => {
    setCharacterCount(situation.length);
  }, [situation]);

  async function onSubmit(data: ReservationFormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const reference = `SR-DEM-${Math.floor(10000 + Math.random() * 90000)}`;
    localStorage.setItem(
      "sacharbone-demarches-reservation",
      JSON.stringify({
        ...data,
        reference,
        sessionLabel: sessionLabels[data.sessionType],
      }),
    );
    router.push("/demarches/reserver/confirmation");
  }

  return (
    <section className="bg-cream px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[3fr_2fr] lg:items-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-navy/10 bg-[#fbfbf8] p-6 shadow-[0_18px_48px_rgba(26,35,64,0.08)] md:p-10"
        >
          <h2 className="font-heading text-3xl font-bold text-navy">Votre demande</h2>
          <p className="mt-2 text-sm text-anthracite">* Champs obligatoires</p>

          <fieldset className="mt-10">
            <legend className="font-heading text-xl font-bold text-navy">Pour qui réservez-vous ?</legend>
            <p className="mt-2 text-sm leading-6 text-anthracite">
              Choisissez votre profil pour adapter la suite du formulaire.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {profileCards.map(({ value, icon: Icon, title, description }) => {
                const selected = profile === value;
                return (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-xl border p-5 transition ${
                      selected
                        ? "border-2 border-navy bg-navy/[0.035]"
                        : "border-navy/10 bg-white hover:border-silver"
                    }`}
                  >
                    <input
                      type="radio"
                      value={value}
                      className="sr-only"
                      {...register("profile")}
                    />
                    <Icon className="size-6 text-navy" strokeWidth={1.5} />
                    <span className="mt-4 block font-medium text-navy">{title}</span>
                    <span className="mt-2 block text-sm leading-6 text-anthracite">{description}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <FormSection title="Vos coordonnées">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Prénom" required error={errors.firstName?.message}>
                <input id="firstName" aria-required {...inputProps(register("firstName"))} placeholder="Votre prénom" />
              </Field>
              <Field label="Nom" required error={errors.lastName?.message}>
                <input id="lastName" aria-required {...inputProps(register("lastName"))} placeholder="Votre nom" />
              </Field>
              <Field className="md:col-span-2" label="Email" required error={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  aria-required
                  {...inputProps(register("email"))}
                  placeholder="vous@email.fr"
                />
              </Field>
              <Field className="md:col-span-2" label="Téléphone" required error={errors.phone?.message}>
                <input
                  id="phone"
                  type="tel"
                  aria-required
                  {...inputProps(register("phone"))}
                  placeholder="06 12 34 56 78"
                />
              </Field>
            </div>
          </FormSection>

          {profile === "famille" ? (
            <FormSection title="Coordonnées du bénéficiaire (la personne qui sera accompagnée)">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Prénom du bénéficiaire" required error={errors.beneficiaryFirstName?.message}>
                  <input
                    id="beneficiaryFirstName"
                    aria-required
                    {...inputProps(register("beneficiaryFirstName"))}
                    placeholder="Prénom"
                  />
                </Field>
                <Field label="Lien avec vous" required error={errors.beneficiaryRelation?.message}>
                  <input
                    id="beneficiaryRelation"
                    aria-required
                    {...inputProps(register("beneficiaryRelation"))}
                    placeholder="Parent, conjoint, ami..."
                  />
                </Field>
              </div>
              <p className="mt-4 text-sm leading-6 text-anthracite">
                Le bénéficiaire devra signer le mandat lors de la première session.
              </p>
            </FormSection>
          ) : null}

          {profile === "prescripteur" ? (
            <FormSection title="Informations sur votre structure">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Type de structure">
                  <select id="structureType" {...inputProps(register("structureType"))}>
                    {["Médecin", "Pharmacie", "CCAS", "Hôpital", "Association", "Bailleur social", "Autre"].map(
                      (option) => (
                        <option key={option}>{option}</option>
                      ),
                    )}
                  </select>
                </Field>
                <Field label="Nom de la structure" required error={errors.structureName?.message}>
                  <input
                    id="structureName"
                    aria-required
                    {...inputProps(register("structureName"))}
                    placeholder="Nom de votre structure"
                  />
                </Field>
              </div>
              <CheckboxField
                id="beneficiaryConsent"
                className="mt-5"
                label="Avez-vous l'accord du bénéficiaire pour transmettre ses coordonnées ?"
                required
                error={errors.beneficiaryConsent?.message}
                registerReturn={register("beneficiaryConsent")}
              />
            </FormSection>
          ) : null}

          <FormSection title="Localisation de l'intervention">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Ville" required error={errors.city?.message}>
                <input id="city" aria-required {...inputProps(register("city"))} placeholder="Votre ville" />
              </Field>
              <Field label="Code postal" required error={errors.postalCode?.message}>
                <input
                  id="postalCode"
                  inputMode="numeric"
                  aria-required
                  {...inputProps(register("postalCode"))}
                  placeholder="31000"
                />
              </Field>
            </div>
          </FormSection>

          <FormSection title="Votre besoin">
            <div className="space-y-5">
              <Field label="Type de session souhaitée" required error={errors.sessionType?.message}>
                <select id="sessionType" aria-required {...inputProps(register("sessionType"))}>
                  <option value="decouverte">Session découverte (1h, 30 €)</option>
                  <option value="standard">Session standard (1h30, 45 €)</option>
                  <option value="pack5">Pack 5 sessions (5h, 135 €)</option>
                  <option value="conseil">Je ne sais pas encore, conseillez-moi</option>
                </select>
              </Field>
              <Field
                label="Date souhaitée pour la première session"
                help="Optionnel — à titre indicatif, nous nous adaptons"
                error={errors.desiredDate?.message}
              >
                <input id="desiredDate" type="date" {...inputProps(register("desiredDate"))} />
              </Field>
              <Field
                label="Décrivez brièvement votre situation"
                help="Optionnel mais conseillé pour bien préparer notre intervention."
                error={errors.situation?.message}
              >
                <textarea
                  id="situation"
                  rows={4}
                  maxLength={500}
                  {...inputProps(register("situation"))}
                  placeholder="Quelles démarches souhaitez-vous traiter ? (Ex : actualisation France Travail, déclaration d'impôts, demande de logement...)"
                />
                <p className="mt-2 text-right text-sm text-anthracite/65">{characterCount} / 500</p>
              </Field>
            </div>
          </FormSection>

          <FormSection title="Consentement">
            <div className="space-y-4">
              <CheckboxField
                id="contactConsent"
                label="J'accepte d'être recontacté(e) par SachaRbone pour confirmer ma demande, par téléphone ou email."
                required
                error={errors.contactConsent?.message}
                registerReturn={register("contactConsent")}
              />
              <CheckboxField
                id="marketingConsent"
                label="J'accepte de recevoir occasionnellement des informations sur les services SachaRbone (vous pouvez vous désabonner à tout moment)."
                registerReturn={register("marketingConsent")}
              />
            </div>
            <a href="/confidentialite" className="mt-5 inline-block text-sm text-anthracite underline underline-offset-4">
              Voir notre politique de confidentialité
            </a>
          </FormSection>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-navy px-7 py-4 font-heading font-semibold text-cream transition hover:bg-anthracite focus-visible:bg-anthracite disabled:cursor-not-allowed disabled:bg-warm-gray disabled:text-cream"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
            {!isSubmitting ? <ArrowGlyph /> : null}
          </button>
          <p className="mt-4 text-center text-sm italic leading-6 text-anthracite/60">
            Aucun engagement à ce stade. Nous reviendrons vers vous pour confirmer.
          </p>
        </form>

        <ReassurancePanel />
      </div>
    </section>
  );
}

function inputProps(registerReturn: UseFormRegisterReturn) {
  return {
    ...registerReturn,
    className:
      "w-full rounded-lg border border-navy/10 bg-white px-4 py-3 text-navy placeholder:text-warm-gray/70 transition focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10 aria-[invalid=true]:border-[#9b2c2c]",
  };
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-navy/10 pt-8">
      <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  help,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-sm font-medium text-navy">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
      {help ? <span className="mt-2 block text-sm leading-6 text-anthracite/70">{help}</span> : null}
      <ErrorText message={error} />
    </label>
  );
}

function CheckboxField({
  id,
  label,
  required,
  error,
  className,
  registerReturn,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  registerReturn: UseFormRegisterReturn;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-anthracite">
        <input
          id={id}
          type="checkbox"
          aria-required={required}
          {...registerReturn}
          className="mt-1 size-4 rounded border-navy/20 text-navy focus:ring-navy"
        />
        <span>
          {label}
          {required ? " *" : ""}
        </span>
      </label>
      <ErrorText message={error} />
    </div>
  );
}

function ArrowGlyph() {
  return <span className="ml-2" aria-hidden="true">→</span>;
}

function ReassurancePanel() {
  const steps = [
    {
      icon: Phone,
      title: "Sous 24h ouvrées",
      description: "Nous vous appelons pour comprendre votre besoin et fixer un rendez-vous.",
    },
    {
      icon: FileText,
      title: "Avant la session",
      description: "Vous recevez par email le mandat écrit et la charte de confidentialité.",
    },
    {
      icon: Home,
      title: "Pendant la session",
      description: "À votre domicile, nous réalisons les démarches ensemble dans le respect de votre rythme.",
    },
  ];

  return (
    <aside className="rounded-xl bg-[#f0ebe3] p-6 text-navy lg:sticky lg:top-28 lg:p-8">
      <h3 className="font-heading text-2xl font-bold">Que se passe-t-il après ?</h3>
      <p className="mt-2 text-sm leading-6 text-anthracite">Trois étapes simples, sans pression.</p>
      <div className="mt-8 space-y-7">
        {steps.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream">
              <Icon className="size-5 text-navy" strokeWidth={1.5} />
            </span>
            <span>
              <span className="block font-medium text-navy">{title}</span>
              <span className="mt-1 block text-sm leading-6 text-anthracite">{description}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="my-8 h-px bg-navy/10" />

      <div className="rounded-xl bg-white p-4">
        <div className="flex gap-1 text-silver" aria-label="5 étoiles">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-4 fill-current" strokeWidth={1.5} />
          ))}
        </div>
        <blockquote className="mt-4 text-sm italic leading-7 text-anthracite">
          "J'avais peur de prendre rendez-vous. Tout s'est passé avec une douceur incroyable. Mon dossier CAF est enfin à jour."
        </blockquote>
        <p className="mt-4 font-medium text-navy">Mme T., 75 ans</p>
        <p className="mt-1 text-xs text-anthracite/70">Toulouse · Mars 2026</p>
      </div>

      <div className="my-8 h-px bg-navy/10" />

      <div className="space-y-3">
        {["Service déclaré SAP", "Assurance RC Pro", "Conforme RGPD"].map((badge) => (
          <div key={badge} className="flex items-center gap-3 text-sm font-medium text-anthracite">
            <Check className="size-4 text-warm-gray" strokeWidth={1.5} />
            {badge}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="font-medium text-navy">Vous préférez nous parler directement ?</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <a
            href="tel:0123456789"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-navy px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy hover:text-cream"
          >
            📞 Nous appeler
          </a>
          <a
            href="https://wa.me/33123456789"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-navy px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy hover:text-cream"
          >
            💬 WhatsApp
          </a>
        </div>
        <p className="mt-4 text-sm italic leading-6 text-anthracite/70">
          Disponible du lundi au vendredi, 9h-18h.
        </p>
      </div>
    </aside>
  );
}
