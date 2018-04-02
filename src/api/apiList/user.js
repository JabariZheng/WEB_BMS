
import { get,post } from '../../api/index.js'

let _this=this;
let user= {
	// 获取用户信息
	getMemberInfo:(data,success,failure)=>{
		return _this.$api.get("/User/GetMemberInfo",data,success,failure);
	}
}

export default user
