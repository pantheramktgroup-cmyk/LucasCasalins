import DifferentiatorsSection from "./DifferentiatorsSection";
import MethodSectionB from "./MethodSectionB";
import { useLandingVariant } from "../../hooks/useLandingVariant";

export default function MethodSection({ data }) {
  const variant = useLandingVariant();
  // Variant B uses the narrative step-list approach; A uses the 3-card grid.
  return variant === "B" ? (
    <MethodSectionB data={data} />
  ) : (
    <DifferentiatorsSection data={data} />
  );
}
