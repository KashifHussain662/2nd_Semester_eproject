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
    <a class="nav-link text-center text-light px-3" href="./Contact_us/index.html">Contact Us</a>
</li>
<li class="nav-item">
    <a class="nav-link text-light custom_btn btn btn-danger px-3" href="#" id="logout">Logout</a>
</li>
    `;

    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "./Login/index.html";
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const lawyerName = urlParams.get("name");
  const lawyerLocation = urlParams.get("location");
  const lawyerService = urlParams.get("service");
  const lawyerImg = urlParams.get("img");
  const lawyerId = urlParams.get("id");

  console.log("lawyerImg", lawyerImg);
  console.log("lawyerId :", lawyerId);

  document.getElementById("profileName").textContent = lawyerName;
  document.getElementById("profileLocation").textContent =
    "Location: " + lawyerLocation;
  document.getElementById("profileService").textContent =
    "Service: " + lawyerService;

  // Construct the correct path for the image
  const imgPath = `../${decodeURIComponent(lawyerImg)}`;
  console.log("Image path: ", imgPath);
  document.getElementById("profileImg").src = imgPath;

  document.getElementById("profileImg").addEventListener("error", function () {
    console.error("Error loading image at path: ", imgPath);
    document.getElementById("profileImg").alt = "Image not found";
  });

  document
    .getElementById("appointmentForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const clientName = document.getElementById("clientName").value;
      const clientEmail = document.getElementById("clientEmail").value;
      const meetingDate = document.getElementById("meetingDate").value;
      const meetingTime = document.getElementById("meetingTime").value;

      fetch("http://localhost/lawyers_Services/backend/book_meeting.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: clientName,
          client_email: clientEmail,
          meeting_date: meetingDate,
          meeting_time: meetingTime,
          lawyer_id: lawyerId, // Include lawyer ID in the request body
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Meeting booked successfully");
          } else {
            alert("Failed to book meeting: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error booking meeting:", error);
          alert("An error occurred. Please try again later.");
        });
    });
});
