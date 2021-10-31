package io.spring.minhasFinancas.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.spring.minhasFinancas.model.enums.StatusLancamento;
import io.spring.minhasFinancas.model.enums.TipoLancamento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "lancamento")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Lancamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	@Lob
	private String descricao;
	
	@Column
	private Integer mes;
	
	@Column
	private Integer ano;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	
	@Column
	private Double valor;
	
	@Column(name = "data_cadastro")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date dataCadastro;
	
	@Column
	@Enumerated(value = EnumType.STRING)
	private TipoLancamento tipo;
	
	@Column
	@Enumerated(value = EnumType.STRING)
	private StatusLancamento status;
	
	@PrePersist
	public void prePersist() {
		this.setDataCadastro(new Date());
	}
	
}
