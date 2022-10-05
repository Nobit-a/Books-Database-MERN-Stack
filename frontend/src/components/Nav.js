import React from "react";
import { Link, useNavigate} from "react-router-dom";

const Nav = () => {

    const auth = localStorage.getItem('user_data')
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/signup')
    }

    return (
        <div>
            <img className="logo" src='https://img.freepik.com/premium-vector/heap-books-sketch-library-stack-education-symbol_80590-12797.jpg?w=2000' alt='logo'/>

            { 

                auth ? 
                <ul className="nav-ul">
                <li> <Link to='/'>All Books</Link> </li>

                <li>  <Link to='/add'>Add a New Book</Link></li>
                <li>  <Link to='/update/:id'>Update Book</Link></li>
                <li>  <Link to='/profile'>Profile</Link></li> 
                <li> <Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>

                </ul>
                : 
                <ul className="nav-ul">
                    <li> <Link to='/'>All Books</Link> </li>
                    <li> <Link to='/signup'>Sign Up</Link></li>
                    <li> <Link to='/login'>Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav