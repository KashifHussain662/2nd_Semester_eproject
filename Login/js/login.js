document.addEventListener("DOMContentLoaded", function () {
  // Toastr initialization (optional, depending on your settings)
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

    var formData = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };

    fetch("http://192.168.1.6/lawyer_services/backend/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
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
          }, 1500); // Delay of 1.5 seconds
        } else {
          toastr.error(data.message, "Login Error");
        }
      })
      .catch((error) => {
        toastr.error(
          "Something went wrong. Please try again later.",
          "Login Error"
        );
      });
  });
});
