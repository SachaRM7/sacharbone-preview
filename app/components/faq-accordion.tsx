import { ChevronDown } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto mt-14 max-w-4xl divide-y divide-navy/10 rounded-xl border border-navy/10 bg-[#fbfbf8]">
      {items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-heading text-lg font-bold text-navy">
            <span>{item.question}</span>
            <ChevronDown
              className="mt-1 size-5 shrink-0 text-warm-gray transition group-open:rotate-180"
              strokeWidth={1.5}
            />
          </summary>
          <p className="mt-5 text-base leading-8 text-anthracite">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
