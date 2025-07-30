document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("otpLoginForm");
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const otpSection = document.getElementById("otpSection");
  const errorBox = document.getElementById("login-error");

  let loginPayload = {};

  sendOtpBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!username || !password || !phone) {
      errorBox.textContent = "Please fill all fields.";
      return;
    }

    try {
      const res = await fetch("/api/admin/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, phone }),
      });

      const result = await res.json();

      if (res.ok) {
        errorBox.style.color = "green";
        errorBox.textContent = result.message;
        otpSection.style.display = "block";
        loginPayload = { username, phone }; // save for final verification
      } else {
        errorBox.style.color = "red";
        errorBox.textContent = result.message;
      }
    } catch (err) {
      errorBox.textContent = "Server error.";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const otp = document.getElementById("otp").value.trim();

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...loginPayload, otp }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", result.token);
        window.location.href = "admin-dashboard.html";
      } else {
        errorBox.textContent = result.message;
      }
    } catch (err) {
      errorBox.textContent = "Server error.";
    }
  });
});
