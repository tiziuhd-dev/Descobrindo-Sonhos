# Desvendando Seus Sonhos — Página de Vendas (Mobile-First)

Landing page **100% focada em conversão mobile** para o infoproduto **"Desvendando Seus Sonhos"** — guia digital sobre sonhos e experiências durante o sono pela perspectiva do Espiritismo. Copy curta, direta e pensada para compra por impulso.

## 🎯 Estrutura da página

Conforme solicitado no briefing enxuto, a página tem **14 seções** e **5 CTAs principais** (fora o sticky bar mobile, que é utilitário):

1. **Hero** — headline curta, subheadline direta, mockup pequeno, CTA 1, microcopy de confiança
2. **Identificação** — 4 falas curtas de identificação com o problema
3. **Mecanismo** — Método de Discernimento em 3 passos visuais (Experiência → Discernimento → Compreensão)
4. **Produto** — checklist do que vem no guia
5. **Benefícios** — 4 cards curtos (clareza, organização, discernimento, tranquilidade)
6. **Bônus** — 4 bônus em lista compacta
7. **Planos e Preços** — Básico (R$19,90) x Completo (R$29,90, destacado) — **CTA 2 e a oferta central**
8. **Urgência/Escassez** — aviso real sobre valor de lançamento sujeito a reajuste — **CTA 3**
9. **Prova Social** — 3 depoimentos com 5 estrelas, nomes e cidades
10. **Garantia** — selo "14 dias" + reembolso simples — **CTA 4**
11. **FAQ** — 5 perguntas em accordion
12. **Última objeção** — quebra emocional final
13. **CTA Final** — preço + botão grande — **CTA 5**
14. **Footer** — marca, aviso legal, copyright

+ **Sticky CTA mobile** fixo no rodapé da tela (some no Hero e no CTA Final para não duplicar visualmente).

---

## 🔗 Links de checkout (já configurados)

| Botão | Plano | Link |
|---|---|---|
| Quero o Básico | R$19,90 | `https://pay.cakto.com.br/b2kgtkb_1034302` |
| Todos os demais CTAs (Hero, Completo, Urgência, Garantia, CTA Final, Sticky) | R$29,90 (Completo) | `https://pay.cakto.com.br/pkervjg_1034313` |

Todos os links já estão aplicados diretamente nos botões `.cta-checkout` do `index.html` — não há mais variável de checkout genérica, pois os links reais da Cakto já foram informados.

---

## 🗣️ Depoimentos (seção 9)

Foram criados **3 depoimentos com 5 estrelas**, nomes e cidades fictícios de exemplo, com textos alinhados ao posicionamento de discernimento (sem prometer confirmação espiritual):

- Camila R. — Belo Horizonte
- Rodrigo M. — Curitiba
- Fernanda A. — Salvador

> ⚠️ **Importante**: esses depoimentos foram gerados para preencher a estrutura de prova social pedida no pedido do usuário. Assim que houver depoimentos reais de compradores, recomenda-se substituí-los pelos relatos verídicos, com autorização dos clientes.

---

## 🛡️ Garantia

Definida como **14 dias**, com reembolso simples — exibida com selo circular dourado na seção 10.

## ⏳ Urgência

Seção 8 usa um aviso real e honesto (não falso): *"O valor de lançamento é limitado e pode ser reajustado sem aviso."* — sem contadores falsos, sem "últimas vagas" inventadas.

---

## 🎨 Identidade visual

- **Paleta**: Navy profundo `#071426`, Azul-marinho `#0D1B2A`, Dourado `#D4AF37`, Dourado suave `#E6C76A`, Branco quente `#F8F5ED`.
- **Tipografia**: Playfair Display (títulos) + Inter (corpo/botões).
- **Layout**: mobile-first puro — container único (`max-width: 480–520px`), sem grids largos de desktop. Em telas maiores a página apenas permanece centralizada e compacta (não foi redesenhada em grid wide, pois o foco de tráfego é 100% mobile).

## ⚡ Performance

- Apenas **1 imagem** (`images/mockup.png`, ~150–220px de largura exibida) para carregamento rápido no hero.
- CSS e JS enxutos, sem bibliotecas pesadas (Tailwind removido da versão anterior).
- Fontes carregadas via Google Fonts com `preconnect`.
- Ícones via Font Awesome CDN.
- Animações leves (fade/slide via Intersection Observer), sem parallax ou efeitos pesados.

---

## 📁 Estrutura de arquivos

```
index.html         → página única com as 14 seções + sticky CTA
css/style.css       → identidade visual mobile-first (Navy + Dourado)
js/main.js          → accordion FAQ, scroll reveal, header dinâmico, sticky CTA
images/mockup.png   → mockup único do produto (leve, otimizado pro hero)
```

---

## ✅ O que já está pronto

- [x] Copy curta e direta, sem parágrafos longos
- [x] Estrutura 100% mobile-first (container único, botões full-width)
- [x] CTA visível já no primeiro viewport do Hero (sem precisar rolar)
- [x] 5 CTAs principais + sticky CTA mobile
- [x] Links reais de checkout (Cakto) aplicados em todos os botões
- [x] Planos e preços (R$19,90 / R$29,90) com destaque visual no Completo
- [x] Urgência/escassez honesta (sem contadores falsos)
- [x] Prova social com 3 depoimentos e 5 estrelas
- [x] Garantia de 14 dias com selo visual
- [x] FAQ em accordion funcional
- [x] Testado visualmente em viewport mobile (390px) sem erros de console ou overflow

## 🚧 Próximos passos recomendados

1. Substituir os depoimentos de exemplo por depoimentos reais de compradores assim que disponíveis.
2. Adicionar pixel de rastreamento (Meta/Google Ads) no `<head>` se for rodar tráfego pago.
3. Testar o fluxo real de checkout ponta a ponta nos dois links da Cakto.
4. Revisar o PDF final do produto para garantir consistência com as promessas da página.
5. Publicar pela aba **Publish** deste ambiente para gerar o link ao vivo.
