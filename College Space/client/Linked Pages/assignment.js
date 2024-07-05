// Get references to DOM elements
const noticesList = document.getElementById("notices-list");
const noticeTitleInput = document.getElementById("notice-title");
const noticeFileInput = document.getElementById("notice-file");
const uploadForm = document.getElementById("upload-form");

// Load notices from local storage or use an empty array if none is found
let notices = JSON.parse(localStorage.getItem("notices")) || [];

// Function to save notices to local storage
function saveNotices() {
  localStorage.setItem("notices", JSON.stringify(notices));
}

// Function to add a notice
function addNotice(title, file) {
  const fileURL = URL.createObjectURL(file);
  const noticeHTML = `<li><h3>${title}</h3><p><a href="${fileURL}" target="_blank">${file.name}</a></p></li>`;
  noticesList.insertAdjacentHTML("afterbegin", noticeHTML);
  notices.unshift({ title: title, file: file.name });
  saveNotices();
  noticeTitleInput.value = "";
  noticeFileInput.value = "";
}

// Function to remove a notice
function removeNotice(index) {
  notices.splice(index, 1);
  saveNotices();
}

// Listen for form submit event
uploadForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const title = noticeTitleInput.value;
  const file = noticeFileInput.files[0];
  addNotice(title, file);
});

// Load notices from local storage
notices.forEach(function(notice, index) {
  const fileURL = `notices/${notice.file}`;
  const noticeHTML = `<li><h3>${notice.title}</h3><p><a href="${fileURL}" target="_blank">${notice.file}</a></p><button class="remove-notice" data-index="${index}">Remove</button></li>`;
  noticesList.insertAdjacentHTML("beforeend", noticeHTML);
});

// Listen for click events on remove buttons
noticesList.addEventListener("click", function(event) {
  if (event.target.classList.contains("remove-notice")) {
    const index = event.target.getAttribute("data-index");
    removeNotice(index);
    event.target.parentElement.remove();
  }
});
