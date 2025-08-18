import React from 'react'
import {FaEdit,FaTrash} from 'react-icons/fa'
const NoteCard = ({note, onEdit, deleteNote}) => {
  
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md mx-auto my-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
        <div className="flex gap-2">
          <button
            
            className="text-blue-500 hover:text-blue-700 transition"
         onClick={()=> onEdit(note)}>
            <FaEdit />
          </button>
          <button
         
            className="text-red-500 hover:text-red-700 transition"
            onClick={()=> deleteNote(note._id)} 
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="text-gray-600">{note.description}</p>
    </div>
  )
}

export default NoteCard
