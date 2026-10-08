const quiz = pegarDadosQuiz();

const resultado = descobrirResultado();

if(!quiz || !resultado){

    window.location.href = "../index.html";
}
/* Nome usuário */

document.getElementById(
    "nomeUsuario"
).innerHTML = quiz.nome;

/* Nome personagem */

document.getElementById(
    "personagemNome"
).innerHTML = resultado.nome;

/* Descrição */

document.getElementById(
    "descricaoPersonagem"
).innerHTML = resultado.descricao;

/* Imagem */

document.getElementById(
    "imagemPersonagem"
).src = resultado.imagem;

/* Cor dinâmica */

document.getElementById(
    "personagemNome"
).style.color = resultado.cor;

//SALVAR RESULTADO NO BANCO 

async function salvarResultado() { 
    
    let personagemVencedor = null; 
    
/* Procura qual personagem corresponde ao resultado */ 

for(let personagem in personagens){ 
    
    if(personagens[personagem].nome === resultado.nome){ 
        
        personagemVencedor = personagem; 
    } 
} 
        
    /* Pega a pontuação do personagem vencedor */ 
    
    let pontuacao = quiz.pontos[personagemVencedor]; 
    
    const dados = { 
        
        nome: quiz.nome, 
        personagem: resultado.nome, 
        pontuacao: pontuacao, 
        data_resultado: new Date().toISOString().split("T")[0] 
    
    }; 
    
    const resposta = await fetch(
        
        "http://localhost:3000/resultado", 
        
        { 
            headers: { 
                "Accept": "application/json", 
                "Content-Type": "application/json"
            }, 
            
            method: "POST", 
            body: JSON.stringify(dados) 
        
        } 
    ); 
    
    const resultadoBanco = await resposta.json(); 
    console.log( 
        
        "Resultado salvo no banco:", 
        
        resultadoBanco 
    ); 
} 

salvarResultado();