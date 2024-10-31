import React, { useEffect, useState } from 'react';
import Post from './components/Post';
import './App.css'

function App() {
  // Estado para almacenar las publicaciones
  const [posts, setPosts] = useState([]);

  // Llamada a la API al cargar el componente
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json()) // Convertimos la respuesta a JSON
      .then(data => setPosts(data)) // Guardamos los datos en el estado
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>Posts</h1>
      {/* Verifica si hay publicaciones cargadas */}
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p>Cargando publicaciones...</p>
      )}
    </div>
  );
}

export default App;