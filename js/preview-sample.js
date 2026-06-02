/**
 * Typography preview — list mode + sample page layout.
 * Loaded before app.js (no build step). Factory receives app dependencies via create().
 * @see docs/DEVELOPMENT.md
 */
window.FSSPreviewSample = (function () {
  'use strict';

  function create(deps) {
    const {
      t,
      escapeHtml,
      escapeAttr,
      ICONS,
      previewTextStyle,
      previewFontFamilyStyle,
    } = deps;

    function pst(level, c, vw, tag, className, content) {
      return `<${tag} class="preview-scale-text ${className}" data-preview-level="${level}" style="${previewTextStyle(level, c, vw)}">${escapeHtml(content)}</${tag}>`;
    }

    function featureCard(c, vw, titleKey, bodyKey, metaKey, imgClass) {
      return `<article class="ps-feature-card">
        <div class="ps-feature-card-image ${imgClass}" aria-hidden="true"></div>
        <div class="ps-feature-card-body">
          ${pst(2, c, vw, 'h4', 'ps-feature-card-title', t(titleKey))}
          ${pst(0, c, vw, 'p', 'ps-feature-card-text', t(bodyKey))}
          ${pst(-2, c, vw, 'p', 'ps-feature-card-meta', t(metaKey))}
        </div>
      </article>`;
    }

    function renderList(ctx) {
      const { c, vw, levels, sizeAtViewport, fmtPx, getLabel } = ctx;
      return levels.map(level => {
        const px = sizeAtViewport(level, vw, c);
        return `<div class="preview-block" data-preview-level="${level}">
          <div class="preview-meta">Lv ${level} · ${escapeHtml(getLabel(level))} · <span class="preview-px">${fmtPx(px)}</span> @ <span class="preview-vw">${vw}</span>px</div>
          <div class="preview-text" style="font-size: ${px}px">${t('previewSample', { label: getLabel(level) })}</div>
        </div>`;
      }).join('');
    }

    function renderSample(c, vw) {
      const fontWrap = previewFontFamilyStyle();
      const wrapAttr = fontWrap ? ` style="${escapeAttr(fontWrap)}"` : '';
      const sidebarItem = (level, text, active = false) =>
        `<li class="${active ? 'is-active' : ''}">${pst(level, c, vw, 'span', 'ps-sidebar-link', text)}</li>`;
      const footerLinks = (level) => Array.from({ length: 2 }, () =>
        `<li>${pst(level, c, vw, 'span', 'ps-footer-link', t('sampleFooterLink'))}</li>`,
      ).join('');

      return `<div class="preview-sample"${wrapAttr}>
        <div class="ps-shell">
          <div class="ps-drawer-backdrop" id="psDrawerBackdrop" hidden></div>
          <aside class="ps-sidebar" id="psSidebar" aria-label="Sidebar">
            ${pst(-2, c, vw, 'p', 'ps-sidebar-label', t('sampleSidebarDoc'))}
            <ul class="ps-sidebar-list">
              ${sidebarItem(-1, t('sampleSidebarNav1'), true)}
              ${sidebarItem(-1, t('sampleSidebarNav2'))}
              ${sidebarItem(-1, t('sampleSidebarNav3'))}
            </ul>
            ${pst(-2, c, vw, 'p', 'ps-sidebar-label', t('sampleSidebarProject'))}
            <ul class="ps-sidebar-list">
              ${sidebarItem(-1, t('sampleSidebarNav2'))}
              <li class="ps-sidebar-nested">
                <ul class="ps-sidebar-sublist">
                  ${sidebarItem(-2, t('sampleSidebarSub1'))}
                  ${sidebarItem(-2, t('sampleSidebarSub2'))}
                </ul>
              </li>
            </ul>
          </aside>

          <div class="ps-main">
            <div class="ps-main-toolbar">
              <button type="button" class="ps-menu-btn" id="psMenuBtn" aria-expanded="false" aria-controls="psSidebar" aria-label="${escapeAttr(t('sampleMenuOpen'))}">${ICONS.menu}</button>
            </div>
            ${pst(-3, c, vw, 'p', 'ps-breadcrumb', t('sampleBreadcrumb'))}
            ${pst(5, c, vw, 'h1', 'ps-page-title', t('samplePageTitle'))}
            ${pst(1, c, vw, 'p', 'ps-page-lead', t('samplePageLead'))}

            <section class="ps-kv">
              <div class="ps-kv-media" aria-hidden="true"></div>
              <div class="ps-kv-copy">
                ${pst(-2, c, vw, 'p', 'ps-kv-eyebrow', t('sampleKvEyebrow'))}
                ${pst(6, c, vw, 'h2', 'ps-kv-title', t('sampleKvTitle'))}
                ${pst(1, c, vw, 'p', 'ps-kv-lead', t('sampleKvLead'))}
              </div>
            </section>

            <section class="ps-section">
              ${pst(4, c, vw, 'h2', 'ps-section-title', t('sampleSectionOverview'))}
              <div class="ps-media">
                <div class="ps-media-image" aria-hidden="true"></div>
                <div class="ps-media-body">
                  ${pst(3, c, vw, 'h3', 'ps-media-title', t('sampleMediaTitle'))}
                  ${pst(0, c, vw, 'p', 'ps-media-text', t('sampleMediaBody'))}
                  ${pst(-2, c, vw, 'p', 'ps-media-caption', t('sampleMediaCaption'))}
                </div>
              </div>
            </section>

            <section class="ps-section">
              ${pst(4, c, vw, 'h2', 'ps-section-title', t('sampleSectionArticles'))}
              <ul class="ps-article-list">
                <li class="ps-article-item">
                  ${pst(2, c, vw, 'h4', 'ps-article-title', t('sampleArticle1Title'))}
                  ${pst(0, c, vw, 'p', 'ps-article-body', t('sampleArticle1Body'))}
                  ${pst(-2, c, vw, 'p', 'ps-article-meta', t('sampleArticle1Meta'))}
                </li>
                <li class="ps-article-item">
                  ${pst(2, c, vw, 'h4', 'ps-article-title', t('sampleArticle2Title'))}
                  ${pst(0, c, vw, 'p', 'ps-article-body', t('sampleArticle2Body'))}
                  ${pst(-2, c, vw, 'p', 'ps-article-meta', t('sampleArticle2Meta'))}
                </li>
              </ul>
            </section>

            <section class="ps-section">
              ${pst(4, c, vw, 'h2', 'ps-section-title', t('sampleSectionFeatured'))}
              <div class="ps-feature-grid">
                ${featureCard(c, vw, 'sampleFeatured1Title', 'sampleFeatured1Body', 'sampleFeatured1Meta', 'ps-feature-img-1')}
                ${featureCard(c, vw, 'sampleFeatured2Title', 'sampleFeatured2Body', 'sampleFeatured2Meta', 'ps-feature-img-2')}
                ${featureCard(c, vw, 'sampleFeatured3Title', 'sampleFeatured3Body', 'sampleFeatured3Meta', 'ps-feature-img-3')}
              </div>
            </section>

            <section class="ps-section">
              ${pst(4, c, vw, 'h2', 'ps-section-title', t('sampleSectionCards'))}
              <div class="ps-cards">
                <article class="ps-card">
                  ${pst(2, c, vw, 'h4', 'ps-card-title', t('sampleCard1Title'))}
                  ${pst(0, c, vw, 'p', 'ps-card-body', t('sampleCard1Body'))}
                  ${pst(-3, c, vw, 'p', 'ps-card-meta', t('sampleCard1Meta'))}
                </article>
                <article class="ps-card">
                  ${pst(2, c, vw, 'h4', 'ps-card-title', t('sampleCard2Title'))}
                  ${pst(0, c, vw, 'p', 'ps-card-body', t('sampleCard2Body'))}
                  ${pst(-3, c, vw, 'p', 'ps-card-meta', t('sampleCard2Meta'))}
                </article>
              </div>
              <div class="ps-actions">
                ${pst(-1, c, vw, 'span', 'ps-btn ps-btn-primary', t('sampleBtnPrimary'))}
                ${pst(-1, c, vw, 'span', 'ps-btn ps-btn-secondary', t('sampleBtnSecondary'))}
              </div>
            </section>
          </div>
        </div>

        <footer class="ps-footer">
          <div class="ps-footer-cols">
            <div>
              ${pst(-2, c, vw, 'p', 'ps-footer-heading', t('sampleFooterCol1'))}
              <ul class="ps-footer-list">${footerLinks(-2)}</ul>
            </div>
            <div>
              ${pst(-2, c, vw, 'p', 'ps-footer-heading', t('sampleFooterCol2'))}
              <ul class="ps-footer-list">${footerLinks(-2)}</ul>
            </div>
            <div>
              ${pst(-2, c, vw, 'p', 'ps-footer-heading', t('sampleFooterCol3'))}
              <ul class="ps-footer-list">${footerLinks(-2)}</ul>
            </div>
          </div>
          ${pst(-3, c, vw, 'p', 'ps-footer-copy', t('sampleFooterCopy'))}
        </footer>
      </div>`;
    }

    function bindDrawer() {
      const sample = document.querySelector('.preview-sample');
      const btn = document.getElementById('psMenuBtn');
      const backdrop = document.getElementById('psDrawerBackdrop');
      const sidebar = document.getElementById('psSidebar');
      if (!sample || !btn) return;

      const close = () => {
        sample.classList.remove('is-drawer-open');
        btn.setAttribute('aria-expanded', 'false');
        if (backdrop) backdrop.hidden = true;
      };
      const open = () => {
        sample.classList.add('is-drawer-open');
        btn.setAttribute('aria-expanded', 'true');
        if (backdrop) backdrop.hidden = false;
      };

      btn.addEventListener('click', () => {
        if (sample.classList.contains('is-drawer-open')) close();
        else open();
      });
      backdrop?.addEventListener('click', close);
      sidebar?.querySelectorAll('.ps-sidebar-link').forEach(link => {
        link.addEventListener('click', close);
      });
    }

    function closeDrawerIfWide(viewportPx) {
      if (viewportPx >= 639) {
        document.querySelector('.preview-sample')?.classList.remove('is-drawer-open');
        const menuBtn = document.getElementById('psMenuBtn');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        const backdrop = document.getElementById('psDrawerBackdrop');
        if (backdrop) backdrop.hidden = true;
      }
    }

    return { renderList, renderSample, bindDrawer, closeDrawerIfWide };
  }

  return { create };
})();
