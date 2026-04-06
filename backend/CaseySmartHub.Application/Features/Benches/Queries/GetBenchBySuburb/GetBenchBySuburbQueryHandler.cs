using System.Reflection.Metadata;
using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Benches.Queries.GetBenchBySuburb;

public class GetBenchBySuburbQueryHandler (IBenchRepository benchRepository)
    : IRequestHandler<GetBenchBySuburbQuery, IReadOnlyCollection<Bench>?>
{
    public async Task<IReadOnlyCollection<Bench>?> Handle(GetBenchBySuburbQuery request, CancellationToken cancellationToken)
    {
        return await benchRepository.FindBenchInSuburb(request.Suburb, cancellationToken);
    }
}