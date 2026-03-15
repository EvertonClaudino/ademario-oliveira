import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {

        const { nome, telefone, email, descricao, tipo_servico_id } = req.body;

        const result = await pool.query(
            `INSERT INTO contatos
      (nome, telefone, email, descricao, tipo_servico_id)
      VALUES ($1,$2,$3,$4,$5)`,
            [nome, telefone, email, descricao, tipo_servico_id]
        );

        res.status(200).json({ success: true });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Erro ao salvar no banco"
        });

    }

}