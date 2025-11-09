import { useState } from "react";
import { Modal, Button, TextInput, Textarea } from "flowbite-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { LiveCaptions } from "./LiveCaptions";

export function LectroNavbar({ recordMode = false }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ccActive, setCcActive] = useState(false);

    const handleCreateLecture = async () => {
        const docRef = await addDoc(collection(db, "lectures"), {
            title,
            description,
        });
        setShowModal(false);
        setTitle("");
        setDescription("");
        navigate(`/lecture/${docRef.id}`);
    };

    return (
        <>
            <nav className="w-full bg-neutral-950 border-b border-neutral-900 py-3 px-4 flex items-center gap-4">
                {/* Left: Logo + name */}
                {/* <div className="flex items-center gap-2 min-w-fit">
                    <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-md" />
                    <span className="text-xl font-bold text-white tracking-tight">
                        Lectro
                    </span>
                </div> */}

                <div
                    className="flex items-center gap-2 min-w-fit cursor-pointer"
                    onClick={() => navigate("/")}
                    tabIndex={0}
                    role="button"
                    aria-label="Go to Home"
                >
                    <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-md" />
                    <span className="text-xl font-bold text-white tracking-tight">
                        Lectro
                    </span>
                </div>

                {/* Center: search bar or record button */}
                <div className="flex-1 flex justify-center">
                    {recordMode ? (
                        <div className="flex-1 flex justify-center gap-4">
                            {/* Closed Captions Button */}
                            <button
                                onClick={() => setCcActive((prev) => !prev)}
                                className={`flex items-center gap-2 px-5 py-2 text-white rounded-lg shadow focus:ring-4 text-lg font-medium transition
                                    ${ccActive 
                                    ? "bg-blue-800 hover:bg-blue-900 focus:ring-blue-400" 
                                    : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
                                    }`}
                                aria-label="Live Closed Captions"
                                // onClick={yourCCHandler} SPEECH TO TEXT API
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM3 17v-6h18v6Zm0-8V7h18v2Z" />
                                </svg>
                                {ccActive ? "Stop CC" : "Live CC"}
                            </button>
                            {/* AI Notes Button */}
                            <button
                                className="flex items-center gap-2 px-5 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow focus:ring-4 focus:ring-red-300 text-lg font-medium transition"
                                aria-label="Live AI Note Taking"
                                // onClick={yourAINotesHandler} GPT API
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="8" />
                                </svg>
                                Live AI Notes
                            </button>
                        </div>
                    ) : (
                        <div className="relative w-full max-w-4xl">
                            <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-gray-400">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4-4m0 0A7 7 0 105 5a7 7 0 0012 12z"
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search lectures..."
                                className="pl-8 pr-4 py-1.5 w-full text-white bg-neutral-900 border border-neutral-800 rounded-full focus:ring-1 focus:ring-emerald-600 outline-none"
                                style={{
                                    background: "#151618",
                                    color: "#fff",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Right: Plus button */}
                <div className="flex items-center min-w-fit">
                    <button
                        type="button"
                        className="flex items-center justify-center w-12 h-12 text-white bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-medium rounded-full text-xl transition shadow"
                        onClick={() => setShowModal(true)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
            <div className="mt-4 bg-neutral-900 text-white p-4 rounded-lg">
                 {ccActive && <LiveCaptions isActive={ccActive} />}
            </div>      
           
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="text-white text-xl font-bold mb-4">
                        Create New Lecture
                    </h2>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateLecture();
                        }}
                    >
                        <TextInput
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="flex gap-3 pt-2">
                            <Button
                                color="green"
                                type="submit"
                                disabled={!title.trim()}
                            >
                                Create
                            </Button>
                            <Button
                                color="red"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
