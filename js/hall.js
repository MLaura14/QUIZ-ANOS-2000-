/* =========================
DADOS
========================= */

let resultados = [];


/* =========================
PEGAR RESULTADOS
========================= */

async function carregarResultados(){

    try{

        const resposta = await fetch(
            "http://localhost:3000/resultado"
        );

        resultados = await resposta.json();

        montarHall();

    }catch(erro){

        console.error(
            "Erro ao carregar resultados:",
            erro
        );

    }

}


/* =========================
MONTAR HALL
========================= */

function montarHall(){

    criarPersonagens();

    criarPopular();

    criarEstatisticas();

    criarRanking();

}


/* =========================
PERSONAGENS
========================= */

function criarPersonagens(){

    const wall =
    document.getElementById("characterWall");

    wall.innerHTML = "";

    for(let chave in personagens){

        const personagem =
        personagens[chave];

        const card =
        document.createElement("div");

        card.className =
        "wall-character";

        card.style.animationDelay =
        `${Math.random() * 0.8}s`;

        card.innerHTML = `

            <img
                src="${personagem.imagem}"
                alt="${personagem.nome}"
            >

            <span
                class="wall-name"
                style="color:${personagem.cor}"
            >
                ${personagem.nome}
            </span>

        `;

        wall.appendChild(card);

    }

}


/* =========================
PERSONAGEM MAIS POPULAR
========================= */

function descobrirPopular(){

    const contagem = {};

    resultados.forEach(resultado => {

        const nome =
        resultado.personagem;

        contagem[nome] =
        (contagem[nome] || 0) + 1;

    });


    let vencedor = null;

    let maior = 0;


    for(let personagem in contagem){

        if(contagem[personagem] > maior){

            maior =
            contagem[personagem];

            vencedor =
            personagem;

        }

    }


    return {

        nome:vencedor,

        quantidade:maior

    };

}


/* =========================
POPULAR
========================= */

