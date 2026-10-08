import { conexao } from '../../conexao.js'

export async function atualizarResultado(id, resultado) {

    const conn = await conexao()

    const sql = `

        UPDATE resultado

        SET
            nome = ?,
            personagem = ?,
            pontuacao = ?

        WHERE id = ?

    `

    const [resultadoBanco] =
    await conn.query(sql, [

        resultado.nome,
        resultado.personagem,
        resultado.pontuacao,
        id

    ])

    await conn.end()

    return resultadoBanco

}