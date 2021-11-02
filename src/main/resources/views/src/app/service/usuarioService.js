import ApiService from "../apiservice";

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/login', credenciais)
    }

    salvar(credenciais) {
        return this.post('', credenciais)
    }
    
    getSaldoByUsuario(id) {
        return this.get(`/${id}/saldo`)
    }

    // isLoggedIn() {
    //     if(localStorage.getItem('userLoggedIn')){
    //         return true
    //     }
    //     return false
    // }
    
}

export default UsuarioService;