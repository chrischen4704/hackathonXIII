import { useState } from "react";
import { Modal, Button, TextInput, Textarea } from "flowbite-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export function LectroNavbar({ recordMode = false }) {
    const navigate = useNavigate();
    //Inside Lecture view states
    const [menuOpen, setMenuOpen] = useState(false);
    // const { id } = useParams();
    // const [listening, setListening] = useState(false);
    // const [transcript, setTranscript] = useState("");

    //Home Page states
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
                            {/* Start Speech Recording  */}
                            <button
                                className="flex items-center gap-2 px-5 py-2 text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow focus:ring-4 focus:ring-blue-300 text-lg font-medium transition"
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
                                Live CC
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

                {/* Right: Plus button or Settings */}
                {/* <div className="flex items-center min-w-fit">
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
                </div> */}
                <div className="flex items-center min-w-fit">
                    {recordMode ? (
                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center justify-center w-12 h-12 text-white bg-neutral-900 hover:bg-neutral-800 rounded-full text-xl shadow focus:ring-2 focus:ring-emerald-500 transition"
                                onClick={() => setMenuOpen((m) => !m)}
                                aria-label="Lecture settings"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-neutral-900 rounded-lg shadow-lg border border-neutral-800 z-50">
                                    <button
                                        className="w-full text-left px-4 py-2 text-white hover:bg-neutral-800"
                                        // onClick={handleDelete}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16
          19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772
          5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0
          0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
          51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09
          2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                        Delete lecture
                                    </button>
                                    <button
                                        className="w-full flex items-center gap-2 text-left px-4 py-2 text-white hover:bg-neutral-800"
                                        // onClick={handleExport}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1
          13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3
          3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125
          1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                            />
                                        </svg>
                                        Download PDF
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-white hover:bg-neutral-800"
                                        // onClick={handleExport}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                                            />
                                        </svg>
                                        Export to Google Drive
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Plus button for main screen
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
                    )}
                </div>
            </nav>
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
