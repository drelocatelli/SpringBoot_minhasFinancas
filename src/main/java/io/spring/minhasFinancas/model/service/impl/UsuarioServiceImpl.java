package io.spring.minhasFinancas.model.service.impl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.spring.minhasFinancas.model.Usuario;
import io.spring.minhasFinancas.model.repository.UsuarioRepository;
import io.spring.minhasFinancas.model.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {
	
	@Autowired
	private UsuarioRepository repository;

	public UsuarioServiceImpl(UsuarioRepository repository) {
		this.repository = repository;
	}

	@Override
	public Usuario autenticar(String email, String senha) {
		Optional<Usuario> usuario = repository.findByEmail(email);
		
		if(!usuario.isPresent()) {
			throw new RuntimeException("Usuário não encontrado!");
		}
		
		if(!usuario.get().getEmail().equals(email) || !usuario.get().getSenha().equals(senha)) {
			throw new RuntimeException("Senha inválida!");
		}
		
		return usuario.get();
	}

	@Override
	@Transactional
	public Usuario salvarUsuario(Usuario usuario) {
		validarEmail(usuario.getEmail());
		return repository.save(usuario);
	}

	@Override
	public void validarEmail(String email) {
		boolean existe = repository.existsByEmail(email);
		
		if(existe) {
			throw new RuntimeException("Já existe um usuário cadastrado com esse email.");
		}
	}

	@Override
	public Optional<Usuario> getById(Long id) {
		return repository.findById(id);
	}

}
