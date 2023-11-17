// Importa as classes necessárias do pacote 'express' para manipulação de requisições e rotas.
import { Request, Response, Router } from "express";
// Importa o repositório de produtos que contém as operações de banco de dados para produtos.
import { ProductRepository } from "../repositories/ProductRepository";
// Importa o repositório de pedidos que contém as operações de banco de dados para pedidos.
import { OrderRepository } from "../repositories/OrderRepository";

// Cria uma nova instância do Router do Express para definir rotas de API.
export const router = Router();

// Instancia o repositório de produtos para uso nas rotas relacionadas a produtos.
const productsRepository = new ProductRepository()

// Instancia o repositório de pedidos para uso nas rotas relacionadas a pedidos.
const orderRepository = new OrderRepository()

// Define uma rota POST para '/products', que lida com a criação de um novo produto.
router.post('/products', async (request: Request, response: Response) => {
    // Adiciona um produto usando o método addProduct do repositório, passando os dados do produto do corpo da requisição.
    await productsRepository.addProduct(request.body)
    // Se bem-sucedido, retorna uma resposta com status 201 e um JSON indicando que o produto foi criado.
    response.status(201).json({ status: 'created' })
})

// Define uma rota GET para '/products', que lida com a listagem de todos os produtos.
router.get('/products', async (request: Request, response: Response) => {
    try {
        // Busca todos os produtos usando o método getAllProducts do repositório e retorna os produtos com status 200.
        const products = await productsRepository.getAllProducts();
        response.status(200).json(products);
    } catch (error) {
       // Em caso de erro, retorna status 500 indicando erro interno do servidor.
       response.sendStatus(500);
    }
})

// Define uma rota GET para '/products/:id', que lida com a obtenção de um produto específico pelo ID.
router.get('/products/:id', async (request: Request, response: Response) => {
    // Busca um produto pelo ID usando o método getProductById do repositório e retorna o produto.
    const product = await productsRepository.getProductById(request.params.id)
    response.json(product);
})

// Define uma rota PUT para '/products/:id', que lida com a atualização de um produto pelo ID.
router.put('/products/:id', async (request: Request, response: Response) => {
    try {
        // Atualiza o produto pelo ID usando o método updateProductById do repositório, passando os novos dados do produto.
        await productsRepository.updateProductById(request.params.id, request.body);
        // Se bem-sucedido, retorna status 200 indicando sucesso na operação.
        response.sendStatus(200);
    } catch (error) {
       // Em caso de erro, retorna status 500 indicando erro interno do servidor.
       response.sendStatus(500) 
    }
})

// Define uma rota DELETE para '/products/:id', que lida com a remoção de um produto pelo ID.
router.delete('/products/:id', async (request: Request, response: Response) => {
    try {
        // Remove um produto pelo ID usando o método deleteProductById do repositório.
        await productsRepository.deleteProductById(request.params.id);
        // Se bem-sucedido, retorna status 200 indicando sucesso na operação.
        response.sendStatus(200);
    } catch (error) {
       // Em caso de erro, retorna status 500 indicando erro interno do servidor.
       response.sendStatus(500) 
    }
})

// Define uma rota POST para '/orders', que lida com a criação de um novo pedido.
router.post('/orders', async (request: Request, response: Response) => {
    // Adiciona um pedido usando o método addOrder do repositório de pedidos, passando os dados do pedido do corpo da requisição.
    await orderRepository.addOrder(request.body)
    // Se bem-sucedido, retorna uma resposta com status 201 e um JSON indicando que o pedido foi criado.
    response.status(201).json({ status: 'created' })
})

// Define uma rota GET para '/orders', que lida com a listagem de todos os pedidos.
router.get('/orders', async (request: Request, response: Response) => {
    try {
        // Busca todos os pedidos usando o método getAllOrders do repositório de pedidos e retorna os pedidos com status 200.
        const orders = await orderRepository.getAllOrders();
        response.status(200).json(orders);
    } catch (error) {
       // Em caso de erro, retorna status 500 indicando erro interno do servidor.
       response.sendStatus(500);
    }
})

// Define uma rota GET para '/orders/:id', que lida com a obtenção de um pedido específico pelo ID.
router.get('/orders/:id', async (request: Request, response: Response) => {
    // Busca um pedido pelo ID usando o método getOrderById do repositório de pedidos e retorna o pedido.
    const order = await orderRepository.getOrderById(request.params.id)
    response.json(order);
})

// Define uma rota PUT para '/orders/:id', que lida com a atualização de um pedido pelo ID.
router.put('/orders/:id', async (request: Request, response: Response) => {
    try {
        // Atualiza o pedido pelo ID usando o método updateOrderById do repositório de pedidos, passando os novos dados do pedido.
        await orderRepository.updateOrderById(request.params.id, request.body);
        // Se bem-sucedido, retorna status 200 indicando sucesso na operação.
        response.sendStatus(200);
    } catch (error) {
       // Em caso de erro, retorna status 500 indicando erro interno do servidor.
       response.sendStatus(500) 
    }
})

// Define uma rota DELETE para '/orders/:id', que lida com a remoção de um pedido pelo ID.
router.delete('/orders/:id', async (request: Request, response: Response) => {
    try {
        // Remove um pedido pelo ID usando o método deleteOrderById do repositório de pedidos.
        await orderRepository.deleteOrderById(request.params.id);
        // Se bem-sucedido, retorna status 200 indicando sucesso na operação.
        response.sendStatus(200);
    } catch (error) {
       // Em caso de erro, retorna status 500 indicando erro interno do servidor.
       response.sendStatus(500) 
    }
})
