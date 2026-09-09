"use client";

import { useEffect, useState } from "react";
import FlashcardsHub, { type FlashcardDeck } from "./FlashcardsHub";
import GeographyReview from "./GeographyReview";
import HistoryReview from "./HistoryReview";
import PortugueseReview from "./PortugueseReview";
import PortugueseCycle5 from "./PortugueseCycle5";
import ScienceReview from "./ScienceReview";
import { asset } from "./asset";
import { mockExams, quizQuestions, type MockExam, type QuizQuestion } from "./quiz-data";
import { mathMockExams, mathQuizQuestions } from "./math-quiz-data";
import { chapter9StoryModels, equationBalanceSteps, mathLearningObjectives, mathStudyTabs, sentenceKinds, storyQuestionRoute, substitutionModels, substitutionSteps, twoVariableRules } from "./math-study-data";
import {
  evidenceChain,
  figurativeLanguage,
  keyTerms,
  learningObjectives,
  mainIdeas,
  passage,
} from "./study-data";

type View = "subjects" | "agenda" | "flashcards" | "trimesters" | "term" | "study" | "exam-intro" | "exam" | "results" | "science-trimesters" | "science-term" | "geography-trimesters" | "geography-term" | "history-trimesters" | "history-term" | "portuguese-trimesters" | "portuguese-term" | "portuguese-cycle5";
type Subject = "english" | "math";
type StudyTab = "text" | "vocabulary" | "ideas" | "skills" | "negative" | "parentheses" | "order" | "equations" | "strategy";
type ExamStat = { best: number; attempts: number };
type ExamStats = Record<string, ExamStat>;
type ExamAnswer = { questionId: number; selected: string; correct: boolean };
type SavedState = {
  masteredTerms: number[];
  completedStudy: StudyTab[];
  examStats: ExamStats;
  customExams?: CustomExam[];
  flashcardDecks?: FlashcardDeck[];
};

type CustomExam = { id: string; date: string; subject: string; title: string };

const upcomingSchoolEvents: Array<{ date: string; day: string; title: string; detail: string; kind: string }> = [];

const mathInfographics = [
  { number: "01", title: "Sentenças e identidades", description: "Expressão, sentença aberta, sentença fechada e identidade.", image: asset("math/06-sentencas-identidades.svg") },
  { number: "02", title: "A balança da igualdade", description: "O caminho seguro para isolar a incógnita e conferir.", image: asset("math/07-balanca-equacao.svg") },
  { number: "03", title: "Decifrando historinhas", description: "Cinco perguntas para transformar texto em equação.", image: asset("math/08-historinhas-equacao.svg") },
  { number: "04", title: "Sistemas por substituição", description: "Isole, substitua, resolva e volte para descobrir a outra incógnita.", image: asset("math/09-sistemas-substituicao.svg") },
] as const;

const STORAGE_KEY = "lulu-study-tests-v3";
const englishStudyTabs: { id: StudyTab; title: string; description: string; detail: string }[] = [
  { id: "text", title: "The complete text", description: "Read Harnessing the Storm with paragraph-by-paragraph guidance.", detail: "6 paragraphs" },
  { id: "vocabulary", title: "Key vocabulary", description: "Review the 20 terms and their context-based definitions.", detail: "20 terms" },
  { id: "ideas", title: "Main ideas & evidence", description: "Connect the events, themes, metaphors, and strongest text evidence.", detail: "5 main ideas" },
  { id: "skills", title: "What the test asks", description: "Learn how to justify, analyze, argue, and synthesize.", detail: "5 objectives" },
];

