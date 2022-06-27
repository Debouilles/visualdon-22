import * as d3 from 'd3'

// Import des données
import data from '../data/countries.geojson'

// console.log(data)

//------------------------------Exercice 1---------------------------------
d3.select(".monSVG")
    .append("circle")
    .attr("cx", "150px")
    .attr("cy", "150px")
    .attr("r", "8px")
    .attr("fill", "red")

//------------------------------Exercice 2---------------------------------
function population(data) { data.features[i].properties.POP2005.filter(function(d, i){
    return data.features[i].properties.POP2005 > 1000000;
})
}
population;
console.log(data)

// function dataPopulation(value) {
//     return value > 1000000;
// } 
// let i=0;
// const dataPop = data.features[i].properties.POP2005.filter(dataPopulation);
// console.log(dataPop);


// let i=0;
// let dataPop = data.features[i].properties.POP2005.filter(value => value.population > 1000000);
// console.log(dataPop);


// function population(data) {
//     data = data.features[i].properties.POP2005.filter(function (d, i) {
//         return data.features[i].properties.POP2005 > 1000000;

//     })
// }

// population;
// console.log(data.features[0].properties.POP2005)


//-------------------------------------------Exercice 3---------------------------

function afficherMap(){
    const margin2 = { top: 10, right: 10, bottom: 20, left: 10 },
      width2 = 950 - margin2.left - margin2.right,
      height2 = 550 - margin2.top - margin2.bottom;
    
    const svg2 = d3.select("#carte")
      .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");
    
    
    const path2 = d3.geoPath();
    const projection2 = d3.geoMercator()
      .scale(100)
      .center([0, 0])
      .translate([width2 / 2, height2 / 2]);
    
    
    
    d3.json(data).then(function(data) {
      svg2.selectAll("path")
        .data(data.features[i].properties.POP2005)
        .enter()
        .append("path")
        .attr("d", path2)
        .attr("fill", "blue");
    });
    
    
     
    
    
    
    let i =0;
      let mouseOver = function (d) {
        d3.selectAll("country")
          .transition()
          .duration(200)
          .style("opacity", .2)
    
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("stroke", "white")
          .style("fill", function(d) {
        
        ;})
    
        
          
      }
      
    
      let mouseLeave = function (d) {
        d3.selectAll('country')
          .transition()
          .duration(200)
          .style("opacity", .9)
        d3.select(this)
          .transition()
          .duration(200)
          .style("stroke", "transparent")
          .style("fill", "grey")
    
      }
    
      // Draw the map
      svg2.append("g")
        .selectAll("path")
        .data(data.features[i].properties.POP2005)
        .enter()
        .append("path")
        .attr("d", d3.geoPath()
          .projection(projection2)
    
        )
    
        .style("stroke", "transparent")
        .style("fill", "grey")
        .style("opacity", .8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
    
        // const Tooltip = d3.select("#my_dataviz2")
        // .append("div")
        // .attr("class", "tooltip")
        // .style("opacity", 1)
        // .style("background-color", "white")
        // .style("border", "solid")
        // .style("border-width", "2px")
        // .style("border-radius", "5px")
        // .style("padding", "5px")
        // const mousemove = function(event, d) {
        //   Tooltip
        //     .html(d.Team)
        //     .style("left", (event.x)/2 + "px")
        //     .style("top", (event.y)/2 - 30 + "px")
        // }
    }
    
    
   afficherMap();

