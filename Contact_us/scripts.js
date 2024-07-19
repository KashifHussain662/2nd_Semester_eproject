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
        <a class="nav-link text-center text-light px-3" href="../About_us/index.html">About Us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-center text-light px-3 nav-link-active" href="./index.html">Contact Us</a>
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
    userContainer.innerHTML = `<p></p>`;
  }

  // Contact Form Submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const loaderContainer = document.getElementById("loader-container");
      loaderContainer.style.display = "flex";

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      fetch("http://192.168.1.6/lawyers_Services/backend/contact_form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          loader.style.display = "none";
          if (data.success) {
            setTimeout(() => {
              loaderContainer.style.display = "none";
              toastr.success("Message sent successfully!", "Success");

              document.getElementById("contactForm").reset();
              document.getElementById("successMessage").style.display = "block";
            }, 2000);
          } else {
            toastr.error(
              "There was an error sending your message. Please try again.",
              "Error"
            );
          }
        })
        .catch((error) => {
          loader.style.display = "none";
          toastr.error(
            "There was an error sending your message. Please try again.",
            "Error"
          );
        });
    });

  // Toastr configuration for top center position
  toastr.options = {
    positionClass: "toast-top-center",
    closeButton: true,
    progressBar: true,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
});
