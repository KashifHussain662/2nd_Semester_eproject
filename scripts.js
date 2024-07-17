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
    userContainer.innerHTML = `
      <h3>Welcome, ${userData.name}</h3>
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
      window.location.href = "./Login/index.html";
    });
  } else {
    userContainer.innerHTML = `<p></p>`;
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

  // ScrollReveal animations
  ScrollReveal().reveal(".reveal-left", {
    origin: "left",
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".reveal-right", {
    origin: "right",
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".reveal-top", {
    origin: "top",
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
  });

  document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      if (!userData) {
        toastr.error("You must be logged in to book an appointment.", "Error");
        setTimeout(function () {
          window.location.href = "./Login/index.html";
        }, 3500);
        return;
      }

      const location = document.getElementById("location").value.toLowerCase();
      const services = document.getElementById("services").value.toLowerCase();

      document.querySelector(".loader-container").style.display = "flex"; // Show loader

      fetch("http://localhost/lawyers_Services/backend/search.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, services }),
      })
        .then((response) => response.json())
        .then((results) => {
          const resultsContainer = document.getElementById("lawyerResults");
          resultsContainer.innerHTML = "";

          const filteredResults = results.filter((result) => {
            return (
              (location === "" || result.location.includes(location)) &&
              (services === "" || result.service === services)
            );
          });

          console.log(results);

          if (filteredResults.length === 0) {
            const noResultsMessage = document.createElement("h1");
            noResultsMessage.classList.add("text-light");
            noResultsMessage.textContent =
              "No lawyers available for the selected criteria.";
            resultsContainer.appendChild(noResultsMessage);
          } else {
            filteredResults.slice(0, 3).forEach((result) => {
              const card = document.createElement("div");
              card.classList.add("col-md-4");
              card.innerHTML = `
              <div class="card custom_card">
                <img src="${
                  result.img
                }" style="width: 348px; height: 270px;" class="card-img-top" alt="${
                result.name
              }">
                <div class="card-body">
                  <h5 class="card-title">${result.name}</h5>
                  <p class="card-text">Location: ${result.location}</p>
                  <p class="card-text">Service: ${result.service}</p>
                  <a href="./View_Profile/index.html?name=${encodeURIComponent(
                    result.name
                  )}&location=${encodeURIComponent(
                result.location
              )}&service=${encodeURIComponent(
                result.service
              )}&img=${encodeURIComponent(result.img)}&id=${encodeURIComponent(
                result.id
              )}" class="custom_btn p-2">View Profile</a>
                </div>
              </div>
            `;
              resultsContainer.appendChild(card);
            });

            // Store all results in localStorage to access them on allResults.html page
            localStorage.setItem(
              "searchResults",
              JSON.stringify(filteredResults)
            );

            // Add "View All Results" button
            if (filteredResults.length > 3) {
              const viewAllButton = document.createElement("a");
              viewAllButton.classList.add("custom_btn", "mt-4", "self-center");
              viewAllButton.href = "./allResults.html";
              viewAllButton.textContent = "View All Results";
              resultsContainer.appendChild(viewAllButton);
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toastr.error("An error occurred. Please try again later.", "Error");
        })
        .finally(() => {
          setTimeout(() => {
            document.querySelector(".loader-container").style.display = "none"; // Hide loader
          }, 500); // Delay of 0.5 seconds
        });
    });
});
