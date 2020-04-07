var optionChanged;

const entireSamples = d3.json("./static/js/data/samples.json")
  .then(function(data){
    console.log(data)

    optionChanged = function(optname){
      var graphdata = data.samples[data.names.indexOf(optname)]
      console.log(trace1)

      var trace1 = {
        x: graphdata.otu_ids,
        y: graphdata.sample_values,
        text: graphdata.otu_labels,
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
          x: graphdata.otu_ids,
          y: graphdata.sample_values,
          text: graphdata.otu_labels,
          mode: "markers",
          marker: {
            size: graphdata.sample_values,
            color: graphdata.otu_ids,
            colorscale: "Earth"
          }
        }
      ]
    // Render the plot to the div tag with id "bubble"
      Plotly.plot("bubble", bubbleData, bubbleLayout);

  }

    var dropDown = document.getElementById("selDataset")
    var temp = data.names.map(name => {
      var opt = document.createElement('option')
      opt.appendChild(document.createTextNode(name))
      opt.value = name
      dropDown.add(opt)
      return opt
    })
    // console.log(temp)
  })

