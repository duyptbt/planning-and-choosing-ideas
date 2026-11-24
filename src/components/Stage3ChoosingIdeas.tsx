import { AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import {
  EX4_IDEA_BUBBLES,
  IdeaCategory,
  StanceChoice,
} from '../data/lessonData';
import { Language, UI_TEXT } from '../data/i18n';

interface Stage3Props {
  lang: Language;
  ex4Categories: Record<number, IdeaCategory>;
  ex4Stances: Record<number, StanceChoice>;
  ex4Checked: boolean;
  onSetCategory: (ideaId: number, category: IdeaCategory) => void;
  onSetStance: (ideaId: number, stance: StanceChoice) => void;
  onCheckEx4: () => void;
  onResetEx4: () => void;
}

export default function Stage3ChoosingIdeas({
  lang,
  ex4Categories,
  ex4Stances,
  ex4Checked,
  onSetCategory,
  onSetStance,
  onCheckEx4,
  onResetEx4,
}: Stage3Props) {
  const t = UI_TEXT[lang];

  const sortedCount = Object.keys(ex4Categories).length;
  const correctCount = EX4_IDEA_BUBBLES.filter(
    (item) => ex4Categories[item.id] === item.correctCategory
  ).length;

  const sortedAdvantages = EX4_IDEA_BUBBLES.filter(
    (item) => ex4Categories[item.id] === 'advantage'
  );
  const sortedDisadvantages = EX4_IDEA_BUBBLES.filter(
    (item) => ex4Categories[item.id] === 'disadvantage'
  );

  return (
    <div className="space-y-8">
      {/* Exercise 4: Sort 8 Ideas into Advantages & Disadvantages */}
      <section
        aria-labelledby="ex4-heading"
        className="bg-white border border-slate-200 rounded-xl"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s3Ex4Kicker}
          </div>
          <h2 id="ex4-heading" className="text-2xl font-semibold text-slate-900">
            {t.s3Ex4Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s3Ex4Desc}
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {EX4_IDEA_BUBBLES.map((item) => {
            const chosen = ex4Categories[item.id];
            const stance = ex4Stances[item.id];
            const isCorrect = chosen === item.correctCategory;

            return (
              <div key={item.id} className="px-6 py-5 sm:px-8 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono tabular-nums font-semibold text-slate-800 shrink-0 mt-0.5">
                      {item.id}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-slate-900 leading-snug">
                        {item.textEn}
                      </p>
                      {lang === 'vi' && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.textVi}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Advantage vs Disadvantage segmented toggle */}
                  <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => onSetCategory(item.id, 'advantage')}
                      aria-pressed={chosen === 'advantage'}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                        chosen === 'advantage'
                          ? 'bg-[#1E9788] text-white shadow-sm'
                          : 'text-slate-700 hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      {t.advantageLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => onSetCategory(item.id, 'disadvantage')}
                      aria-pressed={chosen === 'disadvantage'}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037] ${
                        chosen === 'disadvantage'
                          ? 'bg-[#EF0037] text-white shadow-sm'
                          : 'text-slate-700 hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      {t.disadvantageLabel}
                    </button>
                  </div>
                </div>

                {/* Personal stance row ("Decide whether you agree with the ideas") */}
                <div className="pl-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                  <span className="text-slate-500 font-medium">
                    {t.yourStance}
                  </span>
                  <div className="inline-flex items-center gap-1.5">
                    {(
                      [
                        { id: 'agree', label: t.agreeLabel },
                        { id: 'disagree', label: t.disagreeLabel },
                        { id: 'unsure', label: t.unsureLabel },
                      ] as const
                    ).map((opt) => {
                      const active = stance === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onSetStance(item.id, opt.id)}
                          aria-pressed={active}
                          className={`px-2.5 py-1 rounded-md border text-xs transition-colors whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-slate-900 text-white border-slate-900 font-medium'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {ex4Checked && (
                  <div className="pl-9 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                    {isCorrect ? (
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
                        {t.keyPrefix}:{' '}
                        {item.correctCategory === 'advantage'
                          ? t.advantageLabel
                          : t.disadvantageLabel}
                      </span>
                    )}
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <span className="text-slate-600">
                      {lang === 'vi' ? item.explanationVi : item.explanationEn}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {ex4Checked ? (
              <span>
                {t.score}:{' '}
                <strong className="text-slate-900">
                  {correctCount} / {EX4_IDEA_BUBBLES.length}
                </strong>
              </span>
            ) : (
              <span>
                {t.sortedCount}:{' '}
                <strong className="text-slate-900">
                  {sortedCount} / {EX4_IDEA_BUBBLES.length}
                </strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx4}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx4}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0"
            >
              {t.checkSortingBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Live Two-Column Sorted Overview + Linking Tip */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {t.s3SummaryTitle}
        </h3>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="p-5 rounded-xl bg-[#EEFAF8]/60 border border-[#9FD9D0] space-y-2.5">
            <div className="text-xs font-semibold text-[#13675D]">
              {t.s3AdvBucketTitle}
            </div>
            {sortedAdvantages.length === 0 ? (
              <p className="text-xs text-slate-500 italic">—</p>
            ) : (
              <ul className="space-y-1.5 text-sm text-slate-800">
                {sortedAdvantages.map((item) => (
                  <li key={item.id} className="flex items-baseline gap-2">
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#13675D]">
                      {item.id}.
                    </span>
                    <span>{item.textEn}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-5 rounded-xl bg-[#FFF0F3]/60 border border-[#F9B8C6] space-y-2.5">
            <div className="text-xs font-semibold text-[#B8002A]">
              {t.s3DisadvBucketTitle}
            </div>
            {sortedDisadvantages.length === 0 ? (
              <p className="text-xs text-slate-500 italic">—</p>
            ) : (
              <ul className="space-y-1.5 text-sm text-slate-800">
                {sortedDisadvantages.map((item) => (
                  <li key={item.id} className="flex items-baseline gap-2">
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#B8002A]">
                      {item.id}.
                    </span>
                    <span>{item.textEn}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed pt-1">
          {t.s3LinkNote}
        </p>
      </section>
    </div>
  );
}