function criarPopular(){

    const container =
    document.getElementById(
        "popularContent"
    );

    const stats =
    document.getElementById(
        "characterStats"
    );

    container.innerHTML = "";

    stats.innerHTML = "";


    if(resultados.length === 0){

        container.innerHTML = `

            <div class="popular-card">

                <div class="popular-info">

                    <span class="popular-tag">
                        AINDA NÃO HÁ RESULTADOS
                    </span>

                    <h3>
                        SEJA O PRIMEIRO
                    </h3>

                    <p>
                        Faça o quiz e entre para o Hall da Fama.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    const popular =
    descobrirPopular();


    let personagemKey = null;


    for(let chave in personagens){

        if(
            personagens[chave].nome ===
            popular.nome
        ){

            personagemKey = chave;

        }

    }


    const personagem =
    personagens[personagemKey];


    let outrosPersonagens = "";


    for(let chave in personagens){

        const outro =
        personagens[chave];


        if(outro.nome === personagem.nome){

            continue;

        }


        const quantidade =
        resultados.filter(
            resultado =>
            resultado.personagem ===
            outro.nome
        ).length;


        const porcentagem =
        popular.quantidade > 0
        ?
        (quantidade / popular.quantidade) * 100
        :
        0;


        outrosPersonagens += `

            <div class="mini-character-card">

                <img
                    src="${outro.imagem}"
                    alt="${outro.nome}"
                >


                <div class="mini-character-info">

                    <h4
                        style="color:${outro.cor}"
                    >
                        ${outro.nome}
                    </h4>


                    <span>
                        ${quantidade}
                        jogador(es)
                    </span>


                    <div class="mini-bar">

                        <span
                            style="
                                width:${porcentagem}%;
                                background:${outro.cor};
                                box-shadow:
                                0 0 10px ${outro.cor};
                            "
                        ></span>

                    </div>

                </div>

            </div>

        `;

    }


    container.innerHTML = `

        <div
            class="popular-card"
            style="
                box-shadow:
                0 0 35px ${personagem.cor}35;
            "
        >

            <img
                src="${personagem.imagem}"
                alt="${personagem.nome}"
            >


            <div class="popular-info">

                <span
                    class="popular-tag"
                    style="
                        color:${personagem.cor};
                    "
                >
                    ✦ MAIS ESCOLHIDO
                </span>


                <h3>
                    ${personagem.nome}
                </h3>


                <p>
                    Foi o personagem que mais apareceu
                    nos resultados do quiz.
                </p>

            </div>


            <div class="popular-score">

                <strong>
                    ${popular.quantidade}
                </strong>

                <span>
                    ESCOLHA(S)
                </span>

            </div>

        </div>


        <div class="popular-side">

            ${outrosPersonagens}

        </div>

    `;


    criarEstatisticasPersonagens();

}

/* =========================
ESTATÍSTICAS DOS PERSONAGENS
========================= */

function criarEstatisticasPersonagens(){

    const container =
    document.getElementById(
        "characterStats"
    );


    container.innerHTML = "";


    const contagem = {};


    resultados.forEach(resultado => {

        contagem[resultado.personagem] =
        (contagem[resultado.personagem] || 0) + 1;

    });


    const maior =
    Math.max(
        ...Object.values(contagem),
        1
    );


    for(let chave in personagens){

        const personagem =
        personagens[chave];


        const quantidade =
        contagem[personagem.nome] || 0;


        const porcentagem =
        (quantidade / maior) * 100;


        const card =
        document.createElement("div");


        card.className =
        "character-stat";


        card.innerHTML = `

            <div class="character-stat-top">

                <span
                    class="stat-dot"
                    style="
                        background:${personagem.cor};
                        box-shadow:
                        0 0 10px ${personagem.cor};
                    "
                ></span>


                <span class="stat-name">

                    ${personagem.nome}

                </span>

            </div>


            <strong class="stat-number">

                ${quantidade}

            </strong>


            <span class="character-stat-label">

                jogador(es)

            </span>


            <div class="character-stat-bar">

                <span
                    style="
                        width:${porcentagem}%;
                        background:${personagem.cor};
                        box-shadow:
                        0 0 10px ${personagem.cor};
                    "
                ></span>

            </div>

        `;


        container.appendChild(card);

    }

}

/* =========================
ÍCONES DO DASHBOARD
========================= */

function criarIcone(tipo){

    const icones = {

        jogadores: `
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                ></path>

                <circle
                    cx="9"
                    cy="7"
                    r="4"
                ></circle>

                <path
                    d="M22 21v-2a4 4 0 0 0-3-3.87"
                ></path>

                <path
                    d="M16 3.13a4 4 0 0 1 0 7.75"
                ></path>
            </svg>
        `,


        quizzes: `
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="3"
                ></rect>

                <path
                    d="M8 8h8"
                ></path>

                <path
                    d="M8 12h8"
                ></path>

                <path
                    d="M8 16h5"
                ></path>
            </svg>
        `,


        pontuacao: `
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                ></path>
            </svg>
        `,


        media: `
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M12 3v18"
                ></path>

                <path
                    d="M17 8.5C17 6.57 14.76 5 12 5s-5 1.57-5 3.5S9.24 12 12 12s5 1.57 5 3.5S14.76 19 12 19s-5-1.57-5-3.5"
                ></path>
            </svg>
        `

    };


    return icones[tipo] || "";

}


/* =========================
ESTATÍSTICAS GERAIS
========================= */

function criarEstatisticas(){

    const container =
    document.getElementById(
        "statsGrid"
    );


    container.innerHTML = "";


    const jogadores =
    new Set(
        resultados.map(
            resultado => resultado.nome
        )
    ).size;


    const tentativas =
    resultados.length;


    const maiorPontuacao =
    resultados.length
    ?
    Math.max(
        ...resultados.map(
            resultado =>
            Number(resultado.pontuacao)
        )
    )
    :
    0;


    const media =
    resultados.length
    ?
    (
        resultados.reduce(
            (total, resultado) =>
            total +
            Number(resultado.pontuacao),
            0
        )
        /
        resultados.length
    ).toFixed(1)
    :
    0;


    const cards = [

        {
            icon:criarIcone("jogadores"),
            numero:jogadores,
            texto:"JOGADORES"
        },

        {
            icon:criarIcone("quizzes"),
            numero:tentativas,
            texto:"QUIZZES REALIZADOS"
        },

        {
            icon:criarIcone("pontuacao"),
            numero:maiorPontuacao,
            texto:"MAIOR PONTUAÇÃO"
        },

        {
            icon:criarIcone("media"),
            numero:media,
            texto:"MÉDIA DE PONTOS"
        }

    ];


    cards.forEach(
        (card, index) => {

            const elemento =
            document.createElement("div");


            elemento.className =
            "stat-card";


            elemento.style.animationDelay =
            `${index * 0.12}s`;


            elemento.innerHTML = `

                <div class="stat-icon">

                    ${card.icon}

                </div>


                <h3>

                    ${card.numero}

                </h3>


                <p>

                    ${card.texto}

                </p>

            `;


            container.appendChild(
                elemento
            );

        }
    );

    /* =========================
       DASHBOARD EXTRA
    ========================= */

    const personagemContagem = {};

    resultados.forEach(
        resultado => {

            const personagem =
            resultado.personagem;

            personagemContagem[personagem] =
            (personagemContagem[personagem] || 0) + 1;
        }
    );

    let personagemMaisEscolhido = "—";
    let maiorQuantidade = 0;

    for(let personagem in personagemContagem){

        if(
            personagemContagem[personagem]
            > maiorQuantidade
        ){
            maiorQuantidade =
            personagemContagem[personagem];

            personagemMaisEscolhido =
            personagem;
        }
    }

    const dashboardCharacter =
    document.getElementById(
        "dashboardCharacter"
    );

    const dashboardScore =
    document.getElementById(
        "dashboardScore"
    );

    if(dashboardCharacter){

        dashboardCharacter.textContent =
        personagemMaisEscolhido;
    }

    if(dashboardScore){

        dashboardScore.textContent =
        maiorPontuacao + " PTS";
    }
}


/* =========================
RANKING
========================= */

function criarRanking(){

    const container =
    document.getElementById(
        "rankingList"
    );

    container.innerHTML = "";

    const ranking =
    [...resultados].sort(
        (a,b) =>
        Number(b.pontuacao) -
        Number(a.pontuacao)
    );

    ranking.forEach(
        (resultado, index) => {

            let personagem = null;

            for(let chave in personagens){

                if(
                    personagens[chave].nome ===
                    resultado.personagem
                ){

                    personagem =
                    personagens[chave];

                }

            }

            const card =
            document.createElement("div");

            card.className =
            "ranking-card";

            card.style.animationDelay =
            `${index * 0.08}s`;

            card.innerHTML = `

                <div
                    class="rank-number"
                    style="
                        color:${personagem?.cor || "#fff"}
                    "
                >
                    #${index + 1}
                </div>


                <div class="player-info">

                    ${
                        personagem
                        ?
                        `

                        <img
                            class="player-avatar"
                            src="${personagem.imagem}"
                            alt="${personagem.nome}"
                        >

                        `
                        :
                        ""
                    }


                    <div>

                        <div class="player-name">

                            ${resultado.nome}

                        </div>


                        <div
                            class="player-character"
                            style="
                                color:${personagem?.cor || "#aaa"}
                            "
                        >

                            ${resultado.personagem}

                        </div>

                    </div>

                </div>


                <div class="score">

                    ${resultado.pontuacao}
                    pts

                </div>


                <div class="date">

                    ${formatarData(
                        resultado.data_resultado
                    )}

                </div>

            `;

            container.appendChild(card);

        }
    );

}


/* =========================
DATA
========================= */

function formatarData(data){

    if(!data){
        return "";
    }

    const dataObj =
    new Date(data);

    if(isNaN(dataObj)){
        return data;
    }

    return dataObj.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


/* =========================
NAVEGAÇÃO
========================= */

const botoes =
document.querySelectorAll(
    ".section-btn"
);


const secoes =
document.querySelectorAll(
    ".hall-section"
);


botoes.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                const alvo =
                botao.dataset.section;


                botoes.forEach(
                    b =>
                    b.classList.remove(
                        "active"
                    )
                );


                secoes.forEach(
                    secao =>
                    secao.classList.remove(
                        "active"
                    )
                );


                botao.classList.add(
                    "active"
                );


                document
                .getElementById(alvo)
                .classList.add("active");

            }
        );

    }
);


/* =========================
CURSOR
========================= */

const cursor =
document.querySelector(
    ".hall-cursor"
);


document.addEventListener(
    "mousemove",
    evento => {

        if(!cursor){

            return;

        }

        cursor.style.left =
        evento.clientX + "px";

        cursor.style.top =
        evento.clientY + "px";

    }
);


/* =========================
INICIAR
========================= */

carregarResultados();