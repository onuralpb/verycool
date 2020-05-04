export const addAnimate = (el, animation, speed) => {
  el.classList.add("animated", animation, speed);
  el.addEventListener("animationend", () => {
    el.classList.remove(`animated`, `${animation}`, `${speed}`);
  });
};
