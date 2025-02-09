import { ITextAnalizerResponse } from 'src/text/interfaces';

export const textAnalyzer = (text: string): ITextAnalizerResponse => {
  const normalizedText = text.toLowerCase().replace(/[^a-z\s]/g, '');

  // Split words, sentences, and paragraphs
  const words = normalizedText.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const paragraphs = text.split(/\n+/).filter(Boolean);

  // Find the longest word
  const longestWord = words.reduce(
    (longest, word) => (word.length > longest.length ? word : longest),
    '',
  );

  return {
    wordCount: words.length,
    charCount: normalizedText.replace(/\s/g, '').length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    longestWord: longestWord,
  };
};
