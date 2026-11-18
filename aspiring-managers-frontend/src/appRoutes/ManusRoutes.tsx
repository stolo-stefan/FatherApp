import { Route } from "react-router-dom";

import Home from "../routes/NormalUser/Home";
import About from "../routes/NormalUser/About";
import B2B from "../routes/NormalUser/B2B";
import Program from "../routes/NormalUser/Program";
import MentorshipHour from "../routes/NormalUser/MentorshipHour";

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
