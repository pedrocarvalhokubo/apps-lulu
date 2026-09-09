"use client";

import { useMemo, useState } from "react";
import { flashcardSources, type Flashcard } from "./flashcard-data";

export type FlashcardDeck = {
  id: string;
  title: string;
  subject: string;
  topic: string;
  source: "generated" | "manual";
  createdAt: number;
  cards: Flashcard[];
  stats?: { best: number; last: number; attempts: number };
};

type Props = {
  decks: FlashcardDeck[];
  initialSourceId?: string;
  onBack: () => void;
  onChange: (decks: FlashcardDeck[]) => void;
};

type HubMode = "library" | "generate" | "manual" | "study";

function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

const blankCard = (index: number): Flashcard => ({ id: `draft-${Date.now()}-${index}`, front: "", back: "" });

function newDeckIdentity() {
  const createdAt = Date.now();
  return { createdAt, id: `deck-${createdAt}-${Math.random().toString(36).slice(2, 7)}` };
}

export default function FlashcardsHub({ decks, initialSourceId, onBack, onChange }: Props) {
  const defaultSource = initialSourceId && flashcardSources.some((source) => source.id === initialSourceId)
    ? initialSourceId
    : flashcardSources[0].id;
  const [mode, setMode] = useState<HubMode>(initialSourceId ? "generate" : "library");
  const [subjectFilter, setSubjectFilter] = useState("Todos");
  const [selectedSourceId, setSelectedSourceId] = useState(defaultSource);
  const [cardCount, setCardCount] = useState("10");
  const [manualTitle, setManualTitle] = useState("");
  const [manualSubject, setManualSubject] = useState("Matemática");
  const [manualCards, setManualCards] = useState<Flashcard[]>([blankCard(1), blankCard(2)]);
  const [manualError, setManualError] = useState("");
  const [deckToDelete, setDeckToDelete] = useState<FlashcardDeck | null>(null);
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [studyQueue, setStudyQueue] = useState<Flashcard[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [againIds, setAgainIds] = useState<string[]>([]);
  const [roundComplete, setRoundComplete] = useState(false);

  const selectedSource = flashcardSources.find((source) => source.id === selectedSourceId) ?? flashcardSources[0];
  const activeDeck = decks.find((deck) => deck.id === activeDeckId) ?? null;
  const currentCard = studyQueue[studyIndex];
  const filteredDecks = subjectFilter === "Todos" ? decks : decks.filter((deck) => deck.subject === subjectFilter);
  const subjectCounts = useMemo(() => Object.fromEntries(["English", "Matemática", "Ciências", "Geografia", "História", "Português"].map((subject) => [subject, decks.filter((deck) => deck.subject === subject).length])), [decks]);

  const openLibrary = () => {
    setMode("library");
    setActiveDeckId(null);
    setRoundComplete(false);
    setFlipped(false);
  };

  const generateDeck = () => {
    const limit = cardCount === "all" ? selectedSource.cards.length : Math.min(Number(cardCount), selectedSource.cards.length);
    const identity = newDeckIdentity();
    const deck: FlashcardDeck = {
      id: identity.id,
      title: selectedSource.title,
      subject: selectedSource.subject,
      topic: selectedSource.description,
      source: "generated",
      createdAt: identity.createdAt,
      cards: shuffled(selectedSource.cards).slice(0, limit),
      stats: { best: 0, last: 0, attempts: 0 },
    };
    onChange([deck, ...decks]);
    startStudy(deck, [deck, ...decks]);
  };

  const saveManualDeck = () => {
    const identity = newDeckIdentity();
    const completeCards = manualCards.filter((card) => card.front.trim() && card.back.trim()).map((card, index) => ({
      ...card,
      id: `${identity.id}-card-${index + 1}`,
      front: card.front.trim(),
      back: card.back.trim(),
      hint: card.hint?.trim() || undefined,
    }));
    if (!manualTitle.trim()) {
      setManualError("Dê um nome ao deck.");
      return;
    }
    if (completeCards.length < 2) {
      setManualError("Crie pelo menos dois cartões completos.");
      return;
    }
    const deck: FlashcardDeck = {
      id: identity.id,
      title: manualTitle.trim(),
      subject: manualSubject,
      topic: "Deck criado pela Lulu",
      source: "manual",
      createdAt: identity.createdAt,
      cards: completeCards,
      stats: { best: 0, last: 0, attempts: 0 },
    };
    onChange([deck, ...decks]);
    setManualTitle("");
    setManualCards([blankCard(1), blankCard(2)]);
    setManualError("");
    startStudy(deck, [deck, ...decks]);
  };

  const updateManualCard = (id: string, field: "front" | "back" | "hint", value: string) => {
    setManualCards((current) => current.map((card) => card.id === id ? { ...card, [field]: value } : card));
  };

  function startStudy(deck: FlashcardDeck, currentDecks = decks, subset?: Flashcard[]) {
    const latestDeck = currentDecks.find((item) => item.id === deck.id) ?? deck;
    setActiveDeckId(latestDeck.id);
    setStudyQueue(shuffled(subset ?? latestDeck.cards));
    setStudyIndex(0);
    setAgainIds([]);
    setFlipped(false);
    setRoundComplete(false);
    setMode("study");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const rateCard = (rating: "again" | "got") => {
    if (!currentCard || !activeDeck) return;
    const nextAgain = rating === "again" ? [...againIds, currentCard.id] : againIds;
    if (studyIndex < studyQueue.length - 1) {
      setAgainIds(nextAgain);
      setStudyIndex((index) => index + 1);
      setFlipped(false);
      return;
    }
    const score = Math.round(((studyQueue.length - nextAgain.length) / studyQueue.length) * 100);
    onChange(decks.map((deck) => deck.id === activeDeck.id ? {
      ...deck,
      stats: {
        best: Math.max(deck.stats?.best ?? 0, score),
        last: score,
        attempts: (deck.stats?.attempts ?? 0) + 1,
      },
    } : deck));
    setAgainIds(nextAgain);
    setRoundComplete(true);
    setFlipped(false);
  };

  const reviewDifficult = () => {
    if (!activeDeck) return;
    const difficult = activeDeck.cards.filter((card) => againIds.includes(card.id));
    startStudy(activeDeck, decks, difficult);
  };

  const confirmDelete = () => {
    if (!deckToDelete) return;
    onChange(decks.filter((deck) => deck.id !== deckToDelete.id));
    setDeckToDelete(null);
  };

  if (mode === "study" && activeDeck && currentCard) {
    const learned = studyQueue.length - againIds.length;
    return (
      <div className="page flashcards-page study-session-page">
        <button className="back-button" onClick={openLibrary}>← Voltar aos meus decks</button>
        <section className="flash-study-header">
          <div><span>{activeDeck.subject}</span><h1>{activeDeck.title}</h1><p>{roundComplete ? "Rodada concluída" : `Cartão ${studyIndex + 1} de ${studyQueue.length}`}</p></div>
          <div className="flash-study-progress"><strong>{roundComplete ? 100 : Math.round(((studyIndex + 1) / studyQueue.length) * 100)}%</strong><i><b style={{ width: `${roundComplete ? 100 : ((studyIndex + 1) / studyQueue.length) * 100}%` }} /></i></div>
        </section>

        {roundComplete ? (
          <section className="flash-round-result">
            <span className="round-result-mark">{againIds.length ? "↻" : "✓"}</span>
            <small>RODADA CONCLUÍDA</small>
            <h2>{againIds.length ? "Boa! Agora revise só o que ficou difícil." : "Você acertou todos os cartões."}</h2>
            <p><strong>{learned}</strong> lembrados · <strong>{againIds.length}</strong> para rever</p>
            <div>{againIds.length > 0 && <button className="primary-button" onClick={reviewDifficult}>Revisar {againIds.length} difíceis</button>}<button className="secondary-button" onClick={openLibrary}>Voltar aos decks</button></div>
          </section>
        ) : (
          <>
            <button className={flipped ? "study-flashcard flipped" : "study-flashcard"} onClick={() => setFlipped((current) => !current)} aria-label={flipped ? "Mostrar pergunta" : "Mostrar resposta"}>
              <span className="flashcard-face front">
                <small>PERGUNTA</small><strong>{currentCard.front}</strong>{currentCard.hint && <em>{currentCard.hint}</em>}<b>Toque para virar ↻</b>
              </span>
              <span className="flashcard-face back">
                <small>RESPOSTA</small><strong>{currentCard.back}</strong><b>Toque para ver a pergunta ↻</b>
              </span>
            </button>
            <div className={flipped ? "flash-rating visible" : "flash-rating"} aria-hidden={!flipped}>
              <button disabled={!flipped} onClick={() => rateCard("again")}><span>↻</span><strong>Preciso rever</strong><small>Vai aparecer novamente</small></button>
              <button disabled={!flipped} onClick={() => rateCard("got")}><span>✓</span><strong>Acertei</strong><small>Continuar para o próximo</small></button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="page flashcards-page">
      <button className="back-button" onClick={onBack}>← Voltar para matérias</button>
      <section className="flashcards-hero">
        <div><span className="eyebrow light">ACTIVE RECALL · LULU.STUDY</span><h1>Flashcards</h1><p>Crie seus próprios decks ou transforme o conteúdo da prova em perguntas rápidas para lembrar de verdade.</p></div>
        <div className="flash-hero-stack" aria-hidden="true"><i>Q</i><i>A</i><i>✓</i></div>
      </section>

      <nav className="flash-hub-tabs" aria-label="Opções de flashcards">
        <button className={mode === "library" ? "active" : ""} onClick={() => setMode("library")}>Meus decks <span>{decks.length}</span></button>
        <button className={mode === "generate" ? "active" : ""} onClick={() => setMode("generate")}>✦ Gerar do conteúdo</button>
        <button className={mode === "manual" ? "active" : ""} onClick={() => setMode("manual")}>＋ Criar manualmente</button>
      </nav>

      {mode === "library" && (
        <section className="flash-library">
          <div className="flash-library-heading"><div><span className="eyebrow teal">MINHA BIBLIOTECA</span><h2>Decks da Lulu</h2></div><div className="flash-subject-filter">{["Todos", "English", "Matemática", "Ciências", "Geografia", "História", "Português"].map((item) => <button className={subjectFilter === item ? "active" : ""} key={item} onClick={() => setSubjectFilter(item)}>{item}{item !== "Todos" && <span>{subjectCounts[item]}</span>}</button>)}</div></div>
          {filteredDecks.length ? <div className="deck-grid">{filteredDecks.map((deck) => (
            <article className={`deck-card deck-${deck.subject.toLowerCase().replace("á", "a").replace("ê", "e")}`} key={deck.id}>
              <header><span>{deck.subject}</span><button onClick={() => setDeckToDelete(deck)} aria-label={`Excluir deck ${deck.title}`}>•••</button></header>
              <div className="deck-card-stack" aria-hidden="true"><i /><i /><b>{deck.cards.length}</b></div>
              <small>{deck.source === "generated" ? "GERADO DO CONTEÚDO" : "CRIADO PELA LULU"}</small><h3>{deck.title}</h3><p>{deck.topic}</p>
              <div className="deck-stats"><span>{deck.cards.length} cartões</span>{deck.stats?.attempts ? <span>Melhor: <b>{deck.stats.best}%</b></span> : <span>Novo</span>}</div>
              <button className="deck-study-button" onClick={() => startStudy(deck)}>Estudar agora <span>→</span></button>
            </article>
          ))}</div> : <div className="empty-deck-library"><span>◇</span><h3>Nenhum deck aqui ainda.</h3><p>Gere um deck do conteúdo da prova ou crie seus próprios cartões.</p><button className="primary-button" onClick={() => setMode("generate")}>Gerar primeiro deck</button></div>}
        </section>
      )}

      {mode === "generate" && (
        <section className="flash-generator">
          <div className="generator-intro"><span className="eyebrow coral">GERAÇÃO GUIADA</span><h2>Escolha o conteúdo</h2><p>Os cartões usam os mesmos conceitos e explicações já revisados no app.</p></div>
          <div className="source-picker">
            {(["English", "Matemática", "Ciências", "Geografia", "História", "Português"] as const).map((subject) => (
              <section key={subject}><header><span>{subject === "English" ? "Aa" : subject === "Matemática" ? "x²" : subject === "Ciências" ? "⌁" : subject === "Geografia" ? "⌖" : subject === "História" ? "⌛" : "✎"}</span><h3>{subject}</h3></header>{flashcardSources.filter((source) => source.subject === subject).map((source) => <button className={selectedSource.id === source.id ? "active" : ""} key={source.id} onClick={() => setSelectedSourceId(source.id)}><span><strong>{source.title}</strong><small>{source.description}</small></span><b>{source.cards.length}</b></button>)}</section>
            ))}
          </div>
          <aside className="generator-summary"><div><small>DECK SELECIONADO</small><h3>{selectedSource.title}</h3><p>{selectedSource.description}</p></div><label>Quantidade<select value={cardCount} onChange={(event) => setCardCount(event.target.value)}><option value="10">10 cartões</option><option value="15">15 cartões</option><option value="all">Todos ({selectedSource.cards.length})</option></select></label><button className="primary-button large" onClick={generateDeck}>✦ Gerar e estudar</button></aside>
        </section>
      )}

      {mode === "manual" && (
        <section className="manual-deck-builder">
          <div className="generator-intro"><span className="eyebrow coral">DECK DA LULU</span><h2>Crie seus próprios cartões</h2><p>Escreva a pergunta na frente e a resposta no verso. Uma pista é opcional.</p></div>
          <div className="manual-deck-meta"><label>Nome do deck<input value={manualTitle} onChange={(event) => setManualTitle(event.target.value)} placeholder="Ex.: Palavras difíceis de English" /></label><label>Matéria<select value={manualSubject} onChange={(event) => setManualSubject(event.target.value)}><option>English</option><option>Matemática</option><option>Ciências</option><option>Português</option><option>História</option><option>Geografia</option><option>Outra</option></select></label></div>
          <div className="manual-card-list">{manualCards.map((card, index) => <article key={card.id}><header><span>CARTÃO {String(index + 1).padStart(2, "0")}</span>{manualCards.length > 2 && <button onClick={() => setManualCards((current) => current.filter((item) => item.id !== card.id))}>Remover</button>}</header><label>Frente<textarea value={card.front} onChange={(event) => updateManualCard(card.id, "front", event.target.value)} placeholder="Digite a pergunta ou termo" /></label><label>Verso<textarea value={card.back} onChange={(event) => updateManualCard(card.id, "back", event.target.value)} placeholder="Digite a resposta ou explicação" /></label><label className="hint-field">Pista opcional<input value={card.hint ?? ""} onChange={(event) => updateManualCard(card.id, "hint", event.target.value)} placeholder="Uma dica curta, sem entregar a resposta" /></label></article>)}</div>
          <div className="manual-builder-actions"><button className="secondary-button" onClick={() => setManualCards((current) => [...current, blankCard(current.length + 1)])}>＋ Adicionar cartão</button><div>{manualError && <p role="alert">{manualError}</p>}<button className="primary-button large" onClick={saveManualDeck}>Salvar e estudar</button></div></div>
        </section>
      )}

      {deckToDelete && <div className="deck-delete-backdrop" onClick={() => setDeckToDelete(null)}><section onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Excluir deck"><span>!</span><h2>Excluir “{deckToDelete.title}”?</h2><p>Os cartões e o progresso deste deck serão apagados deste aparelho.</p><div><button className="secondary-button" onClick={() => setDeckToDelete(null)}>Cancelar</button><button className="danger-button" onClick={confirmDelete}>Excluir deck</button></div></section></div>}
    </div>
  );
}
