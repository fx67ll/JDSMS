<template>
	<div class="jdsms-box">
		<!-- 顺手做个简易的可重复使用的echarts组件 -->
		<div class="jdsms-left" id="chartbox"></div>
		<div class="jdsms-right">
			<div class="jdsms-right-btnbox">
				<el-date-picker v-model="date" type="date" placeholder="选择日期" class="jdsms-right-btn-date"></el-date-picker>
				<el-button type="primary" icon="el-icon-search" class="jdsms-right-btn-search" @click="handleSearch">查询</el-button>
				<el-button type="primary" class="jdsms-right-btn-add" @click="handleAdd">
					新增
					<i class="el-icon-upload el-icon--right"></i>
				</el-button>
			</div>
			<div class="jdsms-right-table">
				<el-table :data="tableData" style="width: 100%" :max-height="tableHeight">
					<el-table-column prop="date" label="日期" width="140"></el-table-column>
					<el-table-column prop="name" label="姓名" width="120"></el-table-column>
					<el-table-column prop="address" label="地址"></el-table-column>
					<el-table-column fixed="right" label="操作" width="120">
						<template slot-scope="scope">
							<el-button @click.native.prevent="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
							<el-button @click.native.prevent="handleCheck(scope.row)" type="text" size="small">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400"
					class="jdsms-right-pagination"
				></el-pagination>
			</div>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="70px" class="demo-dynamic">
				<el-form-item
					prop="email"
					label="邮箱"
					:rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
				>
					<el-input v-model="dynamicValidateForm.email" class="form-input"></el-input>
				</el-form-item>
				<el-form-item
					v-for="(domain, index) in dynamicValidateForm.domains"
					:label="'弟妹' + index"
					:key="domain.key"
					:prop="'domains.' + index + '.value'"
					:rules="{
						required: true,
						message: '弟妹信息不能为空',
						trigger: 'blur'
					}"
				>
					<el-input v-model="domain.value" class="form-input"></el-input>
					<el-button @click.prevent="removeDomain(domain)">删除</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
					<el-button @click="addDomain">新增弟妹信息</el-button>
					<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import moment from 'moment';
export default {
	name: 'index',
	data() {
		return {
			// 查询日期
			date: '',
			// 表格动态最大高度
			tableHeight: document.body.clientHeight - 210,
			// 表格数据
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}
			],
			// 当前页
			currentPage: '',
			// 是否隐藏弹窗
			dialogVisible: false,
			// 弹窗标题
			dialogTitle: '对话框',
			// 动态表单
			dynamicValidateForm: {
				domains: [
					{
						value: ''
					}
				],
				email: ''
			}
		};
	},
	mounted() {
		this.initCharts();
		this.initTableData();
	},
	methods: {
		// 提交表单
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 删除一行
		removeDomain(item) {
			var index = this.dynamicValidateForm.domains.indexOf(item);
			if (index !== -1) {
				this.dynamicValidateForm.domains.splice(index, 1);
			}
		},
		// 新增一行
		addDomain() {
			this.dynamicValidateForm.domains.push({
				value: '',
				key: Date.now()
			});
		},
		// 拦截关闭弹窗事件
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		// 每页条数改变
		handleSizeChange(val) {
			this.$message.info(`功能开发中，每页 ${val} 条`);
		},
		// 当前页改变
		handleCurrentChange(val) {
			this.$message.info(`功能开发中，当前页: ${val}`);
		},
		// 查询
		handleSearch() {
			this.$message.info('功能开发中');
		},
		// 新增
		handleAdd() {
			this.$message.info('功能开发中');
			this.dialogTitle = '新增';
			this.dialogVisible = true;
		},
		// 编辑
		handleEdit() {
			this.$message.info('功能开发中');
			this.dialogTitle = '编辑';
			this.dialogVisible = true;
		},
		// 查看
		handleCheck() {
			this.$message.info('功能开发中');
			this.dialogTitle = '查看';
			this.dialogVisible = true;
		},
		// 表格数据初始化
		initTableData() {
			if (this.tableData.length < 100) {
				this.tableData.push({
					date: '2021-03-23',
					name: '王小虎' + (this.tableData.length + 1),
					address: '上海市普陀区金沙江路 1518 弄'
				});
				this.initTableData();
			}
		},
		// 加载图表
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
							['往月满十八岁', 256, 82, 88, 70, 523, 825, 25, 137, 41, 18, 33, 49],
							['本月满十八岁', 51, 351, 55, 53, 73, 628, 240, 462, 269, 36, 45, 32],
							['下月满十八岁', 40, 62, 469, 36, 45, 342, 251, 851, 55, 353, 73, 68],
							['无满十八岁', 25, 37, 41, 518, 363, 479, 56, 882, 88, 70, 453, 585]
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
		width: 65%;
		height: 100%;
	}
	.jdsms-right {
		width: 35%;
		height: 100%;
		.jdsms-right-btnbox {
			padding: 40px 70px 30px 0;
			.jdsms-right-btn-date {
				margin-right: 20px;
			}
			.jdsms-right-btn-search {
			}
			.jdsms-right-btn-add {
				float: right;
			}
		}
		.jdsms-right-table {
			height: calc(100% - 130px);
			padding: 0 40px 0 0;
			.jdsms-right-pagination {
				margin-top: 20px;
			}
		}
	}
	.form-input{
		width: calc(~"100% - 120px");
		margin-right: 20px;
	}
}
</style>
