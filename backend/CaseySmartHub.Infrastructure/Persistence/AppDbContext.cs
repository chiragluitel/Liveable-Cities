using CaseySmartHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options){}

    public DbSet<User> Users {get;set;}
    public DbSet<BuildingPermit> BuildingPermits {get;set;}
    public DbSet<Bench> Benches {get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("postgis");
        base.OnModelCreating(modelBuilder);
    }
}