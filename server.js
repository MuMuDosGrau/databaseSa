import express from 'express';
import cors from 'cors'; // Importar o pacote cors
import epiRoutes from './routes/epiRoutes.js';
import sequelize from './database.js';

const app = express();

// Habilitar CORS para permitir acesso do front-end
app.use(cors({
    origin: 'http://localhost:5173', // Permitir apenas essa origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Sincronizar com o banco de dados
try {
    await sequelize.sync({ alter: true });
} catch (err) {
    console.log(err);
}

// Middleware para JSON
app.use(express.json());

// Rotas
app.use(epiRoutes);

// Iniciar o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
