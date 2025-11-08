import { LectroNavbar } from "./Navbar";
import { LectureList } from "./LectureList";

export function Home() {
    return (
        <div className="min-h-screen bg-gray-900">
            <LectroNavbar />
            <div className="flex justify-center mt-12">
                <LectureList />
            </div>
        </div>
    );
}
