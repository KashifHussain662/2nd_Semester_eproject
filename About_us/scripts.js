document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("user");
  let userData = null;

  console.log("User data from local storage:", user);

  if (user && user !== "undefined") {
    try {
      userData = JSON.parse(user);
      console.log("Parsed user data:", userData);
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  } else {
    console.warn("No user data found in local storage.");
  }

  const userContainer = document.getElementById("userContainer");
  if (userData) {
    const navbarNavItems = document.getElementById("navbarNavItems");
    navbarNavItems.innerHTML = `
       <li class="nav-item">
      <a class="nav-link text-center text-light px-3" href="./About_us/index.html">About Us</a>
  </li>
  <li class="nav-item">
      <a class="nav-link text-center text-light px-3" href="../Contact_us/index.html">Contact Us</a>
  </li>
  <li class="nav-item">
      <a class="nav-link text-light custom_btn btn btn-danger px-3" href="#" id="logout">Logout</a>
  </li>
  
  
      `;

    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "./Login/index.html";
    });
  } else {
    userContainer.innerHTML = `<p></p>`;
  }
});
