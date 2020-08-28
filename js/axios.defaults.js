// 对axios进行二次封装
// axios.defaults.baseURL="http://localhost:8888";

// loaclhost和127.0.0.1:8888之间也是有跨域的
axios.defaults.baseURL="http://127.0.0.1:8888";

// 配置为true 后台的请求都会带上cookie
axios.defaults.withCredentials=true;

// 数据以表单的形式扔给服务器
axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded';

// 还是以表单的形式扔给服务器,数据格式是这样的:name=z3$age=4
axios.defaults.transformRequest=function(data){
    if(!data) return data;
    let result=``;
    for(let attr in data){
        if(!data.hasOwnProperty(attr)) break;
        result +=`&${attr}=${data[attr]}`;
    }
    return result.substring(1);
}

// 配置请求拦截器
// axios.interceptors.request.use(config=>{
//     return config
// })

// 配置响应拦截器
axios.interceptors.response.use(response=>{
    // 成功时返回数据
    return response.data;
}, reason=>{
    // 如果路径出错了，返回404，还有其他错误信息
    // console.log(reason)
    if(reason.response){
        switch(String(reason.response.status)){
            case "404":
                alert("当前请求的地址不存在！")
                break;
                default:
                    break;
        }
    }

    // 直接创建出一个失败的promise
    return Promise.reject(reason);

})