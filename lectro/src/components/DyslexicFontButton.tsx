type Props = {
    isActive: boolean;
    onClick: () => void;
};
export function DyslexicFontButton({ isActive, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className={`group relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap${
                isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-green-500/50'
                    : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
            }`}
            aria-label="Dyslexic Font"
        >
            <div className="flex items-center gap-2">
                {/* Font/Text Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
                <span>Dyslexic Font</span>
            </div>
            {/* ✨ Pulsing green dot when active */}
            {isActive && (
                <span className="absolute top-0 right-0 flex h-3 w-3 -translate-y-1/2 translate-x-1/2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
            )}
        </button>
    );
}

