let budgetSum;

// execute on every page
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
    .then(() => {
      console.log('SW registered');
    });
}
class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.balanceCurrency = document.getElementById("budget-currency");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = (localStorage.getItem('expensesList') !== null ? JSON.parse(localStorage.getItem('expensesList')) : []),
      this.itemId = (localStorage.getItem('expensesList') !== null ? JSON.parse(localStorage.getItem('expensesList')).length : 0)
  }

  submitBudgetForm() {
    const value = parseFloat(this.budgetInput.value);
    if (this.budgetInput.value === '' || value < 0.01) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p> Budget value cannot be negative, empty or 0 </p> `;
      setTimeout(() => {
        this.budgetFeedback.classList.remove('showItem');
      }, 2500);
    } else {
      budgetSum += value;
      localStorage.setItem('budgetTotal', budgetSum);
      this.budgetAmount.textContent = budgetSum.toFixed(2);
      this.budgetInput.value = '';
      this.showBalance();
      console.log(this.itemList);
      console.log(this.itemId);
    }
  };

  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = parseFloat(this.amountInput.value);
    if (expenseValue === '' || amountValue < 0.01 || this.amountInput.value === '') {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>Expense name and cost cannot be empty, negative or 0 </p> `;
      setTimeout(() => {
        this.expenseFeedback.classList.remove('showItem');
      }, 2500);
    } else {
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expenseObj = {
        id: this.itemId,
        title: expenseValue,
        amount: amountValue
      }
      this.itemId++;
      this.itemList.push(expenseObj);
      localStorage.setItem('expensesList', JSON.stringify(this.itemList));
      this.addExpense(expenseObj);
      this.showBalance();
    }
  };

  showBalance() {
    const expenses = this.totalExpenses().toFixed(2);
    localStorage.setItem('expensesTotal', expenses);
    this.expenseAmount.textContent = expenses;
    const total = parseFloat(budgetSum - expenses).toFixed(2);
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.changeTextColour(this.balanceAmount, 'red');
      this.changeTextColour(this.balanceCurrency, 'red');
    } else if (total === 0) {
      this.changeTextColour(this.balanceAmount, 'black');
      this.changeTextColour(this.balanceCurrency, 'black');
    } else {
      this.changeTextColour(this.balanceAmount, 'green');
      this.changeTextColour(this.balanceCurrency, 'green');
    }
  };

  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

    <h5 class="expense-title mb-0 text-capitalize list-item">${expense.title}</h5>
    <h5 class="expense-amount mb-0 list-item"><span>£</span>${expense.amount}</h5>

    <div class="expense-icons list-item">

        <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
            <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="delete-icon" data-id="${expense.id}">
            <i class="fas fa-trash"></i>
        </a>
    </div>
</div>
    `;
    this.expenseList.appendChild(div);
  }

  totalExpenses() {
    let expensesSum = 0;
    this.itemList.map(item => {
      expensesSum += item.amount;
    });
    return expensesSum;
  };

  editExpense(element) {
    const id = parseInt(element.dataset.id);
    const parent = element.parentElement.parentElement.parentElement;
    // remove list element from DOM
    this.expenseList.removeChild(parent);
    // get value and filter array of stored expenses
    let expense = this.itemList.filter(item => item.id === id);
    const newExpensesList = this.itemList.filter(item => item.id !== id);
    this.itemList = newExpensesList;
    localStorage.setItem('expensesList', JSON.stringify(this.itemList));
    this.expenseAmount.textContent = this.totalExpenses();
    this.showBalance();
    // remove item value from overall expenses sum
    // show previous values in input form
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

  }

  deleteExpense(element) {
    const id = parseInt(element.dataset.id);
    const parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    const newExpensesList = this.itemList.filter(item => item.id !== id);
    console.log(newExpensesList);
    this.itemList = newExpensesList;
    localStorage.setItem('expensesList', JSON.stringify(newExpensesList));
    this.showBalance();
  }

  changeTextColour(element, colour) {
    switch (colour) {
      case 'red':
        element.classList.remove('showGreen', 'showBlack');
        element.classList.add('showRed');
        break;
      case 'black':
        element.classList.remove('showGreen', 'showRed');
        elemnt.classList.add('showBlack');
        break;
      case 'green':
        element.classList.remove('showBlack', 'showRed');
        element.classList.add('showGreen');
    }
  }

}

const eventListeners = () => {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const budgetReset = document.getElementById('budget-reset');

  const ui = new UI();

  if (localStorage.getItem('budgetTotal') !== null) {
    budgetSum = parseFloat(localStorage.getItem('budgetTotal'));
    ui.budgetAmount.textContent = parseFloat(localStorage.getItem('budgetTotal'));
    ui.showBalance();
  } else {
    budgetSum = 0;
  }

  // check if previous values exist in storage
  if (localStorage.getItem('expensesTotal') !== null) {
    ui.expenseAmount.textContent = parseFloat(localStorage.getItem('expensesTotal'));
    ui.showBalance();
  }

  if (localStorage.getItem('expensesList') !== null) {
    const historicExpenses = JSON.parse(localStorage.getItem('expensesList'));
    for (expense in historicExpenses) {
      ui.addExpense(historicExpenses[expense]);
    }
  }

  // budget form submit
  budgetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    ui.submitExpenseForm();
  });

  budgetReset.addEventListener('click', (event) => {
    event.preventDefault();
    if (budgetSum > 0) {
      budgetSum = 0;
      ui.budgetAmount.textContent = 0;
      localStorage.removeItem('budgetTotal');
      ui.showBalance();
    }
  });

  expenseList.addEventListener('click', (event) => {
    if (event.target.parentElement.classList.contains('edit-icon')) {
      ui.editExpense(event.target.parentElement);
    }

    if (event.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteExpense(event.target.parentElement);

    }
  });

};

document.addEventListener('DOMContentLoaded', () => {
  eventListeners();
});