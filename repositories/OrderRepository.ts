// Importa a classe ObjectId do pacote 'mongodb', usada para trabalhar com o ID único de documentos no MongoDB.
import { ObjectId } from "mongodb";
// Importa a referência 'database' de um módulo local, provavelmente um cliente do MongoDB inicializado.
import { database } from "../database";
// Importa a interface IProduct de um módulo de entidades.
import { IProduct } from "../entities/IProduct";
// Importa 'response' do pacote 'express', que é utilizado para manipular respostas HTTP em um servidor Express.
import { response } from "express";
// Importa a interface IOrder de um módulo de entidades.
import { IOrder } from "../entities/IOrder";
// Importa a classe ProductRepository de um módulo local.
import { ProductRepository } from "./ProductRepository";

// Cria uma instância do repositório de produtos.
const productsRepository = new ProductRepository()

// Define uma classe chamada OrderRepository que vai conter métodos para interagir com os pedidos no banco de dados.
export class OrderRepository{

    // Define um método assíncrono para adicionar um pedido ao banco de dados.
    async addOrder(order: IOrder): Promise<void>{
        // Define a data do pedido para o momento atual antes de salvá-lo.
        order.orderMade = new Date();
        // Insere o pedido na coleção 'Orders' do banco de dados 'Atlas'.
        await (await database).db('Atlas').collection('Orders').insertOne(order); 
    }

    // Define um método assíncrono para recuperar um pedido pelo seu ID.
    async getOrderById(id: string): Promise<IOrder>{
        try {
            // Busca um pedido na coleção 'Orders' usando o ID fornecido e retorna o resultado.
            return await (await database).db('Atlas').collection('Orders').find({_id: new ObjectId(id)}).toArray();
        }catch(error){
            // Em caso de erro, retorna um objeto de pedido vazio.
            return {} as IOrder;
        }
    }

    // Define um método assíncrono para atualizar um pedido pelo seu ID.
    async updateOrderById(id: string, order: IOrder): Promise<void>{
        try {
            // Atualiza o pedido na coleção 'Orders' com os novos dados do pedido fornecido.
            await (await database).db('Atlas').collection('Orders').updateOne({_id: new ObjectId(id)}, {$set: {...order}});           
            return;
        } catch (error) {
            // Em caso de erro, loga o erro no console.
            console.log(error);
            return
        }
    }

    // Define um método assíncrono para deletar um pedido pelo seu ID.
    async deleteOrderById(id: string): Promise<void>{
        try {
            // Deleta o pedido da coleção 'Orders' usando o ID fornecido.
            await (await database).db('Atlas').collection('Orders').deleteOne({_id: new ObjectId(id)});
            return
        } catch (error) {
            // Em caso de erro, loga o erro no console.
            console.log(error)
            return;
        }
    }

    // Define um método assíncrono para recuperar todos os pedidos da coleção.
    async getAllOrders(): Promise<IOrder[]>{
        try {
            // Busca todos os pedidos na coleção 'Orders' e retorna como um array.
            const dbResponse = await (await database).db('Atlas').collection('Orders').find().toArray();
            return dbResponse
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna um array vazio.
            console.log(error)
            return [];
        }
    }

}
