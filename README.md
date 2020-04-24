# Yandex music desktop app
Yandex Music web app. Electron powered. Supports macOS, Windows, Linux.

Support media keys (play/pause/prev/next)

# Build Requirements

* https://github.com/jiahaog/nativefier

# Install dependencies

```bash
$ yarn
```

# Build

```bash
$ ./build.sh
```

## Note

If you're having `"Cant bind global shortcut"` error on macOS ≥ 10.14 Mojave, you should grant access to the app in `Settings -> Security  & Privacy -> Accessibility`.

## Roadmap

- [x] To change title bar the `hiddenInset`
- [ ] To do a progress bar for a TouchBar.
