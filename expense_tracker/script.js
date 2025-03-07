const itemInput = document.getElementById("item-input");
const priceInput = document.getElementById("price-input");
const addExpenseBtn = document.querySelector(".btn");
const expenseList = document.querySelector(".expense-list");
const expenseAmount = document.querySelector(".expense-amount");

let expenses = [];

addExpenseBtn.addEventListener("click", addExpense);

//Adding the user input
function addExpense() {
  const userItemInput = itemInput.value.trim();
  const formattedItemInput =
    userItemInput.charAt(0).toUpperCase() + userItemInput.slice(1);
  const userPriceInput = Number(priceInput.value);

  if (userItemInput === "" || userPriceInput <= 0) {
    alert("Please enter an item and price");
    return;
  }

  expenses.push({ description: formattedItemInput, amount: userPriceInput });
  displayExpenses();
  displayExpenseAmount();

  itemInput.value = "";
  priceInput.value = "";
}

//Update HTML and show expenses
function displayExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${expense.description}: ${expense.amount} kr`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "Delete item";
    deleteBtn.addEventListener("click", function () {
      deleteItem(index);
    });

    listItem.append(deleteBtn);
    expenseList.append(listItem);
  });
}

//Delete item
function deleteItem(index) {
  expenses.splice(index, 1);
  displayExpenses();
  displayExpenseAmount();
}

//Display the total sum of the expenses
function displayExpenseAmount() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  expenseAmount.innerHTML = `${total} kr`;
}
