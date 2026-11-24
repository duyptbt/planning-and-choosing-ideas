import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Globe, RotateCcw, X } from 'lucide-react';
import {
  EX2_PLAN_ROWS,
  EX4_IDEA_BUBBLES,
  EX6_SLOTS,
  EX8_STARTER_PRESETS,
  Ex6Phrase,
  IdeaCategory,
  LESSON_INFO,
  STAGES,
  StageId,
  StanceChoice,
  StarterPreset,
  evaluateEx2Row,
  isEx6SlotCorrect,
} from './data/lessonData';
import { Language, STAGES_I18N, UI_TEXT } from './data/i18n';
import TaskPromptPanel from './components/TaskPromptPanel';
import Stage1WarmupPlan from './components/Stage1WarmupPlan';
import Stage2Introductions from './components/Stage2Introductions';
import Stage3ChoosingIdeas from './components/Stage3ChoosingIdeas';
import Stage4SpecificDetails, {
  isEx5SelectionCorrect,
} from './components/Stage4SpecificDetails';
import Stage5WriteParagraph, {
  countWords,
} from './components/Stage5WriteParagraph';

const STORAGE_KEY = 'ielts_wt2_b1_planning_ideas_v1';

interface SavedProgress {
  lang: Language;
  activeStage: StageId;
  ex1Notes: { picA: string; picB: string; learningLink: string };
  ex2Answers: Record<number, string>;
  ex2Checked: boolean;
  selectedIntro: '1' | '2' | '3' | null;
  ex3Checked: boolean;
  ex3Matches: Record<'1' | '2' | '3', string>;
  ex3MatchChecked: boolean;
  ex4Categories: Record<number, IdeaCategory>;
  ex4Stances: Record<number, StanceChoice>;
  ex4Checked: boolean;
  ex5SelectedIds: number[];
  ex5Checked: boolean;
  ex6Answers: Record<number, Ex6Phrase['id']>;
  ex6Checked: boolean;
  ex7Answer: '1' | '2' | null;
  ex7Checked: boolean;
  ex8PresetId: StarterPreset['id'];
  draftText: string;
  ex8Checklist: Record<string, boolean>;
}

const DEFAULT_STARTER = EX8_STARTER_PRESETS[0].starterText;

const DEFAULT_PROGRESS: SavedProgress = {
  lang: 'en',
  activeStage: 'warmup-plan',
  ex1Notes: { picA: '', picB: '', learningLink: '' },
  ex2Answers: {},
  ex2Checked: false,
  selectedIntro: null,
  ex3Checked: false,
  ex3Matches: { '1': '', '2': '', '3': '' },
  ex3MatchChecked: false,
  ex4Categories: {},
  ex4Stances: {},
  ex4Checked: false,
  ex5SelectedIds: [],
  ex5Checked: false,
  ex6Answers: {},
  ex6Checked: false,
  ex7Answer: null,
  ex7Checked: false,
  ex8PresetId: 'textbook-adv',
  draftText: DEFAULT_STARTER,
  ex8Checklist: {},
};

const VALID_STAGE_IDS = new Set<StageId>(STAGES.map((s) => s.id));

