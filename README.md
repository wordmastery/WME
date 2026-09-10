# A&N VIBE — Website

Premium Bag Manufacturer ki official website.
Byculla, Mumbai.

---

## 📁 File Structure
anvibe-website/
│
├── index.html                    ← Main website file
│
├── css/
│   └── style.css                 ← Saari styling
│
├── js/
│   └── main.js                   ← Saara JavaScript (pricing + WhatsApp)
│
├── images/
│   ├── logo.png                  ← Aapka logo yahan
│   ├── favicon.ico               ← Browser tab icon (optional)
│   │
│   └── products/
│       ├── pencil-pouch.jpg      ← Pencil Pouch ki image
│       ├── tote-bag.jpg          ← Tote Bag ki image
│       ├── jhola-bag.jpg         ← Jhola Bag ki image
│       ├── backpack.jpg          ← Backpack ki image
│       ├── laptop-backpack.jpg   ← Laptop Backpack ki image
│       ├── duffel-bag.jpg        ← Travel Duffel ki image
│       └── sling-bag.jpg         ← Sling Bag ki image
│
└── README.md                     ← Instructions (Hindi mein)
```



---

## 🖼️ Images Kaise Add Karein

### 1. Logo
- Apna logo `images/logo.png` naam se save karein
- Size: **500x150 px** (ya similar horizontal shape)
- Format: **PNG** (transparent background best hai)

### 2. Product Images
- Har product ki image `images/products/` folder mein daalein
- **Exact filenames** use karein jo table mein diye hain (warna image nahi dikhegi)
- Recommended size: **800x600 px**
- Format: **JPG ya PNG**
- Aspect ratio: **4:3** ya **16:9**

| File Name | Product |
|-----------|---------|
| `pencil-pouch.jpg` | Premium Pencil Pouch |
| `tote-bag.jpg` | Classic Tote Bag |
| `jhola-bag.jpg` | Premium Jhola Bag |
| `backpack.jpg` | Backpack |
| `laptop-backpack.jpg` | Laptop Backpack |
| `duffel-bag.jpg` | Travel Duffel Bag |
| `sling-bag.jpg` | Sling Bag |

**Agar image nahi daalenge** toh us product par automatically ek **coral colored SVG icon** dikh jayega — website phir bhi professional lagegi.

---

## 💰 Pricing Change Kaise Karein

`js/main.js` file kholiye. Sabse upar `pricing` object milega:

```javascript
pencil: {
  name: 'Premium Pencil Pouch',
  moq: 10,
  tiers: [
    { min: 10,  max: 24,       price: 199 },
    { min: 25,  max: 49,       price: 179 },
    { min: 50,  max: 99,       price: 159 },
    { min: 100, max: Infinity, price: 149 }
  ]
}


const CONTACT = {
  whatsapp: '917903433690',
  email: 'anvibe@gmail.com'
};