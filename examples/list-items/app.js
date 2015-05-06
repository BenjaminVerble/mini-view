var createView = require("../../index");

var people = [
    {name: 'Bart'},
    {name: 'Homer'},
    {name: 'Lisa'},
    {name: 'Marge'},
    {name: 'Maggie'}
];

function createListItem (person) {
    var listItemTpl = `<li>{{name}}</li>`;

    var $listItemEl;

    return createView({
        template: listItemTpl,
        context: person,
        init: function (v) {

        }
    });
}

function createList () {
    var listTpl = `<ul></ul>`;

    var $listEl;

    return createView({
        template: listTpl,
        init: function (v) {
            people.forEach(function(person){
                v.$el.appendChild(createListItem(person).$el);
            })
            window.$listEl = v.$el;
            v.$el.addEventListener('click', function(event) {
                var clickedEl = event.target;
                clickedEl.style.color = 'blue';
            });
        }
    });
}

function createMain () {

    var mainTpl = `
        <div>
            <h2>This is Main</h2>
            <p>{{name}}</p>
        </div>
    `;

    var $mainEl;
    var $header;

    return createView({
        template: mainTpl,
        context: {name: 'Ben'},
        publicFunc: function () {},
        init: function (v) {
            $header = v.$el.querySelector('h2');
            v.$el.appendChild(createList().$el);
        }
    });

}

document.addEventListener("DOMContentLoaded", function(event) {
    var $main = document.getElementById('main');
    $main.appendChild(createMain().$el);
});