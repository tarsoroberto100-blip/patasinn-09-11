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
  test.todo('Teste 1: aceita o nome "Ana Lima"');
  test.todo('Teste 2: recusa o nome "Al", com só 2 letras');
});

describe('RN05 · precoDiaria', () => {
  test.todo('Teste 3: cão porte G paga R$ 100');
  test.todo('Teste 4: gato paga R$ 50, mesmo marcado como porte G');
});

describe('RN03 · contarDiarias', () => {
  test.todo('Teste 5: de 10/11 a 13/11 são 3 diárias');
});

describe('RN06 · percentualDesconto', () => {
  test.todo('Teste 6: 6 diárias não têm desconto');
  test.todo('Teste 7: 7 diárias têm 10% de desconto');
  test.todo('Teste 8: 15 diárias têm 15% de desconto');
});

describe('Desafio', () => {
  test.todo('Desafio: escreva aqui os testes das outras regras');
});
