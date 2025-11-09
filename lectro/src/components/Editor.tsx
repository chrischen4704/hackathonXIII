import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
    lectureId: string;
    initialContent?: string;
    appendContent?: string | null;
    className?: string;
    dyslexicFontActive?: boolean;
};

export default function Editor({
    lectureId,
    initialContent = "",
    appendContent = null,
    className = "",
    dyslexicFontActive = false,
}: Props) {
    const [content, setContent] = useState(initialContent);

    // Load initial content from Firestore
    useEffect(() => {
        async function loadContent() {
            const contentRef = doc(db, `lectures/${lectureId}/content/editor`);
            const contentSnap = await getDoc(contentRef);
            if (contentSnap.exists()) {
                setContent(contentSnap.data().content);
            }
        }
        loadContent();
    }, [lectureId]);

    // Save content to Firestore
    const handleContentChange = async (newContent: string) => {
        setContent(newContent);
        const contentRef = doc(db, `lectures/${lectureId}/content/editor`);
        await setDoc(contentRef, {
            content: newContent,
            lastModified: new Date(),
        });
    };

    return (
        <div className={className}>
            <div className="rounded-lg bg-gray-800 p-4 min-h-[40vh] text-white max-w-4xl mx-auto shadow-m">
                <SimpleEditor
                    appendContent={appendContent}
                    initialContent={content}
                    dyslexicFontActive={dyslexicFontActive}
                    onUpdate={({ editor }) => {
                        handleContentChange(editor.getHTML());
                    }}
                />
            </div>
        </div>
    );
}
