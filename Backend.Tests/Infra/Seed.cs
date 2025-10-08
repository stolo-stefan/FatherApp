using backend.Data;
using backend.Entities;

namespace Backend.Tests.Infra;

public static class Seed
{
    public static User Admin(string email = "admin@site.com", string first = "Ada", string last = "Lovelace")
        => new User { Email = email, FirstName = first, LastName = last, Role = "admin" };

    public static User Regular(string email = "user@site.com", string first = "Alan", string last = "Turing")
        => new User { Email = email, FirstName = first, LastName = last, Role = "user" };
}
