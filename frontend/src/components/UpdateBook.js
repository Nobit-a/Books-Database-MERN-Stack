import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from 'react-router-dom';

const UpdateBook = () => {

    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBookDetails()
    },[])

    const getBookDetails = async () => {
        let result = await fetch('http://localhost:4500/book/'+params.id)
        result = await result.json()
        setName(result.name)
        setAuthor(result.author)
        setGenre(result.genre)
    }

    const updateData = async () => {

        let result = await fetch(
            'http://localhost:4500/update-book/'+params.id,
            {
                method:'PUT',
                body:JSON.stringify({name, author, genre}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        result = await result.json()
        console.warn(result)

        navigate('/')
    }

    return (
        <div className="addbook">
            <h1>
                Update Book
            </h1>

            <input className="inputBox" type="text" placeholder="Enter the book title" value={name} onChange={(e)=>setName(e.target.value)}/>
            
            <input className="inputBox" type="text" placeholder="Enter the book author" value={author} onChange={(e)=>setAuthor(e.target.value)}/>

            <input className="inputBox" type="text" placeholder="Enter the book genre" value={genre} onChange={(e)=>setGenre(e.target.value)}/>

            <button className="submit-button" type="button" onClick={updateData}>Update</button>
        </div>
    )
}

export default UpdateBook 