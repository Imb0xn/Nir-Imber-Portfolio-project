interface User {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    status: string;
}

let users: User[] = [];


document.addEventListener('DOMContentLoaded', () => {
    const registrationModal = document.getElementById('registrationModal');
    const closeButton = document.querySelector('.close');

    toggleDisplay('registrationModal', true);
    toggleDisplay('loginSection', true);

    document.getElementById('registerButton')?.addEventListener('click', registerUser);
    document.getElementById('loginButton')?.addEventListener('click', loginUser);

    // Add event listener to close button
    closeButton?.addEventListener('click', () => {
        toggleDisplay('registrationModal', false);
    });
});




function registerUser(): void {
    const username = (document.getElementById('username') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value.trim();
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value.trim();

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




function loginUser(): void {
    // Trim input values to remove any leading/trailing spaces
    const username = (document.getElementById('loginUsername') as HTMLInputElement).value.trim();
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value.trim();



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
    } else {
        alert('Invalid credentials.');
    }
}


function displayUsers(): void {
    console.log(users);
    const tbody = document.getElementById('userTableBody') as HTMLElement;
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
    document.getElementById('userTable')!.style.display = 'table'; // Make sure the table is visible
}


function createCell(text: string): HTMLTableCellElement {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

function createEditableCell(value: string, id: string): HTMLTableCellElement {
    const td = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.id = id;
    td.appendChild(input);
    return td;
}

function editUser(index: number, user: User): void {
    const firstNameInput = document.getElementById(`firstName-${index}`) as HTMLInputElement;
    const lastNameInput = document.getElementById(`lastName-${index}`) as HTMLInputElement;

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
    } else {
        console.error('Could not find input fields for editing.');
    }
}


function deleteUser(index: number): void {
    users.splice(index, 1);
    displayUsers(); // Refresh the list
}

function toggleDisplay(elementId: string, show: boolean): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}

function saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
}

function getUsersFromLocalStorage(): User[] {
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
        return JSON.parse(usersJSON);
    } else {
        return [];
    }
}
