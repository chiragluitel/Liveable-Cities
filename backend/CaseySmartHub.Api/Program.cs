using CaseySmartHub.Application.Features.Permits.Commands;
using CaseySmartHub.Application.Features.Permits.Commands.SavePermit;
using CaseySmartHub.Application.Interfaces.ExternalServices;
using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Infrastructure.ExternalServices;
using CaseySmartHub.Infrastructure.ExternalServices.Base;
using CaseySmartHub.Infrastructure.Persistence;
using CaseySmartHub.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ========
// 1. Database Services - One time setup.  
// ========
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PsqlConnectionString")));

// ========
// 2. Internal Database Repositories
// ========
builder.Services.AddScoped<IPermitRepository, PermitRepository>();

// ========
// 3. External API Services
// ========
//Base HTTP Client Setup - One time setup.
builder.Services.AddHttpClient<CaseyOpenDataClient>();

builder.Services.AddScoped<ICaseyPermitAPIService, CaseyPermitAPIService>();

// ========
// 4. Application Layer Services for MediatR
// ========
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(SaveUserPermitCommand).Assembly));

// ========
// 5. Constrollers (our APIs)
// ========
builder.Services.AddControllers();
builder.Services.AddOpenApi(); //For Swagger

// ========
// 6. Standard - Don't Change
// ========
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options => {options.SwaggerEndpoint("/openapi/v1.json", "Casey Smart Hub API");});
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
