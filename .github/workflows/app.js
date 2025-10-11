// ======= Substitua este objeto pelo seu firebaseConfig (pegar no Console Firebase) =======
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECTID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
// =========================================================================================

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Habilita login anônimo para permitir envios sem conta
auth.signInAnonymously().catch(err => {
  console.error('Erro auth anônimo:', err);
});

const form = document.getElementById('surveyForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Enviando...';

  const getVal = (name) => {
    const el = form.elements[name];
    if(!el) return '';
    if(el.type === 'radio' || el.length) {
      if(el.length) {
        for (let i=0;i<el.length;i++) if(el[i].checked) return el[i].value;
        return '';
      }
      return el.value;
    }
    return el.value;
  };

  const data = {
    conhecimento: getVal('conhecimento'),
    treinamento: getVal('treinamento'),
    frequencia: getVal('frequencia'),
    compartilha: getVal('compartilha'),
    emailAction: getVal('email'),
    backup: getVal('backup'),
    antivirus: getVal('antivirus'),
    risco: getVal('risco'),
    acao: getVal('acao'),
    opiniao: getVal('opiniao') ? getVal('opiniao').trim() : '',
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    uid: auth.currentUser ? auth.currentUser.uid : null,
    anonymous: auth.currentUser ? auth.currentUser.isAnonymous : true
  };

  try {
    await db.collection('responses').add(data);
    status.textContent = '✅ Resposta enviada com sucesso! Obrigado.';
    form.reset();
    setTimeout(()=> status.textContent = '', 4000);
  } catch (err) {
    console.error(err);
    status.textContent = '❌ Erro ao enviar. Tente novamente.';
  }
});
