<div dir="rtl">

# Claude RTL & Font Fixer

افزونه کروم برای راست‌چین کردن متن‌های فارسی و تغییر فونت سایت [claude.ai](https://claude.ai) به **وزیرمتن** (نسخه محلی، بدون نیاز به اینترنت)

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![License](https://img.shields.io/github/license/jnjal/claude-rtl)

---

## ✨ ویژگی‌ها

- 🔤 **فونت وزیرمتن** — تمام وزن‌ها (Thin تا Black) به‌صورت محلی بارگذاری می‌شن، بدون وابستگی به CDN
- ↩️ **راست‌چین هوشمند** — فقط محتوای چت راست‌چین می‌شه، UI اصلی کلاد دست نمی‌خوره
- 💻 **کدها همیشه LTR** — بلوک‌های کد و `inline code` با فونت monospace و چیدمان چپ‌چین حفظ می‌شن
- ⚡ **SPA-aware** — با `MutationObserver` بعد از navigate بین مکالمات هم کار می‌کنه
- 🔘 **دکمه روشن/خاموش** — از popup افزونه می‌تونی سریع غیرفعالش کنی

---

## 📦 نصب (Developer Mode)

> افزونه هنوز در Chrome Web Store منتشر نشده — باید دستی نصب بشه

**۱. دانلود**

```
Code → Download ZIP
```

یا با git:

```bash
git clone https://github.com/jnjal/claude-rtl.git
```

**۲. فعال‌سازی Developer Mode در Chrome**

آدرس زیر رو باز کن:

```
chrome://extensions
```

گزینه **Developer mode** رو (گوشه بالا راست) روشن کن.

**۳. بارگذاری افزونه**

روی **Load unpacked** کلیک کن و پوشه `src` داخل ریپو رو انتخاب کن.

---

## 📁 ساختار پروژه

```
claude-rtl/
├── src/
│   ├── manifest.json      # تنظیمات افزونه (Manifest V3)
│   ├── content.js         # تزریق کلاس‌ها + MutationObserver
│   ├── style.css          # فونت‌ها، RTL، override کدها
│   ├── popup.html         # رابط کاربری دکمه روشن/خاموش
│   ├── popup.js           # منطق toggle و ذخیره‌سازی
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── fonts/
│       ├── Vazirmatn-Thin.ttf
│       ├── Vazirmatn-ExtraLight.ttf
│       ├── Vazirmatn-Light.ttf
│       ├── Vazirmatn-Regular.ttf
│       ├── Vazirmatn-Medium.ttf
│       ├── Vazirmatn-SemiBold.ttf
│       ├── Vazirmatn-Bold.ttf
│       ├── Vazirmatn-ExtraBold.ttf
│       └── Vazirmatn-Black.ttf
└── README.md
```

---

## 🛠️ نحوه کارکرد

افزونه با اضافه کردن کلاس `claude-rtl-enabled` به `<body>` کار می‌کنه. تمام استایل‌ها زیر این کلاس تعریف شدن تا:

- وقتی افزونه **غیرفعاله** هیچ تغییری در صفحه ایجاد نشه
- `MutationObserver` مطمئن می‌شه بعد از هر navigation داخل SPA کلاد، کلاس حفظ بمونه
- وضعیت روشن/خاموش با `chrome.storage.local` ذخیره می‌شه

---

## 🔤 درباره فونت وزیرمتن

فونت [Vazirmatn](https://github.com/rastikerdar/vazirmatn) ساخته [رستی کردار](https://github.com/rastikerdar) است و تحت مجوز **SIL Open Font License 1.1** منتشر شده.

---

## 📄 لایسنس

MIT — برای جزئیات فایل [LICENSE](./LICENSE) رو ببین.

</div>
