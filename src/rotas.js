import React from 'react'

import {HashRouter, Switch, Route} from 'react-router-dom'

import Home from './Views/home'
import CadastroProduto from './Views/produtos/cadatro'

export default () =>{
    return(
        <HashRouter>
            <Switch>
                <Route exact path = "/cadastro" component={CadastroProduto}/>
                <Route exact path ="/" component={Home}/>
            </Switch>
        </HashRouter>
    )
}