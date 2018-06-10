document.addEventListener('DOMContentLoaded', function() {
    // alert("Ready!");
    $('.se-pre-con').fadeOut("slow");
}, false);
/* Image protection code */

// Disable dragging of images
$("img").mousedown(function(){
    return false;
});
/* End of image protection code */
// Update copyright with current year
var d = new Date();
$("footer #date").text(d.getFullYear());
// initialising the WOW animations
var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
    //   callback:     function(box) {
    //     // the callback is fired every time an animation is started
    //     // the argument that is passed in is the DOM node being animated
    //   },
      scrollContainer: null // optional scroll container selector, otherwise use window
    }
  );
wow.init();

// One line enable-disable console log
console.log = function() {}

var wd = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
w = wd.innerWidth || e.clientWidth || g.clientWidth,
h = wd.innerHeight|| e.clientHeight|| g.clientHeight;



/* Heatmap viz */
var nas_data, corr_headers, corr_rows=[];
var min,max;
var groups;
// d3.csv('datasets/nas/CombinedCorrelation.csv', function(error, data) {
d3.csv('datasets/nas/OverviewCorrelationFinal.csv', function(error, data) {
    if (error) {
        alert("File Not Found: datasets/nas/OverviewCorrelationFinal.csv");
    }
    // Storing the data in a global variable
   
    // Converting data to labels and numbers from CSV strings
    nas_data = data.map(function (d){
        // console.log(d[corr_headers[1]]); Accessing the data dynamically
        
        return {
            Subjects: d.Subjects,
            Gender: +d.Gender,
            Age: +d.Age,
            Siblings: +d.Siblings,
            Handicap: +d.Handicap,
            Category: +d.Category,
            FathersEducation: +d.FathersEducation,
            MothersEducation: +d.MothersEducation,
            FathersOccupation: +d.FathersOccupation,
            MothersOccupation: +d.MothersOccupation,
            BelowPoverty: +d.BelowPoverty,
            HelpInStudy: +d.HelpInStudy,
            UseCalculator: +d.UseCalculator,
            ComputerUse: +d.ComputerUse,
            UseInternet: +d.UseInternet,
            UseDictionary: +d.UseDictionary,
            ReadOtherBooks: +d.ReadOtherBooks,
            Books: +d.Books,
            PrivateTuition: +d.PrivateTuition,            
            LibraryUse: +d.LibraryUse,
            SameLanguage: +d.SameLanguage,
            Distance: +d.Distance,
            LikeSchool: +d.LikeSchool,
            GiveHomework: +d.GiveHomework,
            CorrectHomework: +d.CorrectHomework,
            WatchTV: +d.WatchTV,
            ReadMagazine: +d.ReadMagazine,
            ReadaBook: +d.ReadaBook,
            PlayGames: +d.PlayGames,
            HelpInHousehold: +d.HelpInHousehold
        }
    });
    //Grouping the factors in broad impact areas
    // groups = {
    //     gId: ["gDemog", "gBehaviour", "gPasstime", "gParents", "gSchool"],
    //     gSchool: ["ComputerUse","LibraryUse","SameLanguage","Distance","LikeSchool","GiveHomework","CorrectHomework"],
    //     gPasstime: ["WatchTV","ReadMagazine","ReadaBook","PlayGames","HelpInHousehold"],
    //     gBehaviour: ["UseCalculator","UseInternet","UseDictionary","ReadOtherBooks","Books"],
    //     gParents: ["FathersEducation","MothersEducation","FathersOccupation","MothersOccupation","BelowPoverty","HelpInStudy","PrivateTuition"],
    //     gDemog: ["Gender","Age","Siblings","Handicap","Category"]
    // }

    // New grouping 
    groups = {
        gId: ["gDemog", "gBehaviour", "gPasstime", "gParents", "gSchool"],
        gDemog: ["Gender","Age","Siblings","Handicap","Category"],
        gBehaviour: ["UseCalculator","ComputerUse","UseInternet","UseDictionary","ReadOtherBooks","Books","PrivateTuition"],
        gPasstime: ["WatchTV","ReadMagazine","ReadaBook","PlayGames","HelpInHousehold"],        
        gParents: ["FathersEducation","MothersEducation","FathersOccupation","MothersOccupation","BelowPoverty","HelpInStudy"],
        gSchool: ["LibraryUse","SameLanguage","Distance","LikeSchool","GiveHomework","CorrectHomework"]
    }
    // Text colors for 5 groups
    groupsColour = ["g1","g2","g3","g4","g5"];
    // Getting CSV headers
    corr_headers = d3.keys(nas_data[0]); 
    for (i=0; i<nas_data.length; i++) {
        corr_rows.push(nas_data[i].Subjects);
    }
    console.log(nas_data);
    // // Waypoints controllers
    // var stkHeat = new Waypoint.Sticky({
    //     element: $('#heatFilters')[0],
    //     offset: 0
    // })

    // var stkBar = new Waypoint.Sticky({
    //     element: $('#subBtn')[0],
    //     offset: 0
    // }) 
   
    // // $('#subjects').waypoint({
    // //     handler: function(direction) {
    // //         console.log(this.element.id + ' hit');  
    // //         // if (stickyHeatFlag != 1)    
    // //         // stickyBar.destroy(); 
    // //         stickyHeat();     
    // //     },
    // //     offset: '100%'
    // // })
    // $("#qs2").waypoint ({
    //     handler: function(direction) {
    //         console.log(this.element.id + ' hit2')
    //         stkHeat.destroy();            
    //     // this.destroy()
    //     },
    //     offset: "50%"
    // })
    // $("#qs3").waypoint ({
    //     handler: function(direction) {
    //         console.log(this.element.id + ' hit2')
    //         stkBar.destroy();            
    //     // this.destroy()
    //     },
    //     offset: "50%"
    // })
    /*
    var stkBar=0, stkHeat=0; // sticky elements
       
    $("#heatmap").waypoint ({
        handler: function(direction) {
            console.log(this.element.id + ' hit2')
            stkHeat = new Waypoint.Sticky({
                element: $('#heatFilters'),
                offset: '0%'
            })            
        },
        offset: "10%"
    })
    $("div").not("#heatmap").waypoint ({
        handler: function(direction) {
            console.log(this.element.id + ' hit2')
            if (stkHeat!=0) {stkHeat.destroy(); stkHeat=0;}
        // this.destroy()
        },
        offset: "10%"
    })

    $('#digbar').waypoint({
        handler: function(direction) {
            console.log(this.element.id + ' hit'); 
            stkBar = new Waypoint.Sticky({
                element: $('#subBtn'),
                offset: '0%'
            })      
        },
        offset: '100%'
    }) 
    $("div").not("#digbar").waypoint ({
        handler: function(direction) {
            console.log(this.element.id + ' hit2')
            if (stkBar!=0) {stkBar.destroy(); stkBar=0;}
        // this.destroy()
        },
        offset: "10%"
    })
    */
    studPlot(nas_data);   
    studSubPlot(nas_data);
    heatmapSub(nas_data);
    drawHeatmap(0);
});
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
// Plotting the correlation heatmap
function heatmapSub (data) {
    let wd = document.getElementById("heatmap").clientWidth;
    let marginX = (w-wd)/2;
    let marginY = 10;
    // let ht = h*2;
    let cellw = wd/(corr_rows.length+1);
    let svgContainer = d3.select("#subjects").append("svg").attr("width", wd).attr("height",20);
    $('#subjects').waypoint({
        handler: function(direction) {
            console.log(this.element.id + ' hit');
    let colLabels = svgContainer.append('g').selectAll(".colLabelg").data(corr_rows)
                                .enter()
                                .append("text")
                                .text(function (d) { return d; })
                                .attr("x", function (d, i) { return marginX/2+cellw*(i+1); })
                                .attr("y", marginY)
                                .style("text-anchor", "middle")
                                .style("opacity",1)
                                .attr("class",  function (d,i) { return "colLabel heatLabel small c"+i;});
        $("#heatBtn").removeClass("d-none");
        this.destroy();
        },
        offset: '96%'
    })
}
function heatmap (data,id) { 
    minmax(data);
    console.log("Min="+min+" Max="+max);
    let wd = document.getElementById("heatmap").clientWidth;
    let marginX = (w-wd)/2;
    let marginY = 10;
    let cellw = wd/(corr_rows.length+1);
    let cellh = 36;
    let ht = cellh*(groups[groups.gId[id-1]].length+1);
    let svgContainer = d3.select("#"+String(groups.gId[id-1])).append("svg").attr("width", wd).attr("height", ht);
    // let xScale = d3.scaleLinear().domain([0,data.length]).range([0,180]);

    console.log("cellh="+cellh+" cellw="+cellw);
    let colorHeat = d3.scaleLinear().domain([-max,0,max]).range(["#FC466B","white","#3F5EFB"]);
    // adding bg-fill to row categories
    // let rowBg = svgContainer.append('g').selectAll("rowBg").data(corr_headers)
    //                         .enter()
    //                         .append("rect")
    //                         .attr("x", 0)
    //                         .attr("y", function (d, i) { return marginY+cellh*(i)*1; })
    //                         .attrs({width: cellw*1.2, height: cellh})
    //                         .attr("fill", "aliceblue");
    $("#"+String(groups.gId[id-1])).waypoint({
        handler: function(direction) {
            console.log(this.element.id + ' hit');
            let rowLabels = svgContainer.append('g').selectAll(".rowLabelg").data(corr_headers)
                                .enter()                         
                                .filter( function (d, i) {
                                    for (j=0; j<(groups[groups.gId[id-1]].length); j++) {
                                        if (corr_headers[i] === groups[groups.gId[id-1]][j]) {
                                            console.log(d);
                                            return d;
                                        }
                                    }
                                })
                                .append("text")
                                .text(function (d) {if (d!="Subjects") return d;})
                                .attr("x", marginX)
                                .attr("y", function (d, i) { return marginY+cellh*(i)*1; })
                                .style("text-anchor", "end")
                                .style("opacity",1)
                                .attr("class", function (d,i) { return "rowLabel heatLabel small textg"+id+" r"+i});
            
            rowLabels.on("mouseover", rowMouseOver).on("mouseout", rowMouseOut);                    
            
            let heatMap = svgContainer.append("g").attr("class","heatg");
     
            // build the heatmap
            for (i=0; i<data.length; i++)
            {
                for (j=1; j<corr_headers.length; j++)
                {   
                    for (k=0; k<(groups[groups.gId[id-1]].length); k++) 
                    {
                        if (corr_headers[j] === groups[groups.gId[id-1]][k]) {
                            heatMap.append("circle")
                                // .style("fill", function(d) {return colorHeat(data[i][corr_headers[j]])})
                                .style("fill", function(d) {
                                    if (data[i][corr_headers[j]] < 0) return "#FC466B"
                                    else return "#3F5EFB"
                                })
                                .attr("cx", marginX/2+(cellw)*(i+1))
                                .attr("cy", marginY+cellh*(k)*1)
                                .attr("r", 0*Math.abs(data[i][corr_headers[j]]))
                                .transition().delay(1000).duration(1500).ease(d3.easeCubic)
                                .attr("r", 150*Math.abs(data[i][corr_headers[j]])) // 50 is the multiplier to scale the data
                                // .attr("class", function(d) {
                                //     if (data[i][corr_headers[j]]<0)                                   {return "neg";}
                                //     else {return "pos";}
                                // })
                                .attr("data-factor",corr_headers[j])
                                .attr("class", function(d){return "cell "+groups.gId[id-1]+" r"+k+" c"+i})
                                // adding tooltip content for the circle
                                .attr("data-toggle","tooltip")
                                .attr("data-template",'<div class="tooltip" role="tooltip"><div class="arrow" style="top: 11px;"></div><div class="tooltip-inner small"></div></div>')
                                .attr("data-placement","right")
                                .attr("data-html",true)
                                .attr("data-animation",true)                                
                                .attr("title",function (d) {
                                    let val = data[i][corr_headers[j]].toFixed(2);
                                    let sign = val<0?"Negative":"Positive";
                                    let sub = i==0?"Maths%":(i==1?"Reading%":(i==2?"Science%":"Social Science%"));
                                    if (val==0) return "Zero correlation on "+sub+" marks";
                                    else return corr_headers[j]+" has a "+sign+" correlation of factor "+val+" on "+sub;
                                });     
                        }
                    }
                }
            }
            heatMap.selectAll("circle").on("mouseover", cellMouseOver).on("mouseout", cellMouseOut);
            // tooltipHeat(id);
            // callback(null);
            this.destroy(); // restrict drawing the svg to only once waypoint
        },
        offset: '100%'
    })    
 }
 function rowMouseOver(d,i) {
    if ($(this).hasClass("textg1")) {
        d3.select(this).classed("opaque",true);
        d3.selectAll(".cell.gDemog.r"+i).classed("opaque",true);
        // console.log(this+ " "+i+" "+JSON.stringify($(this)));
    }
    if ($(this).hasClass("textg2")) {
        d3.select(this).classed("opaque",true);
        d3.selectAll(".cell.gBehaviour.r"+i).classed("opaque",true);
    }
    if ($(this).hasClass("textg3")) {
        d3.select(this).classed("opaque",true);
        d3.selectAll(".cell.gPasstime.r"+i).classed("opaque",true);
    }
    if ($(this).hasClass("textg4")) {
        d3.select(this).classed("opaque",true);
        d3.selectAll(".cell.gParents.r"+i).classed("opaque",true);
    }
    if ($(this).hasClass("textg5")) {
        d3.select(this).classed("opaque",true);
        d3.selectAll(".cell.gSchool.r"+i).classed("opaque",true);
    }
 }
