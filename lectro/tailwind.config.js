module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.js",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["SF Mono", "sans-serif"],
        },
    },
    plugins: [require("flowbite/plugin")],
};
