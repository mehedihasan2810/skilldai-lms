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

export const examPapers2 = [{ name: "10th", categories: grade10thCategories }];
