using System.ComponentModel.DataAnnotations;
using CaseySmartHub.Domain.Common;

namespace CaseySmartHub.Domain.Entities;

/*
Chirag 06042026:
Base User Table, will have the fundamental info like Name, Suburb, etc.
Will have to create MERGE tables for any user related data.
E.g. If a user saves a walk -> Create a Walk Table, then create a UserWalk MERGE table.
Do not input any FKs here. User entity should stay clean.
*/
public class User : BaseEntity
{
    public string Name {get;set;} = string.Empty;
    public string Suburb {get;set;} = string.Empty;
    public string Email {get;set;} = string.Empty;
    public string Phone {get;set;} = string.Empty;
}