var mookie = require('../../data/mookie_data.json');

window.addEventListener('DOMContentLoaded', e => {
    //Data
    let values = mookie;

    //Setting up canvas
    let width = 700;
    let height = 500;
    //padding value makes spacing the vertical scale easier
        //just make sure that this is equal to the corresponding margin value in the x-axis (margin.left)
    let padding = 50;
    let margin = {left: 50, top: 80, bottom: 30, right: 40};

    //Scale Values
    let xScale;
    let yScale;
    
    //Selecting HTML element for the canvas svg
    let svg = d3.select('#mookie');
    // Create the scatter variable: where both the circles and the brush take place
    const scatter = svg.append('g')
        .attr("clip-path", "url(#clip)")
    //method to draw Canvas
    let drawCanvas = () => {
        svg.attr('width', width);
        svg.attr('height', height);
    }


    xScale = d3.scaleLinear()
                .range([margin.left, width - margin.right])
                .domain([d3.min(values, (item) => {
                    return item['launch_speed']
                }) - 1, d3.max(values, (item) => {
                    return item['launch_speed']
                }) + 1])
    yScale = d3.scaleLinear()
                .range([height - padding, padding])
                .domain([0,d3.max(values, (item) => {
                    return item['launch_angle']
                })])


    //Generating Axes
    //factory methods provided by D3 to generate axis
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

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

    //Drawing circles
    scatter.selectAll('circle')
        .data(values)
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
                .html('Description: ' + this.getAttribute('data-description') + '<br>' + '<br>' + 'Hit Distance: ' + this.getAttribute('data-hitdistance') + '<br>' +'<br>' + 'Pitch Type: ' + this.getAttribute('data-pitchname'))
                .style('font-family', 'sans-serif')
            .html()
            d3.select(this)
                .style('stroke', 'black')
            highlight(this)  
        })
        .on('mouseleave', function() {
            tooltip.transition()
                .style('visibility', 'hidden')
            d3.select(this)
                .style('stroke', 'none')
                .style('stroke-width', 5)
            doNotHighlight()
        })


    //creating tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr("id", "tooltip")
        .style("visibility", "hidden")
        .style('background-color', 'lightblue')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('opacity', 0.75)

    //Grouping Logic
    const highlight = function(event) {

        //grab the identifier for which group we want
        let hitType = event.getAttribute('data-event');

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

    //Zoom Logic
    
    // Adding clip path so the circles that don't need to be shown don't show up
    var clip = svg.append("defs").append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Create the scatter variable: where both the circles and the brush take place
    

    //Creating zoom function
    const zoom = d3.zoom()
        .scaleExtent([0.5, 10])
        .extent([0,0], [width,height])
        .on('zoom', zoomed)

    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(zoom);

    // //need to fix this function
    function zoomed() {

        // recover the new scale
        gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
        gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));

        // update axes with these new boundaries
        let new_xScale = d3.event.transform.rescaleX(xScale);
        let new_yScale = d3.event.transform.rescaleY(yScale);

        // update circle position
        scatter
            .attr('cx', function(d) {return new_xScale(d.xScale)})
            .attr('cy', function(d) {return newY(d.yScale)});
    }

    //Creating the graph functions
    drawCanvas();
    // generateScales();
    // drawPoint();
    // generateAxes();
})