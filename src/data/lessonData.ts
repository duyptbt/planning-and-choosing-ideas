export type StageId =
  | 'warmup-plan'
  | 'introductions'
  | 'sorting-ideas'
  | 'model-details'
  | 'write-paragraph';

export interface StageMeta {
  id: StageId;
  number: string;
}

export const STAGES: StageMeta[] = [
  { id: 'warmup-plan', number: '01' },
  { id: 'introductions', number: '02' },
  { id: 'sorting-ideas', number: '03' },
  { id: 'model-details', number: '04' },
  { id: 'write-paragraph', number: '05' },
];

export const LESSON_INFO = {
  appTitle: 'Writing Task 2 - Level B1 (4.0 Plus)',
  subtitle: 'Planning and Choosing Ideas',
  unitLabel: 'Unit 3 · Giving structure to our world',
  aim: 'Plan an advantages and disadvantages essay, choose and sort ideas, add specific details, and write a structured body paragraph about a benefit.',
};

export const TASK_PROMPT = {
  timingInstruction:
    'In the exam you have 40 minutes to write a minimum of 250 words. Write about the following topic:',
  part1Topic:
    'Children at secondary school are often taken on visits to museums, zoos and concerts and sometimes even to other countries.',
  part2Question:
    'What do you think the advantages and disadvantages of such visits are?',
  part3Instruction:
    'Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
};

// Exercise 1: Visual Warm-up Pictures A & B
export interface WarmupPicture {
  id: 'A' | 'B';
  src: string;
  alt: string;
  captionEn: string;
  captionVi: string;
}

export const EX1_PICTURES: WarmupPicture[] = [
  {
    id: 'A',
    src: '/assets/images/ex1_picture_a.jpg',
    alt: 'Students and visitors walking around a large space capsule exhibit inside a museum hall.',
    captionEn: 'Picture A',
    captionVi: 'Hình A',
  },
  {
    id: 'B',
    src: '/assets/images/ex1_picture_b.jpg',
    alt: 'A group of young students with an instructor examining rocks and tide pools at the rocky seaside.',
    captionEn: 'Picture B',
    captionVi: 'Hình B',
  },
];

export const EX1_SAMPLE_ANSWER =
  'In picture A, people, including young people, are visiting a museum and looking at exhibits. In picture B, young people are looking at rocks and water at the seaside. Young people are learning outside the classroom.';

// Exercise 2: 10-Row Essay Planning Table
export interface Ex2PlanRow {
  rowNumber: number;
  labelEn: string;
  labelVi: string;
  fixedValue?: string;
  prefix?: string;
  suffix?: string;
  isBlank: boolean;
  sampleAnswer?: string;
  acceptedAnswers?: string[];
  /** For Row 5, accepts any subset of keywords or paraphrased ideas */
  isKeywordList?: boolean;
  suggestedKeywords?: string[];
  explanationEn?: string;
  explanationVi?: string;
}

