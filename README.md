<div align="center">

# 🩺 AI-Powered Digital Stethoscope

[![ESP32](https://img.shields.io/badge/ESP32-S3-red?style=flat-square&logo=espressif)](https://www.espressif.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.13+-orange?style=flat-square&logo=tensorflow)](https://www.tensorflow.org/)
[![Python](https://img.shields.io/badge/Python-3.12-blue?style=flat-square&logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**IoT medical device for automated heart murmur detection**  
*Hardware + Embedded Systems + Cloud AI*

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## 🌟 Overview

Complete IoT healthcare solution combining:
- **Custom Hardware**: Dual-microphone stethoscope with active noise cancellation
- **ESP32-S3 Firmware**: Real-time DSP and wireless transmission
- **Cloud AI**: TensorFlow model achieving **91% accuracy**
- **React Dashboard**: Dual-mode clinical interface

```mermaid
graph LR
    A[🎤 Microphones] --> B[ESP32-S3]
    B --> C[☁️ Cloud API]
    C --> D[🧠 TensorFlow]
    D --> E[⚕️ Dashboard]
```

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 🔇 **Active Noise Cancellation** | +12.6 dB SNR improvement with LMS adaptive filtering |
| 🧠 **Cloud AI Inference** | 91% accuracy, Fusion CNN with Mel-spectrogram + MFCC |
| 📡 **Wireless Connectivity** | Wi-Fi streaming + SD storage + USB mass storage |
| 🔋 **Long Battery Life** | 9.9 hours on 2500mAh LiPo battery |
| 📊 **Dual-Mode Analysis** | Single-channel + 4-valve comprehensive assessment |

---

## 📁 Repository Structure

```
├── 📂 hardware/          # PCB design files (Altium), schematics, BOM
├── 📂 firmware/          # ESP32 Arduino code (.ino, ANC, DSP, Wi-Fi)
├── 📂 ml_model/          # TensorFlow model (.keras), training scripts
├── 📂 backend/           # Django REST API, inference engine
└── 📂 frontend/          # React web dashboard
```

---

## 🚀 Quick Start

### **1️⃣ Hardware Setup**

**Components:**
- ESP32-S3 DevKit
- 2× CMA-4544PF-W microphones
- MAX9814 amplifier
- 0.96" OLED display
- microSD card + LiPo battery

**Wiring:**
| Component | Pin |
|-----------|-----|
| Primary Mic | GPIO 1 |
| Reference Mic | GPIO 7 |
| OLED (SDA/SCL) | GPIO 8/9 |
| SD Card (CS) | GPIO 35 |

---

### **2️⃣ Firmware Upload**

```bash
# Install ESP32 board support in Arduino IDE
# Tools > Board Manager > "esp32"

# Configure Wi-Fi
# Edit firmware/esp32_stethoscope/config.h
#define WIFI_SSID "YourWiFi"
#define SERVER_URL "http://your-server:5000"

# Upload to ESP32-S3
# Board: ESP32S3 Dev Module
# Upload Speed: 921600
```

---

### **3️⃣ Backend Deployment**

**Local:**
```bash
cd backend/
pip install -r requirements.txt
python app.py
# Server at http://localhost:5000
```

**AWS EC2:**
```bash
# Launch Ubuntu 22.04 instance
ssh ubuntu@your-ec2-ip
git clone https://github.com/yourusername/ai-stethoscope.git
cd ai-stethoscope/backend

# Install & configure
sudo apt install python3-pip nginx
pip3 install -r requirements.txt --break-system-packages
sudo cp deployment/nginx.conf /etc/nginx/sites-available/
sudo systemctl restart nginx
```

---

### **4️⃣ Frontend Setup**

```bash
cd frontend/
npm install
npm run build
npx vercel --prod  # Or deploy to any static host
```

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| Accuracy | 91.0% |
| Precision | 95.6% |
| Recall | 86.0% |
| SNR Improvement | +12.6 dB |
| Latency | 145 ms |
| Battery Life | 9.9 hours |

**Confusion Matrix:**
```
              Predicted
           Absent  Present
Actual  
Absent      460      19
Present      67     411
```

---

## 🛠️ Hardware BOM

| Component | Model | Price (BDT) |
|-----------|-------|-------------|
| Microcontroller | ESP32-S3 | 1,100 |
| Microphones | CMA-4544PF-W (×2) | 760 |
| Amplifier | MAX9814 | 350 |
| DAC | PCM5102A | 250 |
| Display | OLED 0.96" | 350 |
| Battery | LiPo 2500mAh | 850 |
| Others | PCB, SD, enclosure | 2,190 |
| **Total** | | **~7,850 BDT** ($66) |

---

## 📖 Documentation

- 📘 [Hardware Assembly](docs/hardware_assembly.md)
- 🔌 [Firmware Guide](docs/firmware_upload.md)
- ☁️ [Cloud Deployment](docs/cloud_deployment.md)
- 👨‍⚕️ [User Manual](docs/clinical_usage.md)

---

## 🧠 ML Model

**Architecture:** Fusion CNN (1.9M parameters)
- **Inputs:** Mel-Spectrogram (128×128) + MFCC (40×128) + HRV metrics
- **Training:** 5,272 recordings (CirCor dataset), 50 epochs
- **Output:** Binary classification (Normal/Murmur)

**Files:**
- `final_murmur_model.keras` - Trained model
- `model_metadata.pkl` - Label encoder

---

## 🤝 Contributing

Contributions welcome! Areas:
- 🔧 Hardware optimization
- 💻 Firmware features
- 🧠 Model improvements
- 🌐 UI/UX enhancements

```bash
# Fork → Create branch → Commit → Push → PR
git checkout -b feature/your-feature
```

---

## 🐛 Roadmap

- [ ] Signal quality feedback
- [ ] Mobile app (Android/iOS)
- [ ] Edge AI (on-device inference)
- [ ] Multi-language support
- [ ] Clinical trial (N=500)

---

## 📜 License

MIT License - see [LICENSE](LICENSE)

---

## 📞 Contact

**Maintainer:** Muntasir Abdullah Bin Ahmed  
📧 muntasirabdullah.bin.ahmed@g.bracu.ac.bd  
🔗 [LinkedIn](https://linkedin.com/in/muntasir-abdullah-bin-ahmed) | [GitHub](https://github.com/Muntasirx)

---

<div align="center">

**⭐ If you found this helpful, give it a star!**

*Made with ❤️ for accessible healthcare*

</div>
