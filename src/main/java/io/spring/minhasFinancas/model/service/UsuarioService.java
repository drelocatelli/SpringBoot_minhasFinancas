package io.spring.minhasFinancas.model.service;

import io.spring.minhasFinancas.model.Usuario;

public interface UsuarioService {

	Usuario autenticar(String email, String senha);
	Usuario salvarUsuario(Usuario usuario);
	void validarEmail(String email);
	
}
