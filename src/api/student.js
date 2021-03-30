// 学员接口
import request from '@/utils/request'

// 查询学员列表
export function listStudent(query) {
	return request({
		url: '/human/getHumanList',
		method: 'get',
		params: query
	})
}

// 查询学员详细
export function getStudent(id) {
	return request({
		url: '/human/getHumanById/' + id,
		method: 'get'
	})
}
// 新增学员
export function addStudent(data) {
	return request({
		url: '/human/createHuman',
		method: 'post',
		data: data
	})
}

// 修改学员
export function updateStudent(id, data) {
	return request({
		url: '/human/updateHumanById/' + id,
		method: 'put',
		data: data
	})
}

// 删除学员
export function delStudent(id) {
	return request({
		url: '/human/deleteHumanById/' + id,
		method: 'delete'
	})
}
