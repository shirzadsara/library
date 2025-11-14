
{/*import { AddBook } from './component/AddBook';
import { BooksList } from './component/BooksList';
function App() {
  return (
    
    <div>
      
      <h1 className='text-fuchsia-800'>Library Admin</h1>
      <AddBook />
      <BooksList />

    </div>
  //);
//}

//export default App;
*/}
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { SingleBook } from "./pages/SingleBook";
import { EditBookForm } from './component/admin/book/EditBookForm ';
import { Dashboard } from './pages/Dashboard';
import { UserProfile } from './component/UserProfile';
import { SingleBookAdmin } from './pages/SingleBookAdmin'
import { Cart } from "./component/Cart";

const App: React.FC = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/user" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/books/admin/:id" element={<SingleBookAdmin />} />
        <Route path="/admin/books/edit/:id" element={<EditBookForm />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/register/me" element={<UserProfile />} />
        <Route path="/user/orders" element={<Cart />} />


      </Routes>
    </Router>
  );
};

export default App;