function rowMouseOut(d,i) {
    if ($(this).hasClass("textg1")) {
        d3.select(this).classed("opaque",false);
        d3.selectAll(".cell.gDemog.r"+i).classed("opaque",false);
        // console.log(this)
    }
    if ($(this).hasClass("textg2")) {
        d3.select(this).classed("opaque",false);
        d3.selectAll(".cell.gBehaviour.r"+i).classed("opaque",false);
    }
    if ($(this).hasClass("textg3")) {
        d3.select(this).classed("opaque",false);
        d3.selectAll(".cell.gPasstime.r"+i).classed("opaque",false);
    }
    if ($(this).hasClass("textg4")) {
        d3.select(this).classed("opaque",false);
        d3.selectAll(".cell.gParents.r"+i).classed("opaque",false);
    }
    if ($(this).hasClass("textg5")) {
        d3.select(this).classed("opaque",false);
        d3.selectAll(".cell.gSchool.r"+i).classed("opaque",false);
    }
 }
function cellMouseOver(d,i) {
    for (j=0; j<corr_rows.length; j++) {
        if ($(this).hasClass("c"+j))
        d3.select(".colLabel.c"+j).classed("opaque",true);
    } // for highlighting the selected column
    // to get the coloumn no between 0-length of group, use i%len
    function len(n) { return groups[groups.gId[n-1]].length; }
    if ($(this).hasClass("gDemog")) {
        d3.select(this).classed("opaque",true);
        console.log(this+" "+i%len(1))        
        d3.select(".rowLabel.textg1.r"+(i%len(1))).classed("opaque",true);
    }
    if ($(this).hasClass("gBehaviour")) {
        d3.select(this).classed("opaque",true);
        console.log(this+" "+len(2))        
        d3.select(".rowLabel.textg2.r"+(i%len(2))).classed("opaque",true);
    }
    if ($(this).hasClass("gPasstime")) {
        d3.select(this).classed("opaque",true);
        console.log(this+" "+i%len(3))        
        d3.select(".rowLabel.textg3.r"+(i%len(3))).classed("opaque",true);
    }
    if ($(this).hasClass("gParents")) {
        d3.select(this).classed("opaque",true);
        console.log(this+" "+i%len(4))        
        d3.select(".rowLabel.textg4.r"+(i%len(4))).classed("opaque",true);
    }
    if ($(this).hasClass("gSchool")) {
        d3.select(this).classed("opaque",true);
        console.log(this+" "+i%len(5))        
        d3.select(".rowLabel.textg5.r"+(i%len(5))).classed("opaque",true);
    }
}
function cellMouseOut(d,i) {
    for (j=0; j<corr_rows.length; j++) {
        if ($(this).hasClass("c"+j))
        d3.select(".colLabel.c"+j).classed("opaque",false);
    }
        d3.select(this).classed("opaque",false);
        // removing highlight from any row label
        $(".rowLabel").removeClass("opaque");

}

