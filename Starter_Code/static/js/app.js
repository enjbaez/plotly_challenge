var optionChanged;

    function buildMetadata(sample) {

      d3.json("./static/js/data/samples.json")
      .then((data) => {
      console.log(data)

      // @TODO: Complete the following function that builds the metadata panel
      // Use `d3.json` to fetch the metadata for a sample
     
          

          var metadata = data.metadata;
          var results = metadata.filter(object => object.id == sample); 
          var result = results[0]
          console.log(metadata);

          var sampleData = d3.select(`#sample-metadata`);
        // Use `.html("") to clear any existing metadata
          sampleData.html("");
        // Use `Object.entries` to add each key and value pair to the panel
        // Use d3 to append new
        // tags for each key-value in the metadata.
          Object.entries(result).forEach(function([key,value]){
            var row = sampleData.append("p");
            row.text(`${key}:${value}`);
          });
        });
    }

    function createChart(optname){
      d3.json("./static/js/data/samples.json")
      .then((data) => {
      console.log(data)
      var graphdata = data.samples;
      var results = graphdata.filter(object => object.id == optname);
      var result = results[0];
      var otu_ids = result.otu_ids;
      var sample_values = result.sample_values;
      var otu_labels = result.otu_labels;
      console.log(trace1)


      var trace1 = {
        x: otu_ids.slice(0,10).reverse(),
        y: sample_values.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        name: "OTU_Graph",
        type: "bar",
        orientation: "h"
      };

      var chartOption = [trace1];

    // Apply the group bar mode to the layout
      var layout = {
        title: "OTU_Graph",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };

      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", chartOption, layout);

      var bubbleLayout = {
        margin: { t: 0 },
        hovermode: "closests",
        xaxis: { title: "OTU ID"}
      }
  
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ]
    // Render the plot to the div tag with id "bubble"
      Plotly.plot("bubble", bubbleData, bubbleLayout);
    });
  }

    function init(){
      d3.json("./static/js/data/samples.json")
      .then((data) => {
    var dropDown = d3.select("#selDataset");
    var temp = data.names;
    temp.forEach((sample) => {
      dropDown.append('option')
      .text(sample)
      .property('value', sample);
      });
      var firstSample = temp[0]
      buildMetadata(firstSample);
      createChart(firstSample);

    // console.log(temp)
  });
}
init()

function optionChanged(sample){
  buildMetadata(sample);
  createChart(sample);  
}
