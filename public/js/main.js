let checkboxes = document.getElementsByClassName("is_done");

Array.from(checkboxes).forEach((checkbox) => {
  let value = parseInt(checkbox.value, 10);

  checkbox.addEventListener("change", function (event) {
    if (event.target.checked) {
      value += 1;
    } else {
      value -= 1;
    }
    checkbox.value = value;
  });
});
