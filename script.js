let contadorId = 1;

document.getElementById('gerarPedido').addEventListener('click', function () {
  const cliente = document.getElementById('cliente').value;
  const endereco = document.getElementById('endereco').value;
  const produto = document.getElementById('produto').value;

  if (!cliente || !endereco || !produto) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const pedidoId = contadorId++;
  const pedidoDiv = document.createElement('div');
  pedidoDiv.classList.add('pedido');
  pedidoDiv.innerHTML = `
    <div class="info">
      <strong>Id: ${pedidoId} Cliente: ${cliente}</strong><br>
      Produto: ${produto}<br>
      Endereço: ${endereco}<br>
      Data: ${new Date().toLocaleDateString()}<br>
      Horário: ${new Date().toLocaleTimeString()}
    </div>
    <div class="pedido-btn"></div> <!-- Botão para "Em execução" -->
  `;

  pedidoDiv.querySelector('.pedido-btn').addEventListener('click', function () {
    moverParaACaminho(pedidoDiv, { pedidoId, cliente, endereco, produto });
  });

  document.getElementById('emExecucao').appendChild(pedidoDiv);


  document.getElementById('cliente').value = '';
  document.getElementById('endereco').value = '';
  document.getElementById('produto').value = 'Hamburguer';
});

function moverParaACaminho(pedidoDiv, pedidoData) {
  const aCaminhoDiv = document.getElementById('aCaminho');


  salvarPedidoNoLocalStorage(pedidoData);

  const concluirBtn = document.createElement('div');
  concluirBtn.classList.add('entregar-btn');
  concluirBtn.addEventListener('click', function () {
    concluirPedido(pedidoDiv);
  });

  const pedidoBtn = pedidoDiv.querySelector('.pedido-btn');
  if (pedidoBtn) {
    pedidoBtn.replaceWith(concluirBtn);
  }

  aCaminhoDiv.appendChild(pedidoDiv);
}

function salvarPedidoNoLocalStorage(pedido) {
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push({
    id: pedido.pedidoId,
    cliente: pedido.cliente,
    endereco: pedido.endereco,
    produto: pedido.produto,
    data: new Date().toLocaleDateString(),
    horaSaida: new Date().toLocaleTimeString(),
  });
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function concluirPedido(pedidoDiv) {
  pedidoDiv.remove();
  alert('Pedido concluído!');
}