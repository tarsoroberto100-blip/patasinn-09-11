# PatasInn — Documento de Requisitos

**Produto:** PatasInn, sistema de reservas de um hotel para cães e gatos
**Plataforma:** web (navegadores atuais)
**Versão:** 1.0
**Autor:** Equipe de desenvolvimento do PatasInn

> Este é o documento oficial. Ele diz o que é comportamento correto. Se o sistema faz diferente do que está aqui, é defeito.

---

## 1. Contexto

O tutor preenche os dados dele e do pet, escolhe as datas de entrada e de saída e os banhos. O sistema calcula o orçamento na hora e, se tudo estiver dentro das regras, confirma a reserva. O tutor também pode cancelar uma reserva.

## 2. Tabela de preços

| Item | Gato | Cão porte P | Cão porte M | Cão porte G |
| --- | --- | --- | --- | --- |
| Diária | R$ 50,00 | R$ 60,00 | R$ 80,00 | R$ 100,00 |
| Banho | não oferecido | R$ 40,00 | R$ 55,00 | R$ 70,00 |

## 3. Regras de negócio

**RN01 — Nome do tutor.** O nome precisa ter pelo menos 3 letras, sem contar espaços no começo e no fim.

**RN02 — Telefone.** O telefone é um celular com DDD: exatamente **11 números**. Espaços, parênteses e traços digitados são ignorados. Exemplo válido: `(11) 98765-4321`.

**RN03 — Diárias.** O número de diárias é a quantidade de noites entre a data de entrada e a data de saída. Entrada 10/11 e saída 13/11 são 3 diárias. Se a saída não for depois da entrada, são 0 diárias.

**RN04 — Período.** A hospedagem tem no mínimo 1 e no máximo 30 diárias.

**RN05 — Preço da diária.** Segue a tabela da seção 2. Para gatos, o porte não muda o preço.

**RN06 — Desconto por pacote.** Hospedagens a partir de **7 diárias** têm 10% de desconto. A partir de **15 diárias**, o desconto é de 15%. **O desconto vale só para as diárias, nunca para os banhos.**

**RN07 — Banhos.** Banho é só para cães, com o preço da seção 2. O tutor pode pedir no máximo 1 banho a cada 3 diárias completas (3 diárias: 1 banho; 6 diárias: 2 banhos; 2 diárias: nenhum).

**RN08 — Total.** Total = (diárias × preço da diária, com o desconto da RN06) + (banhos × preço do banho). Arredondado em centavos.

**RN09 — Saúde do pet.** O pet precisa ter pelo menos **4 meses** de idade. A vacina precisa estar válida **até o dia da saída**, inclusive.

**RN10 — Cancelamento.** O cancelamento feito **2 dias ou mais** antes da entrada é gratuito. Feito com menos de 2 dias, a multa é de 50% de uma diária.

## 4. Requisitos não-funcionais

**RNF01 — Persistência.** As reservas continuam salvas depois de recarregar a página.

**RNF02 — Orçamento ao vivo.** O orçamento é atualizado a cada campo alterado, sem precisar clicar em nenhum botão.

**RNF03 — Testabilidade.** Todas as regras de cálculo e validação ficam em `app/js/regras.js`, em funções que recebem os dados e devolvem o resultado, sem depender da tela.

## 5. Critério de aceitação da versão 1.0

A versão pode ir para produção quando todas as regras de `regras.js` tiverem testes unitários e todos os testes passarem.
