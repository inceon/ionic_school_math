;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['$rootScope', 'allDiscipline', '$state', 'todo', '$ionicSlideBoxDelegate'];

    function Disciplines($rootScope, allDiscipline, $state, todo, $ionicSlideBoxDelegate) {

        $rootScope.page = {
            title: 'Предмети'
        };

        var vm = this;

        vm.slide = 0;
        vm.todo = todo;
        vm.disciplines = allDiscipline.models;

        vm.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        vm.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
        vm.selectBook = function(idSlide) {
            var id = allDiscipline.models[idSlide].id;
            console.log(id);
            $state.go("app.discipline.books", { disciplineId: id });
        }
    }
})();
