using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace CaseySmartHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedBenchEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:postgis", ",,");

            migrationBuilder.CreateTable(
                name: "Benches",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GeoPoint = table.Column<Point>(type: "geometry", nullable: false),
                    FeatureExtent = table.Column<string>(type: "text", nullable: false),
                    CouncilWard = table.Column<string>(type: "text", nullable: false),
                    ReserveName = table.Column<string>(type: "text", nullable: false),
                    PropertyAddress = table.Column<string>(type: "text", nullable: false),
                    Latitude = table.Column<string>(type: "text", nullable: false),
                    Longitude = table.Column<string>(type: "text", nullable: false),
                    Easting = table.Column<string>(type: "text", nullable: false),
                    Northing = table.Column<string>(type: "text", nullable: false),
                    Projection = table.Column<string>(type: "text", nullable: false),
                    GISFid = table.Column<string>(type: "text", nullable: false),
                    FunctionalUser = table.Column<string>(type: "text", nullable: false),
                    Heritage = table.Column<string>(type: "text", nullable: false),
                    HierarchicalClass = table.Column<string>(type: "text", nullable: false),
                    Ownership = table.Column<string>(type: "text", nullable: false),
                    Facility = table.Column<string>(type: "text", nullable: false),
                    AmenityType = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    MelwayReference = table.Column<string>(type: "text", nullable: false),
                    Function = table.Column<string>(type: "text", nullable: false),
                    Capacity = table.Column<string>(type: "text", nullable: false),
                    Postcode = table.Column<string>(type: "text", nullable: false),
                    Suburb = table.Column<string>(type: "text", nullable: false),
                    CreatedAtUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Benches", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Benches");

            migrationBuilder.AlterDatabase()
                .OldAnnotation("Npgsql:PostgresExtension:postgis", ",,");
        }
    }
}
