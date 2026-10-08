/* =========================
BANCO DE PERSONAGENS
========================= */

const personagens = {

    clover: {

        nome: "Clover",

        imagem:
        "../img/clover2.jpg",

        descricao:
        "Você nasceu com senso de estilo, presença social e uma confiança que chama atenção naturalmente.",

        cor:
        "#e13b2b",

        classe:
        "clover-theme"
    },

    stitch: {

        nome: "Stitch",

        imagem:
        "../img/stitch2.jpg",

        descricao:
        "Você tem uma energia impossível de copiar. Intensidade, autenticidade e um caos carismático definem sua personalidade.",

        cor:
        "#0748aa",

        classe:
        "stitch-theme"
    },

    sam: {

        nome: "Sam",

        imagem:
        "../img/sam.jpg",

        descricao:
        "Analítico, estratégico e extremamente observador. Você raramente entra em algo sem pensar alguns passos à frente.",

        cor:
        "#4b8713",

        classe:
        "sam-theme"
    },

    regina: {

        nome: "Regina George",

        imagem:
        "../img/regina.jpg",

        descricao:
        "Você domina ambientes naturalmente. Existe algo na sua presença que faz as pessoas repararem.",

        cor:
        "#d062a9",

        classe:
        "regina-theme"
    },

    lindinha: {

        nome: "Lindinha",

        imagem:
        "../img/lindinha.jpg",

        descricao:
        "Sua leveza é sua força. Você transmite conforto sem precisar forçar nada.",

        cor:
        "#0485cf",

        classe:
        "lindinha-theme"
    },

     alex: {

        nome: "Alex",

        imagem:
        "../img/alex.jpg",

        descricao:
        "Você equilibra diversão e maturidade de um jeito raro. Sua presença conecta pessoas.",

        cor:
        "#dd9f2c",

        classe:
        "alex-theme"
    },

    docinho: {

        nome: "Docinho",

        imagem:
        "../img/docinho.jpg",

        descricao:
        "Determinado(a), intenso(a) e protetor(a). Você dificilmente aceita injustiça calado.",

        cor:
        "#1a6917",

        classe:
        "docinho-theme"
    },

    superchoque: {

        nome: "Super Choque",

        imagem:
        "../img/choque.jpg",

        descricao:
        "Criativo(a), espontâneo(a) e cheio(a) de personalidade. Você transforma energia em conexão.",

        cor:
        "#0d1c5c",

        classe:
        "choque-theme"
    },

    scooby: {

        nome: "Scooby",

        imagem:
        "../img/scooby.jpg",

        descricao:
        "Você pode até evitar problemas… mas sempre acaba criando os momentos mais memoráveis.",

        cor:
        "#5c2d0d",

        classe:
        "scooby-theme"
    },

    mcqueen: {

        nome: "Mcqueen",

        imagem:
        "../img/mcqueen.jpg",

        descricao:
        "Competitivo(a), ambicioso(a) e movido(a) por evolução. Você odeia sentir que está parado.",

        cor:
        "#5c120d",

        classe:
        "mcqueen-theme"
    },


};



/* =========================
SALVAR RESPOSTAS
========================= */

function salvarResposta(pergunta, resposta){

    let quiz = JSON.parse(

        sessionStorage.getItem("quiz")

    ) || {};

    quiz[pergunta] = resposta;

    sessionStorage.setItem(

        "quiz",
        JSON.stringify(quiz)

    );
}

/* =========================
PEGAR DADOS
========================= */

function pegarDadosQuiz(){

    return JSON.parse(

        sessionStorage.getItem("quiz")

    );

}

/* =========================
SALVAR NOME
========================= */

function salvarNome(nome){

    let quiz = pegarDadosQuiz() || {};

    quiz.nome = nome;

    sessionStorage.setItem(

        "quiz",
        JSON.stringify(quiz)

    );
}
/*pontuação*/
function somarPontos(lista){

console.log(lista);

    let quiz =
    pegarDadosQuiz();

    if(!quiz.pontos){

        quiz.pontos = {
            clover:0,
            stitch:0,
            sam:0,
            regina:0,
            lindinha:0,
            alex:0,
            docinho:0,
            superchoque:0,
            scooby:0,
            mcqueen:0
        };
    }

    lista.forEach(personagem => {

        quiz.pontos[personagem]++;

    });

    sessionStorage.setItem(
        "quiz",
        JSON.stringify(quiz)
    );
}

/* =========================
DESCOBRIR RESULTADO
========================= */

function descobrirResultado(){

    let quiz = pegarDadosQuiz();

    /* segurança */

    if(!quiz || !quiz.pontos){

        return personagens.clover;

    }

    let pontos = quiz.pontos;

    let vencedor = "clover";

    let maior = 0;

    for(let personagem in pontos){

        if(pontos[personagem] > maior){

            maior = pontos[personagem];

            vencedor = personagem;
        }
    }

    return personagens[vencedor];
}

/* =========================
INICIAR NOVO QUIZ
========================= */

function iniciarQuiz(){

    sessionStorage.removeItem("quiz");

    sessionStorage.setItem(
        "quiz",
        JSON.stringify({
            pontos: {
                clover: 0,
                stitch: 0,
                sam: 0,
                regina: 0,
                lindinha: 0,
                alex: 0,
                docinho: 0,
                superchoque: 0,
                scooby: 0,
                mcqueen: 0
            }
        })
    );

}