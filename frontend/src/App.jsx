/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
import React, { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:8000/api/comments/';

function App() {
  const [comments, setComments] = useState([]);
  const [newText, setNewText] = useState('');

  const fetchComments = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchComments(); }, []);

  const addComment = async () => {
    if (!newText.trim()) return;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    });
    setNewText('');
    fetchComments();
  };

  const deleteComment = async (id) => {
    if (window.confirm("Delete this comment?")) {
      await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      fetchComments();
    }
  };

  const editComment = async (id, currentText) => {
    const newContent = prompt("Edit comment text:", currentText);
    if (newContent !== null && newContent !== currentText) {
      await fetch(`${API_URL}${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newContent }),
      });
      fetchComments();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Bobyard Comments</h1>
          <p className="text-slate-500 mt-2">Manage project feedback in real-time.</p>
        </header>

        {/* Add Comment Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-10">
          <textarea
            className="w-full p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            rows="3"
            placeholder="Write a comment as Admin..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={addComment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              Post Comment
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-5 transition-hover hover:shadow-md">
              <div className="flex-shrink-0">
                {comment.image ? (
                  <img src={comment.image} alt={comment.author} className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-50" />
                ) : (
                  <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 font-bold text-xl">
                    {comment.author[0]}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-800 text-lg">{comment.author}</h3>
                  <span className="text-sm text-slate-400">{new Date(comment.date).toLocaleString()}</span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">{comment.text}</p>
                <div className="flex items-center gap-6 pt-4 border-t border-slate-50 text-sm font-medium">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="text-red-400">❤️</span> {comment.likes} likes
                  </span>
                  <button onClick={() => editComment(comment.id, comment.text)} className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button onClick={() => deleteComment(comment.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;