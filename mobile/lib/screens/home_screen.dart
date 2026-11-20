import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';

import '../api.dart';
import '../models.dart';
import '../widgets/ui.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({
    super.key,
    required this.api,
    required this.history,
    required this.urlInput,
    required this.isDark,
    required this.onToggleTheme,
    required this.onAddHistory,
    required this.onGoHistory,
  });

  final MediaApi api;
  final ValueNotifier<List<HistoryEntry>> history;
  final ValueNotifier<String> urlInput;
  final bool isDark;
  final VoidCallback onToggleTheme;
  final Future<void> Function(HistoryEntry entry) onAddHistory;
  final VoidCallback onGoHistory;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _controller = TextEditingController();
  final FocusNode _focus = FocusNode();
  ExtractResult? _result;
  String? _error;
  bool _loading = false;
  String? _saving;

  @override
  void initState() {
    super.initState();
    if (widget.urlInput.value.isNotEmpty) {
      _controller.text = widget.urlInput.value;
    }
    widget.urlInput.addListener(_syncUrl);
  }

  @override
  void dispose() {
    widget.urlInput.removeListener(_syncUrl);
    _controller.dispose();
    _focus.dispose();
    super.dispose();
  }

  void _syncUrl() {
    final value = widget.urlInput.value;
    if (_controller.text != value) {
      _controller.text = value;
      _controller.selection = TextSelection.collapsed(offset: value.length);
    }
  }

  Future<void> _submit() async {
    final url = _controller.text.trim();
    if (url.isEmpty || _loading) return;
    FocusScope.of(context).unfocus();
    setState(() {
      _loading = true;
      _error = null;
      _result = null;
    });
    try {
      final result = await widget.api.extract(url);
      if (!mounted) return;
      setState(() => _result = result);
      await widget.onAddHistory(
        HistoryEntry(
          kind: HistoryKind.search,
          url: url,
          title: result.title,
          itemCount: result.items.length,
        ),
      );
    } on ApiException catch (e) {
      if (mounted) setState(() => _error = e.message);
    } catch (_) {
      if (mounted) {
        setState(() => _error = 'Could not reach the backend. Check your connection and try again.');
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _download(MediaItem item) async {
    if (_saving != null) return;
    setState(() {
      _saving = item.filename;
      _error = null;
    });
    try {
      final link = await widget.api.stash(item);
      final uri = Uri.parse(link);
      if (!await canLaunchUrl(uri)) {
        throw const ApiException('No app is available to open the download link.');
      }
      await launchUrl(uri, mode: LaunchMode.externalApplication);
      if (!mounted) return;
      await widget.onAddHistory(
        HistoryEntry(
          kind: HistoryKind.download,
          url: item.url,
          title: item.filename,
          filename: item.filename,
        ),
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Download started. Check your downloads.')),
        );
      }
    } on ApiException catch (e) {
      if (mounted) setState(() => _error = e.message);
    } catch (_) {
      if (mounted) setState(() => _error = 'Could not start the download. Try again.');
    } finally {
      if (mounted) setState(() => _saving = null);
    }
  }

  Future<void> _paste() async {
    try {
      final data = await Clipboard.getData(Clipboard.kTextPlain);
      final text = data?.text?.trim();
      if (text != null && text.isNotEmpty) {
        setState(() => _controller.text = text);
      }
    } catch (_) {
      // Clipboard access can be denied, the user can paste manually.
    }
  }

  void _reset() {
    setState(() {
      _controller.clear();
      _result = null;
      _error = null;
      _saving = null;
    });
    widget.urlInput.value = '';
    _focus.requestFocus();
  }

  String _timeAgo(DateTime time) {
    final diff = DateTime.now().difference(time);
    if (diff.inMinutes < 1) return 'just now';
    if (diff.inHours < 1) return '${diff.inMinutes}m ago';
    if (diff.inDays < 1) return '${diff.inHours}h ago';
    if (diff.inDays < 7) return '${diff.inDays}d ago';
    return '${time.day}/${time.month}/${time.year}';
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 28),
      children: [
        _buildHeader(scheme),
        const SizedBox(height: 22),
        Text(
          'Save anything. No sign in needed.',
          style: TextStyle(
            color: scheme.onSurface,
            fontSize: 24,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          'Paste a link from TikTok, Instagram, YouTube or X and keep the file.',
          style: TextStyle(
            color: scheme.onSurfaceVariant,
            fontSize: 13,
            height: 1.5,
          ),
        ),
        const SizedBox(height: 18),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: const [
              PlatformChip(label: 'TikTok', color: Color(0xFF2F6BFF)),
              SizedBox(width: 8),
              PlatformChip(label: 'Instagram', color: Color(0xFFE1306C)),
              SizedBox(width: 8),
              PlatformChip(label: 'YouTube', color: Color(0xFFFF3B30)),
              SizedBox(width: 8),
              PlatformChip(label: 'X', color: Color(0xFF7C8AA0)),
            ],
          ),
        ),
        const SizedBox(height: 22),
        _buildInputCard(scheme),
        if (_error != null) ...[
          const SizedBox(height: 14),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: scheme.error.withOpacity(0.09),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: scheme.error.withOpacity(0.35)),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.error_outline_rounded, size: 18, color: scheme.error),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    _error!,
                    style: TextStyle(color: scheme.error, fontSize: 12, height: 1.5),
                  ),
                ),
              ],
            ),
          ),
        ],
        if (_loading) ...[
          const SizedBox(height: 26),
          Center(
            child: CircularProgressIndicator(color: scheme.primary, strokeWidth: 2.5),
          ),
        ],
        if (_result != null) ...[
          const SizedBox(height: 24),
          SectionTitle(
            title: 'Your media',
            action: 'New search',
            onAction: _reset,
          ),
          const SizedBox(height: 10),
          _buildResultCard(scheme),
        ],
        const SizedBox(height: 26),
        _buildRecent(scheme),
      ],
    );
  }

  Widget _buildHeader(ColorScheme scheme) {
    return Row(
      children: [
        Container(
          width: 46,
          height: 46,
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF2F6BFF), Color(0xFF0A2E80)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Center(
            child: Text(
              'A',
              style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'All Media Saver',
                style: TextStyle(
                  color: scheme.onSurface,
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                'Fast, private, and free',
                style: TextStyle(color: scheme.onSurfaceVariant, fontSize: 11),
              ),
            ],
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: scheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: scheme.outlineVariant.withOpacity(0.45)),
          ),
          child: IconButton(
            tooltip: widget.isDark ? 'Light theme' : 'Dark theme',
            onPressed: widget.onToggleTheme,
            icon: Icon(
              widget.isDark ? Icons.wb_sunny_rounded : Icons.dark_mode_rounded,
              size: 19,
              color: scheme.primary,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildInputCard(ColorScheme scheme) {
    return AppCard(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          TextField(
            controller: _controller,
            focusNode: _focus,
            minLines: 1,
            maxLines: 2,
            keyboardType: TextInputType.url,
            autocorrect: false,
            enableSuggestions: false,
            onSubmitted: (_) => _submit(),
            decoration: InputDecoration(
              hintText: 'https://www.tiktok.com/@user/video/123456...',
              prefixIcon: Icon(Icons.link_rounded, color: scheme.primary, size: 19),
              suffixIcon: IconButton(
                tooltip: 'Paste from clipboard',
                onPressed: _paste,
                icon: Icon(Icons.content_paste_rounded, color: scheme.onSurfaceVariant, size: 18),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: _loading ? null : _submit,
                  icon: _loading
                      ? SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(
                            color: scheme.onPrimary,
                            strokeWidth: 2,
                          ),
                        )
                      : const Icon(Icons.download_rounded, size: 18),
                  label: Text(_loading ? 'Resolving...' : 'Get download'),
                ),
              ),
              if (_result != null || _error != null) ...[
                const SizedBox(width: 8),
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: scheme.outlineVariant.withOpacity(0.5)),
                  ),
                  child: IconButton(
                    tooltip: 'Reset',
                    onPressed: _reset,
                    icon: Icon(Icons.restart_alt_rounded, color: scheme.onSurfaceVariant),
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildResultCard(ColorScheme scheme) {
    final result = _result!;
    return AppCard(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  result.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: scheme.onSurface,
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              TypeBadge(
                label: result.type == 'carousel' ? '${result.items.length} items' : result.type,
                primary: true,
              ),
            ],
          ),
          const SizedBox(height: 14),
          ...List.generate(result.items.length, (index) {
            final item = result.items[index];
            return Padding(
              padding: EdgeInsets.only(bottom: index == result.items.length - 1 ? 0 : 10),
              child: _buildItemRow(item, scheme),
            );
          }),
        ],
      ),
    );
  }

  Widget _buildItemRow(MediaItem item, ColorScheme scheme) {
    final busy = _saving == item.filename;
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: scheme.surfaceContainerHighest.withOpacity(0.55),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(14),
            child: SizedBox(
              width: 46,
              height: 46,
              child: item.thumbnail != null && item.thumbnail!.isNotEmpty
                  ? Image.network(
                      item.thumbnail!,
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => _itemPlaceholder(scheme, item),
                    )
                  : _itemPlaceholder(scheme, item),
            ),
          ),
          const SizedBox(width: 11),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.filename,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: scheme.onSurface,
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 5),
                TypeBadge(label: item.type),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Material(
            color: scheme.primary,
            borderRadius: BorderRadius.circular(14),
            child: InkWell(
              onTap: busy ? null : () => _download(item),
              borderRadius: BorderRadius.circular(14),
              child: SizedBox(
                width: 38,
                height: 38,
                child: busy
                    ? Center(
                        child: SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(
                            color: scheme.onPrimary,
                            strokeWidth: 2,
                          ),
                        ),
                      )
                    : Icon(Icons.download_rounded, size: 18, color: scheme.onPrimary),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _itemPlaceholder(ColorScheme scheme, MediaItem item) {
    return Container(
      color: scheme.primary.withOpacity(0.12),
      child: Icon(
        item.isVideo ? Icons.play_circle_rounded : Icons.image_rounded,
        color: scheme.primary,
        size: 20,
      ),
    );
  }

  Widget _buildRecent(ColorScheme scheme) {
    return ValueListenableBuilder<List<HistoryEntry>>(
      valueListenable: widget.history,
      builder: (context, entries, _) {
        final recent = entries.take(3).toList();
        return Column(
          children: [
            SectionTitle(
              title: 'Recent activity',
              action: 'See all',
              onAction: widget.onGoHistory,
            ),
            const SizedBox(height: 10),
            if (recent.isEmpty)
              AppCard(
                padding: const EdgeInsets.all(22),
                child: Center(
                  child: Column(
                    children: [
                      Icon(Icons.history_rounded, color: scheme.onSurfaceVariant, size: 24),
                      const SizedBox(height: 8),
                      Text(
                        'Nothing here yet. Your searches and downloads will show up here.',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: scheme.onSurfaceVariant, fontSize: 12),
                      ),
                    ],
                  ),
                ),
              )
            else
              AppCard(
                padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                child: Column(
                  children: List.generate(recent.length, (index) {
                    final entry = recent[index];
                    return ListTile(
                      contentPadding: const EdgeInsets.symmetric(horizontal: 8),
                      leading: Container(
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(
                          color: scheme.primary.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(
                          entry.kind == HistoryKind.download
                              ? Icons.download_rounded
                              : Icons.search_rounded,
                          color: scheme.primary,
                          size: 18,
                        ),
                      ),
                      title: Text(
                        entry.title,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: scheme.onSurface,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      subtitle: Text(
                        '${entry.kind == HistoryKind.download ? 'Downloaded' : 'Searched'}  -  ${_timeAgo(entry.createdAt)}',
                        style: TextStyle(
                          color: scheme.onSurfaceVariant,
                          fontSize: 10,
                        ),
                      ),
                      onTap: () => widget.urlInput.value = entry.url,
                    );
                  }),
                ),
              ),
          ],
        );
      },
    );
  }
}
