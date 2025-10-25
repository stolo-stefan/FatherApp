namespace backend.Services.Email;

public sealed class SmtpSettings
{
    public string Host { get; set; } = string.Empty;
    public int    Port { get; set; }
    public bool   UseSsl { get; set; }
    public string FromEmail { get; set; } = string.Empty;
    public string FromName  { get; set; } = string.Empty;
    public string Username  { get; set; } = string.Empty;
    public string Password  { get; set; } = string.Empty;
}
