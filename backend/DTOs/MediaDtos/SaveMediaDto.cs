namespace backend.DTOs.MediaDtos;

public record class SaveMediaDto(
    Stream FileStream,
    string FileName,
    string ContentType,
    string Folder,
    CancellationToken ct
);
