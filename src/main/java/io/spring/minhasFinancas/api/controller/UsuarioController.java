package io.spring.minhasFinancas.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.spring.minhasFinancas.model.Usuario;
import io.spring.minhasFinancas.model.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService service;
	
	public UsuarioController(UsuarioService service) {
		this.service = service;
	}
	
	@PostMapping("/login")
	public ResponseEntity autenticar(@RequestBody Usuario dto) {
		
		try {
			
			Usuario usuarioAutenticado = service.autenticar(dto.getEmail(), dto.getEmail());
			return new ResponseEntity(usuarioAutenticado, HttpStatus.OK);
			
		}catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody Usuario dto) {
		Usuario usuario = Usuario.builder()
				.nome(dto.getNome())
				.email(dto.getEmail())
				.senha(dto.getSenha())
				.build();
		
		try {
			
			Usuario usuarioSalvo = service.salvarUsuario(usuario);
			return new ResponseEntity(usuarioSalvo, HttpStatus.CREATED);
			
		}catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());		
		}
		
	}
	
}
