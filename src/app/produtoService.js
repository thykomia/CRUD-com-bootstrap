
const PRODUTOS = "_PRODUTOS"

export function ErroValidacao(errors){
    this.errors = errors;
}

export default class ProdutoService{
    salvar = (produto)=>{
        this.validar(produto)
       let produtos = localStorage.getItem(PRODUTOS)
        
       if(!produtos){
           produtos = [];
       }else{
           produtos = JSON.parse(produtos);
       }

       produtos.push(produto)
       localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
    
    }
    validar = (produto)=>{
        const errors = [];
        if(!produto.nome){
            errors.push("O campo nome é obrigatório!")
        }
        if(!produto.SKU){
            errors.push("o campo SKU é obrigatório!")
        }
        if(!produto.preco && produto.preco<=0){
            errors.push("O preço deve ser maior que 0")
        } 
        if(!produto.fornecedor){
            errors.push("Fornecedor é Obrigatório")
        }
        if(errors.length >0){
            throw new ErroValidacao(errors);
        }

    }
}