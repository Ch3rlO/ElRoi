const timeUnits = {
  d: (duration) => () => timeUnits.h(duration)() * 24,
  h: (duration) => () => timeUnits.m(duration)() * 60,
  m: (duration) => () => timeUnits.s(duration)() * 60,
  s: (duration) => () => parseInt(duration) * 1000,
};

module.exports = { timeUnits };
