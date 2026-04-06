using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CaseySmartHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixedTypoApplicationCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ApplicationCategoty",
                table: "BuildingPermits",
                newName: "ApplicationCategory");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ApplicationCategory",
                table: "BuildingPermits",
                newName: "ApplicationCategoty");
        }
    }
}