function loadSavedProgress(): SavedProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<SavedProgress>;
    const activeStage =
      parsed.activeStage && VALID_STAGE_IDS.has(parsed.activeStage)
        ? parsed.activeStage
        : DEFAULT_PROGRESS.activeStage;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      activeStage,
      lang: parsed.lang === 'vi' ? 'vi' : 'en',
      ex1Notes: {
        ...DEFAULT_PROGRESS.ex1Notes,
        ...(parsed.ex1Notes ?? {}),
      },
      ex3Matches: {
        ...DEFAULT_PROGRESS.ex3Matches,
        ...(parsed.ex3Matches ?? {}),
      },
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export default function App() {
  const [state, setState] = useState<SavedProgress>(loadSavedProgress);
  const [promptDrawerOpen, setPromptDrawerOpen] = useState(false);

  const lang = state.lang;
  const t = UI_TEXT[lang];
  const stageCopy = STAGES_I18N[lang];

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Compute completion across Exercises 1–8
  const ex1Done =
    (state.ex1Notes.picA + state.ex1Notes.picB + state.ex1Notes.learningLink)
      .trim().length >= 12;

  const ex2Done =
    state.ex2Checked &&
    EX2_PLAN_ROWS.filter((r) => r.isBlank).every((row) =>
      evaluateEx2Row(row, state.ex2Answers[row.rowNumber] ?? '')
    );

  const ex3Done = state.ex3Checked && state.selectedIntro === '2';

  const ex4Done =
    state.ex4Checked &&
    EX4_IDEA_BUBBLES.every(
      (idea) => state.ex4Categories[idea.id] === idea.correctCategory
    );

  const ex5Done =
    state.ex5Checked && isEx5SelectionCorrect(state.ex5SelectedIds);

  const ex6Done =
    state.ex6Checked &&
    EX6_SLOTS.every((slot) =>
      isEx6SlotCorrect(slot.id, state.ex6Answers[slot.id], state.ex6Answers)
    );

  const ex7Done = state.ex7Checked && state.ex7Answer === '2';

  const ex8Done = countWords(state.draftText) >= 55;

  const completedExercises = [
    ex1Done,
    ex2Done,
    ex3Done,
    ex4Done,
    ex5Done,
    ex6Done,
    ex7Done,
    ex8Done,
  ].filter(Boolean).length;

  const progressPct = Math.round((completedExercises / 8) * 100);
  const currentStageIndex = STAGES.findIndex((s) => s.id === state.activeStage);
  const prevStage = currentStageIndex > 0 ? STAGES[currentStageIndex - 1] : null;
  const nextStage =
    currentStageIndex < STAGES.length - 1 ? STAGES[currentStageIndex + 1] : null;

  const goToStage = (id: StageId) => {
    setState((prev) => ({ ...prev, activeStage: id }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLang = (nextLang: Language) => {
    setState((prev) => ({ ...prev, lang: nextLang }));
  };

  const resetAllProgress = () => {
    setState((prev) => ({ ...DEFAULT_PROGRESS, lang: prev.lang }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F9] text-[#0F172A]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 border-t-[3px] border-t-[#EF0037]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => goToStage('warmup-plan')}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037] rounded"
          >
            Writing Task 2
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Lesson Stages"
            className="hidden lg:flex items-center gap-6 text-sm font-medium"
          >
            {STAGES.map((stage) => {
              const active = state.activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => goToStage(stage.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E9788] ${
                    active
                      ? 'text-[#B8002A] border-[#EF0037]'
                      : 'text-slate-600 border-transparent hover:text-[#13675D] hover:border-[#9FD9D0]'
                  }`}
                >
                  {stageCopy[stage.id].navLabel}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setPromptDrawerOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
            >
              {t.viewTaskPrompt}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8">
        {/* Editorial Module Header */}
        <div className="pb-6 mb-8 border-b border-slate-200 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#13675D] font-medium">
              <span>{t.subtitle}</span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span className="text-slate-500 font-normal">{t.unitLabel}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              {LESSON_INFO.appTitle}
            </h1>
            <p className="text-[15px] text-slate-600 max-w-2xl leading-relaxed">
              {t.aim}
            </p>
          </div>

          {/* Workspace Toolbar Controls (below header) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Language Toggle (English / Tiếng Việt) */}
            <div
              role="group"
              aria-label="Language toggle"
              className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg"
            >
              <Globe
                className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5 shrink-0"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                  lang === 'en'
                    ? 'bg-[#1E9788] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('vi')}
                aria-pressed={lang === 'vi'}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037] ${
                  lang === 'vi'
                    ? 'bg-[#EF0037] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tiếng Việt
              </button>
            </div>

            <div className="flex items-center gap-3 pr-3 border-r border-slate-200">
              <div className="text-right">
                <div className="text-xs text-slate-500">
                  {t.exercisesMastered}
                </div>
                <div className="text-sm font-mono tabular-nums font-semibold text-slate-900">
                  {completedExercises} / 8 ({progressPct}%)
                </div>
              </div>
              <div
                className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t.exercisesMastered}
              >
                <div
                  className="h-full bg-[#1E9788] transition-transform duration-200 origin-left"
                  style={{ transform: `scaleX(${progressPct / 100})` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={resetAllProgress}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:text-[#B8002A] hover:border-[#F9B8C6] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.resetAll}</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Stage Selector */}
        <div className="lg:hidden mb-6 overflow-x-auto pb-1">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            {STAGES.map((stage) => {
              const active = state.activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => goToStage(stage.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#EF0037] text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {stageCopy[stage.id].navLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Zone Educational Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Primary Interactive Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {state.activeStage === 'warmup-plan' && (
              <Stage1WarmupPlan
                lang={lang}
                ex1Notes={state.ex1Notes}
                ex2Answers={state.ex2Answers}
                ex2Checked={state.ex2Checked}
                onUpdateEx1Note={(field, value) =>
                  setState((prev) => ({
                    ...prev,
                    ex1Notes: { ...prev.ex1Notes, [field]: value },
                  }))
                }
                onResetEx1={() =>
                  setState((prev) => ({
                    ...prev,
                    ex1Notes: { picA: '', picB: '', learningLink: '' },
                  }))
                }
                onUpdateEx2={(rowNumber, value) =>
                  setState((prev) => ({
                    ...prev,
                    ex2Answers: { ...prev.ex2Answers, [rowNumber]: value },
                  }))
                }
                onFillEx2Samples={() =>
                  setState((prev) => ({
                    ...prev,
                    ex2Answers: {
                      3: 'disadvantages',
                      4: '5',
                      5: 'zoo, concerts, abroad, outside school, common, past',
                      6: 'advantages',
                      8: 'benefit',
                      9: 'disadvantages',
                    },
                  }))
                }
                onCheckEx2={() =>
                  setState((prev) => ({ ...prev, ex2Checked: true }))
                }
                onResetEx2={() =>
                  setState((prev) => ({
                    ...prev,
                    ex2Answers: {},
                    ex2Checked: false,
                  }))
                }
              />
            )}

            {state.activeStage === 'introductions' && (
              <Stage2Introductions
                lang={lang}
                selectedIntro={state.selectedIntro}
                ex3Checked={state.ex3Checked}
                ex3Matches={state.ex3Matches}
                ex3MatchChecked={state.ex3MatchChecked}
                onSelectIntro={(id) =>
                  setState((prev) => ({ ...prev, selectedIntro: id }))
                }
                onCheckEx3={() =>
                  setState((prev) => ({ ...prev, ex3Checked: true }))
                }
                onResetEx3={() =>
                  setState((prev) => ({
                    ...prev,
                    selectedIntro: null,
                    ex3Checked: false,
                  }))
                }
                onSetEx3Match={(introId, critiqueKey) =>
                  setState((prev) => ({
                    ...prev,
                    ex3Matches: { ...prev.ex3Matches, [introId]: critiqueKey },
                  }))
                }
                onCheckEx3Matches={() =>
                  setState((prev) => ({ ...prev, ex3MatchChecked: true }))
                }
                onResetEx3Matches={() =>
                  setState((prev) => ({
                    ...prev,
                    ex3Matches: { '1': '', '2': '', '3': '' },
                    ex3MatchChecked: false,
                  }))
                }
              />
            )}

            {state.activeStage === 'sorting-ideas' && (
              <Stage3ChoosingIdeas
                lang={lang}
                ex4Categories={state.ex4Categories}
                ex4Stances={state.ex4Stances}
                ex4Checked={state.ex4Checked}
                onSetCategory={(ideaId, category) =>
                  setState((prev) => ({
                    ...prev,
                    ex4Categories: {
                      ...prev.ex4Categories,
                      [ideaId]: category,
                    },
                  }))
                }
                onSetStance={(ideaId, stance) =>
                  setState((prev) => ({
                    ...prev,
                    ex4Stances: { ...prev.ex4Stances, [ideaId]: stance },
                  }))
                }
                onCheckEx4={() =>
                  setState((prev) => ({ ...prev, ex4Checked: true }))
                }
                onResetEx4={() =>
                  setState((prev) => ({
                    ...prev,
                    ex4Categories: {},
                    ex4Stances: {},
                    ex4Checked: false,
                  }))
                }
              />
            )}

            {state.activeStage === 'model-details' && (
              <Stage4SpecificDetails
                lang={lang}
                ex5SelectedIds={state.ex5SelectedIds}
                ex5Checked={state.ex5Checked}
                ex6Answers={state.ex6Answers}
                ex6Checked={state.ex6Checked}
                ex7Answer={state.ex7Answer}
                ex7Checked={state.ex7Checked}
                onToggleEx5Id={(ideaId) =>
                  setState((prev) => {
                    const exists = prev.ex5SelectedIds.includes(ideaId);
                    return {
                      ...prev,
                      ex5SelectedIds: exists
                        ? prev.ex5SelectedIds.filter((id) => id !== ideaId)
                        : [...prev.ex5SelectedIds, ideaId],
                    };
                  })
                }
                onCheckEx5={() =>
                  setState((prev) => ({ ...prev, ex5Checked: true }))
                }
                onResetEx5={() =>
                  setState((prev) => ({
                    ...prev,
                    ex5SelectedIds: [],
                    ex5Checked: false,
                  }))
                }
                onSetEx6={(slotId, phraseId) =>
                  setState((prev) => ({
                    ...prev,
                    ex6Answers: { ...prev.ex6Answers, [slotId]: phraseId },
                  }))
                }
                onClearEx6={(slotId) =>
                  setState((prev) => {
                    const next = { ...prev.ex6Answers };
                    delete next[slotId];
                    return { ...prev, ex6Answers: next };
                  })
                }
                onCheckEx6={() =>
                  setState((prev) => ({ ...prev, ex6Checked: true }))
                }
                onResetEx6={() =>
                  setState((prev) => ({
                    ...prev,
                    ex6Answers: {},
                    ex6Checked: false,
                  }))
                }
                onSelectEx7={(opt) =>
                  setState((prev) => ({ ...prev, ex7Answer: opt }))
                }
                onCheckEx7={() =>
                  setState((prev) => ({ ...prev, ex7Checked: true }))
                }
                onResetEx7={() =>
                  setState((prev) => ({
                    ...prev,
                    ex7Answer: null,
                    ex7Checked: false,
                  }))
                }
              />
            )}

            {state.activeStage === 'write-paragraph' && (
              <Stage5WriteParagraph
                lang={lang}
                activePresetId={state.ex8PresetId}
                draftText={state.draftText}
                checklist={state.ex8Checklist}
                onSelectPreset={(presetId) => {
                  const preset = EX8_STARTER_PRESETS.find(
                    (p) => p.id === presetId
                  );
                  if (!preset) return;
                  setState((prev) => ({
                    ...prev,
                    ex8PresetId: presetId,
                    draftText: preset.starterText,
                  }));
                }}
                onChangeDraft={(text) =>
                  setState((prev) => ({ ...prev, draftText: text }))
                }
                onResetDraft={() => {
                  const preset =
                    EX8_STARTER_PRESETS.find(
                      (p) => p.id === state.ex8PresetId
                    ) ?? EX8_STARTER_PRESETS[0];
                  setState((prev) => ({
                    ...prev,
                    draftText: preset.starterText,
                  }));
                }}
                onToggleChecklist={(key) =>
                  setState((prev) => ({
                    ...prev,
                    ex8Checklist: {
                      ...prev.ex8Checklist,
                      [key]: !prev.ex8Checklist[key],
                    },
                  }))
                }
              />
            )}

            {/* Sequential Stage Footer Navigation */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {prevStage ? (
                <button
                  type="button"
                  onClick={() => goToStage(prevStage.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-[#1E9788] hover:text-[#13675D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>{stageCopy[prevStage.id].navLabel}</span>
                </button>
              ) : (
                <div />
              )}

              {nextStage && (
                <button
                  type="button"
                  onClick={() => goToStage(nextStage.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1E9788] rounded-lg hover:bg-[#177D70] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788]"
                >
                  <span>
                    {t.nextPrefix}: {stageCopy[nextStage.id].navLabel}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Sticky Concept & Prompt Reference Deck (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <TaskPromptPanel lang={lang} activeStage={state.activeStage} />
          </div>
        </div>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            {LESSON_INFO.appTitle} · {t.subtitle}
          </span>
          <span>{t.unitLabel}</span>
        </div>
      </footer>

      {/* Task Prompt Quick-View Drawer */}
      {promptDrawerOpen && (
        <div
          className="fixed inset-0 z-40 flex justify-end bg-slate-950/40"
          role="dialog"
          aria-modal="true"
          aria-label={t.promptDrawerTitle}
        >
          <div
            className="flex-1"
            onClick={() => setPromptDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="w-full max-w-md bg-white h-full overflow-y-auto border-l border-slate-200 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.promptDrawerTitle}
              </h2>
              <button
                type="button"
                onClick={() => setPromptDrawerOpen(false)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label={t.closePromptDrawer}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <TaskPromptPanel lang={lang} activeStage={state.activeStage} />
          </div>
        </div>
      )}
    </div>
  );
}
