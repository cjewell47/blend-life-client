angular
.module('BlendLife')
.controller('RecipeNewCtrl', RecipeNewCtrl);

RecipeNewCtrl.$inject = ['Recipe', '$state', 'Ingredient', 'filterFilter'];
function RecipeNewCtrl (Recipe, $state, Ingredient, filterFilter) {
  const vm = this;

  vm.selectedIngredients = [];
  vm.ingredients         = Ingredient.query();
  vm.create              = recipeCreate;
  vm.selectIngredient    = selectIngredient;

  function selectIngredient(event, ingredient) {
    vm.selectedIngredients.indexOf(ingredient) === -1 ? vm.selectedIngredients.push(ingredient) : vm.selectedIngredients.splice(vm.selectedIngredients.indexOf(ingredient), 1);
  }

  function recipeCreate(){
    // filter vm.selectedIngredients into a new array containing just id's from ingredients
    vm.selectedIngredient_ids = vm.selectedIngredients.map(function(a) {
      return a.id;
    });
    vm.recipe.ingredient_ids = vm.selectedIngredient_ids;

    if (vm.addRecipeForm.$valid) {
      Recipe
      .save({
        recipe: vm.recipe
      })
      .$promise
      .then(() => {
        $state.go('recipeIndex');
        vm.selectedIngredients = [];
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}

// vm.select = select;

// function filterIngredients() {
//   const params = vm.recipe.ingredient_ids;
//   vm.selectedIngredients = [];
//   params.forEach(id => {
//     vm.selectedIngredients.push(filterFilter(vm.ingredients, {id: id})[0].colour);
//   });
// }

// function select($scope) {
//   console.log('scope ingredient', $scope.ingredient);
//   console.log(vm.selected);
//   if(vm.selected.indexOf($scope.ingredient) === -1) {
//     vm.selected.push($scope.ingredient);
//   } else {
//     for(var i = 0; i < vm.selected.length; i++) {
//       if(vm.selected[i] === $scope.ingredient) {
//         vm.selected.splice(i, 1);
//       }
//     }
//   }
// }
