using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_06_19.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;  
        }

        public User GetUserByEmail(string email)
        {
            var context = new TaskContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetById(int id)
        {
            var context = new TaskContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Id == id);
        }
        
        public void NewUser(User user, string password)
        {
            var context = new TaskContext(_connectionString);

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);

            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetUserByEmail(email);
            if(user == null)
            {
                return null;
            }

            bool validPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            return validPassword ? user : null;
        }
    }
}
