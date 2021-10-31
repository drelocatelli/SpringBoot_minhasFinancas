package io.spring.minhasFinancas.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.spring.minhasFinancas.model.Lancamento;
import io.spring.minhasFinancas.model.Usuario;
import io.spring.minhasFinancas.model.service.LancamentoService;
import io.spring.minhasFinancas.model.service.UsuarioService;

@RestController
@RequestMapping("/api/lancamentos")
public class LancamentoController {
	
	@Autowired
	private LancamentoService service;
	
	@Autowired
	private UsuarioService usuarioService;

	public LancamentoController(LancamentoService service, UsuarioService usuarioService) {
		this.service = service;
		this.usuarioService = usuarioService;
	}

	@PostMapping
	public ResponseEntity salvar(@RequestBody Lancamento dto) {
		
		Lancamento lancamento = new Lancamento();
		
		lancamento.setDescricao(dto.getDescricao());
		lancamento.setAno(dto.getAno());
		lancamento.setMes(dto.getMes());
		lancamento.setValor(dto.getValor());
		
		Usuario usuario = usuarioService.getById(dto.getUsuario().getId())
				.orElseThrow( () -> new RuntimeException("Usuário não encontrado para o Id informado.") );
		
		lancamento.setUsuario(usuario);
		
	}

}
