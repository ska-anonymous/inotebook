import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../context/AppContextProvider'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import EditNote from './EditNote';

const Notes = () => {
    const { notes } = useContext(AppContext);
    const [note, setNote] = useState({ title: '', description: '', tag: '' });

    const ref = useRef(null);

    const handleEdit = (note) => {
        setNote(note);
        ref.current.click();
    }
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="d-none btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <EditNote note={note} setNote={setNote} />
            <div className='container mb-5'>
                <h2>Your Notes</h2>
                {notes.length === 0 && <h4 className='text-warning'>No notes to display</h4>}
                <div className='row'>
                    {notes.map((note, index) => {
                        return <NoteItem handleEdit={handleEdit} key={'NoteItem-' + index} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
