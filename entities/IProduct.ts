// Define uma interface chamada IProduct, que representará as informações de um produto.
export interface IProduct {
    // Propriedade 'name' que é uma string. Esta propriedade armazena o nome do produto.
    name: string;
    // Propriedade 'price' que é um número. Esta propriedade armazena o preço do produto.
    price: number;
    // Propriedade 'description' que é uma string. Esta propriedade armazena uma descrição do produto.
    description: string;
    // Propriedade 'created' que é do tipo Date. Esta propriedade armazena a data em que o produto foi criado.
    created: Date;
    // Propriedade 'updated' que é do tipo Date. Esta propriedade armazena a data da última atualização do produto.
    updated: Date;
}
