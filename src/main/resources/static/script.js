const API_URL = 'http://localhost:8080/api/blogs';

const blogForm = document.getElementById('blogForm');
const blogList = document.getElementById('blogList');
const blogIdInput = document.getElementById('blogId');
const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('image');
const dateInput = document.getElementById('date');
const submitBtn = document.getElementById('submitBtn');
const toggleFormBtn = document.getElementById('toggleFormBtn');

function fetchBlogs() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      blogList.innerHTML = '';
      data.reverse().forEach(blog => {
        const div = document.createElement('div');
        div.className = 'blog-card';

        div.innerHTML = `
          ${blog.image && blog.image !== 'default' ?
            `<img src="${blog.image}" alt="Blog image" class="blog-image"/>`
            : ''}
          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-content"><strong>Author:</strong> ${blog.author}</p>
          <p class="blog-content">${blog.content}</p>
          <p class="blog-content"><em>${blog.date}</em></p>
          <div class="actions">
            <button onclick="editBlog(${blog.id})">Edit</button>
            <button onclick="deleteBlog(${blog.id})">Delete</button>
          </div>
        `;
        blogList.appendChild(div);
      });
    });
}


function editBlog(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(blog => {
      // Pre-fill the form with the blog's current data
      blogIdInput.value = blog.id;
      authorInput.value = blog.author;
      titleInput.value = blog.title;
      contentInput.value = blog.content;
      imageInput.value = blog.image;
      dateInput.value = blog.date;
      submitBtn.textContent = 'Update Blog'; // Change button text
      blogForm.classList.remove('hidden');
    });
}

function deleteBlog(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => fetchBlogs());
}

blogForm.addEventListener('submit', e => {
  e.preventDefault();

  const blogData = {
    author: authorInput.value,
    title: titleInput.value,
    content: contentInput.value,
    image: imageInput.value || 'default',
    date: dateInput.value
  };

  // Check if we're updating or adding a new blog
  const method = blogIdInput.value ? 'PUT' : 'POST';
  const url = blogIdInput.value ? `${API_URL}/${blogIdInput.value}` : API_URL;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData)
  })
    .then(() => {
      // After successful submit or update, clear the form and refresh the blog list
      blogForm.reset();
      blogIdInput.value = '';
      submitBtn.textContent = 'Submit Blog'; // Reset the button text
      blogForm.classList.add('hidden');
      fetchBlogs(); // Refresh the blog list
    })
    .catch(err => {
      console.error('Error updating/creating blog:', err);
    });
});

toggleFormBtn.addEventListener('click', () => {
  blogForm.classList.toggle('hidden');
});

fetchBlogs();
