import React, {useState} from "react";

const AddBook = () => {

    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")
    const [error, setError] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const collectData = async () => {

        if (!name || !author || !genre)
        {
            setError(true)
            return false
            
        }

        const userID = JSON.parse(localStorage.getItem('user_data'))._id
        console.warn(name, author, genre, userID)

        let result = await fetch(
            'http://localhost:4500/add-book',
            {
                method:'POST',
                body:JSON.stringify({name, author, genre, userID}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        
        setError(false)
        setSubmitted(true)

        // result = await result.json()
        // console.warn(result)
    }

    return (
        <div className="addbook">
            <h1>
                Add a New Book
            </h1>

            <input className="inputBox" type="text" placeholder="Enter the book title" value={name} onChange={(e)=>setName(e.target.value)}/>
            {error && !name && <span className="error-text">Enter a valid book title</span>}
            
            <input className="inputBox" type="text" placeholder="Enter the book author" value={author} onChange={(e)=>setAuthor(e.target.value)}/>
            {error && !author && <span className="error-text">Enter a valid book title</span>}

            <input className="inputBox" type="text" placeholder="Enter the book genre" value={genre} onChange={(e)=>setGenre(e.target.value)}/>
            {error && !genre && <span className="error-text">Enter a valid book title</span>}

            <button className="submit-button" type="button" onClick={collectData}>Add Book</button>
            {!error && submitted && <span className="success-text">Submitted Successfully!</span>}
        </div>
    )
}

export default AddBook 