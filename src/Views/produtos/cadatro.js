import React from 'react'
import Card from '../../components/card'
import ProdutoService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'
const estadoInicial = {
    nome: '',
    SKU: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
}

class CadastroProduto extends React.Component {
    state = estadoInicial;
    constructor() {
        super();
        this.ProdutoService = new ProdutoService;
    }
    onChange = (event) => {
        const valor = event.target.value
        const nomeDoCampo = event.target.name
        this.setState({ [nomeDoCampo]: valor })
    }
    onSubmit = (event) => {
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            SKU: this.state.SKU,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }
        try {
            this.ProdutoService.salvar(produto);
            this.limpaCampos();
            this.setState({ sucesso: true })
            console.log(this.state);
        } catch (erro) {
            const errors = erro.errors
            this.setState({ errors: errors })
        }
    }
    limpaCampos = () => {
        this.setState(estadoInicial)
    }
    componentDidMount() {
        const sku = this.props.match.params.SKU
        if (sku) {
            const resultado = this.ProdutoService.
                obterProdutos().filter(produto => produto.SKU === sku)
            if (resultado.length === 1) {
                const produtoEncontrado = resultado[0]
                this.setState({ ...produtoEncontrado, atualizando: true })
            }
        }

    }
    render() {
        return (
            <Card header={this.state.atualizando ? 'Atualização de produto ' : 'Cadastro de produto'}>
                <form id='frimProduto' onSubmit={this.onSubmit}>

                    {
                        this.state.sucesso &&
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Well done!</strong> You successfully read <a href="#" className="alert-link">this important alert message></a>
                        </div>
                    }

                    {this.state.errors.length > 0 &&
                        this.state.errors.map(msg => {
                            return (
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
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label>SKU: *</label>
                            <input type='text'
                                name='SKU'
                                disabled={this.state.atualizando}
                                onChange={this.onChange}
                                value={this.state.SKU}
                                className='form-control' />
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
                            <button type="submit" className='tbn btn-success'> {this.state.atualizando ? 'Atualizar ' : 'Salvar '}</button>
                        </div>

                        <div className='col-md-1'>
                            <button onClick={this.limpaCampos} className='tbn btn-primary'> Limpar</button>
                        </div>
                    </div>
                </form>




            </Card>

        )
    }
}
export default withRouter(CadastroProduto);