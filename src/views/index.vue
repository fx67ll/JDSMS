<template>
	<div class="jdsms-box">
		<div class="jdsms-right-btnbox">
			<el-date-picker v-model="month" type="month" placeholder="月を選んでください" class="jdsms-right-btn-date"></el-date-picker>
			<el-button type="primary" icon="el-icon-search" class="jdsms-right-btn-search" @click="handleSearch">クエリー</el-button>
			<el-button type="primary" class="jdsms-right-btn-add" @click="handleAdd">
				追加
				<i class="el-icon-upload el-icon--right"></i>
			</el-button>
		</div>
		<div class="jdsms-right-table">
			<el-table :data="tableData" style="width: 100%" :max-height="tableHeight">
				<el-table-column prop="name" label="名前"></el-table-column>
				<el-table-column prop="sex" label="性別"></el-table-column>
				<el-table-column prop="birth" label="誕生日"></el-table-column>
				<el-table-column prop="phone" label="電話"></el-table-column>
				<el-table-column prop="bro" label="関連学生"></el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template slot-scope="scope">
						<el-button @click.native.prevent="handleEdit(scope.row)" type="text" size="small">編集</el-button>
						<el-button @click.native.prevent="handleCheck(scope.row)" type="text" size="small">表示</el-button>
						<el-button @click.native.prevent="handleDelete(scope.row)" type="text" size="small" style="color: red;">削除</el-button>
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
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="25%" :before-close="handleClose" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="名前"><el-input v-model="form.name" placeholder="名前を書いてください" class="form-item"></el-input></el-form-item>
				<el-form-item label="性別">
					<el-select v-model="form.sex" :clearable="true" placeholder="性別を選択してください" class="form-item">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="誕生日">
					<el-date-picker v-model="form.birth" type="date" placeholder="日付を選択してください" class="form-item"></el-date-picker>
				</el-form-item>
				<el-form-item label="電話"><el-input v-model="form.phone" placeholder="電話に記入してください" class="form-item"></el-input></el-form-item>
				<el-form-item label="関連学生"><el-input v-model="form.bro" placeholder="関連学生を記入してください。" class="form-item"></el-input></el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">キャンセル</el-button>
				<el-button type="primary" @click="dialogVisible = false">を選択します</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { listStudent, getStudent, addStudent, updateStudent, delStudent } from '@api/student.js';
import moment from 'moment';
export default {
	name: 'index',
	data() {
		return {
			form: {
				name: '',
				sex: '',
				birth: '',
				phone: '',
				bro: ''
			},
			// 查询日期
			month: moment().format('YYYY-MM-DD'),
			// 表格动态最大高度
			tableHeight: document.body.clientHeight - 210,
			// 表格数据
			tableData: [
				{
					name: '安倍晋三',
					sex: '男',
					birth: '2021-03-23',
					phone: '18902380987',
					email: '23456@qq.com',
					bro: '安倍晋六'
				}
			],
			// 当前页
			currentPage: 0,
			// 是否隐藏弹窗
			dialogVisible: false,
			// 弹窗标题
			dialogTitle: 'ダイアログ'
		};
	},
	mounted() {
		// this.initTableData();
		this.getList();
	},
	methods: {
		getList(){
			listStudent().then(res => {
				
			})
		},
		// 拦截关闭弹窗事件
		handleClose(done) {
			done();
		},
		// 每页条数改变
		handleSizeChange(val) {
			this.$message.info(`機能開発中，${val}`);
		},
		// 当前页改变
		handleCurrentChange(val) {
			this.$message.info(`機能開発中，${val}`);
		},
		// 查询
		handleSearch() {
			this.$message.info('機能開発中');
		},
		// 新增
		handleAdd() {
			this.dialogTitle = '追加';
			this.dialogVisible = true;
		},
		// 编辑
		handleEdit() {
			this.dialogTitle = '編集';
			this.dialogVisible = true;
		},
		// 查看
		handleCheck() {
			this.dialogTitle = '表示';
			this.dialogVisible = true;
		},
		// 删除
		handleDelete() {
			this.$confirm('この操作はデータを完全に削除します。続行しますか?', 'ヒント', {
				confirmButtonText: 'を選択します',
				cancelButtonText: 'キャンセル',
				type: 'warning'
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '削除に成功しました!'
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '削除しました'
					});
				});
		},
		// 表格数据初始化
		initTableData() {
			if (this.tableData.length < 100) {
				this.tableData.push({
					name: '安倍晋三',
					sex: '男',
					birth: '2021-03-23',
					phone: '18902380987',
					email: '23456@qq.com',
					bro: '安倍晋六'
				});
				this.initTableData();
			}
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.jdsms-box {
	width: 100%;
	height: 100%;
	.ban-user-select();
	.jdsms-right-btnbox {
		padding: 30px 40px 30px 40px;
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
		padding: 0 40px 0 40px;
		.jdsms-right-pagination {
			margin-top: 40px;
		}
	}
	.form-item {
		width: 85%;
	}
}
</style>
