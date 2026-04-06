using CaseySmartHub.Application.Features.Benches.Queries.GetBenchBySuburb;
using CaseySmartHub.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class BenchController : ControllerBase 
{
    private readonly IMediator _mediator;

    public BenchController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/get-benches-in-suburb")]
    public async Task<IActionResult> GetBenchesInSuburb ([FromQuery] GetBenchBySuburbQuery request, CancellationToken cancellationToken)
    {
        var benches = await _mediator.Send(new GetBenchBySuburbQuery(request.Suburb), cancellationToken);
        return Ok(benches);
    }
    
}