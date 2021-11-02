import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import {showMessage} from '../../components/toastr'

import LancamentoService from '../../app/service/lancamentoService'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor() {
        super()
        this.service = new LancamentoService()

        this.buscar()
    }

    buscar = () => {

        const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'))
        
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: userLoggedIn.id
        }

        this.service.consultar(lancamentoFiltro)
        .then(response => {
            this.setState({lancamentos : response.data})
        }).catch( error => {
            showMessage('error', `Erro ${error.response.status}`, error.response.data)
        })
    }
    
    render() {
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="bs-component">
                        <Card title="Consultar Lançamentos">
                            <div className="col-md-6">
                                <div className="bs-docs-section">
                                    <fieldset>
                                        <div className="form-group mb-3">
                                            <label htmlFor="mes">Mês:</label>
                                            <SelectMenu id="mes" lista={meses} value={this.state.mes} onChange={e => this.setState({mes: e.target.value})}> </SelectMenu>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="ano" className="mb-1">Ano:</label>
                                            <input type="number" className="form-control" id="ano" placeholder="Ano" value={this.state.ano} onChange={e => this.setState({ano: e.target.value })} />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="tipos">Tipos:</label>
                                            <SelectMenu id="tipos" lista={tipos} value={this.state.tipo} onChange={e => this.setState({tipo: e.target.value})}> </SelectMenu>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="descricao" className="mb-1">Descrição:</label>
                                            <input type="text" className="form-control" id="descricao" placeholder="Descrição..." value={this.state.descricao} onChange={e => this.setState({descricao: e.target.value })} 
                                            onKeyUp={(e) => {
                                                if(e.key === 'Enter'){
                                                    this.buscar()
                                                }
                                            }}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <button className="btn btn-danger">Cadastrar</button>
                                            &nbsp;
                                            <button className="btn btn-success" onClick={this.buscar}>Buscar</button>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            
                        </Card>
                        <Card title="Meus lançamentos">
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <div className="bs-component">
                                        <LancamentosTable lancamentos={this.state.lancamentos} />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div style={{width:'100%', height:'25vh'}}></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(ConsultaLancamentos);