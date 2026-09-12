import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = (path) => readFileSync(new URL('../../src/' + path, import.meta.url), 'utf8');

test('peta sekolah is discoverable from primary navigation and footer', () => {
  const navigation = source('config/navigation.ts');
  const [primary, footer] = navigation.split('export const footerNavigation');
  assert.match(primary, /label: "Peta Sekolah", href: "\/peta-sekolah"/);
  assert.match(footer, /href: "\/peta-sekolah"/);
});

test('map is linked from the homepage, facilities, and indexed in sitemap', () => {
  assert.match(source('app/page.tsx'), /<CampusMapCta\s*\/>/);
  assert.match(source('components/home/campus-map-cta.tsx'), /href="\/peta-sekolah"/);
  assert.match(source('app/tentang/fasilitas/page.tsx'), /href="\/peta-sekolah"/);
  assert.match(source('app/sitemap.ts'), /"\/peta-sekolah"/);
});
