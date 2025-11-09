import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Textarea } from "flowbite-react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CCButton } from "./CCButton";
import { AINotesButton } from "./AINotesButton";
import { PlusButton } from "./PlusButton";
import { SettingsDropdown } from "./SettingsDropdown";

type Props = {
    recordMode?: boolean;
    ccActive?: boolean;
    onToggleCC?: () => void;
    aiNotesActive?: boolean;
    onToggleAINotes?: () => void;
};

export function LectroNavbar({
    recordMode = false,
    ccActive: ccActiveProp,
    onToggleCC,
    aiNotesActive: aiNotesActiveProp,
    onToggleAINotes,
}: Props) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ccLocal, setCcLocal] = useState(false);
    const [aiNotesLocal, setAiNotesLocal] = useState(false);

    const ccActive = ccActiveProp ?? ccLocal;
    const aiNotesActive = aiNotesActiveProp ?? aiNotesLocal;

    const toggleCC = () => {
        if (onToggleCC) onToggleCC();
        else setCcLocal((v) => !v);
    };

    const toggleAINotes = () => {
        if (onToggleAINotes) {
            onToggleAINotes();
        } else {
            if (!aiNotesLocal && !ccActive) {
                setCcLocal(true);
            }
            setAiNotesLocal((v) => !v);
        }
    };

    const handleCreateLecture = async () => {
        // First create the lecture document
        const docRef = await addDoc(collection(db, "lectures"), {
            title,
            description,
            createdAt: new Date(),
        });

        // Initialize the editor content subcollection
        const contentRef = doc(db, `lectures/${docRef.id}/content/editor`);
        await setDoc(contentRef, {
            content: `<h1>${title}</h1>${
                description ? `<p>${description}</p>` : ""
            }`,
            lastModified: new Date(),
        });

        setShowModal(false);
        setTitle("");
        setDescription("");
        navigate(`/lecture/${docRef.id}`);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50 py-3 px-4 flex items-center gap-4">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 min-w-fit cursor-pointer"
                    onClick={() => navigate("/")}
                    tabIndex={0}
                    role="button"
                    aria-label="Go to Home"
                >
                    <div className="relative">
                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                        <div className="absolute inset-0 w-9 h-9 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-xl blur-lg opacity-50" />
                    </div>
                    {/* ✨ UPDATED: Added gradient text and subtitle */}
                    <div>
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                            Lectro
                        </span>
                        <p className="text-xs text-slate-400">AI Assistant</p>
                    </div>
                </div>
                {/* Center controls */}
                <div className="relative max-w-md w-full">
                    {recordMode ? (
                        <div className="flex-1 flex justify-center gap-4">
                            <CCButton isActive={ccActive} onClick={toggleCC} />
                            <AINotesButton
                                isActive={aiNotesActive}
                                onClick={toggleAINotes}
                            />
                        </div>
                    ) : (
                        <div className="flex-1 flex justify-center">
                            <div className="relative w-full max-w-md">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-cyan-400/70"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="lecture-search"
                                    className="block w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-300 rounded-xl text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:shadow-[0_0_12px_rgba(34,211,238,0.4)] focus:border-transparent transition-all shadow-md hover:bg-slate-50"
                                    placeholder="🔍 Search lectures..."
                                />
                            </div>
                        </div>
                    )}
                </div>
                {/* Right controls */}
                <div className="flex items-center gap-4 min-w-fit">
                    {recordMode ? (
                        <SettingsDropdown
                            isOpen={menuOpen}
                            onOpen={() => setMenuOpen(true)}
                            onClose={() => setMenuOpen(false)}
                        />
                    ) : (
                        <PlusButton onClick={() => setShowModal(true)} />
                    )}
                    {/* Profile button here if needed */}
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </div>
                </div>
            </nav>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="flex justify-center bg-gray-900 rounded-lg shadow-xl w-[380px] mx-auto py-8 px-6 flex flex-col items-center">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center tracking-tight">
                        Create New Lecture
                    </h2>
                    <div className="w-full space-y-4">
                        {/* ✨ UPDATED: Better input styling */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Machine Learning 101"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Description
                            </label>
                            <textarea
                                placeholder="Brief description of the lecture..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                            />
                        </div>

                        {/* ✨ UPDATED: Gradient buttons with shadows */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCreateLecture();
                                }}
                                disabled={!title.trim()}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/30"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
