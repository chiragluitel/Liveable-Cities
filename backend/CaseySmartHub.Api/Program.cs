using CaseySmartHub.Api.Clients;
using CaseySmartHub.Api.Configuration;
using CaseySmartHub.Api.Data;
using CaseySmartHub.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

const string FrontendCorsPolicy = "frontend";

// PostgreSQL persistence. UseNetTopologySuite maps PostGIS geometry columns
// onto NetTopologySuite types for spatial querying.
builder.Services.AddDbContext<CaseyDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsql => npgsql.UseNetTopologySuite()));

// Bind external API settings (base URL + optional api key).
builder.Services.Configure<CaseyOpenDataOptions>(
    builder.Configuration.GetSection(CaseyOpenDataOptions.SectionName));

// Single typed HttpClient shared by every entity service.
builder.Services.AddHttpClient<CaseyOpenDataClient>((serviceProvider, http) =>
{
    var options = serviceProvider.GetRequiredService<IOptions<CaseyOpenDataOptions>>().Value;
    http.BaseAddress = new Uri(options.BaseUrl);
    if (!string.IsNullOrWhiteSpace(options.ApiKey))
    {
        http.DefaultRequestHeaders.Add("X-API-Key", options.ApiKey);
    }
});

// In-memory cache for the (rarely-changing) Casey datasets.
builder.Services.AddMemoryCache();

// One service per entity — register new entities here.
builder.Services.AddScoped<IBenchService, BenchService>();
builder.Services.AddScoped<IDrinkingFountainService, DrinkingFountainService>();
builder.Services.AddScoped<IPublicToiletService, PublicToiletService>();
builder.Services.AddScoped<ILibraryService, LibraryService>();
builder.Services.AddScoped<IBbqService, BbqService>();
builder.Services.AddScoped<ICustomWalkService, CustomWalkService>();


// Allow the Expo frontend (web build) to call the API. Tighten the origins for production.
builder.Services.AddCors(options =>
    options.AddPolicy(FrontendCorsPolicy, policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddControllers();
builder.Services.AddProblemDetails();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    // Swagger UI at /swagger, served from the built-in OpenAPI document.
    app.UseSwaggerUI(options => options.SwaggerEndpoint("/openapi/v1.json", "CaseySmartHub API v1"));
}

app.UseHttpsRedirection();
app.UseCors(FrontendCorsPolicy);
app.UseAuthorization();

app.MapControllers();

app.Run();
