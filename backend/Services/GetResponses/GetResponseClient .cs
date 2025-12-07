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

    public async Task AddContactAsync(string email, string? name, string? phone,string? GetResponseToken, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(email))
            return;

        var customFields = new List<object>();

        if (!string.IsNullOrWhiteSpace(phone))
        {
            customFields.Add(new
            {
                customFieldId = "nKnL1A",
                value = new[] { phone }
            });
        }

        var payload = new
        {
            email,
            name,
            dayOfCycle = 0,
            campaign = new { campaignId = GetResponseToken },
            customFieldValues = customFields.Count == 0 ? null : customFields
        };


        var url = $"{_baseUrl}/contacts";

        var json = System.Text.Json.JsonSerializer.Serialize(payload);
        _logger.LogInformation("[GR DEBUG] Payload: {Json}", json);

        using var response = await _http.PostAsJsonAsync(url, payload, ct);
        var body = await response.Content.ReadAsStringAsync(ct);

        // log headers too
        var headersJoined = string.Join(" | ",
            response.Headers.Select(h => $"{h.Key}={string.Join(",", h.Value)}"));

        _logger.LogInformation("[GR DEBUG] Status {Status}, Headers: {Headers}, Body: {Body}",
            (int)response.StatusCode, headersJoined, body);

        if (!response.IsSuccessStatusCode && response.StatusCode != HttpStatusCode.Accepted)
        {
            throw new Exception(
                $"GetResponse failed: {(int)response.StatusCode} {response.StatusCode}. Body: {body}");
        }
    }
}
