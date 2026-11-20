import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api.dart';
import 'config.dart';
import 'history_store.dart';
import 'models.dart';
import 'screens/history_screen.dart';
import 'screens/home_screen.dart';

const String _themeKey = 'ams_theme_mode';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  final savedIndex = prefs.getInt(_themeKey);
  final savedMode = savedIndex != null &&
          savedIndex >= 0 &&
          savedIndex < ThemeMode.values.length
      ? ThemeMode.values[savedIndex]
      : ThemeMode.system;
  runApp(AllMediaSaverApp(prefs: prefs, initialMode: savedMode));
}

class AllMediaSaverApp extends StatefulWidget {
  const AllMediaSaverApp({
    super.key,
    required this.prefs,
    required this.initialMode,
  });

  final SharedPreferences prefs;
  final ThemeMode initialMode;

  @override
  State<AllMediaSaverApp> createState() => _AllMediaSaverAppState();
}

class _AllMediaSaverAppState extends State<AllMediaSaverApp> {
  late final MediaApi _api;
  late final HistoryStore _historyStore;
  late final ValueNotifier<List<HistoryEntry>> _history;
  late final ValueNotifier<String> _urlInput;
  late ThemeMode _themeMode;
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _api = MediaApi();
    _historyStore = HistoryStore(widget.prefs);
    _history = ValueNotifier<List<HistoryEntry>>(_historyStore.load());
    _urlInput = ValueNotifier<String>('');
    _themeMode = widget.initialMode;
  }

  @override
  void dispose() {
    _history.dispose();
    _urlInput.dispose();
    super.dispose();
  }

  Future<void> _toggleTheme() async {
    final next = _themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    setState(() => _themeMode = next);
    await widget.prefs.setInt(_themeKey, next.index);
  }

  Future<void> _addHistory(HistoryEntry entry) async {
    await _historyStore.add(entry);
    if (!mounted) return;
    _history.value = _historyStore.load();
  }

  Future<void> _removeHistory(String id) async {
    await _historyStore.remove(id);
    if (!mounted) return;
    _history.value = _historyStore.load();
  }

  Future<void> _clearHistory() async {
    await _historyStore.clear();
    if (!mounted) return;
    _history.value = <HistoryEntry>[];
  }

  void _openFromHistory(String url) {
    _urlInput.value = url;
    setState(() => _selectedIndex = 0);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = _themeMode == ThemeMode.dark ||
        (_themeMode == ThemeMode.system &&
            MediaQuery.platformBrightnessOf(context) == Brightness.dark);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: AppConfig.appName,
      theme: _buildTheme(Brightness.light),
      darkTheme: _buildTheme(Brightness.dark),
      themeMode: _themeMode,
      home: Scaffold(
        body: SafeArea(
          child: IndexedStack(
            index: _selectedIndex,
            children: [
              HomeScreen(
                api: _api,
                history: _history,
                urlInput: _urlInput,
                isDark: isDark,
                onToggleTheme: _toggleTheme,
                onAddHistory: _addHistory,
                onGoHistory: () => setState(() => _selectedIndex = 1),
              ),
              HistoryScreen(
                history: _history,
                onOpenLink: _openFromHistory,
                onRemove: _removeHistory,
                onClear: _clearHistory,
              ),
            ],
          ),
        ),
        bottomNavigationBar: NavigationBar(
          selectedIndex: _selectedIndex,
          onDestinationSelected: (index) =>
              setState(() => _selectedIndex = index),
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.download_rounded),
              selectedIcon: Icon(Icons.download_rounded),
              label: 'Download',
            ),
            NavigationDestination(
              icon: Icon(Icons.history_rounded),
              selectedIcon: Icon(Icons.history_rounded),
              label: 'History',
            ),
          ],
        ),
      ),
    );
  }

  ThemeData _buildTheme(Brightness brightness) {
    final isDark = brightness == Brightness.dark;
    final scheme = ColorScheme.fromSeed(
      seedColor: const Color(0xFF2F6BFF),
      brightness: brightness,
    ).copyWith(
      primary: const Color(0xFF2F6BFF),
      onPrimary: Colors.white,
      surface: isDark ? const Color(0xFF0B0F17) : Colors.white,
      onSurface: isDark ? Colors.white : const Color(0xFF0B1120),
      surfaceContainerHighest:
          isDark ? const Color(0xFF131A29) : const Color(0xFFE4E9F0),
    );
    final outline = scheme.outlineVariant.withOpacity(0.45);

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor:
          isDark ? const Color(0xFF06080D) : const Color(0xFFEFF2F6),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: isDark ? const Color(0xFF0E1420) : Colors.white,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
        hintStyle: TextStyle(
          color: scheme.onSurfaceVariant.withOpacity(0.7),
          fontSize: 13,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: BorderSide(color: outline),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: BorderSide(color: outline),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: BorderSide(color: scheme.primary, width: 1.5),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: scheme.primary,
          foregroundColor: scheme.onPrimary,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          textStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        ),
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: isDark ? const Color(0xFF0B1424) : Colors.white,
        contentTextStyle: TextStyle(
          color: scheme.onSurface,
          fontSize: 13,
          fontWeight: FontWeight.w500,
        ),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
          side: BorderSide(color: outline),
        ),
      ),
    );
  }
}
