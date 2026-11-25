document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  renderNavbar();
  renderFooter();
  injectGlobalModals();
});

function applySavedTheme() {
  const theme = localStorage.getItem("kf_theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("kf_theme", next);
  const btn = document.getElementById("themeToggleBtn");
  if (btn) btn.textContent = next === "dark" ? "☀" : "◐";
}

function showToast(msg) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3400);
}

function renderNavbar() {
  const navSlot = document.getElementById("navbar-slot");
  if (!navSlot) return;

  const page = window.location.pathname.split("/").pop() || "index.html";
  const theme = localStorage.getItem("kf_theme") || "light";
  const session = Store.getSession();

  const accountControls = session.loggedIn
    ? `
      <a href="dashboard.html" class="btn btn-outline btn-sm">${session.name.split(" ")[0]}</a>
      <button class="btn btn-outline btn-sm" onclick="handleLogout()">Log out</button>
    `
    : `
      <button class="btn btn-outline btn-sm" onclick="openAuthModal('login')">Log in</button>
      <button class="btn btn-outline btn-sm" onclick="openAuthModal('signup')">Sign up</button>
    `;

  navSlot.innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="logo">
        <span class="logo-mark"></span>
        <span>WILL·INGNESS</span>
      </a>
      <ul class="nav-links">
        <li><a href="index.html" class="${page === 'index.html' ? 'active' : ''}">Home</a></li>
        <li><a href="explore.html" class="${page === 'explore.html' ? 'active' : ''}">Explore Causes</a></li>
        <li><a href="create.html" class="${page === 'create.html' ? 'active' : ''}">Start a Campaign</a></li>
        <li><a href="dashboard.html" class="${page === 'dashboard.html' ? 'active' : ''}">Dashboard</a></li>
      </ul>
      <div class="nav-actions">
        <button id="themeToggleBtn" class="icon-btn" onclick="toggleTheme()" title="Toggle Theme">
          ${theme === "dark" ? "☀" : "◐"}
        </button>
        ${accountControls}
        <button class="btn btn-primary btn-sm" onclick="openDonateModal('camp-101')">Donate Now</button>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const footerSlot = document.getElementById("footer-slot");
  if (!footerSlot) return;

  footerSlot.innerHTML = `
    <footer>
      <div class="footer-grid">
        <div>
          <div class="logo" style="margin-bottom:0.8rem;">
            <span class="logo-mark"></span>
            <span>WILL·INGNESS</span>
          </div>
          <p style="color:var(--text-secondary); font-size:0.9rem; max-width:340px;">
            People who want to help, paired with local efforts doing the work on the ground—openly tracked and easy to follow.
          </p>
        </div>
        <div>
          <h4 style="margin-bottom:0.8rem;">Explore</h4>
          <p><a href="explore.html" style="color:var(--text-secondary); font-size:0.9rem;">All Campaigns</a></p>
          <p><a href="create.html" style="color:var(--text-secondary); font-size:0.9rem;">Start a Fundraiser</a></p>
          <p><a href="dashboard.html" style="color:var(--text-secondary); font-size:0.9rem;">Donor Leaderboard</a></p>
        </div>
        <div>
          <h4 style="margin-bottom:0.8rem;">How It Works</h4>
          <p style="color:var(--text-secondary); font-size:0.9rem;">80G Tax Receipts</p>
          <p style="color:var(--text-secondary); font-size:0.9rem;">Milestone Check-ins</p>
          <p style="color:var(--text-secondary); font-size:0.9rem;">No Platform Cut</p>
        </div>
        <div>
          <h4 style="margin-bottom:0.8rem;">Monthly Updates</h4>
          <div style="display:flex; gap:0.4rem;">
            <input type="email" id="newsEmail" class="input-control" placeholder="you@example.com">
            <button class="btn btn-primary btn-sm" onclick="subscribeNewsletter()">Join</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 WILL·INGNESS</span>
        <span>Local demo data &amp; downloadable receipts included.</span>
      </div>
    </footer>
  `;
}

function subscribeNewsletter() {
  const email = document.getElementById("newsEmail")?.value;
  if (!email || !email.includes("@")) {
    showToast("Please enter a valid email address.");
    return;
  }
  showToast("You're on the list for monthly stories.");
  document.getElementById("newsEmail").value = "";
}

