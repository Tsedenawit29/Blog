const API_URL = 'http://localhost:8080/blogs';

const blogForm = document.getElementById('blogForm');
const blogList = document.getElementById('blogList');
const blogIdInput = document.getElementById('blogId');
const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('image');
const submitBtn = document.getElementById('submitBtn');

function fetchBlogs() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      blogList.innerHTML = '';
      data.forEach(blog => {
        const div = document.createElement('div');
        div.className = 'blog-card';
        div.innerHTML = `
          <h3>${blog.title}</h3>
          <p><strong>Author:</strong> ${blog.author}</p>
          <p>${blog.content}</p>
          ${blog.image && blog.image !== 'default' ? `<img src="${blog.image}" alt="Blog image" />` : ''}
          <p><em>${blog.date}</em></p>
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
      blogIdInput.value = blog.id;
      authorInput.value = blog.author;
      titleInput.value = blog.title;
      contentInput.value = blog.content;
      imageInput.value = blog.image;
      submitBtn.textContent = 'Update Blog';
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
    date: new Date().toLocaleDateString()
  };

  const method = blogIdInput.value ? 'PUT' : 'POST';
  const url = blogIdInput.value ? `${API_URL}/${blogIdInput.value}` : API_URL;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData)
  })
    .then(() => {
      blogForm.reset();
      blogIdInput.value = '';
      submitBtn.textContent = 'Post Blog';
      fetchBlogs();
    });
});

fetchBlogs();
