var budgetController = (function() {

})();

var UIController = (function() {


  return {
    getInput: function() {
      
    }
  }
})();

var controller = (function(budgetCtrl, UICtrl) {

  var ctrlAddItem = function() {

    // 1. Get the data in the input

    // 2. Add the item to the budget controller

    // 3. Add the new item to the UI

    // 4. Calcuate the budget

    // 5. Display the budget on the user interface

  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {

    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
