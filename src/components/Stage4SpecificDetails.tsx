import { useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw,
} from 'lucide-react';
import {
  ENRICHED_MODEL_PARAGRAPH,
  EX4_IDEA_BUBBLES,
  EX5_EVIDENCE_MAP,
  EX5_OFFICIAL_KEY_IDS,
  EX6_PHRASES,
  EX6_SLOTS,
  EX7_OPTIONS,
  Ex6Phrase,
  isEx6SlotCorrect,
} from '../data/lessonData';
import { Language, UI_TEXT } from '../data/i18n';

interface Stage4Props {
  lang: Language;
  ex5SelectedIds: number[];
  ex5Checked: boolean;
  ex6Answers: Record<number, Ex6Phrase['id']>;
  ex6Checked: boolean;
  ex7Answer: '1' | '2' | null;
  ex7Checked: boolean;
  onToggleEx5Id: (ideaId: number) => void;
  onCheckEx5: () => void;
  onResetEx5: () => void;
  onSetEx6: (slotId: number, phraseId: Ex6Phrase['id']) => void;
  onClearEx6: (slotId: number) => void;
  onCheckEx6: () => void;
  onResetEx6: () => void;
  onSelectEx7: (opt: '1' | '2') => void;
  onCheckEx7: () => void;
  onResetEx7: () => void;
}

export function isEx5SelectionCorrect(selectedIds: number[]): boolean {
  const sorted = [...selectedIds].sort((a, b) => a - b);
  const keyPrimary = [1, 2, 4, 6];
  const keyAlt = [1, 4, 6, 8];
  const matches = (target: number[]) =>
    sorted.length === target.length && sorted.every((v, i) => v === target[i]);
  return matches(keyPrimary) || matches(keyAlt);
}

