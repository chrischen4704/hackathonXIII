import React, { useEffect, useRef, useState } from "react";

/* --- Type definitions --- */
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
}
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}
interface LiveCaptionsProps {
  isActive: boolean;
  onTranscript?: (text: string) => void;
  dyslexicFontActive?: boolean;
}

export const LiveCaptions: React.FC<LiveCaptionsProps> = ({ isActive, onTranscript, dyslexicFontActive = false }) => {
  const [transcript, setTranscript] = useState("");

  // references for state tracking
  const recogRef = useRef<SpeechRecognition | null>(null);
  const runningRef = useRef(false);
  const activeRef = useRef(isActive);

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  /* ---------- Initialize once ---------- */
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SR) {
      console.warn("âš ï¸ Web Speech API not supported (use Chrome or Edge).");
      return;
    }

    const recog: SpeechRecognition = new SR();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = "en-US";

    /* ---------- Handle new speech results ---------- */
    recog.onresult = (event: SpeechRecognitionEvent) => {
      let fullText = "";
      let interimText = "";

      // Build transcript from ALL results
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          fullText += result[0].transcript + " ";
        } else {
          interimText += result[0].transcript;
        }
      }

      // Set the complete transcript
      setTranscript((fullText + interimText).trim() + (interimText ? " (interim)" : ""));
      if (onTranscript) onTranscript((fullText + interimText).trim());
    };

    /* ---------- Error handling ---------- */
    recog.onerror = (e: any) => {
      if (e.error === "not-allowed") {
        console.error("âŒ Microphone permission denied.");
      } else if (e.error !== "aborted") {
        console.error("Speech recognition error:", e.error);
      }
    };

    /* ---------- Auto-restart after silence ---------- */
    recog.onend = () => {
      runningRef.current = false;
      if (activeRef.current) {
        setTimeout(() => {
          try {
            recog.start();
            runningRef.current = true;
          } catch (err) {
            console.debug("Restart failed (will retry):", err);
          }
        }, 200);
      }
    };

    recogRef.current = recog;

    /* ---------- Cleanup on unmount ---------- */
    return () => {
      try {
        recog.onresult = null;
        recog.onerror = null;
        recog.onend = null;
        recog.abort();
        recog.stop();
      } catch {}
      recogRef.current = null;
      runningRef.current = false;
    };
  }, []);

  /* ---------- React to start/stop toggle ---------- */
  useEffect(() => {
    const recog = recogRef.current;
    if (!recog) return;

    if (isActive) {
      // start listening
      setTranscript("");
      if (!runningRef.current) {
        try {
          recog.start();
          runningRef.current = true;
          console.log("ðŸŽ™ï¸ Live CC started");
        } catch (err) {
          console.debug("Initial start failed:", err);
        }
      }
    } else {
      // stop listening
      try {
        recog.abort();
        recog.stop();
      } catch {}
      runningRef.current = false;
      setTranscript("");
      console.log("ðŸ›‘ Live CC stopped");
    }
  }, [isActive]);

  /* ---------- Render captions ---------- */
  return (
    <div className="bg-neutral-900 text-white p-4 rounded-lg mt-4 max-h-60 overflow-y-auto transition-all duration-100">
      <h2 className="text-lg font-semibold mb-2">Live Captions</h2>
      <p 
        className={`whitespace-pre-wrap text-gray-300 ${dyslexicFontActive ? 'dyslexic-font-active' : ''}`}
        style={{
          fontFamily: dyslexicFontActive ? '"OpenDyslexic", sans-serif' : undefined
        }}
      >
        {transcript
          ? transcript.replace(/ \(interim\)$/g, "")
          : "Waiting for speech..."}
      </p>
    </div>
  );
};