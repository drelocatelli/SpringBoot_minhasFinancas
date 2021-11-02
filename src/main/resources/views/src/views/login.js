import React from 'react';

import Card from '../components/card';

import UsuarioService from '../app/service/usuarioService';

import {showMessage} from '../components/toastr'

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {

            localStorage.setItem('userLoggedIn', JSON.stringify(response.data))

            setTimeout(() => {
                this.props.history.push('/home')
            }, 1000)

        }).catch(erro => {
            showMessage('error', 'Erro', erro.response.data)
        })
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <div className="form-group mb-3">
                                                <label htmlFor="email">Email: </label>
                                                <input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} className="form-control" id="email" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="password">Senha: </label>
                                                <input type="password" value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })} className="form-control" id="password" onKeyUp={evt => {
                                                    if (evt.key === 'Enter') {
                                                        this.entrar()
                                                    }
                                                }} />
                                            </div>
                                            <div className="form-group mt-4">
                                                <a href="cadastro" className="btn btn-danger">Inscrever-se</a>
                                                &nbsp;
                                                <button onClick={this.entrar} className="btn btn-success">Fazer login</button>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;