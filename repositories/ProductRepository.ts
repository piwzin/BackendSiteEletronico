// Importa a classe ObjectId do pacote 'mongodb', que é usada para criar e manipular IDs únicos do MongoDB.
import { ObjectId } from "mongodb";
// Importa a instância 'database' do diretório superior, que provavelmente é uma conexão com o banco de dados.
import { database } from "../database";
// Importa a interface IProduct do diretório 'entities', que define a estrutura de um produto.
import { IProduct } from "../entities/IProduct";
// Importa 'response' do pacote 'express', embora não esteja sendo usado nesse trecho de código.
import { response } from "express";

// Exporta a classe ProductRepository, que contém métodos para operações de banco de dados relacionadas a produtos.
export class ProductRepository{

    // Método assíncrono para adicionar um produto ao banco de dados.
    async addProduct(product: IProduct): Promise<void>{
        // Define a data de criação do produto para o momento atual.
        product.created = new Date();
        // Insere o produto na coleção 'Products' do banco de dados 'Atlas'.
        await (await database).db('Atlas').collection('Products').insertOne(product);
    }

    // Método assíncrono para obter um produto pelo seu ID.
    async getProductById(id: string): Promise<IProduct>{
        try {
            // Busca o produto na coleção 'Products' usando o ID fornecido e retorna o primeiro resultado.
            return await (await database).db('Atlas').collection('Products').find({_id: new ObjectId(id)}).toArray();
        }catch(error){
            // Em caso de erro, retorna um objeto vazio do tipo IProduct.
            return {} as IProduct;
        }
    }

    // Método assíncrono para atualizar um produto pelo seu ID.
    async updateProductById(id: string, product: IProduct): Promise<void>{
        try {
            // Atualiza a data de modificação do produto para o momento atual.
            product.updated = new Date();
            // Atualiza o produto na coleção 'Products' com os novos dados fornecidos.
            await (await database).db('Atlas').collection('Products').updateOne({_id: new ObjectId(id)}, {$set: {...product}});           
            return;
        } catch (error) {
            // Em caso de erro, loga o erro no console.
            console.log(error);
            return
        }
    }

    // Método assíncrono para deletar um produto pelo seu ID.
    async deleteProductById(id: string): Promise<void>{
        try {
            // Deleta o produto da coleção 'Products' usando o ID fornecido.
            await (await database).db('Atlas').collection('Products').deleteOne({_id: new ObjectId(id)});
            return
        } catch (error) {
            // Em caso de erro, loga o erro no console.
            console.log(error)
            return;
        }
    }

    // Método assíncrono para obter todos os produtos da coleção.
    async getAllProducts(): Promise<IProduct[]>{
        try {
            // Busca e retorna todos os produtos da coleção 'Products'.
            const dbResponse = await (await database).db('Atlas').collection('Products').find().toArray();
            return dbResponse
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna um array vazio.
            console.log(error)
            return [];
        }
    }

}
