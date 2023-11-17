// Importa a interface IProduct do mesmo diretório. Isso é usado para aplicar um tipo definido em outro arquivo.
import { IProduct } from "./IProduct";

// Define uma interface chamada IProductInOrder, que representará um produto dentro de um pedido.
export interface IProductInOrder{
    // Propriedade 'product' que é uma string. Isso provavelmente se refere ao identificador único ou nome do produto.
    product: string;
    // Propriedade 'quantity' que é um número. Isso indica a quantidade do produto no pedido.
    quantity: number;
}

// Define uma interface chamada IOrder, que representará um pedido.
export interface IOrder{
    // Propriedade 'customerName' que é uma string. Isso armazena o nome do cliente que fez o pedido.
    customerName: string;
    // Propriedade 'orderMade' que é do tipo Date. Isso registra a data em que o pedido foi feito.
    orderMade: Date;
    // Propriedade 'products' que é um array de IProductInOrder. Isso contém uma lista dos produtos e suas quantidades no pedido.
    products: IProductInOrder[];
    // Propriedade 'checkedOut' que também é do tipo Date. Isso registra a data em que o pedido foi finalizado ou pago.
    checkedOut: Date;
}
