const STORAGE_KEY = 'claudeRtlEnabled';
const toggle = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

function updateUI(enabled) {
    toggle.checked = enabled;
    statusText.textContent = enabled ? '✅ فعال' : '⭕ غیرفعال';
}

chrome.storage.local.get(STORAGE_KEY, (result) => {
    const enabled = result[STORAGE_KEY] !== false;
    updateUI(enabled);
});

toggle.addEventListener('change', () => {
    const enabled = toggle.checked;

    chrome.storage.local.set({ [STORAGE_KEY]: enabled });

    updateUI(enabled);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'TOGGLE_RTL',
                enabled,
            }).catch(() => {
            });
        }
    });
});