// To remove an draw heatmap groupwise on btn click
function removeHeatmap() {
    $("#gDemog svg").remove();
    $("#gBehaviour svg").remove();
    $("#gPasstime svg").remove();
    $("#gParents svg").remove();
    $("#gSchool svg").remove();
}
function drawHeatmap (id) {
    removeHeatmap(); // delete the svg if already drawn on screen
    switch(id) {
        case 1: 
            heatmap(nas_data,1);
            break;
        case 2:
            heatmap(nas_data,2);
            break;
        case 3:
            heatmap(nas_data,3);
            break;
        case 4:
            heatmap(nas_data,4);
            break;
        case 5:
            heatmap(nas_data,5);
            break;
        default:
        for (let i=1; i<=5; i++) {
            heatmap(nas_data,i);
        }
            break;
    }
}

// Intro student chart
function studPlot(data) {
    let wd = document.getElementById("studplot").clientWidth;
    // let wd = 0.5*w;
    console.log("wd="+wd);
    let marginX = 10;
    let marginY = 10;
    let cellsize = (wd-40)/100;
    let t = 50*100;
    let svgContainer = d3.select("#studplot").append("svg").attr("width", wd).attr("height",20);
    $('#studplot').waypoint({
        handler: function(direction) {
          console.log(this.element.id + ' hit')
    for (i=0; i<100; i++) {
        svgContainer.append("circle").attr("cx", cellsize*(i+1/2)).attr("cy",0).attr("r", 3).style("fill","#B0BEC5").style("opacity",0)
        .transition().delay(i*50).duration(100).ease(d3.easeCubic)
        .attr("cy",marginY).style("opacity",1);
    }
    for (i=0; i<100; i++) {
        if (i<=64) {
            svgContainer.append("circle").attr("cx", cellsize*(i+1/2)).attr("cy",marginY).attr("r", 3).style("fill","#FC466B").style("opacity", 0)
            .transition().delay(t+100).ease(d3.easeCubic)
            .style("opacity", 1);
        }
        if (i>=97) {
            svgContainer.append("circle").attr("cx", cellsize*(i+1/2)).attr("cy",marginY).attr("r", 3).style("fill","#3F5EFB").style("opacity", 0)
            .transition().delay(t+100).ease(d3.easeCubic)
            .style("opacity", 1);
        }
    }
   $("#intro-row .alert").removeClass("d-none");
    this.destroy();
    },
    offset: '100%'
    })
}

