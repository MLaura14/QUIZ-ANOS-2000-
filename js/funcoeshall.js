/* =========================
   ATUALIZAR RESULTADO
========================= */

async function salvarEdicao(evento){

    evento.preventDefault();


    const id =
    document.getElementById(
        "editarId"
    ).value;


    const nome =
    document.getElementById(
        "editarNome"
    ).value.trim();


    const personagem =
    document.getElementById(
        "editarPersonagem"
    ).value;


    const pontuacao =
    document.getElementById(
        "editarPontuacao"
    ).value;


    if(!nome){

        alert(
            "Digite o nome do jogador."
        );

        return;

    }


    if(pontuacao === ""){

        alert(
            "Digite a pontuação."
        );

        return;

    }


    try{

        const resposta =
        await fetch(

            `${API_RESULTADO}/${id}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify({

                    nome:nome,

                    personagem:
                    personagem,

                    pontuacao:
                    Number(pontuacao)

                })

            }

        );


        const dados =
        await resposta.json();


        if(!resposta.ok){

            throw new Error(
                dados.mensagem ||
                "Erro ao atualizar."
            );

        }


        fecharModaisCrud();


        await carregarResultados();


    }catch(erro){

        console.error(
            "Erro ao atualizar:",
            erro
        );


        alert(
            "Não foi possível atualizar o resultado."
        );

    }

}


/* =========================
   EXCLUIR RESULTADO
========================= */

async function confirmarExclusao(){

    if(!idResultadoExcluir){
        return;
    }


    try{

        const resposta =
        await fetch(

            `${API_RESULTADO}/${idResultadoExcluir}`,

            {

                method:"DELETE"

            }

        );


        const dados =
        await resposta.json();


        if(!resposta.ok){

            throw new Error(
                dados.mensagem ||
                "Erro ao excluir."
            );

        }


        idResultadoExcluir =
        null;


        fecharModaisCrud();


        await carregarResultados();


    }catch(erro){

        console.error(
            "Erro ao excluir:",
            erro
        );


        alert(
            "Não foi possível excluir o resultado."
        );

    }

}


/* =========================
   EVENTOS
========================= */

function configurarEventosCrud(){

    const ranking =
    document.getElementById(
        "rankingList"
    );


    if(ranking){

        ranking.addEventListener(
            "click",
            evento => {

                const botao =
                evento.target.closest(
                    ".ranking-action"
                );


                if(!botao){
                    return;
                }


                const id =
                botao.dataset.id;


                if(
                    botao.classList.contains(
                        "edit-action"
                    )
                ){

                    abrirModalEditar(id);

                }


                if(
                    botao.classList.contains(
                        "delete-action"
                    )
                ){

                    abrirModalExcluir(id);

                }

            }
        );

    }


    document.getElementById(
        "formEditarResultado"
    ).addEventListener(
        "submit",
        salvarEdicao
    );


    document.getElementById(
        "confirmarDelete"
    ).addEventListener(
        "click",
        confirmarExclusao
    );


    document.getElementById(
        "cancelarEdit"
    ).addEventListener(
        "click",
        fecharModaisCrud
    );


    document.getElementById(
        "fecharEditModal"
    ).addEventListener(
        "click",
        fecharModaisCrud
    );


    document.getElementById(
        "cancelarDelete"
    ).addEventListener(
        "click",
        fecharModaisCrud
    );


    document.getElementById(
        "fecharDeleteModal"
    ).addEventListener(
        "click",
        fecharModaisCrud
    );


    document.querySelectorAll(
        ".crud-modal"
    ).forEach(
        modal => {

            modal.addEventListener(
                "click",
                evento => {

                    if(
                        evento.target ===
                        modal
                    ){

                        fecharModaisCrud();

                    }

                }
            );

        }
    );


    document.addEventListener(
        "keydown",
        evento => {

            if(
                evento.key ===
                "Escape"
            ){

                fecharModaisCrud();

            }

        }
    );

}


/* =========================
   OBSERVAR RANKING
========================= */

function observarRanking(){

    const ranking =
    document.getElementById(
        "rankingList"
    );


    if(!ranking){
        return;
    }


    adicionarAcoesRanking();


    const observador =
    new MutationObserver(() => {

        adicionarAcoesRanking();

    });


    observador.observe(
        ranking,
        {
            childList:true,
            subtree:true
        }
    );

}


/* =========================
   INICIAR CRUD
========================= */

function iniciarCrudHall(){

    criarModaisCrud();

    preencherPersonagensEditar();

    configurarEventosCrud();

    observarRanking();

}


if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        iniciarCrudHall
    );

}else{

    iniciarCrudHall();

}