let budgetSum = 0;
let expensesSum = 0;

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
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemId = 0;
  }

  submitBudgetForm() {
    const value = parseFloat(this.budgetInput.value);
    if (value === '' || value < 0.01) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p> Budget value cannot be negative, empty or 0 </p> `;
      setTimeout(() => {
        this.budgetFeedback.classList.remove('showItem');
      }, 2000);
    } else {
      budgetSum += value;
      this.budgetAmount.textContent = budgetSum;
      this.budgetInput.value = '';
      this.showBalance();
    }
  };

  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = parseFloat(this.amountInput.value);
    if (expenseValue === '' || amountValue < 0.01 || amountValue === '') {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>Expense name and cost cannot be empty, negative or 0 </p> `;
      setTimeout(() => {
        this.expenseFeedback.classList.remove('showItem');
      }, 2000);
    } else {
      expensesSum += parseFloat(amountValue);
      this.expenseAmount.textContent = expensesSum;
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expenseObj = {
        id: this.itemId,
        title: expenseValue,
        amount: amountValue
      }
      this.itemId++;
      this.itemList.push(expenseObj);
      this.addExpense(expenseObj);
      this.showBalance();
    }
  };

  showBalance() {
    console.log('Balance was shown');
    const expenses = this.totalExpenses();
    const total = parseFloat(budgetSum - expenses);
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balanceAmount.classList.remove('showGreen', 'showBlack');
      this.balanceAmount.classList.add('showRed');
    } else if (total === 0) {
      this.balanceAmount.classList.remove('showGreen', 'showRed');
      this.balanceAmount.classList.add('showBlack');
    } else {
      this.balanceAmount.classList.remove('showBlack', 'showRed');
      this.balanceAmount.classList.add('showGreen');
    }
  };

  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

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

}

const eventListeners = () => {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  const ui = new UI();

  // budget form submit
  budgetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
    ui.submitExpenseForm();
  });

  expenseList.addEventListener('click', () => {
    console.log(event);
  });

};

document.addEventListener('DOMContentLoaded', () => {
  eventListeners();
});