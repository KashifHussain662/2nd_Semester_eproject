document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("user");
  let userData = null;

  if (user && user !== "undefined") {
    try {
      userData = JSON.parse(user);
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  } else {
    console.warn("No user data found in local storage.");
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const lawyerId = userData.id;
  console.log("lawyerId:", lawyerId);

  fetch("http://192.168.1.6/lawyer_services/backend/fetch_appointments.php", {
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
