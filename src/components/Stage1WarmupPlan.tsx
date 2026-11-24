import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ImageOff,
  Plus,
  RotateCcw,
} from 'lucide-react';
import {
  EX1_PICTURES,
  EX1_SAMPLE_ANSWER,
  EX2_PLAN_ROWS,
  evaluateEx2Row,
} from '../data/lessonData';
import { Language, UI_TEXT } from '../data/i18n';

interface Stage1Props {
  lang: Language;
  ex1Notes: { picA: string; picB: string; learningLink: string };
  ex2Answers: Record<number, string>;
  ex2Checked: boolean;
  onUpdateEx1Note: (field: 'picA' | 'picB' | 'learningLink', value: string) => void;
  onResetEx1: () => void;
  onUpdateEx2: (rowNumber: number, value: string) => void;
  onFillEx2Samples: () => void;
  onCheckEx2: () => void;
  onResetEx2: () => void;
}

export default function Stage1WarmupPlan({
  lang,
  ex1Notes,
  ex2Answers,
  ex2Checked,
  onUpdateEx1Note,
  onResetEx1,
  onUpdateEx2,
  onFillEx2Samples,
  onCheckEx2,
  onResetEx2,
}: Stage1Props) {
  const [showEx1Sample, setShowEx1Sample] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const t = UI_TEXT[lang];

  const blankRows = EX2_PLAN_ROWS.filter((r) => r.isBlank);
  const filledCount = blankRows.filter(
    (r) => (ex2Answers[r.rowNumber] ?? '').trim().length > 0
  ).length;
  const correctCount = blankRows.filter((r) =>
    evaluateEx2Row(r, ex2Answers[r.rowNumber] ?? '')
  ).length;

  const ex1HasNotes =
    ex1Notes.picA.trim().length > 0 ||
    ex1Notes.picB.trim().length > 0 ||
    ex1Notes.learningLink.trim().length > 0;

  const handleAppendKeyword = (rowNumber: number, keyword: string) => {
    const current = (ex2Answers[rowNumber] ?? '').trim();
    if (current.toLowerCase().includes(keyword.toLowerCase())) return;
    const next = current ? `${current}, ${keyword}` : keyword;
    onUpdateEx2(rowNumber, next);
  };

  return (
    <div className="space-y-8">
      {/* Exercise 1: Visual Warm-up */}
      <section
        aria-labelledby="ex1-heading"
        className="bg-white border border-slate-200 rounded-xl"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#13675D] mb-1.5">
              {t.s1Ex1Kicker}
            </div>
            <h2 id="ex1-heading" className="text-2xl font-semibold text-slate-900">
              {t.s1Ex1Heading}
            </h2>
            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
              {t.s1Ex1Desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowEx1Sample((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
              showEx1Sample
                ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
                : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {showEx1Sample ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {showEx1Sample ? t.s1HideSampleBtn : t.s1CompareSampleBtn}
            </span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Authentic Textbook Photos A & B */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {EX1_PICTURES.map((pic) => {
              const colSpan = pic.id === 'A' ? 'md:col-span-5' : 'md:col-span-7';
              const failed = failedImages[pic.id];
              return (
                <figure
                  key={pic.id}
                  className={`${colSpan} flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-[#F7F9F9]`}
                >
                  <div className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden">
                    {!failed ? (
                      <img
                        src={pic.src}
                        alt={pic.alt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [pic.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-500">
                        <ImageOff className="w-6 h-6 mb-2 text-slate-400" aria-hidden="true" />
                        <span className="text-xs font-medium">{pic.alt}</span>
                      </div>
                    )}
                  </div>
                  <figcaption className="px-4 py-2.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900">
                      {lang === 'vi' ? pic.captionVi : pic.captionEn}
                    </span>
                    <span className="text-slate-500">
                      {pic.id === 'A' ? 'Museum visit' : 'Coastal field study'}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* Interactive Observation Prompts */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="ex1-pic-a"
                className="block text-xs font-semibold text-slate-800"
              >
                {t.s1PicALabel}
              </label>
              <input
                id="ex1-pic-a"
                type="text"
                value={ex1Notes.picA}
                onChange={(e) => onUpdateEx1Note('picA', e.target.value)}
                placeholder={t.s1PicAPlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:border-[#1E9788] focus-visible:outline-2 focus-visible:outline-[#1E9788]/25"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="ex1-pic-b"
                className="block text-xs font-semibold text-slate-800"
              >
                {t.s1PicBLabel}
              </label>
              <input
                id="ex1-pic-b"
                type="text"
                value={ex1Notes.picB}
                onChange={(e) => onUpdateEx1Note('picB', e.target.value)}
                placeholder={t.s1PicBPlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:border-[#1E9788] focus-visible:outline-2 focus-visible:outline-[#1E9788]/25"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label
                htmlFor="ex1-link"
                className="block text-xs font-semibold text-slate-800"
              >
                {t.s1LinkLabel}
              </label>
              <input
                id="ex1-link"
                type="text"
                value={ex1Notes.learningLink}
                onChange={(e) => onUpdateEx1Note('learningLink', e.target.value)}
                placeholder={t.s1LinkPlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:border-[#1E9788] focus-visible:outline-2 focus-visible:outline-[#1E9788]/25"
              />
            </div>
          </div>

          {showEx1Sample && (
            <div className="p-4 rounded-xl bg-[#EEFAF8] border border-[#9FD9D0] space-y-1.5">
              <div className="text-xs font-semibold text-[#13675D]">
                {t.s1SampleTitle}
              </div>
              <p className="text-sm text-[#0E4F47] leading-relaxed">
                {EX1_SAMPLE_ANSWER}
              </p>
              <p className="text-xs text-slate-600 pt-1">{t.s1LocalReflection}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-600">
            {ex1HasNotes ? (
              <span className="inline-flex items-center gap-1.5 text-[#13675D] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#1E9788]" aria-hidden="true" />
                {t.s1NotesStatusDone}
              </span>
            ) : (
              t.s1NotesStatusPending
            )}
          </span>
          <button
            type="button"
            onClick={onResetEx1}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{t.reset}</span>
          </button>
        </div>
      </section>

      {/* Exercise 2: 10-Row Essay Planning Table */}
      <section
        aria-labelledby="ex2-heading"
        className="bg-white border border-slate-200 rounded-xl"
      >
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s1Ex2Kicker}
          </div>
          <h2 id="ex2-heading" className="text-2xl font-semibold text-slate-900">
            {t.s1Ex2Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s1Ex2Desc}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F7F9F9] text-xs font-semibold text-slate-600">
                <th className="py-3 px-6 sm:px-8 w-5/12">{t.s1ColPart}</th>
                <th className="py-3 px-6 sm:px-8">{t.s1ColPlan}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {EX2_PLAN_ROWS.map((row) => {
                const value = ex2Answers[row.rowNumber] ?? '';
                const isCorrect = evaluateEx2Row(row, value);

                return (
                  <tr key={row.rowNumber} className="align-top">
                    <td className="py-4 px-6 sm:px-8 text-slate-800">
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono tabular-nums text-xs font-semibold text-[#1E9788] mt-0.5 w-5 shrink-0">
                          {row.rowNumber}
                        </span>
                        <span className="font-medium leading-snug">
                          {lang === 'vi' ? row.labelVi : row.labelEn}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 sm:px-8 text-slate-700">
                      {!row.isBlank ? (
                        <span
                          className={
                            row.rowNumber === 1
                              ? 'italic text-slate-700'
                              : 'text-slate-900 font-medium'
                          }
                        >
                          {row.fixedValue}
                        </span>
                      ) : (
                        <div className="space-y-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            {row.prefix && (
                              <span className="text-slate-800">{row.prefix}</span>
                            )}
                            <label
                              htmlFor={`ex2-row-${row.rowNumber}`}
                              className="sr-only"
                            >
                              Row {row.rowNumber}: {row.labelEn}
                            </label>
                            <input
                              id={`ex2-row-${row.rowNumber}`}
                              type="text"
                              value={value}
                              onChange={(e) =>
                                onUpdateEx2(row.rowNumber, e.target.value)
                              }
                              placeholder={
                                row.rowNumber === 4
                                  ? '5'
                                  : row.isKeywordList
                                    ? 'zoo, concerts, abroad...'
                                    : '...'
                              }
                              className={`px-3 py-1.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-[#1E9788]/30 ${
                                row.isKeywordList
                                  ? 'w-full sm:w-72'
                                  : row.rowNumber === 4
                                    ? 'w-24 font-mono tabular-nums'
                                    : 'w-44 sm:w-52'
                              } ${
                                ex2Checked
                                  ? isCorrect
                                    ? 'border-[#1E9788] bg-[#EEFAF8]/50 text-[#0E4F47] font-medium'
                                    : 'border-[#EF0037] bg-[#FFF0F3]/50 text-[#9A0023]'
                                  : 'border-slate-300 focus:border-[#1E9788]'
                              }`}
                            />
                            {row.suffix && (
                              <span className="text-slate-800">{row.suffix}</span>
                            )}
                          </div>

                          {/* Clickable keyword helper for Row 5 */}
                          {row.isKeywordList && row.suggestedKeywords && (
                            <div className="space-y-1.5">
                              <div className="text-xs text-slate-500">
                                {t.s1Row5Hint}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {row.suggestedKeywords.map((kw) => {
                                  const used = value
                                    .toLowerCase()
                                    .includes(kw.toLowerCase());
                                  return (
                                    <button
                                      key={kw}
                                      type="button"
                                      onClick={() =>
                                        handleAppendKeyword(row.rowNumber, kw)
                                      }
                                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                                        used
                                          ? 'bg-[#EEFAF8] border-[#9FD9D0] text-[#13675D]'
                                          : 'bg-[#F7F9F9] border-slate-200 text-slate-700 hover:border-[#1E9788] hover:text-[#13675D]'
                                      }`}
                                    >
                                      <Plus className="w-3 h-3" aria-hidden="true" />
                                      <span>{kw}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {ex2Checked && (
                            <div className="text-xs space-y-1">
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
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
                                <span className="text-slate-700">
                                  {t.keyPrefix}:{' '}
                                  <strong className="text-slate-900">
                                    {row.sampleAnswer}
                                  </strong>
                                </span>
                              </div>
                              <p className="text-slate-600 leading-relaxed">
                                {lang === 'vi'
                                  ? row.explanationVi
                                  : row.explanationEn}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-mono tabular-nums">
            {ex2Checked ? (
              <span>
                {t.score}:{' '}
                <strong className="text-slate-900">
                  {correctCount} / {blankRows.length}
                </strong>
              </span>
            ) : (
              <span>
                {t.s1FilledCount}:{' '}
                <strong className="text-slate-900">
                  {filledCount} / {blankRows.length}
                </strong>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onFillEx2Samples}
              className="px-3.5 py-2 text-xs font-semibold text-[#13675D] bg-[#EEFAF8] border border-[#9FD9D0] rounded-lg hover:bg-[#D7F4EF] transition-colors whitespace-nowrap shrink-0"
            >
              {t.s1FillSamplesBtn}
            </button>
            <button
              type="button"
              onClick={onResetEx2}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={onCheckEx2}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#EF0037] rounded-lg hover:bg-[#D40031] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF0037]"
            >
              {t.s1CheckTableBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
