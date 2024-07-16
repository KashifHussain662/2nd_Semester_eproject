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
  const lawyerId = userData.id;

  const userContainer = document.getElementById("userContainer");
  if (userData) {
    userContainer.innerHTML = `
      <h1>${userData.name}</h1>
      <p>${userData.email}</p>
    `;

    const navbarNavItems = document.getElementById("navbarNavItems");
    navbarNavItems.innerHTML = `
        <li class="nav-item">
    <a class="nav-link text-center text-light px-3" href="./About_us/index.html">About Us</a>
</li>
<li class="nav-item">
    <a class="nav-link text-center text-light px-3" href="./Contact_us/index.html">Contact Us</a>
</li>
<li class="nav-item">
    <a class="nav-link text-light custom_btn btn btn-danger px-3" href="#" id="logout">Logout</a>
</li>
    `;

    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "../Login/index.html";
    });
  } else {
    userContainer.innerHTML = `<p>No user data found. Please log in.</p>`;
  }

  fetch("http://192.168.1.6/lawyers_Services/backend/fetch_appointments.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lawyer_id: lawyerId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received from server:", data);
      if (data.status === "error") {
        alert(data.message);
        return;
      }

      const tableBody = document
        .getElementById("appointmentsTable")
        .querySelector("tbody");
      tableBody.innerHTML = "";
      data.forEach((appointment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.client_name}</td>
                <td>${appointment.client_email}</td>
                <td>${appointment.meeting_date}</td>
                <td>${appointment.meeting_time}</td>
            `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching appointments:", error);
    });
});
