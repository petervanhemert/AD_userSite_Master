using System.Collections.Generic;
using AD_userSite_Master.ServerSide._00_CommonUtility.Models;
using AD_userSite_Master.ServerSide._00_CommonUtility.ModelsDB;

namespace AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.IRepo
{
    public interface IUserRepo
    {
        IEnumerable<UserDB> GetAll();
        UserDB FindByAccountName(string accountName);
        UserDB FindByEmail(string email);
        UserDB FindByFullName(string firstname, string lastname);
        void Add(UserDB user);
        UserDB Remove(string accountName);
        void Update(UserDB user);
    }
}
