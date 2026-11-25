const SEED_CAMPAIGNS = [
  {
    id: "camp-101",
    title: "Solar Classroom Power for Six Village Schools",
    org: "SuryaGram Foundation",
    category: "Education",
    location: "Vijayawada, AP",
    raised: 425000,
    goal: 500000,
    donorsCount: 312,
    daysLeft: 12,
    urgent: true,
    verified: true,
    status: "approved",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    description: "Afternoon heat and sudden power cuts regularly shut down fans and projectors in six rural schools serving 1,800 children. We are installing rooftop solar units with battery backup so classes run smoothly all day.",
    milestones: [
      { title: "Roof inspections & mounting frames", amount: 150000, done: true },
      { title: "Solar panels & inverters delivered", amount: 350000, done: true },
      { title: "Battery setup & school handover", amount: 500000, done: false }
    ]
  },
  {
    id: "camp-102",
    title: "Warm Incubators for Premature Babies in District Ward",
    org: "Arogya Seva Trust",
    category: "Healthcare",
    location: "Guntur, AP",
    raised: 680000,
    goal: 800000,
    donorsCount: 540,
    daysLeft: 6,
    urgent: true,
    verified: true,
    status: "approved",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
    description: "Families traveling from nearby villages often need immediate neonatal care for underweight newborns. This fund covers eight transport incubators and oxygen monitors for the public pediatric ward.",
    milestones: [
      { title: "First four incubators placed in ward", amount: 400000, done: true },
      { title: "Nursing & doctor equipment briefing", amount: 600000, done: true },
      { title: "Final four incubators & monitors", amount: 800000, done: false }
    ]
  },
  {
    id: "camp-103",
    title: "Mangrove Saplings Along Coastal Fishing Villages",
    org: "BlueCoast Ecology",
    category: "Environment",
    location: "Kakinada, AP",
    raised: 290000,
    goal: 450000,
    donorsCount: 198,
    daysLeft: 24,
    urgent: false,
    verified: true,
    status: "approved",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    description: "Working alongside local fisherfolk, we are planting 50,000 native mangroves along erosion-prone creeks to buffer storm surges and bring back crab and fish nurseries.",
    milestones: [
      { title: "50,000 saplings grown in coastal nursery", amount: 150000, done: true },
      { title: "First wave of shoreline planting", amount: 300000, done: false },
      { title: "Village guard upkeep & survival check", amount: 450000, done: false }
    ]
  },
  {
    id: "camp-104",
    title: "Hot Evening Meals for Daily Wage & Elderly Neighbors",
    org: "Annapurna Collective",
    category: "Food & Hunger",
    location: "Mumbai, MH",
    raised: 510000,
    goal: 600000,
    donorsCount: 689,
    daysLeft: 9,
    urgent: true,
    verified: true,
    status: "approved",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
    description: "After long shifts on construction sites or market stalls, many workers and older residents skip dinner. Every ₹50 prepares a freshly cooked meal of dal, rice, rotis, and seasonal vegetables.",
    milestones: [
      { title: "Rice, lentils & spice stock bought", amount: 200000, done: true },
      { title: "8,000 hot meals served at community spots", amount: 450000, done: true },
      { title: "4,000 more meals & van fuel", amount: 600000, done: false }
    ]
  },
  {
    id: "camp-105",
    title: "Weekend Coding & Robotics Kits for High School Girls",
    org: "NextGen Innovators",
    category: "Education",
    location: "Visakhapatnam, AP",
    raised: 185000,
    goal: 350000,
    donorsCount: 142,
    daysLeft: 30,
    urgent: false,
    verified: true,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80",
    description: "Students rarely get hands-on electronics before college. We run Saturday workshops with shared laptops, sensors, and local engineering mentors for 400 schoolgirls.",
    milestones: [
      { title: "Lesson plans & volunteer mentors ready", amount: 100000, done: true },
      { title: "Laptops & starter circuit kits bought", amount: 250000, done: false },
      { title: "Student project showcase day", amount: 350000, done: false }
    ]
  },
  {
    id: "camp-106",
    title: "Street Vet Van for Injured Animals Near Highways",
    org: "Paws & Care India",
    category: "Animal Welfare",
    location: "Pune, MH",
    raised: 215000,
    goal: 300000,
    donorsCount: 230,
    daysLeft: 18,
    urgent: false,
    verified: true,
    status: "approved",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
    description: "Stray dogs and cattle hit near busy roads often wait hours for help. This mobile clinic van carries a vet, wound-care supplies, and portable splints straight to where animals are found.",
    milestones: [
      { title: "Van fitted with ramp & medical shelves", amount: 150000, done: true },
      { title: "Medicines, bandages & vaccines stocked", amount: 225000, done: false },
      { title: "Six months of daily rescue runs", amount: 300000, done: false }
    ]
  }
];

