using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanMealAPI.Migrations
{
    public partial class thi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "start",
                table: "CalendarEvents",
                newName: "Start");

            migrationBuilder.RenameColumn(
                name: "end",
                table: "CalendarEvents",
                newName: "End");

            migrationBuilder.RenameColumn(
                name: "color",
                table: "CalendarEvents",
                newName: "Color");

            migrationBuilder.RenameColumn(
                name: "allDay",
                table: "CalendarEvents",
                newName: "AllDay");

            migrationBuilder.RenameColumn(
                name: "actions",
                table: "CalendarEvents",
                newName: "Actions");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "CalendarEvents",
                newName: "Id");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Start",
                table: "CalendarEvents",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "End",
                table: "CalendarEvents",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Start",
                table: "CalendarEvents",
                newName: "start");

            migrationBuilder.RenameColumn(
                name: "End",
                table: "CalendarEvents",
                newName: "end");

            migrationBuilder.RenameColumn(
                name: "Color",
                table: "CalendarEvents",
                newName: "color");

            migrationBuilder.RenameColumn(
                name: "AllDay",
                table: "CalendarEvents",
                newName: "allDay");

            migrationBuilder.RenameColumn(
                name: "Actions",
                table: "CalendarEvents",
                newName: "actions");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CalendarEvents",
                newName: "id");

            migrationBuilder.AlterColumn<DateTime>(
                name: "start",
                table: "CalendarEvents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "end",
                table: "CalendarEvents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }
    }
}
