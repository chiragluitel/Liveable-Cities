using CaseySmartHub.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Api.Data;

public sealed class CaseyDbContext : DbContext
{
    public CaseyDbContext(DbContextOptions<CaseyDbContext> options)
        : base(options)
    {
    }

    // One DbSet per entity, need to register new entities here.
    public DbSet<Bench> Benches => Set<Bench>();
    public DbSet<DrinkingFountain> DrinkingFountains => Set<DrinkingFountain>();
    public DbSet<PublicToilet> PublicToilets => Set<PublicToilet>();
    public DbSet<Library> Libraries => Set<Library>();
    public DbSet<Bbq> Bbqs => Set<Bbq>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("postgis");

        modelBuilder.Entity<Bench>().Property(bench => bench.Id).ValueGeneratedNever();
        modelBuilder.Entity<DrinkingFountain>().Property(fountain => fountain.Id).ValueGeneratedNever();
        modelBuilder.Entity<PublicToilet>().Property(toilet => toilet.Id).ValueGeneratedNever();
        modelBuilder.Entity<Library>().Property(library => library.Id).ValueGeneratedNever();
        modelBuilder.Entity<Bbq>().Property(bbq => bbq.Id).ValueGeneratedNever();
    }
}
