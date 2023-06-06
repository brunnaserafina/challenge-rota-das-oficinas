import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RestaurantBillSplitter from "./pages/RestaurantBillSplitter";
import RomanNumeralConverter from "./pages/RomanNumeralConverter";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/roman-numeral-converter"
          element={<RomanNumeralConverter />}
        ></Route>

        <Route
          path="/restaurant-bill"
          element={<RestaurantBillSplitter />}
        ></Route>
      </Routes>
    </Router>
  );
}
