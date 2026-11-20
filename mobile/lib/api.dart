import 'dart:convert';

import 'package:http/http.dart' as http;

import 'config.dart';
import 'models.dart';

class ApiException implements Exception {
  const ApiException(this.message);

  final String message;

  @override
  String toString() => message;
}

class MediaApi {
  MediaApi({String? baseUrl})
      : baseUrl = (baseUrl ?? AppConfig.backendUrl).replaceAll(RegExp(r'/+$'), '');

  final String baseUrl;

  Future<ExtractResult> extract(String url) async {
    final response = await http
        .post(
          Uri.parse('$baseUrl/extract'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'url': url}),
        )
        .timeout(const Duration(seconds: 180));
    final data = _decode(response);
    return ExtractResult.fromJson(data);
  }

  Future<String> stash(MediaItem item) async {
    final response = await http
        .post(
          Uri.parse('$baseUrl/stash'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'url': item.url,
            'filename': item.filename,
            if (item.audioUrl != null) 'audio_url': item.audioUrl,
            if (item.requestHeaders != null) 'request_headers': item.requestHeaders,
          }),
        )
        .timeout(const Duration(seconds: 60));
    final data = _decode(response);
    final token = data['token'] as String?;
    if (token == null || token.isEmpty) {
      throw const ApiException('The backend did not return a download link.');
    }
    return downloadUrl(token);
  }

  String downloadUrl(String token) =>
      '$baseUrl/download?token=${Uri.encodeComponent(token)}';

  Map<String, dynamic> _decode(http.Response response) {
    Map<String, dynamic>? data;
    try {
      final decoded = jsonDecode(response.body);
      if (decoded is Map<String, dynamic>) data = decoded;
    } catch (_) {
      data = null;
    }

    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (data == null) {
        throw const ApiException('The backend returned an unexpected response.');
      }
      return data;
    }

    final detail = data?['detail'];
    if (detail is String && detail.trim().isNotEmpty) {
      throw ApiException(detail.trim());
    }
    throw ApiException(
      'Request failed (${response.statusCode}). Check your connection and try again.',
    );
  }
}
