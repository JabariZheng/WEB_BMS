// @description 项目部分接口-测试
// @author 郑杰
// @date 2018-4-3

import axios from "../index.js"

var project= {
	// 获取用户信息
	getProjectInfo:function(data,success,failure){
		return axios.post("/project/getProjectInfo",data,success,failure);
	}
}

export default project