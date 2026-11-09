# Testes unitários passo a passo — PatasInn

Na sexta você confirmou cada correção do Ler+ **à mão**: reiniciar os dados, clicar, conferir. Hoje você escreve testes que fazem isso **sozinhos**, em menos de um segundo, toda vez que você apertar F5.

> Teste unitário: um pedaço de código que chama **uma função**, com **dados conhecidos**, e confere se o **resultado** é o esperado.

---

## 1. O padrão: preparar → agir → verificar

Todo teste unitário tem 3 partes. Deixe uma linha em branco entre elas.

```js
test('gato paga R$ 50 de diária', () => {
  const especie = 'gato';                         // 1. PREPARAR: os dados de entrada
  const porte = 'P';

  const resultado = R.precoDiaria(especie, porte); // 2. AGIR: chama a função

  expect(resultado).toBe(50);                     // 3. VERIFICAR: compara com o esperado
});
```

De onde vem o **50**? Do `REQUISITOS-PatasInn.md`, nunca do código. O teste confere se o código obedece ao requisito.

---

## 2. As peças

| Peça | Para que serve | Exemplo |
| --- | --- | --- |
| `describe('nome', () => { ... })` | Agrupa os testes de uma regra | `describe('RN06 · percentualDesconto', ...)` |
| `test('nome', () => { ... })` | Um teste, um comportamento | `test('7 diárias têm 10%', ...)` |
| `expect(valor)` | O valor que você quer conferir | `expect(resultado)` |
| `.toBe(x)` | É exatamente igual a x (número, texto, true/false) | `.toBe(10)` |
| `.toEqual(obj)` | Tem o mesmo conteúdo (objetos e listas) | `.toEqual({ ok: true })` |
| `.toBeCloseTo(x)` | Quase igual (contas com centavos) | `.toBeCloseTo(612.5)` |
| `.not.toBe(x)` | É diferente de x | `.not.toBe(0)` |
| `test.todo('nome')` | Um teste que ainda falta escrever | aparece em amarelo |

O `R` no começo do arquivo são as regras do PatasInn: `R.precoDiaria(...)`, `R.contarDiarias(...)` e assim por diante. A lista completa está no fim de `app/js/regras.js`.

---

## 3. Rodar os testes

1. Abra a pasta `patasinn-testes` no VS Code.
2. Abra `tests/rodar-no-navegador.html` com o **Live Server** (ou com duplo clique).
3. Deixe essa aba aberta. **Cada vez que salvar o `regras.test.js`, aperte F5 nela.**

**Como ler o resultado:**

| Símbolo | Cor | Significa |
| --- | --- | --- |
| ✓ | verde | O teste passou: o código fez o que o requisito diz |
| ✕ | vermelho | O teste falhou: veja **Esperado (Expected)** e **Recebido (Received)** |
| ✎ | amarelo | Teste ainda não escrito (`test.todo`) |

**Página em branco ou sem resultado?** Erro de digitação no arquivo de teste. Aperte F12 → aba **Console**: a mensagem vermelha diz a linha.

---

## 4. Os 8 testes guiados

Abra `tests/regras.test.js`. Cada `test.todo(...)` é um teste para escrever. **Troque a linha do `test.todo` pelo teste completo.** Depois de cada teste: salve, F5 no executor.

### Testes 1 a 4: digite exatamente assim

```js
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
```

### Testes 5 a 8: complete os `___`

Use o `REQUISITOS-PatasInn.md` (RN03 e RN06) para descobrir os valores.

```js
describe('RN03 · contarDiarias', () => {
  test('Teste 5: de 10/11 a 13/11 são 3 diárias', () => {
    const entrada = '2026-11-10';
    const saida = '___';

    const resultado = R.contarDiarias(entrada, saida);

    expect(resultado).toBe(___);
  });
});

describe('RN06 · percentualDesconto', () => {
  test('Teste 6: 6 diárias não têm desconto', () => {
    const diarias = ___;

    const resultado = R.percentualDesconto(diarias);

    expect(resultado).toBe(___);
  });

  test('Teste 7: 7 diárias têm 10% de desconto', () => {
    const diarias = ___;

    const resultado = R.percentualDesconto(___);

    expect(resultado).toBe(___);
  });

  test('Teste 8: 15 diárias têm 15% de desconto', () => {
    ___
  });
});
```

**Datas** são escritas como texto no formato `'ano-mês-dia'`: 13/11/2026 vira `'2026-11-13'`.

**Por que 6, 7 e 15?** É a técnica de **valor limite**: testar exatamente onde a regra muda (6 → 7) e não só um valor qualquer no meio.

---

## 5. Um teste ficou vermelho. E agora?

1. **Leia** o Esperado e o Recebido.
2. **Confira o teste** com o `REQUISITOS-PatasInn.md`. O valor esperado está certo? Digitou certo?
3. **O teste está certo?** Então o código está errado: você achou um **defeito**.
4. **Abra uma Issue** no seu `patasinn-testes`, com o modelo “Relatório de defeito”. Nos passos, escreva o teste que falhou; no esperado e no obtido, os valores do executor; na evidência, o print do executor.
5. **Não corrija o código hoje.** O teste vermelho fica vermelho até amanhã: ele é a prova de que o defeito existe.

> Um teste que falha não é um teste errado. Muitas vezes é o teste fazendo o trabalho dele.

---

## 6. Desafio: teste as outras regras

Troque o `test.todo` do bloco **Desafio** por novos `describe`. Use valor limite: teste no limite, um abaixo e um acima.

| Regra | Função | Ideias de teste |
| --- | --- | --- |
| RN02 | `R.validarTelefone(telefone)` | `'(11) 98765-4321'` · 10 números · 12 números |
| RN04 | `R.validarPeriodo(entrada, saida)` | 30 diárias · 31 diárias · saída igual à entrada |
| RN07 | `R.maximoBanhos(especie, diarias)` | cão com 2, 3 e 6 diárias · gato |
| RN08 | `R.calcularTotal({ especie, porte, diarias, banhos })` | sem desconto e com banho · com desconto e com banho |
| RN09 | `R.podeHospedar(pet, entrada, saida)` | 3 e 4 meses · vacina vencendo no dia da saída · no meio da hospedagem |
| RN10 | `R.multaCancelamento(entrada, hoje, valorDiaria)` | 3, 2 e 1 dia antes da entrada |

**Dica para o RN09:** `podeHospedar` devolve um objeto. Confira só o campo `ok`:

```js
const pet = { idadeMeses: 12, vacinaValidaAte: '2026-11-13' };

const resultado = R.podeHospedar(pet, '2026-11-10', '2026-11-13');

expect(resultado.ok).toBe(true);
```

---

## 7. Entrega

1. `tests/regras.test.js` com os 8 testes guiados (e os do desafio, se fez).
2. Copie `modelos/RELATORIO-TESTES-modelo.md` para `entregas/RELATORIO-TESTES-PatasInn.md` e preencha.
3. Uma Issue para cada teste vermelho que você confirmou ser defeito.
4. Commit e push:
   ```
   git add .
   git commit -m "test: primeiros testes unitarios do PatasInn"
   git push
   ```
