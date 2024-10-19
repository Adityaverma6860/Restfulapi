// Function to read all items from localStorage and display in the table
function readAll() {
    let dataTable = document.querySelector(".data_table");
    dataTable.innerHTML = ""; // Clear the table before populating

    let users = JSON.parse(localStorage.getItem("users")) || []; // Get data from localStorage or initialize empty array

    users.forEach((user, index) => {
        let row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                 <button onclick="edit(${index})">Edit</button>
                <button onclick="remove(${index})">Delete</button>
            </td>
        </tr>`;
        dataTable.innerHTML += row;
    });
}

// Function to create a new user and store in localStorage
function create() {
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;

    if (name && email) { // Ensure both fields are filled
        let users = JSON.parse(localStorage.getItem("users")) || []; // Fetch existing users or initialize empty array
        users.push({ name, email }); // Add new user

        localStorage.setItem("users", JSON.stringify(users)); // Save updated users back to localStorage

        readAll(); // Refresh the list to display the new entry

        // Clear input fields
        document.querySelector(".name").value = "";
        document.querySelector(".email").value = "";
    } else {
        alert("Please enter both name and email.");
    }
}

// Function to edit user (populating the update form)
function edit(index) {
    let users = JSON.parse(localStorage.getItem("users"));
    document.querySelector(".id").value = index;
    document.querySelector(".uname").value = users[index].name;
    document.querySelector(".uemail").value = users[index].email;

    // Show update form, hide create form (optional styling adjustment)
    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".update_form").style.display = "block";
}

// Function to update the user details
function update() {
    let index = document.querySelector(".id").value;
    let name = document.querySelector(".uname").value;
    let email = document.querySelector(".uemail").value;

    let users = JSON.parse(localStorage.getItem("users"));
    users[index] = { name, email }; // Update the user at the specified index

    localStorage.setItem("users", JSON.stringify(users)); // Save updated data back to localStorage

    readAll(); // Refresh the list

    // Reset forms and visibility
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".update_form").style.display = "none";
}

// Function to delete a user
function remove(index) {
    let users = JSON.parse(localStorage.getItem("users"));
    users.splice(index, 1); // Remove the user at the specified index

    localStorage.setItem("users", JSON.stringify(users)); // Save updated data back to localStorage

    readAll(); // Refresh the list
}

// On load, read all data from localStorage and display it
document.addEventListener("DOMContentLoaded", readAll);
