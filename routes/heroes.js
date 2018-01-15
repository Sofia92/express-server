/**
 * User: sofia
 * Date: 2018/1/12
 * Version: 1.0.0
 * Description:
 */
var express = require('express');
var router = new express.Router();
var heroes = [
    {id: 0, name: 'Mario'},
    {id: 1, name: 'Mr. Nice'},
    {id: 2, name: 'Narco'},
    {id: 3, name: 'Bombasto'},
    {id: 4, name: 'Celeritas'},
    {id: 5, name: 'Magneta'},
    {id: 6, name: 'RubberMan'},
    {id: 7, name: 'Dynama'},
    {id: 8, name: 'Dr IQ'},
    {id: 9, name: 'Magma'},
    {id: 10, name: 'Tornado'}
];
router.get('/', function (request, response) {
    response.json(heroes);
});

router.get('/:id', function (request, response) {
    var hero = heroes.find(function (hero) {
        return hero.id === +request.params.id
    });
    response.json(hero);
});

router.patch('/:id', function (request, response) {
    var hero = heroes.find(function (hero) {
        return hero.id === +request.params.id
    });
    if (hero) {
        hero.name = request.body.name;
    }
    response.json(hero);
});

router.post('/', function (request, response) {
    var hero = {id: heroes.length, name: request.body.name};
    heroes.unshift(hero);
    response.json(hero);
});

router.delete('/:id', function (request, response) {
    heroes = heroes.filter(function (hero) {
        return hero.id !== +request.params.id
    });
    response.json(null);
});

module.exports = router;