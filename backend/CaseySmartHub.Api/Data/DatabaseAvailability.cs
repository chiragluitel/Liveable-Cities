using System.Net.Sockets;
using Npgsql;

namespace CaseySmartHub.Api.Data;

public static class DatabaseAvailability
{
    private static bool? _isAvailable;
    private static DateTime _lastChecked = DateTime.MinValue;
    private static readonly TimeSpan CheckInterval = TimeSpan.FromSeconds(30);

    public static bool CanConnect(string? connectionString)
    {
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            return false;
        }

        var now = DateTime.UtcNow;
        if (_isAvailable.HasValue && now - _lastChecked < CheckInterval)
        {
            return _isAvailable.Value;
        }

        _lastChecked = now;

        try
        {
            var builder = new NpgsqlConnectionStringBuilder(connectionString);
            var host = string.IsNullOrWhiteSpace(builder.Host) ? "localhost" : builder.Host;
            var port = builder.Port > 0 ? builder.Port : 5432;

            using var tcpClient = new TcpClient();
            var connectTask = tcpClient.ConnectAsync(host, port);
            if (connectTask.Wait(TimeSpan.FromMilliseconds(200)))
            {
                _isAvailable = tcpClient.Connected;
                return _isAvailable.Value;
            }

            _isAvailable = false;
            return false;
        }
        catch
        {
            _isAvailable = false;
            return false;
        }
    }
}
