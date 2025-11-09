import { useState, useEffect } from "react";

type Lecture = {
    id: string;
    title: string;
    description?: string;
};

type SearchBarProps = {
    lectures: Lecture[];
    onSearch: (filtered: Lecture[]) => void;
};

export function SearchBar({ lectures, onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    // Handles the filtering
    useEffect(() => {
        const filtered = lectures.filter(
            (l) =>
                l.title.toLowerCase().includes(query.toLowerCase()) ||
                (l.description &&
                    l.description.toLowerCase().includes(query.toLowerCase()))
        );
        onSearch(filtered);
    }, [query, lectures, onSearch]);

    return (
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lectures..."
            className="w-full py-3 px-5 text-lg rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:ring-2 focus:ring-blue-600 transition"
        />
    );
}
