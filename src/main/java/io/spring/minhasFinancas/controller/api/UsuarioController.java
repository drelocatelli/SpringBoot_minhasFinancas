package io.spring.minhasFinancas.controller.api;

import java.util.Optional;
import java.util.regex.Pattern;

import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.spring.minhasFinancas.controller.api.dto.UsuarioDTO;
import io.spring.minhasFinancas.model.Usuario;
import io.spring.minhasFinancas.model.service.LancamentoService;
import io.spring.minhasFinancas.model.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService service;
	
	@Autowired
	private LancamentoService lancamentoService;
	
	public UsuarioController(UsuarioService service, LancamentoService lancamentoService) {
		this.service = service;
		this.lancamentoService = lancamentoService;
	}

	@PostMapping("/login")
	public ResponseEntity autenticar(@RequestBody UsuarioDTO dto) {
		
		try {
			
			Usuario usuarioAutenticado = service.autenticar(dto.getEmail(), dto.getSenha());
			return new ResponseEntity(usuarioAutenticado, HttpStatus.OK);
			
		}catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody UsuarioDTO dto) {
		
		if(
			dto.getNome().isEmpty() ||
			dto.getEmail().isEmpty() || 
			dto.getSenha().isEmpty()
			) {
			return new ResponseEntity("Os campos precisam ser preenchidos!", HttpStatus.UNPROCESSABLE_ENTITY);
		}
		
		if(!this.isValidEMail(dto.getEmail())) {
			return new ResponseEntity("Digite um e-mail válido", HttpStatus.UNPROCESSABLE_ENTITY);
		}
		
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
	
	@GetMapping("{id}/saldo")
	public ResponseEntity obterSaldo(@PathVariable("id") Long id) {
		Optional<Usuario> usuario = service.getById(id);
		
		if(!usuario.isPresent()) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		Double saldo = lancamentoService.obterSaldoByUsuario(id);
		
		return ResponseEntity.ok(saldo);
		
	}
	
	public boolean isValidEMail(String email) {
		// verifica e-mail
		
		String regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
		        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
		
		if(Pattern.compile(regexEmail).matcher(email).matches()) {
			return true;
		}
		
		return false;
	}

	
}
