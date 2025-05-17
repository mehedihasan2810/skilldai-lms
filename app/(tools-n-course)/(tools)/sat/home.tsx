"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateUUID } from "@/lib/utils";

// Embedded JSON data
const satData = {
  Sections: [
    {
      Section: "Reading and Writing",
      Domains: [
        {
          Domain: "Craft and Structure",
          Subtopics: [
            {
              Subtopic: "Words in Context",
              Subdivisions: [
                "Vocabulary in prose and poetry",
                "Interpreting nuanced meanings",
                "Understanding context clues",
              ],
            },
            {
              Subtopic: "Text Structure and Purpose",
              Subdivisions: [
                "Identifying main ideas and themes",
                "Analyzing argumentative structures",
                "Understanding author’s intent",
              ],
            },
            {
              Subtopic: "Cross-Text Connections",
              Subdivisions: [
                "Comparing and contrasting arguments",
                "Identifying complementary or contradictory ideas",
                "Synthesizing information across texts",
              ],
            },
          ],
        },
        {
          Domain: "Information and Ideas",
          Subtopics: [
            {
              Subtopic: "Central Ideas and Details",
              Subdivisions: [
                "Summarizing key points",
                "Locating supporting details",
                "Distinguishing primary ideas",
              ],
            },
            {
              Subtopic: "Command of Evidence",
              Subdivisions: [
                "Interpreting tables, charts, and graphs",
                "Linking text to graphic data",
                "Evaluating evidence strength",
              ],
            },
            {
              Subtopic: "Inferences",
              Subdivisions: [
                "Drawing conclusions from implied information",
                "Predicting outcomes based on text",
                "Filling in missing information",
              ],
            },
          ],
        },
        {
          Domain: "Standard English Conventions",
          Subtopics: [
            {
              Subtopic: "Sentence Structure",
              Subdivisions: [
                "Independent and dependent clauses",
                "Conjunctions and transitions",
                "Sentence fragments and run-ons",
              ],
            },
            {
              Subtopic: "Grammar and Usage",
              Subdivisions: [
                "Subject-verb agreement",
                "Pronoun-antecedent agreement",
                "Verb tense consistency",
              ],
            },
            {
              Subtopic: "Punctuation",
              Subdivisions: [
                "Commas, semicolons, and colons",
                "Apostrophes for possession and contractions",
                "Parentheses and dashes",
              ],
            },
          ],
        },
        {
          Domain: "Expression of Ideas",
          Subtopics: [
            {
              Subtopic: "Rhetorical Synthesis",
              Subdivisions: [
                "Enhancing tone and style",
                "Improving logical flow",
                "Selecting precise vocabulary",
              ],
            },
            {
              Subtopic: "Transitions",
              Subdivisions: [
                "Logical connectors",
                "Sequential transitions",
                "Cause-and-effect relationships",
              ],
            },
            {
              Subtopic: "Organization",
              Subdivisions: [
                "Rearranging sentences or paragraphs",
                "Adding introductory or concluding sentences",
                "Deleting irrelevant information",
              ],
            },
          ],
        },
      ],
    },
    {
      Section: "Math",
      Domains: [
        {
          Domain: "Algebra",
          Subtopics: [
            {
              Subtopic: "Linear Equations and Inequalities",
              Subdivisions: [
                "Solving single-variable equations",
                "Systems of linear equations",
                "Absolute value equations and inequalities",
              ],
            },
            {
              Subtopic: "Linear Functions",
              Subdivisions: [
                "Interpreting slopes and intercepts",
                "Graphing linear functions",
                "Translating word problems to equations",
              ],
            },
            {
              Subtopic: "Manipulating Expressions",
              Subdivisions: [
                "Factoring and expanding",
                "Combining like terms",
                "Rational expressions",
              ],
            },
          ],
        },
        {
          Domain: "Advanced Math",
          Subtopics: [
            {
              Subtopic: "Quadratic Equations",
              Subdivisions: [
                "Factoring quadratics",
                "Quadratic formula",
                "Graphing parabolas",
              ],
            },
            {
              Subtopic: "Polynomial and Rational Functions",
              Subdivisions: [
                "Polynomial division",
                "Zeros of polynomials",
                "Rational function behavior",
              ],
            },
            {
              Subtopic: "Exponential Functions",
              Subdivisions: [
                "Exponential equations",
                "Growth and decay models",
                "Graphing exponentials",
              ],
            },
          ],
        },
        {
          Domain: "Problem Solving and Data Analysis",
          Subtopics: [
            {
              Subtopic: "Ratios, Rates, and Proportions",
              Subdivisions: [
                "Setting up proportions",
                "Unit rate problems",
                "Scaling and similarity",
              ],
            },
            {
              Subtopic: "Data Interpretation",
              Subdivisions: [
                "Reading bar graphs, line graphs, and scatterplots",
                "Measures of center and spread",
                "Two-way tables",
              ],
            },
            {
              Subtopic: "Probability and Statistics",
              Subdivisions: [
                "Basic probability rules",
                "Conditional probability",
                "Mean, median, mode, and standard deviation",
              ],
            },
          ],
        },
        {
          Domain: "Geometry and Trigonometry",
          Subtopics: [
            {
              Subtopic: "Lines, Angles, and Triangles",
              Subdivisions: [
                "Angle relationships",
                "Triangle congruence and similarity",
                "Pythagorean theorem",
              ],
            },
            {
              Subtopic: "Circles",
              Subdivisions: [
                "Arc length and sector area",
                "Central and inscribed angles",
                "Circle equations",
              ],
            },
            {
              Subtopic: "Trigonometry",
              Subdivisions: [
                "Sine, cosine, and tangent",
                "Unit circle",
                "Trigonometric identities",
              ],
            },
            {
              Subtopic: "Area and Volume",
              Subdivisions: [
                "Area of polygons",
                "Volume of prisms, cylinders, and cones",
                "Surface area",
              ],
            },
          ],
        },
      ],
    },
    {
      Section: "Optional Essay",
      Domains: [
        {
          Domain: "Essay Analysis",
          Subtopics: [
            {
              Subtopic: "Reading",
              Subdivisions: [
                "Identifying central arguments",
                "Understanding evidence use",
                "Recognizing author’s purpose",
              ],
            },
            {
              Subtopic: "Analysis",
              Subdivisions: [
                "Evaluating evidence effectiveness",
                "Assessing logical reasoning",
                "Analyzing rhetorical devices",
              ],
            },
            {
              Subtopic: "Writing",
              Subdivisions: [
                "Structuring the essay logically",
                "Using precise vocabulary",
                "Maintaining grammatical accuracy",
              ],
            },
          ],
        },
      ],
    },
  ],
};

