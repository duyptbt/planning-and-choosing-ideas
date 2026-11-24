import { useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff, RotateCcw } from 'lucide-react';
import {
  EX3_CRITIQUE_OPTIONS,
  EX3_INTRODUCTIONS,
} from '../data/lessonData';
import { Language, UI_TEXT } from '../data/i18n';

interface Stage2Props {
  lang: Language;
  selectedIntro: '1' | '2' | '3' | null;
  ex3Checked: boolean;
  ex3Matches: Record<'1' | '2' | '3', string>;
  ex3MatchChecked: boolean;
  onSelectIntro: (id: '1' | '2' | '3') => void;
  onCheckEx3: () => void;
  onResetEx3: () => void;
  onSetEx3Match: (introId: '1' | '2' | '3', critiqueKey: string) => void;
  onCheckEx3Matches: () => void;
  onResetEx3Matches: () => void;
}

export default function Stage2Introductions({
  lang,
  selectedIntro,
  ex3Checked,
  ex3Matches,
  ex3MatchChecked,
  onSelectIntro,
  onCheckEx3,
  onResetEx3,
  onSetEx3Match,
  onCheckEx3Matches,
  onResetEx3Matches,
}: Stage2Props) {
  const [showOverlay, setShowOverlay] = useState(false);
  const t = UI_TEXT[lang];

  const isChoiceCorrect = selectedIntro === '2';
  const matchScore = EX3_INTRODUCTIONS.filter(
    (intro) => ex3Matches[intro.id] === intro.verdictKey
  ).length;
  const matchedCount = EX3_INTRODUCTIONS.filter((intro) =>
    Boolean(ex3Matches[intro.id])
  ).length;

  return (
    <div className="space-y-8">
      {/* Exercise 3A: Choose the most suitable introduction */}
      <section
        aria-labelledby="ex3-heading"
        className="bg-white border border-slate-200 rounded-xl"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#13675D] mb-1.5">
              {t.s2Ex3Kicker}
            </div>
            <h2 id="ex3-heading" className="text-2xl font-semibold text-slate-900">
              {t.s2Ex3Heading}
            </h2>
            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
              {t.s2Ex3Desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowOverlay((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
              showOverlay
                ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
                : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {showOverlay ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{showOverlay ? t.hideOverlay : t.compareStructure}</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {showOverlay && (
            <div className="p-3.5 rounded-lg bg-[#F7F9F9] border border-slate-200 text-xs text-slate-700 flex flex-wrap gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-3 rounded bg-[#D7F4EF] border border-[#9FD9D0]"
                  aria-hidden="true"
                />
                {t.legendGeneral}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-3 rounded bg-[#B7EAE2] border border-[#1E9788]"
                  aria-hidden="true"
                />
                {t.legendOrganization}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-3 rounded bg-[#FFE2E9] border border-[#F9B8C6]"
                  aria-hidden="true"
                />
                {t.legendSpoken}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-3 rounded bg-amber-100 border border-amber-300"
                  aria-hidden="true"
                />
                {t.legendOverspecific}
              </span>
            </div>
          )}

          <div className="grid gap-4">
            {EX3_INTRODUCTIONS.map((intro) => {
              const isSelected = selectedIntro === intro.id;
              const isBest = intro.id === '2';

              let borderClass =
                'border-slate-200 hover:border-[#9FD9D0] bg-white';
              if (ex3Checked) {
                if (isBest && isSelected) {
                  borderClass = 'border-[#1E9788] bg-[#EEFAF8]/60';
                } else if (isSelected && !isBest) {
                  borderClass = 'border-[#EF0037] bg-[#FFF0F3]/60';
                } else if (isBest) {
                  borderClass = 'border-[#9FD9D0] bg-[#EEFAF8]/30';
                }
              } else if (isSelected) {
                borderClass = 'border-[#1E9788] bg-[#EEFAF8]/50';
              }

              return (
                <button
                  key={intro.id}
                  type="button"
                  onClick={() => onSelectIntro(intro.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-5 rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${borderClass}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-mono tabular-nums font-semibold border ${
                          isSelected
                            ? 'bg-[#1E9788] text-white border-[#1E9788]'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {intro.id}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {t.introLabel} {intro.id}
                      </span>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-slate-500">
                      {intro.wordCount} {t.wordsUnit}
                    </span>
                  </div>

                  <p className="text-[15px] leading-relaxed text-slate-800">
                    {showOverlay
                      ? intro.segments.map((seg, idx) => {
                          let highlightCls = '';
                          if (seg.highlight === 'spoken') {
                            highlightCls =
                              'bg-[#FFE2E9] text-[#9A0023] px-1 rounded';
                          } else if (seg.highlight === 'general') {
                            highlightCls =
                              'bg-[#D7F4EF] text-[#0E4F47] px-1 rounded';
                          } else if (seg.highlight === 'organization') {
                            highlightCls =
                              'bg-[#B7EAE2] text-[#0B3D37] px-1 rounded font-medium';
                          } else if (seg.highlight === 'overspecific') {
                            highlightCls =
                              'bg-amber-100 text-amber-950 px-1 rounded';
                          }
                          return (
                            <span
                              key={idx}
                              className={highlightCls}
                              title={lang === 'vi' ? seg.noteVi : seg.noteEn}
                            >
                              {seg.text}
                            </span>
                          );
                        })
                      : intro.text}
                  </p>
                </button>
              );
            })}
          </div>

          {ex3Checked && (
            <div
              className={`p-4 rounded-lg border text-sm leading-relaxed ${
                selectedIntro
                  ? isChoiceCorrect
                    ? 'bg-[#EEFAF8] border-[#9FD9D0] text-[#0E4F47]'
                    : 'bg-[#FFF0F3] border-[#F9B8C6] text-[#9A0023]'
                  : 'bg-[#F7F9F9] border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                {selectedIntro ? (
                  isChoiceCorrect ? (
                    <>
                      <CheckCircle2
                        className="w-4 h-4 text-[#1E9788] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-[#13675D]">{t.s2CorrectTitle}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle
                        className="w-4 h-4 text-[#EF0037] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-[#B8002A]">{t.s2WrongTitle}</span>
                    </>
                  )
                ) : (
                  <span className="text-slate-800">{t.s2KeyTitle}</span>
                )}
              </div>
              <p className="text-slate-700 text-[13px]">{t.s2Explanation}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-slate-600">
            {selectedIntro
              ? `${t.selectedIntroPrefix} ${selectedIntro}`
              : t.selectIntroPrompt}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx3}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx3}
              disabled={!selectedIntro}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
            >
              {t.checkChoiceBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Exercise 3B: Explain your choice using the table in Exercise 2 */}
      <section
        aria-labelledby="ex3-justify-heading"
        className="bg-white border border-slate-200 rounded-xl"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s2JustifyKicker}
          </div>
          <h2
            id="ex3-justify-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            {t.s2JustifyHeading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s2JustifyDesc}
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {EX3_INTRODUCTIONS.map((intro) => {
            const chosen = ex3Matches[intro.id] ?? '';
            const isCorrect = chosen === intro.verdictKey;

            return (
              <div key={intro.id} className="px-6 py-5 sm:px-8 space-y-2.5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#1E9788]">
                      0{intro.id}.
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {t.introLabel} {intro.id}
                    </span>
                  </div>

                  <div className="w-full md:w-[420px]">
                    <label
                      htmlFor={`ex3-match-${intro.id}`}
                      className="sr-only"
                    >
                      {t.introLabel} {intro.id}
                    </label>
                    <select
                      id={`ex3-match-${intro.id}`}
                      value={chosen}
                      onChange={(e) => onSetEx3Match(intro.id, e.target.value)}
                      className={`w-full px-3 py-2 text-sm rounded-lg border bg-white text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                        ex3MatchChecked
                          ? isCorrect
                            ? 'border-[#1E9788] bg-[#EEFAF8]/50'
                            : 'border-[#EF0037] bg-[#FFF0F3]/50'
                          : 'border-slate-300'
                      }`}
                    >
                      <option value="">{t.s2ChooseReason}</option>
                      {EX3_CRITIQUE_OPTIONS.map((opt) => (
                        <option key={opt.key} value={opt.key}>
                          {lang === 'vi' ? opt.labelVi : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {ex3MatchChecked && (
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
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
                        {t.checkAgain}
                      </span>
                    )}
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <span className="text-slate-600">
                      {lang === 'vi' ? intro.feedbackVi : intro.feedbackEn}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {ex3MatchChecked ? (
              <span>
                {t.score}:{' '}
                <strong className="text-slate-900">{matchScore} / 3</strong>
              </span>
            ) : (
              <span>
                {t.s2Matched}:{' '}
                <strong className="text-slate-900">{matchedCount} / 3</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetEx3Matches}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx3Matches}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0"
            >
              {t.s2CheckJustifyBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
