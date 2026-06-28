import { useLandingVariant } from "../../hooks/useLandingVariant";
import OutcomesA from "./OutcomesA";
import OutcomesB from "./OutcomesB";

export default function OutcomesSection(props) {
  const variant = useLandingVariant();
  return variant === "A" ? <OutcomesA {...props} /> : <OutcomesB {...props} />;
}
