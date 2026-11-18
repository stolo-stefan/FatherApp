import { Route } from "react-router-dom";

import WebinarThankYouPage from "../routes/LandingPage/WebinarThankYouPage";
// TBD
import BlogReadPage from "../routes/NormalUser/BlogReadPage";
import NotFoundPage from "../routes/NormalUser/NotFoundPage";
import NewLandingPage from "../routes/LandingPage/new/NewLandingPage"; // aici e formularul
import manusRoutes from "./ManusRoutes";

const visitorRoutes = (
        <>
            {manusRoutes}
            <Route path="/webinar" element={<NewLandingPage />} />
            <Route path="/blog/:id" element={<BlogReadPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/thank-you" element={<WebinarThankYouPage/>} />
        </>
);

export default visitorRoutes;