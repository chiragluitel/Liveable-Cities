/*Sample JSON from Casey:    
{
      "appno": "BPP03423/23",
      "permitno": "CBSU 60948/6732794115019",
      "appcat": "Building Permit Section 30 Lodgement",
      "stagedec": "Occupancy Permit Issued",
      "issuedyear": "2023",
      "issuedate": "2023-08-10",
      "occpermit": "2024-04-23",
      "fincertiss": null,
      "subcat": "Dwelling And Garage",
      "suburb": "Clyde",
      "postcode": "3978",
      "ward": "Tooradin",
      "status": "Approved/Finalised",
      "dateentered": "2023-10-11",
      "buildingregsnos": "Not Applicable"
},
Need to translate to our Entity
*/

using System.Text.Json.Serialization;

namespace CaseySmartHub.Application.DTOs.External.CaseyOpenData;

public class BuildingPermitDto
{
    [JsonPropertyName("appno")]
    public string ApplicationNumber { get; set; } = string.Empty;

    [JsonPropertyName("permitno")]
    public string PermitNumber { get; set; } = string.Empty;

    [JsonPropertyName("appcat")]
    public string ApplicationCategory { get; set; } = string.Empty;

    [JsonPropertyName("stagedec")]
    public string StageDecision { get; set; } = string.Empty;

    [JsonPropertyName("issuedyear")]
    public string IssuedYear { get; set; } = string.Empty;

    [JsonPropertyName("issuedate")]
    public string IssueDate { get; set; } = string.Empty;

    [JsonPropertyName("occpermit")]
    public string OccupancyPermitDate { get; set; } = string.Empty;

    [JsonPropertyName("fincertiss")]
    public string FinalCertificateIssued { get; set; } = string.Empty;

    [JsonPropertyName("subcat")]
    public string SubCategory { get; set; } = string.Empty;

    [JsonPropertyName("suburb")]
    public string Suburb { get; set; } = string.Empty;

    [JsonPropertyName("postcode")]
    public string Postcode { get; set; } = string.Empty;

    [JsonPropertyName("ward")]
    public string CouncilWard { get; set; } = string.Empty;

    [JsonPropertyName("status")]
    public string Status { get; set; } = string.Empty;

    [JsonPropertyName("dateentered")]
    public string DateEntered { get; set; } = string.Empty;

    [JsonPropertyName("buildingregsnos")]
    public string? BuildingRegulationNumbers { get; set; }
}