using System.Diagnostics.Contracts;

namespace CaseySmartHub.Domain.Exceptions;

public class PermitNotFoundException (string permitNumber)
    : Exception ($"The permit with number ${permitNumber} was not found in Casey City Council Data")
{
}