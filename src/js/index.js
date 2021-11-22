var FADEIN = {
  init: function(){
    this.run();
  },
  run: function(){
    const elBox = Array.from(document.querySelectorAll('.jsc-fadein'));
    const options = {
      root: null,
      rootMargin: "100% 0px 0px 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver(doWhenIntersect, options);
    elBox.forEach(box => {
      observer.observe(box);
    });

    function doWhenIntersect(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateIndex(entry.target);
        }
      });
    };
    function activateIndex(element) {
      element.classList.add('fadein');
    };
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  FADEIN.init();
});
