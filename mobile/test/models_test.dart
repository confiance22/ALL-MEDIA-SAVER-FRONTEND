import 'package:flutter_test/flutter_test.dart';
import 'package:all_media_saver/models.dart';

void main() {
  test('parses a backend extract payload', () {
    final result = ExtractResult.fromJson({
      'type': 'carousel',
      'title': 'Example post',
      'items': [
        {
          'url': 'https://example.com/1.jpg',
          'type': 'image',
          'filename': 'Example post_01.jpg',
          'thumbnail': 'https://example.com/thumb.jpg',
        },
        {
          'url': 'https://example.com/2.mp4',
          'type': 'video',
          'filename': 'Example post_02.mp4',
          'audio_url': 'https://example.com/audio.m4a',
        },
      ],
    });

    expect(result.title, 'Example post');
    expect(result.type, 'carousel');
    expect(result.items.length, 2);
    expect(result.items.first.filename, 'Example post_01.jpg');
    expect(result.items.last.audioUrl, 'https://example.com/audio.m4a');
  });

  test('history entries round trip through json', () {
    final entry = HistoryEntry(
      kind: HistoryKind.download,
      url: 'https://example.com/video',
      title: 'video.mp4',
      filename: 'video.mp4',
    );

    final restored = HistoryEntry.fromJson(entry.toJson());

    expect(restored.kind, HistoryKind.download);
    expect(restored.title, 'video.mp4');
    expect(restored.url, entry.url);
    expect(restored.id, entry.id);
  });
}
