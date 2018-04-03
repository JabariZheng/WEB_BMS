// @description 用户部分接口-测试
// @author 郑杰
// @date 2018-4-3

import axios from "../index.js"

var user= {
	// 获取用户信息
	getMemberInfo:function(data,success,failure){
		return axios.post("/User/GetMemberInfo",data,success,failure);
	}
}

export default user