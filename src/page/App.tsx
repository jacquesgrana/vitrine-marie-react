import React from 'react';
import { Routes, Route } from 'react-router-dom'
import '../style/main.scss';
import Home from './home/Home';
import About from './about/About';
import NotFound from './not_found/NotFound';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Gallery from './gallery/Gallery';
import Contact from './contact/Contact';
import Login from './login/Login';


function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          {/* route « catch-all » pour 404  à améliorer*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
