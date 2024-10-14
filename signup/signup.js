const card = document.getElementById("signup-box");

card.addEventListener("mousemove", function (e) {
  const cardRect = card.getBoundingClientRect();
  const mouseX = e.clientX - cardRect.left;
  const mouseY = e.clientY - cardRect.top;

  // Determine which side the mouse is closest to
  const topSide = mouseY;
  const bottomSide = cardRect.height - mouseY;
  const leftSide = mouseX;
  const rightSide = cardRect.width - mouseX;

  // Find the minimum distance to any side
  const minDistance = Math.min(topSide, bottomSide, leftSide, rightSide);

  // Reset transform first
  card.style.transform = "perspective(1000px)";

  // Add transformation based on side
  if (minDistance === topSide) {
    card.style.transform += " translateY(-10px) rotateX(-5deg)";
  } else if (minDistance === bottomSide) {
    card.style.transform += " translateY(10px) rotateX(5deg)";
  } else if (minDistance === leftSide) {
    card.style.transform += " translateX(-10px) rotateY(-5deg)";
  } else if (minDistance === rightSide) {
    card.style.transform += " translateX(10px) rotateY(5deg)";
  }
});

// Sweet alert
function showNotification(message) {
  Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 2000
  });
}

function showNotificationError(message){
  Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
}

card.addEventListener("mouseleave", function () {
  // Reset the card when the cursor leaves
  card.style.transform = "perspective(1000px)";
});


document.querySelector(".signup-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const username = document.querySelector(
    '.signup-form input[type="text"]'
  ).value;
  const email = document.querySelector(
    '.signup-form input[type="email"]'
  ).value;
  const password = document.querySelector(
    '.signup-form input[type="password"]'
  ).value;

  // Validate if all fields are filled
  if (username && email && password) {
    const userData = {
      username: username,
      email: email,
      password: password,
    };

    // Get existing users from local storage, or initialize an empty array if none exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the array of existing users
    existingUsers.push(userData);

    // Save the updated users array back to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // alert("We are happy to have you as a new customer!");
    showNotification('We are happy to have you as a new customer!');

    // Redirect to the home page
    setTimeout(() => {
      window.location.assign("../index.html"); // Change this to your desired home page
  }, 5000);
  } else {
    // alert("Please fill in all fields.");
    showNotificationError("Please fill in all fields.")
  }

  document.querySelector(".signup-form").reset(); // Clear the form fields
});

// password toggle feature
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");
  
  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
  } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
  }
}
