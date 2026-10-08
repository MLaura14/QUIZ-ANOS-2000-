/* INPUT */

const inputNome =
document.getElementById("nomeUsuario");

/* BOTÃO/LINK */

const linkResultado =
document.querySelector(".start-link");

/* AO CLICAR */

linkResultado.addEventListener("click", function(event){

    let nome =
    inputNome.value.trim();

    /* VAZIO */

    if(nome === ""){

        event.preventDefault();

        inputNome.focus();

        inputNome.placeholder =
        "Digite seu nome ✨";

        inputNome.style.border =
        "1px solid #ff4d6d";

        return;
    }

    /* SALVAR */

    salvarNome(nome);

});