// // window.addEventListener("load", function () {
// //   const form = document.getElementById("my-form");
// //   form.addEventListener("submit", function (e) {
// //     e.preventDefault();
// //     const data = new FormData(form);
// //     const action = e.target.action;
// //     fetch(action, {
// //       method: "POST",
// //       body: data,
// //     }).then(() => {
// //       alert("Success!");
// //     });
// //   });
// // });

// window.addEventListener("load", function () {
//   const form = document.getElementById("myForm");
//   const submitButton = document.getElementById("submitButton");

//   submitButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     const data = new FormData(form);
//     const action = form.action;

//     // Check if the form is valid before submitting
//     if (form.checkValidity()) {
//       fetch(action, {
//         method: "POST",
//         body: data,
//       })
//         .then(() => {
//           Swal.fire({
//             icon: "success",
//             title: "Success!",
//             text: "Form submitted successfully.",
//           });
//         })
//         .catch(() => {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "An error occurred while submitting the form.",
//           });
//         });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Form",
//         text: "Please fill in all required fields.",
//       });
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   // This button will increment the value
//   var plusButtons = document.querySelectorAll('[data-quantity="plus"]');
//   plusButtons.forEach(function (button) {
//     button.addEventListener("click", function (e) {
//       e.preventDefault();
//       // Get the field name
//       var fieldName = this.getAttribute("data-field");
//       // Get its current value
//       var inputField = document.querySelector(
//         'input[name="' + fieldName + '"]'
//       );
//       var currentVal = parseInt(inputField.value);
//       // If it is not undefined
//       if (!isNaN(currentVal)) {
//         // Increment
//         inputField.value = currentVal + 1;
//       } else {
//         // Otherwise put a 0 there
//         inputField.value = 0;
//       }
//     });
//   });

//   // This button will decrement the value till 0
//   var minusButtons = document.querySelectorAll('[data-quantity="minus"]');
//   minusButtons.forEach(function (button) {
//     button.addEventListener("click", function (e) {
//       e.preventDefault();
//       // Get the field name
//       var fieldName = this.getAttribute("data-field");
//       // Get its current value
//       var inputField = document.querySelector(
//         'input[name="' + fieldName + '"]'
//       );
//       var currentVal = parseInt(inputField.value);
//       // If it isn't undefined or it's greater than 0
//       if (!isNaN(currentVal) && currentVal > 1) {
//         // Decrement one
//         inputField.value = currentVal - 1;
//       } else {
//         // Otherwise put a 0 there
//         inputField.value = 1;
//       }
//     });
//   });
// });

window.addEventListener("load", function () {
  const form = document.getElementById("myForm");
  const submitButton = document.getElementById("submitButton");
  const plusMinusInput = document.querySelector(".plus-minus-input");

  // Function to handle button selection and show/hide plus-minus input
  function handleButtonSelection() {
    const selectedButton = document.querySelector(
      ".inline-buttons button.selected"
    );
    if (selectedButton) {
      const buttonValue = selectedButton.getAttribute("data-value");
      const amountInvitedInput = document.querySelector(
        'input[name="Amount Invited"]'
      );
      const areYouComing = document.querySelector(".invitation-amount");

      // Check if the selected button is "מגיע" (yes)
      if (buttonValue === "yes") {
        plusMinusInput.style.display = "flex";
        plusMinusInput.style.justifyContent = "center";
        plusMinusInput.style.alignItems = "center";
        areYouComing.style.display = "block";
        amountInvitedInput.value = 1;
      } else {
        plusMinusInput.style.display = "none";
        areYouComing.style.display = "none";
        // Set the value of "Amount Invited" to 0
        amountInvitedInput.value = 0;
      }
    }
  }

  // Add click event listeners to the buttons for selection
  var buttons = document.querySelectorAll(".inline-buttons button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      buttons.forEach(function (btn) {
        btn.classList.remove("selected");
      });
      this.classList.add("selected");
      handleButtonSelection(); // Call the function to show/hide plus-minus input
    });
  });

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = form.action;

    // Add the selected button value to the form data
    const selectedButton = document.querySelector(
      ".inline-buttons button.selected"
    );
    if (selectedButton) {
      const buttonName = selectedButton.getAttribute("name");
      const buttonValue = selectedButton.getAttribute("data-value");
      data.append(buttonName, buttonValue);
    } else {
      // No button is selected, prevent form submission
      Swal.fire({
        icon: "error",
        title: "Button not selected",
        text: "Please select a button option.",
      });
      return;
    }

    // Check if the form is valid before submitting
    if (form.checkValidity()) {
      fetch(action, {
        method: "POST",
        body: data,
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Form submitted successfully.",
          });

          // // Log form output to the console
          // console.log("Form Output:");
          // for (let pair of data.entries()) {
          //   console.log(pair[0] + ": " + pair[1]);
          // }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while submitting the form.",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Form",
        text: "Please fill in all required fields.",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // This button will increment the value
  var plusButtons = document.querySelectorAll('[data-quantity="plus"]');
  plusButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Get the field name
      var fieldName = this.getAttribute("data-field");
      // Get its current value
      var inputField = document.querySelector(
        'input[name="' + fieldName + '"]'
      );
      var currentVal = parseInt(inputField.value);
      // If it is not undefined
      if (!isNaN(currentVal)) {
        if (currentVal === 15) {
          currentVal = currentVal;
        } else {
          // Increment
          inputField.value = currentVal + 1;
        }
      } else {
        // Otherwise put a 0 there
        inputField.value = 0;
      }
    });
  });

  // This button will decrement the value till 1
  var minusButtons = document.querySelectorAll('[data-quantity="minus"]');
  minusButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Get the field name
      var fieldName = this.getAttribute("data-field");
      // Get its current value
      var inputField = document.querySelector(
        'input[name="' + fieldName + '"]'
      );
      var currentVal = parseInt(inputField.value);
      // If it isn't undefined or it's greater than 1
      if (!isNaN(currentVal) && currentVal > 1) {
        // Decrement one
        inputField.value = currentVal - 1;
      } else {
        // Otherwise put a 1 there
        inputField.value = 1;
      }
    });
  });

  // Add click event listeners to the buttons for selection
  var buttons = document.querySelectorAll(".inline-buttons button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      buttons.forEach(function (btn) {
        btn.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });
});
