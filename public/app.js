async function createPost() {
    const postContent = document.getElementById('post-content').value;
    if (!postContent) {
      alert('Please enter a post!');
      return;
    }
    const response = await fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: postContent }),
    });
    if (response.ok) {
      document.getElementById('post-content').value = '';
      fetchPosts();
    } else {
      alert('Failed to create post');
    }
  }
  async function deletePost(postId) {
    const response = await fetch(`/posts/${postId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchPosts();
    } else {
      alert('Failed to delete post');
    }
  }
  async function fetchPosts() {
    const response = await fetch('/posts');
    if (response.ok) {
      const posts = await response.json();
      const postFeed = document.getElementById('post-feed');
      postFeed.innerHTML = '';
      posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <p>${post.content}</p>
          <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postFeed.appendChild(postElement);
      });
    } else {
      alert('Failed to fetch posts');
    }
    
      async function fetchPosts() {
        // ... (existing code remains the same)
        posts.forEach((post) => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.innerHTML = `
            <p>${post.content}</p>
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
          `;
          postFeed.appendChild(postElement);
        });
      }
  }
  async function editPost(postId) {
    const postElement = document.getElementById(`post-${postId}`);
    const existingContent = postElement.querySelector('p').innerText;
    const newContent = prompt('Edit your post:', existingContent);
    if (newContent !== null) {
      const response = await fetch(`/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      });
      if (response.ok) {
        fetchPosts();
      } else {
        alert('Failed to edit post');
      }
    }
  };
  
  // Fetch posts on page load
  fetchPosts();










