const STORAGE_KEY = 'claudeRtlEnabled';
const toggle = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

function updateUI(enabled) {
    toggle.checked = enabled;
    statusText.textContent = enabled ? '✅ فعال' : '⭕ غیرفعال';
}

// خواندن وضعیت فعلی
chrome.storage.local.get(STORAGE_KEY, (result) => {
    const enabled = result[STORAGE_KEY] !== false;
    updateUI(enabled);
});

// تغییر toggle
toggle.addEventListener('change', () => {
    const enabled = toggle.checked;

    // ذخیره در storage
    chrome.storage.local.set({ [STORAGE_KEY]: enabled });

    updateUI(enabled);

    // ارسال پیام به content script تب فعال
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'TOGGLE_RTL',
                enabled,
            }).catch(() => {
                // تب ممکنه claude.ai نباشه — بی‌خطر نادیده بگیر
            });
        }
    });
});
