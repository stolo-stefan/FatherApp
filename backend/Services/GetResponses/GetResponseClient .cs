using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace backend.Services.GetResponse;

public class GetResponseClient : IGetResponseClient
{
    private readonly HttpClient _http;
    private readonly string _apiKey;
    private readonly string _campaignId;
    private readonly string _baseUrl;
    private readonly ILogger<GetResponseClient> _logger;

    public GetResponseClient(HttpClient http, IConfiguration config, ILogger<GetResponseClient> logger)
    {
        _http = http;
        _logger = logger;

        var grSection = config.GetSection("GetResponse");

        _apiKey = grSection["ApiKey"]
                  ?? throw new InvalidOperationException("GetResponse:ApiKey missing");
        _campaignId = grSection["CampaignId"]
                      ?? throw new InvalidOperationException("GetResponse:CampaignId missing");

        // Force the correct base URL no matter what
        _baseUrl = (grSection["BaseUrl"] ?? "https://api.getresponse.com/v3").TrimEnd('/');

        _http.DefaultRequestHeaders.Clear();
        _http.DefaultRequestHeaders.Add("X-Auth-Token", $"api-key {_apiKey}");
    }

    public async Task AddContactAsync(string email, string? name, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(email))
            return;

        var payload = new
        {
            email,
            name,
            campaign = new { campaignId = _campaignId }
        };

        var url = $"{_baseUrl}/contacts";

        _logger.LogInformation("GetResponse: POST {Url} with email {Email}", url, email);

        using var response = await _http.PostAsJsonAsync(url, payload, ct);
        var body = await response.Content.ReadAsStringAsync(ct);

        _logger.LogInformation("GetResponse: status {Status} body: {Body}",
            (int)response.StatusCode, body);

        if (!response.IsSuccessStatusCode && response.StatusCode != HttpStatusCode.Accepted)
        {
            throw new Exception(
                $"GetResponse failed: {(int)response.StatusCode} {response.StatusCode}. Body: {body}");
        }
    }
}
