var acuna = require('../../data/acuna_data.json');
var harper = require('../../data/bryce_data.json');
var mookie = require('../../data/mookie_data.json');
var shohei = require('../../data/shohei_data.json');
var tatis = require('../../data/tatis_data.json');

window.addEventListener('DOMContentLoaded', e => {
    //Data
    let values = mookie;

    //Scale Values
    let xScale;
    let yScale;

    //Canvas
    let width = 700;
    let height = 500;
    let padding = 50;
    let margin = {left: 30, top: 80, bottom: 30, right: 20};
    

    //Attributes of Legend
    let legendKeys = ["Home Run", "Triple", "Double", "Single"];
    
    let svg = d3.select('#mookie');

    let drawCanvas = () => {
        svg.attr('width', width);
        svg.attr('height', height);
    }

    let generateScales = () => {
        xScale = d3.scaleLinear()
                    .range([padding, width - padding])
                    .domain([d3.min(values, (item) => {
                        return item['launch_speed']
                    }) - 1, d3.max(values, (item) => {
                        return item['launch_speed']
                    }) + 1])
        yScale = d3.scaleLinear()
                    .range([height - padding, padding])
                    .domain([0,d3.max(values, (item) => {
                        return item['launch_angle\r']
                    })])
    }

    //need to rework tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr("id", "tooltip")
        .style("visibility", "hidden")
        .style('background-color', 'lightblue')
        .style('border', 'solid')
        .style('border-width', '2px')

    let drawPoint = () => {
        svg.selectAll('circle')
            .data(values)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', '5')
            .attr('data-xvalue', (item) => {
                return item['launch_speed'];
            })
            .attr('data-yvalue', (item) => {
                return item['launch_angle\r'];
            })
            .attr('data-pitchtype', (item) => {
                return item['pitch_type']
            })
            .attr('cx', (item) => {
                return xScale(item['launch_speed'])
            })
            .attr('cy', (item) => {
                return yScale(item['launch_angle\r'])
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
            .on('mouseover', function() {
                tooltip.style('visibility', 'visible')
                    .style('left', event.pageX+10+'px')
                    .style('top', event.pageY+80+'px')
                    //clean this up to make a solid tooltip
                    .html('Pitch Type: ' + this.getAttribute('data-pitchtype')) 
                d3.select(this)
                    .style('stroke', 'black')   
            })
            .on('mousemove', function() {
                tooltip
                    .style("left", (d3.mouse(this)[0]+30) + "px")
                    .style("top", (d3.mouse(this)[1]) + "px")
            })
            .on('mouseleave', function() {
                tooltip.transition()
                    .style('visibility', 'hidden')
                d3.select(this)
                    .style('stroke', 'none')
            })
    }

    let generateAxes = () => {
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .call(xAxis)
            .attr('id','x-axis')
            .attr('transform', 'translate(0, ' + (height - padding) +')')

        svg.append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform', 'translate(' + padding + ', 0)');
    }

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

    drawCanvas();
    generateScales();
    drawPoint();
    generateAxes();
})