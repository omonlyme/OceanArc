document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://your-infinityfree-domain.epizy.com/api/posts');
    const posts = await response.json();
    
    const blogGrid = document.getElementById('blogPosts');
    if (blogGrid) {
      blogGrid.innerHTML = posts.map(post => `
        <article class="blog-post">
          <img src="${post.image}" alt="${post.title}">
          <div class="blog-content">
            <h2>${post.title}</h2>
            <p class="post-date">${new Date(post.date).toLocaleDateString()}</p>
            <p>${post.excerpt}</p>
            <a href="blog-single.html?id=${post.id}" class="btn">Read More</a>
          </div>
        </article>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    document.getElementById('blogPosts').innerHTML = `
      <div class="error-message">
        <p>Unable to load blog posts at this time. Please try again later.</p>
      </div>
    `;
  }
});