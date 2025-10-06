# Programacao-e-Modelagem-Para-Web

Projeto e-Commerce – Catálogo de Produtos


Resumo:

Este repositório contém um catálogo de produtos (HTML/CSS/JS) chamado QuickShop.

O objetivo do exercício é aplicar Flexbox, Grid e Media Queries para construir um layout responsivo inspirado em marketplaces.

Conteúdo:

- index.html — Estrutura semântica usando `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- styles.css — Estilos com uso de Flexbox e Grid; media queries para mobile/tablet/desktop.
- script.js — Lógica de renderização dos cards, filtros, carrinho e interações.

Explicação:

- Flexbox: usado para alinhar itens em header, controles, e para layouts de pequenas áreas (ex.: .marca, .botoes-header, .controles).
- Grid: usado para o catálogo de produtos com `grid-template-columns: repeat(auto-fill, minmax(...))` para criar colunas responsivas.
- Media Queries: regras `@media (max-width: 768px)` e `@media (max-width: 480px)` aplicadas no CSS. Foi mantida estratégia mobile-first nas regras (regras base aplicam para desktop e media queries ajustam para telas menores).
