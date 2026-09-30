# Instagram feed on the VPS

The homepage reads a server-side snapshot at `var/instagram-feed.json`.
Downloaded covers live in `var/instagram-media/` and are served by the
`/instagram-media/[file]` route. Neither the browser nor the homepage requests
Instagram. The homepage checks the local snapshot during Next.js ISR
regeneration (up to about one minute after the next visit). If the
snapshot is missing or invalid, the bundled August 2026 gallery remains visible.

## Sync the latest public posts

From the application directory on the VPS, as the application user:

```sh
npm run instagram:sync -- --dry-run
npm run instagram:sync
```

Direct profile mode uses a local Chrome/Chromium browser in headless mode to
render the public profile grid. It finds the latest posts, skips older pinned
posts when sorting by published date, downloads each cover, and stores its
caption and date. It uses no Instagram login, token, client-side request, or
private endpoint.

Chrome or Chromium must be installed on the VPS. The script auto-detects
`google-chrome`, `google-chrome-stable`, `chromium`, or `chromium-browser` on
Linux. Set `INSTAGRAM_BROWSER_BINARY=/absolute/path/to/browser` if needed.
Always run `--dry-run` from the VPS once before adding the cron job. If
Instagram blocks the browser, the command exits with an error and does not
replace the existing snapshot.

The existing `ig.json` format can be imported when a fresh export is available:

```sh
npm run instagram:sync -- --input ig.json --dry-run
npm run instagram:sync -- --input ig.json
```

Exports can include posts from other accounts. Review ownership, dates, and
images before publishing. The export contains image URLs and accessibility
descriptions, but not post captions. The script reads each public post page for
its caption, date, and a fresh preview URL, then downloads the cover. It
imports up to 12 posts by default (`--limit 4..12` overrides this). Old CDN
links may expire; if a post page is unavailable, the export's image URL and
date remain fallbacks. It requires at least four valid posts before replacing
the snapshot, and saves downloaded covers as 800px WebP files with
content-based filenames.

## Schedule at 09:00 WIB in Webuzo

In Webuzo's Cron Job screen, set minute `0`, hour `9`, day/month/weekday `*`
**only if the server timezone is Asia/Jakarta**. Check the timezone with
`date '+%Z %z'`; if it is UTC, use hour `2`. Use a command like this, replacing
the application path and Node binary path with the real values:

```sh
/bin/sh /home/USER/jhic-web/scripts/run-instagram-daily.sh >> /home/USER/jhic-web/var/instagram-sync.log 2>&1
```

The runner uses `flock` so jobs cannot overlap. Cron must run as the same user
that owns the app. Verify `command -v node` under that user, or set
`NODE_BINARY=/absolute/path/to/node` in the cron environment.

Keep `var/instagram-feed.json` and `var/instagram-media/` on persistent
storage across deployments. If deployment replaces the app directory, mount
or symlink these paths to a shared directory first. A successful job updates
the homepage without rebuilding or restarting. Failed jobs leave the previous feed intact;
check the cron log and do not suppress cron failure notifications.

The scraper has been verified locally against the public profile. Instagram can
still change or block its public web response at any time; a failed run keeps
the previous snapshot rather than blanking the homepage.