export const EX2_PLAN_ROWS: Ex2PlanRow[] = [
  {
    rowNumber: 1,
    labelEn: 'general topic',
    labelVi: 'chủ đề chung (general topic)',
    fixedValue: 'taking secondary school children on visits',
    isBlank: false,
  },
  {
    rowNumber: 2,
    labelEn: 'general noun to help you organize your essay (1)',
    labelVi: 'danh từ chung giúp tổ chức bài luận (1)',
    fixedValue: 'advantages',
    isBlank: false,
  },
  {
    rowNumber: 3,
    labelEn: 'general noun to help you organize your essay (2)',
    labelVi: 'danh từ chung giúp tổ chức bài luận (2)',
    isBlank: true,
    sampleAnswer: 'disadvantages',
    acceptedAnswers: ['disadvantages', 'disadvantage', 'drawbacks', 'drawback'],
    explanationEn:
      'Use "disadvantages" as the second organizing noun directly from the essay question.',
    explanationVi:
      'Dùng "disadvantages" (mặt bất lợi) làm danh từ tổ chức thứ hai lấy trực tiếp từ câu hỏi.',
  },
  {
    rowNumber: 4,
    labelEn: 'number of paragraphs',
    labelVi: 'số lượng đoạn văn',
    prefix: 'about',
    isBlank: true,
    sampleAnswer: '5',
    acceptedAnswers: ['5', 'five', '4', 'four', '4-5', '4 or 5', '4/5'],
    explanationEn:
      'About 5 paragraphs: Introduction (1), Advantage 1 (2), Advantage 2 (3), Disadvantages (4), and Conclusion (5).',
    explanationVi:
      'Khoảng 5 đoạn: Mở bài (1), Lợi ích 1 (2), Lợi ích 2 (3), Mặt bất lợi (4) và Kết bài (5).',
  },
  {
    rowNumber: 5,
    labelEn: 'words/ideas for introduction',
    labelVi: 'từ khóa / ý tưởng cho đoạn mở bài',
    prefix: 'trips to various places,',
    isBlank: true,
    isKeywordList: true,
    sampleAnswer: 'zoo / concerts / abroad / outside school / common / past',
    suggestedKeywords: [
      'zoo',
      'concerts',
      'abroad',
      'outside school',
      'common',
      'past',
      'museums',
      'secondary schools',
    ],
    acceptedAnswers: [
      'zoo',
      'zoos',
      'concert',
      'concerts',
      'abroad',
      'outside school',
      'outside schools',
      'common',
      'past',
      'museum',
      'museums',
      'travelling abroad',
      'traveling abroad',
      'other countries',
      'secondary',
    ],
    explanationEn:
      'Paraphrase the essay title using words like "zoo", "concerts", "abroad", "outside school", "common", and "past".',
    explanationVi:
      'Diễn đạt lại đề bài bằng các từ khóa như "zoo", "concerts", "abroad", "outside school", "common", và "past".',
  },
  {
    rowNumber: 6,
    labelEn: 'focus of essay',
    labelVi: 'trọng tâm của bài luận',
    prefix: 'many',
    suffix: 'and disadvantages',
    isBlank: true,
    sampleAnswer: 'advantages',
    acceptedAnswers: ['advantages', 'benefits'],
    explanationEn:
      'The focus balances both sides: many advantages and (some) disadvantages.',
    explanationVi:
      'Trọng tâm bài viết cân bằng cả hai mặt: nhiều lợi ích (advantages) và các bất lợi (disadvantages).',
  },
  {
    rowNumber: 7,
    labelEn: 'first sentence of second paragraph',
    labelVi: 'câu đầu tiên của đoạn thứ hai',
    fixedValue: 'The main benefit is ...',
    isBlank: false,
  },
  {
    rowNumber: 8,
    labelEn: 'first sentence of third paragraph',
    labelVi: 'câu đầu tiên của đoạn thứ ba',
    prefix: 'Another',
    suffix: 'is that ...',
    isBlank: true,
    sampleAnswer: 'benefit / advantage',
    acceptedAnswers: ['benefit', 'advantage'],
    explanationEn:
      'Introduce a second positive point with "Another benefit is that ..." or "Another advantage is that ...".',
    explanationVi:
      'Giới thiệu lợi ích thứ hai bằng "Another benefit is that ..." hoặc "Another advantage is that ...".',
  },
  {
    rowNumber: 9,
    labelEn: 'first sentence of fourth paragraph',
    labelVi: 'câu đầu tiên của đoạn thứ tư',
    prefix: 'To some people such visits have some',
    isBlank: true,
    sampleAnswer: 'disadvantages',
    acceptedAnswers: ['disadvantages', 'drawbacks', 'problems'],
    explanationEn:
      'Signal the shift to the negative side using "disadvantages" (matching row 3).',
    explanationVi:
      'Báo hiệu chuyển sang mặt hạn chế bằng từ "disadvantages" (khớp với dòng 3).',
  },
  {
    rowNumber: 10,
    labelEn: 'conclusion',
    labelVi: 'đoạn kết bài',
    fixedValue: 'As we have seen, the advantages outweigh the disadvantages.',
    isBlank: false,
  },
];

