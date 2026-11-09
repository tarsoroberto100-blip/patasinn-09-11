const CHAVE = 'patasinn_reservas';

let reservas = carregar();

function carregar() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : [];
  } catch (erro) {
    return [];
  }
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(reservas));
  } catch (erro) {
    return;
  }
}

function hojeTexto() {
  const agora = new Date();
  const mm = String(agora.getMonth() + 1).padStart(2, '0');
  const dd = String(agora.getDate()).padStart(2, '0');
  return agora.getFullYear() + '-' + mm + '-' + dd;
}

function somarDias(texto, dias) {
  const data = new Date(texto + 'T00:00:00Z');
  data.setUTCDate(data.getUTCDate() + dias);
  return data.toISOString().slice(0, 10);
}

function dataBR(texto) {
  const partes = texto.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function valor(id) {
  return document.getElementById(id).value;
}

function lerFormulario() {
  return {
    tutor: valor('tutor'),
    telefone: valor('telefone'),
    nomePet: valor('nomePet').trim(),
    especie: valor('especie'),
    porte: valor('especie') === 'gato' ? 'P' : valor('porte'),
    idadeMeses: Number(valor('idade')),
    vacinaValidaAte: valor('vacina'),
    entrada: valor('entrada'),
    saida: valor('saida'),
    banhos: Number(valor('banhos')) || 0
  };
}

function mostrar(id, texto, tipo) {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.className = 'mensagem' + (tipo ? ' ' + tipo : '');
}

function atualizarOrcamento() {
  const f = lerFormulario();
  const R = PatasRegras;
  document.getElementById('porte').disabled = f.especie === 'gato';
  const diarias = R.contarDiarias(f.entrada, f.saida);
  const limiteBanhos = R.maximoBanhos(f.especie, diarias);
  const banhos = Math.min(f.banhos, limiteBanhos);
  document.getElementById('ajudaBanhos').textContent = f.especie === 'gato'
    ? 'Banho não é oferecido para gatos.'
    : 'Máximo de ' + limiteBanhos + (limiteBanhos === 1 ? ' banho' : ' banhos') + ' para ' + diarias + (diarias === 1 ? ' diária' : ' diárias') + '.';
  document.getElementById('oDiarias').textContent = diarias;
  document.getElementById('oDiaria').textContent = R.formatarMoeda(R.precoDiaria(f.especie, f.porte));
  document.getElementById('oDesconto').textContent = R.percentualDesconto(diarias) + '%';
  document.getElementById('oBanhos').textContent = R.formatarMoeda(banhos * R.precoBanho(f.especie, f.porte));
  document.getElementById('oTotal').textContent = R.formatarMoeda(R.calcularTotal({ especie: f.especie, porte: f.porte, diarias: diarias, banhos: banhos }));
}

function confirmar(evento) {
  evento.preventDefault();
  const f = lerFormulario();
  const R = PatasRegras;
  if (!R.validarNomeTutor(f.tutor)) {
    mostrar('msgReserva', 'Informe o nome do tutor com pelo menos 3 letras.', 'erro');
    return;
  }
  if (!R.validarTelefone(f.telefone)) {
    mostrar('msgReserva', 'Informe o celular com DDD: 11 números.', 'erro');
    return;
  }
  if (!f.nomePet) {
    mostrar('msgReserva', 'Informe o nome do pet.', 'erro');
    return;
  }
  if (!R.validarPeriodo(f.entrada, f.saida)) {
    mostrar('msgReserva', 'A hospedagem deve ter de 1 a 30 diárias.', 'erro');
    return;
  }
  const saude = R.podeHospedar(f, f.entrada, f.saida);
  if (!saude.ok) {
    mostrar('msgReserva', saude.motivo, 'erro');
    return;
  }
  const diarias = R.contarDiarias(f.entrada, f.saida);
  if (f.banhos > R.maximoBanhos(f.especie, diarias)) {
    mostrar('msgReserva', 'Banhos acima do permitido para este período.', 'erro');
    return;
  }
  const total = R.calcularTotal({ especie: f.especie, porte: f.porte, diarias: diarias, banhos: f.banhos });
  reservas.push({
    id: Date.now(),
    tutor: f.tutor.trim(),
    nomePet: f.nomePet,
    especie: f.especie,
    porte: f.porte,
    entrada: f.entrada,
    saida: f.saida,
    diarias: diarias,
    banhos: f.banhos,
    valorDiaria: R.precoDiaria(f.especie, f.porte),
    total: total
  });
  salvar();
  mostrar('msgReserva', 'Reserva confirmada para ' + f.nomePet + ': ' + R.formatarMoeda(total) + '.', 'ok');
  renderizarReservas();
}

function cancelar(id) {
  const reserva = reservas.find(function (r) { return r.id === id; });
  if (!reserva) {
    return;
  }
  const multa = PatasRegras.multaCancelamento(reserva.entrada, hojeTexto(), reserva.valorDiaria);
  reservas = reservas.filter(function (r) { return r.id !== id; });
  salvar();
  mostrar('msgLista', 'Reserva de ' + reserva.nomePet + ' cancelada' + (multa > 0 ? ', multa de ' + PatasRegras.formatarMoeda(multa) : ', sem multa') + '.', 'ok');
  renderizarReservas();
}

function renderizarReservas() {
  const lista = document.getElementById('listaReservas');
  lista.innerHTML = '';
  if (reservas.length === 0) {
    const vazio = document.createElement('li');
    vazio.textContent = 'Nenhuma reserva ainda.';
    lista.appendChild(vazio);
    return;
  }
  reservas.forEach(function (r) {
    const li = document.createElement('li');
    const texto = document.createElement('span');
    texto.textContent = r.nomePet + ' (' + (r.especie === 'gato' ? 'gato' : 'cão ' + r.porte) + ') · ' + dataBR(r.entrada) + ' a ' + dataBR(r.saida) + ' · ' + r.diarias + (r.diarias === 1 ? ' diária' : ' diárias') + ' · ' + PatasRegras.formatarMoeda(r.total);
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'botao secundario';
    botao.textContent = 'Cancelar';
    botao.addEventListener('click', function () { cancelar(r.id); });
    li.appendChild(texto);
    li.appendChild(botao);
    lista.appendChild(li);
  });
}

function iniciar() {
  const hoje = hojeTexto();
  document.getElementById('hoje').textContent = 'Hoje: ' + dataBR(hoje);
  document.getElementById('entrada').value = somarDias(hoje, 7);
  document.getElementById('saida').value = somarDias(hoje, 10);
  document.getElementById('vacina').value = somarDias(hoje, 180);
  document.getElementById('formReserva').addEventListener('input', atualizarOrcamento);
  document.getElementById('formReserva').addEventListener('change', atualizarOrcamento);
  document.getElementById('formReserva').addEventListener('submit', confirmar);
  atualizarOrcamento();
  renderizarReservas();
}

iniciar();
