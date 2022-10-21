import {startDemo} from './scripts/start.js';
import {generateItems} from './scripts/mediascroller'

document.addEventListener('DOMContentLoaded', e => {
    startDemo();

    // generate media scroller
    generateItems();

    // Load in player sections
    const playerSections = require('./scripts/players.js');

    //Load in one graph
    const graph = require('./scripts/graph.js');

    // Loading in Intersection Observer API
    const observer = require('./scripts/observer.js');

    //Load in nav smooth scroll
    const scroll = require('./scripts/navigation.js');

});