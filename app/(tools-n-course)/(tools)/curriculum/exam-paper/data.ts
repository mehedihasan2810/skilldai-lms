import { sub } from "date-fns";
import { url } from "inspector";

const subjects7th = [
  {
    name: "English",
    papers: [
      {
        name: "CBSE 7th Grade English - Periodical Test 3 (Dec 13, 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/English/cbse-class-7-periodical-test-3-english-131223-dec-2023.pdf",
      },
      {
        name: "CBSE 7th Grade English - SA2 Exam (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/English/cbse-class-7-sa2-english-2015.pdf",
      },
      {
        name: "CBSE 7th Grade English - Term 2 Exam (Nov 29, 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/English/cbse-class-7-term-2-english-291123-2023.pdf",
      },
    ],
  },
  {
    name: "Maths",
    papers: [
      {
        name: "CBSE 7th Grade Mathematics - Exam (Nov 29, 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Maths/cbse-class-7-mathematics-291123-2023.pdf",
      },
      {
        name: "CBSE 7th Grade Mathematics - SA1 Exam (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Maths/cbse-class-7-sa1-mathematics-2015.pdf",
      },
      {
        name: "CBSE 7th Grade Mathematics - SA2 Exam (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Maths/cbse-class-7-sa2-mathematics-2015.pdf",
      },
      {
        name: "CBSE 7th Grade Mathematics - Term 2 Exam (Nov 29, 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Maths/cbse-class-7-term-2-mathematics-291123-2023.pdf",
      },
      {
        name: "CBSE 7th Grade Mathematics - UT1 Test (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Maths/cbse-class-7-ut1-mathematics-2016.pdf",
      },
      {
        name: "CBSE 7th Grade Mathematics - UT3 Test (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Maths/cbse-class-7-ut3-mathematics-2015.pdf",
      },
    ],
  },
  {
    name: "Science",
    papers: [
      {
        name: "CBSE 7th Grade Moral Science - Exam (Nov 29, 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Science/cbse-class-7-moral-science-291123-2023.pdf",
      },
      {
        name: "CBSE 7th Grade Science - Periodical Test 3 (Dec 18, 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Science/cbse-class-7-periodical-test-3-science-181223-dec-2023.pdf",
      },
      {
        name: "CBSE 7th Grade Science - SA1 Exam (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Science/cbse-class-7-sa1-science-2015.pdf",
      },
      {
        name: "CBSE 7th Grade Science - SA2 Exam (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Science/cbse-class-7-sa2-science-2015.pdf",
      },
      {
        name: "CBSE 7th Grade Science - UT1 Test (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Science/cbse-class-7-ut1-science-2015.pdf",
      },
      {
        name: "CBSE 7th Grade Science - UT1 Test (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Science/cbse-class-7-ut1-science-2016.pdf",
      },
      {
        name: "CBSE 7th Grade Science - UT3 Test (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Science/cbse-class-7-ut3-science-2016.pdf",
      },
    ],
  },
  {
    name: "Social science",
    papers: [
      {
        name: "CBSE 7th Grade Social Science - SA1 Exam (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Social%20science/cbse-class-7-sa1-social-science-2015.pdf",
      },
      {
        name: "CBSE 7th Grade Social Science - SA2 Exam (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Social%20science/cbse-class-7-sa2-social-science-2015.pdf",
      },
      {
        name: "CBSE 7th Grade Social Science - Exam (Nov 29, 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Social%20science/cbse-class-7-Social-science-291123-2023.pdf",
      },
      {
        name: "CBSE 7th Grade Social Science - UT1 Test (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Social%20science/cbse-class-7-ut1-social-science-2016.pdf",
      },
      {
        name: "CBSE 7th Grade Social Science - UT3 Test (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Social%20science/cbse-class-7-ut3-social-science-2016.pdf",
      },
      {
        name: "CBSE 7th Grade Social Studies - UT3 Test (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/7th/Social%20science/cbse-class-7-ut3-social-studies-2015.pdf",
      },
    ],
  },
];

const subjects8th = [
  {
    name: "English",
    papers: [
      {
        name: "CBSE 8th Grade English - Exam Paper ENG1 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-ENG1_250124_102152.pdf",
      },
      {
        name: "CBSE 8th Grade English - Exam Paper (25 Jan 2023, 2019)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-english-250123-2019.pdf",
      },
      {
        name: "CBSE 8th Grade English - FA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-fa1-english-2015.pdf",
      },
      {
        name: "CBSE 8th Grade English - SA1 (07 Jul 2022)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-sa1-english-070724-2022.pdf",
      },
      {
        name: "CBSE 8th Grade English - SA1 (13 Jul 2022)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-sa1-english-130724-2022.pdf",
      },
      {
        name: "CBSE 8th Grade English - SA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-sa1-english-2015.pdf",
      },
      {
        name: "CBSE 8th Grade English - SA2 (09 Jul 2022)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-sa2-english-090724-2022.pdf",
      },
      {
        name: "CBSE 8th Grade English - SA2 (12 Jul 2022)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-sa2-english-120724-2022.pdf",
      },
      {
        name: "CBSE 8th Grade English - SA2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/English/cbse-class-8-sa2-english-2016.pdf",
      },
    ],
  },
  {
    name: "Maths",
    papers: [
      {
        name: "CBSE 8th Grade Mathematics - Exam Paper Math1 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/cbse-class-8-math1_250124_102225.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Exam Paper (01 Apr 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/cbse-class-8-mathematics-010424-mar-2024.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Exam Paper (25 Jan 2019)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/cbse-class-8-mathematics-250123-2019.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Sample Paper Set 2 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/CBSE-Class-8-Maths-Sample-Paper-Set-2_250124_102748.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Sample Paper Set 3 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/CBSE-Class-8-Maths-Sample-Paper-Set-3_250124_102808.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Sample Paper Set 4 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/CBSE-Class-8-Maths-Sample-Paper-Set-4_250124_102825.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Sample Paper Set 5 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/CBSE-Class-8-Maths-Sample-Paper-Set-5_250124_102846.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - SA1 (12 Jul 2022)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/cbse-class-8-sa1-mathematics-120724-2022.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Previous Year Question Paper 1",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/Class8 Mathematics Maths Previous Year Question Paper 1.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Previous Year Question Paper 2",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/Class8 Mathematics Maths Previous Year Question Paper 2.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Previous Year Question Paper 3",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/Class8 Mathematics Maths Previous Year Question Paper 3.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Previous Year Question Paper 4",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/Class8 Mathematics Maths Previous Year Question Paper 4.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Previous Year Question Paper 5",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/Class8 Mathematics Maths Previous Year Question Paper 5.pdf",
      },
      {
        name: "CBSE 8th Grade Mathematics - Previous Year Question Paper 6",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Maths/Class8 Mathematics Maths Previous Year Question Paper 6.pdf",
      },
    ],
  },
  {
    name: "Science",
    papers: [
      {
        name: "CBSE 8th Grade Science - Exam Paper Science1 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Science/cbse-class-8-Science1_250124_102257.pdf",
      },
      {
        name: "CBSE 8th Grade Science - Exam Paper (25 Jan 2019)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Science/cbse-class-8-science-250123-2019.pdf",
      },
      {
        name: "CBSE 8th Grade Science - Exam Paper (26 Feb 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Science/cbse-class-8-science-260224-feb-2024.pdf",
      },
      {
        name: "CBSE 8th Grade Science - Sample Paper Set 2 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Science/CBSE-Class-8-Science-Sample-Paper-Set-2_250124_102511.pdf",
      },
      {
        name: "CBSE 8th Grade Science - Sample Paper Set 3 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Science/CBSE-Class-8-Science-Sample-Paper-Set-3_250124_102543.pdf",
      },
      {
        name: "CBSE 8th Grade Science - Sample Paper Set 4 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Science/CBSE-Class-8-Science-Sample-Paper-Set-4_250124_102613.pdf",
      },
      {
        name: "CBSE 8th Grade Science - Sample Paper Set 5 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Science/CBSE-Class-8-Science-Sample-Paper-Set-5_250124_102639.pdf",
      },
      {
        name: "CBSE 8th Grade Science - Term 1 Exam (30 Sep 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Science/cbse-class-8-term-1-science-300923-2023.pdf",
      },
    ],
  },
  {
    name: "Social science",
    papers: [
      {
        name: "CBSE 8th Grade Social Science - FA1 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-fa1-social-science-2016.pdf",
      },
      {
        name: "CBSE 8th Grade History - Exam Paper History1 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-History1_250124_102319.pdf",
      },
      {
        name: "CBSE 8th Grade Social Science - Hybrid Exam (29 Nov 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-hy-social-science-291123-2024.pdf",
      },
      {
        name: "CBSE 8th Grade Social Science - SA1 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-sa1-social-science-2017.pdf",
      },
      {
        name: "CBSE 8th Grade Social Studies - SA1 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-sa1-social-studies-2016.pdf",
      },
      {
        name: "CBSE 8th Grade Social Science - SA2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-sa2-social-science-2016.pdf",
      },
      {
        name: "CBSE 8th Grade Social Science - Exam Paper (01 Apr 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-social-science-010424-mar-2024.pdf",
      },
      {
        name: "CBSE 8th Grade Social Studies - Term 1 Exam (30 Sep 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-term-1-social-studies-300923-2023.pdf",
      },
      {
        name: "CBSE 8th Grade Social Studies - UT2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-ut2-social-studies-2016.pdf",
      },
      {
        name: "CBSE 8th Grade Social Studies - UT2 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/cbse-class-8-ut2-social-studies-2017.pdf",
      },
      {
        name: "CBSE 8th Grade Social Science - Sample Paper Set 1 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/CBSE-Sample-Papers-Social-Science-Class-8-Set-1_250124_104651.pdf",
      },
      {
        name: "CBSE 8th Grade Social Science - Sample Paper Set 2 (25 Jan 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/8th/Social%20science/CBSE-Social-Science-Class-8-Sample-Paper-Set-2_250124_104716.pdf",
      },
    ],
  },
];

