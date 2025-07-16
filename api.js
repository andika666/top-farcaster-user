async function fetchUsers() {
  const res = await fetch("https://api.neynar.com/v2/farcaster/feed/global", {
    headers: {
      accept: "application/json",
      api_key: "NEYNAR_API_DOCS",
    },
  });
  const data = await res.json();

  const usersMap = {};
  for (let cast of data.casts) {
    const user = cast.author;
    if (!usersMap[user.fid]) {
      usersMap[user.fid] = {
        username: user.username,
        followers: user.followingCount,
        profile: `https://warpcast.com/${user.username}`,
        bio: user.profile?.bio?.text || "",
        count: 1,
      };
    } else {
      usersMap[user.fid].count++;
    }
  }

  const topUsers = Object.values(usersMap)
    .sort((a, b) => b.count - a.count || b.followers - a.followers)
    .slice(0, 5);

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
