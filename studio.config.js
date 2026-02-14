import { homePage } from "./app/src/pages/home.js";
import docsPage from "./app/src/pages/docs.js";

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
