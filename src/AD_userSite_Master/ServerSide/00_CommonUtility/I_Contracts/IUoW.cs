using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.IRepo;

namespace AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts
{
    public interface IUoW
    {
        IUserRepo Users { get; }
        void SaveChanges();
        void Dispose();
    }
}
