const salvarBtn = document.getElementById("salvarBtn");

salvarBtn.addEventListener("click", pegarDados);

function pegarDados() {
  const form = document.getElementById("cadastroForm");

  const nome = form.nome.value.trim();

  const email = form.email.value.trim();

  const endereco = form.endereco.value.trim();

  const estado = form.estado.value;

  const sexoSelecionado = document.querySelector('input[name="sexo"]:checked');

  if (
    nome === "" ||
    email === "" ||
    endereco === "" ||
    estado === "" ||
    !sexoSelecionado
  ) {
    alert("Preencha todos os campos ✨");

    return;
  }

  /* PEGA O QUIZ JÁ EXISTENTE */

  let quiz = pegarDadosQuiz() || {};

  /* MANTÉM A LÓGICA ANTIGA */

  quiz.nome = nome;

  /* NOVOS DADOS */

  quiz.email = email;

  quiz.endereco = endereco;

  quiz.estado = estado;

  quiz.sexo = sexoSelecionado.value;

  const resultado = descobrirResultado();

  quiz.personagem = resultado.nome;

  quiz.descricaoPersonagem = resultado.descricao;

  quiz.corPersonagem = resultado.cor;

  sessionStorage.setItem(
    "quiz",

    JSON.stringify(quiz),
  );

  location.href = "confirmacao.html";
}
