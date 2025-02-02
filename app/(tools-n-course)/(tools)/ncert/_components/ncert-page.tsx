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
