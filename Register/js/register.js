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

  const roleField = document.getElementById("registerRole");
  const lawyerDetails = document.getElementById("lawyerDetails");

  roleField.addEventListener("change", function () {
    if (roleField.value === "lawyer") {
      lawyerDetails.style.display = "block";
    } else {
      lawyerDetails.style.display = "none";
    }
  });

  document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData();
      formData.append("name", document.getElementById("registerName").value);
      formData.append("email", document.getElementById("registerEmail").value);
      formData.append(
        "password",
        document.getElementById("registerPassword").value
      );
      formData.append("role", document.getElementById("registerRole").value);
      formData.append("img", document.getElementById("registerImg").files[0]);

      if (document.getElementById("registerRole").value === "lawyer") {
        formData.append(
          "location",
          document.getElementById("registerLocation").value
        );
        formData.append(
          "service",
          document.getElementById("registerService").value
        );
      }

      fetch("http://192.168.1.6/lawyer_services/backend/register.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text()) // Use text() to handle non-JSON responses
        .then((text) => {
          try {
            const data = JSON.parse(text); // Try to parse JSON
            if (data.status === "success") {
              toastr.success("Registration successful!", "Success");
              setTimeout(function () {
                window.location.href = "../login/index.html";
              }, 1500);
            } else {
              toastr.error(
                "Registration failed: " + data.message,
                "Registration Error"
              );
            }
          } catch (error) {
            console.error("Non-JSON response:", text); // Log non-JSON response
            toastr.error("An error occurred. Please try again later.", "Error");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          toastr.error("An error occurred. Please try again later.", "Error");
        });
    });
});
