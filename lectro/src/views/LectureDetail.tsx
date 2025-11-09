import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { LectroNavbar } from "../components/Navbar";
import Editor from "../components/Editor";
import { LiveCaptions } from "../components/LiveCaptions";
import { LiveAINotes } from "../components/LiveAINotes";

type Lecture = {
    id: string;
    title: string;
    description?: string;
};

export function LectureDetail() {
    const { id } = useParams<{ id: string }>();
    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [ccActive, setCcActive] = useState(false);
    const [aiNotesActive, setAiNotesActive] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [latestNote, setLatestNote] = useState<string | null>(null);
    const [dyslexicFontActive, setDyslexicFontActive] = useState(false);

    useEffect(() => {
        async function fetchLecture() {
            if (!id) return;
            const lectureRef = doc(db, "lectures", id);
            const lectureSnap = await getDoc(lectureRef);
            if (lectureSnap.exists()) {
                setLecture({ id, ...lectureSnap.data() } as Lecture);
            }
        }
        fetchLecture();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-900">
            <LectroNavbar
                recordMode
                ccActive={ccActive}
                onToggleCC={() => setCcActive((v) => !v)}
                aiNotesActive={aiNotesActive}
                onToggleAINotes={() => setAiNotesActive((v) => !v)}
                dyslexicFontActive={dyslexicFontActive}
                onToggleDyslexicFont={() => setDyslexicFontActive((v) => !v)}
            />
            <main className="flex flex-col items-center pt-24 gap-8 px-4">
                {!lecture ? (
                    <div className="text-white/80 text-lg">Loading...</div>
                ) : (
                    <div className="w-full max-w-6xl p-6 space-y-6 shadow">
                        {/* Layout: when CC active, split screen */}
                        <div
                            className={`grid gap-6 ${
                                ccActive ? "grid-cols-2" : "grid-cols-1"
                            }`}
                        >
                            <div>
                                <Editor
                                    lectureId={lecture.id}
                                    initialContent={`<h1>${
                                        lecture.title
                                    }</h1><p>${lecture.description || ""}</p>`}
                                    appendContent={latestNote}
                                    dyslexicFontActive={dyslexicFontActive}
                                />
                            </div>
                            {ccActive && (
                                <div className="space-y-4">
                                    <LiveCaptions
                                        isActive={ccActive}
                                        onTranscript={(t) => setTranscript(t)}
                                        dyslexicFontActive={dyslexicFontActive}
                                    />
                                    {aiNotesActive && (
                                        <LiveAINotes
                                            isActive={aiNotesActive}
                                            transcript={transcript}
                                            dyslexicFontActive={dyslexicFontActive}
                                            onNewNotes={(notes) => {
                                                // append each note into the editor, spaced slightly so
                                                // each triggers the Editor's appendContent effect
                                                notes.forEach((note, i) =>
                                                    setTimeout(
                                                        () =>
                                                            setLatestNote(note),
                                                        i * 120
                                                    )
                                                );
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            {/* When CC is off but AI notes are enabled, show the AI notes below the editor */}
                            {!ccActive && aiNotesActive && (
                                <div className="mt-4">
                                    <LiveAINotes
                                        isActive={aiNotesActive}
                                        transcript={transcript}
                                        dyslexicFontActive={dyslexicFontActive}
                                        onNewNotes={(notes) => {
                                            notes.forEach((note, i) =>
                                                setTimeout(
                                                    () => setLatestNote(note),
                                                    i * 120
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
