import React, { useContext } from 'react'
import { AppContext } from '../context/AppContextProvider';

const NoteItem = (props) => {
    const { deleteNote } = useContext(AppContext);

    const { note, handleEdit } = props;
    return (
        <>
            <div className='col-md-3'>
                <div className="card my-3 note-card">
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>
                            <h5 className="card-title">{note.title}</h5>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <i className="bi bi-pencil-square text-success mx-2" onClick={() => { handleEdit(note) }} title='edit'></i>
                                <i className='bi bi-trash text-danger' title='delete' onClick={() => { deleteNote(note._id) }}></i>
                            </div>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
