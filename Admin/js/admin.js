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
        <a class="nav-link text-light custom_btn px-3" href="#" id="logout">Logout</a>
      </li>
    `;

    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "../Login/index.html";
    });
  } else {
    userContainer.innerHTML = `<p></p>`;
  }
  // Fetch Lawyers Data
  fetch("http://localhost/lawyers_Services/backend/search.php")
    .then((response) => response.json())
    .then((data) => {
      let lawyersTable = document.getElementById("lawyersTable");
      lawyersTable.innerHTML = "";
      data.forEach((lawyer) => {
        let row = `<tr>
                    <td>${lawyer.id}</td>
                    <td>${lawyer.name}</td>
                    <td>${lawyer.email}</td>
                    <td>${lawyer.location}</td>
                    <td>${lawyer.service}</td>
                    <td>
                        <button class="custom_btn edit-lawyer" data-id="${lawyer.id}">Edit</button>
                        <button class="custom_btn delete-lawyer" data-id="${lawyer.id}">Delete</button>
                    </td>
                </tr>`;
        lawyersTable.innerHTML += row;
      });

      // Add event listeners for edit buttons
      document.querySelectorAll(".edit-lawyer").forEach((button) => {
        button.addEventListener("click", function () {
          let lawyerId = this.getAttribute("data-id");
          let lawyer = data.find((lawyer) => lawyer.id == lawyerId);
          document.getElementById("lawyerId").value = lawyer.id;
          document.getElementById("lawyerName").value = lawyer.name;
          document.getElementById("lawyerEmail").value = lawyer.email;
          document.getElementById("lawyerLocation").value = lawyer.location;
          document.getElementById("lawyerService").value = lawyer.service;
          $("#lawyerModal").modal("show");
        });
      });

      // Add event listeners for delete buttons
      document.querySelectorAll(".delete-lawyer").forEach((button) => {
        button.addEventListener("click", function () {
          if (confirm("Are you sure you want to delete this lawyer?")) {
            let lawyerId = this.getAttribute("data-id");
            fetch(
              "http://localhost/lawyers_Services/backend/delete_lawyer.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `id=${lawyerId}`,
              }
            )
              .then((response) => response.text())
              .then((data) => {
                alert(data);
                location.reload();
              })
              .catch((error) => console.error("Error deleting lawyer:", error));
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching lawyers data:", error));

  // Fetch Users Data
  fetch("http://localhost/lawyers_Services/backend/fetch_users.php")
    .then((response) => response.json())
    .then((data) => {
      let usersTable = document.getElementById("usersTable");
      usersTable.innerHTML = "";
      data.forEach((user) => {
        let row = `<tr>
                      <td>${user.id}</td>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td>
                          <button class="custom_btn edit-user" data-id="${user.id}">Edit</button>
                          <button class="custom_btn delete-user" data-id="${user.id}">Delete</button>
                      </td>
                  </tr>`;
        usersTable.innerHTML += row;
      });

      // Add event listeners for edit buttons
      document.querySelectorAll(".edit-user").forEach((button) => {
        button.addEventListener("click", function () {
          let userId = this.getAttribute("data-id");
          let user = data.find((user) => user.id == userId);
          document.getElementById("userId").value = user.id;
          document.getElementById("userName").value = user.name;
          document.getElementById("userEmail").value = user.email;
          $("#userModal").modal("show");
        });
      });

      // Add event listeners for delete buttons
      document.querySelectorAll(".delete-user").forEach((button) => {
        button.addEventListener("click", function () {
          if (confirm("Are you sure you want to delete this user?")) {
            let userId = this.getAttribute("data-id");
            fetch("http://localhost/lawyers_Services/backend/delete_user.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `id=${userId}`,
            })
              .then((response) => response.text())
              .then((data) => {
                alert(data);
                location.reload();
              })
              .catch((error) => console.error("Error deleting user:", error));
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching users data:", error));

  // Save Lawyer
  document
    .getElementById("lawyerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let lawyerId = document.getElementById("lawyerId").value;
      let name = document.getElementById("lawyerName").value;
      let email = document.getElementById("lawyerEmail").value;
      let location = document.getElementById("lawyerLocation").value;
      let service = document.getElementById("lawyerService").value;

      fetch("http://localhost/lawyers_Services/backend/update_lawyer.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${lawyerId}&name=${name}&email=${email}&location=${location}&service=${service}`,
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          location.reload();
        })
        .catch((error) => console.error("Error updating lawyer:", error));
    });

  // Save User
  document
    .getElementById("userForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let userId = document.getElementById("userId").value;
      let name = document.getElementById("userName").value;
      let email = document.getElementById("userEmail").value;

      fetch("http://localhost/lawyers_Services/backend/update_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${userId}&name=${name}&email=${email}`,
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          location.reload();
        })
        .catch((error) => console.error("Error updating user:", error));
    });
});
