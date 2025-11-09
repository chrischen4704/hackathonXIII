//Accessibility
export type AccessibilitySetting = {
    fontSize: "sm" | "base" | "lg";
    isDyslexic: boolean;
    isHighContrast: boolean;
};

export type ApiResponse = {
    summary: string;
    keyTerms: { term: string; definition: string }[];
    simplified: string;
};

export type ProcessingData = {
    id: string; //Unique id for each data, Think about how smth like Data.Now(), Data.Then()
    originalText: string;
    DatafromAi: ApiResponse | null; //stays null until the ai gives result
    isProcessing: boolean;
};

export type Insights = {
    summaries: string[];
    allKeyTerms: Map<string, string>;
};
