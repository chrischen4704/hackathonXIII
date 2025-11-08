import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";

type Lecture = {
    id: string;
    title: string;
    description: string;
};

export function CardList() {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLectures = async () => {
        const snapshot = await getDocs(collection(db, "lectures"));
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Lecture, "id">),
        }));
        setLectures(data);
        setLoading(false);
    };

    const addLecture = async () => {
        const title = prompt("Enter lecture title:");
        const description = prompt("Enter description:");
        if (!title) return;

        await addDoc(collection(db, "lectures"), {
            title,
            description: description || "",
        });
        fetchLectures();
    };

    useEffect(() => {
        fetchLectures();
    }, []);

    return (
        <div className="w-full flex flex-col items-center mt-8">
            <div className="flex justify-between items-center w-[90%] max-w-5xl mb-6">
                <h2 className="text-xl font-semibold text-white">
                    My Lectures
                </h2>
                <Button
                    onClick={addLecture}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-500 w-10 h-10 flex items-center justify-center"
                >
                    <Plus className="w-5 h-5 text-white" />
                </Button>
            </div>

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : lectures.length === 0 ? (
                <p className="text-gray-400">No lectures yet. Add one!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] max-w-5xl">
                    {lectures.map((lecture) => (
                        <Card
                            key={lecture.id}
                            className="bg-neutral-900 border-neutral-800 text-white hover:border-emerald-500 transition"
                        >
                            <CardHeader>
                                <CardTitle>{lecture.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm">
                                    {lecture.description ||
                                        "No description provided."}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
