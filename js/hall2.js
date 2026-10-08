/* =========================
   CRUD DO HALL DA FAMA
========================= */


/* =========================
   CONFIGURAÇÃO
========================= */

const API_RESULTADO =
"http://localhost:3000/resultado";


/* =========================
   ÍCONES
========================= */

function criarIconeCrud(tipo){

    const icones = {

        editar: `

            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >

                <path
                    d="M12 20h9"
                ></path>

                <path
                    d="M16.5 3.5
                    a2.121 2.121 0 0 1 3 3
                    L8 18
                    l-4 1
                    1-4
                    Z"
                ></path>

            </svg>

        `,


        excluir: `

            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >

                <path
                    d="M3 6h18"
                ></path>

                <path
                    d="M8 6V4
                    a1 1 0 0 1 1-1h6
                    a1 1 0 0 1 1 1v2"
                ></path>

                <path
                    d="M19 6l-1 15
                    H6
                    L5 6"
                ></path>

                <path
                    d="M10 11v6"
                ></path>

                <path
                    d="M14 11v6"
                ></path>

            </svg>

        `

    }

    return icones[tipo] || "";

}


/* =========================
   CRIAR MODAIS
========================= */

function criarModaisCrud(){

    if(document.getElementById("crudEditModal")){
        return;
    }


    const area =
    document.createElement("div");


    area.id =
    "crudModals";


    area.innerHTML = `

        <!-- =========================
             MODAL EDITAR
        ========================== -->

        <div
            class="crud-modal"
            id="crudEditModal"
        >

            <div class="crud-modal-box edit-box">

                <button
                    class="crud-close"
                    id="fecharEditModal"
                    type="button"
                >
                    ×
                </button>


                <div class="crud-modal-decoration">

                    ✦ Y2K EDIT ✦

                </div>


                <span class="crud-modal-number">
                    01
                </span>


                <h2>
                    EDITAR RESULTADO
                </h2>


                <p class="crud-modal-subtitle">

                    Atualize os dados da sua
                    passagem pelo Hall da Fama.

                </p>


                <form id="formEditarResultado">


                    <input
                        type="hidden"
                        id="editarId"
                    >


                    <div class="crud-field">

                        <label for="editarNome">
                            NOME
                        </label>

                        <input
                            type="text"
                            id="editarNome"
                            required
                        >

                    </div>


                    <div class="crud-field">

                        <label for="editarPersonagem">
                            PERSONAGEM
                        </label>

                        <select
                            id="editarPersonagem"
                            required
                        ></select>

                    </div>


                    <div class="crud-field">

                        <label for="editarPontuacao">
                            PONTUAÇÃO
                        </label>

                        <input
                            type="number"
                            id="editarPontuacao"
                            min="0"
                            required
                        >

                    </div>


                    <div class="crud-modal-actions">

                        <button
                            type="button"
                            class="crud-cancel-btn"
                            id="cancelarEdit"
                        >
                            CANCELAR
                        </button>


                        <button
                            type="submit"
                            class="crud-save-btn"
                        >
                            SALVAR ALTERAÇÕES
                        </button>

                    </div>


                </form>

            </div>

        </div>


        <!-- =========================
             MODAL EXCLUIR
        ========================== -->

        <div
            class="crud-modal"
            id="crudDeleteModal"
        >

            <div class="crud-modal-box delete-box">

                <button
                    class="crud-close"
                    id="fecharDeleteModal"
                    type="button"
                >
                    ×
                </button>


                <div class="delete-icon">

                    ${criarIconeCrud("excluir")}

                </div>


                <span class="crud-modal-number">
                    02
                </span>


                <h2>
                    CUIDADO, LENDA!
                </h2>


                <p class="delete-message">

                    Você realmente deseja apagar

                    <strong id="nomeResultadoExcluir">
                        —
                    </strong>

                    do Hall da Fama?

                </p>


                <p class="delete-warning">

                    Essa ação não poderá ser desfeita.

                </p>


                <div class="crud-modal-actions">

                    <button
                        type="button"
                        class="crud-cancel-btn"
                        id="cancelarDelete"
                    >
                        CANCELAR
                    </button>


                    <button
                        type="button"
                        class="crud-delete-btn"
                        id="confirmarDelete"
                    >
                        APAGAR
                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(area);

}


/* =========================
   PREENCHER PERSONAGENS
========================= */

function preencherPersonagensEditar(){

    const select =
    document.getElementById(
        "editarPersonagem"
    );


    if(!select){
        return;
    }


    select.innerHTML = "";


    for(let chave in personagens){

        const personagem =
        personagens[chave];


        const option =
        document.createElement("option");


        option.value =
        personagem.nome;


        option.textContent =
        personagem.nome;


        select.appendChild(option);

    }

}


/* =========================
   ENCONTRAR PERSONAGEM
========================= */

function encontrarPersonagem(nome){

    for(let chave in personagens){

        if(
            personagens[chave].nome ===
            nome
        ){

            return personagens[chave];

        }

    }

    return null;

}


/* =========================
   ADICIONAR AÇÕES AO RANKING
========================= */

function adicionarAcoesRanking(){

    const container =
    document.getElementById(
        "rankingList"
    );


    if(!container){
        return;
    }


    const cards =
    container.querySelectorAll(
        ".ranking-card"
    );


    if(cards.length === 0){
        return;
    }


    const ranking =
    [...resultados].sort(

        (a,b) =>

        Number(b.pontuacao) -
        Number(a.pontuacao)

    );


    cards.forEach(
        (card, index) => {

            if(
                card.dataset.crudReady ===
                "true"
            ){

                return;

            }


            const resultado =
            ranking[index];


            if(!resultado){
                return;
            }


            card.dataset.crudReady =
            "true";


            card.dataset.id =
            resultado.id;


            const actions =
            document.createElement("div");


            actions.className =
            "ranking-actions";


            actions.innerHTML = `

                <button
                    type="button"
                    class="ranking-action edit-action"
                    data-id="${resultado.id}"
                    aria-label="Editar resultado"
                    title="Editar resultado"
                >

                    ${criarIconeCrud("editar")}

                </button>


                <button
                    type="button"
                    class="ranking-action delete-action"
                    data-id="${resultado.id}"
                    aria-label="Excluir resultado"
                    title="Excluir resultado"
                >

                    ${criarIconeCrud("excluir")}

                </button>

            `;


            card.appendChild(actions);

        }
    );

}


/* =========================
   ABRIR MODAL EDITAR
========================= */

function abrirModalEditar(id){

    const resultado =
    resultados.find(

        item =>
        String(item.id) ===
        String(id)

    );


    if(!resultado){
        return;
    }


    document.getElementById(
        "editarId"
    ).value =
    resultado.id;


    document.getElementById(
        "editarNome"
    ).value =
    resultado.nome;


    document.getElementById(
        "editarPersonagem"
    ).value =
    resultado.personagem;


    document.getElementById(
        "editarPontuacao"
    ).value =
    resultado.pontuacao;


    document.getElementById(
        "crudEditModal"
    ).classList.add("active");


    document.body.classList.add(
        "crud-modal-open"
    );

}


/* =========================
   ABRIR MODAL DELETE
========================= */

let idResultadoExcluir = null;


function abrirModalExcluir(id){

    const resultado =
    resultados.find(

        item =>
        String(item.id) ===
        String(id)

    );


    if(!resultado){
        return;
    }


    idResultadoExcluir =
    resultado.id;


    document.getElementById(
        "nomeResultadoExcluir"
    ).textContent =
    resultado.nome;


    document.getElementById(
        "crudDeleteModal"
    ).classList.add("active");


    document.body.classList.add(
        "crud-modal-open"
    );

}


/* =========================
   FECHAR MODAIS
========================= */

function fecharModaisCrud(){

    const editModal =
    document.getElementById(
        "crudEditModal"
    );


    const deleteModal =
    document.getElementById(
        "crudDeleteModal"
    );


    if(editModal){

        editModal.classList.remove(
            "active"
        );

    }


    if(deleteModal){

        deleteModal.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "crud-modal-open"
    );

}