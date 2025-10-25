using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Options;

namespace backend.Services.Email;

public sealed class MailKitEmailSender : IEmailSender
{
    private readonly SmtpSettings _s;

    public MailKitEmailSender(IOptions<SmtpSettings> options) => _s = options.Value;

    public async Task<bool> SendAsync(string to, string subject, string htmlBody, CancellationToken ct = default)
    {
        try
        {
            var msg = new MimeMessage();
            msg.From.Add(new MailboxAddress(_s.FromName, _s.FromEmail));
            msg.To.Add(MailboxAddress.Parse(to));
            msg.Subject = subject;
            msg.Body = new BodyBuilder { HtmlBody = htmlBody }.ToMessageBody();

            using var smtp = new SmtpClient();

            if (_s.UseSsl)
                await smtp.ConnectAsync(_s.Host, _s.Port, SecureSocketOptions.SslOnConnect, ct);
            else
                await smtp.ConnectAsync(_s.Host, _s.Port, SecureSocketOptions.StartTls, ct);

            await smtp.AuthenticateAsync(_s.Username, _s.Password, ct);
            await smtp.SendAsync(msg, ct);
            await smtp.DisconnectAsync(true, ct);
            return true;
        }
        catch (Exception ex)
        {
            // Replace with ILogger if you prefer
            Console.WriteLine($"[Email] Send failed to {to}: {ex.Message}");
            return false;
        }
    }
}
