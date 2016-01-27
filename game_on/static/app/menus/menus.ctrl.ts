module App.Menus {
  class MenusCtrl {
    menus;

    constructor() {
      this.menus = [
        {
          title: 'Arts',
          items: [
            {
              title: 'Art List',
              link: 'games-list'
            },
            {
              title: 'Add an Art',
              link: 'games-create'
            }
          ]
        },
        {
          title: 'Farts',
          items: [
            {
              title: 'Art List',
              link: 'games-list'
            },
            {
              title: 'Add an Art',
              link: 'games-create'
            }
          ]
        },
        {
          title: 'Crafts',
          items: [
            {
              title: 'Art List',
              link: 'games-list'
            },
            {
              title: 'Add an Art',
              link: 'games-create'
            }
          ]
        }
      ];
    }
  }

  angular.module('menus').controller('MenusCtrl', [MenusCtrl]);
}
