var wd = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
w = wd.innerWidth || e.clientWidth || g.clientWidth,
h = wd.innerHeight|| e.clientHeight|| g.clientHeight;

var nas_data, corr_headers, corr_rows=[];
var min,max;
d3.csv('datasets/nas/CombinedCorrelation.csv', function(error, data) {
    if (error) {
        alert("File Not Found: datasets/nas/CombinedCorrelation.csv");
    }
    // Storing the data in a global variable
   
    // Converting data to labels and numbers from CSV strings
    nas_data = data.map(function (d){
        // console.log(d[corr_headers[1]]); Accessing the data dynamically
        return {
            Subjects: d.Subjects,
            Gender: +d.Gender,
            Age: +d.Age,
            Category: +d.Category,
            Samelanguage: +d.Samelanguage,
            Siblings: +d.Siblings,
            Handicap: +d.Handicap,
            Fatheredu: +d.Fatheredu,
            Motheredu: +d.Motheredu,
            Fatheroccupation: +d.Fatheroccupation,
            Motheroccupation: +d.Motheroccupation,
            Belowpoverty: +d.Belowpoverty,
            Usecalculator: +d.Usecalculator,
            UseInternet: +d.UseInternet,
            Usedictionary: +d.Usedictionary,
            Readotherbooks: +d.Readotherbooks,
            Books: +d.Books,
            Distance: +d.Distance,
            Computeruse: +d.Computeruse,
            Libraryuse: +d.Libraryuse,
            Likeschool: +d.Likeschool,
            GiveLangHW: +d.GiveLangHW,
            GiveMathHW: +d.GiveMathHW,
            GiveScieHW: +d.GiveScieHW,
            GiveSoScHW: +d.GiveSoScHW,
            CorrectLangHW: +d.CorrectLangHW,
            CorrectMathHW: +d.CorrectMathHW,
            CorrectScieHW: +d.CorrectScieHW,
            CorrectSocSHW: +d.CorrectSocSHW,
            HelpinStudy: +d.HelpinStudy,
            Privatetuition: +d.Privatetuition,
            Englishisdifficult: +d.Englishisdifficult,
            ReadEnglish: +d.ReadEnglish,
            Dictionarytolearn: +d.Dictionarytolearn,
            AnswerEnglishWB: +d.AnswerEnglishWB,
            AnswerEnglishaloud: +d.AnswerEnglishaloud,
            Mathsisdifficult:+d.Mathsisdifficult,
            SolveMaths: +d.SolveMaths,
            SolveMathsingroups: +d.SolveMathsingroups,
            Drawgeometry: +d.Drawgeometry,
            Explainanswers: +d.Explainanswers,
            SocSciisdifficult: +d.SocSciisdifficult,
            Historicalexcursions: +d.Historicalexcursions,
            ParticipateinSocSci: +d.ParticipateinSocSci,
            SmallgroupsinSocSci: +d.SmallgroupsinSocSci,
            ExpressSocSciviews: +d.ExpressSocSciviews,
            Scienceisdifficult: +d.Scienceisdifficult,
            Observeexperiments: +d.Observeexperiments,
            Conductexperiments: +d.Conductexperiments,
            Solvescienceproblems: +d.Solvescienceproblems,
            Expressscienceviews: +d.Expressscienceviews,
            WatchTV: +d.WatchTV,
            Readmagazine:+d.Readmagazine,
            Readabook: +d.Readabook,
            Playgames: +d.Playgames,
            Helpinhousehold: +d.Helpinhousehold
        };
    });
    // Getting CSV headers
    corr_headers = d3.keys(data[0]); 
    for (i=0; i<nas_data.length; i++) {
        corr_rows.push(nas_data[i].Subjects);
    }
    console.log(nas_data);
    heatmap(nas_data);
});

// Plotting the correlation heatmap
function heatmap (data) { 
    minmax(data);
    console.log("Min="+min+" Max="+max);
    let wd = document.getElementById("heatmap").clientWidth;
    let marginX = (w-wd)/2;
    let marginY = 10;
    let ht = h*2;
    let svgContainer = d3.select("#heatmap").append("svg").attr("width", wd).attr("height", ht);
    // let xScale = d3.scaleLinear().domain([0,data.length]).range([0,180]);
    let cellw = wd/(corr_rows.length+2);
    let cellh = ht/(corr_headers.length+1);
    console.log("cellh="+cellh+" cellw="+cellw);
    let rowLabels = svgContainer.append('g').selectAll(".rowLabelg").data(corr_headers)
                                .enter()
                                .append("text")
                                .text(function (d) {if (d!="Subjects") return d;})
                                .attr("x", marginX)
                                .attr("y", function (d, i) { return marginY+cellh*(i)*2; })
                                .style("text-anchor", "end")
                                //.attr("transform", "translate("+(-margin/2)+")," + cellw / 1.5 + ")")
                                .attr("class", function (d,i) { return "rowLabel heatLabel small r"+i;} );

    let colLabels = svgContainer.append('g').selectAll(".colLabelg").data(corr_rows)
                                .enter()
                                .append("text")
                                .text(function (d) { return d; })
                                .attr("x", function (d, i) { return marginX/2+cellw*(i+1); })
                                .attr("y", marginY)
                                .style("text-anchor", "middle")
                                //.attr("transform", "translate("+cellw/2 + ",-6) rotate (-90)")
                                .attr("class",  function (d,i) { return "colLabel heatLabel small c"+i;});

    let heatMap = svgContainer.append("g").attr("class","heatg");
                                //.data(data)
                                // .enter()
                                // .append("circle")
                                // .attr("cx", function(d) { return marginX+(cellw/2); })
                                // .attr("cy", function(d, i) { return marginY+cellh*(i+1)*2; })
                                // .attr("class", function(d){return "cell cell-border"})
                                // .attr("r", max*50);
    for (i=0; i<data.length; i++)
    {
        for (j=1; j<corr_headers.length; j++)
        {
            heatMap.append("circle")
                   .attr("cx", marginX/2+(cellw)*(i+1))
                   .attr("cy", marginY+cellh*(j)*2)
                   .attr("r", 200*Math.abs(data[i][corr_headers[j]])) // 50 is the multiplier to scale the data
                   .attr("class", function(d){return "cell r"+i+"c"+j});
        }
    }
 }

 // Calculating absolute min max
 var minmax = function (data) {
     min = max = d3.min(data, function (d) {return(Math.abs(d[corr_headers[1]]))});
    for (i=1; i<corr_headers.length; i++)
    {
        temp = d3.min(data, function (d) {return(Math.abs(d[corr_headers[i]]))});
        if(temp<min) min = temp;

        temp = d3.max(data, function (d) {return(Math.abs(d[corr_headers[i]]))});
        if(temp>max) max = temp;
    }
 }