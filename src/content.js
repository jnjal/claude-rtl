const STORAGE_KEY = 'claudeRtlEnabled';
const ENABLED_CLASS = 'claude-rtl-enabled';
const DISABLED_CLASS = 'claude-rtl-disabled';

function applyState(enabled) {
    document.body.classList.toggle(ENABLED_CLASS, enabled);
    document.body.classList.toggle(DISABLED_CLASS, !enabled);
}

function loadAndApply() {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
        const enabled = result[STORAGE_KEY] !== false;
        applyState(enabled);
    });
}

loadAndApply();

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'TOGGLE_RTL') {
        applyState(msg.enabled);
    }
});

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class' &&
            mutation.target === document.body
        ) {
            const hasEnabled = document.body.classList.contains(ENABLED_CLASS);
            const hasDisabled = document.body.classList.contains(DISABLED_CLASS);

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
