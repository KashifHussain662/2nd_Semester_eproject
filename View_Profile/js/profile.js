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

  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "slideDown",
    hideMethod: "slideUp",
  };

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
      window.location.href = "../Login/index.html";
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

      if (!userData) {
        toastr.error("You must be logged in to book an appointment.", "Error");
        setTimeout(function () {
          window.location.href = "../Login/index.html";
        }, 1500);
        return;
      }

      const clientName = document.getElementById("clientName").value;
      const clientEmail = document.getElementById("clientEmail").value;
      const meetingDate = document.getElementById("meetingDate").value;
      const meetingTime = document.getElementById("meetingTime").value;

      // Show loader while waiting for the response
      var loader = document.getElementById("loader");
      loader.style.display = "block";

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
          lawyer_id: lawyerId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toastr.success("Meeting booked successfully", "Success");

            // Hide form and show success message
            document.getElementById("appointmentForm").style.display = "none";
            document.getElementById("successMessage").style.display = "block";
          } else {
            toastr.error("Failed to book meeting: " + data.message, "Error");
          }
        })
        .catch((error) => {
          console.error("Error booking meeting:", error);
          toastr.error("An error occurred. Please try again later.", "Error");
        })
        .finally(() => {
          // Hide loader regardless of success or failure
          loader.style.display = "none";
        });
    });
});
