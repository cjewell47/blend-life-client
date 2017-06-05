angular
  .module('BlendLife')
  .factory('Ingredient', ingredientFactory);

ingredientFactory.$inject = ['API', '$resource'];
function ingredientFactory(API, $resource){
  return $resource(`${API}/ingredients/:id`, { id: '@_id'}, {

  });
}