export function evaluateEx2Row(row: Ex2PlanRow, rawValue: string): boolean {
  if (!row.isBlank) return true;
  const cleaned = rawValue.trim().toLowerCase().replace(/[.,!?]+$/g, '');
  if (!cleaned) return false;
  if (row.isKeywordList && row.acceptedAnswers) {
    return row.acceptedAnswers.some((kw) => cleaned.includes(kw));
  }
  return row.acceptedAnswers ? row.acceptedAnswers.includes(cleaned) : false;
}

// Exercise 3: Three Candidate Introductions
export interface Ex3IntroOption {
  id: '1' | '2' | '3';
  wordCount: number;
  text: string;
  segments: {
    text: string;
    highlight?: 'spoken' | 'general' | 'organization' | 'overspecific';
    noteEn?: string;
    noteVi?: string;
  }[];
  verdictKey: 'spoken' | 'organized' | 'needs-general';
  feedbackEn: string;
  feedbackVi: string;
}

export const EX3_INTRODUCTIONS: Ex3IntroOption[] = [
  {
    id: '1',
    wordCount: 34,
    text: "I liked going on visits outside school because they were very enjoyable and I can't see any disadvantages of such trips. I think they are very useful for pupils and also for teachers.",
    segments: [
      {
        text: "I liked going on visits outside school because they were very enjoyable and I can't see any disadvantages of such trips.",
        highlight: 'spoken',
        noteEn: 'Informal spoken style, personal past anecdote, and ignores disadvantages',
        noteVi: 'Văn phong giống văn nói, quá cá nhân và bỏ qua mặt bất lợi',
      },
      { text: ' ' },
      {
        text: 'I think they are very useful for pupils and also for teachers.',
        highlight: 'spoken',
        noteEn: 'Too informal ("I think...") and lacks academic framing',
        noteVi: 'Chưa trang trọng và thiếu khung khái quát học thuật',
      },
    ],
    verdictKey: 'spoken',
    feedbackEn:
      'Not suitable: it sounds like spoken English ("I liked...", "I can\'t see...") and ignores the disadvantages required by the question.',
    feedbackVi:
      'Không phù hợp: cách diễn đạt giống văn nói ("I liked...", "I can\'t see...") và bỏ qua mặt bất lợi mà đề bài yêu cầu.',
  },
  {
    id: '2',
    wordCount: 38,
    text: 'Trips to various places outside schools such as museums and even travelling abroad are becoming more common in secondary schools compared to the past. There are many advantages, but also some disadvantages of such visits.',
    segments: [
      {
        text: 'Trips to various places outside schools such as museums and even travelling abroad are becoming more common in secondary schools compared to the past.',
        highlight: 'general',
        noteEn: 'General opening statement paraphrasing the topic (matches Ex. 2 row 5)',
        noteVi: 'Câu mở đầu khái quát diễn đạt lại chủ đề (khớp dòng 5 Bài tập 2)',
      },
      { text: ' ' },
      {
        text: 'There are many advantages, but also some disadvantages of such visits.',
        highlight: 'organization',
        noteEn: 'Second sentence clearly shows the essay organization (matches Ex. 2 row 6)',
        noteVi: 'Câu thứ hai thể hiện rõ bố cục bài luận (khớp dòng 6 Bài tập 2)',
      },
    ],
    verdictKey: 'organized',
    feedbackEn:
      'Best choice: it is better organized. It opens with a general statement about the topic, and the second sentence clearly shows the organization of the essay.',
    feedbackVi:
      'Lựa chọn tốt nhất: bố cục chặt chẽ hơn. Câu đầu tiên nêu nhận định khái quát về chủ đề, và câu thứ hai chỉ rõ cấu trúc của cả bài luận.',
  },
  {
    id: '3',
    wordCount: 36,
    text: 'There are many advantages and disadvantages to going on school visits at secondary school, for example, going to the zoo or visiting museums or even travelling abroad to various countries like France.',
    segments: [
      {
        text: 'There are many advantages and disadvantages to going on school visits at secondary school,',
        highlight: 'organization',
        noteEn: 'States the focus immediately without a general opening statement first',
        noteVi: 'Nêu trọng tâm ngay mà thiếu câu mở đầu khái quát phía trước',
      },
      { text: ' ' },
      {
        text: 'for example, going to the zoo or visiting museums or even travelling abroad to various countries like France.',
        highlight: 'overspecific',
        noteEn: 'Lists rubric examples and overly specific detail ("like France") in the introduction',
        noteVi: 'Liệt kê lại ví dụ từ đề bài và chi tiết quá cụ thể ("like France") ngay ở mở bài',
      },
    ],
    verdictKey: 'needs-general',
    feedbackEn:
      'Needs improvement: it would be better if it had a general statement at the beginning rather than jumping straight into the focus and listing examples like France.',
    feedbackVi:
      'Cần cải thiện: mở bài sẽ tốt hơn nếu có một câu khái quát ở đầu thay vì đi thẳng vào liệt kê ví dụ cụ thể như nước Pháp.',
  },
];

