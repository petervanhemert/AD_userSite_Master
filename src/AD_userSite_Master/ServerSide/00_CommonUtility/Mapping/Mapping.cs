using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AD_userSite_Master.ServerSide._00_CommonUtility.Models;
using AD_userSite_Master.ServerSide._00_CommonUtility.ModelsDB;

namespace AD_userSite_Master.ServerSide._00_CommonUtility.Mapping
{
    public class Mapping
    {
        public static User MapUserDBtoUser(UserDB userDB)
        {
            User user = new User
            {
                AccountName =  userDB.AccountName,
                FirstName = userDB.FirstName,
                LastName = userDB.LastName,
                Email = userDB.Email
            };
            return user;
        }
        public static UserDB MapUsertoUserDB(User user)
        {
            UserDB userDB = new UserDB
            {
                AccountName = user.AccountName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
            return userDB;
        }
    }
}
