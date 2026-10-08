import express from 'express'
import cors from 'cors'
import { salvarResultado }
from './DAO/Resultado/salvar_resultado.js'

import { buscarResultados }
from './DAO/Resultado/buscar_resultados.js'

import { atualizarResultado }
from './DAO/Resultado/atualizar_resultado.js'

import { excluirResultado }
from './DAO/Resultado/excluir_resultado.js'

const app = express()
app.use(cors())

app.use(express.json())


// =========================
// POST
// SALVAR RESULTADO
// =========================

app.post('/resultado', async (req, res) => {

    try{

        let resultado =
        await salvarResultado(req.body)

        res.json(resultado)

    }catch(erro){

        console.error(erro)

        res.status(500).json({

            mensagem:
            "Erro ao salvar resultado",

            erro:
            erro.message

        })

    }

})


// =========================
// GET
// BUSCAR RESULTADOS
// =========================

app.get('/resultado', async (req, res) => {

    try{

        let resultados =
        await buscarResultados()

        res.json(resultados)

    }catch(erro){

        console.error(erro)

        res.status(500).json({

            mensagem:
            "Erro ao buscar resultados",

            erro:
            erro.message

        })

    }

})

//EDITAR RESULTADO

app.put('/resultado/:id', async (req, res) => {
    try {
        const id = req.params.id

        const resultado = await atualizarResultado(id, req.body)

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Resultado não encontrado"
            })
        }

        res.json({
            mensagem: "Resultado atualizado com sucesso",
            resultado
        })

    } catch (erro) {
        console.error(erro)

        res.status(500).json({
            mensagem: "Erro ao atualizar resultado",
            erro: erro.message
        })
    }
})

// DELETAR RESULTADO

app.delete('/resultado/:id', async (req, res) => {
    try {
        const id = req.params.id

        const resultado = await excluirResultado(id)

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Resultado não encontrado"
            })
        }

        res.json({
            mensagem: "Resultado excluído com sucesso",
            resultado
        })

    } catch (erro) {
        console.error(erro)

        res.status(500).json({
            mensagem: "Erro ao excluir resultado",
            erro: erro.message
        })
    }
})


// =========================
// SERVIDOR
// =========================

app.listen(3000, () => {

    console.log('Servidor Rodando!!')

})