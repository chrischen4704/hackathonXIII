import { LectroNavbar } from "./Navbar";

export function Home() {
    return (
        <div className="min-h-screen bg-gray-900">
            <LectroNavbar />
            <section className="flex flex-col items-center justify-center mt-32 space-y-6 px-4">
                <h1 className="text-5xl font-extrabold text-white tracking-tight">
                    Welcome to Lectro
                </h1>
                <p className="text-white max-w-md text-center leading-relaxed text-lg">
                    Hi, welcome to Lectro. This is your space to capture notes,
                    meetings, or anything you want to remember.
                </p>
            </section>
        </div>
    );
}

// import { Button, Card, TextInput } from "flowbite-react";

// export function Home() {
//     return (
//         <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-8 gap-9">
//             {/* Headline */}
//             <h1 className="text-4xl font-bold mb-4">Lectro Flowbite Demo</h1>

//             {/* Example Flowbite Button */}
//             <Button color="success" className="mb-2">
//                 Green Button
//             </Button>
//             <Button color="dark" pill>
//                 Dark Pill Button
//             </Button>
//             <Button color="purple">Gradient Button</Button>

//             {/* Example Flowbite TextInput */}
//             <TextInput placeholder="Search lectures..." className="max-w-md" />

//             {/* Example Flowbite Card */}
//             <Card className="max-w-sm bg-neutral-900">
//                 <h5 className="text-2xl font-bold tracking-tight text-white">
//                     Sample Card
//                 </h5>
//                 <p className="font-normal text-white/80">
//                     This is an example Flowbite Card component!
//                 </p>
//                 <Button color="blue">Read More</Button>
//             </Card>
//         </div>
//     );
// }
