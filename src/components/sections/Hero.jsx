import { useLandingVariant } from "../../hooks/useLandingVariant";
import HeroA from "./HeroA";
import HeroB from "./HeroB";

export default function Hero(props) {
  const variant = useLandingVariant();
  return variant === "A" ? <HeroA {...props} /> : <HeroB {...props} />;
}
