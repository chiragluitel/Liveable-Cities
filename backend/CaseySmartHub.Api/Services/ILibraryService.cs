using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;

namespace CaseySmartHub.Api.Services;

public interface ILibraryService
{
    Task<CaseyDataResponse<Library>> GetLibrariesAsync(CancellationToken cancellationToken = default);
}