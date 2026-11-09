const PatasRegras = (function () {
  const PRECO_GATO = 50;
  const PRECO_CAO = { P: 60, M: 80, G: 100 };
  const PRECO_BANHO = { P: 40, M: 55, G: 70 };
  const IDADE_MINIMA_MESES = 4;
  const MINIMO_DIARIAS = 1;
  const MAXIMO_DIARIAS = 30;
  const DIAS_CANCELAMENTO_GRATIS = 2;
  const UM_DIA = 24 * 60 * 60 * 1000;

  function paraData(texto) {
    return new Date(texto + 'T00:00:00Z');
  }

  function validarNomeTutor(nome) {
    return typeof nome === 'string' && nome.trim().length >= 3;
  }

  function validarTelefone(telefone) {
    const numeros = String(telefone).replace(/\D/g, '');
    return numeros.length >= 10 && numeros.length <= 11;
  }

  function contarDiarias(entrada, saida) {
    if (!entrada || !saida) {
      return 0;
    }
    const dias = Math.round((paraData(saida) - paraData(entrada)) / UM_DIA);
    return dias > 0 ? dias : 0;
  }

  function validarPeriodo(entrada, saida) {
    const diarias = contarDiarias(entrada, saida);
    return diarias >= MINIMO_DIARIAS && diarias <= MAXIMO_DIARIAS;
  }

  function precoDiaria(especie, porte) {
    if (especie === 'gato') {
      return PRECO_GATO;
    }
    return PRECO_CAO[porte] || 0;
  }

  function percentualDesconto(diarias) {
    if (diarias >= 15) {
      return 15;
    }
    if (diarias > 7) {
      return 10;
    }
    return 0;
  }

  function precoBanho(especie, porte) {
    if (especie === 'gato') {
      return 0;
    }
    return PRECO_BANHO[porte] || 0;
  }

  function maximoBanhos(especie, diarias) {
    if (especie === 'gato') {
      return 0;
    }
    return Math.floor(diarias / 3);
  }

  function calcularTotal(reserva) {
    const diarias = reserva.diarias;
    const valorDiarias = diarias * precoDiaria(reserva.especie, reserva.porte);
    const valorBanhos = reserva.banhos * precoBanho(reserva.especie, reserva.porte);
    const desconto = percentualDesconto(diarias);
    const total = (valorDiarias + valorBanhos) * (100 - desconto) / 100;
    return Math.round(total * 100) / 100;
  }

  function podeHospedar(pet, entrada, saida) {
    if (pet.idadeMeses < IDADE_MINIMA_MESES) {
      return { ok: false, motivo: 'O pet precisa ter pelo menos ' + IDADE_MINIMA_MESES + ' meses.' };
    }
    if (!pet.vacinaValidaAte || paraData(pet.vacinaValidaAte) < paraData(entrada)) {
      return { ok: false, motivo: 'A vacina precisa estar válida até o dia da saída.' };
    }
    return { ok: true };
  }

  function multaCancelamento(entrada, hoje, valorDiaria) {
    const diasAntes = Math.round((paraData(entrada) - paraData(hoje)) / UM_DIA);
    if (diasAntes > DIAS_CANCELAMENTO_GRATIS) {
      return 0;
    }
    return valorDiaria / 2;
  }

  function formatarMoeda(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
  }

  return {
    validarNomeTutor: validarNomeTutor,
    validarTelefone: validarTelefone,
    contarDiarias: contarDiarias,
    validarPeriodo: validarPeriodo,
    precoDiaria: precoDiaria,
    percentualDesconto: percentualDesconto,
    precoBanho: precoBanho,
    maximoBanhos: maximoBanhos,
    calcularTotal: calcularTotal,
    podeHospedar: podeHospedar,
    multaCancelamento: multaCancelamento,
    formatarMoeda: formatarMoeda
  };
})();

if (typeof module !== 'undefined') {
  module.exports = PatasRegras;
}