function studSubPlot(data) {
    let wd = document.getElementById("studplot").clientWidth;
    // let wd = 0.5*w;
    let marginX = 10;
    let marginY = 20;
    let cellsize = (wd-marginX*2)/4;
    // let t = 50*100;
    let sub = ["Maths","Reading","Science","Social Science"];
    let studTop = [1300,4144,695,631];
    let studFail = [60192,28873,41287,36708];
    let studCount = [92255,93079,90918,89485];
    let svgContainer = d3.select("#studsubplot").append("svg").attr("width", wd).attr("height",100);
    // Adding the subject labels on div hit
    $('#studsubplot').waypoint({
        handler: function(direction) {
          console.log(this.element.id + ' hit')
    svgContainer.selectAll("text").data(sub).enter()
    .append("text")
    .text(function (d) { return d; })
    .attr("x", function (d, i) { return cellsize*(i+1/2); })
    .attr("y", marginY)
    .style("text-anchor", "middle");

    // Adding the student dots
    let dotCellSize = cellsize/21;
    for (i=0; i<sub.length; i++) {
        topstud = Math.round(studTop[i]*100/studCount[i]);
        failstud = Math.round(studFail[i]*100/studCount[i]);
        m = 0;
        console.log("top="+topstud+" fail="+failstud);
        for (j=0; j<5; j++) {
            for (k=0; k<20; k++) {
                m++;
                if (m<=topstud) {
                    svgContainer.append("circle").attr("cx",(i*cellsize)+dotCellSize*(k+1/2)).attr("cy",2*marginY+(j+1/2)*10).attr("r", 0).style("fill","#3F5EFB")
                    .transition().delay(1000).duration(1000).ease(d3.easeCubic)
                    .attr("r",3);
                }
                else if (m>100-failstud) {
                    svgContainer.append("circle").attr("cx",(i*cellsize)+dotCellSize*(k+1/2)).attr("cy",2*marginY+(j+1/2)*10).attr("r", 0).style("fill","#FC466B")
                    .transition().delay(1000).duration(1000).ease(d3.easeCubic)
                    .attr("r",3);
                }
                else {
                    svgContainer.append("circle").attr("cx",(i*cellsize)+dotCellSize*(k+1/2)).attr("cy",2*marginY+(j+1/2)*10).attr("r", 3).style("fill","#B0BEC5")
                    .transition().delay(1000).duration(1000).ease(d3.easeCubic)
                    .attr("r",3);
                }
            }
        }
    }
    this.destroy();
    },
    offset: '100%'
    })
}
/* Heatmap viz ENDS */