export interface Ex3CritiqueOption {
  key: 'spoken' | 'organized' | 'needs-general';
  labelEn: string;
  labelVi: string;
}

export const EX3_CRITIQUE_OPTIONS: Ex3CritiqueOption[] = [
  {
    key: 'organized',
    labelEn: 'Best organized: has a general statement, then shows essay organization',
    labelVi: 'Bố cục tốt nhất: có câu khái quát rồi nêu hướng tổ chức bài luận',
  },
  {
    key: 'spoken',
    labelEn: 'Not suitable: sounds like spoken English and misses disadvantages',
    labelVi: 'Không phù hợp: giống văn nói và bỏ sót mặt bất lợi',
  },
  {
    key: 'needs-general',
    labelEn: 'Would be better with a general statement at the beginning',
    labelVi: 'Sẽ tốt hơn nếu có một câu khái quát ở đầu đoạn',
  },
];

// Exercise 4: Sort 8 Ideas into Advantages vs Disadvantages
export type IdeaCategory = 'advantage' | 'disadvantage';
export type StanceChoice = 'agree' | 'disagree' | 'unsure';

export interface Ex4IdeaBubble {
  id: number;
  textEn: string;
  textVi: string;
  correctCategory: IdeaCategory;
  linkGroup: 'educational' | 'real-world' | 'school-time' | 'cost';
  explanationEn: string;
  explanationVi: string;
}

