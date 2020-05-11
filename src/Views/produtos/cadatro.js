import React from 'react'
import ProdutoService from '../../app/produtoService'
const estadoInicial ={
    nome: '',
    SKU: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: []
}

export default class CadastroProduto extends React.Component {
    state = estadoInicial;
    constructor(){
        super();
        this.ProdutoService = new ProdutoService;
    }        
    onChange = (event) => {
        const valor = event.target.value
        const nomeDoCampo = event.target.name
        this.setState({ [nomeDoCampo]: valor })
          }
    onSubmit = (event) =>{
        const produto ={
        nome: this.state.nome,
        SKU: this.state.SKU,
        descricao: this.state.descricao,
        preco: this.state.produto,
        fornecedor: this.state.fornecedor
        }
        try{
        this.ProdutoService.salvar(produto);
        this.limpaCampos();
        this.setState({ sucesso: true})
        console.log(this.state);
        }catch(erro){
            const errors = erro.errors
            this.setState({errors: errors})
        }
    }
    limpaCampos= () => {
        this.setState(estadoInicial)
    }
    render() {
        return (
            <div className='card'>
                <div className='card-header'>
                    Aqui é o cadastro
                </div>
                <div className='card-body'>

               { 
                    this.state.sucesso &&
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Well done!</strong> You successfully read <a href="#" className="alert-link">this important alert message></a>
                    </div>
                }

                { this.state.errors.length > 0 &&
                        this.state.errors.map(msg =>{
                            return(
                                <div className="alert alert-dismissible alert-danger">
                     <button type="button" className="close" data-dismiss="alert">&times;</button>
                     <strong>ERRO</strong> {msg} <a href="#" className="alert-link">this important alert message></a>
                 </div>
                            )
                        })

                     
                    

                }
                
{/* -------------------------------LINHA--------------------------------------------------------------*/}
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Nome: *</label>
                                <input type="text" 
                                        name="nome" 
                                        value={this.state.nome}
                                        onChange={this.onChange}                                          
                                        className="form-control"/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label>SKU: *</label>
                            <input type='text' 
                                    name='SKU' 
                                    onChange={this.onChange}
                                    value={this.state.SKU} 
                                    className='form-control'/>
                        </div>
                    </div>
{/* -------------------------------LINHA--------------------------------------------------------------*/}
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='form-group'>
                                <label>Descrição: *</label>
                                <textarea name='descricao' className='form-control' value={this.state.descricao} onChange={this.onChange} />
                            </div>
                        </div>

                    </div>
{/* -------------------------------LINHA--------------------------------------------------------------*/}
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Preço: *</label>
                                <input type='text' name='preco' className='form-control' value={this.state.preco} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label>Fornecedor: *</label>
                            <input type='text' name='fornecedor' className='form-control' value={this.state.fornecedor} onChange={this.onChange} />
                        </div>
                    </div>
{/* -------------------------------LINHA--------------------------------------------------------------*/}
                    <div className='row'>
                        <div className='col-md-1'>
                            <button className='tbn btn-success' onClick ={this.onSubmit}> Salvar</button>
                        </div>

                        <div className='col-md-1'>
                            <button onClick={this.limpaCampos} className='tbn btn-primary'> Limpar</button>
                        </div>
                    </div>

                </div>
           

</div>

        )
    }
}