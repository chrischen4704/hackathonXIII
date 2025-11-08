import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust this import as needed
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

type Lecture = {
    id: string;
    title: string;
    description?: string;
};

export function LectureList() {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLectures() {
            const querySnapshot = await getDocs(collection(db, "lectures"));
            setLectures(
                querySnapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data(),
                        } as Lecture)
                )
            );
        }
        fetchLectures();
    }, []);

    return (
        <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center pt-10 gap-8">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full px-10">
                {lectures.length === 0 ? (
                    <section className="flex flex-col items-center justify-center mt-32 space-y-6 px-4">
                        <h1 className="text-5xl font-extrabold text-white tracking-tight">
                            Welcome to Lectro
                        </h1>
                        <p className="text-white max-w-md text-center leading-relaxed text-lg">
                            This is your space to capture notes, meetings, or
                            anything you want to remember.
                        </p>
                    </section>
                ) : (
                    lectures.map((l) => (
                        <Card
                            key={l.id}
                            className="bg-neutral-900 border border-neutral-800"
                            onClick={() => navigate(`/lecture/${l.id}`)}
                        >
                            <h5 className="text-xl font-bold">{l.title}</h5>
                            {l.description && (
                                <p className="text-white/80">{l.description}</p>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </main>
    );
}
