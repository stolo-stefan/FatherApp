public sealed class EnrollmentResult
{
    public EnrollmentOutcome Outcome { get; init; }
    public int? EnrollmentId { get; init; }
    public string? Message { get; init; }

    public static EnrollmentResult Ok(int id) => new() { Outcome = EnrollmentOutcome.Ok, EnrollmentId = id };
    public static EnrollmentResult Fail(EnrollmentOutcome o, string? msg = null) => new() { Outcome = o, Message = msg };
}
