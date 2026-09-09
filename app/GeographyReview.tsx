"use client";

import { useState } from "react";

type ModuleId = "industry" | "regions" | "northeast" | "southeast";

type Props = {
  onBack: () => void;
  onGenerateFlashcards: (sourceId?: string) => void;
};

const modules: Array<{ id: ModuleId; number: string; title: string; subtitle: string; icon: string; deck: string }> = [
  { id: "industry", number: "01", title: "Industrialização e urbanização", subtitle: "Do café às metrópoles", icon: "▥", deck: "geo-industry" },
  { id: "regions", number: "02", title: "Regionalizações do Brasil", subtitle: "IBGE, Geiger e Milton Santos", icon: "⌖", deck: "geo-regions" },
  { id: "northeast", number: "03", title: "Nordeste", subtitle: "Natureza, água e sub-regiões", icon: "☀", deck: "geo-northeast" },
  { id: "southeast", number: "04", title: "Sudeste", subtitle: "Paisagens, economia e contrastes", icon: "⌁", deck: "geo-southeast" },
];

const subregions = [
  { name: "Zona da Mata", tag: "litoral úmido", detail: "Faixa litorânea mais úmida e urbanizada, com Mata Atlântica, cana-de-açúcar, indústria, portos e turismo.", color: "#2a8f75" },
  { name: "Agreste", tag: "transição", detail: "Entre a Zona da Mata e o Sertão. Policultura, pecuária leiteira e cidades que conectam litoral e interior.", color: "#d8a33d" },
  { name: "Sertão", tag: "semiárido", detail: "Chuvas escassas e irregulares, Caatinga, rios intermitentes e forte importância do São Francisco.", color: "#da6b4f" },
  { name: "Meio-Norte", tag: "transição", detail: "Entre Sertão e Amazônia, sobretudo MA e PI. Mata dos Cocais, extrativismo e agricultura.", color: "#728f4d" },
];

