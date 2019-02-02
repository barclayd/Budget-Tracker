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
    this.itemID = 0;
  }

  submitBudgetForm() {
    console.log('hello');
    const value = this.budgetInput.value;
    if (value < 0.01) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p> Budget value cannot be negative, empty or 0 </p> `
      setTimeout(() => {
        this.budgetFeedback.classList.remove('showItem');
      }, 2000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  };

  showBalance() {
    console.log('Balance was shown');
    const expenses = this.totalExpenses();
    const total = parseFloat(this.budgetAmount.textContent) - expenses;
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

  totalExpenses() {
    let total = 400;
    return total;
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
  });

  expenseList.addEventListener('click', () => {
    console.log(event);
  });

};

document.addEventListener('DOMContentLoaded', () => {
  eventListeners();
});