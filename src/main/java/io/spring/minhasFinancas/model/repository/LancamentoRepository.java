package io.spring.minhasFinancas.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.spring.minhasFinancas.model.Lancamento;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

}
