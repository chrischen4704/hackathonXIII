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
}

export const LiveCaptions: React.FC<LiveCaptionsProps> = ({ isActive, onTranscript }) => {
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  // references for state tracking
  const recogRef = useRef<SpeechRecognition | null>(null);
  const runningRef = useRef(false);
  const activeRef = useRef(isActive);
  const finalTranscriptRef = useRef(""); // Store accumulated final results

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  /* ---------- Initialize once ---------- */
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SR) {
      console.warn("⚠️ Web Speech API not supported (use Chrome or Edge).");
      return;
    }

    const recog: SpeechRecognition = new SR();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = "en-US";

    /* ---------- Handle new speech results ---------- */
    recog.onresult = (event: SpeechRecognitionEvent) => {
      let interimText = "";

      // Process only NEW results starting from resultIndex
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          // Add final result to accumulated transcript
          finalTranscriptRef.current += text + " ";
          console.log("✅ Final:", text);
        } else {
          // Show interim results temporarily
          interimText += text;
        }
      }

      // Update display with accumulated final + current interim
      const fullText = finalTranscriptRef.current + interimText;
      setTranscript(fullText.trim());
      setInterimTranscript(interimText);

      // Send only final accumulated text to parent
      if (onTranscript) {
        onTranscript(finalTranscriptRef.current.trim());
      }
    };

    /* ---------- Error handling ---------- */
    recog.onerror = (e: any) => {
      if (e.error === "not-allowed") {
        console.error("❌ Microphone permission denied.");
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
  }, [onTranscript]);

  /* ---------- React to start/stop toggle ---------- */
  useEffect(() => {
    const recog = recogRef.current;
    if (!recog) return;

    if (isActive) {
      // start listening
      setTranscript("");
      setInterimTranscript("");
      finalTranscriptRef.current = ""; // Reset accumulated transcript
      if (!runningRef.current) {
        try {
          recog.start();
          runningRef.current = true;
          console.log("🎙️ Live CC started");
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
      setInterimTranscript("");
      finalTranscriptRef.current = "";
      console.log("🛑 Live CC stopped");
    }
  }, [isActive]);

  /* ---------- Render captions ---------- */
  return (
    <div className="bg-neutral-900 text-white p-4 rounded-lg mt-4 max-h-60 overflow-y-auto transition-all duration-100">
      <h2 className="text-lg font-semibold mb-2">Live Captions</h2>
      <p className="whitespace-pre-wrap text-gray-300">
        {transcript || "Waiting for speech..."}
        {interimTranscript && (
          <span className="text-gray-500 italic"> {interimTranscript}</span>
        )}
      </p>
    </div>
  );
};