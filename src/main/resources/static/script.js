const blogsContainer = document.getElementById("blogsContainer");
const blogFormSection = document.getElementById("blogFormSection");
const blogForm = document.getElementById("blogForm");
const showFormBtn = document.getElementById("showFormBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");

const apiUrl = "http://localhost:8080/api/blogs";

function fetchBlogs() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      blogsContainer.innerHTML = "";
      data.forEach(blog => {
        blogsContainer.innerHTML += `
          <div class="blog">
            <h3>${blog.title}</h3>
            <small>By ${blog.author} on ${blog.date}</small>
            <p>${blog.content}</p>
            <button onclick="editBlog(${blog.id})">Edit</button>
            <button onclick="deleteBlog(${blog.id})">Delete</button>
          </div>
        `;
      });
    });
}

blogForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("blogId").value;
  const blog = {
    author: document.getElementById("author").value,
    title: document.getElementById("title").value,
    content: document.getElementById("content").value,
    image: document.getElementById("image").value || "default",
    date: document.getElementById("date").value,
  };

  const method = id ? "PUT" : "POST";
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  }).then(() => {
    blogForm.reset();
    blogFormSection.classList.add("hidden");
    fetchBlogs();
  });
});

function deleteBlog(id) {
  fetch(`${apiUrl}/${id}`, { method: "DELETE" }).then(() => fetchBlogs());
}

function editBlog(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(blog => {
      blogFormSection.classList.remove("hidden");
      document.getElementById("blogId").value = blog.id;
      document.getElementById("author").value = blog.author;
      document.getElementById("title").value = blog.title;
      document.getElementById("content").value = blog.content;
      document.getElementById("image").value = blog.image;
      document.getElementById("date").value = blog.date;
      formTitle.textContent = "Edit Blog Post";
    });
}

showFormBtn.addEventListener("click", () => {
  blogFormSection.classList.remove("hidden");
  formTitle.textContent = "Create Blog Post";
  blogForm.reset();
});

cancelBtn.addEventListener("click", () => {
  blogFormSection.classList.add("hidden");
  blogForm.reset();
});

fetchBlogs();
