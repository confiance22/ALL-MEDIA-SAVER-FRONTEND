import 'dart:ui' show ImageFilter;

import 'package:flutter/material.dart';

/// Soft coloured orbs painted behind the content. Glass surfaces blur these,
/// which is what makes the glassmorphism read as glass in both themes.
class AmbientBackground extends StatelessWidget {
  const AmbientBackground({super.key, required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: IgnorePointer(
        child: Stack(
          fit: StackFit.expand,
          children: <Widget>[
            Positioned(
              top: -150,
              left: -110,
              child: _Glow(
                size: 330,
                color: isDark
                    ? const Color(0xFF2F6BFF).withOpacity(0.24)
                    : const Color(0xFF3B82F6).withOpacity(0.20),
              ),
            ),
            Positioned(
              top: 130,
              right: -130,
              child: _Glow(
                size: 310,
                color: isDark
                    ? const Color(0xFF8B5CF6).withOpacity(0.20)
                    : const Color(0xFF8B5CF6).withOpacity(0.14),
              ),
            ),
            Positioned(
              bottom: 10,
              left: -130,
              child: _Glow(
                size: 300,
                color: isDark
                    ? const Color(0xFF22D3EE).withOpacity(0.13)
                    : const Color(0xFF22D3EE).withOpacity(0.12),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Glow extends StatelessWidget {
  const _Glow({required this.size, required this.color});

  final double size;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          colors: <Color>[color, color.withOpacity(0)],
          stops: const <double>[0.0, 1.0],
        ),
      ),
    );
  }
}

/// Translucent card with a real backdrop blur, an inner highlight border and
/// a soft shadow. Works on light and dark themes without extra configuration.
class GlassCard extends StatelessWidget {
  const GlassCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(18),
    this.margin = EdgeInsets.zero,
    this.radius = 26,
    this.onTap,
    this.strong = false,
  });

  final Widget child;
  final EdgeInsetsGeometry padding;
  final EdgeInsetsGeometry margin;
  final double radius;
  final VoidCallback? onTap;
  final bool strong;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? Colors.white.withOpacity(strong ? 0.18 : 0.11)
        : Colors.white.withOpacity(strong ? 1.0 : 0.9);
    final gradient = LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: isDark
          ? <Color>[
              Colors.white.withOpacity(strong ? 0.12 : 0.075),
              Colors.white.withOpacity(strong ? 0.055 : 0.03),
            ]
          : <Color>[
              Colors.white.withOpacity(strong ? 0.86 : 0.74),
              Colors.white.withOpacity(strong ? 0.66 : 0.48),
            ],
    );

    Widget card = ClipRRect(
      borderRadius: BorderRadius.circular(radius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            gradient: gradient,
            borderRadius: BorderRadius.circular(radius),
            border: Border.all(color: borderColor, width: 1),
            boxShadow: <BoxShadow>[
              BoxShadow(
                color: isDark
                    ? Colors.black.withOpacity(0.42)
                    : const Color(0xFF2F6BFF).withOpacity(0.10),
                blurRadius: 26,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: child,
        ),
      ),
    );

    if (onTap != null) {
      card = Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(radius),
          child: card,
        ),
      );
    }

    return Padding(padding: margin, child: card);
  }
}

/// Small frosted circular button used for theme toggles and icon actions.
class GlassIconButton extends StatelessWidget {
  const GlassIconButton({
    super.key,
    required this.icon,
    required this.onPressed,
    this.tooltip,
    this.size = 42,
    this.color,
  });

  final IconData icon;
  final VoidCallback onPressed;
  final String? tooltip;
  final double size;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scheme = Theme.of(context).colorScheme;
    final button = Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(size / 2),
        child: Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: isDark
                  ? <Color>[
                      Colors.white.withOpacity(0.14),
                      Colors.white.withOpacity(0.05),
                    ]
                  : <Color>[
                      Colors.white.withOpacity(0.92),
                      Colors.white.withOpacity(0.62),
                    ],
            ),
            borderRadius: BorderRadius.circular(size / 2),
            border: Border.all(
              color: isDark
                  ? Colors.white.withOpacity(0.16)
                  : Colors.white.withOpacity(0.95),
            ),
            boxShadow: <BoxShadow>[
              BoxShadow(
                color: Colors.black.withOpacity(isDark ? 0.3 : 0.08),
                blurRadius: 16,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Icon(icon, size: 19, color: color ?? scheme.primary),
        ),
      ),
    );
    if (tooltip == null) return button;
    return Tooltip(message: tooltip!, child: button);
  }
}

