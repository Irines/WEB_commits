function func() {
    // Store
    const val = document.getElementById('email-input').value;
    localStorage.setItem("gmail", val);
}

function ready() {
    // Retrieve
    document.getElementById("email-input").value = localStorage.getItem("gmail");
}

document.addEventListener("DOMContentLoaded", ready);
