import { Route, Routes } from "react-router-dom";
import Welcome from "./WelcomePage";
import Login from "./LoginPage";
import ClientDashboard from "./ClientDashboard";
import Workouts from "./Workouts";
import SpecificWorkout from "./SpecificWorkout";
import SpecificWorkoutDetails from "./SpecificWorkoutDetails";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clientDashboard" element={<ClientDashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/:id" element={<SpecificWorkout />} />
        <Route
          path="/workouts/:id/:name"
          element={<SpecificWorkoutDetails />}
        />
      </Routes>
    </>
  );
}

export default App;
