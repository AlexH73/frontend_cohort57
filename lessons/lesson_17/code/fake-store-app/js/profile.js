const heading = document.getElementById("heading");
const img = document.getElementById("avatar");
const emailEl = document.getElementById("email");
const roleEl = document.getElementById("role");

async function fetchProfile() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await res.json();
  console.log(user);
  const { avatar, email, name, role } = user;
  heading.textContent = name;
  img.src = avatar;
  img.alt = `Avatar of ${name}`;
  img.title = `Avatar of ${name}`;
  onerror = () => {
    img.src = "../../../../../assets/images/avatar-placeholder.png";
    img.alt = "Placeholder avatar";
    img.title = "Placeholder avatar";
  };
  emailEl.textContent = email;
  roleEl.textContent = role;
}

fetchProfile();

// https://api.escuelajs.co/api/v1/auth/profile
//Authorization: Bearer {your_access_token}
