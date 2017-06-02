angular
  .module('BlendLife')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService'];
function CurrentUserService(TokenService) {

}
