import { Route } from "react-router-dom";

import Home from "../routes/Home";
import About from "../routes/About";
import B2B from "../routes/B2B";
import Program from "../routes/Program";
import MentorshipHour from "../routes/MentorshipHour";

const manusRoutes = (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/despre-mine" element={<About />} />
            <Route path="/cursuri-management-b2b" element={<B2B />} />
            <Route path="/program-mentorat" element={<Program />} />
            <Route path="/ora-de-mentorat" element={<MentorshipHour />} />
        </>
);

export default manusRoutes;
