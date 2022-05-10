((self) => {
  const { src } = document.currentScript;

  let href = src.replace(/\/global.js/, "/host.js");
  href = href === src ? src + "/host.js" : href;
  self.$$ =
    self.$$ ||
    ((state, host = document.currentScript?.parentElement, config) =>
      import(href).then(({ default: $$ }) => $$(host, state, config)));
})(window);
