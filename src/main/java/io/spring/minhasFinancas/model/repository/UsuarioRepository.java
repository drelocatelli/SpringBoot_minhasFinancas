package io.spring.minhasFinancas.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.spring.minhasFinancas.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	boolean existsByEmail(String email);
	Optional<Usuario> findByEmail(String email);
	
}
