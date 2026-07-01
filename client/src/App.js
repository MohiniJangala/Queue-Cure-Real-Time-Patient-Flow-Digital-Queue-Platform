import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Receptionist from "./pages/Receptionist";
import Patient from "./pages/Patient";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Receptionist />}
        />

        <Route
          path="/patient/:token"
          element={<Patient />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
