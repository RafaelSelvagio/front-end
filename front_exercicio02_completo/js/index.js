function converterDataParaPadraoBrasileiro(data) {
	const options = {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false
	};
	return new Date(data).toLocaleDateString('pt-BR', options);
}

function converterDataParaPadraoAmericano(dataBrasileira) {
    // Divida a data e a hora
    const partes = dataBrasileira.split(', ');
    const dataPartes = partes[0].split('/');
    const horaPartes = partes[1].split(':');

    // Crie um objeto Date no formato americano
    const dataAmericana = new Date(`${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}T${horaPartes[0]}:${horaPartes[1]}:00`);

    // Retorne a data no formato ISO (string)
    return dataAmericana.toISOString();
}



// Função para cadastrar uma nova tarefa
function cadastrarTarefa() {
	const titulo = document.getElementById('titulo').value;
	const descricao = document.getElementById('descricao').value;
	const dataVencimento = document.getElementById('dataVencimento').value;

	// Aqui você deve fazer a requisição POST para o back-end
	// Exemplo com fetch:
	fetch('https://railwaybancoexercicio02-production.up.railway.app/tarefas/criar', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			titulo: titulo,
			descricao: descricao,
			dataVencimento: dataVencimento
		}),
	})
		.then(response => response.json())
		.then(data => {
			// Após cadastrar, atualiza a lista de tarefas
			listarTarefas();
		})
		.catch(error => console.error('Erro ao cadastrar tarefa:', error));
}

// Função para listar todas as tarefas
function listarTarefas() {
	// Aqui você deve fazer a requisição GET para o back-end
	// Exemplo com fetch:
	fetch('https://railwaybancoexercicio02-production.up.railway.app/tarefas/DTO')
		.then(response => response.json())
		.then(data => {
			const listaTarefas = document.getElementById('listaTarefas');
			listaTarefas.innerHTML = '';

			data.forEach(tarefa => {
				const itemLista = document.createElement('li');
				itemLista.className = 'list-group-item';
				itemLista.innerHTML = `<strong>${tarefa.titulo}</strong> - ${tarefa.estado}`;
				itemLista.onclick = function() {
					exibirDetalhesTarefa(tarefa.idTarefa);
				};
				listaTarefas.appendChild(itemLista);
			});
		})
		.catch(error => console.error('Erro ao listar tarefas:', error));
}

// Função para exibir os detalhes de uma tarefa específica
function exibirDetalhesTarefa(idTarefa) {
	// Aqui você deve fazer a requisição GET para o back-end
	// Exemplo com fetch:
	fetch(`https://railwaybancoexercicio02-production.up.railway.app/tarefas/exibir/${idTarefa}`)
		.then(response => response.json())
		.then(data => {
			exibeDetalhesTarefa(data.idTarefa, data.titulo, data.descricao, data.dataCriacao, data.dataVencimento, data.prioridade, data.estado);
		})
		.catch(error => console.error('Erro ao obter detalhes da tarefa:', error));
}

// Função para exibir os detalhes da tarefa
function exibeDetalhesTarefa(idTarefa, titulo, descricao, dataCriacao, dataVencimento, prioridade, estado) {
	// Preencher os campos do modal com os detalhes da tarefa
	$('#detalhesIdTarefa').text(idTarefa);
	$('#detalhesTitulo').text(titulo);
	$('#detalhesDescricao').text(descricao);
	$('#detalhesDataCriacao').text(converterDataParaPadraoBrasileiro(dataCriacao));
	$('#detalhesDataVencimento').text(converterDataParaPadraoBrasileiro(dataVencimento));
	$('#detalhesPrioridade').text(prioridade);
	$('#detalhesEstado').text(estado);

	// Mostrar o modal
	$('#modalDetalhesTarefa').modal('show');
}

