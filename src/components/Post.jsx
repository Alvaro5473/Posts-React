import React from 'react';

function Post({ post }) {
  return (
    <li style={{ marginBottom: '15px' }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button>❤️</button>
      <button>📣</button>
    </li>
  );
}

export default Post;