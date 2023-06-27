window.addEventListener("load", function () {
  const form = document.getElementById("myForm");
  const submitButton = document.getElementById("submitButton");
  const plusMinusInput = document.querySelector(".plus-minus-input");

  // Function to handle button selection and show/hide plus-minus input
  function handleButtonSelection() {
    const selectedButton = document.querySelector(
      '.inline-buttons input[name="Coming"]:checked'
    );
    // get the Side button data
    const sideButton = document.querySelector('.which-side input[name="Side"]');
    const amountInvitedInput = document.querySelector(
      'input[name="Amount Invited"]'
    );
    const areYouComing = document.querySelector(".invitation-amount");

    // Check if the selected button is "מגיע" (yes)
    if (selectedButton.id === "btnradio5") {
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
  // }

  // Add click event listeners to the buttons for selection
  var radioInputs = document.querySelectorAll(
    '.inline-buttons input[name="Coming"]'
  );
  radioInputs.forEach(function (input) {
    input.addEventListener("click", function (e) {
      radioInputs.forEach(function (radio) {
        radio.parentNode.classList.remove("selected");
      });
      this.parentNode.classList.add("selected");
      handleButtonSelection(); // Call the function to show/hide plus-minus input
    });
  });
  // });

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = form.action;

    // Add the selected button value to the form data
    const selectedButton = document.querySelector(
      '.inline-buttons input[name="Coming"]:checked'
    );
    if (selectedButton) {
      const buttonName = selectedButton.getAttribute("name");
      const buttonValue = selectedButton.getAttribute("value");
      data.append(buttonName, buttonValue);

      if (buttonValue === "yes") {
        // Check if the side button is selected
        const selectedSideButton = document.querySelector(
          '.which-side input[name="Side"]:checked'
        );
        if (selectedSideButton) {
          const sideButtonName = selectedSideButton.getAttribute("name");
          const sideButtonValue = selectedSideButton.getAttribute("value");
          data.append(sideButtonName, sideButtonValue);
        } else {
          // Side button is not selected, prevent form submission
          Swal.fire({
            icon: "error",
            title: "",
            text: ":) אנא בחר את צדך - חתן או כלה",
          });
          return;
        }
      }
    } else {
      // No button is selected, prevent form submission
      Swal.fire({
        icon: "error",
        title: "",
        text: ":) לא בחרת אם אתה מגיע או לא",
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
            title: "תודה רבה",
            text: " :) מחכים לראותכם בחתונה",
          });

          // Log form output to the console
          // console.log("Form Output:");
          // for (let pair of data.entries()) {
          //   console.log(pair[0] + ": " + pair[1]);
          // }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "",
            text: "הייתה בעיה עם שליחת הטופס נסה שוב עוד כמה דקות",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "",
        text: ":) לא לשכוח למלא את כל הפרטים",
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
});