function emptyStats(): ExamStats {
  return Object.fromEntries([...mockExams, ...mathMockExams].map((exam) => [exam.id, { best: 0, attempts: 0 }]));
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

export default function Home() {
  const [subject, setSubject] = useState<Subject>("english");
  const [view, setView] = useState<View>("subjects");
  const [studyTab, setStudyTab] = useState<StudyTab>("text");
  const [masteredTerms, setMasteredTerms] = useState<number[]>([]);
  const [completedStudy, setCompletedStudy] = useState<StudyTab[]>([]);
  const [revealedTerm, setRevealedTerm] = useState<number | null>(null);
  const [examStats, setExamStats] = useState<ExamStats>(emptyStats);
  const [examId, setExamId] = useState<string>(mockExams[0].id);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [resultAnswers, setResultAnswers] = useState<ExamAnswer[]>([]);
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showInstall, setShowInstall] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [customExams, setCustomExams] = useState<CustomExam[]>([]);
  const [flashcardDecks, setFlashcardDecks] = useState<FlashcardDeck[]>([]);
  const [flashcardInitialSource, setFlashcardInitialSource] = useState<string | undefined>();
  const [flashcardHubKey, setFlashcardHubKey] = useState(0);
  const [newExam, setNewExam] = useState({ date: "", subject: "Matemática", title: "" });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem("lulu-english-tests-v2");
        if (saved) {
          const data = JSON.parse(saved) as Partial<SavedState>;
          setMasteredTerms(data.masteredTerms ?? []);
          setCompletedStudy(data.completedStudy ?? []);
          setExamStats({ ...emptyStats(), ...(data.examStats ?? {}) });
          setCustomExams(data.customExams ?? []);
          setFlashcardDecks(data.flashcardDecks ?? []);
        }
      } catch {
        // The app remains fully usable if browser storage is unavailable.
      } finally {
        setStorageReady(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ masteredTerms, completedStudy, examStats, customExams, flashcardDecks }));
    } catch {
      // Visible progress still works during this visit.
    }
  }, [completedStudy, customExams, examStats, flashcardDecks, masteredTerms, storageReady]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches
        || Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
      setIsStandalone(standalone);
    });
    if ("serviceWorker" in navigator) navigator.serviceWorker.register(asset("sw.js")).catch(() => undefined);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const closeModal = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowInstall(false);
        setShowReset(false);
      }
    };
    window.addEventListener("keydown", closeModal);
    return () => window.removeEventListener("keydown", closeModal);
  }, []);

  const activeMockExams = subject === "math" ? mathMockExams : mockExams;
  const activeQuestions = subject === "math" ? mathQuizQuestions : quizQuestions;
  const activeStudyTabs = subject === "math" ? mathStudyTabs : englishStudyTabs;
  const activeExam = activeMockExams.find((exam) => exam.id === examId) ?? activeMockExams[0];
  const questionById = (id: number): QuizQuestion => activeQuestions.find((question) => question.id === id) ?? activeQuestions[0];
  const currentQuestion = questionById(questionOrder[questionIndex] ?? activeExam.questionIds[0]);
  const selectedOptionData = currentQuestion.options.find((option) => option.id === selectedOption);
  const correctOptionData = currentQuestion.options.find((option) => option.id === currentQuestion.correct)!;
  const resultScore = resultAnswers.filter((answer) => answer.correct).length;
  const resultPercent = resultAnswers.length ? Math.round((resultScore / resultAnswers.length) * 100) : 0;
  const attemptedExams = activeMockExams.filter((exam) => (examStats[exam.id]?.attempts ?? 0) > 0).length;
  const relevantStudyIds = activeStudyTabs.map((tab) => tab.id);
  const completedForSubject = completedStudy.filter((tab) => relevantStudyIds.includes(tab)).length;
  const termProgress = Math.round(((completedForSubject + attemptedExams) / (activeStudyTabs.length + activeMockExams.length)) * 100);

  const topicResults = (() => {
    const topics = Array.from(new Set(resultAnswers.map((answer) => questionById(answer.questionId).topic)));
    return topics.map((topic) => {
      const topicAnswers = resultAnswers.filter((answer) => questionById(answer.questionId).topic === topic);
      return { topic, correct: topicAnswers.filter((answer) => answer.correct).length, total: topicAnswers.length };
    });
  })();

  const go = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openStudy = (tab: StudyTab) => {
    setStudyTab(tab);
    go("study");
  };

  const openExam = (exam: MockExam) => {
    setExamId(exam.id);
    go("exam-intro");
  };

  const openSubject = (nextSubject: Subject) => {
    setSubject(nextSubject);
    setStudyTab(nextSubject === "math" ? "negative" : "text");
    setExamId(nextSubject === "math" ? mathMockExams[0].id : mockExams[0].id);
    go("trimesters");
  };

  const openFlashcards = (sourceId?: string) => {
    setFlashcardInitialSource(sourceId);
    setFlashcardHubKey((current) => current + 1);
    go("flashcards");
  };

  const startExam = () => {
    const order = shuffle(activeExam.questionIds).slice(0, activeExam.questionCount);
    setQuestionOrder(order);
    setQuestionIndex(0);
    setSelectedOption(null);
    setAnswerChecked(false);
    setAnswers([]);
    setResultAnswers([]);
    setShowAllExplanations(false);
    go("exam");
  };

  const checkAnswer = () => {
    if (!selectedOption || answerChecked) return;
    setAnswers((current) => [
      ...current,
      {
        questionId: currentQuestion.id,
        selected: selectedOption,
        correct: selectedOption === currentQuestion.correct,
      },
    ]);
    setAnswerChecked(true);
  };

  const continueExam = () => {
    if (!answerChecked) return;
    if (questionIndex < questionOrder.length - 1) {
      setQuestionIndex((index) => index + 1);
      setSelectedOption(null);
      setAnswerChecked(false);
      setShowAllExplanations(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const score = answers.filter((answer) => answer.correct).length;
    setResultAnswers(answers);
    setExamStats((stats) => ({
      ...stats,
      [activeExam.id]: {
        best: Math.max(stats[activeExam.id]?.best ?? 0, score),
        attempts: (stats[activeExam.id]?.attempts ?? 0) + 1,
      },
    }));
    go("results");
  };

  const toggleStudyComplete = () => {
    setCompletedStudy((current) => current.includes(studyTab)
      ? current.filter((item) => item !== studyTab)
      : [...current, studyTab]);
  };

  const resetProgress = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem("lulu-english-tests-v2");
      window.localStorage.removeItem("lulu-study-progress-v1");
    } catch {
      // The on-screen state is still reset.
    }
    setMasteredTerms([]);
    setCompletedStudy([]);
    setExamStats(emptyStats());
    setRevealedTerm(null);
    setAnswers([]);
    setResultAnswers([]);
    setQuestionOrder([]);
    setCustomExams([]);
    setFlashcardDecks([]);
    setShowReset(false);
    go("subjects");
  };

  const addExam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const date = String(form.get("date") ?? "");
    const subjectName = String(form.get("subject") ?? "Matemática");
    const title = String(form.get("title") ?? "").trim();
    if (!date || !title) return;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setCustomExams((current) => [...current, { date, subject: subjectName, title, id }].sort((a, b) => a.date.localeCompare(b.date)));
    setNewExam({ date: "", subject: newExam.subject, title: "" });
  };

  const backLabel = view === "trimesters"
    ? "Subjects"
    : view === "term"
      ? "Trimesters"
      : view === "study" || view === "exam-intro"
        ? (subject === "math" ? "2º Trimestre" : "2nd Trimester")
        : "";

  const backAction = () => {
    if (view === "trimesters") go("subjects");
    else if (view === "term") go("trimesters");
    else if (view === "study" || view === "exam-intro") go("term");
  };

  const isScienceView = view === "science-trimesters" || view === "science-term";
  const isGeographyView = view === "geography-trimesters" || view === "geography-term";
  const isHistoryView = view === "history-trimesters" || view === "history-term";
  const isPortugueseView = view === "portuguese-trimesters" || view === "portuguese-term" || view === "portuguese-cycle5";
  const isFlashcardView = view === "flashcards";

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => go("subjects")} aria-label="Go to subjects">
          <span className="brand-mark">lu</span>
          <span>
            <strong>lulu.study</strong>
            <small>7º ano · espaço pessoal</small>
          </span>
        </button>
        <div className="top-context">
          {view !== "subjects" && <span>{isFlashcardView ? "Flashcards" : isScienceView ? "Ciências" : isGeographyView ? "Geografia" : isHistoryView ? "História" : isPortugueseView ? "Português" : subject === "math" ? "Matemática" : "English"}</span>}
          {(["term", "study", "exam-intro", "exam", "results"].includes(view) || view === "science-term" || view === "geography-term" || view === "history-term" || view === "portuguese-term" || view === "portuguese-cycle5") && <b>{view === "portuguese-cycle5" ? "Cycle Test 5" : subject === "math" ? "Capítulo 9" : isScienceView || isGeographyView || isHistoryView || isPortugueseView ? "2º Trimestre" : "2nd Trimester"}</b>}
        </div>
        <div className="header-actions">
          <button className={isFlashcardView ? "utility-button active flashcards-shortcut" : "utility-button flashcards-shortcut"} onClick={() => openFlashcards()}><span aria-hidden="true">✦</span> Flashcards</button>
          <button className={view === "agenda" ? "utility-button active" : "utility-button"} onClick={() => go("agenda")}><span aria-hidden="true">◷</span> Agenda</button>
          {!isStandalone && <button className="utility-button install" onClick={() => setShowInstall(true)}>No iPhone</button>}
          <button className="utility-button reset-short" onClick={() => setShowReset(true)} aria-label="Reiniciar progresso">↻</button>
        </div>
      </header>

      {view === "subjects" && (
        <div className="page">
          <section className="welcome-panel">
            <div className="hero-copy">
              <span className="hello-pill"><i aria-hidden="true" /> Oi, Lulu</span>
              <h1>Seu espaço para<br /><em>entender de verdade.</em></h1>
              <p>Sem decorar no susto. Estude no seu ritmo, teste o que aprendeu e descubra exatamente onde ajustar.</p>
              <div className="hero-actions"><button onClick={() => openSubject("math")}>Continuar Matemática <span>→</span></button><button onClick={() => openFlashcards()}>Estudar com flashcards</button></div>
            </div>
            <div className="hero-playground" aria-hidden="true">
              <div className="scribble-orbit"><span>✦</span></div>
              <div className="floating-card equation-card"><small>FOCO DE HOJE</small><strong>3(x + 2) = 21</strong><span>x = 5 ✓</span></div>
              <div className="floating-card english-card"><small>ENGLISH</small><strong>resilience</strong><span>keep going, even when it&apos;s hard</span></div>
              <div className="sticker-card">YOU<br />GOT<br />THIS <b>★</b></div>
            </div>
          </section>

          <section className="today-strip">
              <div className="date-bubble"><strong>09</strong><span>MAT</span></div>
            <div><span>FOCO ATUAL</span><strong>Capítulo 9 de Matemática</strong><small>equações · historinhas · sistemas por substituição</small></div>
            <button onClick={() => openSubject("math")}>Começar <span>→</span></button>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div><span className="eyebrow coral">MEU ESPAÇO</span><h2>O que você quer estudar?</h2></div>
              <p>Escolha uma matéria e continue de onde parou.</p>
            </div>
            <div className="subject-list">
              <button className="subject-card active-card" onClick={() => openSubject("english")}>
                <span className="subject-code"><i>EN</i><b aria-hidden="true">Aa</b></span>
                <span><small>READY TO STUDY</small><strong>English</strong><em>Reading · vocabulary · analysis · mock tests</em></span>
                <b>Open <span>→</span></b>
              </button>
              <button className="subject-card active-card math-card" onClick={() => openSubject("math")}>
                <span className="subject-code math-code"><i>MAT</i><b aria-hidden="true">x²</b></span>
                <span><small>CAPÍTULO 9 · ATUALIZADO</small><strong>Matemática</strong><em>Equações · historinhas · sistemas por substituição</em></span>
                <b>Abrir <span>→</span></b>
              </button>
              <button className="subject-card active-card science-card" onClick={() => go("science-trimesters")}>
                <span className="subject-code science-code"><i>SCI</i><b aria-hidden="true">⌁</b></span>
                <span><small>MATERIAL DE ESTUDO · ATUALIZADO</small><strong>Ciências</strong><em>Ecosystems · taxonomy · fossils · microorganisms · plants</em></span>
                <b>Abrir <span>→</span></b>
              </button>
              <button className="subject-card active-card geography-card" onClick={() => go("geography-trimesters")}>
                <span className="subject-code geography-code"><i>GE</i><b aria-hidden="true">⌖</b></span>
                <span><small>GUIA DE ESTUDO · ATUALIZADO</small><strong>Geografia</strong><em>Industrialização · regiões · Nordeste · Sudeste</em></span>
                <b>Abrir <span>→</span></b>
              </button>
              <button className="subject-card active-card history-card-subject" onClick={() => go("history-trimesters")}>
                <span className="subject-code history-code"><i>HI</i><b aria-hidden="true">⌛</b></span>
                <span><small>LIVRO SAS OFICIAL · CONFERIDO</small><strong>História</strong><em>Povos indígenas · colonização · escravização · economia açucareira</em></span>
                <b>Abrir <span>→</span></b>
              </button>
              <button className="subject-card active-card portuguese-card-subject" onClick={() => go("portuguese-trimesters")}>
                <span className="subject-code portuguese-code"><i>PT</i><b aria-hidden="true">✎</b></span>
                <span><small>NOVO · CYCLE TEST 5 · 02/09</small><strong>Português</strong><em>Complemento nominal · adjunto adnominal · interpretação</em></span>
                <b>Abrir <span>→</span></b>
              </button>
            </div>
          </section>
        </div>
      )}

      {view === "flashcards" && (
        <FlashcardsHub
          key={flashcardHubKey}
          decks={flashcardDecks}
          initialSourceId={flashcardInitialSource}
          onBack={() => go("subjects")}
          onChange={setFlashcardDecks}
        />
      )}

      {view === "agenda" && (
        <div className="page agenda-page">
          <button className="back-button" onClick={() => go("subjects")}>← Voltar para matérias</button>
          <section className="page-title compact-title">
            <span className="eyebrow teal">AGENDA PESSOAL</span>
            <h1>Provas e datas importantes</h1>
            <p>Cadastre somente as avaliações que quiser acompanhar neste aparelho.</p>
          </section>
          <div className="agenda-layout">
            <section className="calendar-panel">
              <div className="section-heading"><div><span className="eyebrow coral">SEM DADOS PRÉ-CARREGADOS</span><h2>Calendário pessoal</h2></div><p>A agenda começa vazia para preservar a privacidade.</p></div>
              <div className="event-list">{upcomingSchoolEvents.length ? upcomingSchoolEvents.map((item) => <article key={item.date + item.title}><time dateTime={item.date}>{item.day}</time><div><span>{item.kind}</span><h3>{item.title}</h3><p>{item.detail}</p></div></article>) : <div className="empty-exams"><strong>Nenhum evento cadastrado</strong><span>Use o formulário ao lado para adicionar uma avaliação.</span></div>}</div>
            </section>
            <aside className="exam-planner">
              <span className="eyebrow light">MINHAS PROVAS</span><h2>Adicionar avaliação</h2><p>As datas ficam salvas neste aparelho.</p>
              <form onSubmit={addExam}>
                <label>Data<input name="date" type="date" value={newExam.date} onChange={(event) => setNewExam({ ...newExam, date: event.target.value })} required /></label>
                <label>Matéria<select name="subject" value={newExam.subject} onChange={(event) => setNewExam({ ...newExam, subject: event.target.value })}><option>Matemática</option><option>English</option><option>Português</option><option>Ciências</option><option>História</option><option>Geografia</option><option>Outra</option></select></label>
                <label>Conteúdo ou nome<input name="title" placeholder="Ex.: Equações com x" value={newExam.title} onChange={(event) => setNewExam({ ...newExam, title: event.target.value })} required /></label>
                <button className="primary-button" type="submit">Adicionar prova</button>
              </form>
              <div className="saved-exams">{customExams.length ? customExams.map((exam) => <article key={exam.id}><time>{new Date(exam.date + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</time><div><span>{exam.subject}</span><strong>{exam.title}</strong></div><button aria-label={`Excluir ${exam.title}`} onClick={() => setCustomExams((current) => current.filter((item) => item.id !== exam.id))}>×</button></article>) : <div className="empty-exams"><strong>Nenhuma prova cadastrada</strong><span>Adicione quando souber a próxima data.</span></div>}</div>
            </aside>
          </div>
        </div>
      )}

      {view === "trimesters" && (
        <div className="page">
          <button className="back-button" onClick={backAction}>← Back to {backLabel}</button>
          <section className="page-title compact-title">
            <span className="eyebrow coral">ETAPA 2 · {subject === "math" ? "MATEMÁTICA" : "ENGLISH"}</span>
            <h1>{subject === "math" ? "Escolha o trimestre." : "Choose a trimester."}</h1>
            <p>{subject === "math" ? "Cada trimestre guarda seu conteúdo, progresso e simulados." : "Each trimester keeps its own content, study progress, and mock tests."}</p>
          </section>
          <div className="trimester-grid">
            <div className="trimester-card unavailable">
              <span>1</span><small>1ST TRIMESTER</small><h2>Content not added</h2><p>This space is ready when the material is available.</p>
            </div>
            <button className="trimester-card current" onClick={() => go("term")}>
              <span>9</span><small>CAPÍTULO 9 · ATUALIZADO</small><h2>{subject === "math" ? "Equações e Sistemas" : "Harnessing the Storm"}</h2><p>{subject === "math" ? "Livro SAS · páginas 170 a 197 · sistemas somente por substituição." : "Complete study content and four test formats."}</p><b>{subject === "math" ? "Estudar este capítulo →" : "Study this trimester →"}</b>
            </button>
            <div className="trimester-card unavailable">
              <span>3</span><small>3RD TRIMESTER</small><h2>Not started yet</h2><p>Future school content will be organised here.</p>
            </div>
          </div>
        </div>
      )}

      {view === "science-trimesters" && (
        <div className="page">
          <button className="back-button" onClick={() => go("subjects")}>← Voltar para matérias</button>
          <section className="page-title compact-title">
            <span className="eyebrow coral">ETAPA 2 · CIÊNCIAS</span>
            <h1>Escolha o trimestre.</h1>
            <p>Os conteúdos e materiais de revisão ficam organizados por trimestre.</p>
          </section>
          <div className="trimester-grid">
            <div className="trimester-card unavailable">
              <span>1</span><small>1º TRIMESTRE</small><h2>Conteúdo não adicionado</h2><p>Este espaço fica disponível quando o material atual for enviado.</p>
            </div>
            <button className="trimester-card current science-term-card" onClick={() => go("science-term")}>
              <span>2</span><small>END-OF-TERM · ATUALIZADO</small><h2>Life, Microbes & Plants</h2><p>Ecossistemas, taxonomia, fósseis, microrganismos, saúde e Reino Plantae.</p><b>Abrir revisão →</b>
            </button>
            <div className="trimester-card unavailable">
              <span>3</span><small>3º TRIMESTRE</small><h2>Ainda não iniciado</h2><p>O próximo conteúdo será organizado aqui.</p>
            </div>
          </div>
        </div>
      )}

      {view === "science-term" && (
        <ScienceReview onBack={() => go("science-trimesters")} onGenerateFlashcards={openFlashcards} />
      )}

      {view === "geography-trimesters" && (
        <div className="page">
          <button className="back-button" onClick={() => go("subjects")}>← Voltar para matérias</button>
          <section className="page-title compact-title">
            <span className="eyebrow coral">ETAPA 2 · GEOGRAFIA</span>
            <h1>Escolha o trimestre.</h1>
            <p>Conteúdo em português, organizado a partir do guia de estudo.</p>
          </section>
          <div className="trimester-grid">
            <div className="trimester-card unavailable"><span>1</span><small>1º TRIMESTRE</small><h2>Conteúdo não adicionado</h2><p>Este espaço fica disponível quando o material atual for enviado.</p></div>
            <button className="trimester-card current geography-term-card" onClick={() => go("geography-term")}>
              <span>2</span><small>REVISÃO COMPLETA</small><h2>O Brasil e suas regiões</h2><p>Industrialização, urbanização, regionalizações, Nordeste e Sudeste.</p><b>Abrir revisão →</b>
            </button>
            <div className="trimester-card unavailable"><span>3</span><small>3º TRIMESTRE</small><h2>Ainda não iniciado</h2><p>O próximo conteúdo será organizado aqui.</p></div>
          </div>
        </div>
      )}

      {view === "geography-term" && (
        <GeographyReview onBack={() => go("geography-trimesters")} onGenerateFlashcards={openFlashcards} />
      )}

      {view === "history-trimesters" && (
        <div className="page">
          <button className="back-button" onClick={() => go("subjects")}>← Voltar para matérias</button>
          <section className="page-title compact-title">
            <span className="eyebrow coral">ETAPA 2 · HISTÓRIA</span>
            <h1>Escolha o trimestre.</h1>
            <p>Conteúdo em português, conferido no livro digital oficial do SAS.</p>
          </section>
          <div className="trimester-grid">
            <div className="trimester-card unavailable"><span>1</span><small>1º TRIMESTRE</small><h2>Conteúdo não adicionado</h2><p>Este espaço fica disponível quando o material atual for enviado.</p></div>
            <button className="trimester-card current history-term-card" onClick={() => go("history-term")}>
              <span>2</span><small>SOMATIVA · LIVRO SAS OFICIAL</small><h2>Formação do Brasil Colonial</h2><p>Povos indígenas, colonização, escravização africana e economia açucareira.</p><b>Abrir revisão completa →</b>
            </button>
            <div className="trimester-card unavailable"><span>3</span><small>3º TRIMESTRE</small><h2>Ainda não iniciado</h2><p>O próximo conteúdo será organizado aqui.</p></div>
          </div>
        </div>
      )}

      {view === "history-term" && (
        <HistoryReview onBack={() => go("history-trimesters")} onGenerateFlashcards={openFlashcards} />
      )}

      {view === "portuguese-trimesters" && (
        <div className="page">
          <button className="back-button" onClick={() => go("subjects")}>← Voltar para matérias</button>
          <section className="page-title compact-title"><span className="eyebrow coral">PORTUGUÊS · 7º ANO</span><h1>Escolha a avaliação.</h1><p>Cada trilha reúne matéria explicada, infográficos, quizzes e uma prova simulada.</p></section>
          <div className="trimester-grid">
            <button className="trimester-card current portuguese-term-card" onClick={() => go("portuguese-cycle5")}><span>5</span><small>CYCLE TEST 5 · REVISÃO</small><h2>Complementos e leitura</h2><p>Complemento nominal, adjunto adnominal, textos multimodais e verbos de comando.</p><b>Abrir nova trilha →</b></button>
            <button className="trimester-card current portuguese-term-card secondary-term" onClick={() => go("portuguese-term")}><span>2</span><small>REVISÃO ANTERIOR</small><h2>Gramática e interpretação</h2><p>Predicados, transitividade, colocação pronominal e leitura de textos diversos.</p><b>Rever conteúdo anterior →</b></button>
            <div className="trimester-card unavailable"><span>+</span><small>PRÓXIMA AVALIAÇÃO</small><h2>Aguardando o guia</h2><p>O próximo conteúdo será organizado aqui quando chegar.</p></div>
          </div>
        </div>
      )}

      {view === "portuguese-term" && (
        <PortugueseReview onBack={() => go("portuguese-trimesters")} onGenerateFlashcards={openFlashcards} />
      )}

      {view === "portuguese-cycle5" && (
        <PortugueseCycle5 onBack={() => go("portuguese-trimesters")} onGenerateFlashcards={openFlashcards} />
      )}

      {view === "term" && (
        <div className="page">
          <button className="back-button" onClick={backAction}>← Back to {backLabel}</button>
          <section className="term-hero">
            <div>
              <span className="eyebrow light">{subject === "math" ? "MATEMÁTICA · CAPÍTULO 9" : "ENGLISH · 2ND TRIMESTER"}</span>
              <h1>{subject === "math" ? "Equações e Sistemas" : "Harnessing the Storm"}</h1>
              <p>{subject === "math" ? "Livro Digital SAS: páginas 170 a 197 — equações do 1º grau, problemas e sistemas resolvidos somente por substituição." : "William Kamkwamba, textual evidence, figurative language, vocabulary, argument, resilience, and ingenuity."}</p>
            </div>
            <div className="term-progress">
              <strong>{termProgress}%</strong><span>{subject === "math" ? "deste trimestre explorado" : "of this trimester explored"}</span>
              <div><i style={{ width: String(termProgress) + "%" }} /></div>
            </div>
          </section>

          {subject === "math" && <section className="official-guide">
            <div><span className="eyebrow teal">GUIA DE ESTUDO</span><h2>O que a prova avalia</h2><p>Habilidades do capítulo 9, páginas 170 a 197 do Livro SAS do 7º ano.</p></div>
            <div className="objective-chips">{mathLearningObjectives.map(([verb, text]) => <article key={verb}><strong>{verb}</strong><span>{text}</span></article>)}</div>
          </section>}

          {subject === "math" && <section className="math-materials">
            <div className="math-materials-heading">
              <div><span className="eyebrow coral">PROVA ESCRITA + INFOGRÁFICOS</span><h2>Imprima, resolva e revise visualmente</h2><p>A prova tem 22 questões, bastante modelagem por historinhas e gabarito comentado. Os nove mapas visuais podem ser abertos ou baixados individualmente.</p></div>
              <a className="math-pdf-button" href={asset("math/prova-matematica-capitulo-9-lulu.pdf")} download>
                <span>PDF · 22 questões</span><strong>Baixar prova escrita</strong><b>↓</b>
              </a>
            </div>
            <div className="math-infographic-grid">
              {mathInfographics.map((item) => <article className="math-infographic-card" key={item.number}>
                <a href={item.image} target="_blank" rel="noreferrer" aria-label={`Abrir infográfico ${item.title}`}>
                  <img src={item.image} alt={`Infográfico de Matemática: ${item.title}`} />
                </a>
                <footer><span><small>{item.number}</small><strong>{item.title}</strong><p>{item.description}</p></span><a href={item.image} download aria-label={`Baixar ${item.title}`}>Baixar ↓</a></footer>
              </article>)}
            </div>
          </section>}

          <section className="term-flashcards-cta">
            <div><span className="eyebrow light">NOVO · FLASHCARDS</span><h2>{subject === "math" ? "Teste as regras sem olhar a resposta." : "Turn this trimester into quick recall."}</h2><p>{subject === "math" ? "Gere um deck do conteúdo e revise apenas o que ainda ficou difícil." : "Generate a deck from the vocabulary, main ideas, or figurative language."}</p></div>
            <button onClick={() => openFlashcards(subject === "math" ? "math-chapter9" : "english-vocabulary")}>✦ {subject === "math" ? "Gerar deck deste conteúdo" : "Generate flashcards"} <span>→</span></button>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div><span className="eyebrow teal">{subject === "math" ? "CONTEÚDO PARA ESTUDAR" : "STUDY CONTENT"}</span><h2>{subject === "math" ? "Entenda antes de praticar" : "Review before the test"}</h2></div>
              <p>{subject === "math" ? "Resumo visual, exemplos do SAS e um método especial para transformar enunciados em matemática." : "Short, organised reference sections. Open only what you need."}</p>
            </div>
            <div className="study-grid">
              {activeStudyTabs.map((tab, index) => (
                <button className="study-card" key={tab.id} onClick={() => openStudy(tab.id)}>
                  <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
                  <small>{completedStudy.includes(tab.id) ? "✓ REVIEWED" : tab.detail}</small>
                  <h3>{tab.title}</h3><p>{tab.description}</p><b>{subject === "math" ? "Abrir resumo →" : "Open study section →"}</b>
                </button>
              ))}
            </div>
          </section>

          <section className="content-section exam-section">
            <div className="section-heading">
              <div><span className="eyebrow coral">{subject === "math" ? "QUIZES E SIMULADOS" : "MOCK TESTS"}</span><h2>{subject === "math" ? "Pratique como na prova" : "Practise like a real test"}</h2></div>
              <p>{subject === "math" ? "Uma questão por vez. O app explica o raciocínio certo e onde o erro aconteceu." : "One question at a time. Every choice is explained after you answer."}</p>
            </div>
            <div className="exam-grid">
              {activeMockExams.map((exam, index) => {
                const stats = examStats[exam.id] ?? { best: 0, attempts: 0 };
                return (
                  <button className={exam.level === "Complete" ? "exam-card complete-exam" : "exam-card"} key={exam.id} onClick={() => openExam(exam)}>
                    <span className="exam-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="exam-badge">{exam.level}</span>
                    <h3>{exam.title}</h3><p>{exam.description}</p>
                    <div className="exam-meta"><span>{exam.questionCount} {subject === "math" ? "questões" : "questions"}</span><span>≈ {exam.minutes} min</span></div>
                    <footer>{stats.attempts ? <span>{subject === "math" ? "Melhor" : "Best"}: <b>{stats.best}/{exam.questionCount}</b> · {stats.attempts} {subject === "math" ? "tentativa(s)" : `attempt${stats.attempts === 1 ? "" : "s"}`}</span> : <span>{subject === "math" ? "Ainda não realizado" : "Not attempted yet"}</span>}<strong>{subject === "math" ? "Começar" : "Start"} →</strong></footer>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {view === "study" && (
        <div className="page study-page">
          <button className="back-button" onClick={backAction}>← Back to {backLabel}</button>
          <section className="page-title">
            <span className="eyebrow teal">{subject === "math" ? "RESUMO GUIADO" : "STUDY CONTENT"}</span>
            <h1>{activeStudyTabs.find((tab) => tab.id === studyTab)?.title}</h1>
            <p>{activeStudyTabs.find((tab) => tab.id === studyTab)?.description}</p>
          </section>

          <nav className="study-tabs" aria-label="Study sections">
            {activeStudyTabs.map((tab) => <button className={studyTab === tab.id ? "active" : ""} key={tab.id} onClick={() => setStudyTab(tab.id)}>{tab.title}</button>)}
          </nav>

          {studyTab === "text" && (
            <article className="passage-sheet">
              <header><small>READING PASSAGE</small><h2>Harnessing the Storm</h2><p>Read for facts, figurative meaning, structure, and motivation.</p></header>
              {passage.map((paragraph) => (
                <section className="passage-row" key={paragraph.number}>
                  <aside><strong>{String(paragraph.number).padStart(2, "0")}</strong><span>{paragraph.title}</span></aside>
                  <div><p>{paragraph.text}</p><small><b>Paragraph job:</b> {paragraph.role}</small></div>
                </section>
              ))}
              <footer>This text is a product of Human–AI Collaboration.</footer>
            </article>
          )}

          {studyTab === "vocabulary" && (
            <section>
              <div className="study-note"><strong>{masteredTerms.length}/20 known</strong><p>Try to define each word before revealing it. Then mark it only if you could explain it without help.</p></div>
              <div className="vocab-grid">
                {keyTerms.map(([number, term, definition]) => {
                  const revealed = revealedTerm === number;
                  const mastered = masteredTerms.includes(number);
                  return (
                    <article className={mastered ? "vocab-card mastered" : "vocab-card"} key={number}>
                      <button className="vocab-question" onClick={() => setRevealedTerm(revealed ? null : number)} aria-expanded={revealed}>
                        <span>{String(number).padStart(2, "0")}</span><strong>{term}</strong><em>{revealed ? "Hide" : "Reveal definition"}</em>
                      </button>
                      {revealed && <p>{definition}</p>}
                      <button className="known-button" onClick={() => setMasteredTerms((current) => mastered ? current.filter((item) => item !== number) : [...current, number])}>{mastered ? "✓ I know this word" : "Mark as known"}</button>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {studyTab === "ideas" && (
            <section>
              <div className="evidence-chain">
                <span className="eyebrow light">CAUSE → EFFECT → RESPONSE → IMPACT</span>
                <div>{evidenceChain.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{text}</p></article>)}</div>
              </div>
              <div className="idea-list">
                {mainIdeas.map((idea) => <article key={idea.number}><span>{idea.number}</span><div><h3>{idea.title}</h3><p>{idea.explanation}</p><blockquote><b>Think deeper:</b> {idea.reflection}</blockquote></div></article>)}
              </div>
              <section className="language-table">
                <div><span className="eyebrow coral">FIGURATIVE LANGUAGE</span><h2>Know what each image means</h2></div>
                <div>{figurativeLanguage.map(([expression, meaning]) => <p key={expression}><strong>“{expression}”</strong><span>{meaning}</span></p>)}</div>
              </section>
            </section>
          )}

          {studyTab === "skills" && (
            <section>
              <div className="objective-list">
                {learningObjectives.map((objective, index) => <article key={objective.verb}><span>{String(index + 1).padStart(2, "0")}</span><p><strong>{objective.verb}</strong> {objective.text}</p></article>)}
              </div>
              <section className="answer-method">
                <div><span>C</span><strong>Claim</strong><p>State what is true, false, or most important.</p></div>
                <b>→</b>
                <div><span>E</span><strong>Evidence</strong><p>Use a precise quote or paraphrased detail.</p></div>
                <b>→</b>
                <div><span>R</span><strong>Reasoning</strong><p>Explain how the evidence proves the claim.</p></div>
              </section>
              <section className="response-frame">
                <div><span className="eyebrow coral">FALSE STATEMENT FRAME</span><h2>Three sentences that work</h2></div>
                <ol><li><b>Evaluate:</b> “The statement is false because…”</li><li><b>Support:</b> “The passage states, explains, or shows that…”</li><li><b>Connect:</b> “This evidence proves that…”</li></ol>
                <blockquote>The statement that William&apos;s school built the windmill is false. After leaving school, he independently studied library diagrams and gathered discarded parts. This proves that the project grew from his initiative and self-directed learning.</blockquote>
              </section>
              <section className="synthesis-box"><span>ADVERSITY</span><b>tests</b><span>RESILIENCE</span><b>fuels</b><span>INGENUITY</span><b>creates</b><span>CHANGE</span></section>
            </section>
          )}

          {subject === "math" && studyTab === "negative" && (
            <section className="math-study">
              <div className="math-anchor"><span>PÁGINAS 170–175 · SAS</span><h2>Nem toda escrita com números e letras é uma equação</h2><p>Primeiro descubra <b>o tipo de sentença</b>. Só depois procure uma solução. Uma identidade, por exemplo, é verdadeira para todos os valores permitidos.</p></div>
              <div className="rule-grid rational-grid">{sentenceKinds.map(([title, rule, example]) => <article key={title}><small>CONCEITO</small><h3>{title}</h3><p>{rule}</p><strong>{example}</strong></article>)}</div>
              <div className="power-warning"><strong>Conjunto solução não é só “o valor de x”</strong><p>É o conjunto dos valores do universo que tornam a sentença verdadeira. Em U = {`{0,1,2,3,4,5}`}, a solução de 2x + 1 = 9 é S = {`{4}`}.</p></div>
            </section>
          )}

          {subject === "math" && studyTab === "parentheses" && (
            <section className="math-study">
              <div className="math-anchor"><span>PÁGINAS 176–183 · SAS</span><h2>Equação é uma balança: tudo que acontece de um lado acontece do outro</h2><p>“Passar para o outro lado” é apenas um atalho. O raciocínio seguro é aplicar a <b>mesma operação nos dois membros</b>.</p></div>
              <div className="steps-list">{equationBalanceSteps.map(([number,title,text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
              <section className="equation-levels"><span className="eyebrow coral">EXEMPLO COMPLETO</span><article><small>DISTRIBUTIVA + x NOS DOIS LADOS</small><h3>3(x + 2) = x + 14</h3><ol><li>3x + 6 = x + 14</li><li>Subtraia x dos dois membros: 2x + 6 = 14</li><li>Subtraia 6: 2x = 8</li><li>Divida por 2: x = 4</li></ol><strong>Conferência: 3(4 + 2) = 18 e 4 + 14 = 18 ✓</strong></article></section>
            </section>
          )}

          {subject === "math" && studyTab === "order" && (
            <section className="math-study">
              <div className="math-anchor"><span>MÉTODO DA LULU · PÁGINAS 184–188</span><h2>A pergunta não é “qual conta faço?”</h2><p>A pergunta certa é: <b>“que relação essa história descreve?”</b> Quando a relação fica clara, a operação aparece dentro da equação.</p></div>
              <div className="steps-list">{storyQuestionRoute.map(([number,title,text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
              <section className="equation-levels problem-models"><span className="eyebrow coral">HISTORINHAS RESOLVIDAS</span>{chapter9StoryModels.map((model) => <article key={model.title}><small>{model.title}</small><h3>{model.text}</h3><p><b>Modelo:</b> {model.model}</p><strong>{model.result}</strong></article>)}</section>
            </section>
          )}

          {subject === "math" && studyTab === "equations" && (
            <section className="math-study equations-study">
              <div className="math-anchor"><span>PÁGINAS 189–192 · SAS</span><h2>Uma equação com x e y descreve uma relação</h2><p>Um par ordenado <b>(x,y)</b> é solução quando, ao substituir os dois valores, a igualdade fica verdadeira.</p></div>
              <div className="rule-grid">{twoVariableRules.map(([title,text]) => <article key={title}><small>DUAS INCÓGNITAS</small><h3>{title}</h3><p>{text}</p></article>)}</div>
              <section className="language-table algebra-dictionary"><div><span className="eyebrow coral">TESTE DO PAR</span><h2>(3,5) serve para 2x + y = 11?</h2></div><div><p><strong>Substitua</strong><span>2·3 + 5 = 11</span></p><p><strong>Calcule</strong><span>6 + 5 = 11</span></p><p><strong>Conclua</strong><span>Sim, (3,5) é solução.</span></p></div></section>
            </section>
          )}

          {subject === "math" && studyTab === "strategy" && (
            <section className="math-study">
              <div className="math-anchor"><span>PÁGINAS 193–197 · SAS</span><h2>Sistemas: somente pelo método da substituição</h2><p>Uma equação revela quanto vale uma incógnita em função da outra. Substitua essa expressão na segunda equação para ficar com <b>uma letra só</b>.</p></div>
              <div className="steps-list">{substitutionSteps.map(([number,title,text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
              <section className="equation-levels"><span className="eyebrow coral">DOIS SISTEMAS RESOLVIDOS</span>{substitutionModels.map((model) => <article key={model.system}><small>SISTEMA</small><h3>{model.system}</h3><ol>{model.steps.map((step) => <li key={step}>{step}</li>)}</ol><strong>{model.answer}</strong></article>)}</section>
              <div className="power-warning"><strong>Erro clássico</strong><p>Depois de encontrar a primeira incógnita, não pare. Volte à expressão isolada, descubra a segunda e confira o par nas <b>duas</b> equações.</p></div>
            </section>
          )}

          <div className="study-finish">
            <button className={completedStudy.includes(studyTab) ? "complete-button completed" : "complete-button"} onClick={toggleStudyComplete}>{completedStudy.includes(studyTab) ? (subject === "math" ? "✓ Marcado como revisado" : "✓ Marked as reviewed") : (subject === "math" ? "Marcar como revisado" : "Mark this section as reviewed")}</button>
            <button className="text-button" onClick={() => go("term")}>{subject === "math" ? "Escolher um quiz →" : "Choose a mock test →"}</button>
          </div>
        </div>
      )}

      {view === "exam-intro" && (
        <div className="page exam-intro-page">
          <button className="back-button" onClick={backAction}>← Back to {backLabel}</button>
          <section className="test-cover">
            <header>
              <div><span>{subject === "math" ? "MATEMÁTICA" : "ENGLISH"}</span><strong>{subject === "math" ? "Capítulo 9" : "2nd Trimester"}</strong></div>
              <div><span>ESTUDANTE</span><strong>Lulu</strong></div>
              <div><span>GRADE</span><strong>7</strong></div>
            </header>
            <div className="cover-body">
              <span className="exam-badge">{activeExam.level} test</span>
              <h1>{activeExam.title}</h1>
              <p>{activeExam.description}</p>
              <div className="cover-stats"><span><strong>{activeExam.questionCount}</strong> {subject === "math" ? "questões" : "questions"}</span><span><strong>≈ {activeExam.minutes}</strong> {subject === "math" ? "minutos" : "minutes"}</span><span><strong>A–D</strong> {subject === "math" ? "alternativas" : "choices"}</span></div>
              <section className="instructions">
                <h2>{subject === "math" ? "Como este quiz funciona" : "How this test works"}</h2>
                {subject === "math" ? <ol><li>Leia a expressão e copie os sinais com cuidado.</li><li>Resolva uma etapa por linha antes de escolher.</li><li>Ao responder, você verá onde seu raciocínio acertou ou mudou de direção.</li><li>A ordem das questões muda em cada tentativa.</li></ol> : <ol><li>Read the question and all four choices.</li><li>Choose one answer, then press <b>Check answer</b>.</li><li>You will immediately learn why your choice is right or wrong.</li><li>The question order changes on every new attempt.</li></ol>}
              </section>
              <button className="primary-button large" onClick={startExam}>{subject === "math" ? "Começar quiz" : "Begin test"} →</button>
            </div>
          </section>
        </div>
      )}

      {view === "exam" && (
        <div className="page exam-page">
          <div className="exam-toolbar">
            <button className="back-button" onClick={() => go("exam-intro")}>← Exit test</button>
            <span>{subject === "math" ? "Questão" : "Question"} <b>{questionIndex + 1}</b> {subject === "math" ? "de" : "of"} {questionOrder.length}</span>
          </div>
          <div className="exam-progress" role="progressbar" aria-valuenow={questionIndex + 1} aria-valuemin={1} aria-valuemax={questionOrder.length}><span style={{ width: String(((questionIndex + 1) / questionOrder.length) * 100) + "%" }} /></div>
          <section className="test-paper">
            <header><span>{activeExam.shortTitle}</span><span>{currentQuestion.topic}</span></header>
            <div className="question-heading">
              <span>{questionIndex + 1}</span>
              <div><h1>{currentQuestion.prompt}</h1><p>{currentQuestion.support}</p></div>
            </div>
            <div className="answer-options">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrect = option.id === currentQuestion.correct;
                const state = answerChecked
                  ? isCorrect
                    ? "correct"
                    : isSelected
                      ? "wrong"
                      : "dimmed"
                  : isSelected
                    ? "selected"
                    : "";
                return (
                  <button className={["answer-option", state].filter(Boolean).join(" ")} key={option.id} disabled={answerChecked} onClick={() => setSelectedOption(option.id)}>
                    <span>{option.id.toUpperCase()}</span><strong>{option.label}</strong>
                    {answerChecked && isCorrect && <i>✓</i>}
                    {answerChecked && isSelected && !isCorrect && <i>×</i>}
                  </button>
                );
              })}
            </div>

            {answerChecked && (
              <section className={selectedOption === currentQuestion.correct ? "feedback correct-feedback" : "feedback wrong-feedback"} aria-live="polite">
                {selectedOption === currentQuestion.correct ? (
                  <>
                    <span className="feedback-icon">✓</span>
                    <div><small>{subject === "math" ? "ACERTOU" : "CORRECT"}</small><h2>{subject === "math" ? "Seu raciocínio chegou à resposta certa." : "You chose the strongest answer."}</h2><p>{correctOptionData.explanation}</p>{subject === "math" && <p><b>A pista que você percebeu:</b> {currentQuestion.support}</p>}</div>
                  </>
                ) : (
                  <>
                    <span className="feedback-icon">!</span>
                    <div>
                      <small>{subject === "math" ? "VAMOS ENTENDER" : "LET'S FIX IT"}</small><h2>{subject === "math" ? "Seu raciocínio mudou de direção em uma etapa." : "That choice does not fit the text."}</h2>
                      <p><b>{subject === "math" ? "Por que essa resposta apareceu:" : "Why your answer is not correct:"}</b> {selectedOptionData?.explanation}</p>
                      {subject === "math" && <p><b>Como pensar:</b> {currentQuestion.support}</p>}
                      <p><b>{subject === "math" ? `Resposta correta: ${currentQuestion.correct.toUpperCase()}.` : `Best answer: ${currentQuestion.correct.toUpperCase()}.`}</b> {correctOptionData.explanation}</p>
                    </div>
                  </>
                )}
                <button className="explanation-toggle" onClick={() => setShowAllExplanations((current) => !current)}>{showAllExplanations ? (subject === "math" ? "Ocultar alternativas" : "Hide all choices") : (subject === "math" ? "Entender todas as alternativas" : "Why not the other choices?")}</button>
                {showAllExplanations && <div className="all-explanations">{currentQuestion.options.map((option) => <p key={option.id}><strong>{option.id.toUpperCase()}.</strong> {option.explanation}</p>)}</div>}
              </section>
            )}

            <footer className="paper-actions">
              {!answerChecked
                ? <button className="primary-button" disabled={!selectedOption} onClick={checkAnswer}>{subject === "math" ? "Conferir resposta" : "Check answer"}</button>
                : <button className="primary-button" onClick={continueExam}>{questionIndex === questionOrder.length - 1 ? (subject === "math" ? "Finalizar e ver resultado" : "Finish and see results") : (subject === "math" ? "Próxima questão" : "Next question")} →</button>}
            </footer>
          </section>
        </div>
      )}

      {view === "results" && (
        <div className="page results-page">
          <section className="result-sheet">
            <div className="score-stamp"><strong>{resultPercent}%</strong><span>{resultScore}/{resultAnswers.length} correct</span></div>
            <div className="result-copy">
              <span className="eyebrow coral">{subject === "math" ? "QUIZ CONCLUÍDO" : "TEST COMPLETE"}</span>
              <h1>{subject === "math" ? (resultPercent >= 90 ? "Excelente, Lulu!" : resultPercent >= 75 ? "Você está ficando pronta para a prova." : resultPercent >= 60 ? "Bom avanço — revise os erros." : "Agora sabemos exatamente o que revisar.") : (resultPercent >= 90 ? "Excellent work, Lulu." : resultPercent >= 75 ? "You are getting test-ready." : resultPercent >= 60 ? "Good progress—review the misses." : "This attempt shows what to study next.")}</h1>
              <p>{activeExam.title}. {subject === "math" ? "Sua melhor nota é" : "Your best score is"} {Math.max(examStats[activeExam.id]?.best ?? 0, resultScore)}/{activeExam.questionCount}.</p>
              <div><button className="primary-button" onClick={startExam}>{subject === "math" ? "Nova tentativa" : "New attempt"}</button><button className="secondary-button" onClick={() => go("term")}>{subject === "math" ? "Voltar ao trimestre" : "Back to trimester"}</button></div>
            </div>
          </section>

          <section className="result-grid">
            <article className="skill-results">
              <span className="eyebrow teal">{subject === "math" ? "RESULTADO POR HABILIDADE" : "RESULTS BY SKILL"}</span>
              <h2>{subject === "math" ? "Onde você foi melhor" : "Where you were strongest"}</h2>
              {topicResults.map((result) => <div key={result.topic}><span>{result.topic}</span><i><b style={{ width: String((result.correct / result.total) * 100) + "%" }} /></i><strong>{result.correct}/{result.total}</strong></div>)}
            </article>
            <article className="answer-sheet">
              <span className="eyebrow coral">{subject === "math" ? "FOLHA DE RESPOSTAS" : "ANSWER SHEET"}</span>
              <h2>{subject === "math" ? "Todas as questões" : "Every question"}</h2>
              <div>{resultAnswers.map((answer, index) => <span className={answer.correct ? "right" : "miss"} key={answer.questionId}>{index + 1}<b>{answer.correct ? "✓" : "×"}</b></span>)}</div>
            </article>
          </section>

          {resultAnswers.some((answer) => !answer.correct) ? (
            <section className="mistake-review">
              <div className="section-heading"><div><span className="eyebrow coral">{subject === "math" ? "REVISE OS ERROS" : "REVIEW THE MISSES"}</span><h2>{subject === "math" ? "Transforme cada erro em uma pista" : "Turn every mistake into a clue"}</h2></div><p>{subject === "math" ? "Veja onde o raciocínio mudou e qual regra usar na próxima vez." : "Compare your choice with the best answer and its evidence."}</p></div>
              {resultAnswers.filter((answer) => !answer.correct).map((answer, index) => {
                const question = questionById(answer.questionId);
                const chosen = question.options.find((option) => option.id === answer.selected)!;
                const correct = question.options.find((option) => option.id === question.correct)!;
                return (
                  <article key={answer.questionId}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><small>{question.topic}</small><h3>{question.prompt}</h3><p className="chosen-answer"><b>{subject === "math" ? "Sua resposta:" : "Your choice:"}</b> {chosen.label}<em>{chosen.explanation}</em></p>{subject === "math" && <p className="thinking-answer"><b>Como pensar:</b> {question.support}</p>}<p className="best-answer"><b>{subject === "math" ? "Resposta correta:" : "Best answer:"}</b> {correct.label}<em>{correct.explanation}</em></p></div>
                  </article>
                );
              })}
            </section>
          ) : (
            <section className="perfect-card"><strong>✓</strong><div><span className="eyebrow teal">PERFECT PAPER</span><h2>No mistakes to review.</h2><p>Try the complete mock exam next to test the full question bank.</p></div></section>
          )}
        </div>
      )}

      {showInstall && (
        <div className="modal-backdrop" onClick={() => setShowInstall(false)}>
          <section className="modal-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Install on iPhone">
            <button className="modal-close" onClick={() => setShowInstall(false)} aria-label="Close">×</button>
            <span className="modal-mark">L</span><h2>Install on iPhone</h2>
            <ol><li><b>1</b><span>Open this page in <strong>Safari</strong>.</span></li><li><b>2</b><span>Tap the <strong>Share</strong> button.</span></li><li><b>3</b><span>Choose <strong>Add to Home Screen</strong>.</span></li><li><b>4</b><span>Tap <strong>Add</strong>. Test results stay on this device.</span></li></ol>
            <button className="primary-button" onClick={() => setShowInstall(false)}>Got it</button>
          </section>
        </div>
      )}

      {showReset && (
        <div className="modal-backdrop" onClick={() => setShowReset(false)}>
          <section className="modal-card compact" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Reset progress">
            <button className="modal-close" onClick={() => setShowReset(false)} aria-label="Close">×</button>
            <span className="modal-mark warning">↻</span><h2>Reset all progress?</h2><p>This clears reviewed sections, known words, test attempts, flashcard decks, and scores saved in this browser.</p>
            <div className="modal-actions"><button className="secondary-button" onClick={() => setShowReset(false)}>Cancel</button><button className="danger-button" onClick={resetProgress}>Reset everything</button></div>
          </section>
        </div>
      )}
    </main>
  );
}
