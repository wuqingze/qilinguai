module.exports = {
    login : function(username,password){
        return "select * from student where s_id='"+username+"' and password='"+password+"'";
    },
    honor_table: function(s_id, p_name){
        // return "select * from honor where s_id='"+s_id+"' and p_name='"+p_name+"'";
        return "select * from honor where s_id='"+s_id+"'";
    },
    teacher_login: function(username,password){
        return "select * from teacher where t_id='"+username+"' and password='"+password+"'";
    }
}