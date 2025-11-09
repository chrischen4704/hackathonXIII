import React, { useEffect, useRef, useState } from "react";

interface LiveAINotesProps {
  isActive: boolean;
  transcript: string;
}

export const LiveAINotes: React.FC<LiveAINotesProps> = ({ isActive, transcript }) => {
  const [notes, setNotes] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const transcriptBuffer = useRef("");
  const lastProcessedLength = useRef(0);

  // Only accumulate NEW parts of the transcript
  useEffect(() => {
    if (isActive && transcript) {
      // Only add if transcript has grown
      if (transcript.length > lastProcessedLength.current) {
        const newText = transcript.slice(lastProcessedLength.current);
        transcriptBuffer.current += " " + newText;
        lastProcessedLength.current = transcript.length;
        console.log("📝 Buffer updated, length:", transcriptBuffer.current.length);
      }
    }
  }, [transcript, isActive]);

  // Reset when stopped or started
  useEffect(() => {
    if (!isActive) {
      transcriptBuffer.current = "";
      lastProcessedLength.current = 0;
      setNotes([]);
      setIsProcessing(false);
      console.log("🔄 AI Notes reset");
    } else {
      // Fresh start
      transcriptBuffer.current = "";
      lastProcessedLength.current = 0;
      setNotes([]);
      setIsProcessing(false);
      console.log("▶️ AI Notes activated");
    }
  }, [isActive]);

  // Periodically summarize buffer
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(async () => {
      const textToSummarize = transcriptBuffer.current.trim();
      
      // Skip if too short or already processing
      if (!textToSummarize || textToSummarize.length < 10 || isProcessing) {
        console.log("⏭️ Skipping summarization:", {
          length: textToSummarize.length,
          isProcessing
        });
        return;
      }

      console.log("🔄 Starting summarization, text length:", textToSummarize.length);
      setIsProcessing(true);

      try {
        const response = await fetch("http://localhost:3001/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript: textToSummarize }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Received from backend:", data);

        // Parse the notes string into an array
        if (data.notes && typeof data.notes === 'string') {
          // Split by newlines and clean up
          const parsedNotes = data.notes
            .split('\n')
            .map((line: string) => line.trim())
            .filter((line: string) => {
              // Remove empty lines, separators, and very short lines
              return line.length > 0 && line !== '---' && line.length > 3;
            })
            .map((line: string) => {
              // Clean up bullet points if they exist
              return line.replace(/^[•\-\*]\s*/, '');
            });
          
          if (parsedNotes.length > 0) {
            setNotes((prev) => [...prev, ...parsedNotes]);
            console.log("📋 Added", parsedNotes.length, "new notes");
          }
        }

        // Clear the buffer after successful summarization
        transcriptBuffer.current = "";
        console.log("🧹 Buffer cleared");
        
      } catch (error) {
        console.error("❌ AI summarization error:", error);
      } finally {
        setIsProcessing(false);
      }
    }, 60000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [isActive, isProcessing]);

  return (
    <div className="bg-neutral-900 text-white p-4 rounded-lg mt-4 max-h-60 overflow-y-auto transition-all duration-100">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">AI Notes</h2>
        {isProcessing && (
          <span className="text-xs text-blue-400 animate-pulse">Processing...</span>
        )}
      </div>
      {notes.length > 0 ? (
        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          {notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">
          {isProcessing 
            ? "Generating notes..." 
            : "AI is listening and preparing notes..."}
        </p>
      )}
    </div>
  );
};