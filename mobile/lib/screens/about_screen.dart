import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../config.dart';
import '../widgets/glass.dart';
import '../widgets/ui.dart';

const String _portfolioUrl = 'https://confiance-portifolio.vercel.app/';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key, required this.onToggleTheme, required this.isDark});

  final VoidCallback onToggleTheme;
  final bool isDark;

  Future<void> _openPortfolio(BuildContext context) async {
    final uri = Uri.parse(_portfolioUrl);
    try {
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not open the portfolio link.')),
        );
      }
    } catch (_) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not open the portfolio link.')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
      children: <Widget>[
        Row(
          children: <Widget>[
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
                    color: const Color(0xFF2F6BFF).withOpacity(0.35),
                    blurRadius: 18,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: const Center(
                child: Text(
                  'A',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    'About',
                    style: TextStyle(
                      color: scheme.onSurface,
                      fontSize: 17,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'The app and the person behind it',
                    style: TextStyle(color: scheme.onSurfaceVariant, fontSize: 11),
                  ),
                ],
              ),
            ),
            GlassIconButton(
              tooltip: isDark ? 'Light theme' : 'Dark theme',
              icon: isDark ? Icons.wb_sunny_rounded : Icons.dark_mode_rounded,
              onPressed: onToggleTheme,
            ),
          ],
        ),
        const SizedBox(height: 22),
        GlassCard(
          strong: true,
          padding: const EdgeInsets.all(22),
          child: Column(
            children: <Widget>[
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: <Color>[Color(0xFF2F6BFF), Color(0xFF7C5CFF)],
                  ),
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: <BoxShadow>[
                    BoxShadow(
                      color: const Color(0xFF7C5CFF).withOpacity(0.4),
                      blurRadius: 26,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: const Center(
                  child: Text(
                    'A',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 32,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                AppConfig.appName,
                style: TextStyle(
                  color: scheme.onSurface,
                  fontSize: 21,
                  fontWeight: FontWeight.w800,
                  letterSpacing: -0.4,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Save media from TikTok, Instagram, YouTube and X. No account, no registration, just paste a link and keep the file.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: scheme.onSurfaceVariant,
                  fontSize: 12,
                  height: 1.55,
                ),
              ),
              const SizedBox(height: 14),
              TypeBadge(label: 'Version 1.0.0', primary: true),
            ],
          ),
        ),
        const SizedBox(height: 16),
        GlassCard(
          onTap: () => _openPortfolio(context),
          padding: const EdgeInsets.all(18),
          child: Row(
            children: <Widget>[
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: <Color>[Color(0xFF2F6BFF), Color(0xFF7C5CFF)],
                  ),
                  borderRadius: BorderRadius.circular(15),
                ),
                child: const Icon(Icons.rocket_launch_rounded, color: Colors.white, size: 21),
              ),
              const SizedBox(width: 13),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      'Visit my portfolio',
                      style: TextStyle(
                        color: scheme.onSurface,
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      'confiance-portifolio.vercel.app',
                      style: TextStyle(color: scheme.primary, fontSize: 11),
                    ),
                  ],
                ),
              ),
              Icon(Icons.open_in_new_rounded, size: 18, color: scheme.primary),
            ],
          ),
        ),
        const SizedBox(height: 22),
        SectionTitle(title: 'Why this app'),
        const SizedBox(height: 12),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.35,
          children: const <Widget>[
            _InfoTile(
              icon: Icons.lock_outline_rounded,
              title: 'Private',
              body: 'No sign in, no account.',
              color: Color(0xFF2F6BFF),
            ),
            _InfoTile(
              icon: Icons.save_rounded,
              title: 'On device',
              body: 'History stays with you.',
              color: Color(0xFF22C55E),
            ),
            _InfoTile(
              icon: Icons.dark_mode_rounded,
              title: 'Two themes',
              body: 'Dark and light.',
              color: Color(0xFF7C5CFF),
            ),
            _InfoTile(
              icon: Icons.apps_rounded,
              title: '4 platforms',
              body: 'TikTok, IG, YouTube, X.',
              color: Color(0xFFFF6B6B),
            ),
          ],
        ),
        const SizedBox(height: 22),
        Center(
          child: Text(
            'Built with care by confiance22',
            style: TextStyle(color: scheme.onSurfaceVariant, fontSize: 11),
          ),
        ),
      ],
    );
  }
}

class _InfoTile extends StatelessWidget {
  const _InfoTile({
    required this.icon,
    required this.title,
    required this.body,
    required this.color,
  });

  final IconData icon;
  final String title;
  final String body;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return GlassCard(
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              color: color.withOpacity(0.14),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, size: 17, color: color),
          ),
          const Spacer(),
          Text(
            title,
            style: TextStyle(
              color: scheme.onSurface,
              fontSize: 12,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            body,
            style: TextStyle(color: scheme.onSurfaceVariant, fontSize: 10),
          ),
        ],
      ),
    );
  }
}
