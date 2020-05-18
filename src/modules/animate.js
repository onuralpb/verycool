export const addAnimate = (el, animation, speed) => {
  el.classList.add(
    "animate__animated",
    `animate__${animation}`,
    `animate__${speed}`
  );
  el.addEventListener("animationend", () => {
    el.classList.remove(
      `animate__animated`,
      `animate__${animation}`,
      `animate__${speed}`
    );
  });
};
