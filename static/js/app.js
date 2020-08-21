function demInfo(id) {
	
	//get data
		d3.json("data/samples.json").then(function(data){
		//console.log(data);
		//find the data for the specific id
		var meta_data = data.metadata.filter(s => s.id.toString() === id.toString())[0];
		//console.log(meta_data);
		
		var panel = d3.select("#sample-metadata");
		panel.html("");
		
		Object.entries(meta_data).forEach(function([key,value]) {	
		// test subject ID in dropdown menu	
		panel.append("p").text(`${key}: ${value}`);	
		//console.log(`${key}: ${value}`);
		
		});
		});

}




function bubbleChart(id) {
		
		//get data
		d3.json("data/samples.json").then(function(data){
		console.log(data);
		//find the data for the specific id
		var sample_data = data.samples.filter(s => s.id.toString() === id)[0];
		console.log(sample_data);
		
		//sample value data
		var s_values = sample_data.sample_values;
		//otu ids
		var s_ids = sample_data.otu_ids;
		//conver the otu ids to string, otherwise it screws up the plot
		var otu_ids = s_ids.map(s => s.toString());
		console.log(otu_ids);
		//otu labels for hover property
		var otu_labels = sample_data.otu_labels;
		
		//plot
		var trace = {
			y: s_values,
			x: s_ids,
			mode: 'markers',
			marker: {
				color: otu_ids,
				size: s_values,
				colorscale:"Jet"
					},
			text: otu_labels,
			
		};

		var data = [trace];

		var layout = {
			xaxis: {title:"OTU ID"},
			
		};

		Plotly.newPlot("bubble", data, layout);
		//console.log(`${sample_data.id}:{${otu_ids}}`);
		});
		};


function guageChart(id) {
	
	//get data
		d3.json("data/samples.json").then(function(data){
		console.log(data);
		//find the data for the specific id
		var meta_data = data.metadata.filter(s => s.id.toString() === id.toString())[0];
		//console.log(meta_data);
		var wfreq = parseInt(meta_data.wfreq);
		console.log(wfreq);
		
		var data = [
		{
		domain: { x: [0, 1], y: [0, 1] },
		value: wfreq,
		title: { text: "Belly Button Weekly Washing Frequency", font: { size: 16 } },
		type: "indicator",
		mode: "gauge+number",
		
		

		
		gauge: {
			bar:{color:"lightgray"},
			axis: { range: [null, 9] },
			steps: [
			{ range: [0, 1], color: "lightcyan"},
			{ range: [1, 2], color: "cyan" },
			{ range: [2, 3], color: "lightskyblue" },
			{ range: [3, 4], color: "deepskyblue" },
			{ range: [4, 5], color: "dodgerblue" },
			{ range: [5, 6], color: "royalblue" },
			{ range: [6, 7], color: "mediumblue" },
			{ range: [7, 8], color: "darkblue" },
			{ range: [8, 9], color: "navy" },
			
			
			
			]},
			
	

	
	}
	];
	
		var layout = {
			 font: { color: "darkblue"}
		};


Plotly.newPlot('gauge', data, layout);
		
		
		});
		};











function barPlot(id) {
		
		//get data
		d3.json("data/samples.json").then(function(data){
		console.log(data);
		//find the data for the specific id
		var sample_data = data.samples.filter(s => s.id.toString() === id)[0];
		console.log(sample_data);
		
		//sample value data
		var s_values = sample_data.sample_values.slice(0,10).reverse();
		//otu ids
		var s_ids = sample_data.otu_ids.slice(0,10).reverse();
		//conver the otu ids to string, otherwise it screws up the plot
		var otu_ids = s_ids.map(s => `OTU ${s.toString()}`);
		//console.log(otu_ids);
		//otu labels for hover property
		var otu_labels = sample_data.otu_labels.slice(0,10).reverse();
		
		//plot
		var trace = {
			x: s_values,
			y: otu_ids,
			text: otu_labels,
			type: "bar",
			orientation: "h"
		};

		var data = [trace];

		var layout = {
			title: "Top 10 OTU",
			
		};

		Plotly.newPlot("bar", data, layout);
		console.log(`${sample_data.id}:{${otu_ids}}`);
		});
		};







//DOM change update is written in html...
//not how we learned it in class but whatever 
function optionChanged(id)  {
	barPlot(id);
	demInfo(id);
	bubbleChart(id);
	guageChart(id);
	}
	
//This is how we update plotly learned from class
//Should keep the assignment consistent with class content but either way works
//Or show both methods

	
// d3.selectAll("#selDataset").on("change", updatePlotly);
// function updatePlotly(){
	
	// var dropID = d3.select("#selDataset");
	// var id = dropID.node().value;
	
	// buildPlot(id);
	// demInfo(id);
	// }
	

function init() {
	  var dropdownMenu = d3.select("#selDataset");
	  // Assign the value of the dropdown menu option to a variable
	  
	  d3.json("data/samples.json").then(function(data){
		
		data.samples.forEach(function(d) {
			
		// test subject ID in dropdown menu	
		dropdownMenu.append("option").text(d.id).property("value");	
		
	});
	barPlot(data.samples[0].id);
	demInfo(data.samples[0].id);
	bubbleChart(data.samples[0].id);
	guageChart(data.samples[0].id);
	});
	}
	
init();




