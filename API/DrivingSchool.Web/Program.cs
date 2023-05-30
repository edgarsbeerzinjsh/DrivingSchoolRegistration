using DrivingSchool.Core.Services;
using DrivingSchool.Data;
using DrivingSchool.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DrivingSchoolDbContext>(options => 
    options.UseMySQL(builder.Configuration.GetConnectionString("DrivingSchool")));
builder.Services.AddTransient<IDrivingSchoolDbContext, DrivingSchoolDbContext>();
builder.Services.AddScoped<IDbService, DbService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
