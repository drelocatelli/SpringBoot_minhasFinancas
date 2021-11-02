import React from "react";
import currencyFormatter from 'currency-formatter';

export default props => {

    let formataMes = (num) => {
        switch(num) {
            case 1:
                return 'Janeiro'
            break;
            case 2:
                return 'Fevereiro'
            break;
            case 3:
                return 'Março'
            break;
            case 4:
                return 'Abril'
            break;
            case 5:
                return 'Maio'
            break;
            case 6:
                return 'Junho'
            break;
            case 7:
                return 'Julho'
            break;
            case 8:
                return 'Agosto'
            break;
            case 9:
                return 'Setembro'
            break;
            case 10:
                return 'Outubro'
            break;
            case 11:
                return 'Novembro'
            break;
            case 12:
                return 'Dezembro'
            break;
        }
        
    }

    let capitalizeWord = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }

    let despesaOuReceita = (word) =>{
        switch(word){
            case 'DESPESA':
                return <span className="badge bg-danger">{word}</span>
            break
            case 'RECEITA':
                return <span className="badge bg-success">{word}</span>
            break
        }
    }

    const rows = props.lancamentos.map( lancamento => {
        return(
            <tr key={lancamento.id}>
                <td>{capitalizeWord(lancamento.descricao)}</td>
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{despesaOuReceita(lancamento.tipo)}</td>
                <td>{formataMes(lancamento.mes)}</td>
                <td>{lancamento.ano}</td>
                <td>{capitalizeWord(lancamento.status)}</td>
                <td>
                    <button className="btn btn-primary">Editar</button>
                    &nbsp;
                    <button className="btn btn-danger">Deletar</button>

                </td>
            </tr>
        )
    } )
    
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Mês</th>
                    <th>Ano</th>
                    <th>Situação</th>
                    <th>Ações</th>
                </tr>
            </thead>
           <tbody>
                {rows}
           </tbody>
        </table>
    )
}