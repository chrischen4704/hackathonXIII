import { useState, useCallback, useEffect } from 'react'; 
import { ProcessingData, Insights } from '../2/types';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { analyzeLecture } from '../2/service';


export function useLectureProcessor() {
  const [isListening, setIsListening] = useState(false);
  const [processingData, setProcessingData] = useState<ProcessingData[]>([]);
  const [insights, setInsights] = useState<Insights>({
    summaries: [],
    allKeyTerms: new Map(),
  });

  const {
    transcript,
    finalTranscript,
    resetTranscript,
  } = useSpeechRecognition();

  const newNotes = useCallback((text: string) => {
    if (!text.trim()) return;

    const newN: ProcessingData = {
      id: `notes-${Date.now()}`,
      originalText: text,
      DatafromAi: null,
      isProcessing: true,
    };

    setProcessingData(prev => [...prev, newN]);

    const runAnalysis = async () => {
      const DatafromAi = await analyzeLecture(text);

      setProcessingData(prev => prev.map(notes => notes.id === newN.id ?
        { ...notes, DatafromAi, isProcessing: false } : notes
      ));

      setInsights(prev => {
        const newTerms = new Map(prev.allKeyTerms);
        DatafromAi.keyTerms.forEach(term => {
          if (!newTerms.has(term.term.toLowerCase())) {
            newTerms.set(term.term.toLowerCase(), term.definition);
          }
        });
        return { summaries: [...prev.summaries, DatafromAi.summary], allKeyTerms: newTerms };
      });
    };

    runAnalysis();
  }, []); 


  useEffect(() => {
    if (finalTranscript) {
      newNotes(finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript, resetTranscript, newNotes]); 

  const startLecture = useCallback(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Sorry, your browser doesn't support Speech Recognition");
      return;
    }

    setProcessingData([]); 
    setInsights({ summaries: [], allKeyTerms: new Map() });
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
    setIsListening(true);
  }, [resetTranscript]);


  const stopLecture = useCallback(() => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    if (transcript) {
      newNotes(transcript);
    }

    resetTranscript();
  }, [transcript, resetTranscript, newNotes]);


  return {
    isListening,
    processingData,
    insights,
    startLecture,
    stopLecture,
    transcript,
  };
}