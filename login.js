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
const auth = firebase.auth();

document.getElementById("login-button").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
        await auth.signInWithEmailAndPassword(email, password);
        errorMessage.textContent = "";
        alert("Login bem-sucedido!");
        // Redireciona para a página de cadastro após o login
        window.location.href = "cadastro.html";
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

// Verifica se o usuário está autenticado ao carregar a página
auth.onAuthStateChanged((user) => {
    if (user) {
        // Se já estiver autenticado, redireciona para a página de cadastro
        window.location.href = "cadastro.html";
    }
});
// Função de login
loginButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        errorMessage.textContent = "";
        alert("Login bem-sucedido!");

        // Verifique se o usuário está autenticado
        const user = firebase.auth().currentUser;
        console.log("Usuário autenticado:", user); // Verifique isso no console
        if (user) {
            window.location.href = "cadastro.html"; // Redirecione para a página de cadastro
        }
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