function buscaTarefaPorId() {
	// Obter o ID da tarefa a partir do elemento HTML
	let idTarefa = $("#detalhesIdTarefa").html();

	// Enviar a requisição para o servidor (usando o endpoint apropriado)
	fetch(`https://railwaybancoexercicio02-production.up.railway.app/tarefas/exibir/${idTarefa}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Erro ao obter dados da tarefa');
			}
			return response.json();
		})
		.then(tarefa => {
			// Preencher os campos do modal com os dados da tarefa
			$("#edicaoIdTarefa").val(tarefa.idTarefa);
			$("#edicaoTitulo").val(tarefa.titulo);
			$("#edicaoDescricao").val(tarefa.descricao);
			$("#edicaoDataCriacao").val(converterDataParaPadraoBrasileiro(tarefa.dataCriacao));
			$("#edicaoDataVencimento").val(converterDataParaPadraoBrasileiro(tarefa.dataVencimento));
			$("#edicaoPrioridade").val(tarefa.prioridade);
			$("#edicaoEstado").val(tarefa.estado);

			// Exibir o modal de edição
			$('#modalEdicaoTarefa').modal('show');
		})
		.catch(error => {
			console.error('Erro ao obter dados da tarefa:', error);
		});
}

// Função para finalizar a tarefa
function finalizarTarefa() {
	let idTarefa = $("#detalhesIdTarefa").html();

	Swal.fire({
		title: 'Tem certeza?',
		text: 'Esta ação não pode ser revertida!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Sim, finalizar!',
		cancelButtonText: 'Cancelar'
	}).then((result) => {
		if (result.isConfirmed) {
			// Fazer a chamada para o backend para excluir a tarefa
			fetch(`https://railwaybancoexercicio02-production.up.railway.app/tarefas/finalizar/${idTarefa}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idTarefa: idTarefa,
					titulo: $("#detalhesTitulo").html(),
					descricao: $("#detalhesDescricao").html(),
					dataCriacao: '',
					dataVencimento: '',
					prioridade: $("#detalhesPrioridade").html(),
					estado: $("#detalhesEstado").html()
				}),
			})
				.then(response => {
					Swal.fire(
						'Finalizada!',
						'A tarefa foi concluída com sucesso.',
						'success'
					);

					// Fechar o modal após a ação
					$('#modalDetalhesTarefa').modal('hide');

					listarTarefas();
				})
		}
	});
}

// Função para editar uma tarefa
function gravaEdicaoTarefa() {
	// Obter os valores dos campos do modal
	let idTarefa = $("#edicaoIdTarefa").val();
	let titulo = $("#edicaoTitulo").val();
	let descricao = $("#edicaoDescricao").val();
	let dataCriacao = converterDataParaPadraoAmericano($("#edicaoDataCriacao").val());
	let dataVencimento = converterDataParaPadraoAmericano($("#edicaoDataVencimento").val());
	let prioridade = $("#edicaoPrioridade").val();
	let estado = $("#edicaoEstado").val();

	// Criar um objeto com os dados da tarefa
	let tarefaEditada = {
		idTarefa: idTarefa,
		titulo: titulo,
		descricao: descricao,
		dataCriacao: dataCriacao,
		dataVencimento: dataVencimento,
		prioridade: prioridade,
		estado: estado
	};


	fetch(`https://railwaybancoexercicio02-production.up.railway.app/tarefas/atualizar/${idTarefa}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(tarefaEditada)
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Erro ao editar tarefa');
			}
			return response.json();
		})
		.then(tarefaAtualizada => {
			Swal.fire(
				'Atualizada!',
				'A tarefa foi atualizada com sucesso.',
				'success'
			);

			$('#modalEdicaoTarefa').modal('hide');

			listarTarefas();
		})
		.catch(error => {
			console.error('Erro ao editar tarefa:', error);
		});

}

// Função para excluir a tarefa
function excluirTarefa() {
	let idTarefa = $("#detalhesIdTarefa").html();

	// Confirmar se o usuário realmente deseja excluir a tarefa
	Swal.fire({
		title: 'Tem certeza?',
		text: 'Esta ação não pode ser revertida!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Sim, excluir!',
		cancelButtonText: 'Cancelar'
	}).then((result) => {
		if (result.isConfirmed) {
			// Fazer a chamada para o backend para excluir a tarefa
			fetch(`https://railwaybancoexercicio02-production.up.railway.app/tarefas/remover/${idTarefa}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
					// Adicione aqui qualquer cabeçalho adicional necessário
				},
				// Adicione aqui o corpo da requisição, se necessário
			})
				.then(response => {
					Swal.fire(
						'Excluído!',
						'A tarefa foi excluída com sucesso.',
						'success'
					);

					// Fechar o modal após a ação
					$('#modalDetalhesTarefa').modal('hide');

					listarTarefas();
				})
		}
	});
}




// Ao carregar a página, lista as tarefas existentes
window.onload = function() {
	listarTarefas();
};

document.getElementById('btnGravarEdicao').onclick = function() {
	gravaEdicaoTarefa();
};
