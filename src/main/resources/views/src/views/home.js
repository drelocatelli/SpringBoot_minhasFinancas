import React from "react";

import UsuarioService from '../app/service/usuarioService'

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor() {
        super()
        this.UsuarioService = new UsuarioService();
    }

    dadosUsuario() {
        return JSON.parse(localStorage.getItem('userLoggedIn'))
    }

    obtemSaldo(idUsuario){
        this.UsuarioService.getSaldoByUsuario(idUsuario)
        .then(response => {
            this.setState({ saldo: response.data })
        }).catch(error => {
            console.error(error.response)
        })
    }

    componentDidMount() {

        this.obtemSaldo(this.dadosUsuario().id)

        // atualiza o saldo a cada 5 seg
        setInterval(() => {
           this.obtemSaldo(this.dadosUsuario().id)
        }, 5000)
    }

    render() {
        return (
            <div className="container">

                <div className="card mt-5" style={{ padding: '40px' }}>
                    <h1 className="display-5">Bem vindo!</h1>
                    <br />
                    <p>
                        Essa é sua área administrativa
                        <br />
                        Seu saldo para o mês atual é de R$ {this.state.saldo}
                    </p>
                </div>
            </div>
        )
    }

}

export default Home;