import React from 'react';

import Card from '../components/card';

import axios from 'axios';

import Backend from '../server';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
        message: null,
        messageType: null
    }

    clearInputs = () => {
        this.setState({nome:'', email: '', senha: '', senhaRepeticao: ''})
        this.refs.nome.value = ''
        this.refs.email.value = ''
        this.refs.senha.value = ''
        this.refs.senhaRepeticao.value = ''

    }

    cadastrar = () => {
        
        if(this.state.senha === this.state.senhaRepeticao){
            axios.post(`${Backend.host}/api/usuarios`, {
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
            }).then(response => {
                this.setState({ messageType: 'alert-success', message: 'Agora você está inscrito!',})

                this.clearInputs()

                console.log(response)

            }).catch(erro => {
                this.setState({messageType: 'alert-danger', message: `Erro ${erro.response.status}:  ${erro.response.data}`})
                console.log(erro.response)
            })
        }else{
            this.setState({messageType: 'alert-danger', message: 'As senhas não coincidem!'})
        }
        
    }

    render(){
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6" style={ {position:'relative', left: '300px'} }>
                        <div className="bs-docs-section"></div>
                            <Card title="Inscrição">
                                {(this.state.message != null) ? 
                                    <div className={`alert ${this.state.messageType}`}>
                                        <span>{this.state.message}</span>
                                    </div>
                                : null}
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="nome">Nome: </label>
                                                    <input type="text" className="form-control" id="nome" 
                                                    ref="nome"
                                                    onChange={e => this.setState({ nome: e.target.value })}></input>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="email">Email: </label>
                                                    <input type="email" className="form-control" id="email" 
                                                    ref="email"
                                                    onChange={e => this.setState({ email: e.target.value })}></input>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="senha">Senha: </label>
                                                    <input type="password" className="form-control" id="senha"
                                                    ref="senha" 
                                                    onChange={e => this.setState({ senha: e.target.value })}></input>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="senhaRepeticao">Repita a senha: </label>
                                                    <input type="password" className="form-control" id="senhaRepeticao"
                                                    ref="senhaRepeticao" 
                                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })}></input>
                                                </div>
                                                <div className="form-group mt-3">
                                                    <button className="btn btn-success" onClick={this.cadastrar}>Finalizar inscrição</button>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default CadastroUsuario;