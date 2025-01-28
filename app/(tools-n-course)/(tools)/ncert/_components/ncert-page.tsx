"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookText, CornerDownRight, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const PDFViewer = dynamic(
  () => import("./pdf-viewer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="bg-gray-50 rounded-xl py-4 grid place-items-center h-[89vh] text-gray-900">
        <div className="flex items-center gap-2">
          <Loader className="size-6 animate-spin" /> Loading...
        </div>
      </div>
    ),
  }
);

const ncertClasses = [
  {
    name: "7th",
    subjects: [
      {
        name: "English",
        books: [
          {
            name: "Honeycomb",
            chapters: [
              {
                name: "Three Questions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/Three Questions.pdf?t=2025-01-01T08%3A32%3A10.988Z",
              },
              {
                name: "A Gift of Chappals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/A Gift of Chappals.pdf",
              },
              {
                name: "Gopal and the Hilsa-fish",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/Gopal and the Hilsa-fish.pdf",
              },
              {
                name: "The Ashes That Made Trees Bloom",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/The Ashes That Made Trees Bloom.pdf",
              },
              {
                name: "Quality",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/Quality.pdf",
              },
              {
                name: "Expert Detectives",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/Expert Detectives.pdf",
              },
              {
                name: "The Invention of Vita-Wonk",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/The Invention of Vita-Wonk.pdf",
              },
              {
                name: "A Homage to our Brave Soldiers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/A Homage to our Brave Soldiers.pdf",
              },
            ],
          },
          {
            name: "The Alian Hand Supplementry",
            chapters: [
              {
                name: "The Tiny Teacher",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/The Tiny Teacher.pdf",
              },
              {
                name: "Bringing Up Kari",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/Bringing Up Kari.pdf",
              },
              {
                name: "Golu Grows a Nose",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/Golu Grows a Nose.pdf",
              },
              {
                name: "Chandni",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/Chandni.pdf",
              },
              {
                name: "The Bear Story",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/The Bear Story.pdf",
              },
              {
                name: "A Tiger in the House",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/A Tiger in the House.pdf",
              },
              {
                name: "An Alien Hand",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/An Alien Hand.pdf",
              },
              {
                name: "geah1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Math",
        books: [
          {
            name: "gemh1dd",
            chapters: [
              {
                name: "Integers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Integers.pdf",
              },
              {
                name: "Fractions and Decimals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Fractions and Decimals.pdf",
              },
              {
                name: "Data Handling",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Data Handling.pdf",
              },
              {
                name: "Simple Equations",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Simple Equations.pdf",
              },
              {
                name: "Lines and Angles",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Lines and Angles.pdf",
              },
              {
                name: "The Triangle and its Properties",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/The Triangle and its Properties.pdf",
              },
              {
                name: "Compairing Quantities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Compairing Quantities.pdf",
              },
              {
                name: "Rational Numbers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Rational Numbers.pdf",
              },
              {
                name: "Perimeter ans Area",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Perimeter ans Area.pdf",
              },
              {
                name: "Algebraic Expressions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Algebraic Expressions.pdf",
              },
              {
                name: "Exponents and Powers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Exponents and Powers.pdf",
              },
              {
                name: "Symmetry",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Symmetry.pdf",
              },
              {
                name: "Visualising Solid Shapes",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Visualising Solid Shapes.pdf",
              },
              {
                name: "gemh1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh1an.pdf",
              },
              {
                name: "gemh1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Science",
        books: [
          {
            name: "gesc1dd",
            chapters: [
              {
                name: "Nutrition in Plants",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Nutrition in Plants.pdf",
              },
              {
                name: "Nutrition in Animals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Nutrition in Animals.pdf",
              },
              {
                name: "Heat",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Heat.pdf",
              },
              {
                name: "Acids, Bases and Salts",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Acids, Bases and Salts.pdf",
              },
              {
                name: "Physical and Chemical Changes",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Physical and Chemical Changes.pdf",
              },
              {
                name: "Respiration in Organisms",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Respiration in Organisms.pdf",
              },
              {
                name: "Transportation in Animals and Plants",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Transportation in Animals and Plants.pdf",
              },
              {
                name: "Reproduction in Plants",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Reproduction in Plants.pdf",
              },
              {
                name: "Motion and Time",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Motion and Time.pdf",
              },
              {
                name: "Electric Current and its Effects",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Electric Current and its Effects.pdf",
              },
              {
                name: "Light",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Light.pdf",
              },
              {
                name: "Forests: Our Lifeline",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Forests: Our Lifeline.pdf",
              },
              {
                name: "Wastewater Story",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Wastewater Story.pdf",
              },
              {
                name: "gesc1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Social Science",
        books: [
          {
            name: "Geography-Our Environment",
            chapters: [
              {
                name: "Environment",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Environment.pdf",
              },
              {
                name: "Inside Our Earth",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Inside Our Earth.pdf",
              },
              {
                name: "Our Changing Earth",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Our Changing Earth.pdf",
              },
              {
                name: "Air",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Air.pdf",
              },
              {
                name: "Water",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Water.pdf",
              },
              {
                name: "Human environment interaction- The Tropical and Subtropical Region",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Human environment interaction- The Tropical and Subtropical Region.pdf",
              },
              {
                name: "Life in the Desert",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Life in the Desert.pdf",
              },
              {
                name: "gess2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess2ps.pdf",
              },
            ],
          },
          {
            name: "History - Our Pasts II",
            chapters: [
              {
                name: "Introduction- Tracing changes Through a Thousand years",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Introduction- Tracing changes Through a Thousand years.pdf",
              },
              {
                name: "Kings and Kingdoms",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Kings and Kingdoms.pdf",
              },
              {
                name: "Delhi: 12th to 15th Century",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Delhi: 12th to 15th Century.pdf",
              },
              {
                name: "The Mughals ( 16th to 17th Century)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/The Mughals ( 16th to 17th Century).pdf",
              },
              {
                name: "Tribes, Nomads and Settled Communities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Tribes, Nomads and Settled Communities.pdf",
              },
              {
                name: "Devotional Paths to the Divine",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Devotional Paths to the Divine.pdf",
              },
              {
                name: "The Making of Regional Cultures",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/The Making of Regional Cultures.pdf",
              },
              {
                name: "Eighteenth-Century Political Formations",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Eighteenth-Century Political Formations.pdf",
              },
              {
                name: "gess1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess1ps.pdf?t=2025-01-01T16%3A28%3A22.837Z",
              },
            ],
          },
          {
            name: "Social and political life",
            chapters: [
              {
                name: "Equality in Indian democracy",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Equality in Indian democracy.pdf",
              },
              {
                name: "Role Of The Government in Health",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Role Of The Government in Health.pdf",
              },
              {
                name: "How the State Government Works",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/How the State Government Works.pdf",
              },
              {
                name: "Growing up as Boys and Girls",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Growing up as Boys and Girls.pdf",
              },
              {
                name: "Women Change the world",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Women Change the world.pdf",
              },
              {
                name: "Understanding Media",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Understanding Media.pdf",
              },
              {
                name: "Markets Around Us",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Markets Around Us.pdf",
              },
              {
                name: "A Shirt in The Market",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/A Shirt in The Market.pdf",
              },
              {
                name: "gess3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess3ps.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "8th",
    subjects: [
      {
        name: "English",
        books: [
          {
            name: "Honeydew",
            chapters: [
              {
                name: "hehd101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd101.pdf",
              },
              {
                name: "hehd102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd102.pdf",
              },
              {
                name: "hehd103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd103.pdf",
              },
              {
                name: "hehd104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd104.pdf",
              },
              {
                name: "hehd105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd105.pdf",
              },
              {
                name: "hehd106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd106.pdf",
              },
              {
                name: "hehd107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd107.pdf",
              },
              {
                name: "hehd108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd108.pdf",
              },
              {
                name: "hehd1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd1ps.pdf",
              },
            ],
          },
          {
            name: "It So Happened",
            chapters: [
              {
                name: "heih101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih101.pdf?t=2025-01-05T14%3A54%3A18.785Z",
              },
              {
                name: "heih102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih102.pdf",
              },
              {
                name: "heih103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih103.pdf",
              },
              {
                name: "heih104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih104.pdf",
              },
              {
                name: "heih105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih105.pdf",
              },
              {
                name: "heih106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih106.pdf",
              },
              {
                name: "heih107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih107.pdf",
              },
              {
                name: "heih108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih108.pdf",
              },
              {
                name: "heih1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Math",
        books: [
          {
            name: "hemh1dd",
            chapters: [
              {
                name: "hemh101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh101.pdf",
              },
              {
                name: "hemh102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh102.pdf",
              },
              {
                name: "hemh103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh103.pdf",
              },
              {
                name: "hemh104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh104.pdf",
              },
              {
                name: "hemh105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh105.pdf",
              },
              {
                name: "hemh106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh106.pdf",
              },
              {
                name: "hemh107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh107.pdf",
              },
              {
                name: "hemh108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh108.pdf",
              },
              {
                name: "hemh109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh109.pdf",
              },
              {
                name: "hemh110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh110.pdf",
              },
              {
                name: "hemh111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh111.pdf",
              },
              {
                name: "hemh112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh112.pdf",
              },
              {
                name: "hemh113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh113.pdf",
              },
              {
                name: "hemh1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh1an.pdf",
              },
              {
                name: "hemh1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Science",
        books: [
          {
            name: "hesc1dd",
            chapters: [
              {
                name: "hesc101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc101.pdf",
              },
              {
                name: "hesc102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc102.pdf",
              },
              {
                name: "hesc103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc103.pdf",
              },
              {
                name: "hesc104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc104.pdf",
              },
              {
                name: "hesc105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc105.pdf",
              },
              {
                name: "hesc106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc106.pdf",
              },
              {
                name: "hesc107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc107.pdf",
              },
              {
                name: "hesc108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc108.pdf",
              },
              {
                name: "hesc109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc109.pdf",
              },
              {
                name: "hesc110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc110.pdf",
              },
              {
                name: "hesc111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc111.pdf",
              },
              {
                name: "hesc112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc112.pdf",
              },
              {
                name: "hesc113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc113.pdf",
              },
              {
                name: "hesc1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Social Science",
        books: [
          {
            name: "Our Past III",
            chapters: [
              {
                name: "hess201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess201.pdf",
              },
              {
                name: "hess202",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess202.pdf",
              },
              {
                name: "hess203",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess203.pdf",
              },
              {
                name: "hess204",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess204.pdf",
              },
              {
                name: "hess205",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess205.pdf",
              },
              {
                name: "hess206",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess206.pdf",
              },
              {
                name: "hess207",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess207.pdf",
              },
              {
                name: "hess208",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess208.pdf",
              },
              {
                name: "hess2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess2ps.pdf",
              },
            ],
          },
          {
            name: "Resourse and Developement (Geography)",
            chapters: [
              {
                name: "hess401",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess401.pdf",
              },
              {
                name: "hess402",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess402.pdf",
              },
              {
                name: "hess403",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess403.pdf",
              },
              {
                name: "hess404",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess404.pdf",
              },
              {
                name: "hess405",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess405.pdf",
              },
              {
                name: "hess4ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess4ps.pdf",
              },
            ],
          },
          {
            name: "Social and Political Life",
            chapters: [
              {
                name: "hess301",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess301.pdf",
              },
              {
                name: "hess302",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess302.pdf",
              },
              {
                name: "hess303",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess303.pdf",
              },
              {
                name: "hess304",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess304.pdf",
              },
              {
                name: "hess305",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess305.pdf",
              },
              {
                name: "hess306",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess306.pdf",
              },
              {
                name: "hess307",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess307.pdf",
              },
              {
                name: "hess308",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess308.pdf",
              },
              {
                name: "hess3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess3ps.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "9th",
    subjects: [
      {
        name: "English",
        books: [
          {
            name: "Beehive",
            chapters: [
              {
                name: "iebe101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe101.pdf",
              },
              {
                name: "iebe102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe102.pdf",
              },
              {
                name: "iebe103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe103.pdf",
              },
              {
                name: "iebe104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe104.pdf",
              },
              {
                name: "iebe105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe105.pdf",
              },
              {
                name: "iebe106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe106.pdf",
              },
              {
                name: "iebe107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe107.pdf",
              },
              {
                name: "iebe108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe108.pdf",
              },
              {
                name: "iebe109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe109.pdf",
              },
              {
                name: "iebe1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/iebe1ps.pdf",
              },
            ],
          },
          {
            name: "Moments Supplementary Reader",
            chapters: [
              {
                name: "iemo101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo101.pdf",
              },
              {
                name: "iemo102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo102.pdf",
              },
              {
                name: "iemo103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo103.pdf",
              },
              {
                name: "iemo104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo104.pdf",
              },
              {
                name: "iemo105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo105.pdf",
              },
              {
                name: "iemo106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo106.pdf",
              },
              {
                name: "iemo107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo107.pdf",
              },
              {
                name: "iemo108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo108.pdf",
              },
              {
                name: "iemo109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo109.pdf",
              },
              {
                name: "iemo1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/iemo1ps.pdf",
              },
            ],
          },
          {
            name: "Words and Expressions",
            chapters: [
              {
                name: "iewe101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe101.pdf",
              },
              {
                name: "iewe102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe102.pdf",
              },
              {
                name: "iewe103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe103.pdf",
              },
              {
                name: "iewe104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe104.pdf",
              },
              {
                name: "iewe105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe105.pdf",
              },
              {
                name: "iewe106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe106.pdf",
              },
              {
                name: "iewe107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe107.pdf",
              },
              {
                name: "iewe108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe108.pdf",
              },
              {
                name: "iewe109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe109.pdf",
              },
              {
                name: "iewe1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/iewe1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Health and Physical Education",
        books: [
          {
            name: "iehp1dd",
            chapters: [
              {
                name: "iehp101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp101.pdf",
              },
              {
                name: "iehp102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp102.pdf",
              },
              {
                name: "iehp103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp103.pdf",
              },
              {
                name: "iehp104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp104.pdf",
              },
              {
                name: "iehp105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp105.pdf",
              },
              {
                name: "iehp106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp106.pdf",
              },
              {
                name: "iehp107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp107.pdf",
              },
              {
                name: "iehp108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp108.pdf",
              },
              {
                name: "iehp109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp109.pdf",
              },
              {
                name: "iehp110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp110.pdf",
              },
              {
                name: "iehp111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp111.pdf",
              },
              {
                name: "iehp112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp112.pdf",
              },
              {
                name: "iehp113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp113.pdf",
              },
              {
                name: "iehp114",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp114.pdf",
              },
              {
                name: "iehp1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "ICT",
        books: [
          {
            name: "iict1dd",
            chapters: [
              {
                name: "iict101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict101.pdf",
              },
              {
                name: "iict102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict102.pdf",
              },
              {
                name: "iict103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict103.pdf",
              },
              {
                name: "iict104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict104.pdf",
              },
              {
                name: "iict105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict105.pdf",
              },
              {
                name: "iict106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict106.pdf",
              },
              {
                name: "iict107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict107.pdf",
              },
              {
                name: "iict108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict108.pdf",
              },
              {
                name: "iict1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/iict1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Maths",
        books: [
          {
            name: "iemh1dd",
            chapters: [
              {
                name: "iemh101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh101.pdf",
              },
              {
                name: "iemh102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh102.pdf",
              },
              {
                name: "iemh103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh103.pdf",
              },
              {
                name: "iemh104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh104.pdf",
              },
              {
                name: "iemh105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh105.pdf",
              },
              {
                name: "iemh106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh106.pdf",
              },
              {
                name: "iemh107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh107.pdf",
              },
              {
                name: "iemh108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh108.pdf",
              },
              {
                name: "iemh109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh109.pdf",
              },
              {
                name: "iemh110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh110.pdf",
              },
              {
                name: "iemh111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh111.pdf",
              },
              {
                name: "iemh112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh112.pdf",
              },
              {
                name: "iemh1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh1a1.pdf",
              },
              {
                name: "iemh1a2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh1a2.pdf",
              },
              {
                name: "iemh1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh1an.pdf",
              },
              {
                name: "iemh1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/iemh1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Science",
        books: [
          {
            name: "iesc1dd",
            chapters: [
              {
                name: "iesc101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc101.pdf",
              },
              {
                name: "iesc102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc102.pdf",
              },
              {
                name: "iesc103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc103.pdf",
              },
              {
                name: "iesc104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc104.pdf",
              },
              {
                name: "iesc105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc105.pdf",
              },
              {
                name: "iesc106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc106.pdf",
              },
              {
                name: "iesc107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc107.pdf",
              },
              {
                name: "iesc108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc108.pdf",
              },
              {
                name: "iesc109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc109.pdf",
              },
              {
                name: "iesc110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc110.pdf",
              },
              {
                name: "iesc111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc111.pdf",
              },
              {
                name: "iesc112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc112.pdf",
              },
              {
                name: "iesc112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc112.pdf",
              },
              {
                name: "iesc1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/iesc1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Social Science",
        books: [
          {
            name: "Contemporary India",
            chapters: [
              {
                name: "iess101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Contemporary%20India/iess101.pdf",
              },
              {
                name: "iess102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Contemporary%20India/iess102.pdf",
              },
              {
                name: "iess103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Contemporary%20India/iess103.pdf",
              },
              {
                name: "iess104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Contemporary%20India/iess104.pdf",
              },
              {
                name: "iess105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Contemporary%20India/iess105.pdf",
              },
              {
                name: "iess106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Contemporary%20India/iess106.pdf",
              },
              {
                name: "iess1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Contemporary%20India/iess1ps.pdf",
              },
            ],
          },
          {
            name: "Democratic Politics",
            chapters: [
              {
                name: "iess401",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Democratic%20Politics/iess401.pdf",
              },
              {
                name: "iess402",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Democratic%20Politics/iess402.pdf",
              },
              {
                name: "iess403",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Democratic%20Politics/iess403.pdf",
              },
              {
                name: "iess404",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Democratic%20Politics/iess404.pdf",
              },
              {
                name: "iess405",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Democratic%20Politics/iess405.pdf",
              },
              {
                name: "iess4ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Democratic%20Politics/iess4ps.pdf",
              },
            ],
          },
          {
            name: "Economics",
            chapters: [
              {
                name: "iess201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Economics/iess201.pdf",
              },
              {
                name: "iess202",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Economics/iess202.pdf",
              },
              {
                name: "iess203",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Economics/iess203.pdf",
              },
              {
                name: "iess204",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Economics/iess204.pdf",
              },
              {
                name: "iess2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/Economics/iess2ps.pdf",
              },
            ],
          },
          {
            name: "India and the Contemporary World-I",
            chapters: [
              {
                name: "iess302",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/India%20and%20the%20Contemporary%20World-I/iess302.pdf",
              },
              {
                name: "iess303",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/India%20and%20the%20Contemporary%20World-I/iess303.pdf",
              },
              {
                name: "iess304",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/India%20and%20the%20Contemporary%20World-I/iess304.pdf",
              },
              {
                name: "iess305",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/India%20and%20the%20Contemporary%20World-I/iess305.pdf",
              },
              {
                name: "iess3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Social%20Science/India%20and%20the%20Contemporary%20World-I/iess3ps.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "10th",
    subjects: [
      {
        name: "English",
        books: [
          {
            name: "First Flight",
            chapters: [
              {
                name: "jeff101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff101.pdf",
              },
              {
                name: "jeff102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff102.pdf",
              },
              {
                name: "jeff103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff103.pdf",
              },
              {
                name: "jeff104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff104.pdf",
              },
              {
                name: "jeff105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff105.pdf",
              },
              {
                name: "jeff106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff106.pdf",
              },
              {
                name: "jeff107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff107.pdf",
              },
              {
                name: "jeff108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff108.pdf",
              },
              {
                name: "jeff109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff109.pdf",
              },
              {
                name: "jeff1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff1ps.pdf",
              },
            ],
          },
          {
            name: "Footprints without Feet",
            chapters: [
              {
                name: "jefp101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp101.pdf",
              },
              {
                name: "jefp102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp102.pdf",
              },
              {
                name: "jefp103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp103.pdf",
              },
              {
                name: "jefp104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp104.pdf",
              },
              {
                name: "jefp105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp105.pdf",
              },
              {
                name: "jefp106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp106.pdf",
              },
              {
                name: "jefp107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp107.pdf",
              },
              {
                name: "jefp108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp108.pdf",
              },
              {
                name: "jefp109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp109.pdf",
              },
              {
                name: "jefp1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp1ps.pdf",
              },
            ],
          },
          {
            name: "Words and Expressions -II",
            chapters: [
              {
                name: "jewe201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe201.pdf",
              },
              {
                name: "jewe202",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe202.pdf",
              },
              {
                name: "jewe203",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe203.pdf",
              },
              {
                name: "jewe204",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe204.pdf",
              },
              {
                name: "jewe205",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe205.pdf",
              },
              {
                name: "jewe206",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe206.pdf",
              },
              {
                name: "jewe207",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe207.pdf",
              },
              {
                name: "jewe208",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe208.pdf",
              },
              {
                name: "jewe209",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe209.pdf",
              },
              {
                name: "jewe2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe2ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Health and Physical Education",
        books: [
          {
            name: "jehp1dd",
            chapters: [
              {
                name: "jehp101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp101.pdf",
              },
              {
                name: "jehp102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp102.pdf",
              },
              {
                name: "jehp103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp103.pdf",
              },
              {
                name: "jehp104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp104.pdf",
              },
              {
                name: "jehp105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp105.pdf",
              },
              {
                name: "jehp106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp106.pdf",
              },
              {
                name: "jehp107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp107.pdf",
              },
              {
                name: "jehp108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp108.pdf",
              },
              {
                name: "jehp109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp109.pdf",
              },
              {
                name: "jehp110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp110.pdf",
              },
              {
                name: "jehp111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp111.pdf",
              },
              {
                name: "jehp112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp112.pdf",
              },
              {
                name: "jehp113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp113.pdf",
              },
              {
                name: "jehp1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Maths",
        books: [
          {
            name: "jemh1dd",
            chapters: [
              {
                name: "jemh101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh101.pdf",
              },
              {
                name: "jemh102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh102.pdf",
              },
              {
                name: "jemh103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh103.pdf",
              },
              {
                name: "jemh104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh104.pdf",
              },
              {
                name: "jemh105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh105.pdf",
              },
              {
                name: "jemh106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh106.pdf",
              },
              {
                name: "jemh107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh107.pdf",
              },
              {
                name: "jemh108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh108.pdf",
              },
              {
                name: "jemh109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh109.pdf",
              },
              {
                name: "jemh110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh110.pdf",
              },
              {
                name: "jemh111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh111.pdf",
              },
              {
                name: "jemh112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh112.pdf",
              },
              {
                name: "jemh113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh113.pdf",
              },
              {
                name: "jemh114",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh114.pdf",
              },
              {
                name: "jemh1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh1a1.pdf",
              },
              {
                name: "jemh1a2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh1a2.pdf",
              },
              {
                name: "jemh1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh1an.pdf",
              },
              {
                name: "jemh1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Science",
        books: [
          {
            name: "jesc1dd",
            chapters: [
              {
                name: "jesc101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc101.pdf",
              },
              {
                name: "jesc102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc102.pdf",
              },
              {
                name: "jesc103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc103.pdf",
              },
              {
                name: "jesc104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc104.pdf",
              },
              {
                name: "jesc105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc105.pdf",
              },
              {
                name: "jesc106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc106.pdf",
              },
              {
                name: "jesc107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc107.pdf",
              },
              {
                name: "jesc108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc108.pdf",
              },
              {
                name: "jesc109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc109.pdf",
              },
              {
                name: "jesc110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc110.pdf",
              },
              {
                name: "jesc111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc111.pdf",
              },
              {
                name: "jesc112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc112.pdf",
              },
              {
                name: "jesc113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc113.pdf",
              },
              {
                name: "jesc1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc1an.pdf",
              },
              {
                name: "jesc1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Social Science",
        books: [
          {
            name: "Contemporary India",
            chapters: [
              {
                name: "jess101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess101.pdf",
              },
              {
                name: "jess102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess102.pdf",
              },
              {
                name: "jess103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess103.pdf",
              },
              {
                name: "jess104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess104.pdf",
              },
              {
                name: "jess105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess105.pdf",
              },
              {
                name: "jess106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess106.pdf",
              },
              {
                name: "jess107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess107.pdf",
              },
              {
                name: "jess1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess1a1.pdf",
              },
              {
                name: "jess1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess1ps.pdf",
              },
            ],
          },
          {
            name: "Democratic Politics",
            chapters: [
              {
                name: "jess401",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/jess401.pdf",
              },
              {
                name: "jess402",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/jess402.pdf",
              },
              {
                name: "jess403",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/jess403.pdf",
              },
              {
                name: "jess404",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/jess404.pdf",
              },
              {
                name: "jess405",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/jess405.pdf",
              },
              {
                name: "jess4ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/jess4ps.pdf",
              },
            ],
          },
          {
            name: "India and the Contemporary World-II",
            chapters: [
              {
                name: "jess301",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/jess301.pdf",
              },
              {
                name: "jess302",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/jess302.pdf",
              },
              {
                name: "jess303",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/jess303.pdf",
              },
              {
                name: "jess304",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/jess304.pdf",
              },
              {
                name: "jess305",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/jess305.pdf",
              },
            ],
          },
          {
            name: "Understanding Economic Development",
            chapters: [
              {
                name: "jess201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/jess201.pdf",
              },
              {
                name: "jess202",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/jess202.pdf",
              },
              {
                name: "jess203",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/jess203.pdf",
              },
              {
                name: "jess204",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/jess204.pdf",
              },
              {
                name: "jess205",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/jess205.pdf",
              },
              {
                name: "jess2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/jess2ps.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "11th",
    subjects: [
      {
        name: "Accountancy",
        books: [
          {
            name: "Accountancy-II",
            chapters: [
              {
                name: "keac201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Accountancy-II/keac201.pdf",
              },
              {
                name: "keac202",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Accountancy-II/keac202.pdf",
              },
              {
                name: "keac203",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Accountancy-II/keac203.pdf",
              },
            ],
          },
          {
            name: "Financial Accounting-I",
            chapters: [
              {
                name: "keac101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Financial%20Accounting-I/keac101.pdf",
              },
              {
                name: "keac102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Financial%20Accounting-I/keac102.pdf",
              },
              {
                name: "keac103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Financial%20Accounting-I/keac103.pdf",
              },

              {
                name: "keac104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Financial%20Accounting-I/keac104.pdf",
              },
              {
                name: "keac105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Financial%20Accounting-I/keac105.pdf",
              },
              {
                name: "keac106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Financial%20Accounting-I/keac106.pdf",
              },
              {
                name: "keac107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Financial%20Accounting-I/keac107.pdf",
              },
              {
                name: "keac1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Accountancy/Financial%20Accounting-I/keac1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Biology",
        books: [
          {
            name: "kebo1dd",
            chapters: [
              {
                name: "kebo101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo101.pdf",
              },
              {
                name: "kebo102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo102.pdf",
              },
              {
                name: "kebo103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo103.pdf",
              },
              {
                name: "kebo104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo104.pdf",
              },
              {
                name: "kebo105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo105.pdf",
              },
              {
                name: "kebo106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo106.pdf",
              },
              {
                name: "kebo107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo107.pdf",
              },
              {
                name: "kebo108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo108.pdf",
              },
              {
                name: "kebo109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo109.pdf",
              },
              {
                name: "kebo110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo110.pdf",
              },
              {
                name: "kebo111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo111.pdf",
              },
              {
                name: "kebo112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo112.pdf",
              },
              {
                name: "kebo113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo113.pdf",
              },
              {
                name: "kebo114",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo114.pdf",
              },
              {
                name: "kebo115",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo115.pdf",
              },
              {
                name: "kebo116",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo116.pdf",
              },
              {
                name: "kebo117",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo117.pdf",
              },
              {
                name: "kebo118",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo118.pdf",
              },
              {
                name: "kebo119",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo119.pdf",
              },
              {
                name: "kebo1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biology/kebo1dd/kebo1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Biotechnology",
        books: [
          {
            name: "kebt1dd",
            chapters: [
              {
                name: "kebt101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt101.pdf",
              },
              {
                name: "kebt102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt102.pdf",
              },
              {
                name: "kebt103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt103.pdf",
              },
              {
                name: "kebt104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt104.pdf",
              },
              {
                name: "kebt105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt105.pdf",
              },
              {
                name: "kebt106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt106.pdf",
              },
              {
                name: "kebt107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt107.pdf",
              },
              {
                name: "kebt108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt108.pdf",
              },
              {
                name: "kebt109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt109.pdf",
              },
              {
                name: "kebt110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt110.pdf",
              },
              {
                name: "kebt111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt111.pdf",
              },
              {
                name: "kebt112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt112.pdf",
              },
              {
                name: "kebt1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Biotechnology/kebt1dd/kebt1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Business Studies",
        books: [
          {
            name: "kebs1dd",
            chapters: [
              {
                name: "kebs101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs101.pdf",
              },
              {
                name: "kebs102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs102.pdf",
              },
              {
                name: "kebs103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs103.pdf",
              },
              {
                name: "kebs104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs104.pdf",
              },
              {
                name: "kebs105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs105.pdf",
              },
              {
                name: "kebs106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs106.pdf",
              },
              {
                name: "kebs107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs107.pdf",
              },
              {
                name: "kebs108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs108.pdf",
              },
              {
                name: "kebs109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs109.pdf",
              },
              {
                name: "kebs110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs110.pdf",
              },
              {
                name: "kebs111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs111.pdf",
              },
              {
                name: "kebs1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Business%20Studies/kebs1dd/kebs1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Chemistry",
        books: [
          {
            name: "Chemisrty Part-I",
            chapters: [
              {
                name: "kech101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech101.pdf",
              },
              {
                name: "kech102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech102.pdf",
              },
              {
                name: "kech103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech103.pdf",
              },
              {
                name: "kech104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech104.pdf",
              },
              {
                name: "kech105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech105.pdf",
              },
              {
                name: "kech106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech106.pdf",
              },
              {
                name: "kech1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech1a1.pdf",
              },
              {
                name: "kech1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech1an.pdf",
              },
              {
                name: "kech1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part-I/kech1ps.pdf",
              },
            ],
          },
          {
            name: "Chemistry Part-II",
            chapters: [
              {
                name: "kech201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part%20II/kech201.pdf",
              },
              {
                name: "kech202",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part%20II/kech202.pdf",
              },
              {
                name: "kech203",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part%20II/kech203.pdf",
              },
              {
                name: "kech2an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part%20II/kech2an.pdf",
              },
              {
                name: "kech2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Chemistry/Chemistry%20Part%20II/kech2ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Computer Science",
        books: [
          {
            name: "lecs1dd",
            chapters: [
              {
                name: "lecs101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs101.pdf",
              },
              {
                name: "lecs102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs102.pdf",
              },
              {
                name: "lecs103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs103.pdf",
              },
              {
                name: "lecs104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs104.pdf",
              },
              {
                name: "lecs105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs105.pdf",
              },
              {
                name: "lecs106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs106.pdf",
              },
              {
                name: "lecs107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs107.pdf",
              },
              {
                name: "lecs108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs108.pdf",
              },
              {
                name: "lecs109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs109.pdf",
              },
              {
                name: "lecs110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs110.pdf",
              },
              {
                name: "lecs111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs111.pdf",
              },
              {
                name: "lecs112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs112.pdf",
              },
              {
                name: "lecs113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs113.pdf",
              },
              {
                name: "lecs1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Computer%20science/lecs1dd/lecs1ps.pdf",
              },
             
            ],
          },
        
        ],
      },
    ],
  },
];

export const NCERTPage = ({
  searchParams,
  userId,
}: {
  searchParams: {
    g: string | undefined;
    s: string | undefined;
    b: string | undefined;
    c: string | undefined;
  };
  userId: string;
}) => {
  console.log({ searchParams });

  const defaultClass = ncertClasses[0];
  const defaultSubject = ncertClasses[0].subjects[0];
  const defaultBook = ncertClasses[0].subjects[0].books[0];
  const defaultChapter = ncertClasses[0].subjects[0].books[0].chapters[0];

  const [activeClassAccordion, setActiveClassAccordion] = useState(
    searchParams.g ?? defaultClass.name
  );
  const [activeSubjectAccordion, setActiveSubjectAccordion] = useState(
    searchParams.s ?? defaultSubject.name
  );
  const [activeBookAccordion, setActiveBookAccordion] = useState(
    searchParams.b ?? defaultBook.name
  );
  const [activeChapterAccordion, setActiveChapterAccordion] = useState(
    searchParams.c ?? defaultChapter.name
  );

  const activeClass = ncertClasses.find(
    (ncertClass) => ncertClass.name === searchParams.g
  );

  const activeSubject = (activeClass?.subjects ?? []).find(
    (subject) => subject.name === searchParams.s
  );

  const activeBook = (activeSubject?.books ?? []).find(
    (book) => book.name === searchParams.b
  );

  const activeChapter = (activeBook?.chapters ?? []).find(
    (chapter) => chapter.name === searchParams.c
  );

  console.log({ activeClass, activeSubject, activeBook, activeChapter });

  return (
    <div className="grid md:grid-cols-2 gap-8 pb-10 md:pb-0">
      <ScrollArea className="h-[70vh] md:h-[89vh] rounded-xl ">
        <div className="flex flex-col gap-4 pb-4">
          {ncertClasses.map((ncertClass) => (
            <Accordion
              value={activeClassAccordion}
              onValueChange={(v) => setActiveClassAccordion(v)}
              key={ncertClass.name}
              type="single"
              collapsible
            >
              <AccordionItem
                value={ncertClass.name}
                className="border border-border/40 rounded-xl px-4 bg-card"
              >
                <AccordionTrigger>
                  {ncertClass.name} grade
                  {/* <div className="text-left ">
                    <p>{ncertClass.name}</p>
                    <p className="text-muted-foreground text-xs mt-1 ml-2">
                      {ncertClass.subjects.length} Subjects
                    </p>
                  </div> */}
                </AccordionTrigger>
                <AccordionContent>
                  {ncertClass.subjects.map((subject) => (
                    <Accordion
                      key={subject.name}
                      type="single"
                      collapsible
                      className=""
                      value={activeSubjectAccordion}
                      onValueChange={(v) => setActiveSubjectAccordion(v)}
                    >
                      <AccordionItem
                        value={subject.name}
                        className="border-none bg-gray-400/15 dark:bg-gray-900/35 rounded-xl px-4 mb-2"
                      >
                        <AccordionTrigger className="">
                          <div className="flex items-center gap-4">
                            <CornerDownRight className="size-4" />{" "}
                            {subject.name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {subject.books.map((book) => (
                            <Accordion
                              key={book.name}
                              type="single"
                              collapsible
                              value={activeBookAccordion}
                              onValueChange={(v) => setActiveBookAccordion(v)}
                            >
                              <AccordionItem
                                value={book.name}
                                className="border-none rounded-xl px-4 bg-gray-400/15 dark:bg-gray-900/30 mb-2"
                              >
                                <AccordionTrigger>
                                  <div className="flex items-center gap-4">
                                    <CornerDownRight className="size-4" />{" "}
                                    {book.name}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="border-t space-y-2 pt-2">
                                  {book.chapters.map((chapter) => (
                                    <Link
                                      href={`/ncert/?g=${ncertClass.name}&s=${subject.name}&b=${book.name}&c=${chapter.name}`}
                                      className={cn(
                                        "px-4 py-3 flex items-center gap-4 hover:bg-muted rounded-xl",
                                        (activeChapter ?? defaultChapter)
                                          .name === chapter.name
                                          ? "bg-muted"
                                          : ""
                                      )}
                                      key={chapter.name}
                                    >
                                      <BookText className="size-5" />{" "}
                                      {chapter.name}
                                    </Link>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </ScrollArea>

      <div>
        <PDFViewer
          pdfUrl={(activeChapter ?? defaultChapter).url}
          // pdfUrl="https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc101.pdf?t=2025-01-01T08%3A32%3A10.988Z"
          sourcePage="ncert"
          userId={userId}
        />
      </div>
    </div>
  );
};
