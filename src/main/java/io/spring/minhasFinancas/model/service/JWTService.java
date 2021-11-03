package io.spring.minhasFinancas.model.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.spring.minhasFinancas.model.Usuario;

public interface JWTService {

	String gerarToken(Usuario usuario);
	Claims obterClaims(String token) throws ExpiredJwtException;
	boolean isTokenValido(String token);
	String obterLoginUsuario(String token);
	
}
