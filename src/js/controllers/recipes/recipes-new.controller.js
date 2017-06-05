angular
  .module('BlendLife')
  .controller('RecipeNewCtrl', RecipeNewCtrl);

RecipeNewCtrl.$inject = ['Recipe', '$state', 'Ingredient'];
function RecipeNewCtrl (Recipe, $state, Ingredient) {
  const vm = this;

  Ingredient
  .query()
  .$promise
  .then(ingredients => {
    vm.ingredients = ingredients;
  });

  vm.create= recipeCreate;
  function recipeCreate(){
    console.log('vm.recipe:', vm.recipe);
    if (vm.addRecipeForm.$valid) {
      Recipe
      .save(vm.recipe)
      .$promise
      .then(() => {
        $state.go('recipeIndex');
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
