#!/usr/bin/env node
/**
 * Security regression checks for URL/localStorage input handling.
 * Run: node scripts/verify-security.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const appJs = readFileSync(join(root, 'js/app.js'), 'utf8');
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8');

const failures = [];

function fail(msg) {
  failures.push(msg);
}

// --- static source checks ---
if (!appJs.includes('function sanitizeExternalState')) fail('missing sanitizeExternalState');
if (!appJs.includes('function clampStateFields')) fail('missing clampStateFields');
if (!appJs.includes('function sanitizeLabelString')) fail('missing sanitizeLabelString');
if (!appJs.includes('MAX_LB_PARAM_LEN')) fail('missing lb param length cap');
if (!appJs.includes('MAX_STORAGE_BYTES')) fail('missing storage size cap');
if (appJs.includes('value="${getLabel(level)}"')) fail('unescaped label in input value attribute');
if ((appJs.match(/function escapeHtml/g) || []).length !== 1) fail('duplicate escapeHtml definitions');
if (indexHtml.includes('<script>') && indexHtml.includes('location.pathname')) {
  fail('inline base-path script still present (CSP bypass)');
}
if (!indexHtml.includes('Content-Security-Policy')) fail('missing CSP meta tag');
if (!indexHtml.includes('js/base-path.js')) fail('missing external base-path.js');
if (!indexHtml.includes('js/preview-sample.js')) fail('missing preview-sample.js script');
if (!indexHtml.includes('js/app.js')) fail('missing app.js script');
const previewIdx = indexHtml.indexOf('js/preview-sample.js');
const appIdx = indexHtml.indexOf('js/app.js');
if (previewIdx === -1 || appIdx === -1 || previewIdx > appIdx) {
  fail('preview-sample.js must load before app.js');
}

// --- mirrored sanitizer logic (must stay aligned with app.js) ---
const MAX_LABEL_LEN = 32;

function sanitizeLabelString(value) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, MAX_LABEL_LEN).replace(/[\x00-\x1f\x7f<>`]/g, '');
}

function cssSlug(level, labels, defaultLabel) {
  const raw = String(labels[level] ?? defaultLabel(level));
  const slug = raw.trim().toLowerCase()
    .replace(/[^\w-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_LABEL_LEN);
  return slug || defaultLabel(level);
}

const defaultLabel = (level) => `level-${level}`;

const xssPayloads = [
  '<img src=x onerror=alert(1)>',
  '"><script>alert(1)</script>',
  'javascript:alert(1)',
  '\x00body',
  'a'.repeat(100),
];

for (const payload of xssPayloads) {
  const sanitized = sanitizeLabelString(payload);
  if (sanitized.includes('<') || sanitized.includes('>') || sanitized.includes('`')) {
    fail(`sanitizeLabelString allowed dangerous chars: ${payload}`);
  }
  if (sanitized.length > MAX_LABEL_LEN) {
    fail(`sanitizeLabelString exceeded max length for: ${payload}`);
  }
  const slug = cssSlug(0, { 0: payload }, defaultLabel);
  if (!/^[\w-]+$/.test(slug)) {
    fail(`cssSlug produced unsafe identifier: ${slug} from ${payload}`);
  }
}

if (sanitizeLabelString('  hello  ') !== 'hello') {
  fail('sanitizeLabelString should trim');
}

console.log(failures.length ? failures.join('\n') : 'verify-security: OK');
process.exit(failures.length ? 1 : 0);
