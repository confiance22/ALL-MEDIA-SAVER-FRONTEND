class MediaItem {
  const MediaItem({
    required this.url,
    required this.type,
    required this.filename,
    this.thumbnail,
    this.audioUrl,
    this.requestHeaders,
  });

  final String url;
  final String type;
  final String filename;
  final String? thumbnail;
  final String? audioUrl;
  final Map<String, String>? requestHeaders;

  bool get isVideo => type == 'video';

  factory MediaItem.fromJson(Map<String, dynamic> json) {
    final rawHeaders = json['request_headers'];
    Map<String, String>? headers;
    if (rawHeaders is Map) {
      headers = rawHeaders.map(
        (key, value) => MapEntry(key.toString(), value.toString()),
      );
    }
    return MediaItem(
      url: (json['url'] as String?) ?? '',
      type: (json['type'] as String?) ?? 'image',
      filename: (json['filename'] as String?) ?? 'media',
      thumbnail: json['thumbnail'] as String?,
      audioUrl: json['audio_url'] as String?,
      requestHeaders: headers,
    );
  }

  Map<String, dynamic> toJson() => {
        'url': url,
        'type': type,
        'filename': filename,
        if (thumbnail != null) 'thumbnail': thumbnail,
        if (audioUrl != null) 'audio_url': audioUrl,
        if (requestHeaders != null) 'request_headers': requestHeaders,
      };
}

class ExtractResult {
  const ExtractResult({
    required this.type,
    required this.title,
    required this.items,
  });

  final String type;
  final String title;
  final List<MediaItem> items;

  factory ExtractResult.fromJson(Map<String, dynamic> json) {
    final rawItems = json['items'];
    final items = <MediaItem>[];
    if (rawItems is List) {
      for (final raw in rawItems) {
        if (raw is Map<String, dynamic>) items.add(MediaItem.fromJson(raw));
      }
    }
    return ExtractResult(
      type: (json['type'] as String?) ?? 'image',
      title: (json['title'] as String?) ?? 'Untitled post',
      items: items,
    );
  }

  Map<String, dynamic> toJson() => {
        'type': type,
        'title': title,
        'items': items.map((item) => item.toJson()).toList(),
      };
}

enum HistoryKind { search, download }

class HistoryEntry {
  HistoryEntry({
    String? id,
    required this.kind,
    required this.url,
    required this.title,
    this.filename,
    this.itemCount = 1,
    DateTime? createdAt,
  })  : id = id ?? DateTime.now().microsecondsSinceEpoch.toString(),
        createdAt = createdAt ?? DateTime.now();

  final String id;
  final HistoryKind kind;
  final String url;
  final String title;
  final String? filename;
  final int itemCount;
  final DateTime createdAt;

  factory HistoryEntry.fromJson(Map<String, dynamic> json) {
    final rawKind = json['kind'] as String?;
    return HistoryEntry(
      id: (json['id'] as String?) ?? DateTime.now().microsecondsSinceEpoch.toString(),
      kind: rawKind == 'download' ? HistoryKind.download : HistoryKind.search,
      url: (json['url'] as String?) ?? '',
      title: (json['title'] as String?) ?? 'Untitled post',
      filename: json['filename'] as String?,
      itemCount: (json['item_count'] as num?)?.toInt() ?? 1,
      createdAt:
          DateTime.tryParse((json['created_at'] as String?) ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'kind': kind == HistoryKind.download ? 'download' : 'search',
        'url': url,
        'title': title,
        if (filename != null) 'filename': filename,
        'item_count': itemCount,
        'created_at': createdAt.toIso8601String(),
      };
}