class NavItem {
  const NavItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
  });

  final IconData icon;
  final IconData activeIcon;
  final String label;
}

/// Floating, glassy pill navigation with a sliding active pill, modelled on
/// the floating tab bars used in modern iOS apps.
class FloatingNavBar extends StatelessWidget {
  const FloatingNavBar({
    super.key,
    required this.selectedIndex,
    required this.onSelected,
    required this.items,
  });

  final int selectedIndex;
  final ValueChanged<int> onSelected;
  final List<NavItem> items;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scheme = Theme.of(context).colorScheme;
    final viewBottom = MediaQuery.viewPaddingOf(context).bottom;

    return Positioned(
      left: 16,
      right: 16,
      bottom: 14 + viewBottom,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(30),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
          child: Container(
            height: 70,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: isDark
                    ? <Color>[
                        Colors.white.withOpacity(0.14),
                        Colors.white.withOpacity(0.05),
                      ]
                    : <Color>[
                        Colors.white.withOpacity(0.9),
                        Colors.white.withOpacity(0.62),
                      ],
              ),
              borderRadius: BorderRadius.circular(30),
              border: Border.all(
                color: isDark
                    ? Colors.white.withOpacity(0.16)
                    : Colors.white.withOpacity(0.95),
              ),
              boxShadow: <BoxShadow>[
                BoxShadow(
                  color: Colors.black.withOpacity(isDark ? 0.55 : 0.14),
                  blurRadius: 34,
                  offset: const Offset(0, 14),
                ),
              ],
            ),
            child: LayoutBuilder(
              builder: (BuildContext context, BoxConstraints constraints) {
                final itemWidth = constraints.maxWidth / items.length;
                final pillWidth = itemWidth - 12;
                final span = constraints.maxWidth - pillWidth;
                final targetCenter = (selectedIndex + 0.5) * itemWidth;
                final alignmentX = span <= 0
                    ? 0.0
                    : ((targetCenter - constraints.maxWidth / 2) /
                            (span / 2))
                        .clamp(-1.0, 1.0)
                        .toDouble();

                return Stack(
                  fit: StackFit.expand,
                  children: <Widget>[
                    AnimatedAlign(
                      duration: const Duration(milliseconds: 360),
                      curve: Curves.easeOutBack,
                      alignment: Alignment(alignmentX, 0),
                      child: Container(
                        width: pillWidth,
                        height: 54,
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: <Color>[Color(0xFF2F6BFF), Color(0xFF5E8CFF)],
                          ),
                          borderRadius: BorderRadius.circular(22),
                          boxShadow: <BoxShadow>[
                            BoxShadow(
                              color: const Color(0xFF2F6BFF).withOpacity(0.5),
                              blurRadius: 20,
                              offset: const Offset(0, 7),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Row(
                      children: items.asMap().entries.map((entry) {
                        final index = entry.key;
                        final item = entry.value;
                        final selected = index == selectedIndex;
                        return Expanded(
                          child: GestureDetector(
                            behavior: HitTestBehavior.opaque,
                            onTap: () => onSelected(index),
                            child: AnimatedScale(
                              duration: const Duration(milliseconds: 260),
                              curve: Curves.easeOut,
                              scale: selected ? 1.04 : 0.96,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Icon(
                                    selected ? item.activeIcon : item.icon,
                                    size: 21,
                                    color: selected
                                        ? Colors.white
                                        : scheme.onSurfaceVariant.withOpacity(
                                            isDark ? 0.85 : 0.75,
                                          ),
                                  ),
                                  const SizedBox(height: 4),
                                  AnimatedDefaultTextStyle(
                                    duration: const Duration(milliseconds: 220),
                                    style: TextStyle(
                                      fontSize: 10,
                                      fontWeight: selected
                                          ? FontWeight.w700
                                          : FontWeight.w500,
                                      color: selected
                                          ? Colors.white
                                          : scheme.onSurfaceVariant.withOpacity(
                                              isDark ? 0.85 : 0.75,
                                            ),
                                    ),
                                    child: Text(item.label),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ],
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