const subjects9th = [
  {
    name: "English",
    papers: [
      {
        name: "CBSE 9th Grade English - Initial Paper Test",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-English_I_PT.pdf",
      },
      {
        name: "CBSE 9th Grade English - FA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-fa1-english-2015.pdf",
      },
      {
        name: "CBSE 9th Grade English - FA1 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-fa1-english-2016 (1).pdf",
      },
      {
        name: "CBSE 9th Grade English - First Term Exam (24 Oct 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-first-term-english-241123-oct-2023.pdf",
      },
      {
        name: "CBSE 9th Grade English - SA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-sa1-english-2015.pdf",
      },
      {
        name: "CBSE 9th Grade English - SA1 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-sa1-english-2017.pdf",
      },
      {
        name: "CBSE 9th Grade English - SA2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-sa2-english-2016.pdf",
      },
      {
        name: "CBSE 9th Grade English - UT2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-ut2-english-2016.pdf",
      },
      {
        name: "CBSE 9th Grade English - Previous Year Exam Paper 1",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/Class9 English English Previous Year Question Paper.pdf",
      },
      {
        name: "CBSE 9th Grade English - Previous Year Exam Paper 2",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/Class9 English Previous Year Question Paper English.pdf",
      },
    ],
  },
  {
    name: "ICT",
    papers: [
      {
        name: "CBSE 9th Grade ICT - First Term Exam (24 Oct 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/ICT/cbse-class-9-first-term-information-technology-241123-oct-2023.pdf",
      },
      {
        name: "CBSE 9th Grade ICT - Exam Paper 402 (02 Apr 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/ICT/cbse-class-9-information-technology-402-020424-mar-2024.pdf",
      },
    ],
  },
  {
    name: "Maths",
    papers: [
      {
        name: "CBSE 9th Grade Mathematics - FA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-fa1-mathematics-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - FA1 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-fa1-mathematics-2016.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - FA1 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-fa1-mathematics-2017.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - FA2 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-fa2-mathematics-fa-2-2017.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - First Term Exam (24 Oct 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-first-term-mathematics-241123-oct-2023.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - Exam Paper (01 Apr 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-mathematics-010424-feb-2024.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - SA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-sa1-mathematics-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - SA1 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-sa1-mathematics-2017.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - UT2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-ut2-mathematics-2016.pdf",
      },
      {
        name: "CBSE 9th Grade Mathematics - UT3 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Maths/cbse-class-9-ut3-mathematics-2017.pdf",
      },
    ],
  },
  {
    name: "Science",
    papers: [
      {
        name: "CBSE 9th Grade Science - FA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-fa1-science-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Science - FA2 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-fa2-science-fa-2-2017.pdf",
      },
      {
        name: "CBSE 9th Grade Science - SA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-sa1-science-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Science - SA1 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-sa1-science-2017.pdf",
      },
      {
        name: "CBSE 9th Grade Science - SA1 Set 1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-sa1-science-set-1-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Science - SA1 Set 2 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-sa1-science-set-2-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Science - SA2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-sa2-science-2016.pdf",
      },
      {
        name: "CBSE 9th Grade Science - SA2 Set 1 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-sa2-science-set-1-2016.pdf",
      },
      {
        name: "CBSE 9th Grade Science - Exam Paper (01 Apr 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-science-010424-mar-2024.pdf",
      },
      {
        name: "CBSE 9th Grade Science - Set 1 (2020)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-science-set-1-2020.pdf",
      },
      {
        name: "CBSE 9th Grade Science - UT2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/cbse-class-9-ut2-science-2016.pdf",
      },
      {
        name: "CBSE 9th Grade Science - Previous Year Exam Paper 3",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Science/Class9%20English%20Science%20Previous%20Year%20Question%20Paper%203.pdf",
      },
    ],
  },
  {
    name: "Social Science",
    papers: [
      {
        name: "CBSE 9th Grade Social Science - FA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-fa1-social-science-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Social Science - FA2 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-fa2-social-science-fa-2-2017.pdf",
      },
      {
        name: "CBSE 9th Grade Social Science - First Term Exam (24 Oct 2023)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-first-term-social-science-241123-oct-2023.pdf",
      },
      {
        name: "CBSE 9th Grade Social Science - SA1 (2011)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-sa1-social-science-2011.pdf",
      },
      {
        name: "CBSE 9th Grade Social Science - SA1 (2017)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-sa1-social-science-2017.pdf",
      },
      {
        name: "CBSE 9th Grade Social Studies - SA1 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-sa1-social-studies-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Social Science - SA2 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-sa2-social-science-2015.pdf",
      },
      {
        name: "CBSE 9th Grade Social Science - Exam Paper 087 (08 Apr 2024)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-social-science-087-080424-2024.pdf",
      },
      {
        name: "CBSE 9th Grade Social Science - Set 1 (2020)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-social-science-set-1-2020.pdf",
      },
      {
        name: "CBSE 9th Grade Social Science - UT2 (2016)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-ut2-social-science-2016.pdf",
      },
      {
        name: "CBSE 9th Grade Social Studies - UT2 (2015)",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/cbse-class-9-ut2-social-studies-2015.pdf",
      },
    ],
  },
];

const subjects11th = [
  {
    name: "Accounts",
    papers: [
      {
        name: "class11-accounts-qp-2018-1-025a19bbc0a57.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-accounts-qp-2018-1-025a19bbc0a57.pdf",
      },
      {
        name: "class11-accounts-qp-2019-025a19baf1368.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-accounts-qp-2019-025a19baf1368.pdf",
      },
      {
        name: "class11-accounts-qp-2020-025a19a494138.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-accounts-qp-2020-025a19a494138.pdf",
      },
      {
        name: "class11-accounts-sample-paper-01-1-converted-0253b13990fd6.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-accounts-sample-paper-01-1-converted-0253b13990fd6.pdf",
      },
      {
        name: "class11-accounts-sample-paper-02-1-converted-0253b13cd1b80.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-accounts-sample-paper-02-1-converted-0253b13cd1b80.pdf",
      },
      {
        name: "class11-accounts-sample-paper-03-0253b13dc89dd.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-accounts-sample-paper-03-0253b13dc89dd.pdf",
      },
      {
        name: "class11-accounts-sample-paper-04-0253b13ec1bb2.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-accounts-sample-paper-04-0253b13ec1bb2.pdf",
      },
      {
        name: "class11-accounts-sample-paper-05-0253b13fb15f5.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-accounts-sample-paper-05-0253b13fb15f5.pdf",
      },
      {
        name: "class11-Sample-Papers-Accountancy-2020-Set-2.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Accounts/class11-Sample-Papers-Accountancy-2020-Set-2.pdf",
      },
    ],
  },
  {
    name: "biology",
    papers: [
      {
        name: "Class-11-Biology-selfstudys_com_file (1).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(1).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file (2).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(2).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file (3).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(3).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file (4).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(4).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file (5).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(5).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file (6).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(6).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file (7).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(7).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file (8).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(8).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file (9).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file%20(9).pdf",
      },
      {
        name: "Class-11-Biology-selfstudys_com_file.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/biology/Class-11-Biology-selfstudys_com_file.pdf",
      },
    ],
  },
  {
    name: "Chemistry",
    papers: [
      {
        name: "class11-Chemistry-selfstudys_com_file (1).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file%20(1).pdf",
      },
      {
        name: "class11-Chemistry-selfstudys_com_file (2).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file%20(2).pdf",
      },
      {
        name: "class11-Chemistry-selfstudys_com_file (3).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file%20(3).pdf",
      },
      {
        name: "class11-Chemistry-selfstudys_com_file (4).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file%20(4).pdf",
      },
      {
        name: "class11-Chemistry-selfstudys_com_file (5).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file%20(5).pdf",
      },
      {
        name: "class11-Chemistry-selfstudys_com_file (6).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file%20(6).pdf",
      },
      {
        name: "class11-Chemistry-selfstudys_com_file (7).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file%20(7).pdf",
      },
      {
        name: "class11-Chemistry-selfstudys_com_file (8).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file%20(8).pdf",
      },
      {
        name: "class11-Chemistry-selfstudys_com_file.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Chemistry/class11-Chemistry-selfstudys_com_file.pdf",
      },
    ],
  },
  {
    name: "Economy",
    papers: [
      {
        name: "cbse-class-11-economics-2016.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Economy/cbse-class-11-economics-2016.pdf",
      },
      {
        name: "CBSE-CLASS-11-ECONOMICS-SAMPLE-PAPER-SET-1-QUESTIONS.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Economy/CBSE-CLASS-11-ECONOMICS-SAMPLE-PAPER-SET-1-QUESTIONS.pdf",
      },
      {
        name: "cbse-class-11-hy-economics-2016.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Economy/cbse-class-11-hy-economics-2016.pdf",
      },
      {
        name: "cbse-class-11-hy-economics-additional-2017.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Economy/cbse-class-11-hy-economics-additional-2017.pdf",
      },
      {
        name: "class11-Sample-Papers-Economics-2020-Set-2.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Economy/class11-Sample-Papers-Economics-2020-Set-2.pdf",
      },
    ],
  },
  {
    name: "English",
    papers: [
      {
        name: "cbse-class-11-english-120724-2022.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/English/cbse-class-11-english-120724-2022.pdf",
      },
      {
        name: "cbse-class-11-sa2-english-special-120724-2022.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/English/cbse-class-11-sa2-english-special-120724-2022.pdf",
      },
      {
        name: "Class 11 English Core Practice Paper 2022-23.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/English/Class%2011%20English%20Core%20Practice%20Paper%202022-23.pdf",
      },
      {
        name: "Class 11 English Core Practice Paper 2023-24 Set 2.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/English/Class%2011%20English%20Core%20Practice%20Paper%202023-24%20Set%202.pdf",
      },
    ],
  },
  {
    name: "Geography",
    papers: [
      {
        name: "class11_geography_eng_pp_2023_24_1.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Geography/class11_geography_eng_pp_2023_24_1.pdf",
      },
    ],
  },
  {
    name: "Maths",
    papers: [
      {
        name: "CBSE-Sample-Paper-Class-11-Maths-Set-10.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Maths/CBSE-Sample-Paper-Class-11-Maths-Set-10.pdf",
      },
      {
        name: "CBSE-Sample-Paper-Class-11-Maths-Set-3.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Maths/CBSE-Sample-Paper-Class-11-Maths-Set-3.pdf",
      },
      {
        name: "CBSE-Sample-Paper-Class-11-Maths-Set-4.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Maths/CBSE-Sample-Paper-Class-11-Maths-Set-4.pdf",
      },
      {
        name: "CBSE-Sample-Paper-Class-11-Maths-Set-5.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Maths/CBSE-Sample-Paper-Class-11-Maths-Set-5.pdf",
      },
      {
        name: "CBSE-Sample-Paper-Class-11-Maths-Set-6.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Maths/CBSE-Sample-Paper-Class-11-Maths-Set-6.pdf",
      },
      {
        name: "CBSE-Sample-Paper-Class-11-Maths-Set-7.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Maths/CBSE-Sample-Paper-Class-11-Maths-Set-7.pdf",
      },
      {
        name: "CBSE-Sample-Paper-Class-11-Maths-Set-8.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Maths/CBSE-Sample-Paper-Class-11-Maths-Set-8.pdf",
      },
      {
        name: "CBSE-Sample-Paper-Class-11-Maths-Set-9.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/Maths/CBSE-Sample-Paper-Class-11-Maths-Set-9.pdf",
      },
    ],
  },
  {
    name: "physics",
    papers: [
      {
        name: "class 11-Physics- selfstudys_com_file (10).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011-Physics-%20selfstudys_com_file%20(10).pdf",
      },
      {
        name: "class 11-Physics-selfstudys_com_file (1).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011-Physics-selfstudys_com_file%20(1).pdf",
      },
      {
        name: "class 11-Physics- selfstudys_com_file (2).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011-Physics-%20selfstudys_com_file%20(2).pdf",
      },
      {
        name: "class 11-Physics-selfstudys_com_file (3).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011-Physics-selfstudys_com_file%20(3).pdf",
      },
      {
        name: "class 11-Physics-selfstudys_com_file (4).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011-Physics-selfstudys_com_file%20(4).pdf",
      },
      {
        name: "class 11 -Physics-selfstudys_com_file (5).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011%20-Physics-selfstudys_com_file%20(5).pdf",
      },
      {
        name: "class 11 -Physics-selfstudys_com_file (6).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011%20-Physics-selfstudys_com_file%20(6).pdf",
      },
      {
        name: "class 11 -Physics-selfstudys_com_file (7).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011%20-Physics-selfstudys_com_file%20(7).pdf",
      },
      {
        name: "class 11-Physics- selfstudys_com_file (8).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011-Physics-%20selfstudys_com_file%20(8).pdf",
      },
      {
        name: "class 11-Physics- selfstudys_com_file (9).pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011-Physics-%20selfstudys_com_file%20(9).pdf",
      },
      {
        name: "class 11-Physics-selfstudys_com_file.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/physics/class%2011-Physics-selfstudys_com_file.pdf",
      },
    ],
  },
  {
    name: "History",
    papers: [
      {
        name: "cbse-class-11-hy-history-2016.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/cbse-class-11-hy-history-2016.pdf",
      },
    ],
  },
  {
    name: "Political Science",
    papers: [
      {
        name: "cbse-class-11-hy-political-science-2016.pdf",
        url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/11th/cbse-class-11-hy-political-science-2016.pdf",
      },
    ],
  },
];

