import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";

export function SearchBar() {
    return (
        <TextInput
            type="text"
            icon={Search}
            placeholder="Search lectures..."
            className="w-full max-w-xl rounded-full text-white bg-neutral-900 border border-neutral-800"
        />
    );
}
