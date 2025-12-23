# fading-alert
A tiny, dependency-free toast / spinner alert for vanilla JavaScript

- No framework
- No CSS file required
- Safe against race conditions
- Spinner + fade-out support

---

## ✨ Features

- `log(text)` – show message
- `spin(text)` – show message with spinner
- `log()` – fade out
- Click to dismiss

---

## 📦 Installation

### Option 1: Direct import
Include the script in your HTML:

```html
<script src="https://anemochore.github.io/fading-alert/fading-alert.js"></script>
```

---

### Option 2: Copy

Copy the contents of `src/fading-alert.js` and paste it directly into your code.

---

## 🚀 Usage

Basic usage:

    const alert = new FadingAlert();

    alert.log('Hello world');
    alert.spin('Loading...');
    alert.log(); // fade out

---

## ⚙️ Custom Style

You can override styles via constructor options:

    new FadingAlert({
      top: '30%',
      width: '320px',
      backgroundColor: '#ffeeba'
    });

---

## 🧪 Demo

Open `demo/index.html` in your browser to see a live demo.
