$(function(){
    // 初始化部门和职务的数据
    initDeptAndJob();
    async function initDeptAndJob(){
        let departmentData=await queryDepart();
        let jobData=await queryJob();
        // console.log(departmentData);
        // console.log(jobData)
        if(departmentData.code===0){
            departmentData=departmentData.data;
            let str=``;
            departmentData.forEach(item=>{
                str +=`<option value="${item.id}">${item.name}</option>`;

            })
            $(".userdepartment").html(str);
        }
        if(jobData.code===0){
            jobData=jobData.data;
            let str=``;
            jobData.forEach(item=>{
                str +=`<option value="${item.id}">${item.name}</option>`;

            })
            $(".userjob").html(str);
        }
    }
    // 用户名失去焦点时，对数据进行校验
    function checkname(){
        let val=$(".username").val().trim();
        if(val.length===0){
            $(".spanusername").html("此为必选项~");
            return false;
        }
        // 用户名必须填写真实姓名(2~10个字)
        if(!/^[\u4e00-\u9fa5]{2,10}$/.test(val)){
            $(".spanusername").html("名字必须是2~10个汉字~");
            return false;

        }
        $(".spanusername").html("姓名OK")
        return true;
    }
    // 邮箱失去焦点时，对数据进行校验
    function checkemail(){
        let val=$(".useremail").val().trim();
        if(val.length===0){
            $(".spanuseremail").html("此为必选项~");
            return false;
        }
        
        if(!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-z]{2,3}$/.test(val)){
            $(".spanuseremail").html("请填写正确的邮箱~");
            return false;

        }
        $(".spanuseremail").html("邮箱OK")
        return true;
    }
    // 手机号失去焦点时，对数据进行校验
    function checkphone(){
        let val=$(".userphone").val().trim();
        if(val.length===0){
            $(".spanuserphone").html("此为必选项~");
            return false;
        }
      
        if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val)){
            $(".spanuserphone").html("手机号为11位数字~");
            return false;

        }
        $(".spanuserphone").html("手机号OK")
        return true;
    }
    $(".username").blur(checkname);
    $(".useremail").blur(checkemail);
    $(".userphone").blur(checkphone);

    $(".submit").click(async function(){
        if(!checkname()||!checkemail()||!checkphone()){
            alert("你填写的数据不合法");
            return;
        }

        // 获取用户输入的数据
        let params={
            name:$(".username").val().trim(),
            sex:$("#man").prop("checked")? 0:1,
            email:$(".useremail").val().trim(),
            phone:$(".userphone").val().trim(),
            departmentId:$(".userdepartment").val(),
            jobId:$(".userjob").val(),
            desc:$(".userdesc").val().trim()
        }
        // console.log(params)
        // 实现新增

        let result=await axios.post("/user/add",params)
        if(result.code===0){
            alert("添加员工成功~");
            window.location.href="userlist.html"
            return
        }
        alert("网络不给力，稍后再试~")
    })
  
})