namespace backend.Services.Email;

public interface IEmailQueue
{
    void Enqueue(string to, string subject, string html);
}
