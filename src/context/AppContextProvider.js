import { createContext, useState } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [myAlert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({
            type: type,
            message: message,
        })

        setTimeout(() => {
            setAlert(null)
        }, 2500);
    }

    const API_HOST = 'http://localhost:8081/api';

    // functions
    // add a note
    const addNote = async (note) => {
        // if tag is empty string remove the tag key from note so to set it to default on backend
        if (note.tag.trim().length === 0) {
            delete note.tag;
        }
        const token = sessionStorage.getItem('notesUserToken');
        if (!token) {
            return showAlert('warning', 'user token not available! please login to get token');
        }
        try {
            const response = await fetch(API_HOST + '/notes/addnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                },
                body: JSON.stringify(note)
            })

            const data = await response.json();
            if (data.error) {
                return showAlert('danger', data.errorMessage || data.errorsBody[0].msg);
            }
            showAlert('success', 'Note Added Successfully');
            setNotes([...notes, data.savedNote]);

        } catch (err) {
            showAlert('danger', 'Error occurred during adding note ' + err.message);
        }
    }

    // // delete a note
    const deleteNote = async (noteId) => {

        const token = sessionStorage.getItem('notesUserToken');
        if (!token) {
            return showAlert('warning', 'user token not available! please login to get token');
        }
        try {
            const response = await fetch(API_HOST + `/notes/deletenote/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Auth-Token': token
                },
            })

            const data = await response.json();
            if (data.error) {
                return showAlert('danger', data.errorMessage);
            }

            showAlert('success', 'Note Deleted Successfully');
            const newNotes = notes.filter(note => note._id !== noteId);
            setNotes(newNotes);

        } catch (err) {
            showAlert('danger', 'Error occurred during deleting note ' + err.message);
        }

    }

    // // edit a note
    const updateNote = async (note) => {
        const token = sessionStorage.getItem('notesUserToken');
        if (!token) {
            return showAlert('warning', 'user token not available! please login to get token');
        }
        try {
            const response = await fetch(API_HOST + `/notes/updatenote/${note._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                },
                body: JSON.stringify({ title: note.title, description: note.description, tag: note.tag })
            })

            const data = await response.json();
            if (data.error) {
                return showAlert('danger', data.errorMessage);
            }

            const updatedNotes = notes.map(note => {
                if (note._id === data.updatedNote._id) {
                    return data.updatedNote;
                }
                return note;
            });
            showAlert('success', 'Note Updated Successfully')
            setNotes(updatedNotes);

        } catch (err) {
            showAlert('danger', 'Error occurred during updating note ' + err.message);
        }
    }


    return (
        <AppContext.Provider value={{ notes, addNote, deleteNote, updateNote, myAlert, showAlert, setNotes }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;