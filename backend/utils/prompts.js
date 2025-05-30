export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:

[
  {
    "question": "Question here?",
    "answer": "Answer here and 3 line answer."
  }
]

Important: DO NOT add any extra text. Only return valid JSON.
`;
export const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- If the explanation includes code examples, format them using proper Markdown code blocks using triple backticks and a language tag, like:
  \`\`\`javascript
  const x = 10;
  \`\`\`
- Keep the formatting clean and Markdown-compatible.
- Use **real newlines** inside the explanation. Do NOT escape them as \\n.
- Ensure the JSON is valid (double quotes, no trailing commas).

Return only the following JSON and nothing else:

{
  "title": "Short title here",
  "explanation": "Full markdown explanation here with real newlines"
}

Important:
- No explanation or notes outside the JSON.
- The output **must** be valid JSON and Markdown-compatible.
`;

