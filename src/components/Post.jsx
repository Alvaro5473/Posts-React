import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_API_URL;
const supabaseKey = process.env.REACT_APP_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const refreshPage = () => {
  window.location.reload();
}

function Post({ post, onPostUpdated, onPostDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedBody, setUpdatedBody] = useState(post.body);

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ title: updatedTitle, body: updatedBody })
        .eq('id', post.id)
        .single();

      if (error) {
        console.error('Error al actualizar la publicación:', error.message);
      } else {
        refreshPage();
        setIsEditing(false);
        onPostUpdated(data);
      }
    } catch (error) {
      console.error('Error al actualizar la publicación:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', post.id);

      if (error) {
        console.error('Error al eliminar la publicación:', error.message);
      } else {
        refreshPage();
        onPostDeleted(post.id);
      }
    } catch (error) {
      console.error('Error al eliminar la publicación:', error.message);
    }
  };

  return (
    <li style={{ marginBottom: '15px' }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      )}
    </li>
  );
}

export default Post;