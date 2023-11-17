// Importa o framework Express e, do mesmo pacote, as classes Request e Response para manipulação de requisições HTTP.
import express, { Request, Response } from "express";
// Importa a conexão com o banco de dados definida no arquivo 'database'.
import { database } from "./database";
// Importa o módulo 'cors' para permitir a configuração de Cross-Origin Resource Sharing em respostas HTTP.
import cors from "cors";
// Importa o roteador definido no arquivo 'index.route' dentro do diretório 'routes'.
import { router } from "./routes/index.route";

// Cria uma nova instância do aplicativo Express.
const app = express()

// Aplica o middleware 'cors' ao app, permitindo que o servidor aceite requisições de diferentes origens.
app.use(cors());

// Aplica o middleware para análise de JSON, permitindo que o servidor interprete o corpo das requisições em formato JSON.
app.use(express.json());

// Inicializa o servidor para ouvir na porta 9001 e, quando pronto, imprime uma mensagem no console.
app.listen(9001, async () => {
    console.log('listening on http://localhost:9001');
});

// Define uma rota GET '/ping' que, quando acessada, responderá com a string 'pong'.
app.get('/ping', async (request: Request, response: Response) => {
    response.send('pong');
})

// Aplica as rotas definidas no roteador 'router' ao aplicativo Express, permitindo que ele responda a essas rotas.
app.use(router);
