"use client";

import { useMemo, useState } from "react";
import { asset } from "./asset";

type ModuleId = "indigenous" | "colonization" | "enslavement" | "sugar";

type Props = {
  onBack: () => void;
  onGenerateFlashcards: (sourceId?: string) => void;
};

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const modules: Array<{ id: ModuleId; number: string; chapter: string; title: string; subtitle: string; icon: string; deck: string; infographic: string }> = [
  { id: "indigenous", number: "01", chapter: "CAPÍTULO 9 · P. 173–181", title: "Povos indígenas do Brasil", subtitle: "Diversidade, organização e permanências", icon: "◉", deck: "history-indigenous", infographic: asset("history/historia-capitulo-09.webp") },
  { id: "colonization", number: "02", chapter: "CAPÍTULO 10 · P. 191–203", title: "Início da colonização", subtitle: "Administração, resistência e missões", icon: "⌁", deck: "history-colonization", infographic: asset("history/historia-capitulo-10.webp") },
  { id: "enslavement", number: "03", chapter: "CAPÍTULO 11 · P. 215–229", title: "Escravização africana", subtitle: "Tráfico, trabalho, resistência e heranças", icon: "✦", deck: "history-enslavement", infographic: asset("history/historia-capitulo-11.webp") },
  { id: "sugar", number: "04", chapter: "CAPÍTULO 12 · P. 234–247", title: "Economia açucareira", subtitle: "Plantation, engenho, gado e Beckman", icon: "◇", deck: "history-sugar", infographic: asset("history/historia-capitulo-12.webp") },
];

