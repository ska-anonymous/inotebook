import React, { useContext, useEffect } from 'react'
import Notes from './Notes'
import { AppContext } from '../context/AppContextProvider'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const API_HOST = 'http://localhost:8081/api';

  const { showAlert, setNotes } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('notesUserToken')) {
      fetchNotes();
    } else {
      showAlert('warning', 'please login First');
      navigate('/login');
    }
  }, [])

  const fetchNotes = async () => {

    const token = sessionStorage.getItem('notesUserToken');
    if (!token) {
      return showAlert('warning', 'user token not available! please login to get token');
    }
    try {

      const response = await fetch(API_HOST + '/notes/fetchallnotes', {
        method: 'GET',
        headers: {
          'Auth-Token': token
        }
      })

      const data = await response.json();
      if (data.error) {
        return showAlert('danger', data.errorMessage);
      }
      setNotes(data.notes);

    } catch (err) {
      showAlert('danger', 'Error occurred during fetching notes ' + err.message);
    }

  }


  return (
    <>
      <Notes />
    </>
  )
}

export default Home
