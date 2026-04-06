using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Infrastructure.Persistence.Repositories;

public class BenchRepository: BaseAsyncRepository<Bench>, IBenchRepository
{
    public BenchRepository(AppDbContext context) : base(context){}
    public async Task<IReadOnlyCollection<Bench>?> FindBenchInSuburb(string suburb, CancellationToken cancellationToken)
    {
            var benches =  await _context.Benches
            .Where(b => b.Suburb.ToLower() == suburb.ToLower())
            .ToListAsync(cancellationToken);
            return benches;
    }
}