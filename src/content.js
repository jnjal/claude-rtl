/**
 * Claude RTL & Font Fixer v2.0
 * content.js — مدیریت toggle و SPA-awareness
 */

const STORAGE_KEY = 'claudeRtlEnabled';
const ENABLED_CLASS = 'claude-rtl-enabled';
const DISABLED_CLASS = 'claude-rtl-disabled';

// ─── اعمال وضعیت روی body ───────────────────────────────────────
function applyState(enabled) {
    document.body.classList.toggle(ENABLED_CLASS, enabled);
    document.body.classList.toggle(DISABLED_CLASS, !enabled);
}

// ─── خواندن وضعیت از storage و اعمال ───────────────────────────
function loadAndApply() {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
        // پیش‌فرض: روشن
        const enabled = result[STORAGE_KEY] !== false;
        applyState(enabled);
    });
}

// ─── اولین بار اجرا ─────────────────────────────────────────────
loadAndApply();

// ─── گوش دادن به پیام‌های popup ─────────────────────────────────
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'TOGGLE_RTL') {
        applyState(msg.enabled);
    }
});

// ─── MutationObserver برای SPA navigation ───────────────────────
// کلاد یه React SPA هست — وقتی مکالمه عوض می‌شه body کلاس خودشو
// از دست می‌ده. این observer مطمئن می‌شه کلاس همیشه حفظ بشه.
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class' &&
            mutation.target === document.body
        ) {
            const hasEnabled = document.body.classList.contains(ENABLED_CLASS);
            const hasDisabled = document.body.classList.contains(DISABLED_CLASS);

            // اگه هیچ‌کدام از کلاس‌های ما نبود، دوباره load کن
            if (!hasEnabled && !hasDisabled) {
                loadAndApply();
            }
            break;
        }
    }
});

observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
    subtree: false,
});
