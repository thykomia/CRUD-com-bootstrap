import React from 'react'

import { Switch, Route} from 'react-router-dom'

import Home from './Views/home'
import CadastroProduto from './Views/produtos/cadatro'
import ConsultaProdutos from './Views/produtos/consulta'


export default () =>{
    return(       
            <Switch>
                <Route exact path = "/cadastro/:SKU?" component={CadastroProduto}/>
                <Route exact path = "/consulta" component={ConsultaProdutos}/>
                <Route exact path ="/" component={Home}/>
            </Switch>
         
    )
}