interface Section {
  Section: string;
  Domains: Domain[];
}

interface Domain {
  Domain: string;
  Subtopics: Subtopic[];
}

interface Subtopic {
  Subtopic: string;
  Subdivisions: string[];
}

interface Homeprops {
  userEmail: string;
  userId: string;
}

export default function Home({ userEmail, userId }: Homeprops) {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [selectedSubdivision, setSelectedSubdivision] = useState<string>("");
  const [isNavigating, setIsNavigating] = useState(false);

  console.log('Home props:', { userEmail, userId }); // Debug props

  const sections = satData.Sections;

  const handleNavigate = useCallback(() => {
    if (isNavigating) {
      console.log('Navigation already in progress'); // Debug
      return;
    }
    if (selectedDomain && selectedSubtopic) {
      setIsNavigating(true);
      const chatId = generateUUID();
      const url = `/sat/topic?userEmail=${encodeURIComponent(userEmail)}&userId=${encodeURIComponent(userId)}&chatId=${encodeURIComponent(chatId)}&section=${encodeURIComponent(selectedSection)}&domain=${encodeURIComponent(selectedDomain)}&subtopic=${encodeURIComponent(selectedSubtopic)}&subsections=${encodeURIComponent(selectedSubdivision || "")}`;
      console.log('Navigating to:', url); // Debug
      router.push(url);
      setTimeout(() => setIsNavigating(false), 1000); // Reset navigation lock
    } else {
      console.log('Navigation blocked: missing domain or subtopic', { selectedDomain, selectedSubtopic }); // Debug
    }
  }, [selectedSection, selectedDomain, selectedSubtopic, selectedSubdivision, userEmail, userId, router]);

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    setSelectedDomain("");
    setSelectedSubtopic("");
    setSelectedSubdivision("");
  };

  const handleDomainClick = (domain: string) => {
    setSelectedDomain(domain);
    setSelectedSubtopic("");
    setSelectedSubdivision("");
  };

  const handleSubtopicClick = (subtopic: string) => {
    setSelectedSubtopic(subtopic);
    setSelectedSubdivision("");
  };

  const handleSubdivisionClick = (subdivision: string) => {
    setSelectedSubdivision(subdivision);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Select SAT Topic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sections */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Sections</h2>
            <div className="flex flex-col gap-2">
              {sections.map((section) => (
                <Button
                  key={section.Section}
                  onClick={() => handleSectionClick(section.Section)}
                  variant={selectedSection === section.Section ? "default" : "outline"}
                  className="w-full text-left justify-start"
                >
                  {section.Section}
                </Button>
              ))}
            </div>
          </div>

          {/* Domains */}
          {selectedSection && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Domains</h2>
              <div className="flex flex-col gap-2">
                {sections
                  .find((s) => s.Section === selectedSection)
                  ?.Domains.map((domain) => (
                    <Button
                      key={domain.Domain}
                      onClick={() => handleDomainClick(domain.Domain)}
                      variant={selectedDomain === domain.Domain ? "default" : "outline"}
                      className="w-full text-left justify-start"
                    >
                      {domain.Domain}
                    </Button>
                  ))}
              </div>
            </div>
          )}

          {/* Subtopics */}
          {selectedDomain && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Subtopics</h2>
              <div className="flex flex-col gap-2">
                {sections
                  .find((s) => s.Section === selectedSection)
                  ?.Domains.find((d) => d.Domain === selectedDomain)
                  ?.Subtopics.map((subtopic) => (
                    <Button
                      key={subtopic.Subtopic}
                      onClick={() => handleSubtopicClick(subtopic.Subtopic)}
                      variant={selectedSubtopic === subtopic.Subtopic ? "default" : "outline"}
                      className="w-full text-left justify-start"
                    >
                      {subtopic.Subtopic}
                    </Button>
                  ))}
              </div>
            </div>
          )}

          {/* Subdivisions */}
          {selectedSubtopic && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Subdivisions (Optional)</h2>
              <div className="flex flex-col gap-2">
                {sections
                  .find((s) => s.Section === selectedSection)
                  ?.Domains.find((d) => d.Domain === selectedDomain)
                  ?.Subtopics.find((t) => t.Subtopic === selectedSubtopic)
                  ?.Subdivisions.map((subdivision) => (
                    <Button
                      key={subdivision}
                      onClick={() => handleSubdivisionClick(subdivision)}
                      variant={selectedSubdivision === subdivision ? "default" : "outline"}
                      className="w-full text-left justify-start"
                    >
                      {subdivision}
                    </Button>
                  ))}
              </div>
            </div>
          )}

          {/* Navigate Button */}
          {selectedDomain && selectedSubtopic && (
            <Button
              onClick={() => {
                console.log('Navigate button clicked'); // Debug
                handleNavigate();
              }}
              disabled={isNavigating}
              className="w-full mt-4"
            >
              View Topic Details
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}