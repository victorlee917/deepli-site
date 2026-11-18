// Shows the Korean or English half of the page: ?lang=ko|en first, then the browser language.
(function () {
  var root = document.documentElement;
  var asked = new URLSearchParams(location.search).get("lang");
  var browser = (navigator.language || "en").toLowerCase().indexOf("ko") === 0 ? "ko" : "en";
  var lang = asked === "ko" || asked === "en" ? asked : browser;

  function apply(next) {
    root.setAttribute("lang", next);
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === next));
    });
    var title = document.querySelector('meta[name="title-' + next + '"]');
    if (title) document.title = title.content;
  }

  apply(lang);
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".langs button");
    if (!b) return;
    apply(b.dataset.set);
    var url = new URL(location.href);
    url.searchParams.set("lang", b.dataset.set);
    history.replaceState(null, "", url);
  });
})();
