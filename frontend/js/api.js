// Shared API helper — use same host as the page (avoids localhost vs 127.0.0.1 CORS issues)
function resolveApiBase() {
  if (window.API_BASE) return window.API_BASE;
  if (typeof location !== "undefined" && location.origin && /^https?:/.test(location.protocol)) {
    return location.origin;
  }
  return "http://127.0.0.1:8000";
}
const API_BASE = resolveApiBase();
const TOKEN_KEY = "lottery_token";
const USER_KEY = "lottery_user";

const auth = {
  get token(){ return localStorage.getItem(TOKEN_KEY); },
  get user(){ try{ return JSON.parse(localStorage.getItem(USER_KEY) || "null"); }catch{ return null; } },
  set(token, user){
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear(){ localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); },
};

let _currency = null;
async function getCurrency(){
  if (_currency) return _currency;
  try {
    _currency = await api("/api/deposits/currency", { auth: false });
  } catch {
    _currency = {
      pkr_per_riyal: 75,
      straight_prize_multiplier: 400,
      rumble_prize_multiplier: 80,
    };
  }
  return _currency;
}

async function api(path, { method = "GET", body, form, auth: needAuth = true } = {}){
  const headers = {};
  if (needAuth && auth.token) headers["Authorization"] = `Bearer ${auth.token}`;
  let payload;
  if (form) { payload = form; }
  else if (body !== undefined) { headers["Content-Type"] = "application/json"; payload = JSON.stringify(body); }
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { method, headers, body: payload });
  } catch {
    throw new Error(
      "Cannot reach the server. Start the backend, then open the app at http://127.0.0.1:8000/login.html (do not double-click the HTML file)."
    );
  }
  const text = await res.text();
  let data; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = (data && (data.detail || data.message)) || `Request failed (${res.status})`;
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return data;
}

function showMsg(el, msg, type = "error"){
  if (!el) return;
  el.textContent = msg;
  el.className = type;
  el.style.display = "block";
  if (type === "success") setTimeout(()=>{ el.style.display = "none"; }, 4000);
}

function requireAuth(adminOnly = false){
  if (!auth.token || !auth.user) { window.location.href = "login.html"; return false; }
  if (adminOnly && !auth.user.is_admin) { window.location.href = "dashboard.html"; return false; }
  return true;
}

function logout(){ auth.clear(); window.location.href = "login.html"; }

function fmtRiyal(n){
  return `SAR ${Number(n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
}
function fmtPkr(n){
  return `PKR ${Number(n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
}
function pkrToRiyal(pkr, rate = 75){
  return Math.round((Number(pkr) / rate) * 100) / 100;
}
function fmtDate(s){ return new Date(s).toLocaleString(); }

// Backward-compatible alias — all stored balances/prizes are in Riyal
function fmtMoney(n){ return fmtRiyal(n); }
