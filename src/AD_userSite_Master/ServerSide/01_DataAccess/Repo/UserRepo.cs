using System.Collections.Generic;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.IRepo;
using AD_userSite_Master.ServerSide._00_CommonUtility.Models;
using System.Linq;
using AD_userSite_Master.ServerSide._00_CommonUtility.ModelsDB;
using Microsoft.EntityFrameworkCore;

namespace AD_userSite_Master.ServerSide._01_DataAccess.Repo
{
    public class UserRepo: IUserRepo
    {
        //private readonly DataContext _context;
        //public UserRepo(DataContext context)
        //{
        //    _context = context;
        //}
        private readonly DataContext _context;
        public UserRepo(DataContext context)
        {
            _context = context;
        }


        public UserDB FindByAccountName(string accountName)
        {
            UserDB user = _context.Users.SingleOrDefault(u => u.AccountName == accountName);
                return user;                                
        }

        public UserDB FindByEmail(string email)
        {
            //var user = _context.Users.Single(m => m.Id == id);
            UserDB user = _context.Users.SingleOrDefault(u => u.Email == email);
            return user;
        }

        public UserDB FindByFullName(string firstname, string lastname)
        {
            UserDB fullName =
                _context.Users.FirstOrDefault(u => u.FirstName == firstname && u.LastName == lastname);
            return fullName;
        }

        public IEnumerable<UserDB> GetAll()
        {
            var users = _context.Users.ToList();
            return users;
        }



        public void Add(UserDB user)
        {
            _context.Users.Add(user);
        }

        public UserDB Remove(string accountName)
        {
            UserDB user = _context.Users.Single(u => u.AccountName == accountName);
            _context.Users.Remove(user);
            return user;
        }
       
        public void Update(UserDB user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.Users.Update(user);
        }
    }
}
