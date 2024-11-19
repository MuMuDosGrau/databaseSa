import { Sequelize } from 'sequelize';

const conexao = new Sequelize('postgresql://mumu:rqvlbx8Wi_bwK4w0W4sz_A@teste1709-1697.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full');

async function conectarBanco() {
    try {
        await conexao.authenticate();
        console.log('Conectado com sucesso');
    } catch (error) {
        console.error('Erro ao conectar', error);
    }
}

conectarBanco();

export default conexao;
