import { conexao } from '../../conexao.js'

export async function excluirResultado(id) {

    const conn = await conexao()

    const sql = `

        DELETE FROM resultado

        WHERE id = ?

    `

    const [resultadoBanco] =
    await conn.query(sql, [id])

    await conn.end()

    return resultadoBanco

}