function buildCampaignCard(camp) {
  const pct = calcPercent(camp.raised, camp.goal);
  const isSaved = Store.getBookmarks().includes(camp.id);

  return `
    <article class="card">
      <div class="card-img-wrap">
        <a href="campaign.html?id=${camp.id}">
          <img src="${camp.image}" alt="${camp.title}" loading="lazy">
        </a>
        <div class="card-badges">
          <div style="display:flex; gap:0.4rem;">
            <span class="tag">${camp.category}</span>
            ${camp.urgent ? '<span class="tag tag-urgent">Needs Help Soon</span>' : ''}
          </div>
          <button class="bookmark-btn ${isSaved ? 'saved' : ''}" onclick="handleBookmark('${camp.id}', this)" title="Save Campaign">
            ${isSaved ? '♥' : '♡'}
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-org">
          <span>${camp.org}</span>
          <span style="color:var(--text-muted);">• ${camp.location}</span>
        </div>
        <a href="campaign.html?id=${camp.id}">
          <h3 class="card-title">${camp.title}</h3>
        </a>
        <p class="card-desc">${camp.description}</p>
        <div class="progress-wrap">
          <div class="progress-bar">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>
          <div class="progress-meta">
            <span><strong>${formatINR(camp.raised)}</strong> raised of ${formatINR(camp.goal)}</span>
            <span><strong>${pct}%</strong> • ${camp.daysLeft}d left</span>
          </div>
          <div class="card-actions">
            <a href="campaign.html?id=${camp.id}" class="btn btn-outline btn-sm">Read Story</a>
            <button class="btn btn-primary btn-sm" onclick="openDonateModal('${camp.id}')">Donate Now</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function handleBookmark(id, btnEl) {
  const saved = Store.toggleBookmark(id);
  btnEl.classList.toggle("saved", saved);
  btnEl.textContent = saved ? "♥" : "♡";
  showToast(saved ? "Saved to your list" : "Removed from saved list");
}

// ==========================================
// LOGIN & SIGN UP MODAL
// ==========================================
let currentAuthMode = "login";

function openAuthModal(mode = "login") {
  currentAuthMode = mode;
  const modal = document.getElementById("authModal");
  if (!modal) return;

  document.getElementById("tabLoginBtn").classList.toggle("active", mode === "login");
  document.getElementById("tabSignupBtn").classList.toggle("active", mode === "signup");
  document.getElementById("signupOnlyFields").style.display = mode === "signup" ? "block" : "none";
  document.getElementById("authSubmitBtn").textContent = mode === "login" ? "Log in to Account" : "Create Account";
  document.getElementById("authModalTitle").textContent = mode === "login" ? "Welcome back" : "Join WILL·INGNESS";
  document.getElementById("authErrorMsg").textContent = "";

  if (mode === "login") {
    document.getElementById("authEmail").value = "arnav@willingness.org";
    document.getElementById("authPassword").value = "password123";
  } else {
    document.getElementById("authName").value = "";
    document.getElementById("authCity").value = "";
    document.getElementById("authEmail").value = "";
    document.getElementById("authPassword").value = "";
  }

  modal.classList.add("open");
}

function closeAuthModal() {
  document.getElementById("authModal")?.classList.remove("open");
}

function submitAuthForm(e) {
  e.preventDefault();
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const errEl = document.getElementById("authErrorMsg");

  if (currentAuthMode === "login") {
    const res = Store.loginUser(email, password);
    if (!res.ok) {
      errEl.textContent = res.message;
      return;
    }
    closeAuthModal();
    renderNavbar();
    showToast(`Signed in as ${res.user.name}`);
  } else {
    const name = document.getElementById("authName").value.trim();
    const city = document.getElementById("authCity").value.trim();
    if (!name) {
      errEl.textContent = "Please enter your full name.";
      return;
    }
    const res = Store.registerUser({ name, email, password, city });
    if (!res.ok) {
      errEl.textContent = res.message;
      return;
    }
    closeAuthModal();
    renderNavbar();
    showToast(`Account created for ${res.user.name}!`);
  }
}

function handleLogout() {
  Store.logoutUser();
  renderNavbar();
  showToast("You have signed out.");
}

// ==========================================
// MULTI-STEP DONATION + OTP + RECEIPT ENGINE
// ==========================================
let activeDonationCampaignId = null;
let selectedPayMethod = "UPI";
let generatedOTP = "4829";
let lastCompletedTx = null;

function injectGlobalModals() {
  const modalHTML = `
    <!-- Login / Sign Up Modal -->
    <div id="authModal" class="modal-backdrop">
      <div class="modal-box">
        <button class="modal-close" onclick="closeAuthModal()">✕</button>
        <span class="eyebrow-label" style="margin-bottom:0.3rem;">MEMBER ACCESS</span>
        <h3 id="authModalTitle" style="font-family:var(--font-display); font-size:1.85rem; margin-bottom:1rem;">Welcome back</h3>

        <div class="auth-switch">
          <button type="button" id="tabLoginBtn" class="active" onclick="openAuthModal('login')">Log in</button>
          <button type="button" id="tabSignupBtn" onclick="openAuthModal('signup')">Sign up</button>
        </div>

        <form onsubmit="submitAuthForm(event)" style="display:flex; flex-direction:column; gap:0.85rem;">
          <div id="signupOnlyFields" style="display:none;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem;">
              <input type="text" id="authName" class="input-control" placeholder="Full Name">
              <input type="text" id="authCity" class="input-control" placeholder="City (e.g. Vijayawada)">
            </div>
          </div>

          <input type="email" id="authEmail" class="input-control" required placeholder="Email address">
          <input type="password" id="authPassword" class="input-control" required minlength="6" placeholder="Password (min. 6 characters)">

          <p id="authErrorMsg" style="color:var(--danger); font-size:0.82rem; min-height:1.1rem;"></p>

          <button type="submit" id="authSubmitBtn" class="btn btn-primary" style="width:100%;">Log in to Account</button>
        </form>
      </div>
    </div>

    <!-- Donation Modal -->
    <div id="donateModal" class="modal-backdrop">
      <div class="modal-box">
        <button class="modal-close" onclick="closeDonateModal()">✕</button>
        <span class="eyebrow-label" style="margin-bottom:0.35rem;">80G TAX-DEDUCTIBLE CONTRIBUTION</span>
        <h3 id="modalCampTitle" style="font-family:var(--font-display); font-size:1.65rem; line-height:1.15; margin-bottom:1rem;">Support Campaign</h3>

        <div id="donateStep1">
          <label style="font-size:0.85rem; font-weight:700;">Choose Amount (INR)</label>
          <div class="amount-pills" style="margin:0.5rem 0 0.9rem;">
            <button type="button" class="amount-pill" onclick="setModalAmount(500)">₹500</button>
            <button type="button" class="amount-pill selected" onclick="setModalAmount(1500)">₹1,500</button>
            <button type="button" class="amount-pill" onclick="setModalAmount(5000)">₹5,000</button>
            <button type="button" class="amount-pill" onclick="setModalAmount(10000)">₹10,000</button>
          </div>
          <input type="number" id="donateAmountInput" class="input-control" value="1500" min="50" style="margin-bottom:0.8rem;" placeholder="Custom Amount (₹)">

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-bottom:0.8rem;">
            <input type="text" id="donorNameInput" class="input-control" placeholder="Your Full Name">
            <input type="email" id="donorEmailInput" class="input-control" placeholder="Email for 80G Receipt">
          </div>

          <input type="text" id="donorMessageInput" class="input-control" placeholder="Leave a short note of encouragement (optional)" style="margin-bottom:0.8rem;">

          <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; margin-bottom:1rem; cursor:pointer;">
            <input type="checkbox" id="anonCheck"> Post my name as Anonymous on the donor wall
          </label>

          <label style="font-size:0.85rem; font-weight:700;">Payment Method</label>
          <div class="payment-methods">
            <div class="pay-tab active" onclick="selectPayMethod('UPI', this)">UPI / QR</div>
            <div class="pay-tab" onclick="selectPayMethod('Card', this)">Card</div>
            <div class="pay-tab" onclick="selectPayMethod('NetBanking', this)">NetBanking</div>
          </div>

          <div id="payDynamicField" style="margin-bottom:1rem;">
            <input type="text" id="upiIdInput" class="input-control" placeholder="Enter UPI ID (e.g. name@okicici)" value="donor@okaxis">
          </div>

          <button class="btn btn-primary" style="width:100%;" onclick="proceedToOTP()">Continue to Verification →</button>
        </div>

        <div id="donateStep2" style="display:none; text-align:center; padding:1rem 0;">
          <h4>Quick Payment Check</h4>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin:0.5rem 0 1rem;">
            Enter the 4-digit code to finish this simulated donation.<br>
            <strong style="color:var(--accent);">(Demo code: <span id="demoOtpHint">4829</span>)</strong>
          </p>
          <input type="text" id="otpInput" maxlength="4" class="input-control" style="text-align:center; font-size:1.4rem; letter-spacing:8px; font-weight:800; max-width:180px; margin:0 auto 1.2rem;" placeholder="••••">
          <div style="display:flex; gap:0.7rem;">
            <button class="btn btn-outline" style="flex:1;" onclick="backToStep1()">← Back</button>
            <button class="btn btn-primary" style="flex:2;" onclick="confirmDonationPayment()">Complete Donation</button>
          </div>
        </div>

        <div id="donateStep3" style="display:none; text-align:center; padding:0.5rem 0;">
          <h3 style="color:var(--success); font-family:var(--font-display); font-size:1.9rem;">Thank you for giving</h3>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin:0.4rem 0 1rem;">
            Your gift has been added to the campaign total and ledger.
          </p>
          <div id="receiptSummaryBox" style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-sm); text-align:left; font-size:0.85rem; margin-bottom:1.2rem; border:1px dashed var(--border);">
          </div>
          <div style="display:flex; gap:0.7rem;">
            <button class="btn btn-outline" style="flex:1;" onclick="downloadReceiptFile()">Download Receipt</button>
            <button class="btn btn-primary" style="flex:1;" onclick="finishDonationFlow()">Done</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function openDonateModal(campaignId, presetAmount = 1500) {
  const camp = Store.getCampaigns().find(c => c.id === campaignId) || Store.getCampaigns()[0];
  if (!camp) return;

  const session = Store.getSession();
  activeDonationCampaignId = camp.id;
  document.getElementById("modalCampTitle").textContent = camp.title;
  document.getElementById("donateAmountInput").value = presetAmount;
  document.getElementById("donorNameInput").value = session.loggedIn ? session.name : "";
  document.getElementById("donorEmailInput").value = session.loggedIn ? session.email : "";
  document.getElementById("donateStep1").style.display = "block";
  document.getElementById("donateStep2").style.display = "none";
  document.getElementById("donateStep3").style.display = "none";
  document.getElementById("donateModal").classList.add("open");
}

