
/* Motion polish: progressive enhancement, respects reduced-motion preferences. */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.addEventListener("DOMContentLoaded", function () {
    var selectors = ".section-header, .quick-donate-bar, .filter-bar, .detail-grid > *, .milestone-item, .kpi-card, .table-wrap";
    document.querySelectorAll(selectors).forEach(function (node, index) {
      if (node.classList.contains("reveal-on-scroll")) return;
      node.classList.add("reveal-on-scroll");
      node.style.transitionDelay = Math.min(index % 5, 4) * 70 + "ms";
    });
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal-on-scroll").forEach(function(n){n.classList.add("is-revealed");});
      return;
    }
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.08, rootMargin:"0px 0px -35px 0px"});
    document.querySelectorAll(".reveal-on-scroll").forEach(function(node){observer.observe(node);});
  });
})();
