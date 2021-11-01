import React from "react";

import Login from '../views/login';
import CadastroUsuario from "../views/cadastroUsuario";
import Inicio from "../views/home";

import { Route, Switch, BrowserRouter } from 'react-router-dom';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={CadastroUsuario} />
            </Switch>
        </BrowserRouter>
    )
}

