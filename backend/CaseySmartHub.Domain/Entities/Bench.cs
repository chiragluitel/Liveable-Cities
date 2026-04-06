using CaseySmartHub.Domain.Common;
using NetTopologySuite.Geometries;

namespace CaseySmartHub.Domain.Entities;

public class Bench : BaseEntity
{
    public Point GeoPoint {get;set;} = null!;
    public string FeatureExtent {get;set;} = string.Empty;
    public string CouncilWard {get;set;} = string.Empty;
    public string ReserveName {get;set;} = string.Empty;
    public string PropertyAddress {get;set;} = string.Empty;
    public string Latitude {get;set;} = string.Empty;
    public string Longitude {get;set;} = string.Empty;
    public string Easting {get;set;} = string.Empty;
    public string Northing {get;set;} = string.Empty;
    public string Projection {get;set;} = string.Empty;
    public string GISFid {get;set;} = string.Empty;
    public string FunctionalUser {get;set;} = string.Empty;
    public string Heritage {get;set;} = string.Empty;
    public string HierarchicalClass {get;set;} = string.Empty;
    public string Ownership {get;set;} = string.Empty;
    public string Facility {get;set;} = string.Empty;
    public string AmenityType {get;set;} = string.Empty;
    public int Quantity {get;set;}
    public string MelwayReference {get;set;} = string.Empty;
    public string Function {get;set;} = string.Empty;
    public string Capacity {get;set;} = string.Empty;
    public string Postcode {get;set;} = string.Empty;
    public string Suburb {get;set;} = string.Empty;
}