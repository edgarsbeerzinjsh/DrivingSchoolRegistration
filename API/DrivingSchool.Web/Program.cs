using DrivingSchool.Core.Services;
using DrivingSchool.Data;
using DrivingSchool.Services;
using DrivingSchool.Web.Configuration;
using DrivingSchool.Web.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(c =>
{
    c.AddDefaultPolicy(options =>
    {
        options.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DrivingSchoolDbContext>(options => 
    options.UseMySQL(builder.Configuration.GetConnectionString("DrivingSchool")));
builder.Services.AddTransient<IDrivingSchoolDbContext, DrivingSchoolDbContext>();
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddScoped<IDbService, DbService>();
builder.Services.AddTransient<IMailService, MailService>();

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();