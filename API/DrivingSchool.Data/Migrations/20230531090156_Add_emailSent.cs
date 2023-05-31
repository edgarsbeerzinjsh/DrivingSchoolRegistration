using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DrivingSchool.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_emailSent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "YearOfBirth",
                table: "Students",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "RegistrationDate",
                table: "Students",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddColumn<bool>(
                name: "EmailSent",
                table: "Students",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailSent",
                table: "Students");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "YearOfBirth",
                table: "Students",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "RegistrationDate",
                table: "Students",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");
        }
    }
}