export default function Stage4SpecificDetails({
  lang,
  ex5SelectedIds,
  ex5Checked,
  ex6Answers,
  ex6Checked,
  ex7Answer,
  ex7Checked,
  onToggleEx5Id,
  onCheckEx5,
  onResetEx5,
  onSetEx6,
  onClearEx6,
  onCheckEx6,
  onResetEx6,
  onSelectEx7,
  onCheckEx7,
  onResetEx7,
}: Stage4Props) {
  const [activeSlot, setActiveSlot] = useState<number>(1);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const t = UI_TEXT[lang];

  const usedPhraseIds = new Set(Object.values(ex6Answers));
  const ex6Score = EX6_SLOTS.filter((slot) =>
    isEx6SlotCorrect(slot.id, ex6Answers[slot.id], ex6Answers)
  ).length;

  const ex5Correct = isEx5SelectionCorrect(ex5SelectedIds);
  const ex7Correct = ex7Answer === '2';

  const getPhraseText = (id?: Ex6Phrase['id']) =>
    EX6_PHRASES.find((p) => p.id === id)?.text ?? '';

  const handlePickPhrase = (phraseId: Ex6Phrase['id']) => {
    onSetEx6(activeSlot, phraseId);
    const nextEmpty = EX6_SLOTS.find(
      (s) => s.id > activeSlot && !ex6Answers[s.id]
    );
    if (nextEmpty) {
      setActiveSlot(nextEmpty.id);
    } else {
      const anyEmpty = EX6_SLOTS.find(
        (s) => s.id !== activeSlot && !ex6Answers[s.id]
      );
      if (anyEmpty) setActiveSlot(anyEmpty.id);
    }
  };

  const renderSlotButton = (slotId: number) => {
    const chosenId = ex6Answers[slotId];
    const isActive = activeSlot === slotId;
    const isRight = isEx6SlotCorrect(slotId, chosenId, ex6Answers);

    let cls = 'bg-white border-slate-300 text-slate-600 hover:border-[#1E9788]';
    if (ex6Checked) {
      cls = isRight
        ? 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47]'
        : 'bg-[#FFF0F3] border-[#EF0037] text-[#9A0023]';
    } else if (isActive) {
      cls =
        'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47] ring-2 ring-[#1E9788]/25';
    } else if (chosenId) {
      cls = 'bg-[#EEFAF8]/70 border-[#9FD9D0] text-[#13675D]';
    }

    return (
      <button
        type="button"
        onClick={() => {
          if (chosenId && isActive) {
            onClearEx6(slotId);
          } else {
            setActiveSlot(slotId);
          }
        }}
        className={`inline-flex items-baseline gap-1.5 mx-1 px-2.5 py-0.5 rounded-md border text-sm font-medium align-baseline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${cls}`}
      >
        <span className="font-mono tabular-nums text-[11px] font-bold opacity-80">
          {slotId}
        </span>
        <span>{chosenId ? getPhraseText(chosenId) : '_____'}</span>
      </button>
    );
  };

  const activeSlotMeta = EX6_SLOTS.find((s) => s.id === activeSlot)!;

  return (
    <div className="space-y-8">
      {/* Exercise 5: Identify which Exercise 4 ideas are mentioned */}
      <section
        aria-labelledby="ex5-heading"
        className="bg-white border border-slate-200 rounded-xl"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s4Ex5Kicker}
          </div>
          <h2 id="ex5-heading" className="text-2xl font-semibold text-slate-900">
            {t.s4Ex5Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s4Ex5Desc}
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Original Paragraph Display */}
          <div className="p-5 rounded-xl bg-[#F7F9F9] border border-slate-200 text-[15px] leading-relaxed text-slate-900">
            The main benefit <strong className="font-mono text-[#13675D]">1</strong>{' '}
            for secondary school children is that they are educational, because
            children learn <strong className="font-mono text-[#13675D]">2</strong>{' '}
            by seeing and doing even more than from books. For example, if
            children <strong className="font-mono text-[#13675D]">3</strong> are
            taken to a museum{' '}
            <strong className="font-mono text-[#13675D]">4</strong> they can see
            real objects and watch films{' '}
            <strong className="font-mono text-[#13675D]">5</strong>. As a result,
            they are more likely to remember{' '}
            <strong className="font-mono text-[#13675D]">6</strong> knowledge{' '}
            <strong className="font-mono text-[#13675D]">7</strong>.
          </div>

          {/* Clickable 8 Idea Checkboxes */}
          <div className="grid gap-2.5 sm:grid-cols-2">
            {EX4_IDEA_BUBBLES.map((idea) => {
              const checked = ex5SelectedIds.includes(idea.id);
              const inOfficialKey = EX5_OFFICIAL_KEY_IDS.includes(idea.id);
              const evidence = EX5_EVIDENCE_MAP[idea.id];

              let cardCls =
                'bg-white border-slate-200 hover:border-[#9FD9D0] text-slate-800';
              if (ex5Checked) {
                if (checked && (inOfficialKey || idea.id === 8)) {
                  cardCls = 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47]';
                } else if (checked && !inOfficialKey) {
                  cardCls = 'bg-[#FFF0F3] border-[#EF0037] text-[#9A0023]';
                } else if (!checked && inOfficialKey) {
                  cardCls = 'bg-[#EEFAF8]/40 border-[#9FD9D0] text-slate-800';
                }
              } else if (checked) {
                cardCls = 'bg-[#EEFAF8]/60 border-[#1E9788] text-[#0E4F47]';
              }

              return (
                <button
                  key={idea.id}
                  type="button"
                  onClick={() => onToggleEx5Id(idea.id)}
                  aria-pressed={checked}
                  className={`text-left p-3.5 rounded-lg border transition-colors flex items-start gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${cardCls}`}
                >
                  <span
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      checked
                        ? 'bg-[#1E9788] border-[#1E9788] text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-snug">
                      <span className="font-mono tabular-nums text-xs font-semibold mr-1.5 opacity-75">
                        {idea.id}.
                      </span>
                      {idea.textEn}
                    </div>
                    {lang === 'vi' && (
                      <div className="text-xs text-slate-500 mt-0.5">
                        {idea.textVi}
                      </div>
                    )}
                    {ex5Checked && evidence && (
                      <div className="text-xs text-[#13675D] mt-1.5 leading-snug">
                        &ldquo;{evidence.quote}&rdquo; —{' '}
                        {lang === 'vi' ? evidence.noteVi : evidence.noteEn}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {ex5Checked && (
            <div
              className={`p-4 rounded-lg border text-xs leading-relaxed ${
                ex5Correct
                  ? 'bg-[#EEFAF8] border-[#9FD9D0] text-[#0E4F47]'
                  : 'bg-[#FFF0F3] border-[#F9B8C6] text-[#9A0023]'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold mb-1">
                {ex5Correct ? (
                  <>
                    <CheckCircle2
                      className="w-4 h-4 text-[#1E9788]"
                      aria-hidden="true"
                    />
                    <span className="text-[#13675D]">{t.correct}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle
                      className="w-4 h-4 text-[#EF0037]"
                      aria-hidden="true"
                    />
                    <span className="text-[#B8002A]">{t.checkAgain}</span>
                  </>
                )}
              </div>
              <p className="text-slate-700">{t.s4Ex5KeyNote}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {t.s4Ticked}:{' '}
            <strong className="text-slate-900">{ex5SelectedIds.length}</strong>{' '}
            / 8
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx5}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx5}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0"
            >
              {t.s4CheckMentionsBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Exercise 6: Insert Specific Phrases a-g into Slots 1-7 */}
      <section
        aria-labelledby="ex6-heading"
        className="bg-white border border-slate-200 rounded-xl"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#13675D] mb-1.5">
              {t.s4Ex6Kicker}
            </div>
            <h2 id="ex6-heading" className="text-2xl font-semibold text-slate-900">
              {t.s4Ex6Heading}
            </h2>
            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
              {t.s4Ex6Desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowBeforeAfter((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              showBeforeAfter
                ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
                : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {showBeforeAfter ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {showBeforeAfter ? t.hideBeforeAfterBtn : t.showBeforeAfterBtn}
            </span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Interactive Live-Enriching Paragraph */}
          <div className="p-6 rounded-xl bg-[#F7F9F9] border border-slate-200 text-[16px] leading-[2.2] text-slate-900">
            The main benefit {renderSlotButton(1)} for secondary school children
            is that they are educational, because children learn{' '}
            {renderSlotButton(2)} by seeing and doing even more than from books.
            For example, if children {renderSlotButton(3)} are taken to a museum{' '}
            {renderSlotButton(4)} they can see real objects and watch films{' '}
            {renderSlotButton(5)}. As a result, they are more likely to remember{' '}
            {renderSlotButton(6)} knowledge {renderSlotButton(7)}.
          </div>

          {/* Active Slot Phrase Bank */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-slate-900">
                {t.activeSpace}:{' '}
                <span className="font-mono tabular-nums text-[#EF0037]">
                  #{activeSlot}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveSlot((s) => Math.max(1, s - 1))}
                  disabled={activeSlot === 1}
                  className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 text-slate-700 hover:border-[#1E9788] hover:text-[#13675D] disabled:opacity-40 whitespace-nowrap shrink-0"
                >
                  {t.previousBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlot((s) => Math.min(7, s + 1))}
                  disabled={activeSlot === 7}
                  className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 text-slate-700 hover:border-[#1E9788] hover:text-[#13675D] disabled:opacity-40 whitespace-nowrap shrink-0"
                >
                  {t.nextBtn}
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              {EX6_PHRASES.map((phrase) => {
                const isAssignedHere = ex6Answers[activeSlot] === phrase.id;
                const isUsedElsewhere =
                  usedPhraseIds.has(phrase.id) && !isAssignedHere;
                return (
                  <button
                    key={phrase.id}
                    type="button"
                    onClick={() => handlePickPhrase(phrase.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors flex items-baseline gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                      isAssignedHere
                        ? 'bg-[#1E9788] text-white border-[#1E9788] font-medium'
                        : isUsedElsewhere
                          ? 'bg-slate-50 text-slate-400 border-slate-200 line-through hover:text-slate-700'
                          : 'bg-white text-slate-900 border-slate-200 hover:border-[#1E9788] hover:bg-[#EEFAF8]/50'
                    }`}
                  >
                    <span
                      className={`font-mono font-bold text-xs shrink-0 ${
                        isAssignedHere ? 'text-white' : 'text-[#EF0037]'
                      }`}
                    >
                      {phrase.id}
                    </span>
                    <span className="flex-1">
                      <span>{phrase.text}</span>
                      {lang === 'vi' && !isAssignedHere && (
                        <span className="block text-xs text-slate-500 no-underline mt-0.5">
                          {phrase.textVi}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {ex6Checked && (
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-700 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                {isEx6SlotCorrect(
                  activeSlot,
                  ex6Answers[activeSlot],
                  ex6Answers
                ) ? (
                  <span className="inline-flex items-center gap-1 font-medium text-[#13675D]">
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-[#1E9788]"
                      aria-hidden="true"
                    />
                    {t.correct}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-medium text-[#B8002A]">
                    <AlertCircle
                      className="w-3.5 h-3.5 text-[#EF0037]"
                      aria-hidden="true"
                    />
                    {t.keyPrefix}: {activeSlotMeta.primaryKey} (
                    {getPhraseText(activeSlotMeta.primaryKey)})
                  </span>
                )}
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span>
                  {lang === 'vi' ? activeSlotMeta.hintVi : activeSlotMeta.hintEn}
                </span>
              </div>
            )}
          </div>

          {/* Complete Answer Key Grid when checked */}
          {ex6Checked && (
            <div className="space-y-3 border-t border-slate-200 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-800">
                  {t.ex6KeyOverview}
                </span>
                <span className="text-xs text-slate-500">{t.ex6AltNote}</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {EX6_SLOTS.map((slot) => {
                  const right = isEx6SlotCorrect(
                    slot.id,
                    ex6Answers[slot.id],
                    ex6Answers
                  );
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setActiveSlot(slot.id)}
                      className={`p-2 rounded-lg border text-left transition-colors ${
                        activeSlot === slot.id ? 'ring-2 ring-[#1E9788]/40' : ''
                      } ${
                        right
                          ? 'bg-[#EEFAF8] border-[#9FD9D0] text-[#0E4F47]'
                          : 'bg-[#FFF0F3] border-[#F9B8C6] text-[#9A0023]'
                      }`}
                    >
                      <div className="font-mono tabular-nums text-[11px] opacity-75">
                        #{slot.id}
                      </div>
                      <div className="font-mono text-xs font-bold mt-0.5">
                        {slot.primaryKey}
                        {slot.id === 2 ? ' (e)' : slot.id === 5 ? ' (f)' : ''}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Before & After Comparison Drawer */}
          {showBeforeAfter && (
            <div className="grid gap-4 md:grid-cols-2 border-t border-slate-200 pt-5">
              <div className="p-4 rounded-xl bg-[#F7F9F9] border border-slate-200 space-y-2">
                <div className="text-xs font-semibold text-slate-600">
                  {t.beforeLabel}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  The main benefit for secondary school children is that they are
                  educational, because children learn by seeing and doing even
                  more than from books. For example, if children are taken to a
                  museum they can see real objects and watch films. As a result,
                  they are more likely to remember knowledge.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#EEFAF8]/60 border border-[#9FD9D0] space-y-2">
                <div className="text-xs font-semibold text-[#13675D]">
                  {t.afterLabel}
                </div>
                <p className="text-sm text-slate-900 leading-relaxed">
                  {ENRICHED_MODEL_PARAGRAPH}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {ex6Checked ? (
              <span>
                {t.score}:{' '}
                <strong className="text-slate-900">{ex6Score} / 7</strong>
              </span>
            ) : (
              <span>
                {t.completed}:{' '}
                <strong className="text-slate-900">
                  {Object.keys(ex6Answers).length} / 7
                </strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx6}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx6}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0"
            >
              {t.checkPhrasesBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Exercise 7: How does the extra information improve the paragraph? */}
      <section
        aria-labelledby="ex7-heading"
        className="bg-white border border-slate-200 rounded-xl"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s4Ex7Kicker}
          </div>
          <h2 id="ex7-heading" className="text-2xl font-semibold text-slate-900">
            {t.s4Ex7Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s4Ex7Desc}
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          <div className="grid gap-3">
            {EX7_OPTIONS.map((opt) => {
              const selected = ex7Answer === opt.id;
              const isRightOpt = opt.id === '2';

              let cls =
                'bg-white border-slate-200 text-slate-800 hover:border-[#9FD9D0]';
              if (ex7Checked) {
                if (selected && isRightOpt) {
                  cls = 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47] font-medium';
                } else if (selected && !isRightOpt) {
                  cls = 'bg-[#FFF0F3] border-[#EF0037] text-[#9A0023] font-medium';
                }
              } else if (selected) {
                cls = 'bg-[#EEFAF8]/60 border-[#1E9788] text-[#0E4F47] font-medium';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectEx7(opt.id)}
                  aria-pressed={selected}
                  className={`w-full text-left px-4 py-3.5 rounded-lg border text-sm transition-colors flex items-baseline gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${cls}`}
                >
                  <span className="font-mono tabular-nums text-xs font-bold shrink-0">
                    {opt.id}.
                  </span>
                  <span>{lang === 'vi' ? opt.textVi : opt.textEn}</span>
                </button>
              );
            })}
          </div>

          {ex7Checked && (
            <div
              className={`p-4 rounded-lg border text-xs leading-relaxed ${
                ex7Correct
                  ? 'bg-[#EEFAF8] border-[#9FD9D0] text-[#0E4F47]'
                  : 'bg-[#FFF0F3] border-[#F9B8C6] text-[#9A0023]'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold mb-1">
                {ex7Correct ? (
                  <>
                    <CheckCircle2
                      className="w-4 h-4 text-[#1E9788]"
                      aria-hidden="true"
                    />
                    <span className="text-[#13675D]">
                      {t.correct} ({t.keyPrefix}: 2)
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle
                      className="w-4 h-4 text-[#EF0037]"
                      aria-hidden="true"
                    />
                    <span className="text-[#B8002A]">
                      {t.checkAgain} ({t.keyPrefix}: 2)
                    </span>
                  </>
                )}
              </div>
              <p className="text-slate-700">{t.s4Ex7Explanation}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onResetEx7}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{t.reset}</span>
          </button>
          <button
            type="button"
            onClick={onCheckEx7}
            disabled={!ex7Answer}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
          >
            {t.s4Ex7CheckBtn}
          </button>
        </div>
      </section>
    </div>
  );
}
