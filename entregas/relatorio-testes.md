# Relatório de testes unitários — PatasInn v1.0

**Nome:** [Tarso]
**Data:** 09/11/2026

## 1. Resultado do executor

```
Testes: 6 falharam, 26 passaram, 32 no total
```

Print da tela do executor: [abra tests/rodar-no-navegador.html, tire o print e arraste aqui]

## 2. Testes escritos

| Regra | Teste | Passou? | Issue |
| --- | --- | --- | --- |
| RN01 | Teste 1: aceita "Ana Lima" | Sim | — |
| RN01 | Teste 2: recusa "Al" | Sim | — |
| RN05 | Teste 3: cão G paga R$ 100 | Sim | — |
| RN05 | Teste 4: gato paga R$ 50 | Sim | — |
| RN03 | Teste 5: 10/11 a 13/11 = 3 diárias | Sim | — |
| RN06 | Teste 6: 6 diárias, sem desconto | Sim | — |
| RN06 | Teste 7: 7 diárias, 10% | **Não** | [#número da Issue 1] |
| RN06 | Teste 8: 15 diárias, 15% | Sim | — |
| RN02 | Desafio: aceita 11 números com máscara | Sim | — |
| RN02 | Desafio: recusa 10 números | **Não** | [#Issue 2] |
| RN02 | Desafio: recusa 12 números | Sim | — |
| RN04 | Desafio: 30, 31, 1 e 0 diárias (4 testes) | Sim | — |
| RN03 | Desafio: saída antes da entrada = 0 | Sim | — |
| RN07 | Desafio: cão 2, 3 e 6 diárias; gato (4 testes) | Sim | — |
| RN08 | Desafio: cão M, 3 diárias, 1 banho = R$ 295 | Sim | — |
| RN08 | Desafio: cão M, 10 diárias, 2 banhos = R$ 830 | **Não** | [#Issue 3] |
| RN08 | Desafio: gato, 7 diárias = R$ 315 | **Não** | [#Issue 1] (mesma causa do Teste 7) |
| RN09 | Desafio: 3 e 4 meses; vacina no dia da saída; vacina vencida (4 testes) | Sim | — |
| RN09 | Desafio: vacina vence no meio da hospedagem | **Não** | [#Issue 4] |
| RN10 | Desafio: 3 dias e 1 dia antes (2 testes) | Sim | — |
| RN10 | Desafio: 2 dias antes = gratuito | **Não** | [#Issue 5] |

## 3. Os testes vermelhos

- **Teste:** Teste 7 (RN06) e "gato com 7 diárias = R$ 315" (RN08)
  - **Esperado × recebido:** 10 × 0 (percentual) e 315 × 350 (total)
  - **O teste estava certo?** Sim, conferi com a regra RN06 ("a partir de 7 diárias")
  - **Causa provável:** `percentualDesconto` usa `diarias > 7` em vez de `>= 7`
  - **Issue aberta:** #

- **Teste:** recusa telefone com 10 números (RN02)
  - **Esperado × recebido:** false × true
  - **O teste estava certo?** Sim, conferi com a regra RN02 ("exatamente 11 números")
  - **Causa provável:** `validarTelefone` aceita de 10 a 11 números
  - **Issue aberta:** #

- **Teste:** cão M, 10 diárias, 2 banhos (RN08)
  - **Esperado × recebido:** 830 × 819
  - **O teste estava certo?** Sim, conferi com a regra RN06 ("o desconto vale só para as diárias") e a RN08
  - **Causa provável:** `calcularTotal` aplica o desconto também sobre os banhos
  - **Issue aberta:** #

- **Teste:** vacina que vence no meio da hospedagem (RN09)
  - **Esperado × recebido:** false × true
  - **O teste estava certo?** Sim, conferi com a regra RN09 ("válida até o dia da saída")
  - **Causa provável:** `podeHospedar` compara a vacina com a data de entrada, não com a de saída
  - **Issue aberta:** #

- **Teste:** cancelamento 2 dias antes (RN10)
  - **Esperado × recebido:** 0 × 30
  - **O teste estava certo?** Sim, conferi com a regra RN10 ("2 dias ou mais")
  - **Causa provável:** `multaCancelamento` usa `> 2` em vez de `>= 2`
  - **Issue aberta:** #

## 4. Reflexão

1. **Por que o teste 7 usa exatamente 7 diárias, e não 10?** Porque 7 é o valor limite: é onde a regra muda de 0% para 10%. Com 10 o teste passaria mesmo com o código errado (`> 7`), e o defeito ficaria escondido. Foi exatamente isso que aconteceu aqui.
2. **Quanto tempo levaria para conferir à mão?** São 32 verificações. Na tela, cada uma exigiria preencher o formulário, ajustar datas e conferir o orçamento, algo como 1 a 2 minutos cada, ou seja, de 30 a 60 minutos. O executor faz isso em menos de um segundo.
3. **Qual vantagem de ter os testes prontos ao corrigir o código?** Corrijo um defeito, aperto F5 e vejo na hora se o teste ficou verde e se não quebrei outra regra sem querer.