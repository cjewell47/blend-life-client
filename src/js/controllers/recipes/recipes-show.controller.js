angular
  .module('BlendLife')
  .controller('RecipeShowCtrl', RecipeShowCtrl);

RecipeShowCtrl.$inject = ['Recipe', '$stateParams', 'Comment'];
function RecipeShowCtrl (Recipe, $stateParams, Comment) {
  const vm    = this;
  vm.createComment  = createComment;

  Recipe
    .get({id: $stateParams.id})
    .$promise
    .then(recipe => {
      console.log('we here', recipe);
      vm.recipe = recipe;
    });

  function createComment() {
    console.log('stateParams though', $stateParams);
    vm.comment.recipe_id = $stateParams.id;
    Comment
      .save({
        comment: vm.comment
      })
      .$promise
      .then(() => {
        // $state.go('recipeIndex');
        vm.selectedIngredients = [];
      })
      .catch(err => {
        console.log(err);
      });
  }





}
