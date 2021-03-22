<template>
	<div class="jdsms-box">
		<!-- 顺手做个简易的可重复使用的echarts组件 -->
		<div class="jdsms-left" id="chartbox"></div>
		<div class="jdsms-right"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
export default {
	name: 'index',
	data() {
		return {};
	},
	mounted() {
		this.initCharts();
	},
	methods: {
		initCharts() {
			var chartDom = document.getElementById('chartbox');
			var myChart = echarts.init(chartDom);
			var option;

			setTimeout(function() {
				option = {
					legend: {
						top: 30
					},
					tooltip: {
						trigger: 'axis',
						showContent: false
					},
					dataset: {
						source: [
							['product', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
							['本月满十八岁', 56, 82, 88, 70, 53, 85, 25, 37, 41, 18, 33, 49],
							['往月满十八岁', 51, 51, 55, 53, 73, 68, 40, 62, 69, 36, 45, 32],
							['下月满十八岁', 40, 62, 69, 36, 45, 32, 51, 51, 55, 53, 73, 68],
							['无满十八岁', 25, 37, 41, 18, 33, 49, 56, 82, 88, 70, 53, 85]
						]
					},
					xAxis: { type: 'category' },
					yAxis: { gridIndex: 0 },
					grid: { top: '55%' },
					series: [
						{ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
						{ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
						{ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
						{ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
						{
							type: 'pie',
							id: 'pie',
							radius: '30%',
							center: ['50%', '30%'],
							emphasis: { focus: 'data' },
							label: {
								formatter: '{b}: {01} ({d}%)'
							},
							encode: {
								itemName: 'product',
								value: '01',
								tooltip: '01'
							}
						}
					]
				};

				myChart.on('updateAxisPointer', function(event) {
					var xAxisInfo = event.axesInfo[0];
					if (xAxisInfo) {
						var dimension = xAxisInfo.value + 1;
						myChart.setOption({
							series: {
								id: 'pie',
								label: {
									formatter: '{b}: {@[' + dimension + ']} ({d}%)'
								},
								encode: {
									value: dimension,
									tooltip: dimension
								}
							}
						});
					}
				});

				myChart.setOption(option);
			});

			option && myChart.setOption(option);
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.jdsms-box {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex;
	.ban-user-select();
	.jdsms-left {
		width: 70%;
		height: 100%;
	}
	.jdsms-right {
		width: 30%;
		height: 100%;
	}
}
</style>
