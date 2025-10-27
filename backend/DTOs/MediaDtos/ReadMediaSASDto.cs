namespace backend.DTOs.MediaDtos;

public record ReadMediaSASDto(
    int Id,
    string OriginalFileName,
    string ContentType,
    long SizeBytes,
    string Kind,
    string Path,     // stored blob path (no SAS)
    string ViewUrl   // temporary SAS URL
);