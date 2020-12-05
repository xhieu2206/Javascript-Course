var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  Expense.prototype.calculatePercentage = function(totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    } else {
      this.percentage = -1;
    }
  }

  Expense.prototype.getPercentage = function() {
    return this.percentage;
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

    deleteItem: function(type, id) {
      var ids, index;
      ids = data.allItems[type].map(function(cur, index, arr) {
        return cur.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
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

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calculatePercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPers = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });

      return allPers;
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
    expPercentage: '.budget__expenses--percentage',
    container: '.container',
    expPercLabel: '.item__percentage'
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
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else {
        elementContainer = document.querySelector(DOMstrings.expenseContainer);
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the HTML to the DOM
      elementContainer.insertAdjacentHTML('beforeend', newHtml);

    },

    deleteItem: function(selectorId) {
      var element;

      element = document.getElementById(selectorId);
      element.parentNode.removeChild(element);
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

    displayPercentages: function(percentages) {
      var fields;

      fields = document.querySelectorAll(DOMstrings.expPercLabel);

      var nodeListForEach = function(list, fn) {
        for (var i = 0; i < list.length; i++) {
          fn(list[i], i);
        }
      }

      nodeListForEach(fields, function(cur, index) {
        if (percentages[index] > 0) {
          cur.textContent = percentages[index] + '%';
        } else {
          cur.textContent = '---';
        }
      });
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

    formatNumber: function(num, type) {
      var numSplit, int, dec;

      num = Math.abs(num);
      num = num.toFixed(2);

      numSplit = num.split('.');

      int = numSplit[0];

      dec = numSplit[1];
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
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

  var updatePercentages = function() {
    // 1. calculate percentage
    budgetCtrl.calculatePercentages();

    // 2. read percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();

    // 3. update the UI
    UICtrl.displayPercentages(percentages);
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

      // 6. Update percentages
      updatePercentages();
    }
  }

  var ctrlDeleteItem = function(event) {
    var itemId, id, type;

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {

      type = itemId.split('-')[0];
      id = parseInt(itemId.split('-')[1]);

      // 1. delete the item from data structur
      budgetCtrl.deleteItem(type, id);

      // 2. delete item from user interface
      UICtrl.deleteItem(itemId);

      // 3. update and show the new budget
      updateBudget();

      // 4. Update percentages
      updatePercentages();
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
