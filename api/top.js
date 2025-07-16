export default async function handler(req, res) {
  const response = await fetch("https://api.neynar.com/v2/farcaster/feed/global", {
    headers: {
      accept: "application/json",
      api_key: "NEYNAR_API_DOCS", // Pakai key gratis
    },
  });

  const data = await response.json();

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

  res.status(200).json({ topUsers });
}