export default function GeographyReview({ onBack, onGenerateFlashcards }: Props) {
  const [active, setActive] = useState<ModuleId>("industry");
  const current = modules.find((module) => module.id === active) ?? modules[0];

  const chooseModule = (id: ModuleId) => {
    setActive(id);
    window.requestAnimationFrame(() => document.getElementById("geography-module")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="page geography-page">
      <button className="back-button" onClick={onBack}>← Voltar para trimestres</button>

      <section className="geography-hero">
        <div className="geography-hero-copy">
          <span className="eyebrow light">GEOGRAFIA · SOMATIVA · 18/08/2026</span>
          <h1>Brasil em<br /><em>movimento.</em></h1>
          <p>Uma revisão visual para conectar território, economia, natureza e sociedade — sem estudar cada assunto como se estivesse isolado.</p>
          <div className="geography-hero-meta"><span>4 capítulos</span><span>10 objetivos</span><span>em português</span></div>
        </div>
        <div className="geography-hero-art" aria-hidden="true">
          <div className="geo-sun" />
          <div className="geo-cloud geo-cloud-one" />
          <div className="geo-cloud geo-cloud-two" />
          <div className="geo-mountain back" />
          <div className="geo-mountain front" />
          <div className="geo-city"><i /><i /><i /><i /><i /></div>
          <div className="geo-river" />
        </div>
      </section>

      <section className="geography-source-note">
        <span>✓</span><div><strong>Conteúdo conferido com o guia de estudo</strong><p>Capítulos 5, 6, 8 e 10 · Industrialização e Urbanização · Regiões do Brasil · Nordeste · Sudeste</p></div>
      </section>

      <section className="geography-overview">
        <div className="section-heading"><div><span className="eyebrow coral">ROTA DE ESTUDO</span><h2>Escolha um bloco</h2></div><p>Os quatro assuntos se conectam. Comece pelo que parece mais difícil.</p></div>
        <div className="geography-module-nav">
          {modules.map((module) => (
            <button key={module.id} className={active === module.id ? "active" : ""} onClick={() => chooseModule(module.id)}>
              <span className="geo-module-number">{module.number}</span><i aria-hidden="true">{module.icon}</i><small>{module.subtitle}</small><strong>{module.title}</strong><b>Estudar →</b>
            </button>
          ))}
        </div>
      </section>

      <section id="geography-module" className={`geography-module-panel geo-${active}`}>
        <header className="geography-module-header">
          <div><span className="eyebrow light">MÓDULO {current.number}</span><h2>{current.title}</h2><p>{current.subtitle}</p></div>
          <button onClick={() => onGenerateFlashcards(current.deck)}>✦ Gerar flashcards deste módulo</button>
        </header>

        {active === "industry" && <IndustryModule />}
        {active === "regions" && <RegionsModule />}
        {active === "northeast" && <NortheastModule />}
        {active === "southeast" && <SoutheastModule />}

        <footer className="geography-module-footer">
          <div><small>PRÓXIMO PASSO</small><strong>Explique o esquema em voz alta sem olhar.</strong></div>
          <button onClick={() => onGenerateFlashcards(current.deck)}>Praticar com flashcards →</button>
        </footer>
      </section>
    </div>
  );
}

function IndustryModule() {
  return <div className="geo-module-body">
    <section className="geo-big-idea">
      <div><span>INDÚSTRIA</span><strong>empregos + fábricas</strong></div><b>atrai pessoas →</b><div><span>URBANIZAÇÃO</span><strong>cidades crescem</strong></div>
      <p>São partes do mesmo processo: a indústria se instala nas cidades, atrai trabalhadores e amplia mercado, serviços e infraestrutura.</p>
    </section>
    <section className="geo-section-card">
      <div className="geo-section-title"><span>①</span><div><small>LINHA DO TEMPO</small><h3>Como o Brasil se industrializou</h3></div></div>
      <div className="geo-timeline">
        <article><time>até 1929</time><strong>Economia do café</strong><p>O país exportava produtos agrícolas e importava muitos bens industrializados.</p></article>
        <article><time>1929</time><strong>Crise e substituição</strong><p>A queda das exportações de café estimulou a produção interna do que antes era importado.</p></article>
        <article><time>1930–1945</time><strong>Era Vargas</strong><p>O Estado investiu em indústrias de base, energia, rodovias e legislação trabalhista. A CSN simboliza o período.</p></article>
        <article><time>pós-guerra</time><strong>Concentração industrial</strong><p>O Sudeste reuniu capital do café, ferrovias, portos, mão de obra e grande mercado consumidor.</p></article>
      </div>
    </section>
    <section className="geo-two-columns">
      <article className="geo-section-card">
        <div className="geo-section-title"><span>②</span><div><small>TRANSFORMAÇÃO</small><h3>Do campo para a cidade</h3></div></div>
        <div className="geo-cause-chain"><span>Mecanização do campo</span><b>→</b><span>êxodo rural</span><b>→</b><span>crescimento urbano</span><b>→</b><span>metropolização</span></div>
        <p><strong>Êxodo rural</strong> é a migração do campo para a cidade. Nos anos 1970, a população brasileira já era predominantemente urbana.</p>
      </article>
      <article className="geo-section-card geo-dark-card">
        <div className="geo-section-title"><span>③</span><div><small>TRÊS CONCEITOS</small><h3>Não confunda</h3></div></div>
        <dl className="geo-definitions"><div><dt>Metropolização</dt><dd>Grandes cidades ampliam sua influência sobre municípios vizinhos.</dd></div><div><dt>Conurbação</dt><dd>As manchas urbanas de cidades vizinhas se unem fisicamente.</dd></div><div><dt>Região metropolitana</dt><dd>Agrupamento oficial de municípios para planejamento conjunto.</dd></div></dl>
      </article>
    </section>
    <section className="geo-two-columns">
      <article className="geo-section-card">
        <div className="geo-section-title"><span>④</span><div><small>REDE URBANA</small><h3>Hierarquia das cidades</h3></div></div>
        <div className="geo-pyramid"><div>Metrópoles nacionais<small>SP e RJ</small></div><div>Metrópoles regionais<small>influência regional</small></div><div>Centros regionais<small>municípios vizinhos</small></div><div>Centros locais<small>funções básicas</small></div></div>
        <p>A posição depende da <strong>influência</strong>, da oferta de serviços e da complexidade das funções — não apenas do tamanho.</p>
      </article>
      <article className="geo-section-card">
        <div className="geo-section-title"><span>⑤</span><div><small>CONTRADIÇÕES</small><h3>Problemas urbanos</h3></div></div>
        <div className="geo-chip-list"><span>segregação socioespacial</span><span>favelização</span><span>déficit habitacional</span><span>trânsito</span><span>saneamento insuficiente</span><span>trabalho informal</span></div>
        <p><strong>Segregação socioespacial</strong> é a separação desigual dos grupos sociais no espaço urbano, com acesso diferente a moradia, serviços e infraestrutura.</p>
      </article>
    </section>
  </div>;
}

function RegionsModule() {
  return <div className="geo-module-body">
    <section className="geo-definition-banner"><span>REGIÃO</span><p>Parte do território agrupada por características comuns.</p><b>+</b><span>REGIONALIZAR</span><p>Dividir o espaço segundo critérios e finalidades.</p></section>
    <section className="geo-section-card">
      <div className="geo-section-title"><span>①</span><div><small>COMPARE</small><h3>Três maneiras de enxergar o Brasil</h3></div></div>
      <div className="geo-region-compare">
        <article><header><b>5</b><div><small>IBGE</small><strong>Grandes Regiões</strong></div></header><p><b>Critério:</b> aspectos naturais, sociais e econômicos; respeita limites estaduais.</p><ul><li>Norte</li><li>Nordeste</li><li>Centro-Oeste</li><li>Sudeste</li><li>Sul</li></ul><em>Uso: estatísticas, planejamento e políticas públicas.</em></article>
        <article><header><b>3</b><div><small>PEDRO PINCHAS GEIGER</small><strong>Regiões Geoeconômicas</strong></div></header><p><b>Critério:</b> formação histórica e características socioeconômicas; não precisa respeitar limites estaduais.</p><ul><li>Amazônia</li><li>Nordeste</li><li>Centro-Sul</li></ul><em>Também chamadas de complexos regionais.</em></article>
        <article><header><b>4</b><div><small>MILTON SANTOS</small><strong>Quatro Brasis</strong></div></header><p><b>Critério:</b> tecnologia, infraestrutura, economia e densidade do meio técnico-científico-informacional.</p><ul><li>Amazônia</li><li>Nordeste</li><li>Centro-Oeste</li><li>Região Concentrada</li></ul><em>A Região Concentrada reúne Sul e Sudeste.</em></article>
      </div>
    </section>
    <section className="geo-two-columns">
      <article className="geo-section-card">
        <div className="geo-section-title"><span>②</span><div><small>IDEIA CENTRAL</small><h3>O território não mudou</h3></div></div>
        <p>O que muda é o <strong>critério usado para analisá-lo</strong>. Por isso, um mesmo estado pode aparecer inteiro em uma região oficial e dividido em outra proposta.</p>
        <div className="geo-formula">mesmo Brasil <b>+</b> critérios diferentes <b>=</b> mapas diferentes</div>
      </article>
      <article className="geo-section-card geo-check-card">
        <div className="geo-section-title"><span>✓</span><div><small>NA PROVA</small><h3>Como comparar</h3></div></div>
        <ol><li>Identifique <b>quem</b> propôs.</li><li>Observe <b>quantas</b> regiões existem.</li><li>Descubra o <b>critério</b>.</li><li>Veja se respeita <b>limites estaduais</b>.</li><li>Explique a <b>finalidade</b>.</li></ol>
      </article>
    </section>
  </div>;
}

function NortheastModule() {
  return <div className="geo-module-body">
    <section className="geo-section-card geo-landscape-card">
      <div className="geo-landscape-art" aria-hidden="true"><span className="sun" /><span className="sea" /><span className="plateau" /><span className="rain">••••</span><span className="dry">✣</span></div>
      <div><small>LEIA A PAISAGEM</small><h3>O relevo ajuda a explicar a chuva</h3><p>O ar úmido do oceano sobe ao encontrar o <strong>Planalto da Borborema</strong>. Ao subir, esfria, condensa e chove no lado voltado para o mar. Depois da barreira, o ar chega mais seco ao Sertão.</p><div className="geo-cause-chain compact"><span>ar úmido sobe</span><b>→</b><span>esfria</span><b>→</b><span>condensa</span><b>→</b><span>chuva orográfica</span></div></div>
    </section>
    <section className="geo-section-card">
      <div className="geo-section-title"><span>①</span><div><small>DO LITORAL AO INTERIOR</small><h3>As quatro sub-regiões</h3></div></div>
      <div className="geo-subregions">{subregions.map((item) => <article key={item.name} style={{ "--sub-color": item.color } as React.CSSProperties}><span>{item.tag}</span><h4>{item.name}</h4><p>{item.detail}</p></article>)}</div>
    </section>
    <section className="geo-two-columns">
      <article className="geo-section-card">
        <div className="geo-section-title"><span>②</span><div><small>NATUREZA CONECTADA</small><h3>Aspectos físicos</h3></div></div>
        <dl className="geo-definitions light"><div><dt>Relevo</dt><dd>Planaltos, planícies, depressões e chapadas; destaque para Borborema e Depressão Sertaneja.</dd></div><div><dt>Clima</dt><dd>Quente, com litoral úmido e interior semiárido de chuvas irregulares.</dd></div><div><dt>Vegetação</dt><dd>Caatinga, Mata Atlântica, Mata dos Cocais, Cerrado e vegetação litorânea.</dd></div><div><dt>Hidrografia</dt><dd>Rios perenes e intermitentes; o São Francisco é essencial para abastecimento, irrigação e energia.</dd></div></dl>
      </article>
      <article className="geo-section-card geo-water-card">
        <div className="geo-section-title"><span>③</span><div><small>QUESTÃO HÍDRICA</small><h3>Água no Sertão</h3></div></div>
        <div className="geo-water-drop">H₂O</div><p>A escassez envolve chuvas irregulares, alta evaporação, rios temporários e também <strong>distribuição e gestão da água</strong>.</p>
        <h4>Transposição do São Francisco</h4><p>Leva água por canais a áreas do semiárido para ampliar a segurança hídrica. Pode beneficiar abastecimento e produção, mas exige gestão, manutenção e cuidado com impactos sociais e ambientais.</p>
      </article>
    </section>
    <section className="geo-two-columns">
      <article className="geo-section-card"><div className="geo-section-title"><span>④</span><div><small>ECONOMIA</small><h3>Água muda possibilidades</h3></div></div><div className="geo-chip-list"><span>agricultura irrigada</span><span>pecuária</span><span>extrativismo</span><span>turismo</span><span>energia</span></div><p>Relevo, clima, solo e disponibilidade de água influenciam a ocupação e as atividades, mas decisões humanas e tecnologia também transformam o espaço.</p></article>
      <article className="geo-section-card"><div className="geo-section-title"><span>⑤</span><div><small>DOMÍNIOS</small><h3>Morfoclimáticos</h3></div></div><p><strong>Caatingas</strong> predominam no Sertão; <strong>Mares de Morros</strong> aparecem no litoral úmido; <strong>Cerrado</strong> ocorre em áreas do interior; faixas de <strong>transição</strong> combinam características de domínios vizinhos.</p></article>
    </section>
  </div>;
}

function SoutheastModule() {
  return <div className="geo-module-body">
    <section className="geo-southeast-states">
      <div><small>REGIÃO SUDESTE</small><h3>4 estados, muitos contrastes</h3><p>É a região mais populosa e economicamente dinâmica do país.</p></div>
      {["MG · Belo Horizonte", "SP · São Paulo", "RJ · Rio de Janeiro", "ES · Vitória"].map((state) => <span key={state}>{state}</span>)}
    </section>
    <section className="geo-two-columns">
      <article className="geo-section-card">
        <div className="geo-section-title"><span>①</span><div><small>PAISAGEM</small><h3>Aspectos físicos</h3></div></div>
        <dl className="geo-definitions light"><div><dt>Relevo</dt><dd>Serra do Mar, Mantiqueira, planaltos e Mares de Morros.</dd></div><div><dt>Clima</dt><dd>Tropical, tropical de altitude, tropical litorâneo, subtropical e semiárido no norte de MG.</dd></div><div><dt>Vegetação</dt><dd>Mata Atlântica, Cerrado e ecossistemas costeiros.</dd></div><div><dt>Rios</dt><dd>Bacias do Paraná, São Francisco e Atlântico Sudeste; abastecimento e hidreletricidade.</dd></div></dl>
      </article>
      <article className="geo-section-card geo-morros-card">
        <div className="geo-mini-morros" aria-hidden="true"><i /><i /><i /><i /></div>
        <small>DOMÍNIO MORFOCLIMÁTICO</small><h3>Mares de Morros</h3><p>Colinas arredondadas, vales encaixados e vertentes íngremes, formados por intenso intemperismo químico em clima quente e úmido. Eram cobertos principalmente pela Mata Atlântica.</p>
      </article>
    </section>
    <section className="geo-section-card">
      <div className="geo-section-title"><span>②</span><div><small>UMA HISTÓRIA ENCADEADA</small><h3>Da mineração à industrialização</h3></div></div>
      <div className="geo-economic-chain">
        <article><b>⛏</b><small>SÉCULO XVIII</small><strong>Mineração</strong><p>Gerou riqueza, caminhos e núcleos urbanos. Hoje, o Quadrilátero Ferrífero mantém grande importância econômica.</p></article><i>→</i>
        <article><b>♨</b><small>SÉCULO XIX</small><strong>Café</strong><p>Acumulou capital, ampliou ferrovias, atraiu mão de obra e fortaleceu cidades e mercado consumidor.</p></article><i>→</i>
        <article><b>▥</b><small>SÉCULO XX</small><strong>Indústria</strong><p>Usou infraestrutura, capital e mercado já existentes e acelerou urbanização e metropolização.</p></article>
      </div>
    </section>
    <section className="geo-two-columns">
      <article className="geo-section-card geo-risk-card">
        <div className="geo-section-title"><span>③</span><div><small>CIDADE + AMBIENTE</small><h3>Risco não é só natureza</h3></div></div>
        <p>Chuva forte vira desastre com mais facilidade quando há ocupação de <strong>encostas, várzeas e margens de rios</strong>, desmatamento, solo impermeabilizado e falta de infraestrutura.</p>
        <div className="geo-formula">ameaça natural <b>+</b> vulnerabilidade social <b>=</b> maior risco</div>
      </article>
      <article className="geo-section-card">
        <div className="geo-section-title"><span>④</span><div><small>PROBLEMAS</small><h3>Ambientais e sociais</h3></div></div>
        <div className="geo-chip-list"><span>desmatamento</span><span>poluição dos rios</span><span>enchentes</span><span>deslizamentos</span><span>ilhas de calor</span><span>resíduos</span><span>crise hídrica</span><span>déficit habitacional</span><span>desigualdade</span><span>trabalho informal</span></div>
      </article>
    </section>
    <section className="geo-exam-tip"><span>!</span><div><small>RESPOSTA FORTE</small><p>Não liste apenas o problema. Mostre a relação: <b>urbanização rápida e desigual → ocupação vulnerável → degradação ambiental → riscos e impactos diferentes entre grupos sociais.</b></p></div></section>
  </div>;
}
