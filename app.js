const form = document.querySelector(".form");
const qr = document.querySelector("#qrcode");

const handleSubmit = (e) => {
  e.preventDefault();
  clearUI();
  let url = document.getElementById("url").value;
  let size = document.getElementById("selected").value;
  if (url === "") {
    // alert("Please enter a URL");
    showAlert();
    setTimeout(() => {
      hideAlert();
    }, 2000);
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      setTimeout(() => {
        const saveImage = qr.querySelector("img").src;
        createSaveBtn(saveImage);
      }, 50);
    }, 1000);
  }
};

const createSaveBtn = (saveLink) => {
  const link = document.createElement("a");
  link.download = "qrcode";
  link.href = saveLink;
  link.classList = "save-btn";
  link.innerHTML = "Save Image";
  qr.appendChild(link);
};
const showSpinner = () => {
  document.querySelector(".dots-bars-8").style.display = " block";
};
const hideSpinner = () => {
  document.querySelector(".dots-bars-8").style.display = " none";
};
hideSpinner();
const showAlert = () => {
  const alert = document.createElement("div");
  alert.classList = "alert";
  alert.innerHTML = "Please enter a URL";
  alert.style.display = "block";
  alert.style.translate = "100%";
  qr.appendChild(alert);
};
// hide alert
const hideAlert = () => {
  const hidealert = document.querySelector(".alert");
  hidealert.remove();
};
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.querySelector(".save-btn");
  if (saveBtn) {
    saveBtn.remove();
  }
};
const generateQRCode = (url, size) => {
  var qrcode = new QRCode("qrcode", {
    text: url,
    height: size,
    width: size,
  });
};
form.addEventListener("submit", handleSubmit);
