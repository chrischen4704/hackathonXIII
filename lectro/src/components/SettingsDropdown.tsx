type Props = {
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
};

export function SettingsDropdown({ isOpen, onOpen, onClose }: Props) {
    // Use controlled state from parent instead of internal state
    return (
        <div className="relative">
            <button
                type="button"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-600"
                onClick={onOpen}
                aria-label="Lecture settings"
            >
                {/* Dots SVG */}
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 4 15"
                >
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-4 w-[240px] bg-[#181d28] rounded-lg shadow-lg border border-neutral-800 z-70 p-1">
                    <ul
                        className="py-2 text-sm text-white"
                        aria-labelledby="dropdownMenuIconButton"
                    >
                        <li>
                            <button
                                className="w-full flex items-center gap-2 text-left px-3 py-3 hover:bg-neutral-800 rounded-lg transition whitespace-nowrap"
                                onClick={() => onClose?.()}
                            >
                                {/* Delete SVG */}
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
                                Delete
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full flex items-center gap-2 text-left px-3 py-3 hover:bg-neutral-800 rounded-lg transition whitespace-nowrap"
                                onClick={() => onClose?.()}
                            >
                                {/* Download PDF SVG */}
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
                        </li>
                        <li>
                            <button
                                className="w-full flex items-center gap-2 text-left px-3 py-3 hover:bg-neutral-800 rounded-lg transition whitespace-nowrap"
                                onClick={() => onClose?.()}
                            >
                                {/* Export to Drive SVG */}
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
                                        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                                    />
                                </svg>
                                Export to Google Drive
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
