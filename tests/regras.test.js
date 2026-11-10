const R = require('../app/js/regras.js');

describe('Exemplo · precoDiaria', () => {
  test('gato paga R$ 50 de diária', () => {
    const especie = 'gato';
    const porte = 'P';

    const resultado = R.precoDiaria(especie, porte);

    expect(resultado).toBe(50);
  });
});

describe('RN01 · validarNomeTutor', () => {
  test('Teste 1: aceita o nome "Ana Lima"', () => {
    const nome = 'Ana Lima';

    const resultado = R.validarNomeTutor(nome);

    expect(resultado).toBe(true);
  });

  test('Teste 2: recusa o nome "Al", com só 2 letras', () => {
    const nome = 'Al';

    const resultado = R.validarNomeTutor(nome);

    expect(resultado).toBe(false);
  });
});

describe('RN05 · precoDiaria', () => {
  test('Teste 3: cão porte G paga R$ 100', () => {
    const especie = 'cao';
    const porte = 'G';

    const resultado = R.precoDiaria(especie, porte);

    expect(resultado).toBe(100);
  });

  test('Teste 4: gato paga R$ 50, mesmo marcado como porte G', () => {
    const especie = 'gato';
    const porte = 'G';

    const resultado = R.precoDiaria(especie, porte);

    expect(resultado).toBe(50);
  });
});

describe('RN03 · contarDiarias', () => {
  test('Teste 5: de 10/11 a 13/11 são 3 diárias', () => {
    const entrada = '2026-11-10';
    const saida = '2026-11-13';

    const resultado = R.contarDiarias(entrada, saida);

    expect(resultado).toBe(3);
  });
});

describe('RN06 · percentualDesconto', () => {
  test('Teste 6: 6 diárias não têm desconto', () => {
    const diarias = 6;

    const resultado = R.percentualDesconto(diarias);

    expect(resultado).toBe(0);
  });

  test('Teste 7: 7 diárias têm 10% de desconto', () => {
    const diarias = 7;

    const resultado = R.percentualDesconto(diarias);

    expect(resultado).toBe(10);
  });

  test('Teste 8: 15 diárias têm 15% de desconto', () => {
    const diarias = 15;

    const resultado = R.percentualDesconto(diarias);

    expect(resultado).toBe(15);
  });
});

/* ===================== DESAFIO ===================== */

describe('RN02 · validarTelefone', () => {
  test('aceita celular com 11 números e máscara: (11) 98765-4321', () => {
    const telefone = '(11) 98765-4321';

    const resultado = R.validarTelefone(telefone);

    expect(resultado).toBe(true);
  });

  test('recusa telefone com 10 números (um abaixo do limite)', () => {
    const telefone = '(11) 8765-4321';

    const resultado = R.validarTelefone(telefone);

    expect(resultado).toBe(false);
  });

  test('recusa telefone com 12 números (um acima do limite)', () => {
    const telefone = '(11) 98765-43210';

    const resultado = R.validarTelefone(telefone);

    expect(resultado).toBe(false);
  });
});

describe('RN04 · validarPeriodo', () => {
  test('aceita 30 diárias (limite máximo)', () => {
    const resultado = R.validarPeriodo('2026-11-10', '2026-12-10');

    expect(resultado).toBe(true);
  });

  test('recusa 31 diárias (um acima do máximo)', () => {
    const resultado = R.validarPeriodo('2026-11-10', '2026-12-11');

    expect(resultado).toBe(false);
  });

  test('aceita 1 diária (limite mínimo)', () => {
    const resultado = R.validarPeriodo('2026-11-10', '2026-11-11');

    expect(resultado).toBe(true);
  });

  test('recusa saída igual à entrada (0 diárias)', () => {
    const resultado = R.validarPeriodo('2026-11-10', '2026-11-10');

    expect(resultado).toBe(false);
  });
});

