const BASE_URL = "http://localhost:3001"; // backend URL

// 1️⃣ Summarize lecture transcript
export async function summarizeLecture(transcript: string) {
    const res = await fetch(`${BASE_URL}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
    });
    if (!res.ok) throw new Error("Failed to summarize lecture");
    return await res.json();
}

// 2️⃣ Define a term
export async function defineTerm(term: string) {
    const res = await fetch(`${BASE_URL}/api/define`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term }),
    });
    if (!res.ok) throw new Error("Failed to get definition");
    return await res.json();
}

// 3️⃣ Transcribe audio (Whisper fallback)
export async function transcribeAudio(audioBlob: Blob) {
    const formData = new FormData();
    formData.append("audio", audioBlob);

    const res = await fetch(`${BASE_URL}/api/transcribe`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Transcription failed");
    return await res.json();
}
