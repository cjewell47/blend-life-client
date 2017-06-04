angular
  .module('BlendLife')
  .controller('RecipeShowCtrl', RecipeShowCtrl);

RecipeShowCtrl.$inject = ['Recipe', '$stateParams'];
function RecipeShowCtrl (Recipe, $stateParams) {
  const vm = this;

  Recipe
    .get({id: $stateParams.id})
    .$promise
    .then(recipe => {
      console.log('we here', recipe);
      vm.recipe = recipe;
    });
}
