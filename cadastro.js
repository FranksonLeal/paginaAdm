// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCfZ6e3QK5E3xoP36oRpGDmvmjldve_bP8",
    authDomain: "educapoio.firebaseapp.com",
    projectId: "educapoio",
    storageBucket: "educapoio.appspot.com",
    messagingSenderId: "381806569462",
    appId: "1:381806569462:web:5b954e57e0abe1716049d7",
    measurementId: "G-7GZX106CTQ"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

// Evento de submit do formulário de cadastro
document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("Você precisa estar autenticado para cadastrar um auxílio.");
        return;
    }

    const titulo = document.getElementById('titulo').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const url = document.getElementById('url').value.trim();
    const imagemInput = document.getElementById('imagem');

    if (!titulo || !dataInicio || !dataFim) {
        alert("Preencha todos os campos obrigatórios");
        return;
    }

    let imageUrl = null;

    // Upload da imagem para o Firebase Storage, se houver uma imagem
    if (imagemInput.files.length > 0) {
        const file = imagemInput.files[0];
        const storageRef = storage.ref(`images/${file.name}`);
        await storageRef.put(file);
        imageUrl = await storageRef.getDownloadURL();
    }

    // Adicionar auxílio ao Firestore
    try {
        await db.collection("auxilios").add({
            titulo: titulo,
            dataInicio: dataInicio,
            dataFim: dataFim,
            url: url || null,
            imagemUrl: imageUrl || null,
            createdAt: new Date().toISOString()
        });
        alert("Auxílio cadastrado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar auxílio: ", error);
        alert("Erro ao cadastrar auxílio");
    }
});

// Evento de logout
document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        await auth.signOut();
        window.location.href = "index.html"; // Redirecionar para a página de login
    } catch (error) {
        console.error("Erro ao sair: ", error);
    }
});