export const EX4_IDEA_BUBBLES: Ex4IdeaBubble[] = [
  {
    id: 1,
    textEn: "seeing 'real' history, geography, etc",
    textVi: "tận mắt thấy lịch sử, địa lý 'thực tế', v.v.",
    correctCategory: 'advantage',
    linkGroup: 'educational',
    explanationEn: 'Advantage: observing real artefacts and landscapes makes school subjects come alive.',
    explanationVi: 'Lợi ích: quan sát hiện vật và cảnh quan thật giúp các môn học trở nên sinh động.',
  },
  {
    id: 2,
    textEn: 'more effective learning in school',
    textVi: 'học ở trường mang lại hiệu quả cao hơn',
    correctCategory: 'disadvantage',
    linkGroup: 'school-time',
    explanationEn: 'Disadvantage of visits: some argue structured classroom lessons in school are more efficient.',
    explanationVi: 'Bất lợi của chuyến đi: một số người cho rằng học có hệ thống trên lớp hiệu quả hơn.',
  },
  {
    id: 3,
    textEn: 'takes time away from real learning',
    textVi: 'lấy mất thời gian của việc học thực sự',
    correctCategory: 'disadvantage',
    linkGroup: 'school-time',
    explanationEn: 'Disadvantage: travelling and organizing trips can reduce time for exam syllabus study.',
    explanationVi: 'Bất lợi: việc đi lại và tổ chức tham quan có thể làm giảm thời gian học chương trình chính.',
  },
  {
    id: 4,
    textEn: 'trips are educational',
    textVi: 'các chuyến đi mang tính giáo dục',
    correctCategory: 'advantage',
    linkGroup: 'educational',
    explanationEn: 'Advantage: main benefit used as the topic idea in Exercise 5.',
    explanationVi: 'Lợi ích: lợi ích chính được dùng làm câu chủ đề trong Bài tập 5.',
  },
  {
    id: 5,
    textEn: "poor families can't afford trips",
    textVi: 'gia đình khó khăn không đủ chi phí cho chuyến đi',
    correctCategory: 'disadvantage',
    linkGroup: 'cost',
    explanationEn: 'Disadvantage: financial cost can exclude students from lower-income backgrounds.',
    explanationVi: 'Bất lợi: chi phí cao có thể khiến học sinh gia đình thu nhập thấp khó tham gia.',
  },
  {
    id: 6,
    textEn: 'makes learning fun/memorable',
    textVi: 'giúp việc học thú vị / dễ nhớ hơn',
    correctCategory: 'advantage',
    linkGroup: 'educational',
    explanationEn: 'Advantage: enjoyable experiences help students remember knowledge much longer.',
    explanationVi: 'Lợi ích: trải nghiệm thú vị giúp học sinh ghi nhớ kiến thức lâu hơn.',
  },
  {
    id: 7,
    textEn: 'interacting with the real world',
    textVi: 'tương tác với thế giới thực',
    correctCategory: 'advantage',
    linkGroup: 'real-world',
    explanationEn: 'Advantage: used as the topic idea in the Exercise 8 writing prompt.',
    explanationVi: 'Lợi ích: được dùng làm ý chủ đề cho phần viết đoạn ở Bài tập 8.',
  },
  {
    id: 8,
    textEn: 'effective learning in the real world',
    textVi: 'học tập hiệu quả trong thế giới thực',
    correctCategory: 'advantage',
    linkGroup: 'real-world',
    explanationEn: 'Advantage: hands-on real-world environments strengthen practical understanding.',
    explanationVi: 'Lợi ích: môi trường thực tế giúp củng cố sự hiểu biết qua trải nghiệm trực tiếp.',
  },
];

// Exercises 5, 6 & 7: Second Paragraph + Specific Phrases
// Official key for Ex 5: 4, 2, 1, 6 (note: 2 contrasts "even more than from books"; 8 is also conceptually close)
export const EX5_OFFICIAL_KEY_IDS = [4, 2, 1, 6];
export const EX5_EVIDENCE_MAP: Record<number, { quote: string; noteEn: string; noteVi: string }> = {
  4: {
    quote: 'is that they are educational',
    noteEn: 'Directly states the main benefit: trips are educational.',
    noteVi: 'Nêu trực tiếp lợi ích chính: các chuyến đi mang tính giáo dục.',
  },
  2: {
    quote: 'learn by seeing and doing even more than from books',
    noteEn: 'Official key includes #2 (contrasting book/school learning with seeing and doing; closely related to #8).',
    noteVi: 'Đáp án sách gồm ý #2 (đối chiếu việc học qua sách vở ở trường với học qua quan sát và trải nghiệm; rất gần với ý #8).',
  },
  1: {
    quote: 'taken to a museum ... see real objects and watch films',
    noteEn: 'Illustrates seeing real history, geography, and physical exhibits.',
    noteVi: 'Minh họa việc tận mắt xem hiện vật lịch sử, địa lý thực tế.',
  },
  6: {
    quote: 'more likely to remember knowledge',
    noteEn: 'Shows that visits make learning memorable.',
    noteVi: 'Thể hiện rằng chuyến tham quan giúp việc học dễ ghi nhớ hơn.',
  },
};

export interface Ex6Phrase {
  id: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
  text: string;
  textVi: string;
}

