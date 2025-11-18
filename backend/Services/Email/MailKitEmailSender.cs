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
            Console.WriteLine($"[Email] Preparing message for {to}");

            var msg = new MimeMessage();
            msg.From.Add(new MailboxAddress(_s.FromName, _s.FromEmail));
            msg.To.Add(MailboxAddress.Parse(to));
            msg.Subject = subject;
            msg.Body = new BodyBuilder { HtmlBody = htmlBody }.ToMessageBody();

            using var smtp = new SmtpClient();

            smtp.Timeout = 5000; // 5 seconds fail-fast

            Console.WriteLine($"[Email] Connecting to SMTP {_s.Host}:{_s.Port}, UseSsl={_s.UseSsl}");

            if (_s.UseSsl)
                await smtp.ConnectAsync(_s.Host, _s.Port, SecureSocketOptions.SslOnConnect, ct);
            else
                await smtp.ConnectAsync(_s.Host, _s.Port, SecureSocketOptions.StartTls, ct);

            Console.WriteLine("[Email] Connected, authenticating...");

            await smtp.AuthenticateAsync(_s.Username, _s.Password, ct);

            Console.WriteLine("[Email] Authenticated, sending...");

            await smtp.SendAsync(msg, ct);

            Console.WriteLine("[Email] Sent, disconnecting...");

            await smtp.DisconnectAsync(true, ct);

            Console.WriteLine("[Email] Done for " + to);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Email] FULL EXCEPTION for {to}: {ex}");
            return false;
        }
    }
}
