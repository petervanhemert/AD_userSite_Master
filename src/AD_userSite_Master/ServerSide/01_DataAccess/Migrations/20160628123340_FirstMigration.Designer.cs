using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using AD_userSite_Master.ServerSide._01_DataAccess;

namespace AD_userSite_Master.ServerSide._01_DataAccess.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20160628123340_FirstMigration")]
    partial class FirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20901")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AD_userSite_Master.ServerSide._00_CommonUtility.ModelsDB.UserDB", b =>
                {
                    b.Property<string>("AccountName");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.HasKey("AccountName");

                    b.ToTable("Users");
                });
        }
    }
}
