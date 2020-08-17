// BUDGET CONTROLLER
var budgetController = (function () {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  Expense.prototype.calcPercentage = function(totalInc) {

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

    data.allItems[type].forEach(function(item) {
      sum += item.value;
    });

    data.totals[type] = sum;
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }

  return {

    addItem: function(type, des, val) {
      var newItem;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    calculateBudget: function() {

      // calculate total income and expense
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }

    },

    calculatePercentages: function() {

      data.allItems.exp.forEach(function(item) {
        item.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPercentages = data.allItems.exp.map(function(item) {
        return item.percentage;
      });
      return allPercentages;
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    deleteItem: function(type, id) {

      var ids, index;

      ids = data.allItems[type].map(function(item) {
        return item.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    testing: function() {
      console.log(data);
    }
  }

})();

// UI CONTROLLER
var UIController = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensePercentageLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  }

  var formatNumber = function(num, type) {

    var numSplit, int, dec, intItem;
    var intArr = [];

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');
    int = numSplit[0];
    dec = numSplit[1];

    while (int.length > 3) {
      intItem = int.slice(int.length - 3);
      intArr.unshift(intItem);
      int = int.substring(0, int.length - 3);
    }

    intArr.unshift(int);

    return (type === 'inc' ? '+ ' : '- ') + intArr.join(',') + '.' + dec;
  };

  var nodeListForEach = function(list, fn) {
    for (var i = 0; i < list.length; i++) {
      fn(list[i], i);
    }
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create HTML String with placeholer text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;

        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expenseContainer;

        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
      newHtml = newHtml.replace('%description%', obj.description);

      // Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorId) {

      document.getElementById(selectorId).parentNode.removeChild(document.getElementById(selectorId));
    },

    clearFields: function() {
      var fields, fieldArr;

      // this is not an array, this is a list (node list)
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      // create a new array of input field named fieldArr
      fieldArr = Array.prototype.slice.call(fields);

      fieldArr.forEach(function(field) {
        field.value = '';
      });

      // focus to description input after add a new item
      fieldArr[0].focus();
    },

    displayBudget: function(obj) {

      obj.budget > 0 ? type = 'inc' : type = 'exp';

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);

      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');

      document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---'
      }

    },

    displayPercentages: function(percentages) {

      var percentageFields = document.querySelectorAll(DOMstrings.expensePercentageLabel);

      nodeListForEach(percentageFields, function(item, index) {

        if (percentages[index] > 0) {
          item.textContent = percentages[index] + '%';
        } else {
          item.textContent = '---';
        }

      })
    },

    displayMonth: function() {

      var now, year, month;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      now = new Date();

      year = now.getFullYear();
      month = now.getMonth();
      document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
    },

    changeType: function() {

      var fields = document.querySelectorAll(
        DOMstrings.inputType + ', ' +
        DOMstrings.inputDescription + ', ' +
        DOMstrings.inputValue);

      nodeListForEach(fields, function(item) {
        item.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

  var setupEventListeners = function() {

    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
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

    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();

    // 2. Read percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();

    // 3. Update the UI with new percentages
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function () {

    var input, newItem;

    // 1. get the filed input data
    input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

      // 2. add item to the budget controller
      newItem = budgetController.addItem(input.type, input.description, input.value);

      // 3. Add the item to UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the input fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();

      // 6. Calculate & update percentages
      updatePercentages();
    }

  };

  var ctrlDeleteItem = function(event) {

    var itemID, id, type;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {

      type = itemID.split('-')[0];
      id = itemID.split('-')[1];

      // 1. Delete the item from data structure
      budgetCtrl.deleteItem(type, parseInt(id));

      // 2. Delete the item from UI
      UICtrl.deleteListItem(itemID);

      // 3. Update and show the new budget.
      updateBudget();

      // 4. Calculate & update percentages
      updatePercentages();
    }

  };

  return {
    init: function() {
      console.log('Application has started.');
      UICtrl.displayBudget({
          budget: 0,
          totalInc: 0,
          totalExp: 0,
          percentage: -1
      });
      UICtrl.displayMonth();
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();
