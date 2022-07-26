const mookie = require('./data/mookie_data.json');
const tatis = require('./data/tatis_data.json');
const trout = require('./data/trout_data.json');

//I don't know how to do this in a better way tbh
let hitterData = [];
    hitterData.push(mookie);
    hitterData.push(tatis);
    hitterData.push(trout);

const generateVizualizations = () => {
    //create initial chart
    createChart(hitterData[0], 0);
    //could potentially use this to generate our anchor elements
    //createAnchor(0)

    for (let i = 1; i < hitterData.length; i++) {
        createChart(hitterData[i], i);
        //createAnchor(i)
    }
};

//method to create each visualization
const createChart = (hitterData, idx, createXAxisBool) => {
    //Setting up dimensions
    let width = 800;
    let height = 600;
    let padding = 50;
    let margin = {left: 50, top: 80, bottom: 30, right: 40};

    //target SVG on HTML doc to display
    let targetSVG = 'slide-svg-' + idx;
    
    let xScale;
    let yScale;

    //Setting the ranges for x-axis / y-axis
    xScale = d3.scaleLinear()
                .range([margin.left, width - margin.right])
                .domain([50, d3.max(hitterData, (item) => {
                    return item['launch_speed']
                }) + 1])
    yScale = d3.scaleLinear()
                .range([height - padding, padding])
                .domain([0,d3.max(hitterData, (item) => {
                    return item['launch_angle']
                })])

    //Generating Axes
    //factory methods provided by D3 to generate axis
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    //Selecting the right HTML element for canvas svg
    let svg = d3
        // .select('#vis')
        .select(`#svg-container-${idx}`)
        .append('svg')
        .attr('class', `${targetSVG} hidden`)
        .attr('width', width)
        .attr('height', height);
    
    //the xAxis is positioned at the top to start so this moves it down to the bottom
    let gX = svg.append('g')
        .call(xAxis)
        .attr('id','x-axis')
        .attr('transform', 'translate(0, ' + (height - padding) +')')

    //the yAxis is positioned at the left to start so this moves it to the right
    let gY = svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)');

    //Axis Titles
    svg.append("text")
    .attr("x", margin.left + (width - margin.left - margin.right) / 2)
    .attr("y", height - margin.bottom / 3)
    .attr("class", "label")
    .text("Exit Velocity");

    svg.append("text")
    .attr("y", margin.left/2)
    .attr("x", -height/2)
    .attr("transform", "rotate(-90)")
    .attr("class", "label")
    .text("Launch Angle");

    //Zoom Logic:

    //Creating zoom function
    const zoom = d3.zoom()
    .scaleExtent([0.5, 10])
    // .extent([0,0], [width,height])
    .on("zoom", zoomed);

//Creating a rectangle above the svg to use for zooming
let display = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(0, ' - (padding + height) +')')
    .call(zoom)

// Create the scatter variable: where both the circles and the brush take place
const scatter = svg.append('g')
    .attr("clip-path", "url(#clip)")

//Clip path rectangle so elements won't show up outside of this
let clip = svg.append("defs").append("SVG:clipPath")
    .attr("id", "clip")
    .append("SVG:rect")
    .attr("width", width )
    .attr("height", height - padding )
    .attr("x", margin.left)
    .attr("y", 0);

//Drawing circles on the scatter so we can maintain all functionality with zoom feature
scatter.selectAll('circle')
    .data(hitterData)
    .enter()
    .append('circle')
    .attr('class', (item) => {
        return 'dot' + ' ' + item['events']
    })
    .attr('r', '5')
    .attr('data-xvalue', (item) => {
        return item['launch_speed'];
    })
    .attr('data-yvalue', (item) => {
        return item['launch_angle'];
    })
    .attr('data-pitchname', (item) => {
        return item['pitch_name']
    })
    .attr('data-hitdistance', (item) => {
        return item['hit_distance_sc']
    })
    .attr('data-bbtype', (item) => {
        return item['bb_type']
    })
    .attr('data-description', (item) => {
        return item['des']
    })
    .attr('data-event', (item) => {
        return item['events']
    })
    .attr('data-season', (item) => {
        return item['game_year']
    })
    .attr('cx', (item) => {
        return xScale(item['launch_speed'])
    })
    .attr('cy', (item) => {
        return yScale(item['launch_angle'])
    })
    .attr('fill', (item) => {
        if(item['events'] === 'home_run') {
            return 'blue';
        } else if (item['events'] === 'single') {
            return 'red'
        } else if (item['events'] === 'double') {
            return 'yellow'
        } else {
            return 'green'
        }
    })
    .style('opacity', 0.75);

    //Grouping Logic
    const highlight = function() {
        //grab the identifier for which group we want
        let hitType = event.target.getAttribute('data-event');

        //hard coding the color value that we want
        let color = '';
        if (hitType === 'single') {
            color = 'red';
        } else if (hitType === 'double') {
            color = 'yellow';
        } else if (hitType === 'triple') {
            color = 'green';
        } else {
            color = 'blue';
        }

        //fill all the other circles with a generic color and smaller size
        d3.selectAll(".dot")
            .transition()
            .duration(200)
            .style("fill", "lightgrey")
            .attr("r", 3)
        
        //adjust the same group circles
        d3.selectAll('.' + hitType)
            .transition()
            .duration(200)
            .style("fill", color)
            .attr("r", 8)
    }

    // Highlight the colors back to normal for each hit
    const doNotHighlight = function(){
        d3.selectAll('.single')
            .transition()
            .duration(200)
            .style("fill", 'red')
            .attr("r", 5 )

        d3.selectAll('.double')
            .transition()
            .duration(200)
            .style("fill", 'yellow')
            .attr("r", 5 )
        
        d3.selectAll('.triple')
            .transition()
            .duration(200)
            .style("fill", 'green')
            .attr("r", 5 )
            
        d3.selectAll('.home_run')
            .transition()
            .duration(200)
            .style("fill", 'blue')
            .attr("r", 5 )
    }

    //function that is handling the zoom logic 
    function zoomed() {
        // recover the new scale
        let newX = d3.event.transform.rescaleX(xScale);
        let newY = d3.event.transform.rescaleY(yScale);

        //update axes
        gX.call(d3.axisBottom(newX));
        gY.call(d3.axisLeft(newY)); 

        //update circle position on scatter where the circles are drawn
        scatter
            .selectAll('circle')
            .attr('cx', function(item) {return newX(item['launch_speed'])})
            .attr('cy', function(item) {return newY(item['launch_angle'])})
    }
};

window.addEventListener('DOMContentLoaded', e => {
    generateVizualizations();
});

