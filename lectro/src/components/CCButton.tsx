type Props = {
    isActive: boolean;
    onClick: () => void;
};
export function CCButton({ isActive, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
            }`}
            aria-label="Live Closed Captions"
        >
           <div className="flex items-center gap-2">
                {/* Mic Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    {isActive ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                        />
                    )}
                </svg>
                <span>{isActive ? 'Stop CC' : 'Live CC'}</span>
            </div>
            {/* ✨ Pulsing red dot when active */}
            {isActive && (
                <span className="absolute top-0 right-0 flex h-3 w-3 -translate-y-1/2 translate-x-1/2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
            )}
        </button>
    );
}
