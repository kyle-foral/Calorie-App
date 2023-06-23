import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Calendar from './pages/Calendar';
import Calculator from './pages/Calculator';
import Signup from './pages/Sign-up';
import SignIn from './pages/Sign-in';
import Addmeal from './pages/Add-Food';
import Editmeal from './pages/Edit-Food';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Calendar />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="add-meal" element={<Addmeal />} />
          <Route path="edit-meal/:foodId" element={<Editmeal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
