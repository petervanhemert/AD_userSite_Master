using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.ISevices;
using AD_userSite_Master.ServerSide._00_CommonUtility.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AD_userSite_Master.ServerSide._03_WebApi
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserServices _user;
        public UserController(IUserServices users)
        {
            this._user = users;
        }

        // GET: api/user
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _user.GetAll();
        }

        [Route("userAccountnameExist/{accountname}")]
        public bool AccountnameExist(string accountname)
        {
            return _user.CheckIfAccountnameExist(accountname);
        }

        [Route("eMailExist")]
        public bool EmailExist([FromBody]User user)
        {
            return _user.CheckIfEmailExist(user.Email);
        }

        [Route("fullnameExist")]
        public bool FullnameExist([FromBody]User user)
        {
            return _user.CheckIfFullNameExist(user.FirstName, user.LastName);
        }
        //[Route("fullnameExist/{user}")]
        //public bool FullnameExist(User user)
        //{
        //    return _user.CheckIfFullNameExist(user.FirstName, user.LastName);
        //}

        // GET api/user/5
        [HttpGet("{accountName}")]
        public User Get(string accountName)
        {
            return _user.FindByAccountName(accountName);
        }

        // POST api/user
        [HttpPost]
        public void Post([FromBody]User user)
        {
            if (ModelState.IsValid)
            {
                //_context.Users.Add(user);
                //_context.SaveChanges();
                _user.Add(user);
            }
        }

        // PUT api/user/5
        //[HttpPut("{accountName}")]
        //public void Put(string accountName, [FromBody]User user)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _user.Update(user);
        //    }
        //}

        [HttpPut("{accountName}")]
        public IActionResult Update(string accountName, [FromBody] User user)
        {
            //if (user == null || user.AccountName != accountName)
            if (user == null)
            {
                return BadRequest();
            }

            var user_accountName = _user.FindByAccountName(accountName);
            if (user_accountName == null)
            {
                return NotFound();
            }

            _user.Update(user);
            return new NoContentResult();
            //return ok;
        }

        // DELETE api/user/5
        [HttpDelete("{accountName}")]
        public void Delete(string accountName)
        {
            _user.Remove(accountName);
        }
    }
}
