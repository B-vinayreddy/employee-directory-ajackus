let employees = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', department: 'HR', role: 'Manager' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', department: 'IT', role: 'Developer' },
  { id: 3, firstName: 'David', lastName: 'Lee', email: 'david@example.com', department: 'Finance', role: 'Analyst' }
];

let currentPage = 1;
let itemsPerPage = 10;

function applyFilters() {
  const department = document.getElementById('filterDepartment')?.value;
  const role = document.getElementById('filterRole')?.value;
  const sort = document.getElementById('sortBy')?.value;
  const searchValue = document.getElementById('searchInput')?.value.toLowerCase();

  let filtered = employees.filter(emp => {
    return (
      (!department || emp.department === department) &&
      (!role || emp.role === role) &&
      (emp.firstName.toLowerCase().includes(searchValue) ||
       emp.lastName.toLowerCase().includes(searchValue) ||
       emp.email.toLowerCase().includes(searchValue))
    );
  });

  if (sort === "firstNameAsc") {
    filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sort === "firstNameDesc") {
    filtered.sort((a, b) => b.firstName.localeCompare(a.firstName));
  } else if (sort === "department") {
    filtered.sort((a, b) => a.department.localeCompare(b.department));
  }

  renderList(filtered);
}

function renderPagination(totalItems) {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.onclick = () => {
      currentPage = i;
      applyFilters();
    };
    if (i === currentPage) btn.classList.add('active');
    pagination.appendChild(btn);
  }
}

function renderList(filtered = employees) {
  const listContainer = document.getElementById('employeeList');
  if (!listContainer) return;

  listContainer.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = filtered.slice(start, end);

  currentItems.forEach(emp => {
    const div = document.createElement('div');
    div.className = 'employee-card';
    div.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <div class="actions">
        <button onclick="editEmployee('${emp.id}')">Edit</button>
        <button onclick="deleteEmployee('${emp.id}')">Delete</button>
      </div>
    `;
    listContainer.appendChild(div);
  });

  renderPagination(filtered.length);
}

function editEmployee(id) {
  const emp = employees.find(e => e.id == id);
  if (!emp) return;
  localStorage.setItem('editEmployee', JSON.stringify(emp));
  window.location.href = 'form.html';
}

function deleteEmployee(id) {
  if (!confirm("Are you sure you want to delete this employee?")) return;
  employees = employees.filter(e => e.id != id);
  applyFilters();
}

function showForm() {
  localStorage.removeItem('editEmployee');
  window.location.href = 'form.html';
}

window.onload = () => {
  const form = document.getElementById('employeeForm');
  if (form) {
    const empData = localStorage.getItem('editEmployee');
    if (empData) {
      const emp = JSON.parse(empData);
      document.getElementById('employeeId').value = emp.id;
      document.getElementById('firstName').value = emp.firstName;
      document.getElementById('lastName').value = emp.lastName;
      document.getElementById('email').value = emp.email;
      document.getElementById('department').value = emp.department;
      document.getElementById('role').value = emp.role;
    }

    form.addEventListener('submit', (e) => {
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

      localStorage.removeItem('editEmployee');
      window.location.href = 'index.html';
    });
  } else {
    document.getElementById('searchInput').addEventListener('input', () => {
      currentPage = 1;
      applyFilters();
    });

    ['filterDepartment', 'filterRole', 'sortBy', 'itemsPerPage'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        if (id === 'itemsPerPage') {
          itemsPerPage = parseInt(document.getElementById(id).value);
          currentPage = 1;
        }
        applyFilters();
      });
    });

    applyFilters();
  }
};

function cancelForm() {
  localStorage.removeItem('editEmployee');
  window.location.href = 'index.html';
}
