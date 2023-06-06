import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameOfLife from "./pages/GameOfLife";
import Homepage from "./pages/Homepage";
import RestaurantBillSplitter from "./pages/RestaurantBillSplitter";
import RomanNumeralConverter from "./pages/RomanNumeralConverter";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        <Route
          path="/roman-numeral-converter"
          element={<RomanNumeralConverter />}
        ></Route>

        <Route
          path="/restaurant-bill"
          element={<RestaurantBillSplitter />}
        ></Route>

        <Route path="/game-of-life" element={<GameOfLife />}></Route>
      </Routes>
    </Router>
  );
}
