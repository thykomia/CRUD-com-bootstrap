import React from 'react'
import Card from '../../components/card'
import ProdutoService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'
import ProdutosTable from './componentsProduto/produtosTable'


class ConsultaProdutos extends React.Component {
    state = {
        produtos: []
    }
    constructor() {
        super()
        this.service = new ProdutoService()
    }
    componentDidMount() {
        const produtos = this.service.obterProdutos();
        this.setState({ produtos })
    }
    preparaEditar = (SKU) => {
        console.log('SKU para editar', SKU);
        this.props.history.push(`/cadastro/${SKU}`)
    }
    deletar = (sku) => {
        const produtos = this.service.deletar(sku);
        this.setState({ produtos })
    }

    render() {
        return (
            <Card header=' Consulta'>
                <ProdutosTable  produtos={this.state.produtos} 
                                editarAction={this.preparaEditar} 
                                deletarAction={this.deletar}/>
                
            </Card>

        )
    }
}
export default withRouter(ConsultaProdutos)