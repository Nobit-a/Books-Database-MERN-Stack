import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';

const AllBooks = () => {

    const [books, setBooks] = useState([])

    useEffect(()=>{
        getBooks()

    },[])

    const showSearchResults = async (event) => {
        // console.warn(event.target.value)
        let key = event.target.value
        if(key){
            let result = await fetch('http://localhost:4500/search/'+key)
            result = await result.json()
    
            if (result)
            {
                setBooks(result)
            }    
        }
        else{
            getBooks()
        }   
    }

    const getBooks = async () => {
        let result = await fetch('http://localhost:4500/all-books')
        result = await result.json()
        setBooks(result)
    }

    const deleteBook = async (id) => {
        let result = await fetch('http://localhost:4500/book/'+ id,
        {method:'DELETE'})

        result = await result.json()
        if (result){
            getBooks()
        }
    }

    return(
        <div className="books-list">
            <h1>The Books Compendium</h1>

            <input className='search' type='text' placeholder="Search" onChange={showSearchResults}/>

            <ul>
                <li className="table-heading">
                    S.No.
                </li>
                <li className="table-heading">
                    Title
                </li>
                <li className="table-heading">
                    Author
                </li>
                <li className="table-heading">
                    Genre
                </li>
                <li className="table-heading">
                    Modify
                </li>
            </ul>

            {
                books.length>0 ? books.map((item, index)=>
                <ul>
                    <li className="table-content">
                        {index+1}
                    </li>
                    <li className="table-content">
                        {item.name}
                    </li>
                    <li className="table-content">
                        {item.author}
                    </li>
                    <li className="table-content">
                        {item.genre}
                    </li>
                    
                    <li className="table-content">
                        <button className='delete-style' onClick={()=>deleteBook(item._id)}>Delete</button>
                        <Link className='update-style' to={'/update/'+item._id}>Update</Link>
                    </li>
                </ul>
                )
                :
                <h2>No Books Found</h2>
            }
        </div>
    )
}

export default AllBooks