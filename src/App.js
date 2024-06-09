import { Route, Routes } from "react-router-dom";
import Welcome from "./WelcomePage";
import Login from "./LoginPage";
import ClientDashboard from "./ClientDashboard";
import Workouts from "./Workouts";
import SpecificWorkout from "./SpecificWorkout";
import SpecificWorkoutDetails from "./SpecificWorkoutDetails";
import "./App.css";
import Performance from "./Performance";
import Diet from "./Diet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clientDashboard" element={<ClientDashboard />} />
        <Route path="/clientDashboard/performance" element={<Performance />} />
        <Route path="/clientDashboard/diet" element={<Diet />} />
        <Route path="/clientDashboard/workouts" element={<Workouts />} />
        <Route
          path="/clientDashboard/workouts/:id"
          element={<SpecificWorkout />}
        />
        <Route
          path="/clientDashboard/workouts/:id/:name"
          element={<SpecificWorkoutDetails />}
        />
      </Routes>
    </>
  );
}

export default App;
