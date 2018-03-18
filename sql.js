module.exports = {
    login : function(username,password){
        return "select * from student where s_id='"+username+"' and password='"+password+"'";
    },
    
}