import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Finder from './components/Finder.jsx';
import FruitDetail from './components/FruitDetail.jsx';

import './App.css';
import ThemeToggle from "./components/ThemeToggle";

// function App() {
//   return (
//     <>
//       <ThemeToggle />
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/app" element={<Finder />} />
//         <Route path="/fruit/:id" element={<FruitDetail />} />
//       </Routes>
//     </Router>
//   );
// }
function App() {
  return (
    <Router>
      <ThemeToggle />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Finder />} />
        <Route path="/fruit/:id" element={<FruitDetail />} />
      </Routes>
    </Router>
  );
}




export default App;
