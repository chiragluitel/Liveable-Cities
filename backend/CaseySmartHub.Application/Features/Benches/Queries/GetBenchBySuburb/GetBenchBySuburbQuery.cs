using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Benches.Queries.GetBenchBySuburb;

public record GetBenchBySuburbQuery (string Suburb) : IRequest<IReadOnlyCollection<Bench>?>{}