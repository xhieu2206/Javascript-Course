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

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0
    }
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
    expenseContainer: '.expenses__list'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // either inc or exp
        desc: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
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


  var ctrlAddItem = function() {

    var input, newItem;

    // 1. Get the data in the input
    input = UICtrl.getInput();

    // 2. Add the item to the budget controller
    newItem = budgetController.addItem(input.type, input.desc, input.value);

    // 3. Add the new item to the UI
    UIController.addListItem(newItem, input.type);

    // 4. Calcuate the budget

    // 5. Display the budget on the user interface

  }

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();
