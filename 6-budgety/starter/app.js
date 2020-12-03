var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var calculateTotal = function(type) {
    var sum = 0;

    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });

    data.totals[type] = sum;
  }

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0
    },
    budget: 0,
    percentage: -1
  }

  return {
    addItem: function(type, des, value) {
      var id, newItem;

      // create new ID
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // create new item base on type
      if (type === 'inc') {
        newItem = new Income(id, des, value);
      } else {
        newItem = new Expense(id, des, value);
      }

      // push the item into array
      data.allItems[type].push(newItem);
      data.totals[type] += newItem.value;

      return newItem;
    },

    calculateBudget: function() {

      // calculate total income and expense
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income - expense
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    }
  }
})();

var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    totalIncLabel: '.budget__income--value',
    totalExpLabel: '.budget__expenses--value',
    expPercentage: '.budget__expenses--percentage'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // either inc or exp
        desc: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    addListItem: function(obj, type) {
      var html, newHtml, elementContainer;

      // create HTML string with placeholder text
      if (type === 'inc') {
        elementContainer = document.querySelector(DOMstrings.incomeContainer);
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else {
        elementContainer = document.querySelector(DOMstrings.expenseContainer);
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the HTML to the DOM
      elementContainer.insertAdjacentHTML('beforeend', newHtml);

    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      fieldsArr = Array.prototype.slice.call(fields, 0);

      fieldsArr.forEach(function(cur) {
        cur.value = '';
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;

      document.querySelector(DOMstrings.totalIncLabel).textContent = obj.totalInc;

      document.querySelector(DOMstrings.totalExpLabel).textContent = obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.expPercentage).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.expPercentage).textContent = '---';
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  }
})();

var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  }

  var updateBudget = function() {
    var budget;

    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  }

  var ctrlAddItem = function() {

    var input, newItem;

    // 1. Get the data in the input
    input = UICtrl.getInput();

    if (input.desc !== '' && !isNaN(input.value) && input.value > 0) {

      // 2. Add the item to the budget controller
      newItem = budgetController.addItem(input.type, input.desc, input.value);

      // 3. Add the new item to the UI
      UIController.addListItem(newItem, input.type);

      // 4. clear the fields
      UIController.clearFields();

      // 5. Calculate and update the budget
      updateBudget();
    }

  }

  return {
    init: function() {
      console.log('Application has started.');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: budgetCtrl.getBudget().percentage
      });
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();
