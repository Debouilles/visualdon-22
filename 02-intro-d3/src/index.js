import * as d3 from 'd3';

//création et construction des cercles dans le svg créé dans le html
const svg = d3.select(".svg");            
const cercle1 =svg.select(".cercle1");
const cercle2 =svg.select(".cercle2");
const cercle3 =svg.select(".cercle3");

//Déplacer les cercles
cercle2.attr("fill", "orange");
cercle1.attr("cx", "100");
cercle2.attr("cx", "200");

//ajouter les texte sous les cercles
svg.append("text").text("texte 1").attr("x", "100").attr("y", 110).attr("text-anchor", "middle");
svg.append("text").text("texte 2").attr("x", "200").attr("y", 210).attr("text-anchor", "middle");
svg.append("text").text("texte 3").attr("x", "250").attr("y", 310).attr("text-anchor", "middle");

//Aligner les cercle au click, deux façons différentes
cercle3.on("click", () => {
    //cercle1.attr("cx", 100);
    //cercle2.attr("cx", 100);
    //cercle3.attr("cx", 100);
    svg.selectAll("circle, text").attr("x", 100).attr("cx", 100);
    });

//Données
    const data = [20, 5, 25, 8, 15]
    svg.selectAll("bar-chart")
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d,i) => i*25 )
    .attr('y',(d) => 400-d)
    .attr('width', 20)
    .attr('height', (d) => d);