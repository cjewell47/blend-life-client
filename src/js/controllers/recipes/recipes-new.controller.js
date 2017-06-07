angular
.module('BlendLife')
.controller('RecipeNewCtrl', RecipeNewCtrl);

RecipeNewCtrl.$inject = ['Recipe', '$state', 'Ingredient'];
function RecipeNewCtrl (Recipe, $state, Ingredient) {
  const vm = this;

  vm.selectedIngredients = [];
  vm.ingredients         = Ingredient.query();
  vm.create              = recipeCreate;
  vm.selectIngredient    = selectIngredient;
  // vm.getColour            = getColour;

  function selectIngredient(event, ingredient) {
    vm.selectedIngredients.indexOf(ingredient) === -1 ? vm.selectedIngredients.push(ingredient) : vm.selectedIngredients.splice(vm.selectedIngredients.indexOf(ingredient), 1);
  }

  // function getColour() {
  //   const ingredientColour = vm.selectedIngredients[0].colour;
  //   return `rgb(${ingredientColour})`;
  // }

  function recipeCreate(){
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
