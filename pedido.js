document.addEventListener('DOMContentLoaded', function () {
  const corpoTabela = document.getElementById('corpo-tabela');
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

  let totalPedidos = 0;

  pedidos.forEach((pedido) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${pedido.id}</td>
      <td>${pedido.cliente}</td>
      <td>${pedido.endereco}</td>
      <td>${pedido.produto}</td>
      <td>${pedido.data}</td>
      <td>${pedido.horaSaida}</td>
      <td>-</td> <!-- Hora Chegada pode ser preenchida manualmente -->
    `;
    corpoTabela.appendChild(linha);
    totalPedidos++;
  });

  document.getElementById('total-geral').textContent = `Total Geral R$: ${totalPedidos},00`;
});