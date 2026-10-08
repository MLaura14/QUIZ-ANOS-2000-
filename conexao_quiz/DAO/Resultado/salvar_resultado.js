import { conexao } from '../../conexao.js'

export async function salvarResultado(resultado) {

    const conn = await conexao()

    const sql = `
        INSERT INTO resultado
        (nome, personagem, pontuacao, data_resultado)
        VALUES (?, ?, ?, ?)
    `

    const [resultadoBanco] = await conn.query(sql, [
        resultado.nome,
        resultado.personagem,
        resultado.pontuacao,
        resultado.data_resultado
    ])

    await conn.end()

    return resultadoBanco
}