import React, { useEffect, useState } from 'react';
import Post from './components/Post';
import './App.css'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_API_URL;
const supabaseKey = process.env.REACT_APP_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

const refreshPage = () => {
  window.location.reload();
}

function App() {
  // Estado para almacenar las publicaciones
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  // Llamada a la API al cargar el componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error al obtener los datos:', error);
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ title: newPostTitle, body: newPostBody }]);

      if (error) {
        console.error('Error al crear la publicación:', error.message);
      } else {
        refreshPage();
        setNewPostTitle('');
        setNewPostBody('');
        setPosts([...posts, data[0]]);
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error.message);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Título de la publicación"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido de la publicación"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        ></textarea>
        <button onClick={handleCreatePost}>Crear</button>
      </div>
      {/* Verifica si hay publicaciones cargadas */}
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p>No hay publicaciones</p>
      )}
    </div>
  );
}

export default App;