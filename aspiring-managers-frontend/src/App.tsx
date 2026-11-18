import { Routes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import visitorRoutes from "./appRoutes/VisitorRoutes";
import adminRoutes from "./appRoutes/AdminRoutes";


export default function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {adminRoutes}
      {visitorRoutes}
    </Routes>
    </>
  );
}
