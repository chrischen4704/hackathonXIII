import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { LectroNavbar } from "../components/Navbar";

type Lecture = {
    id: string;
    title: string;
    description?: string;
};

export function LectureDetail() {
    const { id } = useParams<{ id: string }>();
    const [lecture, setLecture] = useState<Lecture | null>(null);

    useEffect(() => {
        async function fetchLecture() {
            if (!id) return;
            const lectureRef = doc(db, "lectures", id);
            const lectureSnap = await getDoc(lectureRef);
            if (lectureSnap.exists()) {
                setLecture({ id, ...lectureSnap.data() } as Lecture);
            }
        }
        fetchLecture();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-900">
            <LectroNavbar recordMode />
            <main className="flex flex-col items-center pt-24 gap-8">
                {!lecture ? (
                    <div className="text-white/80 text-lg">Loading...</div>
                ) : (
                    <div className="w-full max-w-3xl p-6 space-y-6 shadow">
                        <h1 className="text-3xl font-bold text-white">
                            {lecture.title}
                        </h1>
                        <p className="text-lg text-white">
                            {lecture.description}
                        </p>
                        {/* this section */}
                    </div>
                )}
            </main>
        </div>
    );
}
