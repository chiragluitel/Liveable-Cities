using CaseySmartHub.Application.ExternalServices.CaseyOpenData;
using CaseySmartHub.Application.Features.Permits.Queries.GetAllBuildingPermits;
using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Infrastructure.ExternalData.CaseyOpenData;
using CaseySmartHub.Infrastructure.Persistence;
using CaseySmartHub.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// ========
// 1. Database Services - One time setup.  

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("PsqlConnectionString"),
        o => o.UseNetTopologySuite()
    )
);
// ========
// 2. Insert All Internal Repositories Here
// ========
builder.Services.AddScoped<IBuildingPermitRepository, BuildingPermitRepository>();
builder.Services.AddScoped<IBenchRepository, BenchRepository>();

// ========
// 3. External API Services. Insert All External Services Here
// ========
//Base HTTP Client Setup - One time setup.
builder.Services.AddHttpClient<CaseyOpenDataClientBase>(client => 
    client.BaseAddress= new Uri("https://data.casey.vic.gov.au/api/explore/v2.1/"));

builder.Services.AddScoped<ICaseyPermitAPIService, CaseyPermitAPIService>();

// ========
// 4. Application Layer Services. For MediatR => One-Time Setup, no need to add. For Mapper => One-Time Setup, no need to add.

// ========
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAllBuildingPermitsQuery).Assembly));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

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
