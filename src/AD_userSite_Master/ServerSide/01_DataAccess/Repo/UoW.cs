using System;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.IRepo;

namespace AD_userSite_Master.ServerSide._01_DataAccess.Repo
{
    public class UoW : IDisposable, IUoW
    {
        private readonly DataContext _context;
        public UoW(DataContext context)
        {
            _context = context;
            Users = new UserRepo(_context);

        }

        public IUserRepo Users { get; private set; }


        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context?.Dispose();
        }
    }
}