const quizQuestions: QuizQuestion[] = [
  {
    question: "Por que não é correto tratar os povos indígenas como um único grupo?",
    options: ["Porque todos falavam português de modos diferentes.", "Porque existiam muitos povos, línguas, organizações, crenças e modos de vida.", "Porque viviam somente no litoral.", "Porque não mantinham contato entre si."],
    answer: 1,
    explanation: "O SAS destaca a diversidade. Tupi, Macro-Jê e Aruaque são famílias linguísticas, não um único povo nem uma cultura homogênea.",
  },
  {
    question: "As casas subterrâneas dos Kaingang estavam ligadas principalmente a qual necessidade?",
    options: ["Proteção contra frio, chuva e vento no Sul.", "Armazenamento de açúcar.", "Defesa contra navios franceses.", "Realização de comércio atlântico."],
    answer: 0,
    explanation: "Parte da moradia ficava abaixo do nível do solo, uma adaptação ao clima mais frio do Sul do atual Brasil.",
  },
  {
    question: "Qual alternativa explica a importância do Parque Indígena do Xingu?",
    options: ["Substitui todas as culturas por uma só.", "Mantém os povos isolados de qualquer relação.", "Protege território e favorece a continuidade de línguas, rituais e modos de vida diversos.", "Foi criado para ampliar a mineração."],
    answer: 2,
    explanation: "O parque protege um território onde vivem diferentes povos. Preservação não significa congelar culturas, mas garantir condições para sua continuidade.",
  },
  {
    question: "O que levou Portugal a iniciar a ocupação efetiva da América?",
    options: ["O fim imediato do comércio oriental.", "A ameaça de estrangeiros no litoral e a necessidade de defender e controlar o território.", "A descoberta de ouro em 1500.", "A ausência de pau-brasil."],
    answer: 1,
    explanation: "A presença francesa e de outros europeus mostrou que patrulhar a costa era insuficiente. Povoar passou a ser uma forma de defender a posse portuguesa.",
  },
  {
    question: "Por que muitas capitanias hereditárias fracassaram?",
    options: ["Porque os donatários não tinham qualquer obrigação.", "Pelos altos custos, distância, falta de recursos e resistência indígena, entre outros fatores.", "Porque o açúcar não existia na Europa.", "Porque o Governo-Geral já controlava todas elas desde 1500."],
    answer: 1,
    explanation: "O território era enorme, a viagem era cara e vários donatários não tinham recursos suficientes. Houve ainda conflitos e forte resistência indígena.",
  },
  {
    question: "Qual relação expressa melhor a atuação dos jesuítas?",
    options: ["Somente proteção, sem mudanças culturais.", "Catequização, aldeamentos e ensino, acompanhados de aculturação, doenças e controle do modo de vida indígena.", "Apenas exploração mineral.", "Criação das capitanias hereditárias."],
    answer: 1,
    explanation: "A atuação teve dimensões contraditórias: missões podiam proteger contra colonos escravizadores, mas impunham religião, rotina e valores europeus.",
  },
  {
    question: "Qual era uma consequência direta dos leilões de pessoas escravizadas?",
    options: ["Reunião das famílias africanas.", "Rompimento de laços familiares e venda a proprietários diferentes.", "Liberdade imediata nas cidades.", "Fim da violência do tráfico."],
    answer: 1,
    explanation: "Pessoas recém-desembarcadas eram avaliadas e vendidas. Famílias e vínculos comunitários eram frequentemente desfeitos nesse processo violento.",
  },
  {
    question: "O que diferenciava, em geral, a escravidão urbana da rural?",
    options: ["Nas cidades não havia violência.", "Nas cidades havia maior mobilidade em ofícios e no ganho, mas continuavam exploração, punições e controle.", "No campo todos recebiam salário.", "Na cidade apenas mulheres eram escravizadas."],
    answer: 1,
    explanation: "Escravizados de ganho circulavam e realizavam serviços, entregando parte da renda ao senhor. Mobilidade não significava liberdade nem ausência de violência.",
  },
  {
    question: "Capoeira, religiões afro-brasileiras e técnicas de taipa mostram que:",
    options: ["As culturas africanas desapareceram.", "Pessoas africanas e afrodescendentes preservaram e recriaram saberes, práticas e formas de resistência.", "Essas práticas vieram exclusivamente de Portugal.", "Não houve trocas culturais no Brasil."],
    answer: 1,
    explanation: "Mesmo sob perseguição, saberes africanos foram preservados, transformados e incorporados à cultura brasileira.",
  },
  {
    question: "Quais são os quatro elementos clássicos do plantation?",
    options: ["Minifúndio, policultura, trabalho livre e mercado interno.", "Latifúndio, monocultura, trabalho escravizado e produção para exportação.", "Pecuária, mineração, artesanato e escambo.", "Feitoria, missão, vila e capitania."],
    answer: 1,
    explanation: "O modelo açucareiro combinava grandes propriedades, cultivo dominante de cana, exploração do trabalho escravizado e foco no mercado externo.",
  },
  {
    question: "Qual sequência resume corretamente a fabricação do açúcar?",
    options: ["Moagem → plantio → transporte → purga.", "Plantio e corte → moagem → fervura e clarificação → moldes e purga → transporte.", "Purga → colheita → criação de gado.", "Refino europeu → plantio → moagem."],
    answer: 1,
    explanation: "A cana era cultivada e cortada, moída para extrair o caldo, fervida e limpa, colocada em moldes para purgar e depois transportada em pães ou caixas.",
  },
  {
    question: "O que motivou a Revolta de Beckman?",
    options: ["A defesa do monopólio comercial e da falta de mão de obra.", "A insatisfação com a Companhia de Comércio do Maranhão, preços, abastecimento e fornecimento insuficiente de pessoas escravizadas.", "A luta pela independência do Brasil no século XIX.", "A proibição da pecuária no interior."],
    answer: 1,
    explanation: "Senhores do Maranhão reagiram ao monopólio, aos preços e à baixa oferta de mão de obra. O movimento foi reprimido e seus líderes punidos.",
  },
];