/* Bar chart viz */
var dig_data, dig_factors, dig_groups;
d3.csv('datasets/nas/DivergingGraphDataset.csv', function(error, data) {
    if (error) {
        alert("File Not Found: datasets/nas/DivergingGraphDataset.csv");
    }
    // Storing the data in a global variable   
    // Converting data to labels and numbers from CSV strings
    dig_data = data.map(function (d){
        // console.log(d[corr_headers[1]]); Accessing the data dynamically
        
        return {
            Group: d.Group,
            Factor: d.Factor,
            Subject: d.Subject,
            Options: d.Options,
            AvgMarksFail: +d.AvgMarksFail,
            StudentPercentFail: +d.StudentPercentFail,
            AvgMarksTop: +d.AvgMarksTop,
            StudentPercentTop: +d.StudentPercentTop
        }
    });
    // Storng the factors list (space is also included)
    dig_factors = d3.map(dig_data, function(d){return d.Factor;}).keys();
    dig_groups = d3.map(dig_data, function(d){return d.Group;}).keys();
    // digBar(dig_data,"Maths","Distance");
    drawDigBar("Maths");
})

// Dot-bar graph
function digBar(data,subject) {
    for (let loc=0; loc<dig_factors.length; loc++) {
    // filtering the dataset for plot
    let barData = data.filter (function(d) {return d.Subject===subject}).filter (function(d) {return d.Factor === dig_factors[loc]});
    let len = barData.length;
    console.log("barData length="+len);
    // let strokewidth = 12;
    let wd = (document.getElementById("digbar").clientWidth)*0.5; // leaving 6 columns for text
    let margin = 10;
    let barWd = 2*wd/5 - 2*margin;
    let optWd = barWd/5;
    let barHt = 16;
    let labelWd = 20;   
    let ht = (barHt)*len + 2*margin;
    let scaling = 2;    
    console.log("bar wd="+wd+" ht"+ht);
    let svgContainer = d3.select("#digbar #"+dig_factors[loc]).append("svg").attr("width", wd).attr("height", ht);

    let groupId = groups.gId.indexOf(barData[0].Group)+1; // To set group colour to text labels (1,2,3,4,5)
    let extentFail = d3.extent(data, function (d) { return d.AvgMarksFail});
    let extentTop = d3.extent(data, function (d) { return d.AvgMarksTop});
    let colourFail = d3.scaleLinear().domain(extentFail).range(["#FECDD7","#FC466B"]);
    let colourTop = d3.scaleLinear().domain(extentTop).range(["#CDD5FE","#3F5EFB"]);
    let opacityFail = d3.scaleLinear().domain(extentFail).range([0.1,1]);
    let opacityTop = d3.scaleLinear().domain(extentTop).range([0.1,1]);
    // let colourFail = d3.scaleLinear().domain([20,27]).range(["#FFFFFF","#FC466B"]); // harcoded from excel
    // let colourTop = d3.scaleLinear().domain([83,89]).range(["#FFFFFF","#3F5EFB"]);

    $('#'+dig_factors[loc]).waypoint({
        handler: function(direction) {
          console.log(this.element.id + ' hit')
    
    
    let groupLabels = svgContainer.append('g')
                                .append("text")
                                .attr("x", 0)
                                .attr("y", margin)
                                .attr("transform", "translate("+0+","+ht/2+") rotate(-90)")
                                .text(dig_factors[loc])
                                .style("text-anchor", "middle")
                                .style("opacity",1)
                                .attr("class", function (d,i) { return "groupLabel small textg"+groupId+" r"+i})
                                .attr("data-factor",dig_factors[loc]);

    let bars = svgContainer.append('g').selectAll(".barFail").data(barData).enter()
    // drawing the fail scale
    bars.append("rect")
        .attr("transform", "translate("+(barWd-margin)+",0)")
        .style("stroke", "#fff")
        .attr("x", margin-100*(1)*scaling)                        
        .attr("y", function (d,i) {return margin+barHt*(i+1/4)}) 
        .attrs({width: Math.abs(100*(1)*scaling), height: 8})
        .style("stroke", "#FC466B")
        .attr("class", function (d,i) {return d.Subject+" "+d.Factor+" tickline fail r"+i});
   
    // drawing the fail bars                      
    bars.append("line")
        .attr("transform", "translate("+(barWd-margin)+",0)")
        .style("stroke", "#FC466B")
        .style("opacity", function(d) {return opacityFail(d.AvgMarksFail);})
        // .style("stroke", function(d) {
        //     return colourFail(d.AvgMarksFail);
        // })
        .attr("x1", margin)                        
        .attr("y1", function (d,i) {return margin+barHt*(i+1/2)})                        
        .attr("x2", margin)  
        .attr("y2", function (d,i) {return margin+barHt*(i+1/2)})
        .transition().delay(1000).duration(2500).ease(d3.easeCubic)
        .attr("x1", margin)                        
        .attr("y1", function (d,i) {return margin+barHt*(i+1/2)})                        
        .attr("x2", function (d) {return margin-100*(d.StudentPercentFail)*scaling})  
        .attr("y2", function (d,i) {return margin+barHt*(i+1/2)})                        
        .attr("class", function (d,i) {return d.Subject+" "+d.Factor+" bar fail r"+i})
        .attr("data-factor",function (d,i) {return d.Factor})
        .attr("data-option",function (d,i) {return d.Options})
        // tooltip data
        .attr("data-marks",function (d) {return d.AvgMarksFail;})
        .attr("data-percent",function (d) {return d.StudentPercentFail;})
        // adding tooltip content for the circle
        .attr("data-toggle","tooltip")
        .attr("data-template",'<div class="tooltip" role="tooltip"><div class="arrow" style="top: 11px;"></div><div class="tooltip-inner small"></div></div>')
        .attr("data-placement","left")
        .attr("data-html",true)
        .attr("data-animation",true)                                
        .attr("title",function (d) {
            let val = d.AvgMarksFail.toFixed(2);
            let per = (d.StudentPercentFail*100).toFixed(2);            
            return per+"% of Underachievers in this criteria scored "+val+" marks";
        });

    // drawing the factor options
    bars.append("text")
        .attr("transform", "translate("+(barWd+optWd+margin)+",0)")
        .attrs({x:0, y:function (d,i) {return margin+barHt*(i+1/2)}})
        .text(function(d) {return d.Options})
        .style("text-anchor", "middle")
        .style("opacity",1)
        .attr("class", function (d,i) { return "optionsLabel small textg"+groupId+" "+d.Subject+" "+d.Factor+" r"+i})
        .attr("data-factor",function (d,i) {return d.Factor})
        .attr("data-option",function (d,i) {return d.Options});

    // drawing the top scale
    bars.append("rect")
        .attr("transform", "translate("+(barWd+optWd*2+margin)+",0)")
        .attr("x", margin)                        
        .attr("y", function (d,i) {return margin+barHt*(i+1/4)}) 
        .attrs({width: Math.abs(margin+100*(1)*scaling), height: 8})
        .style("stroke", "#3F5EFB")
        .attr("class", function (d,i) {return d.Subject+" "+d.Factor+" tickline top r"+i});

    // drawing the top bars
    bars.append("line")
        .attr("transform", "translate("+(barWd+optWd*2+margin)+",0)")
        .style("stroke", "#3F5EFB")
        .style("opacity", function(d) { return opacityTop(d.AvgMarksTop); })
        // .style("stroke", function(d) {
        //     return colourTop(d.AvgMarksTop);
        // })
        .attr("x1", margin)                        
        .attr("y1", function (d,i) {return margin+barHt*(i+1/2)})                        
        .attr("x2", margin)  
        .attr("y2", function (d,i) {return margin+barHt*(i+1/2)})
        .transition().delay(1000).duration(2500).ease(d3.easeCubic)
        .attr("x1", margin)                        
        .attr("y1", function (d,i) {return margin+barHt*(i+1/2)})                        
        .attr("x2", function (d) {return margin+100*(d.StudentPercentTop)*scaling})  
        .attr("y2", function (d,i) {return margin+barHt*(i+1/2)})                        
        .attr("class", function (d,i) {return d.Subject+" "+d.Factor+" bar top r"+i})
        .attr("data-factor",function (d,i) {return d.Factor})
        .attr("data-option",function (d,i) {return d.Options})
        // tooltip data
        .attr("data-marks",function (d) {return d.AvgMarksTop;})
        .attr("data-percent",function (d) {return d.StudentPercentTop;})
        // adding tooltip content for the circle
        .attr("data-toggle","tooltip")
        .attr("data-template",'<div class="tooltip" role="tooltip"><div class="arrow" style="top: 11px;"></div><div class="tooltip-inner small"></div></div>')
        .attr("data-placement","right")
        .attr("data-html",true)
        .attr("data-animation",true)                                
        .attr("title",function (d) {
            let val = d.AvgMarksTop.toFixed(2);
            let per = (d.StudentPercentTop*100).toFixed(2);            
            return per+"% of Achievers in this criteria scored "+val+" marks";
        });
    
    // hover
    bars.selectAll("line").on("mouseover", barMouseOver).on("mouseout", barMouseOut);
    bars.selectAll("text").on("mouseover", barOptionMouseOver).on("mouseout", barOptionMouseOut);
    
    this.destroy();
    },
    offset: '100%'
    })
}
}
// bar chart hover function
function barMouseOver(d,i) {
    $(".groupLabel[data-factor='"+$(this).data('factor')+"']").addClass("opaque");
    $(".optionsLabel[data-factor='"+$(this).data('factor')+"'][data-option='"+$(this).data('option')+"']").addClass("opaque");
    $(".bar."+$(this).data('factor')+"[data-option='"+$(this).data('option')+"']").addClass("opaque");
    // Showing both acheiver and underachiever tooltips
    $(".bar."+$(this).data('factor')+"[data-option='"+$(this).data('option')+"']").tooltip('show');
    // To add alert-white bg to the supporting text
    $("#"+$(this).data('factor')+"Text .alert").addClass("alert-light");

}
function barMouseOut(d,i) {
    $(".groupLabel[data-factor='"+$(this).data('factor')+"']").removeClass("opaque");
    $(".optionsLabel[data-factor='"+$(this).data('factor')+"'][data-option='"+$(this).data('option')+"']").removeClass("opaque");
    $(".bar."+$(this).data('factor')+"[data-option='"+$(this).data('option')+"']").removeClass("opaque");
    $(".bar."+$(this).data('factor')+"[data-option='"+$(this).data('option')+"']").tooltip('hide');
    $("#"+$(this).data('factor')+"Text .alert").removeClass("alert-light");
}

