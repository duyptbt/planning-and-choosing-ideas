import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { STAGES, StageId, TASK_PROMPT } from '../data/lessonData';
import { Language, STAGES_I18N, UI_TEXT } from '../data/i18n';

interface TaskPromptPanelProps {
  lang: Language;
  activeStage: StageId;
}

export default function TaskPromptPanel({
  lang,
  activeStage,
}: TaskPromptPanelProps) {
  const [highlightParts, setHighlightParts] = useState(false);
  const t = UI_TEXT[lang];
  const currentStage = STAGES.find((s) => s.id === activeStage) ?? STAGES[0];
  const currentStageCopy = STAGES_I18N[lang][currentStage.id];

  return (
    <aside className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200 overflow-hidden">
      {/* Section 1: Official Writing Task 2 Essay Question */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="text-base font-semibold text-slate-900">
            {t.task2PromptTitle}
          </h2>
          <button
            type="button"
            onClick={() => setHighlightParts((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E9788] ${
              highlightParts
                ? 'bg-[#EEFAF8] text-[#13675D] border-[#9FD9D0]'
                : 'bg-[#F7F9F9] text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {highlightParts ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{highlightParts ? t.hide3Parts : t.highlight3Parts}</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          {TASK_PROMPT.timingInstruction}
        </p>

        <div className="bg-[#F7F9F9] border border-slate-200 rounded-lg p-4 text-[14px] leading-relaxed text-slate-800 italic space-y-2.5">
          <p>
            <span
              className={
                highlightParts
                  ? 'bg-[#D7F4EF] text-[#0E4F47] px-1 rounded not-italic font-medium'
                  : ''
              }
            >
              {TASK_PROMPT.part1Topic}
            </span>{' '}
            <span
              className={
                highlightParts
                  ? 'bg-[#FFE2E9] text-[#9A0023] px-1 rounded not-italic font-medium'
                  : ''
              }
            >
              {TASK_PROMPT.part2Question}
            </span>
          </p>
          <p>
            <span
              className={
                highlightParts
                  ? 'bg-slate-200 text-slate-950 px-1 rounded not-italic font-medium'
                  : ''
              }
            >
              {TASK_PROMPT.part3Instruction}
            </span>
          </p>
        </div>

        {lang === 'vi' && (
          <div className="mt-3 p-3 rounded-lg bg-[#FFF0F3]/60 border border-[#F9B8C6]/70 text-xs text-slate-700 leading-relaxed">
            <span className="font-semibold text-[#B8002A] mr-1">
              {t.viPromptTranslationTitle}
            </span>
            <span>{t.viPromptTranslation}</span>
          </div>
        )}

        {highlightParts && (
          <div className="mt-3 space-y-1.5 text-xs text-slate-700">
            <div className="flex items-baseline gap-2">
              <span className="font-mono tabular-nums font-semibold text-[#13675D] shrink-0">
                {t.part1Label}
              </span>
              <span>{t.part1Desc}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono tabular-nums font-semibold text-[#B8002A] shrink-0">
                {t.part2Label}
              </span>
              <span>{t.part2Desc}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono tabular-nums font-semibold text-slate-900 shrink-0">
                {t.part3Label}
              </span>
              <span>{t.part3Desc}</span>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Strategy & Exam Information */}
      <div className="p-6 space-y-5">
        <div>
          <h3 className="text-xs font-semibold text-[#13675D] mb-1.5">
            {t.strategyTitle}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t.strategyBody}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-semibold text-[#B8002A] mb-1.5">
            {t.examInfoTitle}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t.examInfoBody}
          </p>
        </div>
      </div>

      {/* Section 3: Contextual Stage Guidance */}
      <div className="p-6 bg-[#EEFAF8]/65">
        <div className="text-xs font-medium text-[#13675D] mb-1.5">
          {t.stageGuidancePrefix} {currentStage.number}
          {t.stageGuidanceSuffix ? ` ${t.stageGuidanceSuffix}` : ''} ·{' '}
          {currentStageCopy.exercisesLabel}
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {currentStageCopy.teacherTip}
        </p>
      </div>
    </aside>
  );
}
