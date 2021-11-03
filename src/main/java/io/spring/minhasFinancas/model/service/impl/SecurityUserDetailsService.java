package io.spring.minhasFinancas.model.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.spring.minhasFinancas.model.Usuario;
import io.spring.minhasFinancas.model.repository.UsuarioRepository;

@Service
public class SecurityUserDetailsService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public SecurityUserDetailsService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuarioEncontrado = usuarioRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("E-mail não encontrado."));
		
		User user = (User) User.builder()
						.username(usuarioEncontrado.getEmail())
						.password(usuarioEncontrado.getSenha())
						.roles("User")
						.build();
		
		return user;
	}

}
