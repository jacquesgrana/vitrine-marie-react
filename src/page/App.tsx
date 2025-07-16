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
import DashboardAdmin from './admin/dashboard/DashboardAdmin';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Toaster
        toastOptions={{
          success: { duration: 3000, className: 'toast-custom-success', iconTheme: { primary: 'green', secondary: 'white' } },
          error: { duration: 3000, className: 'toast-custom-error', iconTheme: { primary: 'red', secondary: 'white' } }
        }}
      />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          {/* route « catch-all » pour 404  à améliorer*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

/*
toastOptions={{
  success: { duration: 3000, iconTheme: { primary: 'green', secondary: 'black' } },
  error: { duration: 5000, iconTheme: { primary: 'red', secondary: 'white' } }
}}
success: { duration: 3000, className: 'toast-success', iconTheme: { primary: 'green', secondary: 'white' } },
  error: { duration: 5000, iconTheme: { primary: 'red', secondary: 'white' } }
*/
