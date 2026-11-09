# PatasInn — Testes unitários

O **PatasInn** é o sistema de reservas de um hotel para cães e gatos. A equipe de desenvolvimento entregou a versão 1.0 com uma exigência: **todas as regras de cálculo precisam de testes unitários**, e a versão só vai para produção quando todos passarem.

Você vai escrever esses testes.

## O que tem neste repositório

```
patasinn-testes/
├── README.md                         ← este arquivo
├── REQUISITOS-PatasInn.md            ← documento oficial: a fonte da verdade
├── TESTES-passo-a-passo.md           ← guia da aula, com os 8 testes guiados
├── app/                              ← o PatasInn (abra app/index.html)
│   └── js/regras.js                  ← as regras que você vai testar
├── tests/
│   ├── regras.test.js                ← ONDE VOCÊ ESCREVE OS TESTES
│   ├── rodar-no-navegador.html       ← abra para rodar os testes
│   └── mini-jest.js                  ← o executor (não precisa mexer)
├── modelos/
│   └── RELATORIO-TESTES-modelo.md    ← modelo do relatório
├── entregas/                         ← seu relatório vai aqui
└── .github/ISSUE_TEMPLATE/           ← modelo de relatório de defeito
```

## Passo 1 — Criar o seu repositório

1. No topo desta página: **Use this template → Create a new repository**.
2. Nome: `patasinn-testes-nome-sobrenome`, **Public** (ou Private com o professor como colaborador).
3. **Code** → copie o link → `git clone <link>` → abra a pasta no VS Code.
4. No GitHub, em **Issues → Labels**, crie as etiquetas `severidade: crítica`, `severidade: alta`, `severidade: média` e `severidade: baixa`.

## Passo 2 — Conhecer o app (10 min)

1. Abra `app/index.html` com o Live Server e faça uma reserva.
2. Leia o `REQUISITOS-PatasInn.md` inteiro.
3. Abra `app/js/regras.js` e encontre cada função. Veja a lista no fim do arquivo.

## Passo 3 — Rodar os testes

1. Abra `tests/rodar-no-navegador.html` com o Live Server (ou com duplo clique).
2. Você deve ver: **1 passou** (o exemplo) e **9 a fazer**.
3. A cada teste que escrever no `tests/regras.test.js`: salve e aperte **F5** no executor.

## Passo 4 — Escrever os testes

Siga o [`TESTES-passo-a-passo.md`](TESTES-passo-a-passo.md): 8 testes guiados e o desafio.

## Regras

- O valor esperado de cada teste vem do `REQUISITOS-PatasInn.md`, **nunca** do código.
- Um teste, um comportamento. Dê ao teste um nome que diga o que ele confere.
- Teste vermelho e o teste está certo? É defeito: abra uma Issue. **Não corrija o código hoje.**
- Não mexa em `tests/mini-jest.js` nem em `app/`.

## Checklist de entrega

- [ ] 8 testes guiados escritos em `tests/regras.test.js`
- [ ] Uma Issue para cada teste vermelho confirmado como defeito
- [ ] `entregas/RELATORIO-TESTES-PatasInn.md` preenchido, com o print do executor
- [ ] Commit `test: primeiros testes unitarios do PatasInn` e push
- [ ] Desafio (opcional): testes das outras regras