const SEED_DONATIONS = [
  {
    txId: "WL-TXN-89412",
    campaignId: "camp-101",
    campaignTitle: "Solar Classroom Power for Six Village Schools",
    donorName: "Aarav Sharma",
    email: "aarav@example.com",
    amount: 5000,
    method: "UPI",
    message: "Hope the fans and lights keep running all afternoon.",
    date: "2026-11-24 14:22"
  },
  {
    txId: "WL-TXN-89413",
    campaignId: "camp-102",
    campaignTitle: "Warm Incubators for Premature Babies in District Ward",
    donorName: "Sneha Reddy",
    email: "sneha@example.com",
    amount: 12000,
    method: "Card",
    message: "Wishing strength to the babies and hospital staff.",
    date: "2026-11-24 18:05"
  },
  {
    txId: "WL-TXN-89414",
    campaignId: "camp-104",
    campaignTitle: "Hot Evening Meals for Daily Wage & Elderly Neighbors",
    donorName: "Anonymous",
    email: "anon@example.com",
    amount: 2500,
    method: "UPI",
    message: "Glad to chip in for warm evening meals.",
    date: "2026-11-25 09:40"
  },
  {
    txId: "WL-TXN-89415",
    campaignId: "camp-101",
    campaignTitle: "Solar Classroom Power for Six Village Schools",
    donorName: "Rohan Verma",
    email: "rohan@example.com",
    amount: 10000,
    method: "NetBanking",
    message: "Clean power in schools makes such a real difference.",
    date: "2026-11-25 11:15"
  }
];

const SEED_USERS = [
  {
    name: "Arnav Nandan",
    email: "arnav@willingness.org",
    password: "password123",
    city: "Vijayawada"
  }
];

const Store = {
  init() {
    if (!localStorage.getItem("kf_campaigns")) {
      localStorage.setItem("kf_campaigns", JSON.stringify(SEED_CAMPAIGNS));
    }
    if (!localStorage.getItem("kf_donations")) {
      localStorage.setItem("kf_donations", JSON.stringify(SEED_DONATIONS));
    }
    if (!localStorage.getItem("kf_bookmarks")) {
      localStorage.setItem("kf_bookmarks", JSON.stringify(["camp-101"]));
    }
    if (!localStorage.getItem("wl_users")) {
      localStorage.setItem("wl_users", JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem("wl_session")) {
      localStorage.setItem("wl_session", JSON.stringify({
        name: "Arnav Nandan",
        email: "arnav@willingness.org",
        loggedIn: true
      }));
    }
  },

  getCampaigns() {
    return JSON.parse(localStorage.getItem("kf_campaigns")) || [];
  },

  saveCampaigns(list) {
    localStorage.setItem("kf_campaigns", JSON.stringify(list));
  },

  addCampaign(camp) {
    const list = this.getCampaigns();
    list.unshift(camp);
    this.saveCampaigns(list);
  },

  getDonations() {
    return JSON.parse(localStorage.getItem("kf_donations")) || [];
  },

  addDonation(tx) {
    const donations = this.getDonations();
    donations.unshift(tx);
    localStorage.setItem("kf_donations", JSON.stringify(donations));

    const campaigns = this.getCampaigns();
    const target = campaigns.find(c => c.id === tx.campaignId);
    if (target) {
      target.raised += Number(tx.amount);
      target.donorsCount += 1;
      this.saveCampaigns(campaigns);
    }
  },

  getBookmarks() {
    return JSON.parse(localStorage.getItem("kf_bookmarks")) || [];
  },

  toggleBookmark(id) {
    let bm = this.getBookmarks();
    if (bm.includes(id)) {
      bm = bm.filter(item => item !== id);
    } else {
      bm.push(id);
    }
    localStorage.setItem("kf_bookmarks", JSON.stringify(bm));
    return bm.includes(id);
  },

  getUsers() {
    return JSON.parse(localStorage.getItem("wl_users")) || [];
  },

  registerUser({ name, email, password, city }) {
    const users = this.getUsers();
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, message: "An account with this email already exists. Try logging in." };
    }
    const newUser = { name, email, password, city: city || "India" };
    users.push(newUser);
    localStorage.setItem("wl_users", JSON.stringify(users));
    this.setSession({ name, email, loggedIn: true });
    return { ok: true, user: newUser };
  },

  loginUser(email, password) {
    const users = this.getUsers();
    const match = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) {
      return { ok: false, message: "Email or password didn't match. (Demo: arnav@willingness.org / password123)" };
    }
    this.setSession({ name: match.name, email: match.email, loggedIn: true });
    return { ok: true, user: match };
  },

  logoutUser() {
    localStorage.setItem("wl_session", JSON.stringify({
      name: "Guest",
      email: "",
      loggedIn: false
    }));
  },

  getSession() {
    return JSON.parse(localStorage.getItem("wl_session")) || { name: "Guest", email: "", loggedIn: false };
  },

  setSession(session) {
    localStorage.setItem("wl_session", JSON.stringify(session));
  },

  // Backward-compatible helper used by navbar
  getUser() {
    const s = this.getSession();
    return {
      name: s.loggedIn ? s.name : "Sign In",
      email: s.email || "donor@willingness.org",
      loggedIn: s.loggedIn
    };
  }
};

function formatINR(num) {
  return "₹" + Number(num).toLocaleString("en-IN");
}

function calcPercent(raised, goal) {
  return Math.min(100, Math.round((raised / goal) * 100));
}

Store.init();