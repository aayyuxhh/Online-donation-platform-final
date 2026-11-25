/*
  WILL·INGNESS cause ticker — accessible, seamless and self-contained.
  Does not modify Store, app.js, donation logic or campaign data.
*/
(function () {
  "use strict";

  var slot = document.getElementById("news-ticker-slot");
  if (!slot || typeof INDIA_UPDATES === "undefined" || !INDIA_UPDATES.length) {
    if (slot) slot.style.minHeight = "0";
    return;
  }

  var PAUSE = '<svg class="icon-pause" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><rect x="2" y="1.5" width="2" height="7" rx=".6"/><rect x="6" y="1.5" width="2" height="7" rx=".6"/></svg>';
  var PLAY = '<svg class="icon-play" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M3 1.8v6.4a.4.4 0 0 0 .6.34l5.2-3.2a.4.4 0 0 0 0-.68L3.6 1.46A.4.4 0 0 0 3 1.8z"/></svg>';

  function make(tag, className, value) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  }

  function buildSet(hidden) {
    var list = make("ul", "news-ticker__set");
    if (hidden) list.setAttribute("aria-hidden", "true");

    INDIA_UPDATES.forEach(function (item) {
      var li = make("li", "news-ticker__item");
      var link = make("a", "news-ticker__link");
      link.href = item.url || "explore.html";
      link.setAttribute("aria-label", item.category + ": " + item.text + " Explore campaigns");
      if (hidden) link.tabIndex = -1;

      var category = make("span", "news-ticker__cat", item.category);
      var headline = make("span", "news-ticker__headline", item.text);
      var action = make("span", "news-ticker__meta", item.source || "Explore causes");
      var arrow = make("span", "news-ticker__arrow", "↗");

      link.appendChild(category);
      link.appendChild(headline);
      link.appendChild(action);
      link.appendChild(arrow);
      li.appendChild(link);
      list.appendChild(li);
    });
    return list;
  }

  var section = make("section", "news-ticker is-offscreen");
  section.setAttribute("aria-label", "Donation needs across India");

  var inner = make("div", "news-ticker__inner");
  var label = make("div", "news-ticker__label");
  label.appendChild(make("span", "news-ticker__pulse"));
  label.appendChild(make("span", "", "Causes to support"));

  var viewport = make("div", "news-ticker__viewport");
  viewport.setAttribute("aria-label", "Scrolling donation causes");
  var track = make("div", "news-ticker__track");
  track.appendChild(buildSet(false));
  track.appendChild(buildSet(true));
  viewport.appendChild(track);

  var toggle = make("button", "news-ticker__toggle");
  toggle.type = "button";
  toggle.setAttribute("aria-pressed", "false");
  toggle.setAttribute("aria-label", "Pause scrolling causes");
  toggle.innerHTML = PAUSE + PLAY;
  toggle.addEventListener("click", function () {
    var paused = section.classList.toggle("is-paused");
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Resume scrolling causes" : "Pause scrolling causes");
  });

  inner.appendChild(label);
  inner.appendChild(viewport);
  inner.appendChild(toggle);
  section.appendChild(inner);
  slot.appendChild(section);

  function setSpeed() {
    var half = track.scrollWidth / 2;
    var speed = window.innerWidth < 600 ? 32 : 42;
    if (half > 0) section.style.setProperty("--nt-duration", Math.max(38, half / speed) + "s");
  }
  setSpeed();
  window.addEventListener("resize", setSpeed, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setSpeed);

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          section.classList.remove("is-offscreen");
        } else {
          section.classList.add("is-offscreen");
        }
      });
    }, { threshold: 0.12 });
    observer.observe(section);
  } else {
    section.classList.add("is-visible");
    section.classList.remove("is-offscreen");
  }
})();
