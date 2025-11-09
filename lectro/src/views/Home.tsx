import { LectroNavbar } from "../components/Navbar";
import { LectureList } from "../components/LectureList";

export function Home() {
    return (
        <div className="font-sans min-h-screen bg-gray-900">
            <LectroNavbar />
            <div className="flex justify-center mt-12">
                <LectureList />
            </div>
        </div>
    );
}
