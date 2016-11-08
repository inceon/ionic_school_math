;(function () {
    "use strict";
    angular
        .module('app')
        .controller('Settings', Settings);

    Settings.$inject = ['$rootScope', 'user', 'userInfo'];

    function Settings ($rootScope, user, userInfo) {

        $rootScope.page = {
            title: 'Setting'
        };

        var vm = this;

        vm.label = userInfo.label;

        vm.data = userInfo.user;
        console.log(userInfo);

        vm.save = save;

        function save () {
            console.log(vm.data);
            vm.data.image_file = vm.data.image_file.base64;
            user.update(vm.data);
        }

    }

})();
