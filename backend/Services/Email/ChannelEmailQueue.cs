using System.Threading.Channels;

namespace backend.Services.Email;

public sealed class ChannelEmailQueue : IEmailQueue, IHostedService
{
    private readonly IEmailSender _sender;
    private readonly ILogger<ChannelEmailQueue> _log;
    private readonly Channel<(string to, string subject, string html)> _channel =
        Channel.CreateUnbounded<(string to, string subject, string html)>();
    private CancellationTokenSource? _cts;
    private Task? _worker;

    public ChannelEmailQueue(IEmailSender sender, ILogger<ChannelEmailQueue> log)
    {
        _sender = sender;
        _log = log;
    }

    public void Enqueue(string to, string subject, string html)
        => _channel.Writer.TryWrite((to, subject, html));

    public Task StartAsync(CancellationToken ct)
    {
        _cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        _worker = Task.Run(ProcessAsync);
        return Task.CompletedTask;
    }

    public async Task StopAsync(CancellationToken _)
    {
        _channel.Writer.Complete();
        if (_worker is not null) await _worker;
    }

    private async Task ProcessAsync()
    {
        try
        {
            await foreach (var (to, subject, html) in _channel.Reader.ReadAllAsync(_cts!.Token))
            {
                var ok = await _sender.SendAsync(to, subject, html, _cts.Token);
                if (!ok) _log.LogWarning("Email send failed to {To}", to);
            }
        }
        catch (OperationCanceledException)
        {
            // shutting down
        }
    }
}
