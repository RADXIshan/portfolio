import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useMagnetic = (ref) => {
  useGSAP(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)", force3D: true });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)", force3D: true });

    let rect = null;

    const handleMouseEnter = () => {
      rect = element.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      if (!rect) {
        rect = element.getBoundingClientRect();
      }
      const { clientX, clientY } = e;
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      rect = null;
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: ref });
};
