document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  const reviewBox = document.querySelector(".review_box");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const bookTitle = document.getElementById("bookTitle").value.trim();
    const rating = parseInt(document.getElementById("rating").value);
    const comment = document.getElementById("comment").value.trim();
    const imageInput = document.getElementById("profilePic");

    if (!name || !bookTitle || isNaN(rating) || rating < 1 || rating > 5 || !comment) {
      alert("Please fill out all fields correctly (rating between 1 and 5)!");
      return;
    }

    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        createReviewCard(name, bookTitle, rating, comment, event.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      createReviewCard(
        name,
        bookTitle,
        rating,
        comment,
        "pictures/people_default.jpg"
      );
    }

    form.reset();
    showThankYouPopup();
  });

  function generateStars(count) {
    let stars = "";
    for (let i = 0; i < count; i++) {
      stars += `<i class="fa-solid fa-star"></i>`;
    }
    for (let i = count; i < 5; i++) {
      stars += `<i class="fa-regular fa-star"></i>`;
    }
    return stars;
  }

function createReviewCard(name, bookTitle, rating, comment, imgSrc) {
  const reviewCard = document.createElement("div");
  reviewCard.className = "review_card";

  reviewCard.innerHTML = `
    <div class="review_profile">
      <img src="${imgSrc}" alt="Profile Picture" style="height:250px; width:260px; object-fit: cover; border-radius: 50%;" />
    </div>
    <h2 style="font-family: mv boli; margin: 10px 0 5px;">${name}</h2>
    <div class="review_icon">
      ${generateStars(rating)}
    </div>
    <h5 style = "padding-top : 20px;"><b>Book Name : </b>${bookTitle}</h5>
    <p style="font-family: mv boli; color : black; text-align : center; justify-content : center;  align-items: center;">${comment}</p>
    <button class="delete-btn" style="
      margin-top: 10px;
      background: crimson;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    ">Delete</button>
  `;

  reviewCard.querySelector(".delete-btn").addEventListener("click", () => {
    reviewCard.remove();
  });

  reviewBox.appendChild(reviewCard);
}


  function showThankYouPopup() {
    const popup = document.createElement("div");
    popup.className = "thank-you-popup";
    popup.innerText = "Thank you for your review!";

    Object.assign(popup.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "rgba(200, 27, 166, 0.8)",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
    });

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 3000);
  }
});
