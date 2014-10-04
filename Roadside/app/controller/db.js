database.Main = {
    /**
    * Variable to store database connection
    * @return {Object}
    */
    dbConn : null,

    /**
    * Variable to hold class object
    * @return {Object}
    */
    classObj : null,

    /**
    * This method will create database if the mentioned DB is not yet created.
    */
    conn : function() {
        var shortName = 'test';
        var version = '1.0';
        var displayName = 'test database';
        var maxSize = 65536; // in bytes
        try{
            if (!window.openDatabase) {
                 alert('Database not supported');
            } else {
                this.dbConn = openDatabase(shortName, version, displayName, maxSize);
            }
        } catch (e){
            if(e==2){
                alert("Invalid database version.");
            } else {
                 alert("Unknown error "+e+".");
            }
            return;
        }
        classObj=database.Main;
        this.createProfile();
        this.createLogin();

    },

    errorHandler : function(transaction, error){
        // error.message is a human-readable string.
        // error.code is a numeric error code
        alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
        // Handle errors here
        var we_think_this_error_is_fatal = true;
        if (we_think_this_error_is_fatal) return true;
        return false;
    },

    dataManipulation : function (transaction, results){
        var dataArr = [], i, since_id = 0, script;
        if (results.rows && results.rows.length) {
            for (i = 0; i < results.rows.length; i++) {
                if (since_id == 0) {
                  since_id = results.rows.item(i).id;
                }
                dataArr.push(results.rows.item(i));
            }
        }
        var result=Ext.decode(dataArr[0].data);
        //alert(Ext.encode(result));
        //return result;
    },

    nullDataHandler : function(transaction) {
           //alert("trans");
    },
    createProfile : function(){
        this.dbConn.transaction(function (transaction) {
            var SQL = "CREATE TABLE IF NOT EXISTS `profile` (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, userid INTEGER, type TEXT, data TEXT)";
            transaction.executeSql(SQL, [], classObj.nullDataHandler,classObj.errorHandler);
        });
    },
    createLogin : function(){
        this.dbConn.transaction(function (transaction) {
            var SQL = "CREATE TABLE IF NOT EXISTS `users` (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, userid INTEGER, username TEXT, password TEXT)";
            transaction.executeSql(SQL, [], classObj.nullDataHandler,classObj.errorHandler);
        });
    },
    dropTable : function(tablename){
        this.dbConn.transaction(function (transaction) {
            var SQL = "DROP TABLE IF EXISTS `"+tablename+"`;";
            transaction.executeSql(SQL, [], classObj.nullDataHandler, classObj.errorHandler);
        });
    },
    serverLogin:function(profiledetails,logindetails){
        this.checkLocalUser(profiledetails,logindetails);
        this.checkUserProfile(profiledetails,logindetails)
    },
    checkLocalUser:function(profiledetails,logindetails){
        this.dbConn.transaction(function (transaction,results) {
           var SQL="SELECT * FROM `users` WHERE `userid`=?";
           transaction.executeSql(SQL, [profiledetails.id], function (transaction, results){
                if(results.rows.length <= 0){
                   classObj.insertLoginData(profiledetails,logindetails);
                }
           },classObj.errorHandler);
        });
    },
    checkUserId:function(userId){
        this.dbConn.transaction(function (transaction,results) {
           var SQL="SELECT * FROM `users` WHERE `userid`=?";
           transaction.executeSql(SQL, [userId], function (transaction, results){
                if(results.rows.length <= 0){
                   //classObj.insertLoginData(profiledetails,logindetails);
                }
           },classObj.errorHandler);
        });
    },
    checkLogin:function(logindetails){
        this.dbConn.transaction(function (transaction,results) {
            var SQL="SELECT * FROM `users` WHERE `username`=? AND `password`=?";
            transaction.executeSql(SQL, [logindetails.username,logindetails.password], function (transaction, results){
                if(results.rows.length <= 0){
                    alert("Login Failed");
                } else {
                    var userId = results.rows.item(0).userid;
                    classObj.setUserSession(userId);
                    dataLoader.showProfile(userId);
                }
            },classObj.errorHandler);
        });
    },
    checkUserProfile:function(profiledetails,logindetails){
        this.dbConn.transaction(function (transaction,results) {
            var SQL="SELECT * FROM `profile` WHERE `userid`=? AND `type`=?";
            transaction.executeSql(SQL, [profiledetails.id,'profile'], function (transaction, results){
                if(results.rows.length <= 0){
                    classObj.insertProfileData(profiledetails);
                }
            },classObj.errorHandler);
        });
    },
    validateUser:function(profiledetails,logindetails){
        this.dbConn.transaction(function (transaction,results) {
            var SQL="SELECT * FROM `users` WHERE `userid`=? AND `username`=? AND `password`=?";
            transaction.executeSql(SQL, [profiledetails.id,logindetails.username,logindetails.password], function (transaction, results){
                if(results.rows.length <= 0){
                    classObj.insertLoginData(profiledetails,logindetails);
                }
            },classObj.errorHandler);
        });
    },
    insertProfileData : function(profiledetails){
        this.dbConn.transaction(function (transaction) {
            var profilevalue=Ext.encode(profiledetails);
            transaction.executeSql('INSERT INTO `profile` (`type`,`userid`,`data`) VALUES (?, ?, ?);', ["profile",profiledetails.id,profilevalue], classObj.nullDataHandler,classObj.errorHandler);
        });
    },
    insertLoginData : function(profiledetails,logindetails){
        this.dbConn.transaction(function (transaction) {
            transaction.executeSql('INSERT INTO `users` (`userid`,`username`,`password`) VALUES (?, ?, ?);', [profiledetails.id,logindetails.username,logindetails.password], classObj.nullDataHandler,classObj.errorHandler);
        });
    },
    selectProfileData : function(userId){
        this.dbConn.transaction(function (transaction,results) {
            var SQL="SELECT * FROM `profile` WHERE userid=? AND `type`=?";
            transaction.executeSql(SQL, [userId,'profile'], function (transaction, results){
                var dataArr = [], i, since_id = 0, script;

                if (results.rows && results.rows.length) {
                    for (i = 0; i < results.rows.length; i++) {
                        if (since_id == 0) {
                          since_id = results.rows.item(i).id;
                        }
                        dataArr.push(results.rows.item(i));
                    }
                }
                var result=Ext.decode(dataArr[0].data);
                var profileform=Ext.getCmp('profileform');
                var profiledata = Ext.ModelMgr.create(result, 'profile');
                profileform.load(profiledata);
            },classObj.errorHandler);
        });
    },
    resetSession:function(){
        sessionStorage.removeItem("userid");
    },
    setUserSession:function(userId){
        sessionStorage.setItem("userid", userId);
    }
}
