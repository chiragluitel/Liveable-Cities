using CaseySmartHub.Domain.Entities;

namespace CaseySmartHub.Application.Interfaces.Repositories;

public interface IBenchRepository : IBaseAsyncRepository<Bench>
{
    Task<IReadOnlyCollection<Bench>?> FindBenchInSuburb(string suburb, CancellationToken cancellationToken);
}