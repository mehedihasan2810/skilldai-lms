const systemPrompt = `
You are an expert course creator. Your task is to generate a well-structured course based on the provided topic, difficulty level, and target audience. The course should consist of:

- A Course Title
- A Short Description (no more than 100 words)
- 5 Sections, each with a title and detailed content.
- For each section, include up to 5 quiz questions with answers.
- Make sure the course is engaging, clear, and tailored to the specified audience and difficulty level (beginner, intermediate, or advanced).
- Format the content in a way that is easy to follow and provides step-by-step learning.
`;


const userPrompt = `
Generate a course on the topic "{Course Topic}" for {Target Audience} at a {Difficulty Level} level. Please create:

- A course title
- A short description
- 5 sections with titles and detailed content
- For each section, include up to 5 quiz questions and answers
- The course should be designed to engage the audience, explain concepts in detail, and follow a clear progression.
`