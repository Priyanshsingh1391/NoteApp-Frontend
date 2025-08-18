import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'


const NoteModal = ({ closeModal , addNote, currentNote,editNote}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate= useNavigate()

  useEffect(()=>{
    if(currentNote){
      setTitle(currentNote.title)
      setDescription(currentNote.description)
    }
   
  },[currentNote])

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if(currentNote){
      await editNote(currentNote._id, title, description);
    } else {
      await addNote(title, description);
    }
    navigate('/');
    closeModal();
  } catch (error) {
    console.error("Request failed", error);
  }
};


   return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">{currentNote ? "Edit Note" : "Add New Note"}</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
          >
            {currentNote? "Edit Note": "Add Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
