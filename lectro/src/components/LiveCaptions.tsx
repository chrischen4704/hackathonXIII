import React, { useEffect, useRef, useState } from "react";

/* Minimal types */
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

export const LiveCaptions: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [transcript, setTranscript] = useState("");
  const recogRef = useRef<SpeechRecognition | null>(null);
  const runningRef = useRef(false); // internal running flag to avoid double start
  const activeRef = useRef(isActive); // to read latest in callbacks

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  // init once
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      console.warn("Web Speech API not supported in this browser (Chrome/Edge only).");
      return;
    }
    const recog: SpeechRecognition = new SR();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = "en-US";

    recog.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let finals = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) finals += r[0].transcript + " ";
        else interim += r[0].transcript;
      }
      setTranscript((prev) => {
        const base = prev.replace(/ \(interim\)$/g, "");
        return (base + finals + interim).trim() + (interim ? " (interim)" : "");
      });
    };

    recog.onerror = (e: any) => {
      // Common error codes: 'not-allowed', 'no-speech', 'audio-capture', 'aborted'
      console.error("Speech error:", e.error);
      if (e.error === "not-allowed") {
        // user blocked mic
        // Tip: ask the user to click the camera/mic icon in the URL bar and allow microphone for site
      }
      if (e.error === "aborted") {
        // benign when we call abort(); ignore
        return;
      }
    };

    recog.onend = () => {
      runningRef.current = false;
      // Chrome stops after silence; if still active, try to restart after a tick
      if (activeRef.current) {
        setTimeout(() => {
          if (!runningRef.current) {
            try {
              recog.start();
              runningRef.current = true;
            } catch (err) {
              // start can throw if quickly re-called; we’ll try again on next onend
              console.debug("Restart start() failed, will retry on next onend:", err);
            }
          }
        }, 150);
      }
    };

    recogRef.current = recog;

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

  // respond to isActive changes
  useEffect(() => {
    const recog = recogRef.current;
    if (!recog) return;

    if (isActive) {
      setTranscript(""); // fresh session buffer
      if (!runningRef.current) {
        try {
          recog.start();
          runningRef.current = true;
        } catch (err) {
          // If "not allowed" or "already started", we'll recover via onend
          console.debug("Initial start() failed:", err);
        }
      }
    } else {
      // stop & clear temp buffer
      try {
        recog.abort(); // abort is more immediate than stop()
        recog.stop();
      } catch {}
      runningRef.current = false;
      setTranscript("");
    }
  }, [isActive]);

  return (
    <div className="bg-neutral-900 text-white p-4 rounded-lg mt-4 max-h-60 overflow-y-auto transition-all duration-100">
      <h2 className="text-lg font-semibold mb-2">Live Captions</h2>
      <p className="text-gray-300 whitespace-pre-wrap">
        {transcript ? transcript.replace(/ \(interim\)$/g, "") : "Waiting for speech..."}
      </p>
    </div>
  );
};