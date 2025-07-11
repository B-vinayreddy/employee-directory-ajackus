<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Add/Edit Employee</title>
  <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
  <div class="container">
    <h2 id="formTitle">Add/Edit Employee</h2>

    <form id="employeeForm">
      <input type="hidden" id="employeeId" />

      <label>First Name:
        <input type="text" id="firstName" required />
      </label>

      <label>Last Name:
        <input type="text" id="lastName" required />
      </label>

      <label>Email:
        <input type="email" id="email" required />
      </label>

      <label>Department:
        <input type="text" id="department" required />
      </label>

      <label>Role:
        <input type="text" id="role" required />
      </label>

      <button type="submit">Save</button>
      <button type="button" onclick="cancelForm()">Cancel</button>
    </form>
  </div>

  <script src="/static/js/app.js"></script>
</body>
</html>