export default function HistoryReview({ onBack, onGenerateFlashcards }: Props) {
  const [active, setActive] = useState<ModuleId>("indigenous");
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = modules.find((module) => module.id === active) ?? modules[0];
  const question = quizQuestions[quizIndex];

  const progress = useMemo(() => Math.round(((quizIndex + (checked ? 1 : 0)) / quizQuestions.length) * 100), [checked, quizIndex]);

  const chooseModule = (id: ModuleId) => {
    setActive(id);
    window.requestAnimationFrame(() => document.getElementById("history-module")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const check = () => {
    if (selected === null || checked) return;
    if (selected === question.answer) setScore((value) => value + 1);
    setChecked(true);
  };

  const next = () => {
    if (!checked) return;
    if (quizIndex === quizQuestions.length - 1) {
      setFinished(true);
      return;
    }
    setQuizIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  };

  const restart = () => {
    setQuizIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="page history-page">
      <button className="back-button" onClick={onBack}>← Voltar para trimestres</button>

      <section className="history-hero">
        <div>
          <span className="eyebrow light">HISTÓRIA · SOMATIVA · MATERIAL SAS OFICIAL</span>
          <h1>Brasil colonial,<br /><em>sem simplificar as pessoas.</em></h1>
          <p>Uma revisão para entender diversidade, poder, violência, resistência e permanências — sempre conectando causa, processo e consequência.</p>
          <div className="history-hero-meta"><span>4 capítulos</span><span>50 páginas conferidas</span><span>12 questões comentadas</span></div>
        </div>
        <div className="history-hero-art" aria-hidden="true">
          <i className="hist-sun" /><i className="hist-land" /><i className="hist-river" />
          <b className="hist-date one">1500</b><b className="hist-date two">1549</b><b className="hist-date three">séc. XVII</b>
          <span className="hist-route">→ → →</span>
        </div>
      </section>

      <section className="history-source-note">
        <span>✓</span><div><strong>Revisão conferida página por página no livro oficial do SAS</strong><p>Cap. 9: 173–181 · Cap. 10: 191–203 · Cap. 11: 215–229 · Cap. 12: 234–247</p></div>
      </section>

      <section className="history-overview">
        <div className="section-heading"><div><span className="eyebrow coral">ROTA DE ESTUDO</span><h2>Escolha um capítulo</h2></div><p>Leia o módulo, explique em voz alta e finalize com o quiz comentado.</p></div>
        <div className="history-module-nav">
          {modules.map((module) => <button key={module.id} className={active === module.id ? "active" : ""} onClick={() => chooseModule(module.id)}><span>{module.number}</span><i aria-hidden="true">{module.icon}</i><small>{module.chapter}</small><strong>{module.title}</strong><em>{module.subtitle}</em><b>Estudar →</b></button>)}
        </div>
      </section>

      <section id="history-module" className={`history-module-panel hist-${active}`}>
        <header className="history-module-header"><div><span className="eyebrow light">MÓDULO {current.number} · {current.chapter}</span><h2>{current.title}</h2><p>{current.subtitle}</p></div><button onClick={() => onGenerateFlashcards(current.deck)}>✦ Flashcards deste capítulo</button></header>
        <HistoryInfographic src={current.infographic} title={current.title} />
        {active === "indigenous" && <IndigenousModule />}
        {active === "colonization" && <ColonizationModule />}
        {active === "enslavement" && <EnslavementModule />}
        {active === "sugar" && <SugarModule />}
        <footer className="history-module-footer"><div><small>LEMBRETE</small><strong>Uma boa resposta histórica relaciona evidência + contexto + consequência.</strong></div><button onClick={() => onGenerateFlashcards(current.deck)}>Revisar com flashcards →</button></footer>
      </section>

      <section className="history-quiz">
        <header><div><span className="eyebrow coral">QUIZ COM CORREÇÃO</span><h2>Teste se você conectou as ideias</h2></div><div className="history-quiz-progress"><span>{finished ? "fim" : `${quizIndex + 1}/${quizQuestions.length}`}</span><i><b style={{ width: `${finished ? 100 : progress}%` }} /></i></div></header>
        {finished ? <div className="history-quiz-result"><span>{score}/{quizQuestions.length}</span><h3>{score >= 10 ? "Mandou muito bem!" : score >= 7 ? "Boa base — revise os detalhes." : "Volte aos módulos e tente novamente."}</h3><p>O objetivo não é decorar datas soltas, mas explicar relações históricas.</p><button onClick={restart}>Refazer quiz</button></div> : <div className="history-question"><small>QUESTÃO {quizIndex + 1}</small><h3>{question.question}</h3><div>{question.options.map((option, index) => <button key={option} className={`${selected === index ? "selected" : ""} ${checked && index === question.answer ? "correct" : ""} ${checked && selected === index && index !== question.answer ? "wrong" : ""}`} disabled={checked} onClick={() => setSelected(index)}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span></button>)}</div>{checked && <aside className={selected === question.answer ? "correct" : "wrong"}><strong>{selected === question.answer ? "✓ Acertou" : "↗ Ajuste o raciocínio"}</strong><p>{question.explanation}</p></aside>}<footer><button disabled={selected === null || checked} onClick={check}>Conferir resposta</button><button disabled={!checked} onClick={next}>{quizIndex === quizQuestions.length - 1 ? "Ver resultado" : "Próxima questão →"}</button></footer></div>}
      </section>
    </div>
  );
}

function HistoryInfographic({ src, title }: { src: string; title: string }) {
  return <figure className="history-infographic">
    <a href={src} target="_blank" rel="noreferrer" aria-label={`Abrir infográfico de ${title} em tamanho completo`}>
      {/* Static WebP keeps these study sheets available offline in the PWA. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`Infográfico de revisão: ${title}`} loading="lazy" />
    </a>
    <figcaption><div><small>REVISÃO VISUAL</small><strong>Abra a imagem para estudar em tamanho completo</strong></div><a href={src} target="_blank" rel="noreferrer">Ampliar infográfico ↗</a></figcaption>
  </figure>;
}

function IndigenousModule() {
  return <div className="history-module-body">
    <section className="history-big-idea"><span>DIVERSIDADE</span><p>“Povos indígenas” nomeia centenas de sociedades com línguas, histórias e modos de vida próprios.</p><b>≠</b><span>UM ÚNICO POVO</span></section>
    <section className="history-two-columns">
      <article className="history-card"><header><span>①</span><div><small>FAMÍLIAS LINGUÍSTICAS</small><h3>Tupi e Macro-Jê</h3></div></header><p><strong>Tupi:</strong> numerosos no litoral no século XVI; aldeias, agricultura, pesca, caça, guerra e divisão de tarefas por gênero. A busca da <em>Terra sem Mal</em> tinha dimensão espiritual e também influenciava deslocamentos.</p><p><strong>Macro-Jê:</strong> predominavam em áreas do interior. O SAS detalha Xokleng e Kaingang no Sul, com formas próprias de organização, subsistência, rituais e relação com o território.</p></article>
      <article className="history-card hist-language-card"><header><span>②</span><div><small>PALAVRAS TÊM HISTÓRIA</small><h3>“Índio” apaga diferenças</h3></div></header><p>Daniel Munduruku explica que um nome aparentemente neutro pode carregar uma visão colonial. Prefira <strong>indígena</strong> ou, melhor ainda, o nome do povo: Munduruku, Kuikuro, Yanomami, Kaingang…</p><div className="history-formula">nome correto → identidade → respeito à diversidade</div></article>
    </section>
    <section className="history-card"><header><span>③</span><div><small>ADAPTAÇÕES E ORGANIZAÇÃO</small><h3>Xokleng e Kaingang</h3></div></header><div className="history-feature-grid"><p><b>Botocudos</b><span>Nome dado pelos portugueses por causa do botoque; não era o nome usado pelo próprio povo.</span></p><p><b>Mobilidade sazonal</b><span>Deslocamentos entre áreas e atividades conforme as estações e os recursos.</span></p><p><b>Casas subterrâneas</b><span>Moradias parcialmente escavadas, adaptadas ao frio, à chuva e ao vento.</span></p><p><b>Clãs</b><span>Entre os Kaingang, Kamé e Kairu estruturavam casamento e pertencimento social.</span></p></div></section>
    <section className="history-two-columns">
      <article className="history-card"><header><span>④</span><div><small>ALTO XINGU</small><h3>Povos arauaques</h3></div></header><ul><li>Maiapures chegaram por volta de 800–900 d.C.</li><li>Aldeias fortificadas ligadas por estradas.</li><li>Agricultura produtiva, chefias hereditárias, mas não rígidas.</li><li>Casamentos e alianças fortaleciam relações entre povos.</li><li>Cerâmica, desenhos e rituais expressavam identidades.</li></ul></article>
      <article className="history-card hist-legacy-card"><header><span>⑤</span><div><small>PERMANÊNCIAS</small><h3>Influência indígena</h3></div></header><div className="history-chip-list"><span>mandioca</span><span>milho</span><span>peixes</span><span>maracá</span><span>flauta</span><span>reco-reco</span><span>plantas medicinais</span><span>conhecimento ambiental</span></div><p>O Parque Indígena do Xingu protege território e ajuda diferentes povos a manter línguas, rituais e modos de vida.</p></article>
    </section>
    <aside className="history-source-tip"><span>!</span><div><small>LEITURA DE FONTE</small><p>Não aceite automaticamente o nome ou a descrição dada pelo colonizador. Pergunte: <b>quem produziu a fonte, em qual contexto e com qual visão?</b></p></div></aside>
  </div>;
}

function ColonizationModule() {
  return <div className="history-module-body">
    <section className="history-cause-chain"><span>exploração do pau-brasil</span><b>→</b><span>estrangeiros no litoral</span><b>→</b><span>necessidade de defender</span><b>→</b><span>povoamento</span></section>
    <section className="history-card"><header><span>①</span><div><small>DO EXTRATIVISMO À OCUPAÇÃO</small><h3>Por que colonizar?</h3></div></header><p>Feitorias e patrulhas não bastavam para controlar uma costa extensa. Franceses, neerlandeses e ingleses também buscavam pau-brasil. Portugal passou a ocupar o território, distribuir terras e estimular produção permanente. A expedição de Martim Afonso de Sousa fundou <strong>São Vicente, em 1532</strong>.</p></section>
    <section className="history-admin-grid"><article><small>1534</small><h3>Capitanias hereditárias</h3><p>Faixas entregues a donatários, responsáveis por povoar, defender, distribuir sesmarias, cobrar tributos e criar vilas.</p><b>Problemas: custos, distância, falta de recursos e resistência indígena.</b></article><article><small>1548–1549</small><h3>Governo-Geral</h3><p>Centralizou a administração sem extinguir imediatamente as capitanias. Tomé de Sousa chegou em 1549 e Salvador tornou-se capital.</p><b>Objetivos: defesa, justiça, impostos, alianças e engenhos.</b></article><article><small>1555 / 1612</small><h3>Colônias francesas</h3><p>França Antártica na Guanabara e França Equinocial no Maranhão mostram que a disputa pelo território continuou.</p><b>Portugueses combinaram guerra e alianças indígenas.</b></article></section>
    <section className="history-two-columns">
      <article className="history-card hist-resistance-card"><header><span>②</span><div><small>AGÊNCIA INDÍGENA</small><h3>Resistência e alianças</h3></div></header><p>Os povos indígenas não foram espectadores passivos. Houve fugas, guerras, alianças e confederações, como a dos <strong>Tamoios</strong> e a dos <strong>Cariris</strong>. Doenças europeias também causaram enorme mortalidade.</p><div className="history-formula">interesses distintos → alianças variáveis → conflitos prolongados</div></article>
      <article className="history-card"><header><span>③</span><div><small>JESUÍTAS</small><h3>Catequização e aldeamentos</h3></div></header><p>A Companhia de Jesus chegou com o Governo-Geral. Aprendeu línguas, criou escolas e reuniu indígenas em missões, aldeamentos ou reduções.</p><ul><li><b>Nóbrega e Anchieta:</b> uso do tupi e formação do nheengatu.</li><li><b>Contradição:</b> proteção contra colonos, mas imposição religiosa e cultural.</li><li><b>Impactos:</b> epidemias, sedentarização e abandono forçado de costumes.</li></ul></article>
    </section>
    <section className="history-card hist-mission-map"><div><small>MISSÃO JESUÍTICA</small><h3>Rotina organizada para converter e controlar</h3><p>Praça e cruz ao centro, igreja, escola, oficinas, roças e moradias. Trabalho, oração e ensino seguiam horários definidos.</p></div><div className="mission-plan" aria-hidden="true"><b>igreja</b><span>praça</span><i>roças</i><i>oficinas</i><i>casas</i><i>escola</i></div></section>
    <aside className="history-source-tip"><span>?</span><div><small>PERGUNTA DE PROVA</small><p>Ao avaliar as missões, evite “boas” ou “ruins” sem explicar. Mostre a tensão entre <b>proteção, catequização, controle e transformação cultural</b>.</p></div></aside>
  </div>;
}

function EnslavementModule() {
  return <div className="history-module-body">
    <section className="history-source-note inner"><span>◆</span><div><strong>Pessoas foram escravizadas; não nasceram “escravas”</strong><p>A linguagem evidencia que a escravidão foi um sistema imposto por violência.</p></div></section>
    <section className="history-card"><header><span>①</span><div><small>TRÁFICO ATLÂNTICO</small><h3>Uma atividade conectada a três continentes</h3></div></header><div className="history-atlantic"><article><b>África</b><p>Captura, guerras, desorganização de sociedades e perda de milhões de pessoas.</p></article><i>→</i><article><b>América</b><p>Trabalho forçado sustentou agricultura, mineração, cidades e acumulação colonial.</p></article><i>→</i><article><b>Europa</b><p>Comerciantes, portos e Estados lucraram com o tráfico e produtos coloniais.</p></article></div><p>Nos navios negreiros, superlotação, fome, doenças e violência provocavam alta mortalidade. No desembarque, leilões separavam famílias e rompiam vínculos.</p></section>
    <section className="history-work-grid"><article><span>RURAL</span><h3>Engenhos e fazendas</h3><p>Plantio, corte e transporte da cana, máquinas do engenho, produção de açúcar, criação e serviços domésticos.</p><b>Senzalas, vigilância de feitores, jornadas extensas e castigos.</b></article><article><span>MINAS</span><h3>Ouro e pedras</h3><p>Escavações, tanques, represas e garimpo nos rios, muitas vezes com o corpo dentro d’água.</p><b>Exaustão, acidentes e doenças respiratórias.</b></article><article><span>CIDADES</span><h3>Ofícios e ganho</h3><p>Carregadores, pedreiros, carpinteiros, barbeiros, vendedores e outros serviços.</p><b>Maior circulação, mas permanência de controle, punições e violência.</b></article></section>
    <section className="history-two-columns"><article className="history-card hist-resistance-card"><header><span>②</span><div><small>RESISTÊNCIA</small><h3>Viver também era resistir</h3></div></header><ul><li>Fugas, revoltas e sabotagens.</li><li>Preservação de línguas, religiosidades e tradições.</li><li>Formação de redes familiares e comunitárias.</li><li>Negociação, compra de alforria e mobilidade dos escravizados de ganho.</li></ul></article><article className="history-card hist-legacy-card"><header><span>③</span><div><small>HERANÇAS AFRICANAS</small><h3>Saberes recriados no Brasil</h3></div></header><div className="history-chip-list"><span>capoeira</span><span>candomblé</span><span>umbanda</span><span>música</span><span>dança</span><span>taipa</span><span>culinária</span><span>festividades</span></div><p>O candomblé tem raízes africanas e culto aos orixás; a umbanda surgiu no Brasil, combinando matrizes africanas, indígenas, católicas e espíritas.</p></article></section>
    <aside className="history-source-tip"><span>▣</span><div><small>IMAGENS E ANÚNCIOS</small><p>Gravuras de navios, mercados e cidades foram feitas por observadores de seu tempo. Compare o que mostram, o que silenciam e qual posição do autor aparece.</p></div></aside>
  </div>;
}

function SugarModule() {
  return <div className="history-module-body">
    <section className="history-plantation"><div><b>LATIFÚNDIO</b><span>grande propriedade</span></div><i>＋</i><div><b>MONOCULTURA</b><span>cana-de-açúcar</span></div><i>＋</i><div><b>TRABALHO ESCRAVIZADO</b><span>base da produção</span></div><i>＋</i><div><b>EXPORTAÇÃO</b><span>mercado externo</span></div></section>
    <section className="history-two-columns"><article className="history-card"><header><span>①</span><div><small>SOCIEDADE COLONIAL</small><h3>Casa-grande e poder</h3></div></header><p>O senhor de engenho controlava propriedade, produção e redes políticas. A casa-grande simbolizava uma sociedade <strong>patriarcal</strong>, hierarquizada e baseada na exploração. Abaixo dela, trabalhadores escravizados viviam em senzalas precárias.</p></article><article className="history-card"><header><span>②</span><div><small>O QUE ERA “ENGENHO”?</small><h3>Máquina + fazenda + comunidade</h3></div></header><p>O termo podia indicar a moenda, mas passou a nomear todo o conjunto: canaviais, casa-grande, senzala, capela, pomar, oficinas, animais e instalações de produção.</p></article></section>
    <section className="history-card"><header><span>③</span><div><small>ENGENHO EM AÇÃO</small><h3>Da cana ao açúcar</h3></div></header><div className="history-sugar-flow"><article><b>1</b><strong>Plantar e colher</strong><p>A cana crescia por cerca de 18 meses e era cortada na estiagem.</p></article><article><b>2</b><strong>Moer</strong><p>Moendas animais ou hidráulicas extraíam o caldo.</p></article><article><b>3</b><strong>Ferver e limpar</strong><p>O caldo era fervido, clarificado e concentrado em melaço.</p></article><article><b>4</b><strong>Moldar e purgar</strong><p>Formas cônicas retiravam impurezas; surgiam açúcar branco e mascavado.</p></article><article><b>5</b><strong>Embalar e exportar</strong><p>Pães ou caixas seguiam em carros de boi aos portos e à Europa.</p></article></div></section>
    <section className="history-two-columns"><article className="history-card"><header><span>④</span><div><small>MÃO DE OBRA</small><h3>Muitos saberes, enorme violência</h3></div></header><p>Ferreiros, carpinteiros, mestres de açúcar, tanoeiros e pedreiros dominavam técnicas especializadas. Havia trabalhadores livres, mas a maioria era escravizada. Nas caldeiras, temperaturas elevadas e jornadas de até 18–20 horas provocavam acidentes e mortes.</p></article><article className="history-card hist-cattle-card"><header><span>⑤</span><div><small>PECUÁRIA</small><h3>Do litoral para o interior</h3></div></header><p>O gado movia moendas, transportava mercadorias e fornecia carne, couro e sebo. Como ocupava muito espaço, avançou para o interior e ajudou a formar rotas e povoações. Vaqueiros podiam receber parte do rebanho após alguns anos — a <strong>quarta</strong>.</p></article></section>
    <section className="history-card hist-beckman-card"><header><span>⑥</span><div><small>MARANHÃO · 1684</small><h3>Revolta de Beckman</h3></div></header><div className="history-cause-chain compact"><span>monopólio da Companhia</span><b>＋</b><span>preços e abastecimento</span><b>＋</b><span>mão de obra insuficiente</span><b>→</b><span>revolta</span></div><p>Senhores de engenho depuseram autoridades e prenderam jesuítas. A Coroa reprimiu o movimento, executou líderes e extinguiu a Companhia, mas manteve o controle colonial.</p></section>
    <aside className="history-source-tip"><span>→</span><div><small>RESPOSTA FORTE</small><p>Explique a cadeia: <b>açúcar exige terra e trabalho → organiza o engenho e a sociedade → estimula pecuária e interiorização → produz conflitos econômicos e sociais</b>.</p></div></aside>
  </div>;
}
