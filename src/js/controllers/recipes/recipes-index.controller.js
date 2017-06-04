angular
  .module('BlendLife')
  .controller('RecipeIndexCtrl', RecipeIndexCtrl);

RecipeIndexCtrl.$inject = ['Recipe'];
function RecipeIndexCtrl (Recipe) {
  const vm      = this;

  Recipe
    .query()
    .$promise
    .then(recipes => {
      vm.recipes = recipes;
    });
}
