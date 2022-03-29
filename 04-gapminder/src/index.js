import * as d3 from 'd3'

// Pour importer les données
 import population from '../data/population_total.csv'
 import life_expectancy from '../data/life_expectancy_years.csv'
 import income_per_person from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'


// console.log(population);
// console.log(life_expectancy);
// console.log(income_per_person);

// const popTransformed = population.map(d => {
//     // Trouver le format SI (M, B, k)
//     let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];
    
//     // Extraire la partie numérique
//     let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0,-1)) : d["2021"];
    
//    // Selon la valeur SI, multiplier par la puissance
//     switch (SI) {
//         case 'M': {
//             return { "country": d.country, "pop": Math.pow(10, 6) * number};
//             break;
//         }
//         case 'B': {
//             return { "country": d.country, "pop": Math.pow(10, 9) * number};
//             break;
//         }
//         case 'k': {
//             return { "country": d.country, "pop": Math.pow(10, 3) * number};
//             break;
//         }
//         default: {
//             return { "country": d.country, "pop": number};
//             break;
//         }
//     }
// })

console.log(income_per_person[30].country);
console.log(income_per_person[30]['2021']);
console.log(life_expectancy[30]['2021']);
console.log(population[30]['2021']);

d3.select("body")
    .append("div")
    .attr('id', 'graph')

let margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

let svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Générer une taille d'axe X cohérente
let theBiggestGDP = 0;
income_per_person.forEach(pays => {
    let gdpAnneeCourante = pays['2021'];
    if (typeof gdpAnneeCourante === 'string') {
        gdpAnneeCourante = strToInt(pays['2021']);
    }
    pays['2021'] = gdpAnneeCourante;

    // Générer une taille d'axe X cohérente
    if (pays['2021'] >= theBiggestGDP) {
        theBiggestGDP = pays['2021'];
    }
});

// Add X axis
let x = d3.scaleLinear()
    .domain([0, theBiggestGDP * 1.05])
    .range([0, width + 10]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Générer une taille d'axe Y cohérente
let theBiggestLifeExp = 0;
let theSmallestLifeExp = 0;
console.log(life_expectancy);
life_expectancy.forEach(pays => {
    if (pays['2021'] >= theBiggestLifeExp) {
        theBiggestLifeExp = pays['2021'];
    }
    theSmallestLifeExp = theBiggestLifeExp;
    if (pays['2021'] <= theSmallestLifeExp) {
        theSmallestLifeExp = pays['2021'];
    }
    if (pays['2021'] === null && pays['2020'] !== null) {
        pays['2021'] = pays['2019'];
    } else if (pays['2021'] === null && pays['2020'] === null) {
        pays['2021'] = pays['2019'];
    }
})

// Add Y axis
let y = d3.scaleLinear()
    .domain([theSmallestLifeExp * 0.7, theBiggestLifeExp * 1.1])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

population.forEach(pays => {
    let popAnneeCourante = pays['2021'];
    if (typeof popAnneeCourante === 'string') {
        popAnneeCourante = strToInt(pays['2021']);
    }
    pays['2021'] = popAnneeCourante;
});

// Add a scale for bubble size
let z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([5, 60]);

// Add dots
svg.append('g')
    .selectAll("dot")
    .data(income_per_person)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d["2021"]); })
    .attr("r", 10)
    .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
    .style("opacity", "0.7")
    .attr("stroke", "black")

svg.selectAll("circle").data(life_expectancy).join()
    .attr("cy", function (d) { return y(d["2021"]); })

svg.selectAll("circle").data(life_expectancy).join()
    .attr("cy", function (d) { return y(d["2021"]); })

svg.selectAll("circle").data(population).join()
    .attr("r", function (d) { return z(d["2021"]); })

function strToInt(gdpAnneeCourante) {
    let multi;
    let number
    if (gdpAnneeCourante.slice(-1) === 'k') {
        multi = 1000;
        // console.log(gdpAnneeCourante + " ; c'est un k");
        number = gdpAnneeCourante.split('k')[0];
    } else if (gdpAnneeCourante.slice(-1) === 'M') {
        multi = 1000000;
        // console.log("c'est un M");
        number = gdpAnneeCourante.split('M')[0];
    } else {
        // console.log('ça beug');
    }
    number = parseInt(number * multi);
    return number;
};

//Exo2

let listCountries = []

expectancy.forEach(row => {
  let countryData = {};
  countryData[row['country']] = row['2021']
  listCountries.push(countryData)
});

// console.log(listCountries);

let margin2 = {top: 20, right: 20, bottom: 30, left: 50},
  width1 = 650 - margin.left - margin.right,
  height1 = 500 - margin.top - margin.bottom;

let svg1 = d3.select("#graph")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);

  // Map and projection
let path = d3.geoPath();
let projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);
  
// Data and color scale
let data = new Map();
let colorScale = d3.scaleThreshold()
  .domain([50, 60, 70, 80, 90, 100])
  .range(d3.schemeGreens[7]);

  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(d){
      // Draw the map
      svg.append("g")
      .selectAll("path")
      .data(d.features)
      .join("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set id
      .attr("id", function(d){ return d.properties.name;})
      .attr("fill", function (d) {
        let number = 0;
        listCountries.forEach(country => {
            if (typeof country[this.id] != "undefined") {
              console.log(country[this.id]);
              number = country[this.id]
            }
        })
        console.log(number);
        return colorScale(number);
      })
  })


