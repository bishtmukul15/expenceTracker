const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");

// Load expenses from local storage
function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach(addExpenseToList);
}

// Add expense to the list
function addExpenseToList(expense) {
  const li = document.createElement("li");
  li.textContent = `${expense.description} - ${expense.amount} (${expense.category})`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = () => editExpense(expense);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteExpense(expense, li);

  li.appendChild(editButton);
  li.appendChild(deleteButton);

  expenseList.appendChild(li);
}

// Save expenses to local storage
function saveExpense(expense) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Delete expense
function deleteExpense(expense, listItem) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const updatedExpenses = expenses.filter(
    (e) => e.description !== expense.description
  );
  localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  expenseList.removeChild(listItem);
}

// Edit expense
function editExpense(expense) {
  document.getElementById("description").value = expense.description;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("category").value = expense.category;

  deleteExpense(
    expense,
    document.querySelector(`li:contains(${expense.description})`)
  );
}

// Handle form submission
expenseForm.onsubmit = function (event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  const expense = { description, amount, category };

  addExpenseToList(expense);
  saveExpense(expense);

  expenseForm.reset();
};

loadExpenses();
