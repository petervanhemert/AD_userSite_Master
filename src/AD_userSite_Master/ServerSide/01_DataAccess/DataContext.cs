using AD_userSite_Master.ServerSide._00_CommonUtility.Models;
using AD_userSite_Master.ServerSide._00_CommonUtility.ModelsDB;
using Microsoft.EntityFrameworkCore;

namespace AD_userSite_Master.ServerSide._01_DataAccess
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
            //this.Configuration.LazyLoadingEnabled = false;
        }

        public DataContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            

            base.OnModelCreating(builder);

            //builder.Entity("POC_AC_SS.DataAccess.Models.User", b =>
            //{
            //    b.Property<string>("FirstName").HasMaxLength(50).IsRequired();
            //    b.Property<string>("LastName").HasMaxLength(50).IsRequired();
            //});
            //builder.Entity<User>(u =>
            //{
            //    u.Property<string>("FirstName").HasMaxLength(50).IsRequired();
            //    u.Property<string>("LastNamePrefix").HasMaxLength(20);
            //    u.Property<string>("LastName").HasMaxLength(50).IsRequired();
            //    u.Property<int>("Age").HasMaxLength(3).IsRequired();
            //});

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        public DbSet<UserDB> Users { get; set; }
    }
}
//TODO: LDAP://OU=Users,OU=SDMC,DC=sdmc,DC=ao-srv,DC=com (ldap://OU=Users,OU=SDMC,DC=sdmc,DC=ao-srv,DC=com/)
//TODO TEST: LDAP://OU=ADSite,OU=Development,OU=SDMC,DC=sdmc,DC=ao-srv,DC=com 