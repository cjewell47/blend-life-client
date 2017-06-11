angular
  .module('BlendLife')
  .factory('Comment', commentFactory);

commentFactory.$inject = ['API', '$resource'];
function commentFactory(API, $resource){
  return $resource(`${API}/comments/:id`, { id: '@_id'}, {

  });
}