function closeDonateModal() {
  document.getElementById("donateModal").classList.remove("open");
}

function setModalAmount(val) {
  document.getElementById("donateAmountInput").value = val;
  document.querySelectorAll("#donateStep1 .amount-pill").forEach(el => {
    el.classList.toggle("selected", el.textContent.replace(/[₹,]/g, "") == val);
  });
}

function selectPayMethod(method, el) {
  selectedPayMethod = method;
  document.querySelectorAll(".pay-tab").forEach(t => t.classList.remove("active"));
  el.classList.add("active");

  const container = document.getElementById("payDynamicField");
  if (method === "UPI") {
    container.innerHTML = `<input type="text" class="input-control" placeholder="Enter UPI ID (e.g. name@okicici)" value="donor@okaxis">`;
  } else if (method === "Card") {
    container.innerHTML = `
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:0.5rem;">
        <input type="text" class="input-control" placeholder="Card Number" value="4532 •••• •••• 8891">
        <input type="text" class="input-control" placeholder="CVV" value="742">
      </div>`;
  } else {
    container.innerHTML = `
      <select class="select-control">
        <option>State Bank of India (SBI)</option>
        <option>HDFC Bank</option>
        <option>ICICI Bank</option>
        <option>Axis Bank</option>
      </select>`;
  }
}

