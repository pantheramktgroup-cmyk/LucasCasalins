import { ChevronDown } from "lucide-react";

export default function ScrollArrow() {
  return (
    <div className="group mt-10 inline-flex flex-col items-center text-[var(--red)]">
      <ChevronDown className="h-7 w-7 animate-arrow-bounce drop-shadow-[0_0_14px_rgba(255,30,30,0.6)]" />
      <ChevronDown className="-mt-3 h-7 w-7 animate-arrow-bounce-delayed drop-shadow-[0_0_14px_rgba(255,30,30,0.6)]" />
    </div>
  );
}
