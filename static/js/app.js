let employees = [
  { id: 1, firstName: 'Vinay', lastName: 'Reddy', email: 'vinay@example.com', department: 'HR', role: 'Manager' },
  { id: 2, firstName: 'Shiva', lastName: 'Yadav', email: 'shiva@example.com', department: 'IT', role: 'Developer' },
  { id: 3, firstName: 'Rishi', lastName: 'Koushik', email: 'rishi@example.com', department: 'Finance', role: 'Analyst' }
];

let currentPage = 1;
let itemsPerPage = 10;

function renderList(data = employees) {
  const list = document.getElementById('employeeList');
  list.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = data.slice(start, end);

  currentItems.forEach(emp => {
    const div = document.createElement('div');
    div.className = 'employee-card';
    div.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <div class="actions">
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });

  renderPagination(data.length);
}

function renderPagination(totalItems) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.className = i === currentPage ? 'active' : '';
    btn.onclick = () => {
      currentPage = i;
      applyFilters();
    };
    pagination.appendChild(btn);
  }
}

function applyFilters() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const department = document.getElementById('filterDepartment').value;
  const role = document.getElementById('filterRole').value;
  const sort = document.getElementById('sortBy').value;

  let filtered = employees.filter(emp =>
    (!department || emp.department === department) &&
    (!role || emp.role === role) &&
    (emp.firstName.toLowerCase().includes(searchValue) ||
     emp.lastName.toLowerCase().includes(searchValue) ||
     emp.email.toLowerCase().includes(searchValue))
  );

  if (sort === "firstNameAsc") filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
  else if (sort === "firstNameDesc") filtered.sort((a, b) => b.firstName.localeCompare(a.firstName));
  else if (sort === "department") filtered.sort((a, b) => a.department.localeCompare(b.department));

  renderList(filtered);
}

function openForm() {
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('employeeForm').reset();
  document.getElementById('employeeId').value = '';
}

function closeForm() {
  document.getElementById('formContainer').style.display = 'none';
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('employeeId').value = emp.id;
  document.getElementById('firstName').value = emp.firstName;
  document.getElementById('lastName').value = emp.lastName;
  document.getElementById('email').value = emp.email;
  document.getElementById('department').value = emp.department;
  document.getElementById('role').value = emp.role;
}

function deleteEmployee(id) {
  if (!confirm('Are you sure you want to delete this employee?')) return;
  employees = employees.filter(e => e.id !== id);
  applyFilters();
}

document.getElementById('employeeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('employeeId').value;
  const newEmp = {
    id: id ? parseInt(id) : Date.now(),
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    department: document.getElementById('department').value,
    role: document.getElementById('role').value
  };

  if (id) {
    employees = employees.map(emp => emp.id == newEmp.id ? newEmp : emp);
  } else {
    employees.push(newEmp);
  }

  closeForm();
  applyFilters();
});

document.getElementById('searchInput').addEventListener('input', () => {
  currentPage = 1;
  applyFilters();
});

['filterDepartment', 'filterRole', 'sortBy'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    currentPage = 1;
    applyFilters();
  });
});

window.onload = applyFilters;
