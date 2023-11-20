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
	// Obtém o valor do campo de entrada com o id #nome_busca
	const nomeParaBuscar = document.getElementById('nome_busca').value;

	// Verifica se o campo de busca não está vazio
	if (nomeParaBuscar.trim() === '') {
		Swal.fire({
			icon: 'warning',
			title: 'Atenção',
			text: 'Por favor, insira um nome para buscar.'
		});
		return;
	}

	// URL do endpoint
	const url = `https://nondescript-eye-production.up.railway.app/pais/nome/${encodeURIComponent(nomeParaBuscar)}`;

	// Configuração da solicitação
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			// Adicione outros cabeçalhos conforme necessário
		},
	};

	// Fazendo a solicitação GET
	fetch(url, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Falha ao buscar o país. Código de status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			// Manipule os dados retornados conforme necessário
			console.log('Dados dos países encontrados:', data);

			// Verifique se há resultados
			if (data.length === 0) {
				Swal.fire({
					icon: 'info',
					title: 'Resultado da Busca',
					text: 'Nenhum país encontrado.'
				});
				return;
			}

			// Construa a mensagem com os resultados
			let message = '';
			data.forEach(pais => {
				message += `<li><b>Nome:</b> ${pais.nome}, <b>Capital:</b> ${pais.capital}</li>`;
				// Adicione mais propriedades conforme necessário
			});

			document.getElementById('ul_lista_busca_nome').innerHTML = message;
		})
		.catch(error => {
			Swal.fire({
				icon: 'error',
				title: 'Atenção',
				text: `Erro ao buscar o país: ${error.message}`
			});
		});
}

function excluiPais(id) {
	// URL do endpoint
	const url = `https://nondescript-eye-production.up.railway.app/pais/${id}`;

	// Configuração da solicitação
	const requestOptions = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			// Adicione outros cabeçalhos conforme necessário
		},
	};

	// Fazendo a solicitação DELETE
	fetch(url, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Falha ao excluir o país. Código de status: ${response.status}`);
			}

			Swal.fire({
				icon: 'success',
				title: 'Atenção',
				text: 'O país foi excluído com sucesso.'
			});

			buscaTodos();
		})
		.catch(error => {
			Swal.fire({
				icon: 'error',
				title: 'Atenção',
				text: 'Erro ao tentar excluir o país.'
			});

			buscaTodos();
		});
}

function editaPais(id) {

	// URL do endpoint
	const url = `https://nondescript-eye-production.up.railway.app/pais/${id}`;

	// Configuração da solicitação
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			// Adicione outros cabeçalhos conforme necessário
		},
	};

	// Fazendo a solicitação GET
	fetch(url, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Falha ao buscar o país. Código de status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {

			document.getElementById('id_edita').value = data.id;
			document.getElementById('nome_edita').value = data.nome;
			document.getElementById('capital_edita').value = data.capital;

			$('#edicao').addClass('active');
			$('#lista').removeClass('active');
		})
		.catch(error => {
			Swal.fire({
				icon: 'error',
				title: 'Atenção',
				text: `Erro ao buscar o país: ${error.message}`
			});
		});
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
	// Obter os valores dos campos de edição
	var id = document.getElementById('id_edita').value;
	var nome = document.getElementById('nome_edita').value;
	var capital = document.getElementById('capital_edita').value;

	// URL do endpoint
	var url = `https://nondescript-eye-production.up.railway.app/pais/${id}`;

	// Dados a serem enviados no corpo da requisição
	var data = {
		id: id,
		nome: nome,
		capital: capital
		// Adicione outros campos conforme necessário
	};

	// Configuração da solicitação
	var requestOptions = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			// Adicione outros cabeçalhos conforme necessário
		},
		body: JSON.stringify(data)
	};

	// Fazendo a solicitação PUT
	fetch(url, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Falha ao atualizar o país. Código de status: ${response.status}`);
			}

			// Tratamento de sucesso
			Swal.fire({
				icon: 'success',
				title: 'Atenção',
				text: 'O país foi atualizado com sucesso.'
			});

			$('#edicao').removeClass('active');
			$('#lista').addClass('active');

			buscaTodos();
		})
		.catch(error => {
			// Tratamento de erro
			Swal.fire({
				icon: 'error',
				title: 'Atenção',
				text: 'Erro ao tentar atualizar o país.'
			});
		});
}

function ordenaTabela() {
	// Obtém o valor selecionado no elemento selectOrdenacao
	const ordenacaoSelecionada = document.getElementById('selectOrdenacao').value;

	// Obtém a tabela e suas linhas
	const tabela = document.getElementById('tabela_lista');
	const linhas = Array.from(tabela.getElementsByTagName('tr'));

	// Armazena a primeira linha (cabeçalho) para adicionar novamente no final
	const cabecalho = linhas.shift();

	// Ordena as linhas com base na opção selecionada
	switch (ordenacaoSelecionada) {
		case 'nomeCrescente':
			linhas.sort((a, b) => {
				const nomeA = a.cells[0].textContent.toLowerCase();
				const nomeB = b.cells[0].textContent.toLowerCase();
				return nomeA.localeCompare(nomeB);
			});
			break;
		case 'nomeDecrescente':
			linhas.sort((a, b) => {
				const nomeA = a.cells[0].textContent.toLowerCase();
				const nomeB = b.cells[0].textContent.toLowerCase();
				return nomeB.localeCompare(nomeA);
			});
			break;
		case 'capitalCrescente':
			linhas.sort((a, b) => {
				const capitalA = a.cells[1].textContent.toLowerCase();
				const capitalB = b.cells[1].textContent.toLowerCase();
				return capitalA.localeCompare(capitalB);
			});
			break;
		case 'capitalDecrescente':
			linhas.sort((a, b) => {
				const capitalA = a.cells[1].textContent.toLowerCase();
				const capitalB = b.cells[1].textContent.toLowerCase();
				return capitalB.localeCompare(capitalA);
			});
			break;
		default:
			
			return;
	}

	// Remove todas as linhas da tabela
	while (tabela.firstChild) {
		tabela.removeChild(tabela.firstChild);
	}

	// Adiciona as linhas ordenadas de volta à tabela, incluindo o cabeçalho no início
	tabela.appendChild(cabecalho);
	linhas.forEach(linha => tabela.appendChild(linha));
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