export const examPapers = [
  { name: "7th", subjects: subjects7th },
  { name: "8th", subjects: subjects8th },
  { name: "9th", subjects: subjects9th },
  { name: "11th", subjects: subjects11th },
];

const grade10thCategories = [
  {
    name: "Compartment",
    years: [
      {
        name: "2019",
        subjects: [
          {
            name: "English",
            papers: [
              {
                name: "CBSE 10th Grade English - Paper 2.1.1: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/English/2_1_1_Eng_L_L_pdf.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.1.2: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/English/2_1_2_Eng_L_L_pdf.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.1.3: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/English/2_1_3_Eng_L_L_pdf.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.2.1: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/English/2_2_1_ENGLISH_LANGUAGE_AND_LETERATURE.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.2.2: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/English/2_2_2_ENGLISH_LANGUAGE_AND_LETERATURE.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.3.1: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/English/2_3_1_ENGLISH_LANGUAGE_AND_LETERATURE.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.3.2: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/English/2_3_2_ENGLISH_LANGUAGE_AND_LETERATURE.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.3.3: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/English/2_3_3_ENGLISH_LANGUAGE_AND_LETERATURE.pdf",
              },
            ],
          },
          {
            name: "Maths",
            papers: [
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-1-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-1-2_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-1-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-1-3_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-2-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-2-1_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-2-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-2-2_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-2-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-2-3_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-3-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-3-1_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-3-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-3-3_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-4-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-4-2_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-4-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-4-3_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-5-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-5-1_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-5-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-5-2_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-5-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/30-5-3_Mathematics.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - MS Mathematics Set 1 (2019)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Maths/MS_MATHEMATICS_SET_1_2019.pdf",
              },
            ],
          },
          {
            name: "Science",
            papers: [
              {
                name: "CBSE 10th Grade Science - Paper 32-1-1: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-1-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-1-2: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-1-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-1-3: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-1-3_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-2-1: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-2-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-2-2: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-2-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-2-3: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-2-3_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-3-1: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-3-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-3-2: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-3-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-3-3: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-3-3_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-4-1: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-4-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-4-2: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-4-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-4-3: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-4-3_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-5-1: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-5-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-5-2: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-5-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 32-5-3: Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Science/32-5-3_Social_Science.pdf",
              },
            ],
          },
          {
            name: "Social science",
            papers: [
              {
                name: "CBSE 10th Grade Social Science - Paper 32-1-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-1-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-1-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-1-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-1-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-1-3_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-2-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-2-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-2-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-2-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-2-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-2-3_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-3-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-3-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-3-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-3-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-3-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-3-3_Social_Science.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2020",
        subjects: [
          {
            name: "English",
            papers: [
              {
                name: "CBSE 10th Grade English - Paper 2.1.1: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-1-1_(English_L&L).pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.1.2: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-1-2_English_L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.1.3: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-1-3_English_L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.2.1: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-2-1_English_L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.2.2: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-2-2_English_L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.2.3: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-2-3_English_L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.3.1: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-3-1_English_L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.3.2: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-3-2_English_L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2.3.3: English Language & Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/English/2-3-3_English_L&L.pdf",
              },
            ],
          },
          {
            name: "Maths",
            papers: [
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-1-1: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-1-1_Mathematics_Theory_(Std).pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-1-2: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-1-2_Mathematics_Theory_(Std).pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-1-3: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-1-3_Mathematics_Theory_(Std).pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-2-1: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-2-1_Mathematics_Theory_(Std).pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-2-2: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-2-2_Mathematics_Theory_(Std).pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-2-3: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-2-3_Mathematics_Theory_(Std).pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-3-1: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-3-1_Mathematics_Theory_(Std).pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-3-2: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-3-2_Mathematics_Theory_(Std).pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-3-3: Mathematics Theory (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Maths/30-3-3_Mathematics_Theory_(Std).pdf",
              },
            ],
          },
          {
            name: "Science",
            papers: [
              {
                name: "CBSE 10th Grade Science - Paper 31-1-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-1-1_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-1-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-1-2_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-1-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-1-3_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-2-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-2-1_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-2-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-2-2_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-2-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-2-3_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-3-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-3-1_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-3-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-3-2_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-3-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Science/31-3-3_Science.pdf",
              },
            ],
          },
          {
            name: "Social science",
            papers: [
              {
                name: "CBSE 10th Grade Social Science - Paper 32-1-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-1-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-1-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-1-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-1-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-1-3_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-2-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-2-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-2-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-2-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-2-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-2-3_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-3-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-3-1_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-3-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-3-2_Social_Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-3-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2020/Social%20Science/32-3-3_Social_Science.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2021",
        subjects: [
          {
            name: "English",
            papers: [
              {
                name: "CBSE 10th Grade English - Question Paper: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2021/English/QP_184_ENGLISH_LANGUAGE_AND_LITERATURE.pdf",
              },
            ],
          },
          {
            name: "Maths",
            papers: [
              {
                name: "CBSE 10th Grade Mathematics - Question Paper: Paper 30-3-1 (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2021/Maths/QP_30_3_1_MATHS_STD.pdf",
              },
            ],
          },
          {
            name: "Science",
            papers: [
              {
                name: "CBSE 10th Grade Science - Question Paper: Paper 086",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2021/Science/QP_086_SCIENCE.pdf",
              },
            ],
          },
          {
            name: "Social Science",
            papers: [
              {
                name: "CBSE 10th Grade Social Science - Question Paper: Paper 087",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2021/Social%20Science/087_Social_Science.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2022",
        subjects: [
          {
            name: "Computer Applications",
            papers: [
              {
                name: "CBSE 10th Grade Computer Applications - Paper 53",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/Computer_Applications/53%20Computer%20Applications.pdf",
              },
            ],
          },
          {
            name: "English - Language and Literature",
            papers: [
              {
                name: "CBSE 10th Grade English - Paper 2-6-1: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/English_language_and_Literature/English_language_and_Literature/2-6-1_English%20language%20and%20Literature.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2-6-2: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/English_language_and_Literature/English_language_and_Literature/2-6-2_English%20language%20and%20Literature.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper 2-6-3: English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/English_language_and_Literature/English_language_and_Literature/2-6-3_English%20language%20and%20Literature.pdf",
              },
            ],
          },
          {
            name: "Home Science",
            papers: [
              {
                name: "CBSE 10th Grade Home Science - Paper 37",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/_Home_Science/37_Home%20Science.pdf",
              },
            ],
          },
          {
            name: "Information Technology",
            papers: [
              {
                name: "CBSE 10th Grade Information Technology - Paper 89",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/INFORMATION_TECHNOLOGY/89%20Information%20Technology.pdf",
              },
            ],
          },
          {
            name: "Mathematics (Standard)",
            papers: [
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-6-1 (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/MATHEMATICS_STD/Maths_Std/30-6-1%20Maths%20Std..pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-6-2 (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/MATHEMATICS_STD/Maths_Std/30-6-2%20Maths%20Std..pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics - Paper 30-6-3 (Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/MATHEMATICS_STD/Maths_Std/30-6-3%20Maths%20Std..pdf",
              },
            ],
          },
          {
            name: "Science",
            papers: [
              {
                name: "CBSE 10th Grade Science - Paper 31-6-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/SCIENCE/SCIENCE/31-6-1%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-6-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/SCIENCE/SCIENCE/31-6-2%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper 31-6-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/SCIENCE/SCIENCE/31-6-3%20SCIENCE.pdf",
              },
            ],
          },
          {
            name: "Social Science",
            papers: [
              {
                name: "CBSE 10th Grade Social Science - Paper 32-6-1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/SOCIAL_SCIENCE/Social_Science/32-6-1_Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-6-2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/SOCIAL_SCIENCE/Social_Science/32-6-2_Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper 32-6-3",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2022/SOCIAL_SCIENCE/Social_Science/32-6-3_Social%20Science.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2023",
        subjects: [
          {
            name: "Computer Applications",
            papers: [
              {
                name: "CBSE 10th Grade Computer Applications - Paper: Computer Applications",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Computer_applications/Computer_applications.pdf",
              },
            ],
          },
          {
            name: "English - Language and Literature",
            papers: [
              {
                name: "CBSE 10th Grade English - Paper: 2 C 1 English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/English_Lan_Lit/English_Lan_Lit/2_C_1%20English%20Language%20and%20Literature.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper: 2 C 2 English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/English_Lan_Lit/English_Lan_Lit/2_C_2%20English%20Language%20and%20Literature.pdf",
              },
              {
                name: "CBSE 10th Grade English - Paper: 2 C 3 English Language and Literature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/English_Lan_Lit/English_Lan_Lit/2_C_3%20English%20Language%20and%20Literature.pdf",
              },
            ],
          },
          {
            name: "Home Science",
            papers: [
              {
                name: "CBSE 10th Grade Home Science - Paper: Home Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Home_Science/Home_Science.pdf",
              },
            ],
          },
          {
            name: "Information Technology",
            papers: [
              {
                name: "CBSE 10th Grade Information Technology - Paper: Information Technology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Information_Technology/Information_Technology.pdf",
              },
            ],
          },
          {
            name: "Mathematics (Basic)",
            papers: [
              {
                name: "CBSE 10th Grade Mathematics (Basic) - Paper: 430 C 1 Mathematics Basic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Maths_Basic/Maths_Basic/430_C_1%20Mathematics%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Basic) - Paper: 430 C 2 Mathematics Basic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Maths_Basic/Maths_Basic/430_C_2%20Mathematics%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Basic) - Paper: 430 C 3 Mathematics Basic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Maths_Basic/Maths_Basic/430_C_3%20Mathematics%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Basic) - Paper: 430 C 4 Mathematics Basic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Maths_Basic/Maths_Basic/430_C_B%20Mathematics%20Basic.pdf",
              },
            ],
          },
          {
            name: "Mathematics (Standard)",
            papers: [
              {
                name: "CBSE 10th Grade Mathematics (Standard) - Paper: 30 C 1 Mathematics Standard",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Maths_Standard/Maths_Standard/30_C_1%20Mathematics%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Standard) - Paper: 30 C 2 Mathematics Standard",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Maths_Standard/Maths_Standard/30_C_2%20Mathematics%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Standard) - Paper: 30 C 3 Mathematics Standard",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Maths_Standard/Maths_Standard/30_C_3%20Mathematics%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Standard) - Paper: 30 C 4 Mathematics Standard",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Maths_Standard/Maths_Standard/30_C_B%20Mathematics%20Standard.pdf",
              },
            ],
          },
          {
            name: "Science",
            papers: [
              {
                name: "CBSE 10th Grade Science - Paper: 31 B C Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/31_B_C%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 31 C 1 Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/31_C_1%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 31 C 2 Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/31_C_2%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 31 C 3 Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/31_C_3%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 41 C 1 Science Punjabi",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/41_C_1%20SCIENCE%20Punjabi.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 41 C 2 Science Punjabi",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/41_C_2%20SCIENCE%20Punjabi.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 41 C 3 Science Punjabi",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/41_C_3%20SCIENCE%20Punjabi.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 47 C 1 Science Urdu",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/47_C_1%20SCIENCE%20URDU.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 47 C 2 Science Urdu",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/47_C_2%20SCIENCE%20URDU.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 47 C 3 Science Urdu",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Science/Science/47_C_3%20SCIENCE%20URDU.pdf",
              },
            ],
          },
          {
            name: "Social Science",
            papers: [
              {
                name: "CBSE 10th Grade Social Science - Paper: 32 C 1 Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Social_Science/Social_Science/32_C_1%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper: 32 C 2 Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Social_Science/Social_Science/32_C_2%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper: 32 C 3 Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Social_Science/Social_Science/32_C_3%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper: 48 C 1 Social Science Urdu",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Social_Science/Social_Science/48_C_1%20Social%20Science%20URDU.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper: 48 C 2 Social Science Urdu",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Social_Science/Social_Science/48_C_2%20Social%20Science%20URDU.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper: 48 C 3 Social Science Urdu",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2023/Social_Science/Social_Science/48_C_3%20Social%20Science%20URDU.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2024",
        subjects: [
          {
            name: "English Communicative",
            papers: [
              {
                name: "CBSE 10th Grade English Communicative - Paper: 1-S English Communicative",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/English_Communitive/1-S%20English%20Communitive.pdf",
              },
            ],
          },
          {
            name: "English - Language and Literature",
            papers: [
              {
                name: "CBSE 10th Grade English - Language and Literature - Paper: 2-S-1 English L&L",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/ENGLISH_L&L/2-S-1%20English%20L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Language and Literature - Paper: 2-S-2 English L&L",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/ENGLISH_L&L/2-S-2%20English%20L&L.pdf",
              },
              {
                name: "CBSE 10th Grade English - Language and Literature - Paper: 2-S-3 English L&L",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/ENGLISH_L&L/2-S-3%20English%20L&L.pdf",
              },
            ],
          },
          {
            name: "Home Science",
            papers: [
              {
                name: "CBSE 10th Grade Home Science - Paper: 37-S Home Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/Home_Science/37-S%20Home%20Science.pdf",
              },
            ],
          },
          {
            name: "Mathematics (Basic)",
            papers: [
              {
                name: "CBSE 10th Grade Mathematics (Basic) - Paper: 430(B)-S Mathematics Basic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/MATHEMATICS_BASIC/430(B)-S%20Mathematics%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Basic) - Paper: 430-S-1 Mathematics Basic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/MATHEMATICS_BASIC/430-S-1%20MATHEMATICS%20BASIC.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Basic) - Paper: 430-S-2 Mathematics Basic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/MATHEMATICS_BASIC/430-S-2%20MATHEMATICS%20BASIC.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Basic) - Paper: 430-S-3 Mathematics Basic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/MATHEMATICS_BASIC/430-S-3%20MATHEMATICS%20BASIC.pdf",
              },
            ],
          },
          {
            name: "Mathematics (Standard)",
            papers: [
              {
                name: "CBSE 10th Grade Mathematics (Standard) - Paper: 30-S-1 Mathematics Standard",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/MATHEMATICS_STANDARD/30(B)%20Mathematics%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Standard) - Paper: 30-S-2 Mathematics Standard",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/MATHEMATICS_STANDARD/30-S-1%20MATHEMATICS%20STANDARD.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Standard) - Paper: 30-S-3 Mathematics Standard",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/MATHEMATICS_STANDARD/30-S-2%20MATHEMATICS%20STANDARD.pdf",
              },
              {
                name: "CBSE 10th Grade Mathematics (Standard) - Paper: 30-S-4 Mathematics Standard",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/MATHEMATICS_STANDARD/30-S-3%20MATHEMATICS%20STANDARD.pdf",
              },
            ],
          },
          {
            name: "Science",
            papers: [
              {
                name: "CBSE 10th Grade Science - Paper: 31(B)-S Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/SCIENCE/31%20(B)-S%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 31-S-1 Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/SCIENCE/31-S-1%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 31-S-2 Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/SCIENCE/31-S-2%20SCIENCE.pdf",
              },
              {
                name: "CBSE 10th Grade Science - Paper: 31-S-3 Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/SCIENCE/31-S-3%20SCIENCE.pdf",
              },
            ],
          },
          {
            name: "Social Science",
            papers: [
              {
                name: "CBSE 10th Grade Social Science - Paper: 32-S-1 Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/SOCIAL_SCIENCE/SOCIAL%20SCIENCE%2032_S_1.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper: 32-S-2 Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/SOCIAL_SCIENCE/SOCIAL%20SCIENCE%2032_S_2.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science - Paper: 32-S-3 Social Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2024/SOCIAL_SCIENCE/SOCIAL%20SCIENCE%2032_S_3.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Mains",
    years: [
      {
        name: "2022",
        subjects: [
          {
            name: "Computer Applications",
            papers: [
              {
                name: "CBSE 10th Mains - Paper: 53 Computer Applications",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Computer_Applications/53_Computer%20Applications.pdf",
              },
            ],
          },
          {
            name: "Elements of Book-keeping and Accountancy",
            papers: [
              {
                name: "CBSE 10th Mains - Paper: 135 Elements of Book-keeping and Accountancy",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Elements_of_Book_keeping_and_Accountancy/135%20Elements%20of%20Book-keeping%20and%20Accountancy.pdf",
              },
            ],
          },
          {
            name: "English & Lit",
            papers: [
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-1-1 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-1-1%20English%20L%20&%20L.pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-1-2 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-1-2%20English%20L%20&%20L.pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-1-3 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-1-3%20English%20L%20&%20L.pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-2-1 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-2-1%20(English%20L%20&%20L).pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-2-2 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-2-2%20(English%20L%20&%20L).pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-2-3 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-2-3%20(English%20L%20&%20L).pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-3-1 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-3-1%20English%20L%20&%20L.pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-3-2 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-3-2%20English%20L%20&%20L.pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-3-3 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-3-3%20English%20L%20&%20L.pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-4-1 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-4-1%20(English%20L%20&%20L).pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-4-2 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-4-2%20(English%20L%20&%20L).pdf",
              },
              {
                name: "CBSE 10th Grade English - L & L (Paper: 2-4-3 English L & L)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/English_&_Lit/English_&_Lit/2-4-3%20(English%20L%20&%20L).pdf",
              },
            ],
          },
          {
            name: "Home Science",
            papers: [
              {
                name: " 37 Home Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Home_Science/37%20Home%20Science.pdf",
              },
            ],
          },
          {
            name: "Information Technology",
            papers: [
              {
                name: " 89 Information Technology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Information%20Technology/89%20Information%20Technology.pdf",
              },
            ],
          },
          {
            name: "Math_B",
            papers: [
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-1-1 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-1-1%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-1-2 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-1-2%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-1-3 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-1-3%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-2-1 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-2-1%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-2-2 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-2-2%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-2-3 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-2-3%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-3-1 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-3-1%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-3-2 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-3-2%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-3-3 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-3-3%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-4-1 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-4-1%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-4-2 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-4-2%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-4-3 Maths Basic)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-4-3%20Maths%20Basic.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 430-B-5 Maths Basic for VI candidates)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/430-B-5%20Maths%20Basic%20for%20VI%20candidates.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 446-2-1 Mathematics Basic Urdu version)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/446-2-1%20Mathematics%20Basic%20Urdu%20version.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 446-2-2 Mathematics Basic Urdu version)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/446-2-2%20Mathematics%20Basic%20Urdu%20version.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Basic (Paper: 446-2-3 Mathematics Basic Urdu version)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_B/Math_B/446-2-3%20Mathematics%20Basic%20Urdu%20version.pdf",
              },
            ],
          },
          {
            name: "Math_S",
            papers: [
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-1-1 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-1-1%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-1-2 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-1-2%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-1-3 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-1-3%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-2-1 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-2-1%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-2-2 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-2-2%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-2-3 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-2-3%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-3-1 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-3-1%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-3-2 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-3-2%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-3-3 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-3-3%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-4-1 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-4-1%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-4-2 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-4-2%20Maths%20Standard.pdf",
              },
              {
                name: "CBSE 10th Grade Maths Standard (Paper: 30-4-3 Maths Standard)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Math_S/Math_S/30-4-3%20Maths%20Standard.pdf",
              },
            ],
          },
          {
            name: "Science",
            papers: [
              {
                name: "CBSE 10th Grade Science (Paper: 31-1-1 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-1-1%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-1-2 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-1-2%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-1-3 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-1-3%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-2-1 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-2-1%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-2-2 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-2-2%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-2-3 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-2-3%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-3-1 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-3-1%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-3-2 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-3-2%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-3-3 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-3-3%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-4-1 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-4-1%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-4-2 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-4-2%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Science (Paper: 31-4-3 Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/Scince/Scince/31-4-3%20Science.pdf",
              },
            ],
          },
          {
            name: "Social Science",
            papers: [
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-1-1 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-1-1%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-1-2 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-1-2%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-1-3 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-1-3%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-2-1 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-2-1%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-2-2 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-2-2%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-2-3 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-2-3%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-3-1 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-3-1%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-3-2 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-3-2%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-3-3 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-3-3%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-4-1 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-4-1%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-4-2 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-4-2%20Social%20Science.pdf",
              },
              {
                name: "CBSE 10th Grade Social Science (Paper: 32-4-3 Social Science)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2022/SST/SST/32-4-3%20Social%20Science.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2023",
        subjects: [
          {
            name: "106_Data_Science",
            papers: [
              {
                name: " 106 Data Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/106_Data_Science/106_Data_Science.pdf",
              },
            ],
          },
          {
            name: "135_Eleements_Book_Keeping _ Acc",
            papers: [
              {
                name: " 135 Eleements Book Keeping _ Acc.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/135_Eleements_Book_Keeping%20_%20Acc/135_Eleements_Book_Keeping%20_%20Acc.pdf",
              },
            ],
          },
          {
            name: "37_Home_Science",
            papers: [
              {
                name: " 37 Home Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/37_Home_Science/37_Home_Science.pdf",
              },
            ],
          },
          {
            name: "53_Computer_Applications",
            papers: [
              {
                name: " 53 Computer Applications.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/53_Computer_Applications/53_Computer_Applications.pdf",
              },
            ],
          },
          {
            name: "89_Information_Technology",
            papers: [
              {
                name: " 89 Information Technology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/89_Information_Technology/89_Information_Technology.pdf",
              },
            ],
          },
          {
            name: "English_Language_Literature",
            papers: [
              {
                name: "2-1-1 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-1-1%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-1-2 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-1-2%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-1-3 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-1-3%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-2-1 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-2-1%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-2-2 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-2-2%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-2-3 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-2-3%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-4-1 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-4-1%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-4-2 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-4-2%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-4-3 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-4-3%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-5-1 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-5-1%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-5-2 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-5-2%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-5-3 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-5-3%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-6-1 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-6-1%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-6-2 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-6-2%20ENGLISH%20L_L.pdf",
              },
              {
                name: "2-6-3 ENGLISH L_L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/English_Language_Literature/English_Language_Literature/2-6-3%20ENGLISH%20L_L.pdf",
              },
            ],
          },
          {
            name: "MATHEMATICS_BASIC",
            papers: [
              {
                name: "430_1_1_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_1_1_Maths%20Basic.pdf",
              },
              {
                name: "430_1_2_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_1_2_Maths%20Basic.pdf",
              },
              {
                name: "430_1_3_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_1_3_Maths%20Basic.pdf",
              },
              {
                name: "430_2_1_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_2_1_Maths%20Basic.pdf",
              },
              {
                name: "430_2_2_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_2_2_Maths%20Basic.pdf",
              },
              {
                name: "430_2_3_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_2_3_Maths%20Basic.pdf",
              },
              {
                name: "430_4_1 Front Page Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_4_1%20Front%20Page%20Maths%20Basic.pdf",
              },
              {
                name: "430_4_1 Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_4_1%20Maths%20Basic.pdf",
              },
              {
                name: "430_4_2 Front Page Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_4_2%20Front%20Page%20Maths%20Basic.pdf",
              },
              {
                name: "430_4_2 Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_4_2%20Maths%20Basic.pdf",
              },
              {
                name: "430_4_3 Front Page Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_4_3%20Front%20Page%20Maths%20Basic.pdf",
              },
              {
                name: "430_4_3 Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_4_3%20Maths%20Basic.pdf",
              },
              {
                name: "430_5_1_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_5_1_Maths%20Basic.pdf",
              },
              {
                name: "430_5_2_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_5_2_Maths%20Basic.pdf",
              },
              {
                name: "430_5_3_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_5_3_Maths%20Basic.pdf",
              },
              {
                name: "430_6_1_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_6_1_Maths%20Basic.pdf",
              },
              {
                name: "430_6_2_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_6_2_Maths%20Basic.pdf",
              },
              {
                name: "430_6_3_Maths Basic.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_6_3_Maths%20Basic.pdf",
              },
              {
                name: "430_B_Maths Basic for VI candidates.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430_B_Maths%20Basic%20for%20VI%20candidates.pdf",
              },
              {
                name: "440_2_1_Maths Basic Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/440_2_1_Maths%20Basic%20Punjabi%20version.pdf",
              },
              {
                name: "440_2_2_Maths Basic Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/440_2_2_Maths%20Basic%20Punjabi%20version.pdf",
              },
              {
                name: "440_2_3_Maths Basic Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/440_2_3_Maths%20Basic%20Punjabi%20version.pdf",
              },
              {
                name: "440_B_Maths Basic for VI candidates.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/440_B_Maths%20Basic%20for%20VI%20candidates.pdf",
              },
              {
                name: "446_4_1 Maths Basic Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/446_4_1%20Maths%20Basic%20Urdu%20version.pdf",
              },
              {
                name: "446_4_2 Maths Basic Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/446_4_2%20Maths%20Basic%20Urdu%20version.pdf",
              },
              {
                name: "446_4_3 Maths Basic Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/446_4_3%20Maths%20Basic%20Urdu%20version.pdf",
              },
              {
                name: "446_B_Maths Basic for VI candidates Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_BASIC/MATHEMATICS_BASIC/446_B_Maths%20Basic%20for%20VI%20candidates%20Urdu%20version.pdf",
              },
            ],
          },
          {
            name: "MATHEMATICS_STANDARD",
            papers: [
              {
                name: "30_1_1_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_1_1_Maths%20Standard.pdf",
              },
              {
                name: "30_1_2_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_1_2_Maths%20Standard.pdf",
              },
              {
                name: "30_1_3_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_1_3_Maths%20Standard.pdf",
              },
              {
                name: "30_2_1_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_2_1_Maths%20Standard.pdf",
              },
              {
                name: "30_2_2_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_2_2_Maths%20Standard.pdf",
              },
              {
                name: "30_2_3_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_2_3_Maths%20Standard.pdf",
              },
              {
                name: "30_4_1 Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_4_1%20Maths%20Standard.pdf",
              },
              {
                name: "30_4_2 Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_4_2%20Maths%20Standard.pdf",
              },
              {
                name: "30_4_3 Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_4_3%20Maths%20Standard.pdf",
              },
              {
                name: "30_5_1_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_5_1_Maths%20Standard.pdf",
              },
              {
                name: "30_5_2_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_5_2_Maths%20Standard.pdf",
              },
              {
                name: "30_5_3_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_5_3_Maths%20Standard.pdf",
              },
              {
                name: "30_6_1_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_6_1_Maths%20Standard.pdf",
              },
              {
                name: "30_6_2_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_6_2_Maths%20Standard.pdf",
              },
              {
                name: "30_6_3_Maths Standard.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_6_3_Maths%20Standard.pdf",
              },
              {
                name: "30_B_5_Maths Std. for VI candidates.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_B_5_Maths%20Std.%20for%20VI%20candidates.pdf",
              },
              {
                name: "30_B_Maths Std. for VI candidates Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30_B_Maths%20Std.%20for%20VI%20candidates%20Punjabi%20version.pdf",
              },
              {
                name: "40_2_1_Maths Standard Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/40_2_1_Maths%20Standard%20Punjabi%20version.pdf",
              },
              {
                name: "40_2_2_Maths Standard Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/40_2_2_Maths%20Standard%20Punjabi%20version.pdf",
              },
              {
                name: "40_2_3_Maths Standard Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/40_2_3_Maths%20Standard%20Punjabi%20version.pdf",
              },
              {
                name: "46_4_1 Maths Std. Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/46_4_1%20Maths%20Std.%20Urdu%20version.pdf",
              },
              {
                name: "46_4_2 Maths Std. Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/46_4_2%20Maths%20Std.%20Urdu%20version.pdf",
              },
              {
                name: "46_4_3 Maths Std. Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/46_4_3%20Maths%20Std.%20Urdu%20version.pdf",
              },
              {
                name: "46_B_Maths Std. for VI candidates Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/46_B_Maths%20Std.%20for%20VI%20candidates%20Urdu%20version.pdf",
              },
            ],
          },
          {
            name: "SCIENCE",
            papers: [
              {
                name: "31_1_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_1_1_Science.pdf",
              },
              {
                name: "31_1_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_1_2_Science.pdf",
              },
              {
                name: "31_1_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_1_3_Science.pdf",
              },
              {
                name: "31_2_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_2_1_Science.pdf",
              },
              {
                name: "31_2_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_2_2_Science.pdf",
              },
              {
                name: "31_2_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_2_3_Science.pdf",
              },
              {
                name: "31_4_1_ Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_4_1_%20Science.pdf",
              },
              {
                name: "31_4_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_4_2_Science.pdf",
              },
              {
                name: "31_4_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_4_3_Science.pdf",
              },
              {
                name: "31_5_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_5_1_Science.pdf",
              },
              {
                name: "31_5_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_5_2_Science.pdf",
              },
              {
                name: "31_5_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_5_3_Science.pdf",
              },
              {
                name: "31_6_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_6_1_Science.pdf",
              },
              {
                name: "31_6_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_6_2_Science.pdf",
              },
              {
                name: "31_6_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_6_3_Science.pdf",
              },
              {
                name: "31_B_5_Science for VI.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/31_B_5_Science%20for%20VI.pdf",
              },
              {
                name: "41_2_1_Science punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/41_2_1_Science%20punjabi%20version.pdf",
              },
              {
                name: "41_2_2_Science punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/41_2_2_Science%20punjabi%20version.pdf",
              },
              {
                name: "41_2_3_Science punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/41_2_3_Science%20punjabi%20version.pdf",
              },
              {
                name: "41_B_5_Science for VI punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/41_B_5_Science%20for%20VI%20punjabi%20version.pdf",
              },
              {
                name: "47-4-1 Science Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/47-4-1%20Science%20Urdu%20version.pdf",
              },
              {
                name: "47-4-2 Science Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/47-4-2%20Science%20Urdu%20version.pdf",
              },
              {
                name: "47-4-3 Science Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/47-4-3%20Science%20Urdu%20version.pdf",
              },
              {
                name: "47_B_5_Science for VI Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SCIENCE/SCIENCE/47_B_5_Science%20for%20VI%20Urdu%20version.pdf",
              },
            ],
          },
          {
            name: "SOCIAL_SCIENCE",
            papers: [
              {
                name: "32_1_1 SOCIAL SCIENCE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_1_1%20SOCIAL%20SCIENCE.pdf",
              },
              {
                name: "32_1_2 SOCIAL SCIENCE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_1_2%20SOCIAL%20SCIENCE.pdf",
              },
              {
                name: "32_1_3 SOCIAL SCIENCE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_1_3%20SOCIAL%20SCIENCE.pdf",
              },
              {
                name: "32_2_1 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_2_1%20Social%20Science.pdf",
              },
              {
                name: "32_2_2 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_2_2%20Social%20Science.pdf",
              },
              {
                name: "32_2_3 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_2_3%20Social%20Science.pdf",
              },
              {
                name: "32_4_1 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_4_1%20Social%20Science.pdf",
              },
              {
                name: "32_4_2 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_4_2%20Social%20Science.pdf",
              },
              {
                name: "32_4_3 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_4_3%20Social%20Science.pdf",
              },
              {
                name: "32_5_1 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_5_1%20Social%20Science.pdf",
              },
              {
                name: "32_5_2 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_5_2%20Social%20Science.pdf",
              },
              {
                name: "32_5_3 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_5_3%20Social%20Science.pdf",
              },
              {
                name: "32_6_1 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_6_1%20Social%20Science.pdf",
              },
              {
                name: "32_6_2 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_6_2%20Social%20Science.pdf",
              },
              {
                name: "32_6_3 Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_6_3%20Social%20Science.pdf",
              },
              {
                name: "42_2_1 Social Science punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/42_2_1%20Social%20Science%20punjabi%20version.pdf",
              },
              {
                name: "42_2_2 Social Science punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/42_2_2%20Social%20Science%20punjabi%20version.pdf",
              },
              {
                name: "42_2_3 Social Science punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/42_2_3%20Social%20Science%20punjabi%20version.pdf",
              },
              {
                name: "48-4-1 Social Science Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/48-4-1%20Social%20Science%20Urdu%20version.pdf",
              },
              {
                name: "48-4-2 Social Science Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/48-4-2%20Social%20Science%20Urdu%20version.pdf",
              },
              {
                name: "48-4-3 Social Science Urdu version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2023/SOCIAL_SCIENCE/SOCIAL_SCIENCE/48-4-3%20Social%20Science%20Urdu%20version.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2024",
        subjects: [
          {
            name: "Computer_Applications",
            papers: [
              {
                name: "53_Computer Applications.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/Computer_Applications/53_Computer_Applications.pdf",
              },
            ],
          },
          {
            name: "Data_Science",
            papers: [
              {
                name: " 106_Data Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/Data_Science/106_Data_Science.pdf",
              },
            ],
          },
          {
            name: "Ele_Book_Keeping_Accountancy",
            papers: [
              {
                name: " 135_Ele Book-Keeping and Accountancy.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/Ele_Book_Keeping_Accountancy/135_Ele%20Book-Keeping%20and%20Accountancy.pdf",
              },
            ],
          },
          {
            name: "English_Communicative",
            papers: [
              {
                name: " 1_English Communicative.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/English_Communicative/1_English_Communicative.pdf",
              },
            ],
          },
          {
            name: "ENGLISH_L&L",
            papers: [
              {
                name: "2_1_1_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_1_1_English%20L%20&%20L.pdf",
              },
              {
                name: "2_1_2_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_1_2_English%20L%20&%20L.pdf",
              },
              {
                name: "2_1_3_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_1_3_English%20L%20&%20L.pdf",
              },
              {
                name: "2_2_1_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_2_1_English%20L%20&%20L.pdf",
              },
              {
                name: "2_2_2_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_2_2_English%20L%20&%20L.pdf",
              },
              {
                name: "2_2_3_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_2_3_English%20L%20&%20L.pdf",
              },
              {
                name: "2_3_1_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_3_1_English%20L%20&%20L.pdf",
              },
              {
                name: "2_3_2_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_3_2_English%20L%20&%20L.pdf",
              },
              {
                name: "2_3_3_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_3_3_English%20L%20&%20L.pdf",
              },
              {
                name: "2_4_1_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_4_1_English%20L%20&%20L.pdf",
              },
              {
                name: "2_4_2_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_4_2_English%20L%20&%20L.pdf",
              },
              {
                name: "2_4_3_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_4_3_English%20L%20&%20L.pdf",
              },
              {
                name: "2_5_1_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_5_1_English%20L%20&%20L.pdf",
              },
              {
                name: "2_5_2_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_5_2_English%20L%20&%20L.pdf",
              },
              {
                name: "2_5_3_English L & L.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/ENGLISH_L&L/ENGLISH_L&L/2_5_3_English%20L%20&%20L.pdf",
              },
            ],
          },
          {
            name: "Home_Science",
            papers: [
              {
                name: " 37_Home Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/Home_Science/37_Home_Science.pdf",
              },
            ],
          },
          {
            name: "Information_Technology",
            papers: [
              {
                name: " 89_Information Technology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/Information_Technology/89_Information_Technology.pdf",
              },
            ],
          },
          {
            name: "MATHEMATICS_BASIC",
            papers: [
              {
                name: "430-1-1MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-1-1MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-1-2MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-1-2MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-1-3MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-1-3MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-2-1MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-2-1MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-2-2MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-2-2MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-2-3MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-2-3MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-3-1MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-3-1MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-3-2MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-3-2MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-3-3MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-3-3MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-4-1MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-4-1MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-4-2MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-4-2MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-4-3MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-4-3MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-5-1MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-5-1MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-5-2MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-5-2MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430-5-3MATHEMATICS (BASIC).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430-5-3MATHEMATICS%20(BASIC).pdf",
              },
              {
                name: "430(B) Maths Basic for VI.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_BASIC/MATHEMATICS_BASIC/430(B)%20Maths%20Basic%20for%20VI.pdf",
              },
            ],
          },
          {
            name: "MATHEMATICS_STANDARD",
            papers: [
              {
                name: "30-1-1(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-1-1(Mathematics%20Standard).pdf",
              },
              {
                name: "30-1-2(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-1-2(Mathematics%20Standard).pdf",
              },
              {
                name: "30-1-3(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-1-3(Mathematics%20Standard).pdf",
              },
              {
                name: "30-2-1(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-2-1(Mathematics%20Standard).pdf",
              },
              {
                name: "30-2-2(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-2-2(Mathematics%20Standard).pdf",
              },
              {
                name: "30-2-3(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-2-3(Mathematics%20Standard).pdf",
              },
              {
                name: "30-3-1(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-3-1(Mathematics%20Standard).pdf",
              },
              {
                name: "30-3-2(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-3-2(Mathematics%20Standard).pdf",
              },
              {
                name: "30-3-3(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-3-3(Mathematics%20Standard).pdf",
              },
              {
                name: "30-4-1(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-4-1(Mathematics%20Standard).pdf",
              },
              {
                name: "30-4-2(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-4-2(Mathematics%20Standard).pdf",
              },
              {
                name: "30-4-3(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-4-3(Mathematics%20Standard).pdf",
              },
              {
                name: "30-5-1(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-5-1(Mathematics%20Standard).pdf",
              },
              {
                name: "30-5-2(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-5-2(Mathematics%20Standard).pdf",
              },
              {
                name: "30-5-3(Mathematics Standard).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30-5-3(Mathematics%20Standard).pdf",
              },
              {
                name: "30(B) Mathematics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/MATHEMATICS_STANDARD/MATHEMATICS_STANDARD/30(B)%20Mathematics.pdf",
              },
            ],
          },
          {
            name: "SCIENCE",
            papers: [
              {
                name: "31_1_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_1_1_Science.pdf",
              },
              {
                name: "31_1_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_1_2_Science.pdf",
              },
              {
                name: "31_1_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_1_3_Science.pdf",
              },
              {
                name: "31_2_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_2_1_Science.pdf",
              },
              {
                name: "31_2_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_2_2_Science.pdf",
              },
              {
                name: "31_2_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_2_3_Science.pdf",
              },
              {
                name: "31_3_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_3_1_Science.pdf",
              },
              {
                name: "31_3_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_3_2_Science.pdf",
              },
              {
                name: "31_3_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_3_3_Science.pdf",
              },
              {
                name: "31_4_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_4_1_Science.pdf",
              },
              {
                name: "31_4_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_4_2_Science.pdf",
              },
              {
                name: "31_4_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_4_3_Science.pdf",
              },
              {
                name: "31_5_1_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_5_1_Science.pdf",
              },
              {
                name: "31_5_2_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_5_2_Science.pdf",
              },
              {
                name: "31_5_3_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_5_3_Science.pdf",
              },
              {
                name: "31_B_Science_VI.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SCIENCE/SCIENCE/31_B_Science_VI.pdf",
              },
            ],
          },
          {
            name: "SOCIAL_SCIENCE",
            papers: [
              {
                name: "32_1_1_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_1_1_Social%20Science.pdf",
              },
              {
                name: "32_1_2_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_1_2_Social%20Science.pdf",
              },
              {
                name: "32_1_3_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_1_3_Social%20Science.pdf",
              },
              {
                name: "32_2_1_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_2_1_Social%20Science.pdf",
              },
              {
                name: "32_2_2_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_2_2_Social%20Science.pdf",
              },
              {
                name: "32_2_3_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_2_3_Social%20Science.pdf",
              },
              {
                name: "32_3_1_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_3_1_Social%20Science.pdf",
              },
              {
                name: "32_3_2_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_3_2_Social%20Science.pdf",
              },
              {
                name: "32_3_3_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_3_3_Social%20Science.pdf",
              },
              {
                name: "32_4_1_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_4_1_Social%20Science.pdf",
              },
              {
                name: "32_4_2_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_4_2_Social%20Science.pdf",
              },
              {
                name: "32_4_3_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_4_3_Social%20Science.pdf",
              },
              {
                name: "32_5_1_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_5_1_Social%20Science.pdf",
              },
              {
                name: "32_5_2_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_5_2_Social%20Science.pdf",
              },
              {
                name: "32_5_3_Social Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Mains/2024/SOCIAL_SCIENCE/SOCIAL_SCIENCE/32_5_3_Social%20Science.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
];

const grade12thCategories = [
  {
    name: "Compartment",
    years: [
      {
        name: "2022",
        subjects: [
          {
            name: "ACCOUNTANCY",
            papers: [
              {
                name: "264-6-1 Accountancy Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ACCOUNTANCY/ACCOUNTANCY/264-6-1%20Accountancy%20Urdu.pdf",
              },
              {
                name: "264-6-2 Accountancy Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ACCOUNTANCY/ACCOUNTANCY/264-6-2%20Accountancy%20Urdu.pdf",
              },
              {
                name: "264-6-3 Accountancy Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ACCOUNTANCY/ACCOUNTANCY/264-6-3%20Accountancy%20Urdu.pdf",
              },
              {
                name: "67-6-1 accountancy.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ACCOUNTANCY/ACCOUNTANCY/67-6-1%20accountancy.pdf",
              },
              {
                name: "67-6-2 accountancy.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ACCOUNTANCY/ACCOUNTANCY/67-6-2%20accountancy.pdf",
              },
              {
                name: "67-6-3 ACCOUNTANCY.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ACCOUNTANCY/ACCOUNTANCY/67-6-3%20ACCOUNTANCY.pdf",
              },
            ],
          },
          {
            name: "Applied_Mathematics",
            papers: [
              {
                name: "465 Applied Mathematics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Applied_Mathematics/465%20Applied%20Mathematics.pdf",
              },
            ],
          },
          {
            name: "Banking",
            papers: [
              {
                name: "335 Banking",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Banking/335%20Banking.pdf",
              },
            ],
          },
          {
            name: "BIOLOGY",
            papers: [
              {
                name: "57-6-1 BIOLOGY.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BIOLOGY/BIOLOGY/57-6-1%20BIOLOGY.pdf",
              },
              {
                name: "57-6-2 BIOLOGY.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BIOLOGY/BIOLOGY/57-6-2%20BIOLOGY.pdf",
              },
              {
                name: "57-6-3 BIOLOGY.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BIOLOGY/BIOLOGY/57-6-3%20BIOLOGY.pdf",
              },
              {
                name: "57-B-6 Biology Blind.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BIOLOGY/BIOLOGY/57-B-6%20Biology%20Blind.pdf",
              },
            ],
          },
          {
            name: "Biotechnology",
            papers: [
              {
                name: "99 Biotechnology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Biotechnology/99%20Biotechnology.pdf",
              },
            ],
          },

          {
            name: "BUSINESS_STUDIES",
            papers: [
              {
                name: "263-6-1 Business Studies Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BUSINESS_STUDIES/BUSINESS_STUDIES/263-6-1%20Business%20Studies%20Urdu.pdf",
              },
              {
                name: "263-6-2 Business Studies Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BUSINESS_STUDIES/BUSINESS_STUDIES/263-6-2%20Business%20Studies%20Urdu.pdf",
              },
              {
                name: "263-6-3 Business Studies Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BUSINESS_STUDIES/BUSINESS_STUDIES/263-6-3%20Business%20Studies%20Urdu.pdf",
              },
              {
                name: "66-6-1 BST.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BUSINESS_STUDIES/BUSINESS_STUDIES/66-6-1%20BST.pdf",
              },
              {
                name: "66-6-2 BST.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BUSINESS_STUDIES/BUSINESS_STUDIES/66-6-2%20BST.pdf",
              },
              {
                name: "66-6-3 BST.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/BUSINESS_STUDIES/BUSINESS_STUDIES/66-6-3%20BST.pdf",
              },
            ],
          },
          {
            name: "CHEMISTRY",
            papers: [
              {
                name: "56-6-1 CHEMISTRY.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/CHEMISTRY/CHEMISTRY/56-6-1%20CHEMISTRY.pdf",
              },
              {
                name: "56-6-2 CHEMISTRY.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/CHEMISTRY/CHEMISTRY/56-6-2%20CHEMISTRY.pdf",
              },
              {
                name: "56-6-3 CHEMISTRY.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/CHEMISTRY/CHEMISTRY/56-6-3%20CHEMISTRY.pdf",
              },
              {
                name: "56-B-6 Chemistry Blind.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/CHEMISTRY/CHEMISTRY/56-B-6%20Chemistry%20Blind.pdf",
              },
            ],
          },
          {
            name: "Commercial_Art",
            papers: [
              {
                name: "72 Commercial Art..pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Commercial_Art/Commercial_Art/72%20Commercial%20Art..pdf",
              },
              {
                name: "72 Commercial Art.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Commercial_Art/Commercial_Art/72%20Commercial%20Art.pdf",
              },
            ],
          },
          {
            name: "computer_science",
            papers: [
              {
                name: "91 computer science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/computer_science/91%20computer%20science.pdf",
              },
            ],
          },
          {
            name: "Cost Accounting",
            papers: [
              {
                name: "347 Cost Accounting",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Cost%20Accounting/347%20Cost%20Accounting.pdf",
              },
            ],
          },
          {
            name: "ECONOMICS",
            papers: [
              {
                name: "226-6-1 Economics Punjabi.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/226-6-1%20Economics%20Punjabi.pdf",
              },
              {
                name: "226-6-2 Economics Punjabi.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/226-6-2%20Economics%20Punjabi.pdf",
              },
              {
                name: "226-6-3 Economics Punjabi.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/226-6-3%20Economics%20Punjabi.pdf",
              },
              {
                name: "251-6-1 Economics Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/251-6-1%20Economics%20Urdu.pdf",
              },
              {
                name: "251-6-2 Economics Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/251-6-2%20Economics%20Urdu.pdf",
              },
              {
                name: "251-6-3 Economics Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/251-6-3%20Economics%20Urdu.pdf",
              },
              {
                name: "58-6-1 ECONOMICS.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/58-6-1%20ECONOMICS.pdf",
              },
              {
                name: "58-6-2 ECONOMICS.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/58-6-2%20ECONOMICS.pdf",
              },
              {
                name: "58-6-3 ECONOMICS.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/ECONOMICS/ECONOMICS/58-6-3%20ECONOMICS.pdf",
              },
            ],
          },
          {
            name: "Electrical_Technology",
            papers: [
              {
                name: "343 Electrical Technology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Electrical_Technology/343%20Electrical%20Technology.pdf",
              },
            ],
          },

          {
            name: "English_Core",
            papers: [
              {
                name: "1-6-1 English Core.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/English_Core/English_Core/1-6-1%20English%20Core.pdf",
              },
              {
                name: "1-6-2 English Core.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/English_Core/English_Core/1-6-2%20English%20Core.pdf",
              },
              {
                name: "1-6-3 ENGLISH CORE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/English_Core/English_Core/1-6-3%20ENGLISH%20CORE.pdf",
              },
            ],
          },
          {
            name: "Graphics",
            papers: [
              {
                name: "74 Graphics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Graphics/74%20Graphics.pdf",
              },
            ],
          },
          {
            name: "Home_Science",
            papers: [
              {
                name: "69 Home Science..pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Home_Science/Home_Science/69%20Home%20Science..pdf",
              },
              {
                name: "69 Home Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Home_Science/Home_Science/69%20Home%20Science.pdf",
              },
            ],
          },
          {
            name: "INFORMATIC PRACTICES",
            papers: [
              {
                name: "90 INFORMATIC PRACTICES.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/INFORMATIC%20PRACTICES/90%20INFORMATIC%20PRACTICES.pdf",
              },
            ],
          },
          {
            name: "Information_Technology",
            papers: [
              {
                name: "326 Information Technology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Information_Technology/326%20Information%20Technology.pdf",
              },
            ],
          },
          {
            name: "Library_and_Information_Science",
            papers: [
              {
                name: "360 Library and Information Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Library_and_Information_Science/360%20Library%20and%20Information%20Science.pdf",
              },
            ],
          },
          {
            name: "MATHS",
            papers: [
              {
                name: "65-6-1 MATHS.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/MATHS/MATHS/65-6-1%20MATHS.pdf",
              },
              {
                name: "65-6-2 maths.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/MATHS/MATHS/65-6-2%20maths.pdf",
              },
              {
                name: "65-6-3 maths.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/MATHS/MATHS/65-6-3%20maths.pdf",
              },
              {
                name: "65-B-6 Maths Blind.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/MATHS/MATHS/65-B-6%20Maths%20Blind.pdf",
              },
            ],
          },
          {
            name: "PHYSICAL EDUCATION",
            papers: [
              {
                name: "75 PHYSICAL EDUCATION.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/PHYSICAL%20EDUCATION/75%20PHYSICAL%20EDUCATION.pdf",
              },
            ],
          },
          {
            name: "PHYSICS",
            papers: [
              {
                name: "55-6-1 PHYSICS.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/PHYSICS/PHYSICS/55-6-1%20PHYSICS.pdf",
              },
              {
                name: "55-6-2 PHYSICS.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/PHYSICS/PHYSICS/55-6-2%20PHYSICS.pdf",
              },
              {
                name: "55-6-3 PHYSICS.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/PHYSICS/PHYSICS/55-6-3%20PHYSICS.pdf",
              },
              {
                name: "55-B-6 Physics Blind.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/PHYSICS/PHYSICS/55-B-6%20Physics%20Blind.pdf",
              },
            ],
          },
          {
            name: "POL_SCIENCE",
            papers: [
              {
                name: "221-6-1 Political Science Punjabi.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/221-6-1%20Political%20Science%20Punjabi.pdf",
              },
              {
                name: "221-6-2 Political Science Punjabi.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/221-6-2%20Political%20Science%20Punjabi.pdf",
              },
              {
                name: "221-6-3 Political Science Punjabi.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/221-6-3%20Political%20Science%20Punjabi.pdf",
              },
              {
                name: "252-6-1 Polotical Science Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/252-6-1%20Polotical%20Science%20Urdu.pdf",
              },
              {
                name: "252-6-2 Poliotical Science Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/252-6-2%20Poliotical%20Science%20Urdu.pdf",
              },
              {
                name: "252-6-3 Political Science Urdu.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/252-6-3%20Political%20Science%20Urdu.pdf",
              },
              {
                name: "59-6-1 POL SCIENCE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/59-6-1%20POL%20SCIENCE.pdf",
              },
              {
                name: "59-6-2 POL SCIENCE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/59-6-2%20POL%20SCIENCE.pdf",
              },
              {
                name: "59-6-3 POL SCIENCE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/POL_SCIENCE/POL_SCIENCE/59-6-3%20POL%20SCIENCE.pdf",
              },
            ],
          },
          {
            name: "Psychology",
            papers: [
              {
                name: "63 Psychology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Psychology/63%20Psychology.pdf",
              },
            ],
          },
          {
            name: "Shorthand_English",
            papers: [
              {
                name: "349 Shorthand English.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Shorthand_English/349%20Shorthand%20English.pdf",
              },
            ],
          },
          {
            name: "sociology",
            papers: [
              {
                name: "62 sociology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/sociology/62%20sociology.pdf",
              },
            ],
          },
          {
            name: "Yoga",
            papers: [
              {
                name: "365 Yoga.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2022/Yoga/365%20Yoga.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2023",
        subjects: [
          {
            name: "Accountancy",
            papers: [
              {
                name: "67_C_1 Accountancy.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Accountancy/Accountancy/67_C_1%20Accountancy.pdf",
              },
              {
                name: "67_C_2 Accountancy.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Accountancy/Accountancy/67_C_2%20Accountancy.pdf",
              },
              {
                name: "67_C_3 Accountancy.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Accountancy/Accountancy/67_C_3%20Accountancy.pdf",
              },
            ],
          },
          {
            name: "BANKING",
            papers: [
              {
                name: "BANKING",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/BANKING/BANKING.pdf",
              },
            ],
          },
          {
            name: "BIOTECHNOLOGY",
            papers: [
              {
                name: "BIOTECHNOLOGY",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/BIOTECHNOLOGY/BIOTECHNOLOGY.pdf",
              },
            ],
          },
          {
            name: "BUSINESS _ADMINISTRATION",
            papers: [
              {
                name: "BUSINESS ADMINISTRATION",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/BUSINESS%20_ADMINISTRATION/BUSINESS%20_ADMINISTRATION.pdf",
              },
            ],
          },
          {
            name: "Business_Studies",
            papers: [
              {
                name: "66_C_1 Business Studies.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Business_Studies/Business_Studies/66_C_1%20Business%20Studies.pdf",
              },
              {
                name: "66_C_2 Business Studies.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Business_Studies/Business_Studies/66_C_2%20Business%20Studies.pdf",
              },
              {
                name: "66_C_3 Business Studies.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Business_Studies/Business_Studies/66_C_3%20Business%20Studies.pdf",
              },
            ],
          },
          {
            name: "Chemistry",
            papers: [
              {
                name: "56_C_1 Chemistry.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Chemistry/Chemistry/56_C_1%20Chemistry.pdf",
              },
              {
                name: "56_C_2 Chemistry.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Chemistry/Chemistry/56_C_2%20Chemistry.pdf",
              },
              {
                name: "56_C_3 Chemistry.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Chemistry/Chemistry/56_C_3%20Chemistry.pdf",
              },
              {
                name: "56_C_B Chemistry.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Chemistry/Chemistry/56_C_B%20Chemistry.pdf",
              },
              {
                name: "58_C_1 Economics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Chemistry/Chemistry/58_C_1%20Economics.pdf",
              },
              {
                name: "58_C_2 Economics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Chemistry/Chemistry/58_C_2%20Economics.pdf",
              },
              {
                name: "58_C_3 Economics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Chemistry/Chemistry/58_C_3%20Economics.pdf",
              },
            ],
          },
          {
            name: "Computer_Science",
            papers: [
              {
                name: "Computer_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Computer_Science/Computer_Science.pdf",
              },
            ],
          },
          {
            name: "COST_ACCOUNTING",
            papers: [
              {
                name: "COST_ACCOUNTING.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/COST_ACCOUNTING/COST_ACCOUNTING.pdf",
              },
            ],
          },
          {
            name: "Economics",
            papers: [
              {
                name: "57_C_1 Biology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Economics/Economics/Biology_C_17_07_2023/57_C_1%20Biology.pdf",
              },
              {
                name: "57_C_2 Biology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Economics/Economics/Biology_C_17_07_2023/57_C_2%20Biology.pdf",
              },
              {
                name: "57_C_3 Biology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Economics/Economics/Biology_C_17_07_2023/57_C_3%20Biology.pdf",
              },
              {
                name: "57_C_B Biology.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Economics/Economics/Biology_C_17_07_2023/57_C_B%20Biology.pdf",
              },
            ],
          },
          {
            name: "ELECTRICAL_TECHNOLOGY",
            papers: [
              {
                name: "343 ELECTRICAL_TECHNOLOGY",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/ELECTRICAL_TECHNOLOGY/ELECTRICAL_TECHNOLOGY.pdf",
              },
              {
                name: "344 ELECTRICAL_TECHNOLOGY",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/ELECTRONICS_TECHNOLOGY/ELECTRONICS_TECHNOLOGY.pdf",
              },
            ],
          },

          {
            name: "ENGINEERING_GRAPHICS",
            papers: [
              {
                name: "ENGINEERING_GRAPHICS",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/ENGINEERING_GRAPHICS/ENGINEERING_GRAPHICS.pdf",
              },
            ],
          },
          {
            name: "English_Core",
            papers: [
              {
                name: "1_C_1 ENGLISH CORE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/English_Core/English_Core/1_C_1%20ENGLISH%20CORE.pdf",
              },
              {
                name: "1_C_2 ENGLISH CORE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/English_Core/English_Core/1_C_2%20ENGLISH%20CORE.pdf",
              },
              {
                name: "1_C_3 ENGLISH CORE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/English_Core/English_Core/1_C_3%20ENGLISH%20CORE.pdf",
              },
            ],
          },
          {
            name: "English_Elective",
            papers: [
              {
                name: "28_C ENGLISH ELECTIVE.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/English_Elective/English_Elective/28_C%20ENGLISH%20ELECTIVE.pdf",
              },
            ],
          },
          {
            name: "Entrepreneurship",
            papers: [
              {
                name: "Entrepreneurship.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Entrepreneurship/Entrepreneurship.pdf",
              },
            ],
          },
          {
            name: "Geography",
            papers: [
              {
                name: "255_C_1 GEOGRAPHY (URDU).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Geography/Geography/255_C_1%20GEOGRAPHY%20(URDU).pdf",
              },
              {
                name: "255_C_-2 GEOGRAPHY (URDU).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Geography/Geography/255_C_-2%20GEOGRAPHY%20(URDU).pdf",
              },
              {
                name: "255_C_3 GEOGRAPHY (URDU).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Geography/Geography/255_C_3%20GEOGRAPHY%20(URDU).pdf",
              },
              {
                name: "64_C_1 Geography.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Geography/Geography/64_C_1%20Geography.pdf",
              },
              {
                name: "64_C_2 Geography.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Geography/Geography/64_C_2%20Geography.pdf",
              },
              {
                name: "64_C_3 Geography.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Geography/Geography/64_C_3%20Geography.pdf",
              },
            ],
          },
          {
            name: "History",
            papers: [
              {
                name: "61_C_1 History.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/History/History/61_C_1%20History.pdf",
              },
              {
                name: "61_C_2 History.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/History/History/61_C_2%20History.pdf",
              },
              {
                name: "61_C_3 History.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/History/History/61_C_3%20History.pdf",
              },
            ],
          },
          {
            name: "HOME_SCIENCE",
            papers: [
              {
                name: "Home_Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/HOME_SCIENCE/Home_Science.pdf",
              },
              {
                name: "HOME_SCIENCE_PUNJABI.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/HOME_SCIENCE/HOME_SCIENCE_PUNJABI.pdf",
              },
              {
                name: "HOME_SCIENCE_URDU.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/HOME_SCIENCE/HOME_SCIENCE_URDU.pdf",
              },
            ],
          },

          {
            name: "Informatics_Practices",
            papers: [
              {
                name: "Informatics_Practices",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Informatics_Practices/Informatics_Practices.pdf",
              },
            ],
          },
          {
            name: "Information_Technology",
            papers: [
              {
                name: "Information_Technology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Information_Technology/Information_Technology.pdf",
              },
            ],
          },
          {
            name: "LIBRARYINFORMATION_SCIENCE_NEW",
            papers: [
              {
                name: "LIBRARYINFORMATION_SCIENCE_NEW",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/LIBRARYINFORMATION_SCIENCE_NEW/LIBRARYINFORMATION_SCIENCE_NEW.pdf",
              },
            ],
          },
          {
            name: "MARKETING",
            papers: [
              {
                name: "MARKETING",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/MARKETING/MARKETING.pdf",
              },
            ],
          },
          {
            name: "Mathematics",
            papers: [
              {
                name: "465_C Applied Mathematics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Mathematics/Mathematics/465_C%20Applied%20Mathematics.pdf",
              },
              {
                name: "65_C_1 Mathematics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Mathematics/Mathematics/65_C_1%20Mathematics.pdf",
              },
              {
                name: "65_C_2 Mathematics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Mathematics/Mathematics/65_C_2%20Mathematics.pdf",
              },
              {
                name: "65_C_3 Mathematics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Mathematics/Mathematics/65_C_3%20Mathematics.pdf",
              },
              {
                name: "65_C_B Mathematics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Mathematics/Mathematics/65_C_B%20Mathematics.pdf",
              },
            ],
          },
          {
            name: "PHYSICAL_EDUCATION",
            papers: [
              {
                name: "PHY_EDU_PUNJABI",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/PHYSICAL_EDUCATION/PHY_EDU_PUNJABI.pdf",
              },
              {
                name: "Physical_Education",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/PHYSICAL_EDUCATION/Physical_Education.pdf",
              },
            ],
          },
          {
            name: "Physics",
            papers: [
              {
                name: "55_C_1 Physics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Physics/Physics/55_C_1%20Physics.pdf",
              },
              {
                name: "55_C_2 Physics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Physics/Physics/55_C_2%20Physics.pdf",
              },
              {
                name: "55_C_3 Physics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Physics/Physics/55_C_3%20Physics.pdf",
              },
              {
                name: "55_C_B Physics.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Physics/Physics/55_C_B%20Physics.pdf",
              },
            ],
          },
          {
            name: "Political_Science",
            papers: [
              {
                name: "221_C_1 POLITICAL SCIENCE Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/221_C_1%20POLITICAL%20SCIENCE%20Punjabi%20version.pdf",
              },
              {
                name: "221_C_2 POLITICAL SCIENCE Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/221_C_2%20POLITICAL%20SCIENCE%20Punjabi%20version.pdf",
              },
              {
                name: "221_C_3 POLITICAL SCIENCE Punjabi version.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/221_C_3%20POLITICAL%20SCIENCE%20Punjabi%20version.pdf",
              },
              {
                name: "252_C_1 POLITICAL SCIENCE (URDU).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/252_C_1%20POLITICAL%20SCIENCE%20(URDU).pdf",
              },
              {
                name: "252_C_2 POLITICAL SCIENCE (URDU).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/252_C_2%20POLITICAL%20SCIENCE%20(URDU).pdf",
              },
              {
                name: "252_C_3 POLITICAL SCIENCE (URDU).pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/252_C_3%20POLITICAL%20SCIENCE%20(URDU).pdf",
              },
              {
                name: "59_C_1 Political Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/59_C_1%20Political%20Science.pdf",
              },
              {
                name: "59_C_2 Political Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/59_C_2%20Political%20Science.pdf",
              },
              {
                name: "59_C_3 Political Science.pdf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Political_Science/Political_Science/59_C_3%20Political%20Science.pdf",
              },
            ],
          },
          {
            name: "Psychology",
            papers: [
              {
                name: "Psychology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/Psychology/Psychology.pdf",
              },
            ],
          },
          {
            name: "SHORTHAND_ENGLISH",
            papers: [
              {
                name: "SHORTHAND_ENGLISH",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/SHORTHAND_ENGLISH/SHORTHAND_ENGLISH.pdf",
              },
            ],
          },
          {
            name: "SOCIOLOGY",
            papers: [
              {
                name: "Sociology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/SOCIOLOGY/Sociology.pdf",
              },
              {
                name: "SOCIOLOGY_PUNJABI",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/SOCIOLOGY/SOCIOLOGY_PUNJABI.pdf",
              },
              {
                name: "SOCIOLOGY_URDU",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/SOCIOLOGY/SOCIOLOGY_URDU.pdf",
              },
            ],
          },
          {
            name: "YOGA",
            papers: [
              {
                name: "YOGA",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2023/YOGA/YOGA.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "2024",
        subjects: [
          {
            name: "Accountancy",
            papers:[
              {
                  "name": "67-S-1 ACCOUNTANCY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Accountancy/67-S-1%20ACCOUNTANCY.pdf"
              },
              {
                  "name": "67-S-2 ACCOUNTANCY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Accountancy/67-S-2%20ACCOUNTANCY.pdf"
              },
              {
                  "name": "67-S-3 ACCOUNTANCY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Accountancy/67-S-3%20ACCOUNTANCY.pdf"
              }
          ]
          },
          {
            name: "Applied_Maths",
            papers: [
              {
                name: "465-S Applied Maths",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Applied_Maths/465-S%20Applied%20Maths.pdf",
              },
            ],
          },
          {
            name: "Biology",
            papers: [
              {
                  "name": "57(B) Biology.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Biology/57(B)%20Biology.pdf"
              },
              {
                  "name": "57-S-1 Biology.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Biology/57-S-1%20Biology.pdf"
              },
              {
                  "name": "57-S-2 BIOLOGY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Biology/57-S-2%20BIOLOGY.pdf"
              },
              {
                  "name": "57-S-3 BIOLOGY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Biology/57-S-3%20BIOLOGY.pdf"
              }
          ]
          },
          {
            name: "BIOTECHNOLOGY",
            papers: [
              {
                name: "99-S BIOTECHNOLOGY",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/BIOTECHNOLOGY/99-S%20BIOTECHNOLOGY.pdf",
              },
            ],
          },
          {
            name: "BUSINESS_STUDIES",
            papers: [
              {
                  "name": "66-S-1 Business Studies.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/BUSINESS_STUDIES/66-S-1%20Business%20Studies.pdf"
              },
              {
                  "name": "66-S-2 BUSINESS STUDIES.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/BUSINESS_STUDIES/66-S-2%20BUSINESS%20STUDIES.pdf"
              },
              {
                  "name": "66-S-3 BUSINESS STUDIES.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/BUSINESS_STUDIES/66-S-3%20BUSINESS%20STUDIES.pdf"
              }
          ]
          },
          {
            name: "Chemistry",
            papers: [
              {
                  "name": "56(B)-S Chemistry.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Chemistry/56(B)-S%20Chemistry.pdf"
              },
              {
                  "name": "56-S-1 Chemistry.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Chemistry/56-S-1%20Chemistry.pdf"
              },
              {
                  "name": "56-S-2 CHEMISTRY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Chemistry/56-S-2%20CHEMISTRY.pdf"
              },
              {
                  "name": "56-S-3 CHEMISTRY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Chemistry/56-S-3%20CHEMISTRY.pdf"
              }
          ]
          },
          {
            name: "Computer_Science",
            papers: [
              {
                name: "91-S Computer Science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Computer_Science/91-S%20Computer%20Science.pdf",
              },
            ],
          },
          {
            name: "Data_Science",
            papers: [
              {
                name: "368-S Data science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Data_Science/368-S%20Data%20science.pdf",
              },
            ],
          },
          {
            name: "Economics",
            papers: [
              {
                  "name": "58-S-1 Economics.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Economics/58-S-1%20Economics.pdf"
              },
              {
                  "name": "58-S-2 ECONOMICS.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Economics/58-S-2%20ECONOMICS.pdf"
              },
              {
                  "name": "58-S-3 ECONOMICS.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Economics/58-S-3%20ECONOMICS.pdf"
              }
          ]
          },
          {
            name: "English_Core",
            papers: [
              {
                  "name": "1-S-1 English Core.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/English_Core/1-S-1%20English%20Core.pdf"
              },
              {
                  "name": "1-S-2 English Core.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/English_Core/1-S-2%20English%20Core.pdf"
              },
              {
                  "name": "1-S-3 English Core.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/English_Core/1-S-3%20English%20Core.pdf"
              }
          ]
          },
          {
            name: "English_Elective",
            papers: [
              {
                name: "28 -S - English Elective",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/English_Elective/28%20-S%20-%20English%20Elective.pdf",
              },
            ],
          },
          {
            name: "Financial_Markets_Management",
            papers: [
              {
                name: "329-S Financial Markets Management",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Financial_Markets_Management/329-S%20Financial%20Markets%20Management.pdf",
              },
            ],
          },
          {
            name: "History",
            papers: [
              {
                  "name": "61-S-1 HISTORY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/History/61-S-1%20HISTORY.pdf"
              },
              {
                  "name": "61-S-2 HISTORY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/History/61-S-2%20HISTORY.pdf"
              },
              {
                  "name": "61-S-3 HISTORY.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/History/61-S-3%20HISTORY.pdf"
              }
          ]
          },
          {
            name: "Home_Science",
            papers: [
              {
                name: "69-S Home Science (Theory)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Home_Science/69-S%20Home%20Science%20(Theory).pdf",
              },
            ],
          },
          {
            name: "Information_Practices",
            papers: [
              {
                name: "90-S Information Practices",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Information_Practices/90-S%20Information%20Practices.pdf",
              },
            ],
          },
          {
            name: "Information_Technology",
            papers: [
              {
                name: "326-S Information Technology-S",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Information_Technology/326-S%20Information%20Technology-S.pdf",
              },
            ],
          },
          {
            name: "Mathematics",
            papers: [
              {
                  "name": "65-S-1 MATHEMATICS.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Mathematics/65-S-1%20MATHEMATICS.pdf"
              },
              {
                  "name": "65-S-2 MATHEMATICS.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Mathematics/65-S-2%20MATHEMATICS.pdf"
              },
              {
                  "name": "65-S-3 MATHEMATICS.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Mathematics/65-S-3%20MATHEMATICS.pdf"
              }
          ]
          },
          {
            name: "Physical_Education",
            papers: [
              {
                  "name": "75-S Physical Education.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Physical_Education/75-S%20Physical%20Education.pdf"
              }
          ]
          },
          {
            name: "Physics",
            papers: [
              {
                  "name": "55(B)-S Physics.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Physics/55(B)-S%20Physics.pdf"
              },
              {
                  "name": "55-S-1 Physics.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Physics/55-S-1%20Physics.pdf"
              },
              {
                  "name": "55-S-2 PHYSICS.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Physics/55-S-2%20PHYSICS.pdf"
              },
              {
                  "name": "55-S-3 PHYSICS.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Physics/55-S-3%20PHYSICS.pdf"
              }
          ]
          },
          {
            name: "Poltical_Science",
            papers: [
              {
                  "name": "59-1-1 POL SCIENCE.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Poltical_Science/59-1-1%20POL%20SCIENCE.pdf"
              },
              {
                  "name": "59-1-2 POL SCIENCE.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Poltical_Science/59-1-2%20POL%20SCIENCE.pdf"
              },
              {
                  "name": "59-1-3 POL SCIENCE.pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Poltical_Science/59-1-3%20POL%20SCIENCE.pdf"
              }
          ]
          },
          {
            name: "SHORTHAND",
            papers: [
              {
                  "name": "349-S SHORTHAND (ENGLISH).pdf",
                  "url": "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/SHORTHAND/349-S%20SHORTHAND%20(ENGLISH).pdf"
              }
          ]
          },
          {
            name: "Sociology",
            papers: [
              {
                name: "62-S Sociology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Sociology/62-S%20Sociology.pdf",
              },
            ],
          },
          {
            name: "Yoga",
            papers: [
              {
                name: "365-S Yoga",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Compartment/2024/Yoga/365-S%20Yoga.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  { name: "Mains", years: [{ name: "2022", subjects: [] }] },
];

export const examPapers2 = [{ name: "10th", categories: grade10thCategories },
{ name: "12th", categories: grade12thCategories }
];
