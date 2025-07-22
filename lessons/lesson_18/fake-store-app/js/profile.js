const heading = document.getElementById("heading");
const img = document.getElementById("avatar");
const emailEl = document.getElementById("email");

async function fetchProfile() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await res.json();
  console.log(user);
  const { avatar, email, name } = user;
  heading.textContent = name;
  img.src = avatar;
  emailEl.textContent = email;
}

fetchProfile();
