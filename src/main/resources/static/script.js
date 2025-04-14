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
      blogList.innerHTML = ''; // Clear the current list before adding new blogs
      data.reverse().forEach(blog => {
        const div = document.createElement('div');
        div.className = 'blog-card';
        div.innerHTML = `
          <h3>${blog.title}</h3>
          <p><strong>Author:</strong> ${blog.author}</p>
          ${blog.image && blog.image !== 'default' ? `<img src="${blog.image}" alt="Blog image"/>` : ''}
          <p class="date">${blog.date}</p>
          <p>${blog.content}</p>
          <div class="actions">
            <button onclick="editBlog(${blog.id})">Edit</button>
            <button onclick="deleteBlog(${blog.id})">Delete</button>
          </div>
        `;
        blogList.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error fetching blogs:', error);
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
      dateInput.value = blog.date; // Set the date input for editing
      submitBtn.textContent = 'Update Blog'; // Change button text to "Update Blog"
      blogForm.classList.remove('hidden'); // Show form
    });
}

function deleteBlog(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => fetchBlogs()); // Re-fetch blogs after deletion
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

  const method = blogIdInput.value ? 'PUT' : 'POST';
  const url = blogIdInput.value ? `${API_URL}/${blogIdInput.value}` : API_URL;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData)
  })
    .then(() => {
      blogForm.reset(); // Reset form
      blogIdInput.value = ''; // Clear hidden input
      submitBtn.textContent = 'Submit Blog'; // Reset button text
      blogForm.classList.add('hidden'); // Hide form again
      fetchBlogs(); // Re-fetch to display updated list
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

toggleFormBtn.addEventListener('click', () => {
  blogForm.classList.toggle('hidden');
});

fetchBlogs(); // Initial fetch of blogs
