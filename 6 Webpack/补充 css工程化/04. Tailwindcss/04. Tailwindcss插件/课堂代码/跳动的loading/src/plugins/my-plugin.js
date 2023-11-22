module.exports = function ({ addUtilities }) {
  const newUtilities = {
    "@keyframes slide": {
      "0%": { transform: "translateX(0)", filter: "brightness(1)" },
      "100%": {
        transform: "translateX(236px)",
        filter: "brightness(1.45)",
      },
    },
    ".slide": {
      animation: "slide 1.5s ease-in-out infinite alternate",
    },
  };

  // 上面的 slide 我们单独添加
  // 之后的 jump-off 1～4
  // 以及 jump-down 1～4 我们通过 for 循环来进行添加
  for (let i = 1; i <= 4; i++) {
    newUtilities[`@keyframes jump-off-${i}`] = {
      "0%": { transform: "rotate(0deg)" },
      // 15 30 45 60
      [`${i * 15}%`]: { transform: "rotate(0deg)" },
      // 35 50 65 80
      [`${i * 15 + 20}%`]: {
        transformOrigin: "-50% center",
        transform: "rotate(-180deg)",
      },
      "100%": {
        transformOrigin: "-50% center",
        transform: "rotate(-180deg)",
      },
    };

    newUtilities[`@keyframes jump-down-${i}`] = {
      // 5 20 35 50
      [`${5 + (i - 1) * 15}%`]: { transform: "scale(1, 1)" },
      // 15 30 45 60
      [`${15 + (i - 1) * 15}%`]: {
        transformOrigin: "center bottom",
        transform: "scale(1.3, 0.7)",
      },
      [`${20 + (i - 1) * 15}%`]: {
        transformOrigin: "center bottom",
        transform: "scale(0.8, 1.4)",
      },
      [`${25 + (i - 1) * 15}%`]: {
        transformOrigin: "center bottom",
        transform: "scale(0.8, 1.4)",
      },
      [`${40 + (i - 1) * 15}%`]: {
        transformOrigin: "center top",
        transform: "scale(1.3, 0.7)",
      },
      [`${55 + (i - 1) * 15}%`]: { transform: "scale(1, 1)" },
      "100%": { transform: "scale(1, 1)" },
    };

    newUtilities[`.jump-off-${i}`] = {
      animation: `jump-off-${i} 1.5s ease-in-out infinite alternate`,
    };

    newUtilities[`.jump-down-${i}`] = {
      animation: `jump-down-${i} 1.5s ease-in-out infinite alternate`,
    };
  }

  addUtilities(newUtilities);
};
