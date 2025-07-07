// auth.js
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const auth = getAuth();

window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  if (!email || !password) {
    errorBox.textContent = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userEmail = userCredential.user.email;
      if (userEmail.includes("admin")) {
        window.location.href = "dashboard.html?role=admin";
      } else {
        window.location.href = "dashboard.html?role=user";
      }
    })
    .catch((error) => {
      errorBox.textContent = "Sai tài khoản hoặc mật khẩu.";
      console.error(error);
    });
};
