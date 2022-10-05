import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddBook from './components/AddBook';
import AllBooks from './components/AllBooks';
import UpdateBook from './components/UpdateBook';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element = {<PrivateComponent/>}>
            <Route path='/add' element={<AddBook/>}/>
            <Route path='/update/:id' element={<UpdateBook/>}/>
            <Route path='/logout' element={<h1>Logout Component</h1>}/>
            <Route path='/profile' element={<h1>Profile Component</h1>}/>
          </Route>

          <Route path='/' element={<AllBooks/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>

        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
