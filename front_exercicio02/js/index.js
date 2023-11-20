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
	
}

// Função para listar todas as tarefas
function listarTarefas() {
	
}

// Função para exibir os detalhes de uma tarefa específica
function exibirDetalhesTarefa(idTarefa) {
	
}

// Função para exibir os detalhes da tarefa
function exibeDetalhesTarefa(idTarefa, titulo, descricao, dataCriacao, dataVencimento, prioridade, estado) {
	
}

function buscaTarefaPorId() {
	
}

// Função para finalizar a tarefa
function finalizarTarefa() {
	
}

// Função para editar uma tarefa
function gravaEdicaoTarefa() {
	
}

// Função para excluir a tarefa
function excluirTarefa() {
	
}

// Ao carregar a página, lista as tarefas existentes
window.onload = function() {
	listarTarefas();
};

document.getElementById('btnGravarEdicao').onclick = function() {
	gravaEdicaoTarefa();
};
