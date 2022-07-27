//Importing all the relevant JSON data files
const mookie = require('../data/mookie_data.json');
const tatis = require('../data/tatis_data.json');
const trout = require('../data/trout_data.json');
const seager = require('../data/seager_data.json');
const machado = require('../data/machado_data.json');
const harper = require('../data/harper_data.json');
const acuna = require('../data/acuna_data.json');
const altuve = require('../data/altuve_data.json');
const freeman = require('../data/freeman_data.json');
const jram = require('../data/jram_data.json');
const jt = require('../data/jt_data.json');
const judge = require('../data/judge_data.json');
const ohtani = require('../data/ohtani_data.json');
const soto = require('../data/soto_data.json');
const votto = require('../data/votto_data.json');


//Consolidating JSON into one large array
const hitterData = [];
    hitterData.push(mookie);
    hitterData.push(tatis);
    hitterData.push(trout);
    hitterData.push(seager);
    hitterData.push(machado);
    hitterData.push(harper);
    hitterData.push(acuna);
    hitterData.push(altuve);
    hitterData.push(freeman);
    hitterData.push(jram);
    hitterData.push(jt);
    hitterData.push(judge);
    hitterData.push(ohtani);
    hitterData.push(soto);
    hitterData.push(votto);

const generateVizualizations = () => {
    
    //create initial chart
    createChart(hitterData[0], 0);

    for (let i = 1; i < hitterData.length; i++) {
        createChart(hitterData[i], i);
    }
};

//method to create each visualization
const createChart = (hitterData, idx, createXAxisBool) => {
    //Setting up dimensions
    let width = 800;
    let height = 500;
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
        .select(`#svg-container-${idx}`)
        .append('svg')
        .attr('class', `${targetSVG} hidden`)
        .attr('width', width)
        .attr('height', height)
        .style('padding', 10 + 'px')
        .style('border-radius', '10%');
    
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
    .text("Exit Velocity")
    .style('font-weight', 'bold')
    .style('font-family', 'sans-serif')

    svg.append("text")
    .attr("y", margin.left/3)
    .attr("x", -height/2)
    .attr("transform", "rotate(-90)")
    .attr("class", "label")
    .text("Launch Angle")
    .style('font-weight', 'bold')
    .style('font-family', 'sans-serif')

    //Zoom Logic:
    //Creating zoom function
    const zoom = d3.zoom()
    .scaleExtent([0.5, 10])
    // .extent([0,0], [width,height])
    .on("zoom", zoomed);

    //Creating a rectangle above the svg to use for zooming
    let display = svg.append("rect")
        .attr('class', 'background')
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

    //creating tooltip
    const tooltip = d3.select('body')
    .append('div')
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('opacity', 1)

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
        .style('opacity', 0.75)
        .on('mouseover', function() {
            tooltip
                .style('visibility', 'visible')
                .style('left', event.pageX+15+'px')
                .style('top', event.pageY-15+'px')
                //clean this up to make a solid tooltip
                .html('Description: ' + this.getAttribute('data-description') + '<br>' + '<br>' + 'Hit Distance: ' + this.getAttribute('data-hitdistance') + ' ft' + '<br>' +'<br>' + 'Pitch Type: ' + this.getAttribute('data-pitchname') + '<br>' +'<br>' + 'Exit Velo: ' + this.getAttribute('data-xvalue') + ' mph' + '<br>' +'<br>' + 'Launch Angle: ' + this.getAttribute('data-yvalue') + ' degrees')
                .style('font-family', 'sans-serif')
            d3.select(this)
                .style('stroke', 'black')
            highlight()  
        })
        .on('mouseleave', function() {
            tooltip.transition()
                .style('visibility', 'hidden')
            d3.select(this)
                .style('stroke', 'none')
                .style('stroke-width', 2)
            doNotHighlight()
        })

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

    //Checkbox Function
    function updateCheckbox() {
        //Generating an array for the checkbox selectors
        const players = ['mookie', 'tatis', 'trout', 'seager', 'machado', 'harper', 'acuna', 'altuve', 'freeman', 'jram', 'jt', 'judge', 'ohtani', 'soto', 'votto'];
       
        for (let i = 0; i < players.length; i++) {
            let svg = d3.select(`#svg-container-${i}`);
        
            d3.selectAll(`.checkbox.${players[i]}`).each(function(d) {
                checkbox = d3.select(this);
                group = checkbox.property('value');
        
                //if box is check -> display the dots
                if (checkbox.property('checked')) {
                    svg.selectAll('.' + group)
                        .transition()
                        .duration(1000)
                        .style('opacity', 0.75)
                        .attr('r', 5)
                } else {
                    svg.selectAll('.' + group)
                        .transition()
                        .duration(1000)
                        .style('opacity', 0)
                        .attr('r', 0)
                }
            })
        
            d3.selectAll(`.${players[i]}`).on('change',updateCheckbox)
        }
    }

    updateCheckbox();
});
