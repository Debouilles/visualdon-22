import * as d3 from 'd3'
import 'd3-transition';
// import afficherMap from './map.js'
import dataCountry from '../geo.json'
// Pour importer les données
import populationData from '../data/population_total.csv'
import lifeData from '../data/life_expectancy_years.csv'
import incomeData from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'

//console.log(populationData);
// console.log(population);
// console.log(life_expectancy);
// console.log(income_per_person);

const annees = Object.keys(populationData[0])
//console.log(annees)

let converterSI = (array, variable, variableName) => {

  let convertedVariable = array.map(d => {
    // Trouver le format SI (M, B, k)
    let SI = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? d[variable.toString()].slice(-1) : d[variable.toString()];
    // Extraire la partie numérique
    let number = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? parseFloat(d[variable.toString()].slice(0, -1)) : d[variable.toString()];
    // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
      case 'M': {
        return { "country": d.country, [variableName]: Math.pow(10, 6) * number };
        break;
      }
      case 'B': {
        return { "country": d.country, [variableName]: Math.pow(10, 9) * number };
        break;
      }
      case 'k': {
        return { "country": d.country, [variableName]: Math.pow(10, 3) * number };
        break;
      }
      default: {
        return { "country": d.country, [variableName]: number };
        break;
      }
    }
  })
  return convertedVariable;
};


let pop = [],
  income = [],
  life = [],
  dataCombined = [];

// Merge data
const mergeByCountry = (a1, a2, a3) => {
  let data = [];
  a1.map(itm => {
    let newObject = {
      ...a2.find((item) => (item.country === itm.country) && item),
      ...a3.find((item) => (item.country === itm.country) && item),
      ...itm
    }
    data.push(newObject);
  })
  return data;
}

annees.forEach(annee => {
  pop.push({ "annee": annee, "data": converterSI(populationData, annee, "pop") })
  income.push({ "annee": annee, "data": converterSI(incomeData, annee, "income") })
  life.push({ "annee": annee, "data": converterSI(lifeData, annee, "life") })
  const popAnnee = pop.filter(d => d.annee == annee).map(d => d.data)[0];
  const incomeAnnee = income.filter(d => d.annee == annee).map(d => d.data)[0];
  const lifeAnnee = life.filter(d => d.annee == annee).map(d => d.data)[0];
  dataCombined.push({ "annee": annee, "data": mergeByCountry(popAnnee, incomeAnnee, lifeAnnee) })
});
console.log(dataCombined)

// console.log(income_per_person[30].country);
// console.log(income_per_person[30]['2021']);
// console.log(life_expectancy[30]['2021']);
// console.log(population[30]['2021']);


let margin = { top: 10, right: 20, bottom: 30, left: 50 },
  width = 1000 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

let svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let svg3 = d3.select("#my_dataviz3")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Générer une taille d'axe X cohérente
let theBiggestGDP = 0;
incomeData.forEach(pays => {
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
let x = d3.scaleSqrt()
  .domain([0, theBiggestGDP * 1.05])
  .range([0, width + 10]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

let x3 = d3.scaleSqrt()
  .domain([0, theBiggestGDP * 1.05])
  .range([0, width + 10]);


svg3.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x3));

// Générer une taille d'axe Y cohérente
let theBiggestLifeExp = 0;
let theSmallestLifeExp = 0;
//console.log(life_expectancy);
lifeData.forEach(pays => {
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

let y3 = d3.scaleLinear()
  .domain([20, 90])
  .range([height, 0]);
svg3.append("g")
  .call(d3.axisLeft(y3));

populationData.forEach(pays => {
  let popAnneeCourante = pays['2021'];
  if (typeof popAnneeCourante === 'string') {
    popAnneeCourante = strToInt(pays['2021']);
  }
  pays['2021'] = popAnneeCourante;
});

// Add a scale for bubble size
let z = d3.scaleSqrt()
  .domain([0, 1350000000]) //nombre max de population
  .range([0, 60]); //pixels de l'écran

// Add dots
svg.append('g')
  .selectAll("dot")
  .data(incomeData)
  .enter()
  .append("circle")
  .attr("cx", function (d) { return x(d["2021"]); })
  .attr("r", 10)
  .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
  .style("opacity", "0.7")
  .attr("stroke", "black")

svg.selectAll("circle").data(incomeData).join()
  .attr("cx", function (d) { return x(d["2021"]); })

svg.selectAll("circle").data(lifeData).join()
  .attr("cy", function (d) { return y(d["2021"]); })

svg.selectAll("circle").data(populationData).join()
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


//-------------------------------------------------------------------------------Map---------------------------------------------------
const margin2 = { top: 10, right: 50, bottom: 20, left: 20 },
  width2 = 1000 - margin2.left - margin2.right,
  height2 = 400 - margin2.top - margin2.bottom;

const svg2 = d3.select("#my_dataviz2")
  .append("svg")
  .attr("width", width2 + margin2.left + margin2.right)
  .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin2.left + "," + margin2.top + ")");

// Map and projection

const path2 = d3.geoPath();
const projection2 = d3.geoMercator()
  .scale(120)
  .center([0, 0])
  .translate([width2 / 2, height2 / 2]);

// Data and color scale
const data2 = new Map();
const colorScale2 = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeOranges[6]);
//console.log(dataCountry)
// Load external data and boot
Promise.all([
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
]).then(function (loadData) {
  let topo = loadData[0]
  console.log(topo)


  let mouseOver = function (d) {
    d3.selectAll("Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "white")
  }


  let mouseLeave = function (d) {
    d3.selectAll("Country")
      .transition()
      .duration(200)
      .style("opacity", .9)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")

  }

  // Draw the map
  svg2.append("g")
    .selectAll("path")
    .data(topo.features)
    // .data(dataCountry)
    .enter()
    .append("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection2)

    )

    // set the color of each country
    .attr("fill", function (d) {
      let populationCarte = pop[221].data.find(pop => pop.country == d.properties.name) || 0
      //console.log(populationCarte)
      return colorScale2(populationCarte.pop)
    })

    .style("stroke", "transparent")
    .attr("class", function (d) { return "Country" })
    .style("opacity", .8)
    .on("mouseover", mouseOver)
    .on("mouseleave", mouseLeave)
});


//-------------------------------------------------------------Partie animation----------------------------------------------------------------
// Variable où on stocke l'id de notre intervalle
let nIntervId;
//console.log(annees);
function animate() {
  // regarder si l'intervalle a été déjà démarré
  if (!nIntervId) {
    nIntervId = setInterval(play, 100);
  }
}

let i = 0;
function play() {
    if(dataCombined[i].annee == 2021 ) {
        i = 0;
    } else {
        i++;
    }

    d3.select('#my_dataviz3').text(dataCombined[i].annee)
    updateChart(dataCombined[i].data);

}

//   // Mise à jour graphique
//   d3.select('#my_dataviz3').text(dataCombined[i])
//   console.log(dataCombined[i].data);
//   updateChart([dataCombined[i].data]);
// }

// Mettre en pause
function stop() {
  clearInterval(nIntervId);
  nIntervId = null;
}


// function updateChart(data_iteration) {
//   svg3.selectAll('circle')
//       .data(data_iteration)
//       .join(enter => enter.append('circle')
//               .attr('cx', d => x(d.income))
//               .attr('cy', d => y(d.life))
//               .attr('r', 0)
//               .transition(d3.transition()
//                   .duration(500)
//                   .ease(d3.easeLinear))
//               .attr('r', d=> z(d.pop))
//               .attr('fill', 'rgba(0,0,0,.5)')
//           ,
//           update => update.transition(d3.transition().duration(500).ease(d3.easeLinear))
//                       .attr('cx', d => x(d.income))
//                       .attr('cy', d => y(d.life)).attr('r', d=> z(d.pop)),
//           exit => exit.remove())
// }
// Fonction de mise à jour du graphique
function updateChart(dataiteration) {
  svg3.selectAll('circle')
    .data(dataiteration)
    .join(enter => enter.append('circle')
      .attr("cx", (d) => x(d.income))
      .attr("cy", (d) => y(d.life))
      .attr("r", (d) => z(d.pop))
      .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
      .style("opacity", "0.7")
      .attr("stroke", "black"),
      update => update
      .transition(d3.transition()
      .duration(50)
      .ease(d3.easeLinear)).attr("cx", (d) => x3(d.income))
      .transition(d3.transition()
      .duration(50)
      .ease(d3.easeLinear)).attr("cy", (d) => y3(d.life))
      .transition(d3.transition()
      .duration(50)
      .ease(d3.easeLinear)).attr("r", (d) => z(d.pop)),
          exit => exit.remove()) 
    }

// Event listener
document.getElementById("btn-play").addEventListener("click", animate);
document.getElementById("btn-stop").addEventListener("click", stop);


