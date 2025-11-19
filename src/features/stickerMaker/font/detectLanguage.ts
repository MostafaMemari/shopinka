export const detectLanguage = (text: string): 'persian' | 'english' | 'mixed' => {
  if (!text.trim()) return 'persian';

  const persianRegex = /[\u0600-\u06FF]/;
  const latinRegex = /[a-zA-Z]/;

  const hasPersian = persianRegex.test(text);
  const hasLatin = latinRegex.test(text);

  if (hasPersian && !hasLatin) return 'persian';
  if (!hasPersian && hasLatin) return 'english';
  return 'mixed';
};
