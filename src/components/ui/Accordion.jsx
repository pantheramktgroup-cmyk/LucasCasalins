import { useState } from "react";
import { Plus } from "lucide-react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition-colors hover:border-[var(--line-warm)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-heading text-lg text-text">{item.question}</span>
              <Plus
                className={`h-5 w-5 shrink-0 text-orange transition-transform ${isOpen ? "rotate-45" : "rotate-0"}`}
              />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-base leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