describe('RN03 · contarDiarias (saída não posterior)', () => {
  test('saída antes da entrada resulta em 0 diárias', () => {
    const resultado = R.contarDiarias('2026-11-13', '2026-11-10');

    expect(resultado).toBe(0);
  });
});

describe('RN07 · maximoBanhos', () => {
  test('cão com 2 diárias: nenhum banho', () => {
    expect(R.maximoBanhos('cao', 2)).toBe(0);
  });

  test('cão com 3 diárias: 1 banho', () => {
    expect(R.maximoBanhos('cao', 3)).toBe(1);
  });

  test('cão com 6 diárias: 2 banhos', () => {
    expect(R.maximoBanhos('cao', 6)).toBe(2);
  });

  test('gato não toma banho, mesmo com 6 diárias', () => {
    expect(R.maximoBanhos('gato', 6)).toBe(0);
  });
});

describe('RN08 · calcularTotal', () => {
  test('sem desconto e com banho: cão M, 3 diárias, 1 banho = R$ 295', () => {
    const reserva = { especie: 'cao', porte: 'M', diarias: 3, banhos: 1 };

    const resultado = R.calcularTotal(reserva);

    expect(resultado).toBe(295);
  });

  test('com desconto e com banho: cão M, 10 diárias, 2 banhos = R$ 830 (desconto só nas diárias)', () => {
    const reserva = { especie: 'cao', porte: 'M', diarias: 10, banhos: 2 };

    const resultado = R.calcularTotal(reserva);

    expect(resultado).toBe(830);
  });

  test('gato com 7 diárias e 10% de desconto = R$ 315', () => {
    const reserva = { especie: 'gato', porte: 'P', diarias: 7, banhos: 0 };

    const resultado = R.calcularTotal(reserva);

    expect(resultado).toBe(315);
  });
});

describe('RN09 · podeHospedar', () => {
  test('recusa pet com 3 meses (um abaixo do mínimo)', () => {
    const pet = { idadeMeses: 3, vacinaValidaAte: '2026-12-31' };

    const resultado = R.podeHospedar(pet, '2026-11-10', '2026-11-13');

    expect(resultado.ok).toBe(false);
  });

  test('aceita pet com 4 meses (limite mínimo)', () => {
    const pet = { idadeMeses: 4, vacinaValidaAte: '2026-12-31' };

    const resultado = R.podeHospedar(pet, '2026-11-10', '2026-11-13');

    expect(resultado.ok).toBe(true);
  });

  test('aceita vacina que vence exatamente no dia da saída', () => {
    const pet = { idadeMeses: 12, vacinaValidaAte: '2026-11-13' };

    const resultado = R.podeHospedar(pet, '2026-11-10', '2026-11-13');

    expect(resultado.ok).toBe(true);
  });

  test('recusa vacina que vence no meio da hospedagem (antes da saída)', () => {
    const pet = { idadeMeses: 12, vacinaValidaAte: '2026-11-11' };

    const resultado = R.podeHospedar(pet, '2026-11-10', '2026-11-13');

    expect(resultado.ok).toBe(false);
  });

  test('recusa vacina já vencida antes da entrada', () => {
    const pet = { idadeMeses: 12, vacinaValidaAte: '2026-11-05' };

    const resultado = R.podeHospedar(pet, '2026-11-10', '2026-11-13');

    expect(resultado.ok).toBe(false);
  });
});

describe('RN10 · multaCancelamento', () => {
  test('3 dias antes da entrada: cancelamento gratuito', () => {
    const resultado = R.multaCancelamento('2026-11-13', '2026-11-10', 60);

    expect(resultado).toBe(0);
  });

  test('2 dias antes da entrada: cancelamento gratuito (limite)', () => {
    const resultado = R.multaCancelamento('2026-11-13', '2026-11-11', 60);

    expect(resultado).toBe(0);
  });

  test('1 dia antes da entrada: multa de 50% de uma diária', () => {
    const resultado = R.multaCancelamento('2026-11-13', '2026-11-12', 60);

    expect(resultado).toBe(30);
  });
});