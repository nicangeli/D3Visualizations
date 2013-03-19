			var allData = 	[	{"label":"Office and General Business", "value":0},
						{"label":"Premises Expenses", "value":0},
						{"label":"Employee Expenses", "value":0},
						{"label":"Car and Travel Expenses", "value":0},
						{"label":"Interest Expenses", "value":0},
						{"label":"Other Expenses", "value":0}
					];

			var maleData = 	[	{"label":"Office and General Business", "value":0},
						{"label":"Premises Expenses", "value":0},
						{"label":"Employee Expenses", "value":0},
						{"label":"Car and Travel Expenses", "value":0},
						{"label":"Interest Expenses", "value":0},
						{"label":"Other Expenses", "value":0}
					];

			var femaleData = 	[	{"label":"Office and General Business", "value":0},
						{"label":"Premises Expenses", "value":0},
						{"label":"Employee Expenses", "value":0},
						{"label":"Car and Travel Expenses", "value":0},
						{"label":"Interest Expenses", "value":0},
						{"label":"Other Expenses", "value":0}
					];

			$.getJSON('gp_data.json', function(data, error) {
				var items = [];
		
				$.each(data, function(key, val) { // should only be one element, since gps is the root element
					items.push(val);
				});

				for(i = 0; i < items[0].length; i++) { // loop over all of the

					$.each(items[0][i], function(k, v) {
						switch(k) {
							case "Average_Office_and_General_Business_Expenses_from_Self_Employment_£":
								if( v != "-" && v != null) {
									allData[0].value += v;
									if(items[0][i].Gender == "Male") {
										maleData[0].value += v;
									} else if(items[0][i].Gender == "Female") {
										femaleData[0].value += v;
									}
								}
							break;
							case "Average_Premises_Expenses_from_Self_Employment_£":
								if( v != "-" && v != null) {
									allData[1].value += v;		
									if(items[0][i].Gender == "Male") {
										maleData[1].value += v;
									} else if(items[0][i].Gender == "Female") {
										femaleData[1].value += v;
									}
								}
							break;
							case "Average_Employee_Expenses_from_Self_Employment_£":
								if( v != "-" && v != null) {
									allData[2].value += v;	
									if(items[0][i].Gender == "Male") {
										maleData[2].value += v;
									} else if(items[0][i].Gender == "Female") {
										femaleData[2].value += v;
									}
								}
							break;
							case "Average_Car_and_Travel_Expenses_from_Self_Employment_£":
								if( v != "-" && v != null) {
									allData[3].value += v;
									if(items[0][i].Gender == "Male") {
										maleData[3].value += v;
									} else if(items[0][i].Gender == "Female") {
										femaleData[3].value += v;
									}	
								}
							break;
							case "Average_Interest_Expenses_from_Self_Employment_£":
								if( v != "-" && v != null) {
									allData[4].value += v;
									if(items[0][i].Gender == "Male") {
										maleData[4].value += v;
									} else if(items[0][i].Gender == "Female") {
										femaleData[4].value += v;
									}		
								}
							break;							
							case "Average_Other_Expenses_from_Self_Employment_£":
								if( v != "-" && v != null) {
									allData[5].value += v;
									if(items[0][i].Gender == "Male") {
										maleData[5].value += v;
									} else if(items[0][i].Gender == "Female") {
										femaleData[5].value += v;
									}		
								}
							break;

						}

					});				
				}
				draw(getCurrentDataset());	
			});
			function draw(drawingData) { 
				var 	w = 800, 
						h = 400, 
						r = Math.min(w, h)/2,
						color = d3.scale.category20();

				var pie = d3.layout.pie()
					.sort(null);

				var arc = d3.svg.arc()
					.outerRadius(r - 100)
					.innerRadius(r - 20);


				var svg = d3.select("div.pie")
					.append("svg:svg")
						.attr("width", w)
						.attr("height", h)
					.append("svg:g")
						.attr("transform", "translate(" + r + "," + r + ")")


				var path = svg.selectAll("path")
					.data(pie(buildArray(allData)))
					.enter()
					.append("path")
						.attr("fill", function(d, i) { return color(i); })
						.attr("d", arc)
						.attr("class", "slice");
		

				d3.selectAll(".slice").on("mouseover", function(d) {
					var percentage = calculatePercentage(d.value);
					d3.select(".pie p")
						.html(percentage + "% of " + getGender() + " GP  expense money was spent on " + calculateCategory(d.value) + " that's a staggering £" + d.value);
				});

				d3.selectAll(".gender").on("change", function() {
					path = path.data(pie(buildArray(getCurrentDataset())));
					path.transition().attr("d", arc);
				});
	
				var legend = d3.select("div.pie").append("svg")
				      .attr("class", "legend")
				      .attr("width", 300)
				      .attr("height", 150)
				    .selectAll("g")
				      .data(color.domain().slice().reverse())
				    .enter().append("g")
				      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

				  legend.append("rect")
				      .attr("width", 18)
				      .attr("height", 18)
				      .style("fill", color);

				  legend.append("text")
				      .attr("x", 24)
				      .attr("y", 9)
				      .attr("dy", ".35em")
				      .text(function(d) { return allData[d].label; });
			

			}

			function buildArray(dataset) {
				var array = [];
				for(var i = 0; i < dataset.length; i++) {
					array.push(dataset[i].value);
				}
				return array;
			}

			function getCurrentDataset() {
				var gender = $('input[name=dataset]:checked', '#gender_form').val();
				if(gender == 'All') {
					return allData;
				} else if(gender == 'Male') {
					return maleData;
				} else if(gender == 'Female') {
					return femaleData;
				}
				
			}

			function calculateCategory(number) {
				var dataset = getCurrentDataset();
				var index = 0;
				for(var i = 0; i < dataset.length; i++) {
					if(dataset[i].value == number) {
						return dataset[i].label;
					}
				}
				return "ERROR"
			}

			function getGender() {
				return $('input[name=dataset]:checked', '#gender_form').val();
			}

			function calculatePercentage(number) {
				var sum = 0;
				for(var i = 0; i < getCurrentDataset().length; i++) {
					sum += getCurrentDataset()[i].value;
				}
				return ((number/sum) * 100).toFixed(2);
			}