function proceedToOTP() {
  const amt = Number(document.getElementById("donateAmountInput").value);
  if (!amt || amt < 10) {
    showToast("Minimum donation amount is ₹10.");
    return;
  }
  generatedOTP = String(Math.floor(1000 + Math.random() * 9000));
  document.getElementById("demoOtpHint").textContent = generatedOTP;
  document.getElementById("otpInput").value = generatedOTP;
  document.getElementById("donateStep1").style.display = "none";
  document.getElementById("donateStep2").style.display = "block";
}

function backToStep1() {
  document.getElementById("donateStep2").style.display = "none";
  document.getElementById("donateStep1").style.display = "block";
}

function confirmDonationPayment() {
  const entered = document.getElementById("otpInput").value.trim();
  if (entered !== generatedOTP) {
    showToast("Code didn't match. Try the demo code shown.");
    return;
  }

  const camp = Store.getCampaigns().find(c => c.id === activeDonationCampaignId);
  const amount = Number(document.getElementById("donateAmountInput").value);
  const isAnon = document.getElementById("anonCheck").checked;
  const rawName = document.getElementById("donorNameInput").value.trim() || "Kindred Supporter";
  const email = document.getElementById("donorEmailInput").value.trim() || "supporter@willingness.org";
  const message = document.getElementById("donorMessageInput").value.trim() || "Wishing you all the best with this work.";

  const tx = {
    txId: "WL-TXN-" + Math.floor(10000 + Math.random() * 90000),
    campaignId: camp.id,
    campaignTitle: camp.title,
    donorName: isAnon ? "Anonymous" : rawName,
    email,
    amount,
    method: selectedPayMethod,
    message,
    date: new Date().toISOString().slice(0, 16).replace("T", " ")
  };

  Store.addDonation(tx);
  lastCompletedTx = tx;

  document.getElementById("receiptSummaryBox").innerHTML = `
    <div><strong>Receipt ID:</strong> ${tx.txId}</div>
    <div><strong>Campaign:</strong> ${tx.campaignTitle}</div>
    <div><strong>Donor:</strong> ${tx.donorName}</div>
    <div><strong>Amount Paid:</strong> ${formatINR(tx.amount)} (${tx.method})</div>
    <div><strong>Date:</strong> ${tx.date}</div>
    <div style="color:var(--success); margin-top:4px;">Eligible for tax benefit under Sec 80G</div>
  `;

  document.getElementById("donateStep2").style.display = "none";
  document.getElementById("donateStep3").style.display = "block";
}

