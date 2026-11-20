class AppConfig {
  const AppConfig._();

  /// Production backend. Override at build time with:
  /// flutter build apk --release --dart-define=BACKEND_URL=https://your-backend
  static const String backendUrl = String.fromEnvironment(
    'BACKEND_URL',
    defaultValue: 'https://media-saver-backend.fly.dev',
  );

  static const String appName = 'All Media Saver';
}
