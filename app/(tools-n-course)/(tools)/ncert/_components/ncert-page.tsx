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
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/Maths/gemh1dd/Integers.pdf",
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
                name: "The Best Christmas Present in the World",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/The Best Christmas Present in the World.pdf",
              },
              {
                name: "The Tsunami",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/The Tsunami.pdf",
              },
              {
                name: "Glimpses of the Past",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/Glimpses of the Past.pdf",
              },
              {
                name: "Bepin Choudhury’s Lapse of Memory",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/Bepin Choudhury’s Lapse of Memory.pdf",
              },
              {
                name: "The Summit Within",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/The Summit Within.pdf",
              },
              {
                name: "This is Jody’s Fawn",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/This is Jody’s Fawn.pdf",
              },
              {
                name: "A Visit to Cambridge",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/A Visit to Cambridge.pdf",
              },
              {
                name: "A Short Monsoon Diary",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/A Short Monsoon Diary.pdf",
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
                name: "How the Camel got his hump",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/How the Camel got his hump.pdf",
              },
              {
                name: "Children at work",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/Children at work.pdf",
              },
              {
                name: "The Selfish Giant",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/The Selfish Giant.pdf",
              },
              {
                name: "The treasure within",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/The treasure within.pdf",
              },
              {
                name: "Princess September",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/Princess September.pdf",
              },
              {
                name: "The fight",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/The fight.pdf",
              },
              {
                name: "Jalebis",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/Jalebis.pdf",
              },
              {
                name: "Ancient Education System of India",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/Ancient Education System of India.pdf",
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
                name: "Rational Numbers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Rational Numbers.pdf",
              },
              {
                name: "Linear Equations in One Variable",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Linear Equations in One Variable.pdf",
              },
              {
                name: "Understanding Quadrilaterals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Understanding Quadrilaterals.pdf",
              },
              {
                name: "Data Handling",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Data Handling.pdf",
              },
              {
                name: "Squares and Square Roots",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Squares and Square Roots.pdf",
              },
              {
                name: "Cubes and Cube Roots",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Cubes and Cube Roots.pdf",
              },
              {
                name: "Comparing Quantities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Comparing Quantities.pdf",
              },
              {
                name: "Algebraic Expressions and Identities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Algebraic Expressions and Identities.pdf",
              },
              {
                name: "Mensuration",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Mensuration.pdf",
              },
              {
                name: "Exponents and Powers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Exponents and Powers.pdf",
              },
              {
                name: "Direct and Inverse Proportions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Direct and Inverse Proportions.pdf",
              },
              {
                name: "Factorisation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Factorisation.pdf",
              },
              {
                name: "Introduction to Graphs",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/Introduction to Graphs.pdf",
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
                name: "Crop Production and management",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Crop Production and management.pdf",
              },
              {
                name: "Microorganism:Friend and foe",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Microorganism:Friend and foe.pdf",
              },
              {
                name: "Coal and Petroleum",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Coal and Petroleum.pdf",
              },
              {
                name: "Combustion and Flame",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Combustion and Flame.pdf",
              },
              {
                name: "Conservation of Plants and Animals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Conservation of Plants and Animals.pdf",
              },
              {
                name: "Reproduction in Animals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Reproduction in Animals.pdf",
              },
              {
                name: "Reaching the age of Adolescence",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Reaching the age of Adolescence.pdf",
              },
              {
                name: "Force and Pressure",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Force and Pressure.pdf",
              },
              {
                name: "Friction",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Friction.pdf",
              },
              {
                name: "Sound",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Sound.pdf",
              },
              {
                name: "Chemical Effects of Electric Current",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Chemical Effects of Electric Current.pdf",
              },
              {
                name: "Some Natural Phenomena",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Some Natural Phenomena.pdf",
              },
              {
                name: "Light",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/Light.pdf",
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
                name: "Introduction: How, When and Where",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/Introduction: How, When and Where.pdf",
              },
              {
                name: "From Trade to Territory The Company Establishes Power",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/From Trade to Territory The Company Establishes Power.pdf",
              },
              {
                name: "Ruling the Countryside",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/Ruling the Countryside.pdf",
              },
              {
                name: "Tribals, Dikus, and the Vision of a Golden Age",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/Tribals, Dikus, and the Vision of a Golden Age.pdf",
              },
              {
                name: "When People Revolt 1857 and After",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/When People Revolt 1857 and After.pdf",
              },
              {
                name: "Civilising the “Native”, Educating the Nation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/Civilising the “Native”, Educating the Nation.pdf",
              },
              {
                name: "Women, Caste and Reform",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/Women, Caste and Reform.pdf",
              },
              {
                name: "The Making of the National Movement: 1870s–1947",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/The Making of the National Movement: 1870s–1947.pdf",
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
                name: "Resources",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/Resources.pdf",
              },
              {
                name: "Land, Soil, Water, Natural Vegetation and Wildlife Resources",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/Land, Soil, Water, Natural Vegetation and Wildlife Resources.pdf",
              },
              {
                name: "Agriculture",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/Agriculture.pdf",
              },
              {
                name: "Industries",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/Industries.pdf",
              },
              {
                name: "Human Resources",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/Human Resources.pdf",
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
                name: "The Indian Constitution",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/The Indian Constitution.pdf",
              },
              {
                name: "Understanding Secularism",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/Understanding Secularism.pdf",
              },
              {
                name: "Parliament and the Making of Laws",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/Parliament and the Making of Laws.pdf",
              },
              {
                name: "Judiciary",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/Judiciary.pdf",
              },
              {
                name: "Understanding Marginalisation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/Understanding Marginalisation.pdf",
              },
              {
                name: "Confronting Marginalisation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/Confronting Marginalisation.pdf",
              },
              {
                name: "Public Facilities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/Public Facilities.pdf",
              },
              {
                name: "Law and Social Justice",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/Law and Social Justice.pdf",
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
                name: "The Fun They Had",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/The Fun They Had.pdf",
              },
              {
                name: "The Sound of Music",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/The Sound of Music.pdf",
              },
              {
                name: "The Little Girl",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/The Little Girl.pdf",
              },
              {
                name: "A Truly Beautiful Mind",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/A Truly Beautiful Mind.pdf",
              },
              {
                name: "The Snake and the Mirror",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/The Snake and the Mirror.pdf",
              },
              {
                name: "My Childhood",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/My Childhood.pdf",
              },
              {
                name: "Reach for the Top",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/Reach for the Top.pdf",
              },
              {
                name: "Kathmandu",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/Kathmandu.pdf",
              },
              {
                name: "If I Were You",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Beehive/If I Were You.pdf",
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
                name: "The Lost Child",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/The Lost Child.pdf",
              },
              {
                name: "The Adventures of Toto",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/The Adventures of Toto.pdf",
              },
              {
                name: "Iswaran the Storyteller",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/Iswaran the Storyteller.pdf",
              },
              {
                name: "In the Kingdom of Fools",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/In the Kingdom of Fools.pdf",
              },
              {
                name: "The Happy Prince",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/The Happy Prince.pdf",
              },
              {
                name: "Weathering the Storm in Ersama",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/Weathering the Storm in Ersama.pdf",
              },
              {
                name: "The Last Leaf",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/The Last Leaf.pdf",
              },
              {
                name: "A House Is Not a Home",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/A House Is Not a Home.pdf",
              },
              {
                name: "The Beggar",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Moments%20Supplementary%20Reader/The Beggar.pdf",
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
                name: "Reading Comprehension",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/English/Words%20and%20Expressions/Unit 1 Reading Comprehension.pdf",
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
                name: "Health and Diseases",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Health and Diseases.pdf",
              },
              {
                name: "Growing up with Confidence",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Growing up with Confidence.pdf",
              },
              {
                name: "Physical Education",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Physical Education.pdf",
              },
              {
                name: "Physical Fitness",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Physical Fitness.pdf",
              },
              {
                name: "Sports Training",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Sports Training.pdf",
              },
              {
                name: "Individual Sports",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Individual Sports.pdf",
              },
              {
                name: "Team Games",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Team Games.pdf",
              },
              {
                name: "Ethics in Sports",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Ethics in Sports.pdf",
              },
              {
                name: "Personality Development Through yoga",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Personality Development Through yoga.pdf",
              },
              {
                name: "Waste Management",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Waste Management.pdf",
              },
              {
                name: "Diet for Healthy Living",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Diet for Healthy Living.pdf",
              },
              {
                name: "First Aid and Safety",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/First Aid and Safety.pdf",
              },
              {
                name: "Social Health",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Social Health.pdf",
              },
              {
                name: "Adolescent Friendly Health Services (AFHS)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/iehp114.pdf",
              },
              {
                name: "iehp1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Health%20and%20Physical%20Education/iehp1dd/Adolescent Friendly Health Services (AFHS).pdf",
              },
            ],
          },
        ],
      },
      {
        name: "ICT",
        books: [
          {
            name: "Introduction to ICT",
            chapters: [
              {
                name: "Introduction to ICT",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/Introduction to ICT.pdf",
              },
              {
                name: "Creating Textual Communication",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/Creating Textual Communication.pdf",
              },
              {
                name: "Creating Visual Communication",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/Creating Visual Communication.pdf",
              },
              {
                name: "Creating Audio‑Video Communication",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/Creating Audio‑Video Communication.pdf",
              },
              {
                name: "Presenting Ideas",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/Presenting Ideas.pdf",
              },
              {
                name: "Getting Connected: Internet",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/Getting Connected: Internet.pdf",
              },
              {
                name: "Safety and Security in the Cyber World",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/Safety and Security in the Cyber World.pdf",
              },
              {
                name: "Fun with Logic",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/ICT/iict1dd/Fun with Logic.pdf",
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
                name: "Number System",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Number System.pdf",
              },
              {
                name: "Polynomials",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Polynomials.pdf",
              },
              {
                name: "Coordinate Geometry",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Coordinate Geometry.pdf",
              },
              {
                name: "Linear Equations in two Variables",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Linear Equations in two Variables.pdf",
              },
              {
                name: "Introduction to Euclid's Geometry",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Introduction to Euclid's Geometry.pdf",
              },
              {
                name: "Lines and Angles",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Lines and Angles.pdf",
              },
              {
                name: "Triangles",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Triangles.pdf",
              },
              {
                name: "Quadrilaterals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Quadrilaterals.pdf",
              },
              {
                name: "Circles",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Circles.pdf",
              },
              {
                name: "Heron's Formula",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Heron's Formula.pdf",
              },
              {
                name: "Surface areas and Volume",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Surface areas and Volume.pdf",
              },
              {
                name: "Statistics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Maths/iemh1dd/Statistics.pdf",
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
                name: "Matter in our Surrounding",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Matter in our Surrounding.pdf",
              },
              {
                name: "Is matter around us is pure?",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Is matter around us is pure?.pdf",
              },
              {
                name: "Atoms and Molecules",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Atoms and Molecules.pdf",
              },
              {
                name: "Structure of the Atom",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Structure of the Atom.pdf",
              },
              {
                name: "The Fundamental Unit of Life",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/The Fundamental Unit of Life.pdf",
              },
              {
                name: "Tissues",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Tissues.pdf",
              },
              {
                name: "Motion",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Motion.pdf",
              },
              {
                name: "Force and Laws of Motion",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Force and Laws of Motion.pdf",
              },
              {
                name: "Gravitation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Gravitation.pdf",
              },
              {
                name: "Work and Energy",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Work and Energy.pdf",
              },
              {
                name: "Sound",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Sound.pdf",
              },
              {
                name: "Improvement in food Resources",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/9th/Science/iesc1dd/Improvement in food Resources.pdf",
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
  subjects: [{'name': 'English',
    'books': [{'name': 'First Flight',
      'chapters': [{'name': 'A Letter to God',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/A Letter to God.pdf'},
       {'name': 'Nelson Mandela: Long Walk to Freedom',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/Nelson Mandela: Long Walk to Freedom.pdf'},
       {'name': 'Two Stories about Flying',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/Two Stories about Flying.pdf'},
       {'name': 'From the Diary of Anne Frank',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/From the Diary of Anne Frank.pdf'},
       {'name': 'Glimpses of India',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/Glimpses of India.pdf'},
       {'name': 'Mijbil the Otter',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/Mijbil the Otter.pdf'},
       {'name': 'Madam Rides the Bus',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/Madam Rides the Bus.pdf'},
       {'name': 'The Sermon at Benares',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/The Sermon at Benares.pdf'},
       {'name': 'The Proposal',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/The Proposal.pdf'},
       {'name': 'jeff1ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/First%20Flight/jeff1ps.pdf'}]},
     {'name': 'Footprints without Feet',
      'chapters': [{'name': 'A Triumph of Surgery',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/A Triumph of Surgery.pdf'},
       {'name': 'The Thief’s Story',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/The Thief’s Story.pdf'},
       {'name': 'The Midnight Visitor',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/The Midnight Visitor.pdf'},
       {'name': 'A Question of Trust',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/A Question of Trust.pdf'},
       {'name': 'Footprints without Feet',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/Footprints without Feet.pdf'},
       {'name': 'The Making of a Scientist',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/The Making of a Scientist.pdf'},
       {'name': 'The Necklace',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/The Necklace.pdf'},
       {'name': 'Bholi',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/Bholi.pdf'},
       {'name': 'The Book That Saved the Earth',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/The Book That Saved the Earth.pdf'},
       {'name': 'jefp1ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Footprints%20without%20Feet/jefp1ps.pdf'}]},
     {'name': 'Words and Expressions -II',
      'chapters': [{'name': 'A Letter To God',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/A Letter To God.pdf'},
       {'name': 'Nelson Mandela: Long walk to freedom',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/Nelson Mandela: Long walk to freedom.pdf'},
       {'name': 'Two Stories about Flying',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/Two Stories about Flying.pdf'},
       {'name': 'From the Diary of Anne Frank',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/From the Diary of Anne Frank.pdf'},
       {'name': 'Glimpses of India',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/Glimpses of India.pdf'},
       {'name': 'Mijbil the Otter',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/Mijbil the Otter.pdf'},
       {'name': 'Madam rides the bus',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/Madam rides the bus.pdf'},
       {'name': 'The sermon at Benares',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/The sermon at Benares.pdf'},
       {'name': 'The Proposal',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/The Proposal.pdf'},
       {'name': 'jewe2ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/English/Words%20and%20Expressions%20-II/jewe2ps.pdf'}]}]},
   {'name': 'Health and Physical Education',
    'books': [{'name': 'jehp1dd',
      'chapters': [{'name': 'Physical Education: Relation with other Subjects',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Physical Education: Relation with other Subjects.pdf'},
       {'name': 'Effects of Physical Activities on Human body',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Effects of Physical Activities on Human body.pdf'},
       {'name': 'Growth and Development During Adolescence',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Growth and Development During Adolescence.pdf'},
       {'name': 'Individual Games and Sports-I',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Individual Games and Sports-I.pdf'},
       {'name': 'Individual Games and Sports-II',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Individual Games and Sports-II.pdf'},
       {'name': 'Team Games and Sports-I',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Team Games and Sports-I.pdf'},
       {'name': 'Team Games and Sports-II',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Team Games and Sports-II.pdf'},
       {'name': 'Yoga for healthy living',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Yoga for healthy living.pdf'},
       {'name': 'Dietary Consideration and Food Quality',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Dietary Consideration and Food Quality.pdf'},
       {'name': 'Safety Measures for Healthy Living',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Safety Measures for Healthy Living.pdf'},
       {'name': 'Healthy community living',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Healthy community living.pdf'},
       {'name': 'Social Health',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Social Health.pdf'},
       {'name': 'Agencies and Awards Promoting health, Sports and yoga',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/Agencies and Awards Promoting health, Sports and yoga.pdf'},
       {'name': 'jehp1ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Health%20and%20Physical%20Education/jehp1dd/jehp1ps.pdf'}]}]},
   {'name': 'Maths',
    'books': [{'name': 'jemh1dd',
      'chapters': [{'name': 'Real Numbers',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Real Numbers.pdf'},
       {'name': 'Polynomials',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Polynomials.pdf'},
       {'name': 'Pair of Linear Equations in Two Variables',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Pair of Linear Equations in Two Variables.pdf'},
       {'name': 'Quadratic Equations',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Quadratic Equations.pdf'},
       {'name': 'Arithmetic Progressions',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Arithmetic Progressions.pdf'},
       {'name': 'Triangles',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Triangles.pdf'},
       {'name': 'Coordinate Geometry',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Coordinate Geometry.pdf'},
       {'name': 'Introduction to Trigonometry',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Introduction to Trigonometry.pdf'},
       {'name': 'Some Applications of Trigonometry',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Some Applications of Trigonometry.pdf'},
       {'name': 'Circles',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Circles.pdf'},
       {'name': 'Areas Related to Circles',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Areas Related to Circles.pdf'},
       {'name': 'Surface Areas and Volumes',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Surface Areas and Volumes.pdf'},
       {'name': 'Statistics',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Statistics.pdf'},
       {'name': 'Probability',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/Probability.pdf'},
       {'name': 'jemh1a1',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh1a1.pdf'},
       {'name': 'jemh1a2',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh1a2.pdf'},
       {'name': 'jemh1an',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh1an.pdf'},
       {'name': 'jemh1ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Maths/jemh1dd/jemh1ps.pdf'}]}]},
   {'name': 'Science',
    'books': [{'name': 'jesc1dd',
      'chapters': [{'name': 'Chemical Reactions and Equations',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Chemical Reactions and Equations.pdf'},
       {'name': 'Acids, Bases and Salts',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Acids, Bases and Salts.pdf'},
       {'name': 'Metals and Non-metals',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Metals and Non-metals.pdf'},
       {'name': 'Carbon and its Compounds',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Carbon and its Compounds.pdf'},
       {'name': 'Life Processes',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Life Processes.pdf'},
       {'name': 'Control and Coordination',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Control and Coordination.pdf'},
       {'name': 'How do Organisms Reproduce?',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/How do Organisms Reproduce?.pdf'},
       {'name': 'Heredity',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Heredity.pdf'},
       {'name': 'Light Reflection and Refraction',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Light Reflection and Refraction.pdf'},
       {'name': 'The Human Eye and the Colourful World',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/The Human Eye and the Colourful World.pdf'},
       {'name': 'Electricity',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Electricity.pdf'},
       {'name': 'Magnetic Effects of Electric Current',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Magnetic Effects of Electric Current.pdf'},
       {'name': 'Our Environment',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/Our Environment.pdf'},
       {'name': 'jesc1an',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc1an.pdf'},
       {'name': 'jesc1ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Science/jesc1dd/jesc1ps.pdf'}]}]},
   {'name': 'Social Science',
    'books': [{'name': 'Contemporary India',
      'chapters': [{'name': 'Resources and Development',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/Resources and Development.pdf'},
       {'name': 'Forest and Wildlife Resources',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/Forest and Wildlife Resources.pdf'},
       {'name': 'Water Resources',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/Water Resources.pdf'},
       {'name': 'Agriculture',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/Agriculture.pdf'},
       {'name': 'Minerals and Energy Resources',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/Minerals and Energy Resources.pdf'},
       {'name': 'Manufacturing Industries',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/Manufacturing Industries.pdf'},
       {'name': 'Lifelines of National Economy',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/Lifelines of National Economy.pdf'},
       {'name': 'jess1a1',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess1a1.pdf'},
       {'name': 'jess1ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Contemporary%20India/jess1ps.pdf'}]},
     {'name': 'Democratic Politics',
      'chapters': [{'name': 'Power-sharing',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/Power-sharing.pdf'},
       {'name': 'Federalism',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/Federalism.pdf'},
       {'name': 'Gender, Religion and Caste',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/Gender, Religion and Caste.pdf'},
       {'name': 'Political Parties',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/Political Parties.pdf'},
       {'name': 'Outcomes of Democracy',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/Outcomes of Democracy.pdf'},
       {'name': 'jess4ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Democratic%20Politics/jess4ps.pdf'}]},
     {'name': 'India and the Contemporary World-II',
      'chapters': [{'name': 'The Rise of Nationalism in Europe',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/The Rise of Nationalism in Europe.pdf'},
       {'name': 'Nationalism in India',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/Nationalism in India.pdf'},
       {'name': 'The Making of a Global World',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/The Making of a Global World.pdf'},
       {'name': 'The Age of Industrialisation',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/The Age of Industrialisation.pdf'},
       {'name': 'Print Culture and the Modern World',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/India%20and%20the%20Contemporary%20World-II/Print Culture and the Modern World.pdf'}]},
     {'name': 'Understanding Economic Development',
      'chapters': [{'name': 'Development',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/Development.pdf'},
       {'name': 'Sector of the Indian Economy',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/Sector of the Indian Economy.pdf'},
       {'name': 'Money and Credit',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/Money and Credit.pdf'},
       {'name': 'Globalisation and the Indian Economy',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/Globalisation and the Indian Economy.pdf'},
       {'name': 'Consumer rights',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/Consumer rights.pdf'},
       {'name': 'jess2ps',
        'url': 'https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/10th/Social%20Science/Understanding%20Economic%20Development/jess2ps.pdf'}]}]}]
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
      {
        name: "Economic",
        books: [
          {
            name: "Indian Economic Development",
            chapters: [
              {
                name: "Development Policies and Expereince-Indian economy on the eve of Independence",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/Development%20Policies%20and%20Expereince-Indian%20economy%20on%20the%20eve%20of%20Independence.pdf",
              },
              {
                name: "Economic reforms since 1991- Libralisation,privatisation and Globalisation:an appraisal",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/Economic%20reforms%20since%201991-%20Libralisation,privatisation%20and%20Globalisation:an%20appraisal.pdf",
              },
              {
                name: "Rural development",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/Rural%20development.pdf",
              },
              {
                name: "Indian economy 1950-1990",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/Indian%20economy%201950-1990.pdf",
              },
              {
                name: "Current challenges facing the Indian economy- Human Capital formation in india",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/Current%20challenges%20facing%20the%20Indian%20economy-%20Human%20Capital%20formation%20in%20india.pdf",
              },
              {
                name: "Employment-growth, informalisation and other issues",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/Employment-growth,%20informalisation%20and%20other%20issues.pdf",
              },
              {
                name: "keec1gl",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/keec1gl.pdf",
              },
              {
                name: "Environment and sustainable development",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/Environment%20and%20sustainable%20development.pdf",
              },
              {
                name: "Development Experiences of India- a comparison with neighbours",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/Development%20Experiences%20of%20India-%20a%20comparison%20with%20neighbours.pdf",
              },
              {
                name: "keec1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Indian%20Economic%20Development/keec1ps.pdf",
              },
            ],
          },
          {
            name: "Statistics for Economics",
            chapters: [
              {
                name: "Introduction",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/Introduction.pdf",
              },
              {
                name: "Collection of Data",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/Collection%20of%20Data.pdf",
              },
              {
                name: "Correlation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/Correlation.pdf",
              },
              {
                name: "Measures of Central Tendency",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/Measures%20of%20Central%20Tendency.pdf",
              },
              {
                name: "Presentation of Data",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/Presentation%20of%20Data.pdf",
              },
              {
                name: "Organisation of Data",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/Organisation%20of%20Data.pdf",
              },
              {
                name: "kest1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/kest1ps.pdf",
              },
              {
                name: "Use of Statistical Tools",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/Use%20of%20Statistical%20Tools.pdf",
              },
              {
                name: "Index Numbers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Economic/Statistics%20for%20Economics/Index%20Numbers.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "English",
        books: [
          {
            name: "Hornbill",
            chapters: [
              {
                name: "We are not afraid to die",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/We%20are%20not%20afraid%20to%20die.pdf",
              },
              {
                name: "The Ailing Planet",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/The%20Ailing%20Planet.pdf",
              },
              {
                name: "The Adventure",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/The%20Adventure.pdf",
              },
              {
                name: "Note-making",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/Note-making.pdf",
              },
              {
                name: "Silk Road",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/Silk%20Road.pdf",
              },
              {
                name: "The Portrait of a Lady",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/The%20Portrait%20of%20a%20Lady.pdf",
              },
              {
                name: "Discovering Tut: the Saga Continues",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/Discovering%20Tut:%20the%20Saga%20Continues.pdf",
              },
              {
                name: "Sub-titling",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/Sub-titling.pdf",
              },
              {
                name: "Letter-writing",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/Letter-writing.pdf",
              },
              {
                name: "Summarising",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/Summarising.pdf",
              },
              {
                name: "kehb114",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/kehb114.pdf",
              },
              {
                name: "Essay-writing",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/Essay-writing.pdf",
              },
              {
                name: "kehb1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Hornbill/kehb1ps.pdf",
              },
            ],
          },
          {
            name: "Snapshots Suppl.Reader English",
            chapters: [
              {
                name: "Birth",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Snapshots%20Suppl.Reader%20English/Birth.pdf",
              },
              {
                name: "The Address",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Snapshots%20Suppl.Reader%20English/The%20Address.pdf",
              },
              {
                name: "The Summer of the Beautiful White Horse",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Snapshots%20Suppl.Reader%20English/The%20Summer%20of%20the%20Beautiful%20White%20Horse.pdf",
              },

              {
                name: "Mothers Day",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Snapshots%20Suppl.Reader%20English/Mothers%20Day.pdf",
              },
              
              {
                name: "The Tale of Melon City",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Snapshots%20Suppl.Reader%20English/The%20Tale%20of%20Melon%20City.pdf",
              },
              
              {
                name: "kesp1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Snapshots%20Suppl.Reader%20English/kesp1ps.pdf",
              },
           
            ],
          },
          {
            name: "Woven Words",
            chapters: [
              {
                name: "Pappachis Moth",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Pappachis%20Moth.pdf",
              },
              {
                name: "The Luncheon",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/The%20Luncheon.pdf",
              },
              {
                name: "The Lament",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/The%20Lament.pdf",
              },

              {
                name: "A Pair of Mustachio",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/A%20Pair%20of%20Mustachios.pdf",
              },
              {
                name: "Glory at Twilight",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Glory%20at%20Twilight.pdf",
              },
              {
                name: "The Rocking-horse Winner",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/The%20Rocking-horse%20Winner.pdf",
              },
              {
                name: "The Adventure of the Three Garridebs",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/The%20Adventure%20of%20the%20Three%20Garridebs.pdf",
              },
              {
                name: "The Third and Final Continent",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/The%20Third%20and%20Final%20Continent.pdf",
              },
              {
                name: "The World is too much with us",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/The%20World%20is%20too%20much%20with%20us.pdf",
              },
              {
                name: "Mother Tongue",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Mother%20Tongue.pdf",
              },
              {
                name: "Let Me Not to the Marriage of True Minds",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Let%20Me%20Not%20to%20the%20Marriage%20of%20True%20Minds.pdf",
              },
              {
                name: "Coming",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Coming.pdf",
              },
              {
                name: "The Peacock",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/The%20Peacock.pdf",
              },
              {
                name: "Telephone Conversation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Telephone%20Conversation.pdf",
              },
              {
                name: "Refugee Blue",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Refugee%20Blues.pdf",
              },
              {
                name: "Hawk Roosting",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Hawk%20Roosting.pdf",
              },
              {
                name: "Felling of the Banyan Treen",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Felling%20of%20the%20Banyan%20Tree.pdf",
              },
              {
                name: "For Elkana",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/For%20Elkana.pdf",
              },
              {
                name: "My Three Passions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/My%20Three%20Passions.pdf",
              },
              {
                name: "Ajamil and the Tigers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Ajamil%20and%20the%20Tigers.pdf",
              },
              {
                name: "Ode to a Nightingale",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Ode%20to%20a%20Nightingale.pdf",
              },
              {
                name: "The Story",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/The%20Story.pdf",
              },
              {
                name: "My Watch",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/My%20Watch.pdf",
              },
              {
                name: "What is a Good Book?",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/What%20is%20a%20Good%20Book?.pdf",
              },
              {
                name: "Patterns of Creativity",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Patterns%20of%20Creativity.pdf",
              },
              {
                name: "Bridges",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Bridges.pdf",
              },
              {
                name: "keww1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/keww1ps.pdf",
              },
              {
                name: "Tribal Verse",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/English/Woven%20Words/Tribal%20Verse.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Fine Art",
        books: [
          {
            name: "An Introduction to Indian Art Part-I",
            chapters: [
              {
                name: "kefa1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Fine%20Art/An%20Introduction%20to%20Indian%20Art%20Part-I/kefa1ps.pdf",
              },
              {
                name: "Prehistoric rock paintings",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Fine%20Art/An%20Introduction%20to%20Indian%20Art%20Part-I/Prehistoric%20rock%20paintings.pdf",
              },
              {
                name: "kefa105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Fine%20Art/An%20Introduction%20to%20Indian%20Art%20Part-I/kefa105.pdf",
              },
              {
                name: "Arts of the indus valley",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Fine%20Art/An%20Introduction%20to%20Indian%20Art%20Part-I/Arts%20of%20the%20indus%20valley.pdf",
              },
              {
                name: "kefa107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Fine%20Art/An%20Introduction%20to%20Indian%20Art%20Part-I/kefa107.pdf",
              },
              {
                name: "kefa108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Fine%20Art/An%20Introduction%20to%20Indian%20Art%20Part-I/kefa108.pdf",
              },
              {
                name: "Arts of the Mauryan period",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Fine%20Art/An%20Introduction%20to%20Indian%20Art%20Part-I/Arts%20of%20the%20Mauryan%20period.pdf",
              },
              {
                name: "kefa106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Fine%20Art/An%20Introduction%20to%20Indian%20Art%20Part-I/kefa106.pdf",
              },
            ],
          },
        
        ],
      },
      {
        name: "Geography",
        books: [
          {
            name: "Fundamental of Physical Geography",
            chapters: [
              {
                name: "The earth- The origin and evolution of the earth",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/The%20earth-%20The%20origin%20and%20evolution%20of%20the%20earth.pdf",
              },
              {
                name: "Geography as a discipline",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Geography%20as%20a%20discipline.pdf",
              },
              {
                name: "Climate-Composition and structure of atmosphere",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Climate-Composition%20and%20structure%20of%20atmosphere.pdf",
              },
              {
                name: "water in the atmosphere",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/water%20in%20the%20atmosphere.pdf",
              },
              {
                name: "Solar radiation, heat balance, and temperature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Solar%20radiation,%20heat%20balance,%20and%20temperature.pdf",
              },
              {
                name: "Distribution of oceans and continents",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Distribution%20of%20oceans%20and%20continents.pdf",
              },
              {
                name: "landforms",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/landforms.pdf",
              },
              {
                name: "Water( oceans)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Water(%20oceans).pdf",
              },
              {
                name: "interior of the earth",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/interior%20of%20the%20earth.pdf",
              },
              {
                name: "Atmospheric circulation and weather system",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Atmospheric%20circulation%20and%20weather%20system.pdf",
              },
              {
                name: "World climate and climate changes",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/World%20climate%20and%20climate%20changes.pdf",
              },
              {
                name: "Landforms and their evaluation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Landforms%20and%20their%20evaluation.pdf",
              },
              {
                name: "kegy2gl",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/kegy2gl.pdf",
              },
              {
                name: "Life on the earth- Biodiversity and conservation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Life%20on%20the%20earth-%20Biodiversity%20and%20conservation.pdf",
              },
              {
                name: "Movements of ocean water",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/Movements%20of%20ocean%20water.pdf",
              },
              {
                name: "kegy2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Fundamental%20of%20Physical%20Geography/kegy2ps.pdf",
              },
            ],
          },
          {
            name: "India Physical Environment",
            chapters: [
              {
                name: "Drainage system",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/India%20Physical%20Environment/Drainage%20system.pdf",
              },
              {
                name: "Structure and physiography",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/India%20Physical%20Environment/Structure%20and%20physiography.pdf",
              },
              {
                name: "India - location",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/India%20Physical%20Environment/India%20-%20location.pdf",
              },

              {
                name: "natural vegetation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/India%20Physical%20Environment/natural%20vegetation.pdf",
              },
              
              {
                name: "Climate and vegetation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/India%20Physical%20Environment/Climate%20and%20vegetation.pdf",
              },
              
              {
                name: "Natural hazards and disasters",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/India%20Physical%20Environment/Natural%20hazards%20and%20disasters.pdf",
              },
              {
                name: "kegy1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/India%20Physical%20Environment/kegy1ps.pdf",
              },
           
            ],
          },
          {
            name: "Pratical Work in Geography",
            chapters: [
              {
                name: "Map Scale",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Pratical%20Work%20in%20Geography/Map%20Scale.pdf",
              },
              {
                name: "Latitude, Longitude and time",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Pratical%20Work%20in%20Geography/Latitude,%20Longitude%20and%20time.pdf",
              },
              {
                name: "kegy3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Pratical%20Work%20in%20Geography/kegy3ps.pdf",
              },

              {
                name: "Map Projections",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Pratical%20Work%20in%20Geography/Map%20Projections.pdf",
              },
              {
                name: "Topographical Maps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Pratical%20Work%20in%20Geography/Topographical%20Maps.pdf",
              },
              {
                name: "Introduction To Remote Sensing",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Pratical%20Work%20in%20Geography/Introduction%20To%20Remote%20Sensing.pdf",
              },
              {
                name: "Introduction to Maps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Geography/Pratical%20Work%20in%20Geography/Introduction%20to%20Maps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Health and Physical Education",
        books: [
          {
            name: "Health and Physical Education",
            chapters: [
              {
                name: "Physical Education",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Physical%20Education.pdf",
              },
              {
                name: "Understanding Health",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Understanding%20Health.pdf",
              },
              {
                name: "kehp1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/kehp1ps.pdf",
              },
              {
                name: "Measurement and Evaluation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Measurement%20and%20Evaluation.pdf",
              },
              {
                name: "Adventure Sports",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Adventure%20Sports.pdf",
              },
              {
                name: "Physical and Physiological Aspects of Physical Education and Sports",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Physical%20and%20Physiological%20Aspects%20of%20Physical%20Education%20and%20Sports.pdf",
              },
              {
                name: "Health Related Physical Fitness",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Health%20Related%20Physical%20Fitness.pdf",
              },
              {
                name: "Safety and Security",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Safety%20and%20Security.pdf",
              },
              {
                name: "Tournaments and Competitions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Tournaments%20and%20Competitions.pdf",
              },
              {
                name: "Yoga and its Relevance in the Modern Times",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Yoga%20and%20its%20Relevance%20in%20the%20Modern%20Times.pdf",
              },
              {
                name: "Team Games",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Team%20Games.pdf",
              },
              {
                name: "Individual Games",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Health%20and%20Physical%20Education/Health%20and%20Physical%20Education/Individual%20Games.pdf",
              },
            ],
          },
        
        ],
      },
      {
        name: "History",
        books: [
          {
            name: "kehs1dd",
            chapters: [
              {
                name: "kehs1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/History/kehs1dd/kehs1ps.pdf",
              },
              {
                name: "Changing Cultural Traditions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/History/kehs1dd/Changing%20Cultural%20Traditions.pdf",
              },
              {
                name: "Nomadic Empires",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/History/kehs1dd/Nomadic%20Empires.pdf",
              },
              {
                name: "Displacing Indigenous Peoples",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/History/kehs1dd/Displacing%20Indigenous%20Peoples.pdf",
              },
              {
                name: "Early societies",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/History/kehs1dd/Early%20societies.pdf",
              },
              {
                name: "Paths to Modernisation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/History/kehs1dd/Paths%20to%20Modernisation.pdf",
              },
              {
                name: "An Empire Across Three Continents",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/History/kehs1dd/An%20Empire%20Across%20Three%20Continents.pdf",
              },
              {
                name: "Changing traditions - The Three Orders",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/History/kehs1dd/Changing%20traditions%20-%20The%20Three%20Orders.pdf",
              },
            ],
          },
        
        ],
      },

      {
        name: "Home Science",
        books: [
          {
            name: "Human Ecology and Family Sciences Part I",
            chapters: [
              {
                name: "Human ecology and Family science",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Human%20ecology%20and%20Family%20science.pdf",
              },
              {
                name: "Understanding oneself adolescence",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Understanding%20oneself%20%20adolescence.pdf",
              },
              {
                name: "Management of Resource",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Management%20of%20Resources.pdf",
              },
              {
                name: "kehe1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/kehe1ps.pdf",
              },
              {
                name: "Food, Nutrition, Health and Fitness",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Food,%20Nutrition,%20Health%20and%20Fitness.pdf",
              },
              {
                name: "Media and Communication Technology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Media%20and%20Communication%20Technology.pdf",
              },
              {
                name: "Fabrics Around Us",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Fabrics%20Around%20Us.pdf",
              },
              {
                name: "Understanding family, community and society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Understanding%20family,%20community%20and%20society.pdf",
              },
            ],
          },
          {
            name: "Human Ecology and Family Sciences Part II",
            chapters: [
              {
                name: "Financial Management and Planning",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Financial%20Management%20and%20Planning.pdf",
              },
              {
                name: "Our Apparel",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Our%20Apparel.pdf",
              },
              {
                name: "Care and Maintenance of Fabrics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Care%20and%20Maintenance%20of%20Fabrics.pdf",
              },

              {
                name: "Nutrition, Health and Well-being",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Nutrition,%20Health%20and%20Well-being.pdf",
              },
              {
                name: "kehe2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/kehe2ps.pdf",
              },
            ],
          },
        ],
      },

      {
        name: "Informatics practice",
        books: [
          {
            name: "keip1dd",
            chapters: [
              {
                name: "keip1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/keip1ps.pdf",
              },
              {
                name: "Understanding data",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/Understanding%20data.pdf",
              },
              {
                name: "Computer System",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/Computer%20System.pdf",
              },
              {
                name: "Database concepts",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/Database%20concepts.pdf",
              },
              {
                name: "Emerging trends",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/Emerging%20trends.pdf",
              },
              {
                name: "Working with lists and dictionaries",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/Working%20with%20lists%20and%20dictionaries.pdf",
              },
              {
                name: "Brief overview of python",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/Brief%20overview%20of%20python.pdf",
              },
              {
                name: "Introductions of Numpy",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/Introductions%20of%20Numpy.pdf",
              },
              {
                name: "Introductions of structured query language",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Informatics%20practice/keip1dd/Introductions%20of%20structured%20query%20language.pdf",
              },
            ],
          },
        
        ],
      },

      {
        name: "Knowledge traditions and practices of india",
        books: [
          {
            name: "keks1dd",
            chapters: [
              {
                name: "keks1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/keks1ps.pdf",
              },
              {
                name: "Mathematics in India",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/Mathematics%20in%20India.pdf",
              },
              {
                name: "Chemistry and Metallurgy in India",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/Chemistry%20and%20Metallurgy%20in%20India.pdf",
              },
              {
                name: "Indian Philosophical Systems",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/Indian%20Philosophical%20Systems.pdf",
              },
              {
                name: "Astronomy in India",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/Astronomy%20in%20India.pdf",
              },
              {
                name: "Introducing Ayurveda: the Science of Health and Disease",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/Introducing%20Ayurveda:%20the%20Science%20of%20Health%20and%20Disease.pdf",
              },
              {
                name: "Yoga",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/Yoga.pdf",
              },
              {
                name: "Language and Literature of India",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/Language%20and%20Literature%20of%20India.pdf",
              },
              {
                name: "Indian Art and Architecture",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Knowledge%20traditions%20and%20practices%20of%20india/keks1dd/Indian%20Art%20and%20Architecture.pdf",
              },
            ],
          },
        
        ],
      },
      {
        name: "Maths",
        books: [
          {
            name: "kemh1dd",
            chapters: [
              {
                name: "Sets",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Sets.pdf",
              },
              {
                name: "Binomial Theorem",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Binomial%20Theorem.pdf",
              },
              {
                name: "Introduction to Three Dimensional Geometry",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Introduction%20to%20Three%20Dimensional%20Geometry.pdf",
              },
              {
                name: "Linear Inequalities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Linear%20Inequalities.pdf",
              },
              {
                name: "Complex Numbers and Quadratic Equations",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Complex%20Numbers%20and%20Quadratic%20Equations.pdf",
              },
              {
                name: "Sequences and Series",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Sequences%20and%20Series.pdf",
              },
              {
                name: "Relations and Functions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Relations%20and%20Functions.pdf",
              },
              {
                name: "Permutations and Combinations",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Permutations%20and%20Combinations.pdf",
              },
              {
                name: "Straight Lines",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Straight%20Lines.pdf",
              },
              {
                name: "Conic Sections",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Conic%20Sections.pdf",
              },
              {
                name: "Trigonometric Functions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Trigonometric%20Functions.pdf",
              },
              {
                name: "kemh1sm",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/kemh1sm.pdf",
              },
              {
                name: "kemh1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/kemh1a1.pdf",
              },
              {
                name: "kemh1a2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/kemh1a2.pdf",
              },
              {
                name: "kemh1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/kemh1ps.pdf",
              },
              {
                name: "kemh1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/kemh1an.pdf",
              },
              {
                name: "Statistics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Statistics.pdf",
              },
              {
                name: "Probability",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Probability.pdf",
              },
              {
                name: "Limits and Derivatives",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Maths/kemh1dd/Limits%20and%20Derivatives.pdf",
              },
            ],
          },
        
        ],
      },

      {
        name: "Physics",
        books: [
          {
            name: "Physics Part-I",
            chapters: [
              {
                name: "Units and measurements",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/Units%20and%20measurements.pdf",
              },
              {
                name: "Motion in a straight line",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/Motion%20in%20a%20straight%20line.pdf",
              },
              {
                name: "keph1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/keph1an.pdf",
              },
              {
                name: "keph1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/keph1ps.pdf",
              },
              {
                name: "Gravitation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/Gravitation.pdf",
              },
              {
                name: "Laws of motion",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/Laws%20of%20motion.pdf",
              },
              {
                name: "Work, energy and power",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/Work,%20energy%20and%20power.pdf",
              },
              {
                name: "Motion in a plane",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/Motion%20in%20a%20plane.pdf",
              },
              {
                name: "keph1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/keph1a1.pdf",
              },
              {
                name: "System of particles and rotational motion",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-I/System%20of%20particles%20and%20rotational%20motion.pdf",
              },
            ],
          },
          {
            name: "Physics Part-II",
            chapters: [
              {
                name: "Mechanical Properties of solids",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/Mechanical%20%20Properties%20of%20solids.pdf",
              },
              {
                name: "Mechanical Properties of Fluids",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/Mechanical%20%20Properties%20of%20Fluids.pdf",
              },
              {
                name: "keph2an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/keph2an.pdf",
              },

              {
                name: "keph2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/keph2ps.pdf",
              },
              {
                name: "Kinetic theory",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/Kinetic%20theory.pdf",
              },
              {
                name: "Oscillations",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/Oscillations.pdf",
              },
              {
                name: "Thermodynamics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/Thermodynamics.pdf",
              },
              {
                name: "Waves",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/Waves.pdf",
              },
              {
                name: "Thermal properties of matter",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Physics/Physics%20Part-II/Thermal%20properties%20of%20matter.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Political science",
        books: [
          {
            name: "India Constitution at Work",
            chapters: [
              {
                name: "Constitution why and how?",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Constitution%20why%20and%20how?.pdf",
              },
              {
                name: "Rights in the Indian constitution",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Rights%20in%20the%20Indian%20constitution.pdf",
              },
              {
                name: "Election and Representation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Election%20and%20Representation.pdf",
              },
              {
                name: "keps2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/keps2ps.pdf",
              },
              {
                name: "Local Governments",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Local%20Governments.pdf",
              },
              {
                name: "The Philosophy of the constitution",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/The%20Philosophy%20of%20the%20constitution.pdf",
              },
              {
                name: "Constitution as a living document",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Constitution%20as%20a%20living%20document.pdf",
              },
              {
                name: "Executive",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Executive.pdf",
              },
              {
                name: "Judiciary",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Judiciary.pdf",
              },
              {
                name: "Federalism",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Federalism.pdf",
              },
              {
                name: "Legislature",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/India%20Constitution%20at%20Work/Legislature.pdf",
              },
            ],
          },
          {
            name: "Political Theory",
            chapters: [
              {
                name: "Freedom",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/Freedom.pdf",
              },
              {
                name: "Political Theory: An Introduction",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/Political%20Theory:%20An%20Introduction.pdf",
              },
              {
                name: "keps1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/keps1ps.pdf",
              },

              {
                name: "Rights",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/Rights.pdf",
              },
              {
                name: "Social Justice",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/Social%20Justice.pdf",
              },
              {
                name: "Secularism",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/Secularism.pdf",
              },
              {
                name: "Nationalism",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/Nationalism.pdf",
              },
              {
                name: "Equality",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/Equality.pdf",
              },
              {
                name: "Citizenship",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Political%20science/Political%20Theory/Citizenship.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Sociology",
        books: [
          {
            name: "Introducing Sociology",
            chapters: [
              {
                name: "Terms, concepts and their use in sociology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Introducing%20Sociology/Terms,%20concepts%20and%20their%20use%20in%20sociology.pdf",
              },
              {
                name: "Understanding social institutions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Introducing%20Sociology/Understanding%20social%20institutions.pdf",
              },
              {
                name: "Sociology and society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Introducing%20Sociology/Sociology%20and%20society.pdf",
              },
              {
                name: "kesy1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Introducing%20Sociology/kesy1ps.pdf",
              },
              {
                name: "Doing sociology: Research Method",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Introducing%20Sociology/Doing%20sociology:%20Research%20Method.pdf",
              },
              {
                name: "Culture and socialisation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Introducing%20Sociology/Culture%20and%20socialisation.pdf",
              },
            ],
          },
          {
            name: "Understanding Society",
            chapters: [
              {
                name: "Environment and society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Understanding%20Society/Environment%20and%20society.pdf",
              },
              {
                name: "Social Structure, Stratification and Social Processes in Society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Understanding%20Society/Social%20Structure,%20Stratification%20and%20Social%20Processes%20in%20Society.pdf",
              },
              {
                name: "kesy2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Understanding%20Society/kesy2ps.pdf",
              },

              {
                name: "Introducing Western Sociologists",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Understanding%20Society/Introducing%20Western%20Sociologists.pdf",
              },
              {
                name: "Indian sociologists",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Understanding%20Society/Indian%20sociologists.pdf",
              },
              {
                name: "Social change and social order in rural and Urban society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Sociology/Understanding%20Society/Social%20change%20and%20social%20order%20in%20rural%20and%20Urban%20society.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Psychology",
        books: [
          {
            name: "kepy1dd",
            chapters: [
              {
                name: "What is Psychology?",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/What%20is%20Psychology?.pdf",
              },
              {
                name: "Human Development",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/Human%20Development.pdf",
              },
              {
                name: "Methods of Enquiry in Psychology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/Methods%20of%20Enquiry%20in%20Psychology.pdf",
              },
              {
                name: "kepy1gl",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/kepy1gl.pdf",
              },
              {
                name: "Motivation and Emotion",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/Motivation%20and%20Emotion.pdf",
              },
              {
                name: "Human Memory",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/Human%20Memory.pdf",
              },
              {
                name: "kepy1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/kepy1ps.pdf",
              },
              {
                name: "Learning",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/Learning.pdf",
              },
              {
                name: "Sensory, Attentional and Perceptual Processes",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/Sensory,%20Attentional%20and%20Perceptual%20Processes.pdf",
              },
              {
                name: "Thinking",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/11th/Psychology/kepy1dd/Thinking.pdf",
              },
            ],
          },
        
        ],
      },

    ],
  },
  {
    name: "12th",
    subjects: [
      {
        name: "Accountancy",
        books: [
          {
            name: "Accountancy Part II",
            chapters: [
              {
                name: "Analysis of Financial Statements",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20II/Analysis%20of%20Financial%20Statements.pdf",
              },
              {
                name: "Financial Statements of a Company",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20II/Financial%20Statements%20of%20a%20Company.pdf",
              },
              {
                name: "Accounting Ratios",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20II/Accounting%20Ratios.pdf",
              },
              {
                name: "Issue and Redemption of Debentures",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20II/Issue%20and%20Redemption%20of%20Debentures.pdf",
              },
              {
                name: "Accounting for Share Capital",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20II/Accounting%20for%20Share%20Capital.pdf",
              },
              {
                name: "leac2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20II/leac2ps.pdf",
              },
              {
                name: "Cash Flow Statement",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20II/Cash%20Flow%20Statement.pdf",
              },
            ],
          },
          {
            name: "Accountancy Part I",
            chapters: [
              {
                name: "leac1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20I/leac1ps.pdf",
              },
              {
                name: "Dissolution of Partnership Firm",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20I/Dissolution%20of%20Partnership%20Firm.pdf",
              },
              {
                name: "Accounting for Partnership: Basic Concepts",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20I/Accounting%20for%20Partnership:%20Basic%20Concepts.pdf",
              },

              {
                name: "Reconstitution of a Partnership Firm Admission of a Partner",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Accountancy%20Part%20I/Reconstitution%20of%20a%20Partnership%20Firm%20%20Admission%20of%20a%20Partner.pdf",
              },
            ],
          },
          {
            name: "Computerised Accounting System",
            chapters: [
              {
                name: "leca1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Computerised%20Accounting%20System/leca1ps.pdf",
              },
              {
                name: "Overview of computerised accounting system",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Computerised%20Accounting%20System/Overview%20of%20computerised%20accounting%20system.pdf",
              },
              {
                name: "use of spreadsheet in business Applications",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Computerised%20Accounting%20System/use%20of%20spreadsheet%20in%20business%20Applications.pdf",
              },

              {
                name: "Graphs and charts for business data",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Computerised%20Accounting%20System/Graphs%20and%20charts%20for%20business%20data.pdf",
              },
              {
                name: "Spreadsheet",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Accounctancy/Computerised%20Accounting%20System/Spreadsheet.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Biology",
        books: [
          {
            name: "lebo1dd",
            chapters: [
              {
                name: "Reproductive Health",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/Reproductive%20Health.pdf",
              },
              {
                name: "lebo105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo105.pdf",
              },
              {
                name: "lebo106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo106.pdf",
              },
              {
                name: "lebo1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo1ps.pdf",
              },
              {
                name: "lebo110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo110.pdf",
              },
              {
                name: "lebo111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo111.pdf",
              },
              {
                name: "lebo112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo112.pdf",
              },
              {
                name: "lebo113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo113.pdf",
              },
              {
                name: "lebo109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo109.pdf",
              },
              {
                name: "lebo107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo107.pdf",
              },
              {
                name: "lebo108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo108.pdf",
              },
              {
                name: "lebo101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo101.pdf",
              },
              {
                name: "lebo102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biology/lebo1dd/lebo102.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Biotechnology",
        books: [
          {
            name: "lebt1dd",
            chapters: [
              {
                name: "An Overview of Recombinant DNA Technology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/An%20Overview%20of%20Recombinant%20DNA%20Technology.pdf",
              },
              {
                name: "Host Vector System",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Host%20Vector%20System.pdf",
              },
              {
                name: "Plant Tissue Culture",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Plant%20Tissue%20Culture.pdf",
              },
              {
                name: "Microbial Culture",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Microbial%20Culture.pdf",
              },
              {
                name: "Stem Cell Culture and Organ Culture",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Stem%20Cell%20Culture%20and%20Organ%20Culture.pdf",
              },
              {
                name: "Bioprocessing and Biomanufacturing",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Bioprocessing%20and%20Biomanufacturing.pdf",
              },
              {
                name: "Animal Cell Culture",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Animal%20Cell%20Culture.pdf",
              },
              {
                name: "Genome Technology and Engineering",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Genome%20Technology%20and%20Engineering.pdf",
              },
              {
                name: "Recent Innovations in Biotechnology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Recent%20Innovations%20in%20Biotechnology.pdf",
              },
              {
                name: "Bioremediation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Bioremediation.pdf",
              },
              {
                name: "Applications of Recombinant DNA Technology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Applications%20of%20Recombinant%20DNA%20Technology.pdf",
              },
              {
                name: "Gene Cloning",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Gene%20Cloning.pdf",
              },
              {
                name: "lebt1cc",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/lebt1cc.jpg",
              },
              {
                name: "lebt1cc",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/lebt1cc.pdf",
              },
              {
                name: "lebt1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/lebt1ps.pdf",
              },
              {
                name: "Entrepreneurship",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Biotechnolgy/lebt1dd/Entrepreneurship.pdf",
              },
            ],
          },
        ],
      },
      
      {
        name: "Business Studies",
        books: [
          {
            name: "Business Studies I",
            chapters: [
              {
                name: "Planning",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/Planning.pdf",
              },
              {
                name: "Business environment",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/Planning.pdf",
              },
              {
                name: "Nature and significance of management",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/Planning.pdf",
              },
              {
                name: "Staffing",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/Planning.pdf",
              },
              {
                name: "Organising",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/Organising.pdf",
              },
              {
                name: "Principles of management",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/Principles%20of%20management.pdf",
              },
              {
                name: "lebs1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/lebs1ps.pdf",
              },
              {
                name: "Controlling",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/Controlling.pdf",
              },
              {
                name: "Directing",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20I/Directing.pdf",
              },
            ],
          },
          {
            name: "Business Studies II",
            chapters: [
              {
                name: "lebs2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20II/lebs2ps.pdf",
              },
              {
                name: "Consumer Protection",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20II/Consumer%20Protection.pdf",
              },
              {
                name: "Financial management",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20II/Financial%20management.pdf",
              },

              {
                name: "Marketing",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Business%20Studies/Business%20Studies%20II/Marketing.pdf",
              },
            ],
          },
        ],
      },       
             
      {
        name: "Chemistry",
        books: [
          {
            name: "chemistry I",
            chapters: [
              {
                name: "Solutions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20I/Solutions.pdf",
              },
              {
                name: "Chemical Kinetics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20I/Chemical%20Kinetics.pdf",
              },
              {
                name: "Electrochemistry",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20I/Electrochemistry.pdf",
              },
              {
                name: "lech1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20I/lech1an.pdf",
              },
              {
                name: "lech1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20I/lech1a1.pdf",
              },
              {
                name: "lech1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20I/lech1ps.pdf",
              },
              {
                name: "Coordination Compounds",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20I/Coordination%20Compounds.pdf",
              },
              {
                name: "The d and f Block Elements",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20I/The%20d%20and%20f%20Block%20Elements.pdf",
              },
            ],
          },
          {
            name: "chemistry II",
            chapters: [
              {
                name: "Amines",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20II/Amines.pdf",
              },
              {
                name: "Biomolecules",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20II/Biomolecules.pdf",
              },
              {
                name: "Haloalkanes and Haloarenes",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20II/Haloalkanes%20and%20Haloarenes.pdf",
              },
              {
                name: "Aldehydes, Ketones and Carboxylic Acids",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20II/Aldehydes,%20Ketones%20and%20Carboxylic%20Acids.pdf",
              },
              {
                name: "Alcohols, Phenols and Ethers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20II/Alcohols,%20Phenols%20and%20Ethers.pdf",
              },
              {
                name: "lech2an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20II/lech2an.pdf",
              },
              {
                name: "lech2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Chemistry/chemistry%20II/lech2ps.pdf",
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
                name: "Searching",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Searching.pdf",
              },
              {
                name: "Understanding Data",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Understanding%20Data.pdf",
              },
              {
                name: "Stack",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Stack.pdf",
              },
              {
                name: "Sorting",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Sorting.pdf",
              },
              {
                name: "File Handling in python",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/File%20Handling%20in%20python.pdf",
              },
              {
                name: "Queue",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Queue.pdf",
              },
              {
                name: "Database Concepts",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Database%20Concepts.pdf",
              },
              {
                name: "Exception Handling in python",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Exception%20Handling%20in%20python.pdf",
              },
              {
                name: "Project Based Learning",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Project%20Based%20Learning.pdf",
              },
              {
                name: "lecs1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/lecs1ps.pdf",
              },
              {
                name: "Security Aspects",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Security%20Aspects.pdf",
              },
              {
                name: "Computer Networks",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Computer%20Networks.pdf",
              },
              {
                name: "Data Communication",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Data%20Communication.pdf",
              },
              {
                name: "Structured Query Language (SQL)",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Computer%20science/lecs1dd/Structured%20Query%20Language%20(SQL).pdf",
              },
            ],
          },
        
        ],
      },
      {
        name: "Economics",
        books: [
          {
            name: "Introductory Macroeconomics",
            chapters: [
              {
                name: "Introduction",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Macroeconomics/Introduction.pdf",
              },
              {
                name: "Determination of Income and Employment",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Macroeconomics/Determination%20of%20Income%20and%20Employment.pdf",
              },
              {
                name: "Money and Banking",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Macroeconomics/Money%20and%20Banking.pdf",
              },
              {
                name: "National Income Accounting",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Macroeconomics/National%20Income%20Accounting.pdf",
              },
              {
                name: "leec1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Macroeconomics/leec1ps.pdf",
              },
              {
                name: "Open Economy Macroeconomics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Macroeconomics/Open%20Economy%20Macroeconomics.pdf",
              },
              {
                name: "Government Budget and the Economy",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Macroeconomics/Government%20Budget%20and%20the%20Economy.pdf",
              },
            ],
          },
          {
            name: "Introductory Microeconomi",
            chapters: [
              {
                name: "Glossary",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Microeconomics/Glossary.pdf",
              },
              {
                name: "Market Equilibrium",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Microeconomics/Market%20Equilibrium.pdf",
              },
              {
                name: "leec205",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Microeconomics/leec205.pdf",
              },
              {
                name: "Production and costs",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Microeconomics/Production%20and%20costs.pdf",
              },
              {
                name: "The Theory of the Firm under Perfect Competition",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Microeconomics/The%20Theory%20of%20the%20Firm%20under%20Perfect%20Competition.pdf",
              },
              {
                name: "Introduction",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Microeconomics/Introduction.pdf",
              },
              {
                name: "Theory of consumer behaviour",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Economics/Introductory%20Microeconomics/Theory%20of%20consumer%20behaviour.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "English",
        books: [
          {
            name: "Flamingo",
            chapters: [
              {
                name: "Keeping Quiet",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/Keeping%20Quiet.pdf",
              },
              {
                name: "My Mother at Sixty-six",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/My%20Mother%20at%20Sixty-six.pdf",
              },
              {
                name: "Deep Water",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/Deep%20Water.pdf",
              },
              {
                name: "The Interview",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/The%20Interview.pdf",
              },
              {
                name: "Lost Spring",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/Lost%20Spring.pdf",
              },
              {
                name: "Poets and Pancakes",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/Poets%20and%20Pancakes.pdf",
              },
              {
                name: "Indigo",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/Indigo.pdf",
              },
              {
                name: "Going Places",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/Going%20Places.pdf",
              },
              {
                name: "The Rattrap",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/The%20Rattrap.pdf",
              },
              {
                name: "The Last Lesson",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/The%20Last%20Lesson.pdf",
              },
              {
                name: "A Thing of Beauty",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/A%20Thing%20of%20Beauty.pdf",
              },
              {
                name: "A Roadside Stand",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/A%20Roadside%20Stand.pdf",
              },
              {
                name: "Aunt Jennifers Tigers",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/Aunt%20Jennifers%20Tigers.pdf",
              },
              {
                name: "lefl1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Flamingo/lefl1ps.pdf",
              },
            ],
          },
          {
            name: "Kaliedoscope",
            chapters: [
              {
                name: "A Lecture Upon the Shadow",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/A%20Lecture%20Upon%20the%20Shadow.pdf",
              },
              {
                name: "Eveline",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Eveline.pdf",
              },
              {
                name: "I Sell my Dreams",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/I%20Sell%20my%20Dreams.pdf",
              },

              {
                name: "A Wedding in Brownsville",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/A%20Wedding%20in%20Brownsville.pdf",
              },
              
              {
                name: "One Centimetre",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/One%20Centimetre.pdf",
              },
              
              {
                name: "Tomorrow",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Tomorrow.pdf",
              },
              
              {
                name: "The Wild Swans at Coole",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/The%20Wild%20Swans%20at%20Coole.pdf",
              },
              
              {
                name: "Time and Time Again",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Time%20and%20Time%20Again.pdf",
              },
              
              {
                name: "Trees",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Trees.pdf",
              },
              
              {
                name: "Poems by Milton",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Poems%20by%20Milton.pdf",
              },
              
              {
                name: "Kubla Khan",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Kubla%20Khan.pdf",
              },
              
              {
                name: "Blood",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Blood.pdf",
              },
              
              {
                name: "The Mark on the Wall",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/The%20Mark%20on%20the%20Wall.pdf",
              },
              
              {
                name: "Freedom",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Freedom.pdf",
              },
              
              {
                name: "Film-making",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Film-making.pdf",
              },
              
              {
                name: "Poems by Blake",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Poems%20by%20Blake.pdf",
              },
              
              {
                name: "lekl1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/lekl1ps.pdf",
              },
              
              {
                name: "Why the Novel Matters",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Why%20the%20Novel%20Matters.pdf",
              },
              
              {
                name: "On Science Fiction",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/On%20Science%20Fiction.pdf",
              },
              
              {
                name: "The Argumentative Indian",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/The%20Argumentative%20Indian.pdf",
              },
              
              {
                name: "Broken Images",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Broken%20Images.pdf",
              },
              
              {
                name: "Chandalika",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Kaliedoscope/Chandalika.pdf",
              },
            ],
          },
          {
            name: "Vistas",
            chapters: [
              {
                name: "Journey to the end of the Earth",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Vistas/Journey%20to%20the%20end%20of%20the%20Earth.pdf",
              },
              {
                name: "The Tiger King",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Vistas/The%20Tiger%20King.pdf",
              },
              {
                name: "The Enemy",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Vistas/The%20Enemy.pdf",
              },

              {
                name: "The Third Level",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Vistas/The%20Third%20Level.pdf",
              },
              {
                name: "Memories of Childhood",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Vistas/Memories%20of%20Childhood.pdf",
              },
              {
                name: "On The Face Of It",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Vistas/On%20The%20Face%20Of%20It.pdf",
              },
              {
                name: "levt1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/English/Vistas/levt1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Fine Art",
        books: [
          {
            name: "lefa1dd",
            chapters: [
              {
                name: "The Manuscript Painting Tradition",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/The%20Manuscript%20Painting%20Tradition.pdf",
              },
              {
                name: "The Bengal School and Cultural Nationalism",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/The%20Bengal%20School%20and%20Cultural%20Nationalism.pdf",
              },
              {
                name: "The Modern Indian Art",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/The%20Modern%20Indian%20Art.pdf",
              },
              {
                name: "The Mughal School of Miniature Painting",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/The%20Mughal%20School%20of%20Miniature%20Painting.pdf",
              },
              {
                name: "The Pahari Schools of Painting",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/The%20Pahari%20Schools%20of%20Painting.pdf",
              },
              {
                name: "The Deccani Schools of Painting",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/The%20Deccani%20Schools%20of%20Painting.pdf",
              },
              {
                name: "The Rajasthani Schools of Painting",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/The%20Rajasthani%20Schools%20of%20Painting.pdf",
              },
              {
                name: "lefa1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/lefa1ps.pdf",
              },
              {
                name: "The Living Art Traditions of India",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Fine%20Art/lefa1dd/The%20Living%20Art%20Traditions%20of%20India.pdf",
              },
            ],
          },
        
        ],
      },
      {
        name: "Geography",
        books: [
          {
            name: "Fundamentals of Human Geography",
            chapters: [
              {
                name: "The World Population-Distribution, Density and Growth",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/The%20World%20Population-Distribution,%20Density%20and%20Growth.pdf",
              },
              {
                name: "Human Development",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/Human%20Development.pdf",
              },
              {
                name: "Tertiary and Quaternary Activities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/Tertiary%20and%20Quaternary%20Activities.pdf",
              },
              {
                name: "International Trade",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/International%20Trade.pdf",
              },
              {
                name: "Human Geography Nature and Scope",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/Human%20Geography%20Nature%20and%20Scope.pdf",
              },
              {
                name: "Secondary Activities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/Secondary%20Activities.pdf",
              },
              {
                name: "Transport and Communication",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/Transport%20and%20Communication.pdf",
              },
              {
                name: "Primary Activities",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/Primary%20Activities.pdf",
              },
              {
                name: "legy1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/legy1a1.pdf",
              },
              {
                name: "legy1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Fundamentals%20of%20Human%20Geography/legy1ps.pdf",
              },
            ],
          },
          {
            name: "India -People And Economy",
            chapters: [
              {
                name: "Human Settlements",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/Human%20Settlements.pdf",
              },
              {
                name: "Planning and Sustainable Development in Indian Context",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/Planning%20and%20Sustainable%20Development%20in%20Indian%20Context.pdf",
              },
              {
                name: "International Trade",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/International%20Trade.pdf",
              },

              {
                name: "Transport and Communication",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/Transport%20and%20Communication.pdf",
              },
              
              {
                name: "Water Resources",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/Water%20Resources.pdf",
              },
              
              {
                name: "Population Distribution, Density, Growth and Composition",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/Population%20Distribution,%20Density,%20Growth%20and%20Composition.pdf",
              },
              
              {
                name: "Mineral and Energy Resources",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/Mineral%20and%20Energy%20Resources.pdf",
              },
              
              {
                name: "Land Resources and Agriculture",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/Land%20Resources%20and%20Agriculture.pdf",
              },
              
              {
                name: "legy2a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/legy2a1.pdf",
              },
              
              {
                name: "legy2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/legy2ps.pdf",
              },
              
              {
                name: "Geographical Perspective on Selected Issues and Problems",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/India%20-People%20And%20Economy/Geographical%20Perspective%20on%20Selected%20Issues%20and%20Problems.pdf",
              },
            ],
          },
          {
            name: "Practical Work in Geography Part II",
            chapters: [
              {
                name: "Data Processing",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Practical%20Work%20in%20Geography%20Part%20II/Data%20Processing.pdf",
              },
              {
                name: "Data Its Source and Compilation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Practical%20Work%20in%20Geography%20Part%20II/Data%20%20Its%20Source%20and%20Compilation.pdf",
              },
              {
                name: "legy3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Practical%20Work%20in%20Geography%20Part%20II/legy3ps.pdf",
              },

              {
                name: "Spatial Information Technology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Practical%20Work%20in%20Geography%20Part%20II/Spatial%20Information%20Technology.pdf",
              },
              {
                name: "Graphical Representation of Data",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Geography/Practical%20Work%20in%20Geography%20Part%20II/Graphical%20Representation%20of%20Data.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "History",
        books: [
          {
            name: "Themes in Indian History-I",
            chapters: [
              {
                name: "Kings, Farmers and Towns Early States and Economics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-I/Kings,%20Farmers%20and%20Towns%20Early%20States%20and%20Economics.pdf",
              },
              {
                name: "Bricks , Beads And Bones The Harappan Civilisation",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-I/Bricks%20,%20Beads%20And%20Bones%20The%20Harappan%20Civilisation.pdf",
              },
              {
                name: "lehs1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-I/lehs1ps.pdf",
              },
              {
                name: "Kinship, Caste And Class Early Societies",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-I/Kinship,%20Caste%20And%20Class%20Early%20Societies.pdf",
              },
              {
                name: "Thinkers, Beliefs and Buildings Cultural Developments",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-I/Thinkers,%20Beliefs%20and%20Buildings%20%20Cultural%20Developments.pdf",
              },
            ],
          },
          {
            name: "Themes in Indian History-II",
            chapters: [
              {
                name: "lehs2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-II/lehs2ps.pdf",
              },
              {
                name: "Through The Eyes Of Travellers Perceptions of Society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-II/Through%20The%20Eyes%20Of%20Travellers%20Perceptions%20of%20Society.pdf",
              },
              {
                name: "An Imperial Capital Vijayanagara",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-II/An%20Imperial%20Capital%20Vijayanagara%20%20.pdf",
              },

              {
                name: "Peasants, Zamindars and the State Agrarian Society and the Mughal Empire",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-II/Peasants,%20Zamindars%20and%20the%20State%20Agrarian%20Society%20and%20the%20Mughal%20Empire.pdf",
              },
              
              {
                name: "Bhakti Sufi Traditions Changes in Religious Beliefs and Devotional Texts",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-II/Bhakti%20%20Sufi%20Traditions%20Changes%20in%20Religious%20Beliefs%20and%20Devotional%20Texts.pdf",
              },
            ],
          },
          {
            name: "Themes in Indian History-III",
            chapters: [
              {
                name: "Rebels And the Raj",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/Rebels%20And%20the%20Raj.pdf",
              },
              {
                name: "Colonialism and The Countryside",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/Colonialism%20and%20The%20Countryside.pdf",
              },
              {
                name: "Framing the Constitution",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/Framing%20the%20Constitution.pdf",
              },

              {
                name: "lehs3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/lehs3ps.pdf",
              },
              {
                name: "Mahatma Gandhi and the national movement",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/Mahatma%20Gandhi%20and%20the%20national%20movement.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Home Science",
        books: [
          {
            name: "Human Ecology and Family Sciences Part I",
            chapters: [
              {
                name: "Food Processing and Technology",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Food%20Processing%20and%20Technology.pdf",
              },
              {
                name: "Clinical Nutrition and Dietetics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Clinical%20Nutrition%20and%20Dietetics.pdf",
              },
              {
                name: "Early Childhood Care and Education",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Early%20Childhood%20Care%20and%20Education.pdf",
              },
              {
                name: "Work, Livelihood and Career",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Work,%20Livelihood%20and%20Career.pdf",
              },
              {
                name: "Food Quality and Food Safety",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Food%20Quality%20and%20Food%20Safety.pdf",
              },
              {
                name: "Public Nutrition and Health",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Public%20Nutrition%20and%20Health.pdf",
              },
              {
                name: "Management of Support Services, Institutions and Programmes for Children, Youth and Elderly",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/Management%20of%20Support%20Services,%20Institutions%20and%20Programmes%20for%20Children,%20Youth%20and%20Elderly.pdf",
              },
              {
                name: "lehe1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20I/lehe1ps.pdf",
              },
            ],
          },
          {
            name: "Human Ecology and Family Sciences Part II",
            chapters: [
              {
                name: "Care and Maintenance of Fabrics in Institutions References",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Care%20and%20Maintenance%20of%20Fabrics%20in%20Institutions%20References.pdf",
              },
              {
                name: "Corporate Communication and Public Relations References",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Corporate%20Communication%20and%20Public%20Relations%20References.pdf",
              },
              {
                name: "Development Communication and Journalism",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Development%20Communication%20and%20Journalism.pdf",
              },

              {
                name: "Consumer Education and Protection References",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Consumer%20Education%20and%20Protection%20References.pdf",
              },
              
              {
                name: "Fashion Design and Merchandising",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Fashion%20Design%20and%20Merchandising.pdf",
              },
              {
                name: "Hospitality Management",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Hospitality%20Management.pdf",
              },
              {
                name: "lehe2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/lehe2ps.pdf",
              },
              {
                name: "Design for Fabric and Apparel",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Home%20Science/Human%20Ecology%20and%20Family%20Sciences%20Part%20II/Design%20for%20Fabric%20and%20Apparel.pdf",
              },
            ],
          },
          {
            name: "Themes in Indian History-III",
            chapters: [
              {
                name: "Rebels And the Raj",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/Rebels%20And%20the%20Raj.pdf",
              },
              {
                name: "Colonialism and The Countryside",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/Colonialism%20and%20The%20Countryside.pdf",
              },
              {
                name: "Framing the Constitution",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/Framing%20the%20Constitution.pdf",
              },

              {
                name: "lehs3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/lehs3ps.pdf",
              },
              {
                name: "Mahatma Gandhi and the national movement",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/History/Themes%20in%20Indian%20History-III/Mahatma%20Gandhi%20and%20the%20national%20movement.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Informatics Practices",
        books: [
          {
            name: "leip1dd",
            chapters: [
              {
                name: "Querying and SQL Functions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Informatics%20Practices/leip1dd/Querying%20and%20SQL%20Functions.pdf",
              },
              {
                name: "leip1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Informatics%20Practices/leip1dd/leip1ps.pdf",
              },
              {
                name: "Project Based Learning",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Informatics%20Practices/leip1dd/%20Project%20Based%20Learning.pdf",
              },
              {
                name: "Societal Impacts",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Informatics%20Practices/leip1dd/%20Societal%20Impacts.pdf",
              },
              {
                name: "Data Handling Using Pandas I",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Informatics%20Practices/leip1dd/Data%20Handling%20Using%20Pandas%20%20I.pdf",
              },
              {
                name: "Data Handling Using Pandas II",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Informatics%20Practices/leip1dd/Data%20Handling%20Using%20Pandas%20II.pdf",
              },
              {
                name: "Plotting Data using Matplotlib",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Informatics%20Practices/leip1dd/Plotting%20Data%20using%20Matplotlib.pdf",
              },
              {
                name: "Internet and Web",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Informatics%20Practices/leip1dd/Internet%20and%20Web.pdf",
              },
            ],
          },
  
        ],
      },
      {
        name: "Maths",
        books: [
          {
            name: "Mathematics Part-I",
            chapters: [
              {
                name: "Relations and Functions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/Relations%20and%20Functions.pdf",
              },
              {
                name: "Inverse Trigonometric Functions",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/Inverse%20Trigonometric%20Functions.pdf",
              },
              {
                name: "Matrices",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/Matrices.pdf",
              },
              {
                name: "lemh1a1",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/lemh1a1.pdf",
              },
              {
                name: "lemh1a2",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/lemh1a2.pdf",
              },
              {
                name: "lemh1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/lemh1an.pdf",
              },
              {
                name: "lemh1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/lemh1ps.pdf",
              },
              {
                name: "Determinants",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/Determinants.pdf",
              },
              {
                name: "Application of Derivatives",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/Application%20of%20Derivatives.pdf",
              },
              {
                name: "Continuity and Differentiability",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-I/Continuity%20and%20Differentiability.pdf",
              },
            ],
          },
          {
            name: "Mathematics Part-II",
            chapters: [
              {
                name: "Application of Integrals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-II/Application%20of%20Integrals.pdf",
              },
              {
                name: "Differential Equations",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-II/Differential%20Equations.pdf",
              },
              {
                name: "Integrals",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-II/Integrals.pdf",
              },

              {
                name: "Linear Programming",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-II/Linear%20Programming.pdf",
              },
              
              {
                name: "lemh2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-II/lemh2ps.pdf",
              },
              {
                name: "lemh2an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-II/lemh2an.pdf",
              },
              {
                name: "Probability",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-II/Probability.pdf",
              },
              {
                name: "Vector Algebra",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Maths/Mathematics%20Part-II/Vector%20Algebra.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Physics",
        books: [
          {
            name: "Physics Part-I",
            chapters: [
              {
                name: "Current Electricity",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/Current%20Electricity.pdf",
              },
              {
                name: "Moving Charges and Magnetism",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/Moving%20Charges%20and%20Magnetism.pdf",
              },
              {
                name: "Electrostatic Potential and Capacitance",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/Electrostatic%20Potential%20and%20Capacitance.pdf",
              },
              {
                name: "Electric Charges and Fields",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/Electric%20Charges%20and%20Fields.pdf",
              },
              {
                name: "leph1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/leph1an.pdf",
              },
              {
                name: "leph1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/leph1ps.pdf",
              },
              {
                name: "Electromagnetic Waves",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/Electromagnetic%20Waves.pdf",
              },
              {
                name: "Magnetism and Matter",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/Magnetism%20and%20Matter.pdf",
              },
              {
                name: "Electromagnetic Induction",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/Electromagnetic%20Induction.pdf",
              },
              {
                name: "Alternating Current",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-I/Alternating%20Current.pdf",
              },
            ],
          },
          {
            name: "Physics Part-II",
            chapters: [
              {
                name: "Dual Nature of Radiation and Matter",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-II/Dual%20Nature%20of%20Radiation%20and%20Matter.pdf",
              },
              {
                name: "Atoms",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-II/Atoms.pdf",
              },
              {
                name: "Wave Optics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-II/Wave%20Optics.pdf",
              },

              {
                name: "Ray Optics and Optical Instruments",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-II/Ray%20Optics%20and%20Optical%20Instruments.pdf",
              },
              
              {
                name: "Semiconductor Electronics Materials, Devices and Simple Circuits",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-II/Semiconductor%20Electronics%20Materials,%20Devices%20and%20Simple%20Circuits%20.pdf",
              },
              {
                name: "Nuclei",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-II/Nuclei.pdf",
              },
              {
                name: "leph2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Physics/Physics%20Part-II/leph2ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Political science",
        books: [
          {
            name: "Contemporary World Politics",
            chapters: [
              {
                name: "leps1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Contemporary%20World%20Politics/leps1ps.pdf",
              },
              {
                name: "The End Of Bipolarity",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Contemporary%20World%20Politics/The%20End%20Of%20Bipolarity.pdf",
              },
              {
                name: "Contemporary South Asia",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Contemporary%20World%20Politics/Contemporary%20South%20Asia.pdf",
              },
              {
                name: "Contemporary Centres of Power",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Contemporary%20World%20Politics/Contemporary%20Centres%20of%20Power.pdf",
              },
              {
                name: "International Organisations",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Contemporary%20World%20Politics/International%20Organisations.pdf",
              },
              {
                name: "Security in the Contemporary World",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Contemporary%20World%20Politics/Security%20in%20the%20Contemporary%20World.pdf",
              },
              {
                name: "Environment and Natural Resources",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Contemporary%20World%20Politics/Environment%20and%20Natural%20Resources.pdf",
              },
              {
                name: "leps107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Contemporary%20World%20Politics/leps107.pdf",
              },
            ],
          },
          {
            name: "Politics in India Since Independence",
            chapters: [
              {
                name: "leps2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/leps2ps.pdf",
              },
              {
                name: "Politics Of Planned Development",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/Politics%20Of%20Planned%20Development.pdf",
              },
              {
                name: "Era of one party dominance",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/Era%20of%20one%20party%20dominance.pdf",
              },

              {
                name: "Challenges to and Restoration of the Congress System",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/Challenges%20to%20and%20Restoration%20of%20the%20Congress%20System.pdf",
              },
              
              {
                name: "The Crisis Of Democratic Order",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/The%20Crisis%20Of%20Democratic%20Order.pdf",
              },
              {
                name: "Regional Aspiration",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/Regional%20Aspiration.pdf",
              },
              {
                name: "Indias External Relations",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/Indias%20External%20Relations.pdf",
              },
              {
                name: "Recent Developments In Indian Politics",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/Recent%20Developments%20In%20Indian%20Politics.pdf",
              },
              {
                name: "leps201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Political%20science/Politics%20in%20India%20Since%20Independence/leps201.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Psychology",
        books: [
          {
            name: "lepy1dd",
            chapters: [
              {
                name: "Variations in Psychological Attributes",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/Variations%20in%20Psychological%20Attributes.pdf",
              },
              {
                name: "Self and Personality",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/Self%20and%20Personality.pdf",
              },
              {
                name: "lepy1gl",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/lepy1gl.pdf",
              },
              {
                name: "Social Influence and Group Processes",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/Social%20Influence%20and%20Group%20Processes.pdf",
              },
              {
                name: "Therapeutic Approaches",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/Therapeutic%20Approaches.pdf",
              },
              {
                name: "Psychological Disorders",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/Psychological%20Disorders.pdf",
              },
              {
                name: "Attitude and Social Cognition",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/Attitude%20and%20Social%20Cognition.pdf",
              },
              {
                name: "Meeting Life Challenges",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/Meeting%20Life%20Challenges.pdf",
              },
              {
                name: "lepy1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Psychology/lepy1dd/lepy1ps.pdf",
              },
            ],
          },
  
        ],
      },
      {
        name: "Sociology",
        books: [
          {
            name: "Indian Society",
            chapters: [
              {
                name: "Introducing Indian Society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Indian%20Society/Introducing%20Indian%20Society.pdf",
              },
              {
                name: "Social Institutions: Continuity and Change",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Indian%20Society/Social%20Institutions:%20Continuity%20and%20Change.pdf",
              },
              {
                name: "The Demographic Structure of the Indian Society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Indian%20Society/The%20Demographic%20Structure%20of%20the%20Indian%20Society.pdf",
              },
              {
                name: "Suggestions for Project Work",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Indian%20Society/Suggestions%20for%20Project%20Work.pdf",
              },
              {
                name: "lesy1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Indian%20Society/lesy1ps.pdf",
              },
              {
                name: "The Market as a Social Institution",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Indian%20Society/The%20Market%20as%20a%20Social%20Institution.pdf",
              },
              {
                name: "The Challenges of Cultural Diversity",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Indian%20Society/The%20Challenges%20of%20Cultural%20Diversity.pdf",
              },
              {
                name: "Patterns of Social Inequality and Exclusion",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Indian%20Society/Patterns%20of%20Social%20Inequality%20and%20Exclusion.pdf",
              },
            ],
          },
          {
            name: "Social Change and Development in India",
            chapters: [
              {
                name: "The Constitution and Social Change",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/The%20Constitution%20and%20Social%20Change.pdf",
              },
              {
                name: "Change and Development in Industrial Society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/Change%20and%20Development%20in%20Industrial%20Society.pdf",
              },
              {
                name: "Cultural Change",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/Cultural%20Change.pdf",
              },

              {
                name: "Structural Change",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/Structural%20Change.pdf",
              },
              
              {
                name: "Change and Development in Rural Society",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/Change%20and%20Development%20in%20Rural%20Society.pdf",
              },
              {
                name: "lesy2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/lesy2ps.pdf",
              },
              {
                name: "Globalisation and Social Change",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/Globalisation%20and%20Social%20Change.pdf",
              },
              {
                name: "Mass Media and Communications",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/Mass%20Media%20and%20Communications.pdf",
              },
              {
                name: "Social Movements",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/12th/Sociology/Social%20Change%20and%20Development%20in%20India/Social%20Movements.pdf",
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
