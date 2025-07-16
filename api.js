async function fetchUsers() {
  const res = await fetch("/api/top");
  const data = await res.json();
  const topUsers = data.topUsers;

  const container = document.getElementById("users");
  container.innerHTML = "";

  topUsers.forEach((user, i) => {
    container.innerHTML += `
      <div class="user">
        <strong>#${i + 1} @${user.username}</strong><br>
        Followers: ${user.followers}<br>
        ${user.bio}<br>
        <a href="${user.profile}" target="_blank">Lihat Profil</a>
      </div>
    `;
  });
}

fetchUsers();
