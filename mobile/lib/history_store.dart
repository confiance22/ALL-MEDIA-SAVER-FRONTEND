import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import 'models.dart';

class HistoryStore {
  HistoryStore(this._prefs);

  final SharedPreferences _prefs;

  static const String _key = 'ams_history_v1';
  static const int _limit = 120;

  List<HistoryEntry> load() {
    final raw = _prefs.getStringList(_key) ?? const <String>[];
    final entries = <HistoryEntry>[];
    for (final item in raw) {
      try {
        entries.add(HistoryEntry.fromJson(jsonDecode(item) as Map<String, dynamic>));
      } catch (_) {
        // Skip corrupted entries instead of breaking the whole history list.
      }
    }
    return entries;
  }

  Future<void> add(HistoryEntry entry) async {
    final entries = load()..removeWhere((item) => item.id == entry.id);
    entries.insert(0, entry);
    await _save(entries.take(_limit).toList());
  }

  Future<void> remove(String id) async {
    final entries = load()..removeWhere((item) => item.id == id);
    await _save(entries);
  }

  Future<void> clear() async {
    await _prefs.remove(_key);
  }

  Future<void> _save(List<HistoryEntry> entries) async {
    await _prefs.setStringList(
      _key,
      entries.map((entry) => jsonEncode(entry.toJson())).toList(),
    );
  }
}
