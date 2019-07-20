(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);


	var definition = { 
		typeName: "falcon",
		visObjectType: symbolVis,
		iconUrl: '/Scripts/app/editor/symbols/ext/libraries/f-letter.png',
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: 'Table',
				Height: 200,
				Width: 400,
				BackgroundColor: '#2C3D42',
				TextColor: 'black'
			} 
		},
		configOptions: function(){ 
			return [{ 
				title: "Format Symbol",
				mode: "format" 
			}];
		} 
	}
	
	function getConfig(){
		return {
			"type"    : "pie",
			"innerRadius" : "40%",
			"theme": "dark",
			"titleField"  : "attribute",
			"valueField"  : "value",
			"legend": {
						"valueText": "[[value]] [[description]]",
						"align": "center",
						"labelWidth": 150
					},
			"dataProvider"  : [
			{
			  "attribute": "att 1",
			  "value": 8
			},
			{
			  "attribute": "att 2",
			  "value": 6
			},
			{
			  "attribute": "att 3",
			  "value": 2
			}
			]
        }      
	}
  
	symbolVis.prototype.init = function(scope, elem) {
		this.onDataUpdate = dataUpdate;
		var labels;
		
		var chartdiv = elem.find('#chartdiv')[0];
		chartdiv.id = "falcon_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(chartdiv.id, getConfig());
		var dataArray = [];
		
		function convertToChart(data){
			return data.Rows.map(function(item, index){
				return {
					value: item.Value,
					attribute: labels[index]
				}
			});
		}
		
		function updateLabel(data){
			labels = data.Rows.map(function(item){
				return item.Label;
			});
		}
		
		function dataUpdate(data){
			
			if( !data) return;
			if( data.Rows[0].Label) updateLabel(data);
			if( !labels || !chart) return;
			
			var dataprovider = convertToChart(data);
			chart.dataProvider = dataprovider; 
			chart.validateData();
		}


	};
	

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
