// Cole o mesmo firebaseConfig que usou em app.js:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECTID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const authStatus = document.getElementById('authStatus');
const authArea = document.getElementById('authArea');
const panel = document.getElementById('panel');
const results = document.getElementById('results');

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;
  authStatus.textContent = 'Entrando...';
  try {
    await auth.signInWithEmailAndPassword(email, pass);
    authStatus.textContent = '';
  } catch (err) {
    authStatus.textContent = 'Erro no login: ' + err.message;
  }
});

logoutBtn.addEventListener('click', () => auth.signOut());

auth.onAuthStateChanged(user => {
  if (user) {
    authArea.style.display = 'none';
    panel.style.display = 'block';
    loadResponses();
  } else {
    authArea.style.display = 'block';
    panel.style.display = 'none';
    results.innerHTML = '';
  }
});

async function loadResponses() {
  results.innerHTML = '<p class="muted">Carregando respostas...</p>';
  const snapshot = await db.collection('responses').orderBy('timestamp', 'desc').limit(500).get();
  if (snapshot.empty) {
    results.innerHTML = '<p class="muted">Nenhuma resposta ainda.</p>';
    return;
  }
  let html = '<table class="table"><thead><tr><th>Data</th><th>Conhecimento</th><th>Treinamento</th><th>Frequência</th><th>Compartilha</th><th>Risco</th><th>Ação</th><th>Opinião</th></tr></thead><tbody>';
  snapshot.forEach(doc => {
    const r = doc.data();
    const ts = r.timestamp ? new Date(r.timestamp.seconds * 1000).toLocaleString() : '—';
    html += `<tr><td>${ts}</td><td>${r.conhecimento||''}</td><td>${r.treinamento||''}</td><td>${r.frequencia||''}</td><td>${r.compartilha||''}</td><td>${r.risco||''}</td><td>${r.acao||''}</td><td>${(r.opiniao||'').slice(0,120)}</td></tr>`;
  });
  html += '</tbody></table>';
  results.innerHTML = html;
}
