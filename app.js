// Simulate a user database and employee records in memory
let users = [];
let loggedInUser = null;
let employees = [];

// Toggle between login and signup forms
function toggleForms(formType) {
  if (formType === 'login') {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
  } else {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
  }
}

// Login functionality
function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  // Check if the user exists and the password matches
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    loggedInUser = user;
    alert('Login successful!');
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('employeeFormContainer').style.display = 'block';
    renderEmployeeList();
  } else {
    alert('Invalid username or password.');
  }
}

// Signup functionality
function signup() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Check if the username already exists
  if (users.some(user => user.username === username)) {
    alert('Username already exists!');
    return;
  }

  // Add user to the "users" array (simulating a database)
  users.push({ username, password });
  alert('Signup successful! Please log in.');
  toggleForms('login');
}

// Render the employee list
function renderEmployeeList() {
  const employeeTableBody = document.getElementById('employeeTableBody');
  employeeTableBody.innerHTML = '';
  employees.forEach(employee => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.role}</td>
      <td>
        <button onclick="editEmployee('${employee.id}')">Edit</button>
        <button onclick="deleteEmployee('${employee.id}')">Delete</button>
      </td>
    `;
    employeeTableBody.appendChild(row);
  });
}

// Create or update employee functionality (just an example)
document.getElementById('employeeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;
  
  if (!name || !email || !role) {
    alert('All fields are required!');
    return;
  }

  if (document.getElementById('employeeId').value) {
    // Update employee
    const employeeId = document.getElementById('employeeId').value;
    const employee = employees.find(emp => emp.id === employeeId);
    employee.name = name;
    employee.email = email;
    employee.role = role;
  } else {
    // Create employee
    const newEmployee = {
      id: `emp${Date.now()}`,
      name,
      email,
      role
    };
    employees.push(newEmployee);
  }

  // Clear form and update the list
  document.getElementById('employeeForm').reset();
  renderEmployeeList();
  document.getElementById('employeeId').value = '';
});

// Delete employee
function deleteEmployee(id) {
  employees = employees.filter(employee => employee.id !== id);
  renderEmployeeList();
}

// Edit employee
function editEmployee(id) {
  const employee = employees.find(employee => employee.id === id);
  document.getElementById('name').value = employee.name;
  document.getElementById('email').value = employee.email;
  document.getElementById('role').value = employee.role;
  document.getElementById('employeeId').value = employee.id;
}
