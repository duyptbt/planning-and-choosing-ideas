import { StageId } from './lessonData';

export type Language = 'en' | 'vi';

export interface StageI18n {
  navLabel: string;
  title: string;
  exercisesLabel: string;
  teacherTip: string;
}

export const STAGES_I18N: Record<Language, Record<StageId, StageI18n>> = {
  en: {
    'warmup-plan': {
      navLabel: '1. Warm-up & Plan',
      title: 'Visual Warm-up & Essay Plan',
      exercisesLabel: 'Exercises 1 & 2',
      teacherTip:
        'Read the essay title carefully and interpret its exact focus. You cannot reuse a memorised essay if the title focus is different—use the 10-row table to map your structure before writing.',
    },
    introductions: {
      navLabel: '2. Introductions',
      title: 'Choosing a Strong Introduction',
      exercisesLabel: 'Exercise 3',
      teacherTip:
        'A strong Task 2 introduction opens with a general statement about the topic, then clearly signals the essay organization (advantages and disadvantages). Avoid informal spoken English.',
    },
    'sorting-ideas': {
      navLabel: '3. Choosing Ideas',
      title: 'Sorting Advantages & Disadvantages',
      exercisesLabel: 'Exercise 4',
      teacherTip:
        'At this stage, focus on choosing and organizing clear ideas rather than inventing dozens of points. Once sorted, link related ideas together so each paragraph stays unified.',
    },
    'model-details': {
      navLabel: '4. Specific Details',
      title: 'Improving a Model Paragraph',
      exercisesLabel: 'Exercises 5, 6 & 7',
      teacherTip:
        'You do not have to insert every single extra phrase into one paragraph. When drafting or redrafting, aim to include two or three specific pieces of information to make your ideas precise.',
    },
    'write-paragraph': {
      navLabel: '5. Write Paragraph',
      title: 'Guided Body Paragraph Writing',
      exercisesLabel: 'Exercise 8',
      teacherTip:
        'Look back at Exercise 4, choose another advantage or disadvantage, and think of one or two supporting ideas. Check your paragraph against the Exercise 5–6 model before comparing with the sample.',
    },
  },
  vi: {
    'warmup-plan': {
      navLabel: '1. Khởi động & Lập dàn ý',
      title: 'Quan sát tranh & Lập bảng kế hoạch bài luận',
      exercisesLabel: 'Bài tập 1 & 2',
      teacherTip:
        'Hãy đọc kỹ đề bài để hiểu đúng trọng tâm. Bạn không thể dùng lại một bài viết có sẵn nếu trọng tâm câu hỏi khác đi—hãy dùng bảng 10 dòng để định hình bố cục trước khi viết.',
    },
    introductions: {
      navLabel: '2. Mở bài',
      title: 'Chọn đoạn Mở bài phù hợp nhất',
      exercisesLabel: 'Bài tập 3',
      teacherTip:
        'Một đoạn mở bài Task 2 tốt bắt đầu bằng câu khái quát về chủ đề, sau đó thể hiện rõ bố cục bài viết (lợi ích và bất lợi). Tránh cách diễn đạt giống văn nói.',
    },
    'sorting-ideas': {
      navLabel: '3. Chọn lọc ý',
      title: 'Phân loại Lợi ích & Bất lợi',
      exercisesLabel: 'Bài tập 4',
      teacherTip:
        'Ở giai đoạn này, hãy tập trung chọn lọc và sắp xếp các ý rõ ràng thay vì cố tìm quá nhiều ý. Sau khi phân loại, hãy liên kết các ý có quan hệ với nhau để đoạn văn mạch lạc.',
    },
    'model-details': {
      navLabel: '4. Chi tiết cụ thể',
      title: 'Nâng cấp đoạn văn mẫu bằng chi tiết cụ thể',
      exercisesLabel: 'Bài tập 5, 6 & 7',
      teacherTip:
        'Khi tự viết hoặc chỉnh sửa đoạn văn, bạn không cần nhồi nhét mọi cụm từ mở rộng; chỉ cần thêm khoảng hai đến ba chi tiết cụ thể để ý tưởng chính xác và thuyết phục hơn.',
    },
    'write-paragraph': {
      navLabel: '5. Viết đoạn văn',
      title: 'Thực hành viết đoạn thân bài có hướng dẫn',
      exercisesLabel: 'Bài tập 8',
      teacherTip:
        'Xem lại Bài tập 4, chọn thêm một lợi ích hoặc bất lợi khác và nghĩ ra 1–2 ý hỗ trợ. Đối chiếu đoạn viết của bạn với khung mẫu ở Bài tập 5–6 trước khi xem bài tham khảo.',
    },
  },
};

