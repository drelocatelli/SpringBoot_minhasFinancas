import React from "react";

class Home extends React.Component {

    render() {
        return (
            <div className="container">

                <div className="card mt-5" style={{ padding: '40px' }}>
                    <h1 className="display-5">Minhas Finanças</h1>
                    <br />
                    <p>
                        O guia para o seu sucesso financeiro
                        Toda a praticidade que a planilha não te oferece
                        <br />
                        Organize seu dinheiro em tempo real em uma solução completa, prática e segura, e garanta o controle total das suas finanças.
                        <br /><br /><br />
                        <a href="cadastro" className="btn btn-success">faça agora sua inscrição</a>
                    </p>
                </div>
            </div>
        )
    }

}

export default Home;