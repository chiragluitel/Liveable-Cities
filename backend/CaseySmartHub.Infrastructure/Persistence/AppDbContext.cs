using CaseySmartHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options){}

    public DbSet<User> Users {get;set;}
    public DbSet<Permit> Permits {get;set;}
    public DbSet<UserPermit> UserPermits{get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //Composite Key for User Permit
        modelBuilder.Entity<UserPermit>()
            .HasKey(up => new {up.UserId, up.PermitId});
        
        //Relationship for the junction table
        modelBuilder.Entity<UserPermit>()
            .HasOne(up => up.User)
            .WithMany(u => u.UserPermits)
            .HasForeignKey(up => up.UserId);
        modelBuilder.Entity<UserPermit>()
            .HasOne(up => up.Permit)
            .WithMany(u => u.UserPermits)
            .HasForeignKey(up => up.PermitId);
    }
}