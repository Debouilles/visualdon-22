import * as d3 from 'd3'

// Import des données
import data from '../data/countries.geojson'




d3.select(".monSVG")
    .append("circle")
    .attr("cx", "150px")
    .attr("cy", "150px")
    .attr("r", "8px")
    .attr("fill", "red")

// EXERCICE 1
const ex1 = d3.select("body").append("div").attr("id", "ex1");

ex1.append("h1").text("Exercice 1");

const ex1svg = ex1.append("svg").attr("width", "200px").attr("height", "100px");

// const ex1grid = ex1svg.append("path").attr("d", "M0 0 L0 100 L10 100 L10 0 L 20 0 L 20 100 L 30 100 L 30 0 L 40 0 L 40 100 L 50 100 L 50 0 L 60 0 L 60 100 L 70 100 L 70 0 L 80 0 L 80 100 L 90 100 L 90 0 L 100 0 L 100 100 L 0 100 L 0 90 L 100 90 L 100 80 L 0 80 L 0 70 L 100 70 L 100 60 L 0 60 L 0 50 L 100 50 L 100 40 L 0 40 L 0 30 L 100 30 L 100 20 L 0 20 L 0 10 L 100 10 L 100 0 L 0 0").attr("stroke", "black").attr("fill", "none");

const ex1drawing = ex1svg.append("path").attr("d", "M 20 10 L 20 70 L 70 70 L 70 10 L 30 10 L 30 60 L 60 60 L 60 30 L 40 30 L 40 50 L 50 50 L 50 40").attr("stroke", "black").attr("stroke-width", "4px").attr("fill", "none");

const ex1drawingCircle = ex1svg.append("circle").attr("cx", "50").attr("cy", "40").attr("r", "5").attr("fill", "red");


// EXERCICE 2

const continentsNames = {
    142: "Asie",
    150: "Europe",
    2: "Afrique",
    9: "Océanie",
    19: "Amériques"
}

const ex2 = d3.select("body").append("div").attr("id", "ex2");

ex2.append("h1").text("Exercice 2");

// console.log(data.features)
// trier et ne garder que les pays avec une population sup. à 1000000
const populations = data.features.filter(d => {
    return d.properties.POP2005 > 1000000
})
// const populations = data.features.filter(feature => feature.properties.POP2005 > 1000000);

// console.log(populations)

// let continents = Array.from(d3.group(populations, d => d.properties.REGION))
//     .map(continent => {
//         return {
//             'code': continentsNames[continent[0]],
//             'average': Math.round(continent[1]
//                 .reduce((acc, curr) => acc + curr.properties.POP2005, 0) / continent[1].length)
//         };
//     });
// console.log("populations", populations);
// console.log("continents", continents);


// ex2.append("p").text("Nombre de pays qui ont plus d'un million de personne " + populations.length);
// ex2.append("p").text("Nombre de continents ont plus d'un million de personne " + continents.length);
// ex2.append("h5").text("Détails dans la console");

//Europe_____________________________________________
const europe = data.features.filter(d => {
    return d.properties.REGION == 150
})
//Océanie_____________________________________________
const oceanie = data.features.filter(d => {
    return d.properties.REGION == 9
})
//Asie_____________________________________________
const asie = data.features.filter(d => {
    return d.properties.REGION == 142
})
//Afrique_____________________________________________
const afrique = data.features.filter(d => {
    return d.properties.REGION == 2
})
//Amérique_____________________________________________
const amerique = data.features.filter(d => {
    return d.properties.REGION == 19
})

// console.log(europe)
// console.log(amerique)
// console.log(afrique)
// console.log(oceanie)
// console.log(asie)

// console.log(data.features)

//Moyenne des continents
let count = 0;
let popEurope = 0;

//EU---------------------------------------------------------
for(let i=0; i<europe.length; i++) {
    count = popEurope + europe[i].properties.POP2005;
    popEurope = count;
}
let moyenneEurope = 0;
moyenneEurope = (popEurope / europe.length).toFixed(0); //arrondi avec toFixed (pas de chiffre après la virgule)
console.log("Moyenne Europe : " + moyenneEurope)

//Asie---------------------------------------------------------
let popAsie = 0;
for(let i=0; i<asie.length; i++) {
    count = popAsie + asie[i].properties.POP2005;
    popAsie = count;
}
let moyenneAsie = 0;
moyenneAsie = (popAsie / asie.length).toFixed(0); //arrondi avec toFixed
console.log("Moyenne Asie : " + moyenneAsie)

//Oceanie---------------------------------------------------------
let popOceanie = 0;
for(let i=0; i<oceanie.length; i++) {
    count = popOceanie + oceanie[i].properties.POP2005;
    popOceanie = count;
}
let moyenneOceanie = 0;
moyenneOceanie = (popOceanie / oceanie.length).toFixed(0); //arrondi avec toFixed
console.log("Moyenne Océanie : " + moyenneOceanie)

//Afrique---------------------------------------------------------
let popAfrique = 0;
for(let i=0; i<afrique.length; i++) {
    count = popAfrique + afrique[i].properties.POP2005;
    popAfrique = count;
}
let moyenneAfrique = 0;
moyenneAfrique = (popAfrique / afrique.length).toFixed(0); //arrondi avec toFixed
console.log("Moyenne Afrique : " + moyenneAfrique)

//Amérique---------------------------------------------------------
let popAmerique = 0;
for(let i=0; i<amerique.length; i++) {
    count = popAmerique + amerique[i].properties.POP2005;
    popAmerique = count;
}
let moyenneAmerique = 0;
moyenneAmerique = (popAmerique / amerique.length).toFixed(0); //arrondi avec toFixed
console.log("Moyenne Amérique : " + moyenneAmerique)

