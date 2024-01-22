import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatWindow from "./components/ChatWindow";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home /> 
            },
            {
                path: "/chats",
                element: <ChatWindow/>
            }
        ]
    },
]);

export default router;