using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedCourseEarlierDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnrolledCourseId",
                table: "Users");

            migrationBuilder.AddColumn<DateTime>(
                name: "EarlierDate",
                table: "Courses",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EarlierDate",
                table: "Courses");

            migrationBuilder.AddColumn<int>(
                name: "EnrolledCourseId",
                table: "Users",
                type: "int",
                nullable: true);
        }
    }
}
