"use strict";
let users = [];
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b;
    const registrationModal = document.getElementById('registrationModal');
    const closeButton = document.querySelector('.close');
    toggleDisplay('registrationModal', true);
    toggleDisplay('loginSection', true);
    (_a = document.getElementById('registerButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', registerUser);
    (_b = document.getElementById('loginButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', loginUser);
    // Add event listener to close button
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', () => {
        toggleDisplay('registrationModal', false);
    });
});
function registerUser() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const newUser = {
        username: username.toLowerCase(),
        email,
        password,
        firstName,
        lastName,
        status: 'Active'
    };
    // Load existing users from localStorage
    users = getUsersFromLocalStorage();
    // Add the new user to the users array
    users.push(newUser);
    console.log('User registered:', newUser); // Log the newly registered user
    // Save the updated users array to local storage
    saveUsersToLocalStorage(users);
    alert('Registration successful!');
    // Hide the registration modal and show the login section
    toggleDisplay('registrationModal', false);
    toggleDisplay('loginSection', true);
}
function loginUser() {
    // Trim input values to remove any leading/trailing spaces
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    users = getUsersFromLocalStorage();
    // Find a user by username with a case-insensitive comparison
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    console.log(`Attempting login with username: ${username} and password: ${password}`);
    console.log(users); // See what the current users array looks like
    if (user) {
        console.log('Login successful');
        alert('Login successful!');
        toggleDisplay('loginSection', false);
        toggleDisplay('userTable', true);
        displayUsers(); // Make sure this call is here
    }
    else {
        alert('Invalid credentials.');
    }
}
function displayUsers() {
    console.log(users);
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = ''; // Clear existing entries
    users.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.appendChild(createCell(user.username));
        tr.appendChild(createCell(user.email));
        tr.appendChild(createEditableCell(user.firstName, `firstName-${index}`)); // Unique ID for editing
        tr.appendChild(createEditableCell(user.lastName, `lastName-${index}`)); // Unique ID for editing
        tr.appendChild(createCell(user.status));
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button'); // Add class for styling
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'; // Add pencil icon
        editButton.addEventListener('click', () => editUser(index, user));
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button'); // Add class for styling
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Add trash icon
        deleteButton.addEventListener('click', () => deleteUser(index));
        const actionTd = document.createElement('td');
        actionTd.appendChild(editButton);
        actionTd.appendChild(deleteButton);
        tr.appendChild(actionTd);
        tbody.appendChild(tr);
    });
    document.getElementById('userTable').style.display = 'table'; // Make sure the table is visible
}
function createCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}
function createEditableCell(value, id) {
    const td = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.id = id;
    td.appendChild(input);
    return td;
}
function editUser(index, user) {
    const firstNameInput = document.getElementById(`firstName-${index}`);
    const lastNameInput = document.getElementById(`lastName-${index}`);
    if (firstNameInput && lastNameInput) {
        // Capturing the new values from the input fields
        const newFirstName = firstNameInput.value;
        const newLastName = lastNameInput.value;
        // Update the user details in the 'users' array
        users[index].firstName = newFirstName;
        users[index].lastName = newLastName;
        console.log('User updated successfully.', users[index]);
        alert('User updated successfully.');
        // Save the updated users array to local storage
        saveUsersToLocalStorage(users);
        displayUsers(); // Refresh the display to reflect the updated user information
    }
    else {
        console.error('Could not find input fields for editing.');
    }
}
function deleteUser(index) {
    users.splice(index, 1);
    displayUsers(); // Refresh the list
}
function toggleDisplay(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}
function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
        return JSON.parse(usersJSON);
    }
    else {
        return [];
    }
}
