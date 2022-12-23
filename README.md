# <a name="title"></a> Velo Launch

Check out the [live site](https://ckoo13.github.io/MLB-LaunchAngle-Data-Visualizer/)!

## Demo
![Demo](/assets/readme.gif?raw=true)

### Table of contents
1. [Background and overview](#background)
2. [Functionality & MVP](#functionality)
3. [Architecture and technologies](#technologies)
4. [Implementation Timeline](#timeline)
5. [Wireframes](#wireframes)

## <a name="background"></a> Background and overview

Hitting a baseball is often agreed upon to be among the most difficult feats to perform in sports. Consequently, over professional baseball’s decades of history, there has been no shortage of coaches and players advocating for an endless variety of approaches to hitting. In recent years, hitters have begun to place a significant emphasis on optimizing launch angle: defined by MLB Statcast as “the vertical angle at which the ball leaves a player’s bat after being struck.” In other words, the launch angle is the angle formed by the trajectory of the struck baseball and the plane parallel to the ground and passing through the point of contact; a fly ball would have a relatively high launch angle, while a grounder would likely have a negative launch angle. While the true “ideal” launch angle differs slightly from hitter to hitter based on their respective skill sets, Jeff Zimmerman of RotoGraphs identifies the general range of optimal launch angles to be between 15 and 20 degrees.

The MLB Hit Graph Data Visualizer will be a simple web app with charts plotting launch angle vs. exit velocity of hits for a number of different prominent MLB hitters. The data will show the different launch angle and exit velocity combinations that lead to successful hits and the graphs will have interactivity features like plotting different color points for different types of hits. 

## <a name="functionality"></a> Functionality & MVP

Users of the MLB Hit Data Visualizer scroller are able to:

- [x] Scroll through chart visualizations for each player
- [x] Hover over each point on the chart to see the type of hit
- [x] Click on the carousel in the header to jump to data about a specific player

Bonus Features (in progess):
- [x] Click on player picture to show bio
- [x] More variable options to visualize data in D3 graphs

## <a name="technologies"></a> Architecture and technologies

Technologies used in production:

- [x] HTML5 / CSS
- [x] Vanilla JS
- [x] D3.js

## <a name="features>"></a> Features

### Filtering

Users can filter between the type of hit: single, double, triple, home run. This will allow the user to grasp a better understanding of the type of hit and its correlation with both launch angle and exit velocity.

![FilterGif](/assets/gifs/buttons.gif)


### Zoom

Users can pan and zoom over each graph to better visualize the relationships between a cluster of hit types and both launch angle/exit velocity. Zooming will also adjust the values of the x and y axis which will better allow users to visualize relationships between the outcome and launch angle/exit velocity.

![ZoomGif](/assets/gifs/zoom.gif)

## <a name="codesnippets>"></a> Code Snippets


### Zoom
```
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
```



### Interaction Observer

```
window.addEventListener('load', (e) => {
    //fade in Intersection Observer
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.20
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            entry.target.classList.toggle('appear', entry.isIntersecting);
        })
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});

```



## <a name ="implementation"></a> Implementation Timeline

- [x] Friday and Weekend: Basic functionalities, research D3, text rendering
- [x] Monday: Create json files for data on each player, start to build out graphs
- [x] Tuesday: Build scroll feature, start to layout graphs on page
- [x] Wednesday: Build out carousel and refine initial project features
- [x] Thursday: Finish project