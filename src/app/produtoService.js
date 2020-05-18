
const PRODUTOS = "_PRODUTOS"

export function ErroValidacao(errors){
    this.errors = errors;
}

export default class ProdutoService{
    obterProdutos = () =>{
    
        const produtos = localStorage.getItem(PRODUTOS);
        if(!produtos){
            return [];
        }
        return JSON.parse(produtos)
}
    obterIndex = (sku)=>{
        let index = null;
        this.obterProdutos().forEach( (produto, i) =>{
            if(produto.SKU === sku){
                index = i;
                console.log('OBTIVE O INDEX: '+index);
            }
           
        })
        return index;
    }
    deletar = (sku) => {
        const index = this.obterIndex(sku)
        if(index !== null){
            const produtos = this.obterProdutos()
            produtos.splice(index, 1);
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
            return produtos;
        }
        
    }
    salvar = (produto)=>{
        this.validar(produto)
       let produtos = localStorage.getItem(PRODUTOS)
        
       if(!produtos){
           produtos = [];
       }else{
           produtos = JSON.parse(produtos);
       }
       const index = this.obterIndex(produto.SKU);
       console.log('INDEX SALVAR:' + index);
       if(index === null){
        produtos.push(produto)
       }else{
           produtos[index] = produto;
       }
      
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