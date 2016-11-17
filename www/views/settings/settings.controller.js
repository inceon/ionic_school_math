;(function () {
    "use strict";
    angular
        .module('app')
        .controller('Settings', Settings);

    Settings.$inject = ['$rootScope', 'user', 'userInfo', 'toastr'];

    function Settings ($rootScope, user, userInfo, toastr) {

        $rootScope.page = {
            title: 'Налаштування'
        };

        var vm = this;

        vm.label = userInfo.label;

        vm.data = userInfo.user;
        vm.my_classes = userInfo.my_classes.map(function(item){
            return item.number;
        });
        console.log(vm.my_classes);

        vm.save = save;

        function save () {
            console.log(vm.data);
            delete vm.data.photo;
            if (vm.data.image_file)
                vm.data.image_file = vm.data.image_file.base64;
            user
                .update(vm.data)
                .then(function(){
                    toastr.success("Дані успішно оновлені");
                });
        }

    }

})();