function barOptionMouseOver(d,i) {
    $(this).addClass("opaque");
    $(".groupLabel[data-factor='"+$(this).data('factor')+"']").addClass("opaque");
    $(".bar."+$(this).data('factor')+"[data-option='"+$(this).data('option')+"']").addClass("opaque");
    $(".bar."+$(this).data('factor')+"[data-option='"+$(this).data('option')+"']").tooltip('show');
    $("#"+$(this).data('factor')+"Text .alert").addClass("alert-light");
}
function barOptionMouseOut(d,i) {
    $(this).removeClass("opaque");
    $(".groupLabel[data-factor='"+$(this).data('factor')+"']").removeClass("opaque");
    $(".bar."+$(this).data('factor')+"[data-option='"+$(this).data('option')+"']").removeClass("opaque");
    $(".bar."+$(this).data('factor')+"[data-option='"+$(this).data('option')+"']").tooltip('hide');
    $("#"+$(this).data('factor')+"Text .alert").removeClass("alert-light");
}

function removeDigBar() {
    $("#digbar svg").remove();
}

function drawDigBar(subject) {
    removeDigBar(); // delete the svg if already drawn on screen
    digDataBySubject = dig_data.filter (function(d) {return d.Subject===subject});
        digBar(digDataBySubject,subject);  
}

