import React, { useContext, useRef } from 'react'
import { AppContext } from '../context/AppContextProvider';

const EditNote = (props) => {
    const { note, setNote } = props;
    const refClose = useRef(null);

    const { updateNote } = useContext(AppContext);

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        refClose.current.click();
        updateNote(note);
    }
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-5'>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' placeholder="Enter title" onChange={handleChange} value={note.title} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name='description' className="form-control" id="description" value={note.description} placeholder="Enter description" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" name='tag' className="form-control" id="tag" placeholder="Enter tag" value={note.tag} onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditNote
