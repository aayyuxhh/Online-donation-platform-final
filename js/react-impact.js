// A small React component added to the existing vanilla-JS website.
(function () {
  const e = React.createElement;

  function ImpactCalculator() {
    const [amount, setAmount] = React.useState(2500);
    const kits = Math.floor(amount / 250);

    return e("div", { className: "react-impact-card" },
      e("div", null,
        e("span", { className: "eyebrow-label" }, "INTERACTIVE • REACT"),
        e("h2", null, "Your gift, made tangible"),
        e("p", null, "Move the slider to see an example of how your donation could help."),
        e("input", {
          className: "react-impact-slider",
          type: "range", min: 250, max: 25000, step: 250,
          value: amount,
          onChange: function (event) { setAmount(Number(event.target.value)); }
        }),
        e("div", { style: { display: "flex", justifyContent: "space-between", fontWeight: 700 } },
          e("span", null, "₹250"), e("span", null, "₹25,000")
        )
      ),
      e("div", { className: "react-impact-result" },
        e("span", null, "Your selected contribution"),
        e("strong", null, "₹" + amount.toLocaleString("en-IN")),
        e("p", null, "Could support approximately " + kits + " essential kit(s) or meal packs.")
      )
    );
  }

  const root = document.getElementById("react-impact-root");
  if (root) ReactDOM.createRoot(root).render(e(ImpactCalculator));
})();
