/**
 * Rubric for NOTAM Precision Rate:
 * Criteria 1: Proper decoding of Q/A/B/C/D codes (50%)
 * Criteria 2: Correct way of delivering NOTAM contractions (E codes) (50%)
 * 
 * Classifications:
 * 100% - 91%: Precise
 * 90% - 75%: Acceptable
 * 74% - 0%: For Improvement
 */

export type ScoringResult = {
  scoreQAB: number; // 0 to 50
  scoreE: number;   // 0 to 50
  totalScore: number; // 0 to 100
  classification: "Precise" | "Acceptable" | "For Improvement";
};

/**
 * Normalizes text for comparison (removes punctuation, extra spaces, converts to lowercase)
 */
function normalizeText(text: string): string[] {
  if (!text) return [];
  // Remove punctuation and split into words by any whitespace
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()|]/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

/**
 * Calculates a basic overlap percentage of expected words found in the user's answer.
 * In a production app, this would use NLP or an LLM to judge semantic meaning.
 * For this template, it uses a word matching algorithm.
 */
function calculateMatchPercentage(userInput: string, expectedText: string): number {
  const expectedWords = normalizeText(expectedText);
  const userWords = normalizeText(userInput);

  if (expectedWords.length === 0) return 100; // Nothing expected means perfect match
  if (userWords.length === 0) return 0; // Empty answer means 0

  let matchCount = 0;
  // A simple algorithm: count how many of the expected words appear in the user's input.
  // We make a copy of user words so we don't match the same word multiple times if it appears once.
  const userWordsCopy = [...userWords];
  
  for (const word of expectedWords) {
    const index = userWordsCopy.indexOf(word);
    if (index !== -1) {
      matchCount++;
      userWordsCopy.splice(index, 1); // Remove matched word
    }
  }

  return (matchCount / expectedWords.length) * 100;
}

export function calculatePrecision(
  userAnswer: string,
  expectedQAB: string,
  expectedE: string
): ScoringResult {
  // 1. Calculate percentage match for each part (0 to 100)
  const percentQAB = calculateMatchPercentage(userAnswer, expectedQAB);
  const percentE = calculateMatchPercentage(userAnswer, expectedE);

  // 2. Weight them 50/50
  const scoreQAB = (percentQAB * 0.5);
  const scoreE = (percentE * 0.5);
  const totalScore = Math.round(scoreQAB + scoreE);

  // 3. Classification
  let classification: ScoringResult["classification"] = "For Improvement";
  if (totalScore >= 91) {
    classification = "Precise";
  } else if (totalScore >= 75) {
    classification = "Acceptable";
  }

  return {
    scoreQAB: Math.round(scoreQAB),
    scoreE: Math.round(scoreE),
    totalScore,
    classification,
  };
}
