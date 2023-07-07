document.addEventListener("DOMContentLoaded", postlisting());
const postlist = document.getElementById("postslist");

async function postlisting() {
  const response = await fetch("http://localhost:3000/api/posts");
  const data = await response.json();
  postlist.innerHTML = data.allPosts
    .map((post) => {
      return `
        <section class = "postbox" onclick="movetodetail()">
          <h3>${post.title}</h3>
          <p>${post.nickname}</p>
          <p>${post.content.substr(0, 20)}...</p>
        </section>
            `;
    })
    .join("");
}

function movetodetail() {
  location.href = "http://localhost:3000/html/detail.html";
}