/* NON-VIZ code */
// Activate-Deactivate button click
 $("button").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active"); 
 });

 //enabling tooltips to listen and display
$("body").tooltip({
    selector: '[data-toggle="tooltip"]'
});

// smooth-scroll to an element on click
// $(".smooth-scroll").on("click", "a", function(t) {
//     t.preventDefault();
//     var e = $(this).attr("href")
//       , n = $(this).attr("data-offset") ? $(this).attr("data-offset") : 0
//       , i = $(this).closest("ul").attr("data-allow-hashes");
//     $("body,html").animate({
//         scrollTop: $(e).offset().top - n
//     }, 700),
//     void 0 !== i && i !== !1 && history.replaceState(null, null, e)
// })

// Waypoints controllers
var stkHeat = new Waypoint.Sticky({
    element: $('#heatFilters')[0],
    offset: '-12%'
})

var stkBar = new Waypoint.Sticky({
    element: $('#subBtn')[0],
    offset: '-12%'
}) 

$("#qs2").waypoint ({
    handler: function(direction) {
        console.log(this.element.id + ' hit2')
        stkHeat.destroy();            
    // this.destroy()
    },
    offset: "50%"
})
$("#qs3").waypoint ({
    handler: function(direction) {
        console.log(this.element.id + ' hit2')
        stkBar.destroy();            
    // this.destroy()
    },
    offset: "50%"
})


// Checking mobile browser
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}; 

// On window resize
/*
wd.addEventListener("resize", function() {
    var w_new = wd.innerWidth || e.clientWidth || g.clientWidth,
    h_new = wd.innerHeight|| e.clientHeight|| g.clientHeight;
    console.log(w_new+" wnew hnew "+h_new);
    console.log(w+" w h "+h);
    if (w_new!=w && h_new!=h) {
        w=w_new, h=h_new;
            location.reload();
    }
    else if(w_new==w && h_new!=h) {
        h=h_new;
    }
    else {
        w=w_new;
    }
});
*/
// wd.addEventListener("resize", function() {
//     if(isMobile!=true) {
//     location.reload();
//     }
// });
// Store the meta element
var viewport_meta = document.getElementById('viewport-meta');

// Define our viewport meta values
var viewports = {
		default: viewport_meta.getAttribute('content'),
		landscape: 'width=768'
	};
if (isMobile) {
    viewport_meta.setAttribute( 'content', viewports.landscape );
}