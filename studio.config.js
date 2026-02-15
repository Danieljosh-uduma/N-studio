import { homePage } from "./src/pages/home.js";
import docsPage from "./src/pages/docs.js";

export default {
    tailwind: true,
    theme: {
        darkMode: true
    },
    routes: {
        '/': homePage,
        '/docs': docsPage
    }
};