export const UI_TEXT = {
  en: {
    viewTaskPrompt: 'View Task Prompt',
    subtitle: 'Planning and Choosing Ideas',
    unitLabel: 'Unit 3 · Giving structure to our world',
    aim: 'Plan an advantages and disadvantages essay, choose and sort ideas, add specific details, and write a structured body paragraph.',
    exercisesMastered: 'Exercises mastered',
    resetAll: 'Reset All',
    nextPrefix: 'Next',
    promptDrawerTitle: 'Essay Question & Strategy',
    closePromptDrawer: 'Close prompt drawer',

    // Task Prompt Panel
    task2PromptTitle: 'Essay Question',
    highlight3Parts: 'Highlight 3 Parts',
    hide3Parts: 'Hide 3 Parts',
    part1Label: 'Topic:',
    part1Desc: 'Secondary school visits (museums, zoos, concerts, abroad)',
    part2Label: 'Focus:',
    part2Desc: 'Advantages and disadvantages of such visits',
    part3Label: 'Support:',
    part3Desc: 'Reasons and relevant examples from knowledge or experience',
    viPromptTranslationTitle: '',
    viPromptTranslation: '',
    strategyTitle: 'Strategy',
    strategyBody:
      'In Task 2, read the essay question carefully and use the various parts of the essay title to help you plan your answer.',
    examInfoTitle: 'Exam information',
    examInfoBody:
      'In the exam you have 40 minutes to write a minimum of 250 words. Usually two sides of a situation or problem are given, followed by an instruction such as "Discuss both these views and give your own opinion." or "What are the advantages and disadvantages of this?" Remember to write in paragraphs.',
    stageGuidancePrefix: 'Stage',
    stageGuidanceSuffix: 'Guidance',

    // Shared Feedback & Actions
    correct: 'Correct',
    checkAgain: 'Check again',
    answerKey: 'Answer Key',
    keyPrefix: 'Key',
    reset: 'Reset',
    score: 'Score',
    completed: 'Completed',
    wordsUnit: 'words',

    // Stage 1: Exercises 1 & 2
    s1Ex1Kicker: 'Stage 01 · Exercise 1 · Visual Warm-up',
    s1Ex1Heading: 'Describe the pictures and connect them to learning',
    s1Ex1Desc:
      'Look closely at Pictures A and B. Describe what is happening in each scene and explain how both activities relate to learning and studying.',
    s1PicALabel: 'What is happening in Picture A?',
    s1PicAPlaceholder: 'e.g. Young people are visiting a museum and looking at exhibits...',
    s1PicBLabel: 'What is happening in Picture B?',
    s1PicBPlaceholder: 'e.g. Students are examining rocks and water at the seaside...',
    s1LinkLabel: 'How are both pictures related to learning and studying?',
    s1LinkPlaceholder: 'e.g. Young people are learning outside the classroom...',
    s1CompareSampleBtn: 'Compare with Sample Answer',
    s1HideSampleBtn: 'Hide Sample Answer',
    s1SampleTitle: 'Official Sample Answer (Exercise 1)',
    s1LocalReflection:
      'Reflection: Do either of these activities relate to the school experience in your country?',
    s1NotesStatusDone: 'Warm-up notes recorded',
    s1NotesStatusPending: 'Write brief notes for the pictures',

    s1Ex2Kicker: 'Stage 01 · Exercise 2 · Essay Planning Table',
    s1Ex2Heading: 'Complete the table to help you plan your answer',
    s1Ex2Desc:
      'Use the different parts of the essay question to fill in the 6 missing items (rows 3, 4, 5, 6, 8, and 9) in the planning table below.',
    s1ColPart: 'Essay Element',
    s1ColPlan: 'Plan Details',
    s1Row5Hint: 'Click keywords to add or type your own paraphrase ideas:',
    s1FillSamplesBtn: 'Fill Sample Answers',
    s1CheckTableBtn: 'Check Plan Table',
    s1FilledCount: 'Filled',

    // Stage 2: Exercise 3
    s2Ex3Kicker: 'Stage 02 · Exercise 3 · Evaluating Introductions',
    s2Ex3Heading: 'Choose the most suitable introduction for the essay',
    s2Ex3Desc:
      'Read all three candidate introductions carefully, select the strongest one, and explain your choice using the planning table from Exercise 2.',
    compareStructure: 'Structure Overlay',
    hideOverlay: 'Hide Overlay',
    legendGeneral: 'General opening statement',
    legendOrganization: 'Shows essay organization',
    legendSpoken: 'Informal / spoken style',
    legendOverspecific: 'Over-specific examples in intro',
    introLabel: 'Introduction',
    s2CorrectTitle: 'Correct — Introduction 2 is the most suitable',
    s2WrongTitle: 'Check again — Introduction 2 is the best organized',
    s2KeyTitle: 'Answer Key: Introduction 2',
    s2Explanation:
      'Introduction 2 is better organized: it opens with a general statement about the topic (paraphrasing row 5 of your plan) and then the second sentence clearly shows the organization (advantages and disadvantages). Introduction 1 is too informal, and Introduction 3 lacks an opening general statement.',
    selectedIntroPrefix: 'Selected: Introduction',
    selectIntroPrompt: 'Select an introduction above',
    checkChoiceBtn: 'Check Choice',

    s2JustifyKicker: 'Stage 02 · Exercise 3 (Part B) · Explain Your Choice',
    s2JustifyHeading: 'Match each introduction to its textbook evaluation',
    s2JustifyDesc:
      'Connect Introductions 1, 2, and 3 to the exact reason why each one succeeds or falls short.',
    s2ChooseReason: 'Select evaluation...',
    s2CheckJustifyBtn: 'Check Explanations',
    s2Matched: 'Matched',

    // Stage 3: Exercise 4
    s3Ex4Kicker: 'Stage 03 · Exercise 4 · Choosing & Sorting Ideas',
    s3Ex4Heading: 'Sort the 8 ideas into advantages and disadvantages',
    s3Ex4Desc:
      'Assign each idea bubble to Advantages or Disadvantages, and decide whether you personally agree with each point.',
    advantageLabel: 'Advantage',
    disadvantageLabel: 'Disadvantage',
    agreeLabel: 'Agree',
    disagreeLabel: 'Disagree',
    unsureLabel: 'Unsure',
    yourStance: 'Your view:',
    sortedCount: 'Sorted',
    checkSortingBtn: 'Check Sorting',
    s3SummaryTitle: 'Sorted Idea Map & Linked Clusters',
    s3AdvBucketTitle: 'Advantages (Key: 1, 4, 6, 7, 8)',
    s3DisadvBucketTitle: 'Disadvantages (Key: 2, 3, 5)',
    s3LinkNote:
      'Teacher tip: Link related ideas before writing — e.g. Ideas 4, 1 & 6 build an "educational & memorable" paragraph, Ideas 7 & 8 build a "real-world interaction" paragraph, and Ideas 2 & 3 group under "classroom learning time".',

    // Stage 4: Exercises 5, 6 & 7
    s4Ex5Kicker: 'Stage 04 · Exercise 5 · Analysing the Second Paragraph',
    s4Ex5Heading: 'Which ideas from Exercise 4 are mentioned in this paragraph?',
    s4Ex5Desc:
      'Read the second paragraph below (ignore the numbers 1–7 for now) and tick every idea from Exercise 4 that appears in the text.',
    s4CheckMentionsBtn: 'Check Mentioned Ideas',
    s4Ticked: 'Ticked',
    s4Ex5KeyNote:
      'Official Key: 4, 2, 1, 6. (Idea 4 = educational; Idea 2 contrasts book/school learning with "seeing and doing" — Idea 8 is also accepted here; Idea 1 = seeing real objects; Idea 6 = more likely to remember.)',

    s4Ex6Kicker: 'Stage 04 · Exercise 6 · Adding Specific Phrases',
    s4Ex6Heading: 'Insert phrases a–g at spaces 1–7 to improve the paragraph',
    s4Ex6Desc:
      'Select a numbered space in the paragraph and click a phrase from the bank to insert it live. Click an active filled space to clear it.',
    activeSpace: 'Active Space',
    previousBtn: 'Previous',
    nextBtn: 'Next',
    checkPhrasesBtn: 'Check Phrases',
    showBeforeAfterBtn: 'Compare Before & After',
    hideBeforeAfterBtn: 'Hide Before & After',
    beforeLabel: 'Original Paragraph (57 words)',
    afterLabel: 'Improved Paragraph with Specific Phrases (86 words)',
    ex6AltNote:
      'Note: Official key gives 1g, 2f, 3d, 4a, 5e, 6c, 7b — swapping 2e and 5f is also accepted.',
    ex6KeyOverview: 'Exercise 6 Answer Key Overview',

    s4Ex7Kicker: 'Stage 04 · Exercise 7 · Reflection on Precision',
    s4Ex7Heading: 'How does the extra information improve the paragraph?',
    s4Ex7Desc:
      'Compare the original and enriched paragraphs above, then choose the correct conclusion.',
    s4Ex7CheckBtn: 'Check Conclusion',
    s4Ex7Explanation:
      'Adding concrete places (the UK, the Natural History Museum in London), subject areas (animals\' lives, past history or geology), and precise adjectives (factual) makes your argument much more specific and persuasive. Aim for 2–3 specific details per body paragraph.',

    // Stage 5: Exercise 8
    s5Ex8Kicker: 'Stage 05 · Exercise 8 · Guided Paragraph Writing',
    s5Ex8Heading: 'Write your own paragraph about another advantage or disadvantage',
    s5Ex8Desc:
      'Choose a starter below (or keep the official textbook starter), develop 1–2 supporting ideas with specific details, and check your paragraph against Exercise 5 & 6.',
    chooseFocusLabel: 'Choose paragraph starter:',
    viewModelRefBtn: 'View Ex. 5–6 Model',
    hideModelRefBtn: 'Hide Ex. 5–6 Model',
    modelRefTitle: 'Model Paragraph Reference (Exercises 5 & 6)',
    precisionHelpersPrompt: 'Click a linker or precision phrase to insert it into your draft:',
    draftPlaceholder:
      'Another advantage is that visits can help students interact with the real world...',
    wordsCounterLabel: 'Words',
    targetWordRange: '60–85 target',
    statusStart: 'Continue from the starter',
    statusAim: 'Aim for 60–85 words',
    statusTarget: 'Target range reached',
    statusAbove: 'Above 85 words (concise is fine)',
    checklistTitle: 'Paragraph Self-Check (based on Exercises 5–7)',
    check1: 'Opens with a clear topic sentence using a general noun (benefit / advantage / disadvantage)',
    check2: 'Includes a specific real-world example (e.g. country, place, or concrete activity)',
    check3: 'Includes 2–3 specific details rather than vague generalisations',
    check4: 'Closes with a clear result or impact sentence (e.g. As a result, ...)',
    compareSampleBtn: 'Compare with Model Answer',
    hideSampleBtn: 'Hide Model Answer',
    modelSampleTitle: 'Model Paragraph Comparison (Level B1 4.0 Plus)',
    autoSaveNote: 'Your notes and paragraph save automatically in this browser.',
    resetDraftBtn: 'Reset Starter',
  },
  vi: {
    viewTaskPrompt: 'Xem đề bài',
    subtitle: 'Lập dàn ý & Chọn lọc ý tưởng',
    unitLabel: 'Bài 3 · Tạo cấu trúc cho bài viết',
    aim: 'Lập dàn ý bài luận ưu – nhược điểm, chọn lọc và phân loại ý, bổ sung chi tiết cụ thể và viết hoàn chỉnh một đoạn thân bài.',
    exercisesMastered: 'Bài tập đã hoàn thành',
    resetAll: 'Làm lại tất cả',
    nextPrefix: 'Tiếp theo',
    promptDrawerTitle: 'Đề bài & Chiến lược',
    closePromptDrawer: 'Đóng khung đề bài',

    // Task Prompt Panel
    task2PromptTitle: 'Đề bài Task 2',
    highlight3Parts: 'Tô sáng 3 phần',
    hide3Parts: 'Ẩn tô sáng',
    part1Label: 'Chủ đề:',
    part1Desc: 'Học sinh trung học đi tham quan bảo tàng, sở thú, hòa nhạc, nước ngoài',
    part2Label: 'Trọng tâm:',
    part2Desc: 'Các lợi ích (advantages) và bất lợi (disadvantages)',
    part3Label: 'Hỗ trợ:',
    part3Desc: 'Nêu lý do và ví dụ thực tế từ kiến thức, trải nghiệm bản thân',
    viPromptTranslationTitle: 'Dịch nghĩa đề bài:',
    viPromptTranslation:
      'Học sinh trung học thường được đưa đi tham quan bảo tàng, sở thú, các buổi hòa nhạc và đôi khi sang cả nước ngoài. Theo bạn, lợi ích và bất lợi của những chuyến tham quan như vậy là gì? Hãy đưa ra lý do và các ví dụ liên quan từ kiến thức hoặc trải nghiệm của bạn.',
    strategyTitle: 'Chiến lược làm bài',
    strategyBody:
      'Trong Writing Task 2, hãy đọc kỹ câu hỏi và tận dụng các phần khác nhau trong đề bài để lập dàn ý cho câu trả lời.',
    examInfoTitle: 'Thông tin bài thi',
    examInfoBody:
      'Trong kỳ thi, bạn có 40 phút để viết tối thiểu 250 từ. Đề bài thường nêu hai mặt của một tình huống hoặc vấn đề kèm yêu cầu như "Discuss both these views and give your own opinion." hoặc "What are the advantages and disadvantages of this?". Nhớ chia đoạn văn rõ ràng.',
    stageGuidancePrefix: 'Hướng dẫn Chặng',
    stageGuidanceSuffix: '',

    // Shared Feedback & Actions
    correct: 'Chính xác',
    checkAgain: 'Kiểm tra lại',
    answerKey: 'Đáp án chuẩn',
    keyPrefix: 'Đáp án',
    reset: 'Làm lại',
    score: 'Điểm',
    completed: 'Đã điền',
    wordsUnit: 'từ',

    // Stage 1: Exercises 1 & 2
    s1Ex1Kicker: 'Chặng 01 · Bài tập 1 · Khởi động qua hình ảnh',
    s1Ex1Heading: 'Mô tả hai bức tranh và liên hệ với việc học tập',
    s1Ex1Desc:
      'Quan sát kỹ Hình A và Hình B. Mô tả điều đang diễn ra trong mỗi bức tranh và giải thích cách các hoạt động này liên quan đến việc học.',
    s1PicALabel: 'Điều gì đang diễn ra trong Hình A?',
    s1PicAPlaceholder: 'VD: Học sinh đang tham quan bảo tàng và quan sát hiện vật...',
    s1PicBLabel: 'Điều gì đang diễn ra trong Hình B?',
    s1PicBPlaceholder: 'VD: Các bạn trẻ đang quan sát đá và nước ở bờ biển...',
    s1LinkLabel: 'Hai bức tranh liên quan thế nào đến việc học tập?',
    s1LinkPlaceholder: 'VD: Các bạn trẻ đang học tập bên ngoài lớp học...',
    s1CompareSampleBtn: 'So sánh với câu trả lời mẫu',
    s1HideSampleBtn: 'Ẩn câu trả lời mẫu',
    s1SampleTitle: 'Câu trả lời mẫu chính thức (Bài tập 1)',
    s1LocalReflection:
      'Liên hệ thực tế: Hoạt động nào trong hai hình trên có trong trải nghiệm trường học ở đất nước bạn?',
    s1NotesStatusDone: 'Đã ghi chú phần khởi động',
    s1NotesStatusPending: 'Hãy viết ghi chú ngắn cho các bức tranh',

    s1Ex2Kicker: 'Chặng 01 · Bài tập 2 · Bảng lập kế hoạch bài luận',
    s1Ex2Heading: 'Hoàn thành bảng sau để lập dàn ý cho bài viết',
    s1Ex2Desc:
      'Dựa vào các phần của đề bài để điền 6 chỗ trống (dòng 3, 4, 5, 6, 8 và 9) trong bảng lập kế hoạch dưới đây.',
    s1ColPart: 'Thành phần bài luận',
    s1ColPlan: 'Nội dung lập dàn ý',
    s1Row5Hint: 'Nhấn từ khóa để thêm nhanh hoặc tự gõ ý tưởng paraphrase:',
    s1FillSamplesBtn: 'Điền đáp án mẫu',
    s1CheckTableBtn: 'Kiểm tra bảng kế hoạch',
    s1FilledCount: 'Đã điền',

    // Stage 2: Exercise 3
    s2Ex3Kicker: 'Chặng 02 · Bài tập 3 · Đánh giá đoạn Mở bài',
    s2Ex3Heading: 'Chọn đoạn mở bài phù hợp nhất cho bài luận ở Bài tập 2',
    s2Ex3Desc:
      'Đọc kỹ cả ba đoạn mở bài, chọn đoạn tốt nhất và giải thích lựa chọn của bạn dựa trên bảng kế hoạch ở Bài tập 2.',
    compareStructure: 'Phân tích cấu trúc',
    hideOverlay: 'Ẩn phân tích màu',
    legendGeneral: 'Câu mở đầu khái quát',
    legendOrganization: 'Thể hiện bố cục bài luận',
    legendSpoken: 'Giọng văn nói / thiếu trang trọng',
    legendOverspecific: 'Ví dụ quá cụ thể ngay ở mở bài',
    introLabel: 'Mở bài',
    s2CorrectTitle: 'Chính xác — Mở bài 2 là phù hợp nhất',
    s2WrongTitle: 'Kiểm tra lại — Mở bài 2 có bố cục tốt nhất',
    s2KeyTitle: 'Đáp án chuẩn: Mở bài 2',
    s2Explanation:
      'Mở bài 2 được tổ chức tốt hơn: có câu mở đầu khái quát về chủ đề (khớp dòng 5 trong bảng) và câu thứ hai thể hiện rõ bố cục bài viết (lợi ích và bất lợi). Mở bài 1 giống văn nói, còn Mở bài 3 thiếu câu khái quát mở đầu.',
    selectedIntroPrefix: 'Đã chọn: Mở bài',
    selectIntroPrompt: 'Hãy chọn một đoạn mở bài ở trên',
    checkChoiceBtn: 'Kiểm tra lựa chọn',

    s2JustifyKicker: 'Chặng 02 · Bài tập 3 (Phần B) · Giải thích lựa chọn',
    s2JustifyHeading: 'Ghép từng đoạn mở bài với nhận xét đúng từ đáp án',
    s2JustifyDesc:
      'Nối Mở bài 1, 2 và 3 với nhận xét chính xác về điểm mạnh hoặc hạn chế của từng đoạn.',
    s2ChooseReason: 'Chọn nhận xét...',
    s2CheckJustifyBtn: 'Kiểm tra giải thích',
    s2Matched: 'Đã ghép',

    // Stage 3: Exercise 4
    s3Ex4Kicker: 'Chặng 03 · Bài tập 4 · Chọn lọc & Phân loại ý tưởng',
    s3Ex4Heading: 'Phân loại 8 ý tưởng thành Lợi ích và Bất lợi',
    s3Ex4Desc:
      'Xếp từng ý vào nhóm Lợi ích (Advantages) hoặc Bất lợi (Disadvantages), đồng thời chọn xem bạn có đồng ý với ý đó hay không.',
    advantageLabel: 'Lợi ích',
    disadvantageLabel: 'Bất lợi',
    agreeLabel: 'Đồng ý',
    disagreeLabel: 'Không đồng ý',
    unsureLabel: 'Phân vân',
    yourStance: 'Quan điểm của bạn:',
    sortedCount: 'Đã phân loại',
    checkSortingBtn: 'Kiểm tra phân loại',
    s3SummaryTitle: 'Tổng hợp phân loại & Nhóm ý liên kết',
    s3AdvBucketTitle: 'Lợi ích — Advantages (Đáp án: 1, 4, 6, 7, 8)',
    s3DisadvBucketTitle: 'Bất lợi — Disadvantages (Đáp án: 2, 3, 5)',
    s3LinkNote:
      'Mẹo tổ chức ý: Hãy liên kết các ý gần nhau trước khi viết — VD: Ý 4, 1 & 6 gộp thành đoạn "tính giáo dục & dễ nhớ", Ý 7 & 8 gộp thành đoạn "tương tác thế giới thực", và Ý 2 & 3 thuộc nhóm "thời gian học trên lớp".',

    // Stage 4: Exercises 5, 6 & 7
    s4Ex5Kicker: 'Chặng 04 · Bài tập 5 · Phân tích đoạn thân bài thứ hai',
    s4Ex5Heading: 'Những ý nào từ Bài tập 4 được nhắc đến trong đoạn văn này?',
    s4Ex5Desc:
      'Đọc đoạn văn thứ hai dưới đây (tạm bỏ qua các số 1–7) và đánh dấu tất cả các ý từ Bài tập 4 xuất hiện trong bài.',
    s4CheckMentionsBtn: 'Kiểm tra các ý được nhắc đến',
    s4Ticked: 'Đã chọn',
    s4Ex5KeyNote:
      'Đáp án chính thức: 4, 2, 1, 6. (Ý 4 = mang tính giáo dục; Ý 2 đối chiếu học qua sách vở ở trường với "xem và làm" — hệ thống cũng chấp nhận ý 8; Ý 1 = xem hiện vật thật; Ý 6 = dễ ghi nhớ kiến thức hơn.)',

    s4Ex6Kicker: 'Chặng 04 · Bài tập 6 · Bổ sung cụm từ cụ thể',
    s4Ex6Heading: 'Chèn các cụm từ a–g vào vị trí 1–7 để cải thiện đoạn văn',
    s4Ex6Desc:
      'Nhấn vào một ô số trong đoạn văn rồi chọn cụm từ phù hợp ở kho từ bên dưới để chèn trực tiếp. Nhấn lại vào ô đang chọn đã điền để xóa.',
    activeSpace: 'Vị trí đang chọn',
    previousBtn: 'Ô trước',
    nextBtn: 'Ô tiếp',
    checkPhrasesBtn: 'Kiểm tra cụm từ',
    showBeforeAfterBtn: 'So sánh Trước & Sau',
    hideBeforeAfterBtn: 'Ẩn so sánh Trước & Sau',
    beforeLabel: 'Đoạn văn gốc (57 từ)',
    afterLabel: 'Đoạn văn đã nâng cấp với chi tiết cụ thể (86 từ)',
    ex6AltNote:
      'Lưu ý: Đáp án chuẩn là 1g, 2f, 3d, 4a, 5e, 6c, 7b — hoán đổi 2e và 5f cũng được chấp nhận.',
    ex6KeyOverview: 'Tổng hợp đáp án Bài tập 6',

    s4Ex7Kicker: 'Chặng 04 · Bài tập 7 · Tác dụng của thông tin bổ sung',
    s4Ex7Heading: 'Thông tin bổ sung giúp cải thiện đoạn văn như thế nào?',
    s4Ex7Desc:
      'So sánh đoạn gốc và đoạn đã thêm chi tiết ở trên, sau đó chọn nhận định đúng.',
    s4Ex7CheckBtn: 'Kiểm tra kết luận',
    s4Ex7Explanation:
      'Việc thêm địa danh cụ thể (in the UK, the Natural History Museum in London), chủ đề rõ ràng (animals\' lives, past history or geology) và tính từ chuẩn xác (factual) giúp lập luận cụ thể và thuyết phục hơn hẳn. Hãy đặt mục tiêu thêm 2–3 chi tiết cụ thể trong mỗi đoạn thân bài.',

    // Stage 5: Exercise 8
    s5Ex8Kicker: 'Chặng 05 · Bài tập 8 · Viết đoạn văn có hướng dẫn',
    s5Ex8Heading: 'Tự viết một đoạn văn về một lợi ích hoặc bất lợi khác',
    s5Ex8Desc:
      'Chọn câu mở đầu bên dưới (hoặc dùng câu mở đầu chính thức của sách), phát triển 1–2 ý hỗ trợ với chi tiết cụ thể và tự kiểm tra theo mẫu Bài tập 5 & 6.',
    chooseFocusLabel: 'Chọn câu mở đầu đoạn:',
    viewModelRefBtn: 'Xem đoạn mẫu BT 5–6',
    hideModelRefBtn: 'Ẩn đoạn mẫu BT 5–6',
    modelRefTitle: 'Đoạn văn mẫu tham khảo (Bài tập 5 & 6)',
    precisionHelpersPrompt: 'Nhấn vào từ nối hoặc cụm mở rộng chi tiết để chèn nhanh:',
    draftPlaceholder:
      'Another advantage is that visits can help students interact with the real world...',
    wordsCounterLabel: 'Số từ',
    targetWordRange: 'mục tiêu 60–85 từ',
    statusStart: 'Viết tiếp từ câu mở đầu',
    statusAim: 'Hướng tới 60–85 từ',
    statusTarget: 'Đạt độ dài mục tiêu',
    statusAbove: 'Trên 85 từ (viết gọn hơn càng tốt)',
    checklistTitle: 'Bảng tự kiểm tra đoạn văn (theo Bài tập 5–7)',
    check1: 'Mở đầu bằng câu chủ đề rõ ràng dùng danh từ chung (benefit / advantage / disadvantage)',
    check2: 'Có ví dụ thực tế cụ thể (VD: quốc gia, địa điểm hoặc hoạt động cụ thể)',
    check3: 'Đưa vào 2–3 chi tiết cụ thể thay vì nói chung chung',
    check4: 'Kết đoạn bằng câu nêu kết quả rõ ràng (VD: As a result, ...)',
    compareSampleBtn: 'So sánh với đoạn văn mẫu',
    hideSampleBtn: 'Ẩn đoạn văn mẫu',
    modelSampleTitle: 'Đoạn văn mẫu đối chiếu (Trình độ B1 4.0 Plus)',
    autoSaveNote: 'Ghi chú và bản nháp của bạn tự động lưu trên trình duyệt này.',
    resetDraftBtn: 'Khôi phục câu mở đầu',
  },
} as const;
