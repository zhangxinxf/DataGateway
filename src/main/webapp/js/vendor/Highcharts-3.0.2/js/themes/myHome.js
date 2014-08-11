/**
 * Gray theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
	colors: ["#00a4cd", "#94d1ae", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	chart: {
		backgroundColor: 'none',
		borderWidth: 0,
		borderRadius: 15,
		plotBackgroundColor: null,
		plotShadow: false,
		plotBorderWidth: 0
	},
	title: {
		style: {
			color: '#FFF',
			font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
		}
	},
	subtitle: {
		style: {
			color: '#DDD',
			font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
		}
	},
	xAxis: {
        alternateGridColor: null,
        minorTickInterval: null,
        lineWidth: 0,
        tickWidth: 0,
		gridLineWidth: 0,
		labels: {
			style: {
				color: '#000',
				fontWeight: 'bold'
			}
		},
		title: {
			style: {
				color: '#AAA',
				font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			}
		}
	},
	yAxis: {
		alternateGridColor: null,
		minorTickInterval: null,
		lineWidth: 0,
		tickWidth: 0,
        gridLineWidth: 0,
		labels: {
			style: {
				color: '#000',
				fontWeight: 'bold'
			}
		},
		title: {
			style: {
				color: '#000',
				font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			}
		}
	},
	tooltip: {
		backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0, 'rgba(96, 96, 96, .8)'],
				[1, 'rgba(16, 16, 16, .8)']
			]
		},
		borderWidth: 0,
		style: {
			color: '#FFF'
		}
	},


	plotOptions: {
		series: {
			shadow: true
		}
	}
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
