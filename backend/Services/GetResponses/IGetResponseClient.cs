using System.Threading;
using System.Threading.Tasks;

namespace backend.Services.GetResponse;

public interface IGetResponseClient
{
    Task AddContactAsync(string email, string? name,string? phone,  CancellationToken ct = default);
}
