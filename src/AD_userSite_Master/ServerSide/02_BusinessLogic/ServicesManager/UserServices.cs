using System;
using System.Collections.Generic;
using System.Linq;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.IRepo;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.ISevices;
using AD_userSite_Master.ServerSide._00_CommonUtility.Mapping;
using AD_userSite_Master.ServerSide._00_CommonUtility.Models;

namespace AD_userSite_Master.ServerSide._02_BusinessLogic.ServicesManager
{
    public class UserServices : IUserServices
    {
        private readonly IUoW _uow;
        private readonly IUserRepo _userRepo;
        public UserServices(IUoW uow, IUserRepo userRepo)
        {
            _uow = uow;
            _userRepo = userRepo;
        }      


        public User FindByAccountName(string accountName)
        {
            return Mapping.MapUserDBtoUser(_userRepo.FindByAccountName(accountName));
            //return _uow.Users.Find(id);
        }
        public User FindByEmail(string eMail)
        {
            return Mapping.MapUserDBtoUser(_userRepo.FindByEmail(eMail));
            //return _uow.Users.Find(id);
        }

        public bool CheckIfAccountnameExist(string accountname)
        {
            var user = _userRepo.FindByAccountName(accountname);
            return !string.IsNullOrEmpty(user?.AccountName);
        }
        public bool CheckIfEmailExist(string eMail)
        {
            var user = _userRepo.FindByEmail(eMail);
            return !string.IsNullOrEmpty(user?.Email);
        }
        public bool CheckIfFullNameExist(string firstname, string lastname)
        {
            return !string.IsNullOrEmpty(_userRepo.FindByFullName(firstname, lastname)?.AccountName);
        }

        
        public string GenerateNewAccountname(string firstName , string lastName, int number = 0 )
        {
            string newAccountname;
            
            lastName = lastName.Replace(" ", string.Empty);

            // if last name has less char then 4 add x to get 4 char     
            if (lastName.Length < 4)
            {
                var loopLenght = 4 - lastName.Length;
                for (int i = 0; i < loopLenght; i++)
                {
                    lastName = lastName + "x";
                }               
            }

            if (number == 0)
            {
                newAccountname = firstName.Substring(0, 2) + lastName.Substring(0, 4);
            }
            else
            {
                newAccountname = firstName.Substring(0, 2) + lastName.Substring(0, 4) + number.ToString();
            }
            if (CheckIfAccountnameExist(newAccountname))
            {
                //newAccountname = "";
                number = number + 1;

               return GenerateNewAccountname(firstName, lastName, number);
            }
            else
            {
                return newAccountname.ToLower();
            }; //check if generated accountName is unique
            //return newAccountname;
        }

        public IEnumerable<User> GetAll()
        {
            var DBusers = _userRepo.GetAll();
            return DBusers.Select(db => Mapping.MapUserDBtoUser(db)).ToList();
        }

        public void Add(User user)
        {
            try
            {
                //if (CheckIfEmailExist(user.Email) || CheckIfAccountnameExist(user.AccountName))
                //{
                //    //return FUNCTIONAL EXCEPTION message user with this eMail or account name already exist
                //}

                if (!CheckIfEmailExist(user.Email) || !CheckIfAccountnameExist(user.AccountName))
                {                  
                        if (string.IsNullOrEmpty(user.AccountName))//external user
                        {
                            //generate a accountName for external user
                            user.AccountName = GenerateNewAccountname(user.FirstName.Trim(), user.LastName.Trim());
                        }
                        _uow.Users.Add(Mapping.MapUsertoUserDB(user));
                        _uow.SaveChanges();
                }


            }
            catch (Exception)
            {
                
                throw;
            }



            //// check if users eMail or account name exist            
            //if (CheckIfEmailExist(user.Email) || CheckIfAccountnameExist(user.AccountName))
            //{
            //    //return message user with this eMail or account name already exist
            //}
            //else 
            //{
            //    if (CheckIfFullNameExist(user.FirstName, user.LastName) && !user.DoubleUserIsOk)
            //    {
            //            User UserExist = _userRepo.FindByFullName(user.FirstName, user.LastName);
            //            //return message user exist with UserExist.username last name account name and email. 
            //    }
            //    else //register user to ad
            //    {
            //        if (string.IsNullOrEmpty(user.AccountName))//external user
            //        {
            //            //generate a accountName for external user
            //           user.AccountName = GenerateNewAccountname(user.FirstName, user.LastName);
            //        }
            //        _uow.Users.Add(user);
            //        _uow.SaveChanges();
            //    }              
            //}
        }

        public void Remove(string accountName)
        {
            _uow.Users.Remove(accountName);
            _uow.SaveChanges();

        }

        public void Update(User user)
        {
            _uow.Users.Update(Mapping.MapUsertoUserDB(user));
            _uow.SaveChanges();

        }
    }
}
