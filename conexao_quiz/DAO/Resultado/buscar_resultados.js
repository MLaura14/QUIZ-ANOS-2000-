import { conexao } from '../../conexao.js'


export async function buscarResultados(){

    const conn = await conexao()


    const sql = `
        SELECT *
        FROM resultado
        ORDER BY pontuacao DESC, data_resultado DESC
    `


    const [resultados] = await conn.query(sql)


    await conn.end()


    return resultados

}