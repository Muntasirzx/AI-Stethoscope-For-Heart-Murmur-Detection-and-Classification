<div align="center">

<br/>

<h1>A I &nbsp; D I G I T A L &nbsp; S T E T H O S C O P E</h1>
<sub>— &nbsp; I o T  M E D I C A L  D E V I C E  ·  H E A R T  M U R M U R  D E T E C T I O N &nbsp; —</sub>

<br/><br/>

![Status](https://img.shields.io/badge/STATUS-COMPLETE-ffffff?style=for-the-badge&labelColor=000000)
![Accuracy](https://img.shields.io/badge/MODEL_ACCURACY-91.0%25-ffffff?style=for-the-badge&labelColor=000000)
![ESP32](https://img.shields.io/badge/ESP32--S3-FIRMWARE-ffffff?style=for-the-badge&logo=espressif&labelColor=000000&logoColor=ffffff)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.13+-ffffff?style=for-the-badge&logo=tensorflow&labelColor=000000&logoColor=ffffff)
![Python](https://img.shields.io/badge/PYTHON-3.12-ffffff?style=for-the-badge&logo=python&labelColor=000000&logoColor=ffffff)
![React](https://img.shields.io/badge/React-18-ffffff?style=for-the-badge&logo=react&labelColor=000000&logoColor=ffffff)

<br/>

</div>

---

  <div>
    <img src="https://raw.githubusercontent.com/Muntasirzx/AI-Stethoscope-For-Heart-Murmur-Detection-and-Classification/refs/heads/main/DATA/Convert%20to%20GIF%20project.gif" width="49%"/>
    <img src="https://raw.githubusercontent.com/Muntasirzx/AI-Stethoscope-For-Heart-Murmur-Detection-and-Classification/refs/heads/main/DATA/DIGITAL%20STETHOSCOPE.png" width="49%"/>
  </div>


  
---







---

## `〉` Overview

An end-to-end IoT healthcare device combining custom hardware, embedded firmware, cloud-hosted AI inference, and a React clinical dashboard to automate heart murmur detection at the point of care.

The system captures cardiac audio through a dual-microphone stethoscope, applies real-time active noise cancellation on the ESP32-S3, streams the processed signal to a cloud API, and returns a binary classification (Normal / Murmur) within 145 ms — with 91% accuracy against the CirCor DigiScope dataset.

---

## `〉` System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SYSTEM DATA FLOW                             │
├──────────────┬──────────────────────────────────────────────────┤
│  CAPTURE     │  Dual CMA-4544PF-W microphones                   │
│              │  Primary (cardiac) + Reference (ambient noise)   │
├──────────────┼──────────────────────────────────────────────────┤
│  PROCESSING  │  ESP32-S3 Firmware                               │
│              │  LMS adaptive filter → +12.6 dB SNR              │
│              │  Real-time DSP · SD storage · Wi-Fi stream       │
├──────────────┼──────────────────────────────────────────────────┤
│  INFERENCE   │  Django REST API (AWS EC2)                       │
│              │  Mel-Spectrogram (128×128) + MFCC (40×128)       │
│              │  Fusion CNN · 1.9M parameters · 145 ms latency   │
├──────────────┼──────────────────────────────────────────────────┤
│  INTERFACE   │  React 18 Dashboard                              │
│              │  Single-channel + 4-valve assessment modes       │
│              │  Live waveform · Classification result · History │
└──────────────┴──────────────────────────────────────────────────┘
```

---

## `〉` Performance

| Metric | Value |
|---|---|
| **Accuracy** | 91.0% |
| **Precision** | 95.6% |
| **Recall** | 86.0% |
| **SNR Improvement** | +12.6 dB |
| **Inference Latency** | 145 ms |
| **Battery Life** | 9.9 hours |
| **Training Set** | 5,272 recordings (CirCor DigiScope) |
| **Model Parameters** | 1.9M |

**Confusion Matrix**

```
                    Predicted
                 Normal    Murmur
         Normal    460        19
Actual
         Murmur     67       411
```

---

## `〉` Features

| Feature | Detail |
|---|---|
| **Active Noise Cancellation** | LMS adaptive filter using dual-mic differential — +12.6 dB SNR gain |
| **Cloud AI Inference** | Fusion CNN on Mel-Spectrogram + MFCC + HRV inputs — 91% accuracy |
| **Wireless Streaming** | Wi-Fi transmission to cloud API with SD card fallback storage |
| **Dual-Mode Assessment** | Single auscultation point or full 4-valve cardiac sweep |
| **USB Mass Storage** | Recorded sessions accessible as a standard USB drive |
| **Battery** | 9.9 hours continuous operation on 2500 mAh LiPo |

---

## `〉` ML Model

**Architecture:** Fusion CNN — 1.9M parameters

<img src="https://raw.githubusercontent.com/Muntasirzx/AI-Stethoscope-For-Heart-Murmur-Detection-and-Classification/refs/heads/main/DATA/CRNN%20Architecture%20Diagram-1.png" width="89%"/>



<div>
    <img src="https://raw.githubusercontent.com/Muntasirzx/AI-Stethoscope-For-Heart-Murmur-Detection-and-Classification/refs/heads/main/DATA/circorpcg_architecture%20(1).gif" >

</div>


---


**Training configuration:**

| Parameter | Value |
|---|---|
| Dataset | CirCor DigiScope (PhysioNet) |
| Training samples | 5,272 recordings |
| Epochs | 50 |
| Output | `final_murmur_model.keras` · `model_metadata.pkl` |

---

## `〉` Hardware

**Bill of Materials**

| Component | Model | Cost (BDT) |
|---|---|---|
| Microcontroller | ESP32-S3 DevKit | 1,100 |
| Microphones | CMA-4544PF-W × 2 | 760 |
| Amplifier | MAX9814 | 350 |
| DAC | PCM5102A | 250 |
| Display | OLED 0.96" | 350 |
| Battery | LiPo 2500 mAh | 850 |
| PCB, SD card, enclosure | — | 2,190 |
| **Total** | | **~7,850 BDT (~$66 USD)** |

**Pin Mapping**

| Component | GPIO |
|---|---|
| Primary Microphone | GPIO 1 |
| Reference Microphone | GPIO 7 |
| OLED SDA / SCL | GPIO 8 / 9 |
| SD Card CS | GPIO 35 |

---

## `〉` Roadmap

| Item | Status |
|---|---|
| Signal quality feedback on device display | Planned |
| Mobile application (Android / iOS) | Planned |
| On-device edge inference (no cloud dependency) | Planned |
| Multi-language dashboard support | Planned |
| Clinical validation trial (N = 500) | Planned |

---

## `〉` Contact

**Maintainer:** Muntasir Abdullah Bin Ahmed
**Email:** muntasirabdullah.bin.ahmed@g.bracu.ac.bd
**LinkedIn:** [muntasir-abdullah-bin-ahmed](https://linkedin.com/in/muntasir-abdullah-bin-ahmed)
**GitHub:** [Muntasirx](https://github.com/Muntasirx)

---

<div align="center">

<br/>

![Footer](https://img.shields.io/badge/AI_Digital_Stethoscope-IoT_Medical_Device_%C2%B7_Heart_Murmur_Detection-ffffff?style=for-the-badge&labelColor=000000&logoColor=white)

<br/>

<sub>MIT License · Built for accessible point-of-care cardiac screening</sub>

</div>
