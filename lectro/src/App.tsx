// import { Home } from "./views/Home";
// import { LectureDetail } from "./views/LectureDetail";

// function App() {
//     return <LectureDetail />;
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { LectureDetail } from "./views/LectureDetail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lecture/:id" element={<LectureDetail />} />
        </Routes>
    );
}

export default App;