export const EX6_PHRASES: Ex6Phrase[] = [
  {
    id: 'a',
    text: 'such as the Natural History Museum in London',
    textVi: 'chẳng hạn như Bảo tàng Lịch sử Tự nhiên ở London',
  },
  {
    id: 'b',
    text: 'than if they had just read books',
    textVi: 'so với việc chỉ đọc sách đơn thuần',
  },
  {
    id: 'c',
    text: 'factual',
    textVi: 'mang tính thực tế / sự kiện (factual)',
  },
  {
    id: 'd',
    text: 'in the UK',
    textVi: 'ở Vương quốc Anh',
  },
  {
    id: 'e',
    text: "about animals' lives, past history or geology",
    textVi: 'về đời sống động vật, lịch sử quá khứ hoặc địa chất',
  },
  {
    id: 'f',
    text: 'about how the world works',
    textVi: 'về cách thế giới vận hành',
  },
  {
    id: 'g',
    text: 'of such visits',
    textVi: 'của những chuyến tham quan như vậy',
  },
];

export interface Ex6Slot {
  id: number;
  primaryKey: Ex6Phrase['id'];
  acceptedKeys: Ex6Phrase['id'][];
  hintEn: string;
  hintVi: string;
}

export const EX6_SLOTS: Ex6Slot[] = [
  {
    id: 1,
    primaryKey: 'g',
    acceptedKeys: ['g'],
    hintEn: 'Specifies what "The main benefit" refers to ("of such visits").',
    hintVi: 'Làm rõ "The main benefit" nói về điều gì ("of such visits").',
  },
  {
    id: 2,
    primaryKey: 'f',
    acceptedKeys: ['f', 'e'],
    hintEn: 'Explains what children learn by seeing and doing ("about how the world works"; "e" is also possible).',
    hintVi: 'Giải thích trẻ học được gì qua quan sát và thực hành ("about how the world works"; "e" cũng có thể chấp nhận).',
  },
  {
    id: 3,
    primaryKey: 'd',
    acceptedKeys: ['d'],
    hintEn: 'Narrows down which children ("children in the UK") to match the London example.',
    hintVi: 'Thu hẹp đối tượng học sinh ("in the UK") để khớp với ví dụ bảo tàng ở London.',
  },
  {
    id: 4,
    primaryKey: 'a',
    acceptedKeys: ['a'],
    hintEn: 'Names a concrete museum ("such as the Natural History Museum in London").',
    hintVi: 'Nêu tên một bảo tàng cụ thể ("such as the Natural History Museum in London").',
  },
  {
    id: 5,
    primaryKey: 'e',
    acceptedKeys: ['e', 'f'],
    hintEn: 'Specifies the topics of the exhibits and films ("about animals\' lives, past history or geology"; "f" is also possible).',
    hintVi: 'Nêu cụ thể chủ đề của hiện vật và phim ("about animals\' lives, past history or geology"; "f" cũng có thể chấp nhận).',
  },
  {
    id: 6,
    primaryKey: 'c',
    acceptedKeys: ['c'],
    hintEn: 'Adjective modifying "knowledge" ("factual knowledge").',
    hintVi: 'Tính từ bổ nghĩa đứng trước danh từ "knowledge" ("factual knowledge").',
  },
  {
    id: 7,
    primaryKey: 'b',
    acceptedKeys: ['b'],
    hintEn: 'Completes the comparative "more likely to remember ... than if they had just read books".',
    hintVi: 'Hoàn chỉnh cấu trúc so sánh hơn "more likely to remember ... than if they had just read books".',
  },
];

export function isEx6SlotCorrect(
  slotId: number,
  chosen: Ex6Phrase['id'] | undefined,
  allAnswers: Record<number, Ex6Phrase['id']>
): boolean {
  if (!chosen) return false;
  const slot = EX6_SLOTS.find((s) => s.id === slotId);
  if (!slot) return false;
  if (!slot.acceptedKeys.includes(chosen)) return false;
  // Prevent using the same phrase for both slot 2 and slot 5
  if (slotId === 2 && allAnswers[5] === chosen) return false;
  if (slotId === 5 && allAnswers[2] === chosen) return false;
  return true;
}

