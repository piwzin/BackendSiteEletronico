// Importa o MongoClient e ServerApiVersion do pacote 'mongodb', que são utilizados para conectar ao MongoDB.
const { MongoClient, ServerApiVersion } = require('mongodb');
// Define a URI de conexão com o banco de dados MongoDB, incluindo informações de usuário (root) e senha (root).
const uri = "mongodb+srv://root:root@backend.je8vn81.mongodb.net/?retryWrites=true&w=majority";

// Cria uma instância de MongoClient com um objeto de opções para configurar a versão da API do servidor para a versão estável.
const mongoClient = new MongoClient(uri, {
  // Define a configuração do 'serverApi' com a versão v1, habilita o modo estrito e erros de depreciação.
  serverApi: {
    version: ServerApiVersion.v1, // Utiliza a versão estável v1 da API do MongoDB.
    strict: true,                 // Habilita o modo estrito, forçando o uso apenas de funcionalidades que estão na versão estável da API.
    deprecationErrors: true,      // Habilita erros de depreciação, que lançarão erros para funcionalidades obsoletas.
  }
});

// Exporta a conexão com o banco de dados, que é uma Promise que resolverá quando a conexão for estabelecida.
export const database = mongoClient.connect();
