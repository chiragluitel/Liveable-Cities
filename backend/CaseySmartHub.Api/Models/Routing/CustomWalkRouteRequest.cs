namespace CaseySmartHub.Api.Models.Routing;

public sealed class CustomWalkRouteRequest
{
    public string? Title { get; set; }

    public double TargetDistanceKm { get; set; }

    public List<string> SelectedFilters { get; set; } = [];

    public RouteCoordinate? Start { get; set; }

    public RouteCoordinate? End { get; set; }

    public List<RouteCoordinate> Waypoints { get; set; } = [];
}