function downloadReceiptFile() {
  if (!lastCompletedTx) return;
  const content = `
====================================================
          WILL·INGNESS - DONATION RECEIPT
====================================================
Receipt Number : ${lastCompletedTx.txId}
Date & Time    : ${lastCompletedTx.date}
Donor Name     : ${lastCompletedTx.donorName}
Donor Email    : ${lastCompletedTx.email}
Campaign       : ${lastCompletedTx.campaignTitle}
Amount Donated : INR ${lastCompletedTx.amount}
Payment Mode   : ${lastCompletedTx.method}
80G Reg No.    : AAATW8821PF20261
====================================================
Thank you for supporting local community work.
  `;
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${lastCompletedTx.txId}_Receipt.txt`;
  link.click();
  showToast("Receipt downloaded.");
}

function finishDonationFlow() {
  closeDonateModal();
  if (typeof refreshCurrentPage === "function") {
    refreshCurrentPage();
  }
}

/* Gentle reveal observer for content that enters the page, including
   campaign cards rendered dynamically by each page. */
(function initSoftReveal() {
  function observeRevealTargets(root) {
    var selector = ".campaign-grid > .card, .kpi-card, .milestone-item, .section-header";
    var nodes = (root || document).querySelectorAll(selector);
    nodes.forEach(function (node) {
      if (node.dataset.revealReady) return;
      node.dataset.revealReady = "true";
      node.classList.add("reveal-on-scroll");
      if (revealObserver) revealObserver.observe(node);
    });
  }

  var revealObserver = ("IntersectionObserver" in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" })
    : null;

  function start() {
    observeRevealTargets(document);
    if ("MutationObserver" in window) {
      var mutations = new MutationObserver(function (records) {
        records.forEach(function (record) {
          record.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              if (node.matches && node.matches(".campaign-grid > .card, .kpi-card, .milestone-item, .section-header")) {
                node.dataset.revealReady = "true";
                node.classList.add("reveal-on-scroll", "is-revealed");
              }
              observeRevealTargets(node);
            }
          });
        });
      });
      mutations.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
