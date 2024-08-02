import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContextProvider';

const AddNote = () => {
    const [note, setNote] = useState({ title: '', description: '', tag: '' });
    const { addNote } = useContext(AppContext);

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({ title: '', description: '', tag: '' });
    }
    return (
        <>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form className='my-5'>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} name='title' placeholder="Enter title" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" name='description' className="form-control" id="description" value={note.description} placeholder="Enter description" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" name='tag' className="form-control" id="tag" placeholder="Enter tag" value={note.tag} onChange={handleChange} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
                </form>
                <hr />
            </div>
        </>
    )
}

export default AddNote
