type Props = {
    onClick: () => void;
};
export function PlusButton({ onClick }: Props) {
    return (
        <button
            type="button"
            className="flex items-center justify-center w-12 h-12 text-white bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-medium rounded-full text-xl transition shadow"
            onClick={onClick}
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
    );
}
