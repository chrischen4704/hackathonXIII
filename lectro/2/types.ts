//handling the types

//accessibility
export type AccessibilitySetting = {
  fontSize : 'sm' | 'base' | 'lg';
  isDyslexicFont: boolean;
  isHighContrast: boolean;
}

//handles whatever the api returns
export type AiResponse = {
  summary: string;
  keyTerms: {term: string, definition: string}[];
  simplified: string;
}