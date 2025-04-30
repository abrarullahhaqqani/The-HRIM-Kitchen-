/*import { animate } from "framer-motion";
 */
export const buttonClick = {
  whileTap: { scale: 0.95 },
};
export const FadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
export const SlideTop = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

//Added this
export const slideIn = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 }, //just changed y to x
};

export const staggerFadeInOut = (i) => {
  return {
    intial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    tansition: { duration: 0.3, delay: i * 0.15 },
    key: { i },
  };
};
