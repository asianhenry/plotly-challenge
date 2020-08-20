function demInfo(id) {
	
	//get data
		d3.json("data/samples.json").then(function(data){
		console.log(data);
		//find the data for the specific id
		var meta_data = data.metadata.filter(s => s.id.toString() === id.toString())[0];
		console.log(meta_data);
		
		var panel = d3.select("#sample-metadata");
		panel.html("");
		
		Object.entries(meta_data).forEach(function([key,value]) {	
		// test subject ID in dropdown menu	
		panel.append("p").text(`${key}: ${value}`);	
		console.log(`${key}: ${value}`);
		
	});

		});
	

	
}




function buildPlot(id) {
		
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
			title: `Top 10 OTU ID: ${sample_data.id}`,
			xaxis: { title: "Sample Values" },
			yaxis: { title: "OTU ID"}
		};

		Plotly.newPlot("bar", data, layout);
		console.log(`${sample_data.id}:{${otu_ids}}`);
		});
		};


//DOM change update is written in html...
//not how we learned it in class but whatever 
function optionChanged(id)  {
	buildPlot(id);
	demInfo(id);
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
	buildPlot(data.samples[0].id);
	demInfo(data.samples[0].id);
	});
	}
	
init();




