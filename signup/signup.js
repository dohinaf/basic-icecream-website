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

    alert("We are happy to have you as a new customer!");

    // Redirect to the home page
    window.location.assign("../index.html"); // Change this to your desired home page
  } else {
    alert("Please fill in all fields.");
  }

  document.querySelector(".signup-form").reset(); // Clear the form fields
});

document.querySelector('.signup-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // You can add form validation or any other logic here

  // Redirect to profile.html
  window.location.href = '../profile.html';
});