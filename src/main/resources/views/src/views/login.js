import React from 'react';

import Card from '../components/card';

import Backend from '../server';

import axios from 'axios';

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    entrar = () => {
        axios
            .post(`${Backend.host}/api/usuarios/login`, {
                email: this.state.email,
                senha: this.state.senha
            }).then(response => {
                this.setState({ mensagemErro: null })

                setTimeout(() => {
                    this.props.history.push('/home')
                }, 1000)
                
            }).catch(erro => {
                this.setState({ mensagemErro: erro.response.data })
            })
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                {(this.state.mensagemErro != null) ? 
                                    <div className="alert alert-danger">
                                        <span>{this.state.mensagemErro}</span>
                                    </div>
                                : null}
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <div className="form-group mb-3">
                                                <label htmlFor="email">Email: </label>
                                                <input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} className="form-control" id="email" onKeyPress={evt => {
                                                    if (evt.key === 'Enter') {
                                                        new KeyboardEvent('keypress', { keyCode: 9 })
                                                    }
                                                }} />
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