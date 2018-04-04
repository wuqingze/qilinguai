module.exports = {
    login : function(username,password){
        return "select * from student where s_id='"+username+"' and password='"+password+"'";
    },
    honor_table : function(s_id, p_name){
        // return "select * from honor where s_id='"+s_id+"' and p_name='"+p_name+"'";
        return "select * from honor where s_id='"+s_id+"'";
    },
    teacher_login : function(username,password){
        return "select * from teacher where t_id='"+username+"' and password='"+password+"'";
    },
    checked_honor : "select * from honor inner join student where honor.checked=1 and honor.s_id=student.s_id",
    not_checked_honor : "select * from honor inner join student where honor.checked=0 and honor.s_id=student.s_id",
    pass_honor : function(h_id){
        return "update honor set checked=1 where h_id='"+h_id+"'";
    },
    deny_honor: function(h_id){
        return "update honor set checked=-1 where h_id='"+h_id+"'";
    },
    cancel_honor: function(h_id){
        return "update honor set checked=0 where h_id='"+h_id+"'";
    },
    insert_honor: function(h_id,p_name,s_id,theme,introduction,explanation,checked,file_id,time){
        return "insert into honor(h_id,p_name,s_id,theme,introduction,explanation,checked,file_id,time) values('"+h_id+"','"+p_name+"','"+s_id+"','"+theme+"','"+introduction+"','"+explanation+"','"+checked+"','"+file_id+"','"+time+"')";
    }
}