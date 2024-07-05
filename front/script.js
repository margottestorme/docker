console.log('frontend fonctionne');

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('http://localhost:3001/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('User created successfully:', data);
        alert('User created successfully');
    })
    .catch(error => {
        console.error('Error creating user:', error);
        alert('Error creating user');
    });
});

document.getElementById('getUsers').addEventListener('click', function() {
    console.log('Afficher les utilisateurs button clicked');
    fetch('http://localhost:3001/api/users')
    .then(response => {
        console.log('Response received:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(users => {
        console.log('Users data:', users);
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.textContent = `Username: ${user.username}, Email: ${user.email}`;
            usersList.appendChild(userItem);
        });
    })
    .catch(error => {
        console.error('Error fetching users:', error);
        alert('Error fetching users');
    });
});
