const postsContainer = document.getElementById('posts-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;

// Fetch posts
const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
};

// Populate in DOM
const showPosts = async () => {
  const posts = await getPosts();

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    postsContainer.appendChild(postElement);
  });
};

// Loading & fetch post
const loadAndFetchPosts = async () => {
  loading.classList.add('show');
  page++;
  await showPosts();
  loading.classList.remove('show');
};

// Filter posts by input
const filterPosts = event => {
  const keyword = event.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post
      .querySelector('.post-title')
      .innerText.toLowerCase();
    const body = post
      .querySelector('.post-body')
      .innerText.toLowerCase();

    if (title.indexOf(keyword) > -1 || body.indexOf(keyword) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
};

// Event listeners
window.addEventListener('DOMContentLoaded', showPosts);

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight
  ) {
    loadAndFetchPosts();
  }
});

filter.addEventListener('input', filterPosts);
