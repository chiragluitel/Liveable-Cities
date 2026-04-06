namespace CaseySmartHub.Domain.Exceptions;

public class ApplicationNotFoundException (string applicationNumber)
    : Exception($"The application number {applicationNumber} was not found in Casey Council Data"){}