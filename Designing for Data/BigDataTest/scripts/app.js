$(document).ready(function() {


    var self = this;
    var loader = $('#loader');
    var communityAreas;
    var allCars = null;
    var map, pointarray, heatmap;

    var mapOptions = {
        zoom: 10,
        disableDefaultUI: true,
        center: new google.maps.LatLng(41.88414, -87.63237900000001),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    //make chart
    var countData = {
        labels: [],
        datasets: [{
            fillColor: "rgba(63,159,245,1)",
            strokeColor: "rgba(220,220,220,0)",
            data: []
        }]
    }

    var countDataOption = {
        scaleOverride: true,
        scaleSteps: 5,
        scaleStepWidth: 2400,
        scaleStartValue: 0,
        barValueSpacing: 1,
        barDatasetSpacing: 10,
    };

    //car make pie
    var countPieData = [];
    var pieOptions = {
        animationEasing: "easeOutQuint",
    }

    //neightborhood
    var neighborhoodData = {
        labels: [],
        datasets: [{
            fillColor: "rgba(63,159,245,1)",
            strokeColor: "rgba(220,220,220,0)",
            data: []
        }]
    }

    var neighborhoodDataOptions = {
        scaleOverride: true,
        scaleSteps: 5,
        scaleStepWidth: 2400,
        scaleStartValue: 0,
        barValueSpacing: 1,
        barDatasetSpacing: 10,
    };


    var colorData = {
        labels: [],
        datasets: [{
            fillColor: "rgba(63,159,245,1)",
            strokeColor: "rgba(220,220,220,0)",
            data: []
        }]
    };
    var colorDataOptions = {
        scaleOverride: true,
        scaleSteps: 5,
        scaleStepWidth: 3000,
        scaleStartValue: 0,
        barValueSpacing: 1,
        barDatasetSpacing: 10,
    };





    function getData() {

        //load in community areas csv
        $.get("data/communityAreas.csv", function(data) {

            communityAreas = data.split(/\r\n|\n/);
            communityAreas.unshift(""); //add leading "0" to accomodate data

        });

        // load in abandon car data
        $.getJSON("data/abandonedCars.json", function(data) {

            //map the data to an object we can work with
            //var sample = _.sample(data.data, 100);
            allCars = _.map(data.data, function(el, index) {

                return {
                    creationDate: el[8],
                    make: el[14],
                    color: el[15],
                    daysParked: el[18],
                    neighborhood: communityAreas[el[25]],
                    location: {
                        lat: el[27],
                        lng: el[28]
                    }

                }
            });


            //group by make
            var groupedList = _.groupBy(allCars, "make");

            //sort by count
            var sortedList = _.sortBy(groupedList, function(el) {
                return el.length;
            });

            //take the top 10
            var top10 = _.last(sortedList, 10);

            //loop though and popular dataset
            $.each(top10, function(key, value) {
                countData.labels.push(value[0].make);
                countData.datasets[0].data.push(value.length);
            });


            //pie graph data
            //grab top 4 elements
            var top4 = _.last(sortedList, 4);
            //base blue  
            var h = 205;
            var s = 100;
            var l = 50;


            $.each(top4, function(key, value) {

                //push values into data array
                countPieData.push({
                    value: value.length,
                    color: 'hsl(' + h + ', ' + s + '%,' + (l - (key * 10)) + '%)' //increment shade of color
                });

            });

            //sum the remaining items into an "other" slice
            var rest = _.first(sortedList, sortedList.length - 4);
            var remainder = 0;
            $.each(rest, function(key, value) {
                remainder += value.length;
            });
            countPieData.push({
                value: remainder,
                color: 'hsl(' + h + ', ' + s + '%,' + (l + 25) + '%)'
            });


            //neighborhood chart
            //group by neighborhood
            var groupedNeighborHoodList = _.groupBy(allCars, "neighborhood");

            //sort by count
            var sortedNeighborhoodList = _.sortBy(groupedNeighborHoodList, function(el) {
                return el.length;
            });

            //take the top 20
            var top20Neighborhoods = _.last(sortedNeighborhoodList, 20);

            //loop through each neighborhood to build dataset
            $.each(top20Neighborhoods, function(key, value) {
                neighborhoodData.labels.push(value[0].neighborhood);
                neighborhoodData.datasets[0].data.push(value.length);
            });


            //color Chart        
            //group by color
            var groupedColorList = _.groupBy(allCars, "color");

            //sort by count
            var sortedColorList = _.sortBy(groupedColorList, function(el) {
                return el.length;
            });

            //take the top 10
            var top10Colors = _.last(sortedColorList, 10);

            //loop through them to create data set
            $.each(top10Colors, function(key, value) {
                colorData.labels.push(value[0].color);
                colorData.datasets[0].data.push(value.length);
            });

            //Average Time Parked
            //filter out null and nan values
            var filteredSample = _.filter(allCars, function(el) {
                return el.daysParked != null
            });

            //reduce is a fast way to calculate the sum
            var totalDaysParked = _.reduce(filteredSample, function(memo, el) {
                return el.daysParked ? memo + parseInt(el.daysParked) : memo;
            }, 0);


            var avgDaysParked = Math.round(totalDaysParked / allCars.length);
            $('.avgDaysParked').html(avgDaysParked + '<small> days</small>');


            //finally draw graphs
            drawGraphs();
            //defer load so not jerky

            setTimeout(function() {
                createHeatMap(allCars)
            }, 5000);


        }).done(function() {
            loader.hide();
        });
    }

    function drawGraphs() {

        var countCtx = document.getElementById("countChart").getContext("2d");
        var countChart = new Chart(countCtx).Bar(countData, countDataOption);

        var ctx2 = document.getElementById("pieChart").getContext("2d");
        var pieChart = new Chart(ctx2).Doughnut(countPieData, pieOptions);

        var ctx3 = document.getElementById("neighborhoodChart").getContext("2d");
        var neighborhoodChart = new Chart(ctx3).Bar(neighborhoodData);

        var ctx4 = document.getElementById("colorChart").getContext("2d");
        var neighborhoodChart = new Chart(ctx4).Bar(colorData, colorDataOptions);

    }

    function createHeatMap(data) {

        //code source: https://developers.google.com/maps/documentation/javascript/examples/layer-heatmap
        //var sample = _.sample(data, 900); //gmaps doesn't handle 70k datapoints well
        //filter for 2013 data only

        var locationData = _.map(data, function(el, index) {
            return new google.maps.LatLng(el.location.lat, el.location.lng);
        });

        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        var pointArray = new google.maps.MVCArray(locationData);

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray,
            dissipating: false,
            opacity: .75,
            radius: .1

        });

        heatmap.setMap(map);
    }

    getData();

});