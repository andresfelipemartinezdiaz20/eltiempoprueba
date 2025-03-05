// En App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import Articles from './components/Articles';

function App() {
  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
            <Home />
        } />
      </Routes>
      <Routes>
        <Route path="/articulo/node/*" element={
            <Articles />
        } />
      </Routes>
    </Router>
    
  );
}

export default App;
