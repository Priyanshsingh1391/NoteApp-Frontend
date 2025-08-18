import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import { toast } from 'react-toastify'

import { useAuth } from "../context/ContextProvider";


const Home = () => {
  const { user } = useAuth();
  const [isModelOpen, setModalOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (user) {
      fetchNotes()
    } else {
      setNotes([]) // 🧹 Clear notes on logout
    }
  }, [user])

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/note",
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      setNotes(data.notes)
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModalOpen(true)
  }

  const closeModel = () => {
    setCurrentNote(null)
    setModalOpen(false)
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      if (response.data.success) {
        fetchNotes()
        closeModel()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      if (response.data.success) {
        toast.success("Note deleted")
        fetchNotes()
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      if (response.data.success) {
        fetchNotes()
        closeModel()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery} />

      <div className='px-8 pt-5 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {filtered.length > 0 ? (
          filtered.map(note => (
            <NoteCard
              note={note}
              key={note._id}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>No notes</p>
        )}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className='text-2xl fixed right-4 bottom-4 bg-teal-500 text-white font-bold p-4 rounded-full'
      >
        +
      </button>

      {isModelOpen && (
        <NoteModal
          closeModal={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  )
}

export default Home
