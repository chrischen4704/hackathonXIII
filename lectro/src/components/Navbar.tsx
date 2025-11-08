export function LectroNavbar() {
    return (
        <nav className="w-full bg-neutral-950 border-b border-neutral-900 py-3 px-4 flex items-center gap-4">
            {/* Left: Logo + name */}
            <div className="flex items-center gap-2 min-w-fit">
                <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-md" />
                <span className="text-xl font-bold text-white tracking-tight">
                    Lectro
                </span>
            </div>

            {/* Center: search bar */}
            <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-4xl">
                    {/* Search icon */}
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
            </div>

            {/* Right: Plus button */}
            <div className="flex items-center min-w-fit">
                <button
                    type="button"
                    className="flex items-center justify-center w-12 h-12 text-white bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-medium rounded-full text-xl transition shadow"
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
    );
}