export const ENRICHED_MODEL_PARAGRAPH =
  "The main benefit of such visits for secondary school children is that they are educational, because children learn about how the world works by seeing and doing even more than from books. For example, if children in the UK are taken to a museum such as the Natural History Museum in London they can see real objects and watch films about animals' lives, past history or geology. As a result, they are more likely to remember factual knowledge than if they had just read books.";

export const EX7_OPTIONS = [
  {
    id: '1' as const,
    textEn: 'It makes the paragraph more general.',
    textVi: 'Nó khiến đoạn văn trở nên khái quát, chung chung hơn.',
  },
  {
    id: '2' as const,
    textEn: 'It makes the information in the paragraph more specific.',
    textVi: 'Nó giúp thông tin trong đoạn văn trở nên cụ thể và chính xác hơn.',
  },
];

// Exercise 8: Guided Paragraph Writing
export interface StarterPreset {
  id: 'textbook-adv' | 'custom-adv' | 'disadvantage';
  labelEn: string;
  labelVi: string;
  starterText: string;
  sampleParagraph: string;
  focusEn: string;
  focusVi: string;
}

export const EX8_STARTER_PRESETS: StarterPreset[] = [
  {
    id: 'textbook-adv',
    labelEn: 'Textbook Starter (Advantage)',
    labelVi: 'Câu mở đầu SGK (Lợi ích)',
    starterText:
      'Another advantage is that visits can help students interact with the real world. Take for example children from the UK who go abroad to visit France. They ',
    focusEn: 'Focus: Interacting with the real world (Idea #7 + #8)',
    focusVi: 'Trọng tâm: Tương tác với thế giới thực (Ý #7 + #8)',
    sampleParagraph:
      'Another advantage is that visits can help students interact with the real world. Take for example children from the UK who go abroad to visit France. They can practise speaking French with local people in shops, cafés and markets rather than only doing grammar exercises in class. Moreover, they experience a different culture and daily way of life first-hand. As a result, students become more confident and develop practical communication skills that are useful for their future.',
  },
  {
    id: 'custom-adv',
    labelEn: 'Fun & Memorable (Advantage)',
    labelVi: 'Học thú vị & dễ nhớ (Lợi ích)',
    starterText:
      'Another benefit of school visits is that they make learning much more enjoyable and memorable. For example, ',
    focusEn: 'Focus: Making learning fun and memorable (Idea #6 + #1)',
    focusVi: 'Trọng tâm: Giúp việc học thú vị và đáng nhớ (Ý #6 + #1)',
    sampleParagraph:
      'Another benefit of school visits is that they make learning much more enjoyable and memorable. For example, when teenagers attend a live classical concert or visit a wildlife park with their classmates, they feel excited and curious about the subject. Seeing wild animals up close or listening to real musicians keeps their attention far better than watching a short clip in a classroom. As a result, they develop a lasting interest in the subject and remember key details more easily.',
  },
  {
    id: 'disadvantage',
    labelEn: 'Cost & Classroom Time (Disadvantage)',
    labelVi: 'Chi phí & Thời gian học (Bất lợi)',
    starterText:
      'To some people such visits have some disadvantages, mainly because ',
    focusEn: 'Focus: Financial cost or time away from school (Idea #5 / #3)',
    focusVi: 'Trọng tâm: Chi phí hoặc mất thời gian học ở trường (Ý #5 / #3)',
    sampleParagraph:
      'To some people such visits have some disadvantages, mainly because trips abroad or to major cities can be very expensive. For example, poor families with two or three children at secondary school often cannot afford travel tickets, accommodation and entry fees for overseas visits. Moreover, organizing long trips can take valuable time away from preparing for important national exams in school. As a result, some students may feel left out or fall behind with their regular coursework.',
  },
];

export const EX8_PRECISION_HELPERS = [
  'because',
  'Take for example',
  'For example,',
  'such as',
  'Moreover,',
  'As a result,',
  'than if they',
];
