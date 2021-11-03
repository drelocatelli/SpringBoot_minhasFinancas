package io.spring.minhasFinancas.model.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.spring.minhasFinancas.model.Lancamento;
import io.spring.minhasFinancas.model.enums.StatusLancamento;
import io.spring.minhasFinancas.model.enums.TipoLancamento;
import io.spring.minhasFinancas.model.repository.LancamentoRepository;
import io.spring.minhasFinancas.model.service.LancamentoService;

@Service
public class LancamentoServiceImpl implements LancamentoService {
	
	@Autowired
	private LancamentoRepository repository;
	
	public LancamentoServiceImpl(LancamentoRepository repository) {
		this.repository = repository;
	}

	@Override
	@Transactional
	public Lancamento salvar(Lancamento lancamento) {
		validar(lancamento);
		lancamento.setStatus(StatusLancamento.PENDENTE);
		return repository.save(lancamento);
	}

	@Override
	@Transactional
	public Lancamento atualizar(Lancamento lancamento) {
		Objects.requireNonNull(lancamento.getId());
		validar(lancamento);
		return repository.save(lancamento);
	}

	@Override
	@Transactional
	public void deletar(Lancamento lancamento) {
		Objects.requireNonNull(lancamento.getId());
		repository.delete(lancamento);
	}

	@Override
	@Transactional
	public List<Lancamento> buscar(Lancamento lancamentoFiltro) {
		Example example = Example.of(lancamentoFiltro, ExampleMatcher.matching()
																	.withIgnoreCase()
																	.withStringMatcher(StringMatcher.CONTAINING));
		
		return repository.findAll(example);
	}

	@Override
	public void atualizarStatus(Lancamento lancamento, StatusLancamento status) {
		lancamento.setStatus(status);
		atualizar(lancamento);
	}

	@Override
	public void validar(Lancamento lancamento) {
		if(lancamento.getDescricao() == null || lancamento.getDescricao().trim().equals("")) {
			throw new RuntimeException("Informe uma descrição válida!");
		}
		
		if(lancamento.getMes() == null || lancamento.getMes() < 1 || lancamento.getMes() > 12) {
			throw new RuntimeException("Informe um mês válido!");
		}
		
		if(lancamento.getAno() == null || lancamento.getAno().toString().length() != 4) {
			throw new RuntimeException("Informe um ano válido!");
		}
		
		if(lancamento.getUsuario() == null || lancamento.getUsuario().getId() == null) {
			throw new RuntimeException("Informe um usuário válido!");
		}
		
		if(lancamento.getValor() == null || lancamento.getValor() < 1 ) {
			throw new RuntimeException("Informe um valor válido!");
		}
		
		if(lancamento.getTipo() == null) {
			throw new RuntimeException("Informe um tipo de lançamento!");
		}
		
	}

	@Override
	public Optional<Lancamento> obterPorId(Long id) {
		return repository.findById(id);
	}

	@Override
	@Transactional
	public Double obterSaldoByUsuario(Long id) {
		Double receitas = repository.obterSaldoByUsuario(id, TipoLancamento.RECEITA);
		Double despesas = repository.obterSaldoByUsuario(id, TipoLancamento.DESPESA);
		
		if(receitas == null) {
			receitas = 0.0;
		}
		
		if(despesas == null) {
			despesas = 0.0;
		}
		
		return receitas - despesas;
	}
	
}
