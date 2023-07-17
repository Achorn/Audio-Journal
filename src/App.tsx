import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import AudioRecorder from "./pages/audio-recorder/AudioRecorder";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Home</h1>
              <NavLink to={`/audio-recorder`}> Record </NavLink>
            </div>
          }
        />
        <Route path="/audio-recorder" element={<AudioRecorder />} />
        <Route
          path="/signin"
          element={
            <div>
              <h1>Signin</h1>
              <NavLink to={`/`}> Home </NavLink>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