//Moyenne 5 continents 
let moyenneContinents = 0;
moyenneContinents = (popAfrique + popAmerique + popEurope + popAsie + popOceanie) / 5;


// console.log(moyenneContinents)

ex2.append("h3").text("Moyenne de personnes par continents :  ");
ex2.append("p").text("Afrique : " + moyenneAfrique + " - Amérique : " + moyenneAmerique + " - Océanie : " + moyenneOceanie + " - Europe : " + moyenneEurope + " - Asie : " + moyenneAsie)



// EXERCICE 3

const ex3 = d3.select("body").append("div").attr("id", "ex3");

ex3.append("h1").text("Exercice 3 - Carte Chloroplète");

const ex3svg = ex3.append("svg").attr("width", "1000").attr("height", "570px");

const projection = d3.geoMercator()
.scale(190)

const path = d3.geoPath()
    .projection(projection)



// console.log([
//     d3.min(data.features.map(feature => feature.properties.POP2005)),
//     d3.max(data.features.map(feature => feature.properties.POP2005))
// ]);
const myColor = d3.scaleSqrt()
    .domain([
        d3.min(data.features.map(feature => feature.properties.POP2005)),
        d3.max(data.features.map(feature => feature.properties.POP2005))
    ])
    .range(["white", "purple"])



const tooltipDiv = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

ex3svg.selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("data-population", function (d) {
        return d.properties.POP2005;
    })
    .attr("data-country", function (d) {
        return d.properties.NAME;
    })
    .attr("d", path)
    .attr("fill", function (d) {
        return myColor(d.properties.POP2005);
    })
    .attr("stroke", "grey")
    .attr("stroke-width", "0.20px")
    .on("mouseover", function (d) {
        tooltipDiv.transition()
            .duration(200)
            .style("opacity", 1)
        tooltipDiv.html("Pays : " + this.dataset.country + " avec " + this.dataset.population + " personnes")
            .style("left", (d.clientX) + "px")
            .style("top", (d.clientY + 100) + "px");
    })
    .on("mouseout", function (d) {
        tooltipDiv.transition()
            .duration(500)
            .style("opacity", 0);
    });


// CHART BAR


let continents = Array.from(d3.group(populations, d => d.properties.REGION))
    .map(continent => {
        return {
            'code': continentsNames[continent[0]],
            'average': Math.round(continent[1]
                .reduce((acc, curr) => acc + curr.properties.POP2005, 0) / continent[1].length)
        };
    });
continents = continents.sort((b, a) => a.average - b.average);

const ex3ChartWidth = 550;
const ex3ChartHeight = 500;

//essais couleur __________________________________________

// const myColor2 = d3.scaleSqrt()
//     .domain([
//         d3.min(continents.map(d => d.properties.POP2005)),
//         d3.max(continents.map(d => d.properties.POP2005))
//     ])
//     .range(["white", "purple"])

const ex3Chart = d3.select("body").append("div").attr("id", "ex3Chart");

ex3Chart.append("h1").text("Exercice 3 - Chart Bar");

const ex3ChartSVG = ex3Chart.append("svg").attr("width", "550px").attr("height", "600px").attr("transform", "rotate(90)");

console.log(continents.map(c => c.code));

const x = d3.scaleBand()
    .range([0, ex3ChartWidth])
    .domain(continents.map(c => c.code))
    .padding(0.2);

ex3ChartSVG.append("g")
    .attr("transform", "translate(0," + ex3ChartHeight + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-13,10)rotate(-90)")
    .style("text-anchor", "end");


// Add Y axis
const y = d3.scaleLinear()
    .domain([0, d3.max(continents.map(c => c.average))])
    .range([ex3ChartHeight, 0]);


ex3ChartSVG.append("g")
    .call(d3.axisLeft(y));

// Bars
ex3ChartSVG.selectAll("mybar")
    .data(continents)
    .enter()
    .append("rect")
    .attr('data-name', d => d.code)
    .attr('data-pop', d => d.average)
    .attr("x", function (d) { return x(d.code); })
    .attr("y", function (d) { return y(d.average); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return ex3ChartHeight - y(d.average); })
    .attr("fill", "purple")
    // .attr("fill", function (d) {
    //     return myColor2(continents.map.POP2005);
    // })
    .on("mouseover", function (d) {
        tooltipDiv.transition()
            .duration(200)
            .style("opacity", 1);
        tooltipDiv.html(this.dataset.name + " " + this.dataset.pop)
            .style("left", (d.clientX) + "px")
            .style("top", (d.clientY + 500) + "px");
    })
    .on("mouseout", function (d) {
        tooltipDiv.transition()
            .duration(500)
            .style("opacity", 0);
    });




//EXERCICE 4

/* const url = 'https://heig-vd.ch/formations/bachelor/filieres';


//screenshot
(async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url)
    await page.screenshot({ path: 'screenshot.png' })
    await browser.close()
})();

// fillieres 
(async() => {
    const response = await axios.get(url)
    const dom = new JSDOM(response.data);
    let fillieresTd = dom.window.document.querySelectorAll(".liste-formations td");
    //console.log(p[0].querySelectorAll("div.ratings p")[1].getAttribute("data-rating"));
    const fillieresName = [];

    const orientations = [];

    for (const td of fillieresTd) {
        if (td.classList.contains("prog")) {
            fillieresName.push(td.innerText);
        }
    }
    console.log(fillieresName);

    for (const td of fillieresTd) {
        if (td.classList.contains("ori")) {
            orientations.push(td.innerText);
        }
    }

    console.log(orientations);

})(); */