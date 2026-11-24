import { useState } from 'react';
import { Check, CheckCircle2, Eye, EyeOff, RotateCcw } from 'lucide-react';
import {
  ENRICHED_MODEL_PARAGRAPH,
  EX8_PRECISION_HELPERS,
  EX8_STARTER_PRESETS,
  StarterPreset,
} from '../data/lessonData';
import { Language, UI_TEXT } from '../data/i18n';

interface Stage5Props {
  lang: Language;
  activePresetId: StarterPreset['id'];
  draftText: string;
  checklist: Record<string, boolean>;
  onSelectPreset: (presetId: StarterPreset['id']) => void;
  onChangeDraft: (text: string) => void;
  onResetDraft: () => void;
  onToggleChecklist: (key: string) => void;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export default function Stage5WriteParagraph({
  lang,
  activePresetId,
  draftText,
  checklist,
  onSelectPreset,
  onChangeDraft,
  onResetDraft,
  onToggleChecklist,
}: Stage5Props) {
  const [showModelRef, setShowModelRef] = useState(false);
  const [showSampleComparison, setShowSampleComparison] = useState(false);

  const t = UI_TEXT[lang];
  const currentPreset =
    EX8_STARTER_PRESETS.find((p) => p.id === activePresetId) ??
    EX8_STARTER_PRESETS[0];

  const wordCount = countWords(draftText);
  const inTargetRange = wordCount >= 60 && wordCount <= 85;
  const wordCountStatus =
    wordCount <= countWords(currentPreset.starterText)
      ? t.statusStart
      : wordCount < 60
        ? t.statusAim
        : inTargetRange
          ? t.statusTarget
          : t.statusAbove;

  const insertHelper = (phrase: string) => {
    const trimmed = draftText.trimEnd();
    const spacer = trimmed.length === 0 ? '' : ' ';
    onChangeDraft(`${trimmed}${spacer}${phrase} `);
  };

  const helperUsage = EX8_PRECISION_HELPERS.map((phrase) => {
    const clean = phrase.replace(',', '').toLowerCase();
    return {
      phrase,
      used: draftText.toLowerCase().includes(clean),
    };
  });

  const checklistItems = [
    { key: 'topic', text: t.check1 },
    { key: 'example', text: t.check2 },
    { key: 'details', text: t.check3 },
    { key: 'result', text: t.check4 },
  ];

  return (
    <section
      aria-labelledby="ex8-heading"
      className="bg-white border border-slate-200 rounded-xl"
    >
      <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-[#13675D] mb-1.5">
            {t.s5Ex8Kicker}
          </div>
          <h2 id="ex8-heading" className="text-2xl font-semibold text-slate-900">
            {t.s5Ex8Heading}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            {t.s5Ex8Desc}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModelRef((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
            showModelRef
              ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
              : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {showModelRef ? (
            <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span>{showModelRef ? t.hideModelRefBtn : t.viewModelRefBtn}</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Optional Exercise 5-6 Model Reference */}
        {showModelRef && (
          <div className="p-5 rounded-xl bg-[#EEFAF8]/60 border border-[#9FD9D0] space-y-2">
            <div className="text-xs font-semibold text-[#13675D]">
              {t.modelRefTitle}
            </div>
            <p className="text-sm text-slate-900 leading-relaxed">
              {ENRICHED_MODEL_PARAGRAPH}
            </p>
          </div>
        )}

        {/* Starter Preset Selector */}
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-slate-700">
            {t.chooseFocusLabel}
          </div>
          <div className="flex flex-wrap gap-2">
            {EX8_STARTER_PRESETS.map((preset) => {
              const active = preset.id === activePresetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset.id)}
                  aria-pressed={active}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
                    active
                      ? 'bg-[#1E9788] text-white border-[#1E9788]'
                      : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:border-[#1E9788] hover:text-[#13675D]'
                  }`}
                >
                  {lang === 'vi' ? preset.labelVi : preset.labelEn}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-500">
            {lang === 'vi' ? currentPreset.focusVi : currentPreset.focusEn}
          </p>
        </div>

        {/* Clickable Precision & Linking Phrases */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-slate-600">
            {t.precisionHelpersPrompt}
          </div>
          <div className="flex flex-wrap gap-2">
            {helperUsage.map(({ phrase, used }) => (
              <button
                key={phrase}
                type="button"
                onClick={() => insertHelper(phrase)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                  used
                    ? 'bg-[#EEFAF8] border-[#1E9788] text-[#0E4F47]'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-[#1E9788] hover:bg-[#EEFAF8]/50'
                }`}
              >
                {used && (
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-[#1E9788]"
                    aria-hidden="true"
                  />
                )}
                <span>{phrase}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Guided Writing Textarea */}
        <div>
          <label htmlFor="ex8-paragraph-draft" className="sr-only">
            {t.s5Ex8Heading}
          </label>
          <textarea
            id="ex8-paragraph-draft"
            rows={7}
            value={draftText}
            onChange={(e) => onChangeDraft(e.target.value)}
            placeholder={t.draftPlaceholder}
            className="w-full p-4 rounded-xl border border-slate-300 bg-white text-[15px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-[#1E9788] focus-visible:outline-2 focus-visible:outline-[#1E9788]/25 resize-y"
          />
        </div>

        {/* Live Metrics & Compare Sample Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600">
            <span className="font-mono tabular-nums">
              {t.wordsCounterLabel}:{' '}
              <strong
                className={inTargetRange ? 'text-[#13675D]' : 'text-slate-900'}
              >
                {wordCount}
              </strong>{' '}
              / {t.targetWordRange}
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span
              className={
                inTargetRange ? 'text-[#13675D] font-medium' : 'text-slate-600'
              }
            >
              {wordCountStatus}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowSampleComparison((prev) => !prev)}
            className="text-xs font-semibold text-[#B8002A] hover:text-[#EF0037] underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            {showSampleComparison ? t.hideSampleBtn : t.compareSampleBtn}
          </button>
        </div>

        {showSampleComparison && (
          <div className="p-5 rounded-xl bg-[#F7F9F9] border border-slate-200 space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-900">
                {t.modelSampleTitle}
              </span>
              <span className="font-mono tabular-nums text-slate-500">
                {countWords(currentPreset.sampleParagraph)} {t.wordsUnit}
              </span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed">
              {currentPreset.sampleParagraph}
            </p>
          </div>
        )}

        {/* Self-Check Rubric */}
        <div className="pt-5 border-t border-slate-200 space-y-3">
          <div className="text-xs font-semibold text-slate-800">
            {t.checklistTitle}
          </div>
          <div className="grid gap-2">
            {checklistItems.map((item) => {
              const checked = Boolean(checklist[item.key]);
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onToggleChecklist(item.key)}
                  aria-pressed={checked}
                  className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F7F9F9] transition-colors"
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
                  <span
                    className={`text-sm leading-snug ${
                      checked ? 'text-slate-900 font-medium' : 'text-slate-700'
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 sm:px-8 bg-[#F7F9F9] border-t border-slate-200 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs text-slate-600">{t.autoSaveNote}</span>
        <button
          type="button"
          onClick={onResetDraft}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{t.resetDraftBtn}</span>
        </button>
      </div>
    </section>
  );
}
