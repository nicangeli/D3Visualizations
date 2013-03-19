			var margin = {top: 20, right: 20, bottom: 30, left: 40},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

			var x = d3.scale.linear()
				.range([0, width]);

			var y = d3.scale.linear()
				.range([height, 0]);

			var radius = d3.scale.log()
				.range([1, 5])

			var color = d3.scale.category10();

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");

			var svg = d3.select("div.scatter").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var data; 


			d3.json("gp_data_no_pound.json", function(error, json) {
				//console.log(data);
				data = json.gps;
				//x.domain(d3.extent(data, function(d) { console.log(d.Age_Band) }))

				x.domain(d3.extent(data, function(d) { return d.Average_Total_Expenses })).nice()
				y.domain(d3.extent(data, function(d) { return d.Average_Expenses_from_Self_Employment })).nice()

				svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0, " + height + ")")
						.call(xAxis)
					.append("text")
						.attr("class", "label")
						.attr("x", width)
						.attr("y", -6)
						.style("text-anchor", "end")
						.text("Expenses from NHS Employment");


				svg.append("g")
						.attr("class", "y axis")
						.call(yAxis)
					.append("text")
						.attr("class", "label")
						.attr("transform", "rotate(-90)")
						.attr("y", 6)
						.attr("dy", ".71em")
						.style("text-anchor", "end")
						.text("Expenses from Self Employment");

					svg.selectAll(".dot")
						.data(data)
					.enter()
						.append("circle")
						.attr("class", "dot")
						.attr("r", function(d) { 
										if(doWeHaveBothParts(d)) {
											if(d.Estimated_Population == "<25" || d.Estimated_Population == null){
												return 2;
											} else {
												return radius(d.Estimated_Population)
											}
										} else {
											return 0;
										}
									}
							)
						.attr("cx", function(d) { if(d.Average_Total_Expenses == "-") { return; } else { return x(d.Average_Total_Expenses); }})
						.attr("cy", function(d) { if(d.Average_Expenses_from_Self_Employment == "-") { return; } else { return y(d.Average_Expenses_from_Self_Employment); }})
						.attr("class", function(d) { if(d.Gender == "Male") { return "dot male"} else if(d.Gender == "Female") { return "dot female"} else { return "dot"}});

					
			});

			function doWeHaveBothParts(d) {
				if(d.Average_Total_Expenses != "-" && d.Average_Total_Expenses != null && d.Average_Expenses_from_Self_Employment != "-" && d.Average_Expenses_from_Self_Employment != null) {
					return true;
				} else {
					return false;
				}
			}