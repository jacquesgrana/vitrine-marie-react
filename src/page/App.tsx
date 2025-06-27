import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom'
import '../style/main.scss';
import Home from './home/Home';
import About from './about/About';
import NotFound from './not_found/NotFound';
import Header from '../layout/Header';
import Footer from '../layout/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* route « catch-all » pour 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
