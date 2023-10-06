const userListEl = document.querySelector(".user-list");

async function main() {
  try {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersData = await users.json();
    userListEl.innerHTML = usersData.map((user) => userHTML(user)).join("");
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

function showUserPosts(id) {
  localStorage.setItem("id", id);
  window.location.href = "post.html";
}const postListEl = document.querySelector('.post-list');

async function onSearchChange(event) {
    const id = event.target.value;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const postsData = await response.json();
        console.log(postsData);

        postListEl.innerHTML = postsData.map(post => `
            <div class="post">
                <div class="post__title">
                    ${post.title}
                </div>
                <p class="post__body">
                    ${post.body}
                </p>
            </div>`
        ).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function main() {
    try {
        const id = localStorage.getItem('id');
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const postsData = await response.json();
        console.log(postsData);

        postListEl.innerHTML = postsData.map(post => `
            <div class="post">
                <div class="post__title">
                    ${post.title}
                </div>
                <p class="post__body">
                    ${post.body}
                </p>
            </div>`
        ).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();


function userHTML(user) {
  return `<div class="user-card" onclick="showUserPosts(${user.id})">
    <div class="user-card__container">
        <h3>${user.name}</h3>
        <p><b>Email:</b>${user.email}</p>
        <p><b>Phone:</b> ${user.phone}</p>
        <p><b>Website:</b> <a href="https://${user.website}" target="_blank">
        ${user.website}</a></p>
    </div>
    </div>`;
}

main();
