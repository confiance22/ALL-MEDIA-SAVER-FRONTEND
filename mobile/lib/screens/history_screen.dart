import 'package:flutter/material.dart';

import '../models.dart';
import '../widgets/glass.dart';
import '../widgets/ui.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({
    super.key,
    required this.history,
    required this.onOpenLink,
    required this.onRemove,
    required this.onClear,
  });

  final ValueNotifier<List<HistoryEntry>> history;
  final void Function(String url) onOpenLink;
  final Future<void> Function(String id) onRemove;
  final Future<void> Function() onClear;

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
    return ValueListenableBuilder<List<HistoryEntry>>(
      valueListenable: history,
      builder: (context, entries, _) {
        return ListView(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 28),
          children: [
            Row(
              children: [
                Container(
                  width: 46,
                  height: 46,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: <Color>[Color(0xFF2F6BFF), Color(0xFF7C5CFF)],
                    ),
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: <BoxShadow>[
                      BoxShadow(
                        color: const Color(0xFF2F6BFF).withOpacity(0.38),
                        blurRadius: 18,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.history_rounded,
                    color: Colors.white,
                    size: 22,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Your history',
                        style: TextStyle(
                          color: scheme.onSurface,
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Stored on this device only',
                        style: TextStyle(color: scheme.onSurfaceVariant, fontSize: 11),
                      ),
                    ],
                  ),
                ),
                if (entries.isNotEmpty)
                  TextButton(
                    onPressed: onClear,
                    style: TextButton.styleFrom(foregroundColor: scheme.error),
                    child: const Text('Clear all', style: TextStyle(fontSize: 12)),
                  ),
              ],
            ),
            const SizedBox(height: 20),
            Text(
              'Every search and saved file stays here, so you can find it again without signing in.',
              style: TextStyle(
                color: scheme.onSurfaceVariant,
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 18),
            Row(
              children: <Widget>[
                Expanded(
                  child: GlassCard(
                    padding: const EdgeInsets.symmetric(
                      vertical: 14,
                      horizontal: 16,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          '${entries.length}',
                          style: TextStyle(
                            color: scheme.onSurface,
                            fontSize: 20,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Total saved',
                          style: TextStyle(
                            color: scheme.onSurfaceVariant,
                            fontSize: 10,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: GlassCard(
                    padding: const EdgeInsets.symmetric(
                      vertical: 14,
                      horizontal: 16,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          '${entries.where((e) => e.kind == HistoryKind.download).length}',
                          style: TextStyle(
                            color: scheme.onSurface,
                            fontSize: 20,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Downloads',
                          style: TextStyle(
                            color: scheme.onSurfaceVariant,
                            fontSize: 10,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            if (entries.isEmpty)
              AppCard(
                padding: const EdgeInsets.symmetric(vertical: 44, horizontal: 24),
                child: Column(
                  children: [
                    Container(
                      width: 64,
                      height: 64,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: <Color>[Color(0xFF2F6BFF), Color(0xFF7C5CFF)],
                        ),
                        borderRadius: BorderRadius.circular(22),
                        boxShadow: <BoxShadow>[
                          BoxShadow(
                            color: const Color(0xFF7C5CFF).withOpacity(0.35),
                            blurRadius: 24,
                            offset: const Offset(0, 8),
                          ),
                        ],
                      ),
                      child: const Icon(
                        Icons.auto_stories_rounded,
                        color: Colors.white,
                        size: 28,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'No history yet',
                      style: TextStyle(
                        color: scheme.onSurface,
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Start with a link on the Download tab and everything you do will appear here.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: scheme.onSurfaceVariant,
                        fontSize: 12,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              )
            else
              Column(
                children: List.generate(entries.length, (index) {
                  final entry = entries[index];
                  return Padding(
                    padding: EdgeInsets.only(
                      bottom: index == entries.length - 1 ? 0 : 10,
                    ),
                    child: Dismissible(
                      key: ValueKey<String>(entry.id),
                      direction: DismissDirection.endToStart,
                      background: Container(
                        alignment: Alignment.centerRight,
                        padding: const EdgeInsets.only(right: 20),
                        decoration: BoxDecoration(
                          color: scheme.error.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: Icon(Icons.delete_outline_rounded, color: scheme.error),
                      ),
                      onDismissed: (_) => onRemove(entry.id),
                      child: AppCard(
                        padding: const EdgeInsets.all(12),
                        onTap: entry.kind == HistoryKind.search && entry.url.isNotEmpty
                            ? () => onOpenLink(entry.url)
                            : null,
                        child: Row(
                          children: [
                            Container(
                              width: 42,
                              height: 42,
                              decoration: BoxDecoration(
                                gradient: entry.kind == HistoryKind.download
                                    ? const LinearGradient(
                                        begin: Alignment.topLeft,
                                        end: Alignment.bottomRight,
                                        colors: <Color>[
                                          Color(0xFF2F6BFF),
                                          Color(0xFF7C5CFF),
                                        ],
                                      )
                                    : LinearGradient(
                                        begin: Alignment.topLeft,
                                        end: Alignment.bottomRight,
                                        colors: <Color>[
                                          const Color(0xFF2F6BFF).withOpacity(0.18),
                                          const Color(0xFF7C5CFF).withOpacity(0.1),
                                        ],
                                      ),
                                borderRadius: BorderRadius.circular(14),
                              ),
                              child: Icon(
                                entry.kind == HistoryKind.download
                                    ? Icons.download_rounded
                                    : Icons.link_rounded,
                                color: entry.kind == HistoryKind.download
                                    ? Colors.white
                                    : scheme.primary,
                                size: 19,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    entry.title,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      color: scheme.onSurface,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '${entry.kind == HistoryKind.download ? 'Download' : 'Search'}  -  ${_timeAgo(entry.createdAt)}',
                                    style: TextStyle(
                                      color: scheme.onSurfaceVariant,
                                      fontSize: 10,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Icon(
                              Icons.chevron_right_rounded,
                              color: scheme.onSurfaceVariant,
                              size: 18,
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }),
              ),
          ],
        );
      },
    );
  }
}
