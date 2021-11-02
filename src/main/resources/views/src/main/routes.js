import React from "react";

import Login from '../views/login';
import CadastroUsuario from "../views/cadastroUsuario";
import Index from "../views/index";
import Home from "../views/home";
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'

import { Route, Switch, BrowserRouter } from 'react-router-dom';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={CadastroUsuario} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
            </Switch>
        </BrowserRouter>
    )
}

