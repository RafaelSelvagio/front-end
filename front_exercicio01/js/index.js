function cadastraPais() {
	const nome = document.getElementById('nome').value;
	const capital = document.getElementById('capital').value;

	// Configurar os dados que serão enviados
	const dados = {
		nome: nome,
		capital: capital
	};

	// Configurar as opções da requisição
	const opcoes = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(dados)
	};

	// Realizar a requisição
	fetch('https://nondescript-eye-production.up.railway.app/pais', opcoes)
		.then(response => {
			if (!response.ok) {
				throw new Error('Erro ao cadastrar país');
			}
			// Se a resposta for OK, exibe o alerta de sucesso
			Swal.fire({
				icon: 'success',
				title: 'Cadastro realizado com sucesso!',
				showConfirmButton: true,
				timer: 1500
			});

			// Limpa os campos do formulário após o cadastro
			document.getElementById('nome').value = '';
			document.getElementById('capital').value = '';
		})
		.catch(error => {
			// Se ocorrer um erro, exibe o alerta de falha
			Swal.fire({
				icon: 'error',
				title: 'Erro ao cadastrar país',
				text: error.message
			});
		});

	// Limpa os campos do formulário após o cadastro
	document.getElementById('nome').value = '';
	document.getElementById('capital').value = '';
}

function buscaTodos() {
	fetch('https://nondescript-eye-production.up.railway.app/pais')
		.then(response => {
			if (!response.ok) {
				throw new Error('Erro ao buscar países');
			}
			return response.json();
		})
		.then(data => {
			const tabelaElement = document.getElementById('tabela_lista');

			// Limpar todas as linhas da tabela
			while (tabelaElement.firstChild) {
				tabelaElement.removeChild(tabelaElement.firstChild);
			}

			// Criar uma nova linha na tabela
			const row = document.createElement('tr');

			// Criar células na linha para cada propriedade do país
			const cellNome = document.createElement('th');
			cellNome.textContent = "País";
			row.appendChild(cellNome);

			const cellCapital = document.createElement('th');
			cellCapital.textContent = "Capital";
			row.appendChild(cellCapital);

			const cellAcoes = document.createElement('td');
			cellAcoes.setAttribute('colspan', '2'); // Mescla duas células

			const selectOrdenacao = document.createElement('select');
			selectOrdenacao.setAttribute('id', 'selectOrdenacao');
			selectOrdenacao.classList.add('form-control');
			selectOrdenacao.onchange = function() {
				ordenaTabela();
			};

			// Adiciona as opções
			const opcaoSemOrdenar = document.createElement('option');
			opcaoSemOrdenar.value = '';
			opcaoSemOrdenar.textContent = 'Sem ordenar';
			selectOrdenacao.appendChild(opcaoSemOrdenar);

			const opcaoNomeCrescente = document.createElement('option');
			opcaoNomeCrescente.value = 'nomeCrescente';
			opcaoNomeCrescente.textContent = 'Nome Crescente';
			selectOrdenacao.appendChild(opcaoNomeCrescente);

			const opcaoNomeDecrescente = document.createElement('option');
			opcaoNomeDecrescente.value = 'nomeDecrescente';
			opcaoNomeDecrescente.textContent = 'Nome Decrescente';
			selectOrdenacao.appendChild(opcaoNomeDecrescente);

			const opcaoCapitalCrescente = document.createElement('option');
			opcaoCapitalCrescente.value = 'capitalCrescente';
			opcaoCapitalCrescente.textContent = 'Capital Crescente';
			selectOrdenacao.appendChild(opcaoCapitalCrescente);

			const opcaoCapitalDecrescente = document.createElement('option');
			opcaoCapitalDecrescente.value = 'capitalDecrescente';
			opcaoCapitalDecrescente.textContent = 'Capital Decrescente';
			selectOrdenacao.appendChild(opcaoCapitalDecrescente);

			cellAcoes.appendChild(selectOrdenacao);
			row.appendChild(cellAcoes);

			tabelaElement.appendChild(row);

			// Criar elementos de lista (li) para cada país
			data.forEach(pais => {
				// Criar uma nova linha na tabela
				const row = document.createElement('tr');

				// Criar células na linha para cada propriedade do país
				const cellNome = document.createElement('td');
				cellNome.textContent = pais.nome;
				row.appendChild(cellNome);

				const cellCapital = document.createElement('td');
				cellCapital.textContent = pais.capital;
				row.appendChild(cellCapital);

				// Célula de Editar
				const cellEditar = document.createElement('td');
				const btnEditar = document.createElement('button');
				btnEditar.textContent = 'Editar';
				btnEditar.className = 'btn btn-secondary';
				btnEditar.onclick = function() {
					// Chame a função de edição passando o id do país
					editaPais(pais.id);
				};
				cellEditar.appendChild(btnEditar);
				row.appendChild(cellEditar);

				// Célula de Excluir
				const cellExcluir = document.createElement('td');
				const btnExcluir = document.createElement('button');
				btnExcluir.textContent = 'Excluir';
				btnExcluir.className = 'btn btn-danger';
				btnExcluir.onclick = function() {
					// Chame a função de exclusão passando o id do país
					excluiPais(pais.id);
				};
				cellExcluir.appendChild(btnExcluir);
				row.appendChild(cellExcluir);

				// Adicionar a linha à tabela
				tabelaElement.appendChild(row);
			});
		})
		.catch(error => {
			console.error('Erro:', error);
		});
}

// Função para buscar país por nome
function buscaPorNome() {
	
}

function excluiPais(id) {
	
}

function editaPais(id) {

}

function cancelaEdicao() {
	document.getElementById('nome_edita').value = "";
	document.getElementById('capital_edita').value = "";

	$('#lista').addClass('active');
	$('#edicao').removeClass('active');

	Swal.fire({
		icon: 'info',
		title: 'A edição de país foi cancelada.',
		showConfirmButton: true,
		timer: 1500
	});
}

function gravaEdicao() {
	
}

function ordenaTabela() {
	
}


// Função executada ao terminar o load da página
window.onload = buscaTodos;

// Adicionar evento onclick ao elemento com o ID "lista-tab"
document.getElementById('lista-tab').onclick = function() {
	buscaTodos();
};

// Adicionar evento onclick ao elemento com o ID "btn_cadastra"
document.getElementById('btn_cadastra').onclick = function() {
	cadastraPais();
};

// Adicionar evento onclick ao elemento com o ID "btn_busca"
document.getElementById('btn_busca').onclick = function() {
	buscaPorNome();
};

// Adicionar evento onclick ao elemento com o ID "btn_cancela"
document.getElementById('btn_cancela').onclick = function() {
	cancelaEdicao();
};

// Adicionar evento onclick ao elemento com o ID "btn_edicao"
document.getElementById('btn_edicao').onclick = function() {
	gravaEdicao();
};
