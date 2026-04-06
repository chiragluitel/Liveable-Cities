using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CaseySmartHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MakeIssuedDateNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FinalCertificateIssed",
                table: "BuildingPermits",
                newName: "FinalCertificateIssued");

            migrationBuilder.AlterColumn<string>(
                name: "IssuedYear",
                table: "BuildingPermits",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FinalCertificateIssued",
                table: "BuildingPermits",
                newName: "FinalCertificateIssed");

            migrationBuilder.AlterColumn<string>(
                name: "IssuedYear",
                table: "BuildingPermits",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
