INSTRUÇÕES RÁPIDAS:
1) Abra esta pasta no Visual Studio Code.
2) Instale a extensão Live Server (recomendada).
3) Crie um projeto no Firebase Console (https://console.firebase.google.com/).
   - Habilite Authentication: Email/Password e Anonymous.
   - Crie um usuário admin (ex: admin@wm.com / senha: 123456) em Authentication -> Users.
   - Crie Firestore Database (modo test ou production, sua escolha).
4) Copie o firebaseConfig (Project settings -> Your apps) e cole no app.js e admin.js no lugar dos placeholders.
5) No VS Code: clique com o botão direito em index.html -> Open with Live Server.
6) Teste: envie um formulário e verifique na coleção 'responses' do Firestore.
7) Acesse admin.html e faça login com o usuário admin criado para ver as respostas.
8) Para hospedar, use Firebase Hosting (opcional).
NOTA: Substitua credenciais de exemplo por credenciais seguras ao usar em produção.
