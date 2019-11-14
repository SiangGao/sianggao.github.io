function draw(width, height, data) {
    var base = d3.select("#vis-individual");
    var chart = base.append("canvas")
        .attr("width", width)
        .attr("height", height);

    var context = chart.node().getContext("2d");

    var marginX = 0;

    var marginY = 100;

    var domainDays = [0,17531];
    var domainCnt = [0, 9574];

    var scaleY = d3.scaleSymlog()
        .range([height, marginY])
        .domain(domainCnt)
        .constant(20);
    
    var scaleX = d3.scaleLinear()
        .range([marginX, width - marginX])
        .domain(domainDays);

    context.fillStyle = "white";
    context.font = "bold 40px Arial";
    context.fillText("Terrorist Attacks Casualties", 70, 70);
    context.font = "15px Arial";
    context.fillText("*Each dot represents one terrorist attack", 75, 90);

    data.forEach(function(d, i) {
        context.beginPath();
        context.arc(scaleX(d[0]), scaleY(d[1]), 4, 0, 2*Math.PI);
        context.fillStyle="red";
        context.globalAlpha = 0.4;
        context.fill();
        context.closePath();
    });

    var years = [[1975, 1826], [1980, 3652], [1985, 5479], [1990, 7305], [1995, 9131], [2000, 10957],
                [2005, 12784], [2010, 14610], [2015, 16436]]//, [2017, 17167]]
    
    var cnts = [10, 40, 100, 300, 1000, 3000]
            
    years.forEach(function(d, i) {
        const x = scaleX(d[1]);
        context.globalAlpha = 1.0;
        context.lineWidth = 2;
        context.fillStyle="black";
        context.beginPath();
        context.moveTo(x, height);
        context.lineTo(x, height - 15);
        context.stroke();
        context.font = "bold 15px Arial";
        context.fillText("" + d[0], x + 2, height);
    });

    cnts.forEach(function(d, i) {
        const color = "red";
        const y = scaleY(d);
        context.globalAlpha = 1.0;
        context.lineWidth = 2;
        context.strokeStyle = color;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(15, y);
        context.stroke();
        context.font = "bold 15px Arial";
        context.fillText("" + d, 0, y - 6);
    });

    context.fillStyle = "red";
    context.font = "bold 15px Arial";
    context.fillText("9/11/2001", scaleX(11576) + 10, scaleY(9574));
    context.font = "15px Arial";
    context.fillText("September 11 attacks", scaleX(11576) + 10, scaleY(9574) + 20);

    context.fillStyle = "red";
    context.font = "bold 15px Arial";
    context.fillText("3/20/1995", scaleX(9209) + 10, scaleY(5513) - 10);
    context.font = "15px Arial";
    context.fillText("Tokyo subway sarin attack", scaleX(9209) + 10, scaleY(5513) + 10);

    context.fillStyle = "red";
    context.font = "bold 15px Arial";
    context.fillText("8/7/1998", scaleX(10445) + 10, scaleY(4224));
    context.font = "15px Arial";
    context.fillText("United States embassy bombings", scaleX(10445) + 10, scaleY(4224) + 20);

}

fetch('data/days_cnt.json')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        draw(window.innerWidth, window.innerHeight, data);
    }); 