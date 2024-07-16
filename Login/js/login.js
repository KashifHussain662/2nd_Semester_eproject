document.addEventListener("DOMContentLoaded", function () {
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

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelector(".loader-container").style.display = "flex";

    var formData = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };

    // Show loader for at least 3-4 seconds
    const MINIMUM_LOADING_TIME = 4000;
    const startTime = Date.now();

    fetch("http://localhost/lawyers_Services/backend/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MINIMUM_LOADING_TIME - elapsedTime;

        setTimeout(() => {
          document.querySelector(".loader-container").style.display = "none";
          if (data.status === "success") {
            localStorage.setItem("user", JSON.stringify(data.user));
            toastr.success("Login successful!", "Success");
            setTimeout(function () {
              const user = JSON.parse(localStorage.getItem("user"));
              if (user.role === "customer") {
                window.location.href = "../index.html";
              } else if (user.role === "lawyer") {
                window.location.href = "../Lawyer/index.html";
              } else {
                window.location.href = "../index.html";
              }
            }, 1500);
          } else {
            toastr.error(data.message, "Login Error");
          }
        }, Math.max(0, remainingTime));
      })
      .catch((error) => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MINIMUM_LOADING_TIME - elapsedTime;

        setTimeout(() => {
          document.querySelector(".loader-container").style.display = "none";
          toastr.error(
            "Something went wrong. Please try again later.",
            "Login Error"
          );
        }, Math.max(0, remainingTime));
      });
  });
});
