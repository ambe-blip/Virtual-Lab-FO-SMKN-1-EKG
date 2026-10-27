import React, { useState, useEffect } from 'react';
import { 
  Shield, Wrench, Scissors, Zap, Activity, Award, CheckCircle2, 
  AlertTriangle, Play, RotateCcw, ChevronRight, Eye, Terminal, 
  Cpu, Radio, Sliders, Sparkles, BookOpen, HelpCircle, Check, 
  X, Flame, Crosshair, Wifi, Layers, ArrowRight, RefreshCw,
  Download, UserCheck, Volume2, Info
} from 'lucide-react';

// ==========================================
// DATA PERALATAN & K3 (MODUL 1)
// ==========================================
const EQUIPMENT_LIST = [
  {
    id: 'dropcore',
    name: 'Kabel Drop Core FTTH (1 Core)',
    category: 'Media Transmisi',
    desc: 'Kabel serat optik Single Mode (G.657A) untuk instalasi luar ruangan dari ODP ke rumah pelanggan (ONT). Dilengkapi kawat seling (messenger wire) dan 2 FRP strength member.',
    specs: ['Core: 9 µm (Single Mode)', 'Cladding: 125 µm', 'Coating: 250 µm', 'Jaket: LSZH Hitam + Kawat Baja'],
    color: 'from-slate-500 to-slate-700',
    svgType: 'cable'
  },
  {
    id: 'stripper_dc',
    name: 'Drop Core Stripper',
    category: 'Alat Kupas (Stripping)',
    desc: 'Tang pengupas khusus untuk memisahkan jaket pelindung luar LSZH dan memotong kawat seling pada kabel Drop Core tanpa melukai serat kaca di dalamnya.',
    specs: ['Ukuran Kabel: 3.1 x 2.0 mm', 'Material: Baja Karbon Tinggi', 'Fitur: Pisau ganda presisi'],
    color: 'from-emerald-500 to-teal-700',
    svgType: 'stripper_dc'
  },
  {
    id: 'miller',
    name: 'Miller / Clauss Fiber Stripper (3 Lubang)',
    category: 'Alat Kupas Presisi',
    desc: 'Digunakan untuk mengupas lapisan coating plastik (250 mikron) sehingga menyisakan lapisan cladding kaca murni (125 mikron) sebelum dipotong.',
    specs: ['Lubang 1: Jaket 1.6 - 3.0 mm', 'Lubang 2: Buffer 600 - 900 µm', 'Lubang 3: Coating 250 µm -> 125 µm'],
    color: 'from-amber-400 to-yellow-600',
    svgType: 'miller'
  },
  {
    id: 'cleaver',
    name: 'High-Precision Fiber Cleaver (CT-30/FC-6S)',
    category: 'Alat Pemotong Inti',
    desc: 'Pemotong inti serat kaca dengan mata pisau berlian berputar. Menghasilkan potongan ujung fiber yang rata sempurna (sudut < 0.5 derajat) agar cahaya tidak memantul.',
    specs: ['Sudut Potong: < 0.5°', 'Panjang Cleave: 9 - 16 mm', 'Umur Pisau: 48.000 kali potong'],
    color: 'from-blue-500 to-indigo-700',
    svgType: 'cleaver'
  },
  {
    id: 'alcohol',
    name: 'Alkohol Isopropil 99% & Kimwipes',
    category: 'Pembersih Optik',
    desc: 'Cairan alkohol kemurnian tinggi (99% tanpa residu air) dan tisu bebas serat (lint-free) untuk membersihkan debu mikroskopis pada cladding.',
    specs: ['Kadar Alkohol: >= 99% IPA', 'Tisu: Non-abrasive, Lint-free', 'Teknik: Usap satu arah (One-way wipe)'],
    color: 'from-cyan-400 to-sky-600',
    svgType: 'alcohol'
  },
  {
    id: 'splicer',
    name: 'Core-to-Core Fusion Splicer',
    category: 'Mesin Penyambung',
    desc: 'Mesin penyambung dua ujung serat optik dengan meleburkannya menggunakan busur api listrik tegangan tinggi (Electric Arc) dan menyelaraskan inti secara otomatis.',
    specs: ['Metode: PAS (Profile Alignment System)', 'Waktu Splice: 6-8 Detik', 'Rata-rata Loss: 0.01 - 0.02 dB'],
    color: 'from-amber-500 to-orange-700',
    svgType: 'splicer'
  },
  {
    id: 'opm',
    name: 'Optical Power Meter (OPM)',
    category: 'Alat Ukur Jaringan',
    desc: 'Alat untuk mengukur kekuatan daya cahaya (dalam satuan dBm) yang diterima di ujung kabel optik untuk mengetahui kualitas sambungan dan redaman.',
    specs: ['Lambda: 850/1300/1310/1490/1550/1625 nm', 'Rentang Ukur: -70 s/d +10 dBm', 'Konektor: Universal SC/FC/ST'],
    color: 'from-purple-500 to-fuchsia-700',
    svgType: 'opm'
  },
  {
    id: 'vfl',
    name: 'Visual Fault Locator (VFL / Laser Merah)',
    category: 'Detektor Kerusakan',
    desc: 'Senter laser merah berdaya tinggi (650 nm) yang ditembakkan ke dalam core untuk mendeteksi patahan atau lekukan tajam (macro-bending) secara visual.',
    specs: ['Panjang Gelombang: 650 nm (Merah Terang)', 'Daya: 10 mW - 30 mW (Jarak 10-30 km)', 'Mode: Continuous Wave (CW) & Glint/Kedip'],
    color: 'from-red-500 to-rose-700',
    svgType: 'vfl'
  }
];

const K3_ITEMS = [
  {
    id: 'glasses',
    title: 'Kacamata Safety Pelindung (Safety Goggles)',
    desc: 'Melindungi mata dari lentingan potongan serat kaca mikroskopis saat proses cleaving dan radiasi sinar laser.',
    warning: 'Potongan fiber 125 mikron transparan dan sangat tajam!'
  },
  {
    id: 'bin',
    title: 'Kotak Sampah Khusus Serat Kaca (Fiber Shard Bin)',
    desc: 'Wadah tertutup berlabel khusus untuk membuang sisa potongan kaca fiber agar tidak menancap di kulit atau terbawa ke makanan.',
    warning: 'Serat kaca tidak bisa terurai di dalam tubuh manusia!'
  },
  {
    id: 'laser_rule',
    title: 'Protokol Anti-Inspeksi Mata Langsung (No Direct Eye Look)',
    desc: 'Pantangan mutlak melihat langsung ke ujung konektor patch cord yang aktif karena sinar laser 1310/1550 nm tidak terlihat (infrared) namun membakar retina.',
    warning: 'Sinar laser OLT/OLS bersifat Invisible Infrared!'
  },
  {
    id: 'mat',
    title: 'Alas Kerja Hitam Kontras & Sarung Tangan Nitril',
    desc: 'Alas hitam memudahkan mata melihat serat kaca bening, sementara sarung tangan melindungi dari iritasi alkohol dan tusukan kevlar/seling.',
    warning: 'Meja terang membuat pecahan fiber mustahil terlihat!'
  }
];

// ==========================================
// DATA SOAL KUIS SERTIFIKASI (MODUL 5)
// ==========================================
const QUIZ_QUESTIONS = [
  {
    q: 'Seorang teknisi FTTH sedang mengupas lapisan coating kabel serat optik Single Mode menggunakan Miller Stripper. Berapakah perubahan diameter serat dari lapisan Coating ke lapisan Cladding murni?',
    options: [
      'Dari 900 mikron menjadi 250 mikron',
      'Dari 250 mikron menjadi 125 mikron',
      'Dari 125 mikron menjadi 9 mikron',
      'Dari 1000 mikron menjadi 500 mikron'
    ],
    answer: 1,
    explanation: 'Serat optik standar memiliki ukuran Core 9 µm, Cladding kaca 125 µm, dan pelindung Coating plastik 250 µm. Miller stripper mengupas coating 250 µm hingga menyisakan cladding 125 µm.'
  },
  {
    q: 'Pada saat melakukan pemotongan inti menggunakan High-Precision Fiber Cleaver, berapakah batas maksimal sudut kemiringan potong (Cleave Angle) yang direkomendasikan agar hasil Fusion Splicing memiliki redaman di bawah 0.03 dB?',
    options: [
      'Di bawah 1.0 derajat (ideal < 0.5°)',
      'Antara 3.0 hingga 5.0 derajat',
      'Minimal 10 derajat agar mudah melebur',
      'Tidak berpengaruh asalkan serat bersih'
    ],
    answer: 0,
    explanation: 'Sudut potong (Cleave Angle) yang baik harus di bawah 1.0 derajat (bahkan < 0.5° pada mesin presisi). Jika lebih dari 1°, akan muncul gelembung udara (bubble) atau garis hitam saat di-splice.'
  },
  {
    q: 'Jaringan FTTH dari OLT ke ONT pelanggan menggunakan panjang gelombang downstream 1490 nm. Jika nilai daya yang terukur pada Optical Power Meter (OPM) di rumah pelanggan adalah -19.5 dBm, bagaimanakah status jaringan tersebut?',
    options: [
      'LOS (Loss of Signal) karena nilai minus',
      'Terlalu Kuat (Overload) dan bisa merusak ONT',
      'GOOD / Sangat Baik (Berada di rentang ideal -15 dBm s/d -24 dBm)',
      'WARNING / Buruk karena seharusnya bernilai positif (+19.5 dBm)'
    ],
    answer: 2,
    explanation: 'Standar daya terima (Rx Sensitivity) ONT GPON yang ideal berada pada rentang -8 dBm hingga -27 dBm (optimum di -15 s/d -24 dBm). Nilai -19.5 dBm sangat optimal.'
  },
  {
    q: 'Mengapa pembersihan cladding serat optik yang sudah dikupas WAJIB menggunakan Alkohol Isopropil (IPA) berkadar 99% dan diusap satu arah menggunakan tisu Kimwipes?',
    options: [
      'Agar serat optik menjadi lebih lentur saat ditekuk di ODP',
      'Karena alkohol 70% mengandung 30% air yang meninggalkan residu bercak saat dibakar busur api Splicer',
      'Untuk melapisi serat kaca agar tahan terhadap sengatan listrik',
      'Agar warna serat kaca berubah menjadi biru terang di kamera mikroskop'
    ],
    answer: 1,
    explanation: 'Alkohol medis biasa (70%) mengandung 30% air/mineral yang tidak menguap sempurna dan akan mendidih saat terkena busur listrik (Arc) Fusion Splicer, menyebabkan redaman tinggi.'
  },
  {
    q: 'Hitunglah Total Redaman (Link Loss) jika sebuah jalur optik sepanjang 4 km (redaman kabel 0.35 dB/km) memiliki 2 titik konektor SC (0.25 dB/konektor) dan 4 titik sambungan Fusion Splice (0.1 dB/splice)!',
    options: [
      '1.50 dB',
      '2.30 dB',
      '3.80 dB',
      '4.20 dB'
    ],
    answer: 1,
    explanation: 'Perhitungan: Redaman Kabel (4 km x 0.35 = 1.40 dB) + Konektor (2 x 0.25 = 0.50 dB) + Splice (4 x 0.1 = 0.40 dB). Total = 1.40 + 0.50 + 0.40 = 2.30 dB.'
  }
];

export default function App() {
  // Navigation & Global Gamification State
  const [activeTab, setActiveTab] = useState('mod1');
  const [xp, setXp] = useState(120);
  const [badges, setBadges] = useState(['Safety First Novice']);
  const [studentName, setStudentName] = useState('Siswa TJKT Unggulan');
  const [showResearchModal, setShowResearchModal] = useState(false);

  // Mentor Captain Ray State
  const [mentorMsg, setMentorMsg] = useState(
    'Halo Engineer Muda! Saya Kapten Ray. Sebelum menyentuh kabel serat optik dan laser, pastikan kamu melengkapi semua Ceklis APD K3 dan mempelajari fungsi alat di Meja Persiapan!'
  );
  const [mentorMood, setMentorMood] = useState('normal'); // normal, happy, warning

  // ==========================================
  // STATE MODUL 1: PERALATAN & K3
  // ==========================================
  const [selectedEquip, setSelectedEquip] = useState(EQUIPMENT_LIST[0]);
  const [inspectedEquipIds, setInspectedEquipIds] = useState(['dropcore']);
  const [k3Checked, setK3Checked] = useState({
    glasses: false,
    bin: false,
    laser_rule: false,
    mat: false
  });

  // ==========================================
  // STATE MODUL 2: STRIPPING, CLEANING & CLEAVING
  // ==========================================
  const [m2Step, setM2Step] = useState(0); // 0: Raw, 1: DropCore Stripped, 2: Coating Stripped, 3: Cleaned, 4: Cleaved
  const [alcoholWipes, setAlcoholWipes] = useState(0);
  const [cleaveLength, setCleaveLength] = useState(15); // Ideal: 12 - 16 mm
  const [cleaveAngle, setCleaveAngle] = useState(null);
  const [cleaveSuccess, setCleaveSuccess] = useState(false);

  // ==========================================
  // STATE MODUL 3: FUSION SPLICER SIMULATOR
  // ==========================================
  const [sleevePlaced, setSleevePlaced] = useState(false);
  const [fiberLoaded, setFiberLoaded] = useState(false);
  const [isAligned, setIsAligned] = useState(false);
  const [isSplicingArc, setIsSplicingArc] = useState(false);
  const [isSpliced, setIsSpliced] = useState(false);
  const [spliceLossVal, setSpliceLossVal] = useState(null);
  const [isHeating, setIsHeating] = useState(false);
  const [heatProgress, setHeatProgress] = useState(0);
  const [isHeated, setIsHeated] = useState(false);
  const [leftFiberOffset, setLeftFiberOffset] = useState(-28); // Misaligned initially
  const [rightFiberOffset, setRightFiberOffset] = useState(24);
  const [fiberGap, setFiberGap] = useState(36);

  // ==========================================
  // STATE MODUL 4: OPM, OLS, VFL & LINK LOSS BUDGET
  // ==========================================
  const [vflActive, setVflActive] = useState(false);
  const [vflMode, setVflMode] = useState('CW'); // CW or GLINT
  const [hasMacroBending, setHasMacroBending] = useState(true);
  const [opmLambda, setOpmLambda] = useState(1490);
  const [oltTxPower, setOltTxPower] = useState(3.5); // +3.5 dBm
  const [cableKm, setCableKm] = useState(3.2); // km
  const [numConnectors, setNumConnectors] = useState(4);
  const [numSplices, setNumSplices] = useState(6);
  const [splitterType, setSplitterType] = useState('1:16'); // 1:8 (10.5dB), 1:16 (13.8dB), 1:32 (17.2dB)

  // ==========================================
  // STATE MODUL 5: EVALUASI & SERTIFIKASI
  // ==========================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Helper to award XP and Badges safely
  const awardAchievement = (addXp, badgeName, rayMessage, mood = 'happy') => {
    setXp((prev) => prev + addXp);
    if (badgeName && !badges.includes(badgeName)) {
      setBadges((prev) => [...prev, badgeName]);
    }
    if (rayMessage) {
      setMentorMsg(rayMessage);
      setMentorMood(mood);
    }
  };

  // Heater Progress Effect in Module 3
  useEffect(() => {
    let interval = null;
    if (isHeating && heatProgress < 100) {
      interval = setInterval(() => {
        setHeatProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            setIsHeating(false);
            setIsHeated(true);
            awardAchievement(
              150,
              'Master Fusion Splicer',
              'SEMPURNA! Protection Sleeve telah menyusut rapat melindungi sambungan kaca. Sambungan memiliki loss 0.02 dB dan siap ditempatkan di kaset ODP!',
              'happy'
            );
            return 100;
          }
          return prev + 10;
        });
      }, 220);
    }
    return () => clearInterval(interval);
  }, [isHeating, heatProgress]);

  // ==========================================
  // HANDLERS MODUL 1 (K3 & ALAT)
  // ==========================================
  const handleSelectEquip = (item) => {
    setSelectedEquip(item);
    if (!inspectedEquipIds.includes(item.id)) {
      const updated = [...inspectedEquipIds, item.id];
      setInspectedEquipIds(updated);
      setXp((prev) => prev + 15);
      if (updated.length === EQUIPMENT_LIST.length) {
        awardAchievement(
          50,
          'Equipment Inspector',
          'Luar biasa! Kamu sudah menginspeksi seluruh peralatan standar industri FTTH. Pastikan semua APD K3 juga tercentang ya!',
          'happy'
        );
      }
    }
  };

  const toggleK3 = (id) => {
    const updated = { ...k3Checked, [id]: !k3Checked[id] };
    setK3Checked(updated);
    const allChecked = Object.values(updated).every(Boolean);
    if (allChecked) {
      awardAchievement(
        100,
        'K3 Safety Champion',
        'APD K3 Lengkap 100%! Kacamata safety terpasang dan Fiber Bin siap. Sekarang kamu diizinkan masuk ke Modul 2: Stripping & Cleaving!',
        'happy'
      );
    }
  };

  const isK3Complete = Object.values(k3Checked).every(Boolean);

  // ==========================================
  // HANDLERS MODUL 2 (STRIPPING & CLEAVING)
  // ==========================================
  const handleStripDropCore = () => {
    if (m2Step !== 0) return;
    setM2Step(1);
    awardAchievement(
      40,
      null,
      'Bagus! Kawat seling (messenger) telah dipisah dan jaket hitam LSZH terkupas. Sekarang terlihat lapisan Coating putih 250 mikron. Gunakan Miller Stripper!',
      'normal'
    );
  };

  const handleStripCoating = () => {
    if (m2Step !== 1) return;
    setM2Step(2);
    awardAchievement(
      50,
      null,
      'Presisi sekali! Lapisan Coating plastik 250 µm terkupas bersih menyisakan Cladding kaca 125 µm. Sekarang bersihkan dengan Alkohol 99% minimal 3 kali usapan satu arah!',
      'normal'
    );
  };

  const handleWipeAlcohol = () => {
    if (m2Step !== 2 && m2Step !== 3) return;
    const nextWipes = alcoholWipes + 1;
    setAlcoholWipes(nextWipes);
    if (nextWipes >= 3) {
      setM2Step(3);
      awardAchievement(
        40,
        null,
        'Bunyi "Squeak" terdengar! Cladding kaca sudah bebas dari debu dan sisa residu coating. Sekarang atur panjang potong (12-16 mm) pada Fiber Cleaver lalu tekan pisau!',
        'happy'
      );
    } else {
      setMentorMsg(`Usapan satu arah ke-${nextWipes} selesai. Lakukan ${3 - nextWipes} usapan lagi agar kemurnian kaca mencapai 100%!`);
    }
  };

  const handleExecuteCleave = () => {
    if (m2Step < 3) return;
    // Check if cleave length is within optimal range (12 to 16 mm)
    const isLengthOptimal = cleaveLength >= 12 && cleaveLength <= 16;
    const generatedAngle = isLengthOptimal
      ? Number((Math.random() * 0.35 + 0.12).toFixed(2)) // 0.12° - 0.47°
      : Number((Math.random() * 1.8 + 1.4).toFixed(2)); // 1.40° - 3.20° (Bad angle)

    setCleaveAngle(generatedAngle);
    setM2Step(4);

    if (generatedAngle < 1.0) {
      setCleaveSuccess(true);
      awardAchievement(
        100,
        'Cleaving Precision Pro',
        `POTONGAN SEMPURNA! Sudut potong terdeteksi ${generatedAngle}° (< 1.0°) dengan panjang ${cleaveLength} mm. Ujung fiber rata seperti cermin dan siap dimasukkan ke Fusion Splicer (Modul 3)!`,
        'happy'
      );
    } else {
      setCleaveSuccess(false);
      setMentorMood('warning');
      setMentorMsg(
        `PERINGATAN! Panjang potong ${cleaveLength} mm tidak sesuai standar holder (ideal 12-16 mm), menyebabkan pisau miring ${generatedAngle}° (Lip/Chipped). Atur panjang ke 12-16 mm lalu potong ulang!`
      );
    }
  };

  const handleResetM2 = () => {
    setM2Step(0);
    setAlcoholWipes(0);
    setCleaveAngle(null);
    setCleaveSuccess(false);
    setMentorMood('normal');
    setMentorMsg('Meja kerja di-reset. Ambil kabel Drop Core baru dan mulai dari langkah pengupasan jaket luar!');
  };

  // ==========================================
  // HANDLERS MODUL 3 (FUSION SPLICER)
  // ==========================================
  const handlePlaceSleeve = () => {
    setSleevePlaced(true);
    setMentorMsg('Protection Sleeve (selongsong pelindung dengan kawat stainless di dalamnya) sudah dimasukkan ke salah satu sisi kabel sebelum disambung. Langkah krusial agar tidak lupa!');
  };

  const handleLoadFiberVGroove = () => {
    if (!sleevePlaced) {
      setMentorMood('warning');
      setMentorMsg('Eits! Jangan lupa pasang Protection Sleeve terlebih dahulu sebelum meletakkan serat ke V-Groove!Kalau sudah di-splice, sleeve tidak akan bisa masuk.');
      return;
    }
    setFiberLoaded(true);
    setLeftFiberOffset(-25);
    setRightFiberOffset(22);
    setFiberGap(34);
    setMentorMood('normal');
    setMentorMsg('Kedua ujung serat optik telah dikunci pada holder V-Groove. Perhatikan layar mikroskop X dan Y, posisi serat masih belum sejajar. Tekan tombol [SET / ALIGN]!');
  };

  const handleAlignMotors = () => {
    if (!fiberLoaded) return;
    setLeftFiberOffset(0);
    setRightFiberOffset(0);
    setFiberGap(6);
    setIsAligned(true);
    awardAchievement(
      40,
      null,
      'Motor PAS (Profile Alignment System) selesai menyejajarkan inti Core Kiri dan Kanan pada sumbu X dan Y. Sudut terdeteksi 0.3°. Sekarang tekan tombol [ARC / SPLICE]!',
      'normal'
    );
  };

  const handleArcSplice = () => {
    if (!isAligned || isSpliced) return;
    setIsSplicingArc(true);
    setMentorMsg('PROSES ARC DISCHARGE... Tegangan tinggi meleburkan kedua ujung kaca silika pada suhu 2000°C!');

    setTimeout(() => {
      setIsSplicingArc(false);
      setIsSpliced(true);
      setFiberGap(0);
      setSpliceLossVal('0.02');
      awardAchievement(
        80,
        null,
        'SPLICE BERHASIL! Estimasi redaman sambungan hanya 0.02 dB (Jauh di bawah batas maksimal 0.05 dB). Terakhir, geser Protection Sleeve dan tekan [HEAT SLEEVE]!',
        'happy'
      );
    }, 1800);
  };

  const handleStartHeater = () => {
    if (!isSpliced || isHeated || isHeating) return;
    setIsHeating(true);
    setHeatProgress(10);
    setMentorMsg('Memanaskan tabung Protection Sleeve pada oven Heater bersuhu 220°C...');
  };

  const handleResetSplicer = () => {
    setSleevePlaced(false);
    setFiberLoaded(false);
    setIsAligned(false);
    setIsSplicingArc(false);
    setIsSpliced(false);
    setSpliceLossVal(null);
    setIsHeating(false);
    setHeatProgress(0);
    setIsHeated(false);
    setLeftFiberOffset(-28);
    setRightFiberOffset(24);
    setFiberGap(36);
    setMentorMsg('Mesin Fusion Splicer siap untuk simulasi penyambungan baru.');
  };

  // ==========================================
  // PERHITUNGAN MODUL 4 (OPM & LINK LOSS BUDGET)
  // ==========================================
  const attenuationPerKm = opmLambda === 1310 ? 0.35 : opmLambda === 1490 ? 0.25 : 0.22;
  const splitterLossMap = { '1:8': 10.5, '1:16': 13.8, '1:32': 17.2 };
  const cableLoss = Number((cableKm * attenuationPerKm).toFixed(2));
  const connectorLoss = Number((numConnectors * 0.25).toFixed(2));
  const spliceLossTotal = Number((numSplices * 0.1).toFixed(2));
  const passiveSplitterLoss = splitterLossMap[splitterType];
  const macroBendingPenalty = hasMacroBending ? 11.5 : 0.0; // 11.5 dB leak if bent!

  const totalLinkLoss = Number(
    (cableLoss + connectorLoss + spliceLossTotal + passiveSplitterLoss + macroBendingPenalty).toFixed(2)
  );
  const rxPowerDbm = Number((oltTxPower - totalLinkLoss).toFixed(2));
  const rxPowerMw = Math.pow(10, rxPowerDbm / 10).toFixed(5);

  const getSignalStatus = () => {
    if (rxPowerDbm >= -24 && rxPowerDbm <= -8) {
      return { label: 'GOOD (OPTIMAL)', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/50' };
    }
    if (rxPowerDbm < -24 && rxPowerDbm >= -27.5) {
      return { label: 'WARNING (MARGINAL)', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/50' };
    }
    return { label: 'LOS / CRITICAL FAIL', color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-500/50' };
  };

  const handleFixMacroBending = () => {
    setHasMacroBending(false);
    awardAchievement(
      100,
      'Optical Troubleshooter',
      'Keren! Dengan bantuan sinar merah VFL 650nm, kamu menemukan kebocoran cahaya akibat lekukan tajam (Macro-Bending) di dekat ODP dan meluruskannya. Redaman langsung turun drastis 11.5 dB!',
      'happy'
    );
  };

  // ==========================================
  // HANDLERS MODUL 5 (QUIZ)
  // ==========================================
  const calculateQuizScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((item, idx) => {
      if (quizAnswers[idx] === item.answer) correct += 1;
    });
    return Math.round((correct / QUIZ_QUESTIONS.length) * 100);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const score = calculateQuizScore();
    if (score >= 80) {
      awardAchievement(
        200,
        'Certified FTTH Specialist',
        `SELAMAT! Kamu lulus Ujian Sertifikasi Kompetensi SMK dengan nilai ${score}/100! Sertifikat Digital Kompetensi FTTH siap diunduh/dicetak.`,
        'happy'
      );
    } else {
      setMentorMood('warning');
      setMentorMsg(`Skor kamu ${score}/100. Pelajari pembahasan di bawah setiap soal dan coba lagi agar mencapai nilai kelulusan minimal 80!`);
    }
  };

  // Render SVG Illustration for Equipment in Module 1
  const renderEquipmentSvg = (type) => {
    switch (type) {
      case 'cable':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-40">
            <defs>
              <linearGradient id="jacketGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="50%" stopColor="#111827" />
                <stop offset="100%" stopColor="#1f2937" />
              </linearGradient>
            </defs>
            {/* Messenger Wire */}
            <rect x="20" y="28" width="130" height="16" rx="4" fill="#9CA3AF" />
            <line x1="150" y1="36" x2="220" y2="36" stroke="#D1D5DB" strokeWidth="6" strokeDasharray="6 3" />
            <text x="155" y="25" fill="#9CA3AF" fontSize="10">Kawat Seling Baja</text>
            {/* Outer Black Jacket */}
            <rect x="20" y="48" width="130" height="52" rx="6" fill="url(#jacketGrad)" stroke="#4B5563" />
            <text x="35" y="78" fill="#E5E7EB" fontSize="11" fontWeight="bold">DROP CORE 1C</text>
            {/* FRP Strength Members */}
            <line x1="150" y1="58" x2="195" y2="58" stroke="#F59E0B" strokeWidth="4" />
            <line x1="150" y1="90" x2="195" y2="90" stroke="#F59E0B" strokeWidth="4" />
            {/* 250um Coating */}
            <rect x="150" y="69" width="75" height="10" fill="#38BDF8" />
            <text x="165" y="112" fill="#38BDF8" fontSize="10">Coating 250µm</text>
            {/* 125um Cladding & Glowing Core */}
            <line x1="225" y1="74" x2="295" y2="74" stroke="#E0F2FE" strokeWidth="4" />
            <circle cx="295" cy="74" r="6" fill="#00F5D4" className="animate-pulse" />
            <text x="230" y="60" fill="#00F5D4" fontSize="10" fontWeight="bold">Cladding 125µm & Core 9µm</text>
          </svg>
        );
      case 'stripper_dc':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-40">
            {/* Green Handles */}
            <path d="M40 40 L160 55 L160 70 L40 60 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
            <path d="M40 100 L160 85 L160 70 L40 80 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
            {/* Metallic Head */}
            <rect x="155" y="35" width="95" height="70" rx="8" fill="#374151" stroke="#9CA3AF" strokeWidth="2" />
            <rect x="180" y="55" width="50" height="30" rx="4" fill="#1F2937" stroke="#00F5D4" strokeWidth="1.5" />
            <circle cx="170" cy="70" r="6" fill="#F59E0B" />
            <text x="168" y="26" fill="#10B981" fontSize="11" fontWeight="bold">Lubang Kabel 3.1 x 2.0 mm</text>
          </svg>
        );
      case 'miller':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-40">
            {/* Yellow Ergonomic Handles */}
            <path d="M35 30 Q100 45 165 58 L165 70 Q100 62 35 52 Z" fill="#F59E0B" />
            <path d="M35 110 Q100 95 165 82 L165 70 Q100 78 35 88 Z" fill="#F59E0B" />
            {/* Steel Blades with 3 precision holes */}
            <path d="M165 52 L265 42 L265 68 L165 70 Z" fill="#6B7280" stroke="#D1D5DB" />
            <path d="M165 88 L265 98 L265 72 L165 70 Z" fill="#4B5563" stroke="#D1D5DB" />
            <circle cx="180" cy="70" r="8" fill="#111827" stroke="#F59E0B" strokeWidth="2" />
            {/* 3 Micro Holes */}
            <circle cx="210" cy="70" r="4" fill="#00F5D4" />
            <circle cx="230" cy="70" r="3" fill="#00F5D4" />
            <circle cx="248" cy="70" r="2" fill="#00F5D4" />
            <text x="185" y="30" fill="#FBBF24" fontSize="10" fontWeight="bold">3 Lubang Presisi (3mm / 900µm / 250µm)</text>
          </svg>
        );
      case 'cleaver':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-40">
            {/* Base Body */}
            <rect x="85" y="45" width="150" height="75" rx="8" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
            {/* Upper Clamp Lever */}
            <path d="M90 45 L215 20 L225 35 L95 55 Z" fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" />
            {/* Rotary Diamond Blade */}
            <circle cx="160" cy="80" r="22" fill="#374151" stroke="#F59E0B" strokeWidth="3" />
            <circle cx="160" cy="80" r="6" fill="#00F5D4" />
            {/* Ruler Scale */}
            <rect x="100" y="65" width="45" height="14" fill="#111827" stroke="#9CA3AF" />
            <text x="104" y="75" fill="#00F5D4" fontSize="8">10 15 20</text>
            {/* Slider Push */}
            <rect x="65" y="72" width="20" height="22" rx="3" fill="#EF4444" />
            <text x="105" y="134" fill="#93C5FD" fontSize="10" fontWeight="bold">Pisau Berlian Rotasi 16 Posisi</text>
          </svg>
        );
      case 'vfl':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-40">
            {/* Pen Body */}
            <rect x="40" y="52" width="160" height="36" rx="6" fill="#1F2937" stroke="#EF4444" strokeWidth="2" />
            <rect x="110" y="58" width="24" height="12" rx="3" fill="#EF4444" />
            <text x="55" y="75" fill="#F9FAFB" fontSize="11" fontWeight="bold">VFL 650nm</text>
            {/* Tip */}
            <polygon points="200,56 225,63 225,77 200,84" fill="#9CA3AF" />
            {/* Red Laser Beam */}
            <polygon points="225,68 310,35 310,105 225,72" fill="rgba(239, 68, 68, 0.35)" className="animate-pulse" />
            <line x1="225" y1="70" x2="310" y2="70" stroke="#EF4444" strokeWidth="4" />
            <circle cx="225" cy="70" r="6" fill="#EF4444" className="animate-ping" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 320 140" className="w-full h-40">
            <rect x="80" y="20" width="160" height="100" rx="12" fill="#1F2937" stroke="#00F5D4" strokeWidth="2" />
            <rect x="100" y="35" width="120" height="50" rx="6" fill="#0B0F19" stroke="#374151" />
            <text x="115" y="65" fill="#00F5D4" fontSize="14" fontFamily="monospace" fontWeight="bold">-18.42 dBm</text>
            <circle cx="125" cy="102" r="8" fill="#F59E0B" />
            <circle cx="160" cy="102" r="8" fill="#10B981" />
            <circle cx="195" cy="102" r="8" fill="#EF4444" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 pb-12">
      {/* ========================================== */}
      {/* TOP HIGH-TECH HEADER & TELEMETRY BAR       */}
      {/* ========================================== */}
      <header className="sticky top-0 z-40 border-b border-cyan-500/30 bg-[#0B0F19]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#00F5D4] animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-extrabold tracking-wider bg-gradient-to-r from-[#00F5D4] via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                  OPTICLAB PRO
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300">
                  v4.2 SMK TJKT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Virtual Fiber Optic & FTTH Splicing Simulator (Standar Labster & PhET)
              </p>
            </div>
          </div>

          {/* Right Gamification & Research Guide Button */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* K3 Status Pill */}
            <div
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
                isK3Complete
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>APD K3: {isK3Complete ? 'AMAN (100%)' : 'BELUM LENGKAP'}</span>
            </div>

            {/* XP Counter */}
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-slate-300">XP:</span>
              <span className="text-sm font-extrabold font-mono text-[#00F5D4]">{xp}</span>
            </div>

            {/* Badges Count */}
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/30 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-amber-300">{badges.length} Badge</span>
            </div>

            {/* Guide & Free Production Tools Modal Button */}
            <button
              onClick={() => setShowResearchModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Riset & Tools Produksi Gratis</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 pt-1 flex overflow-x-auto no-scrollbar gap-2 border-t border-slate-800/80">
          {[
            { id: 'mod1', label: '1. Meja Alat & K3', icon: Shield },
            { id: 'mod2', label: '2. Stripping & Cleaving', icon: Scissors },
            { id: 'mod3', label: '3. Mesin Fusion Splicer', icon: Zap },
            { id: 'mod4', label: '4. Ukur OPM, VFL & Loss', icon: Activity },
            { id: 'mod5', label: '5. Sertifikasi SMK', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
                  active
                    ? 'border-[#00F5D4] text-[#00F5D4] bg-cyan-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#00F5D4]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ========================================== */}
      {/* AI MENTOR CAPTAIN RAY INTERACTIVE BANNER   */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-4 mt-5">
        <div
          className={`rounded-2xl p-4 border backdrop-blur-md flex flex-col md:flex-row items-center gap-4 transition-all shadow-lg ${
            mentorMood === 'warning'
              ? 'bg-rose-950/30 border-rose-500/50 shadow-rose-500/10'
              : mentorMood === 'happy'
              ? 'bg-emerald-950/30 border-emerald-500/50 shadow-emerald-500/10'
              : 'bg-[#111827]/90 border-cyan-500/40 shadow-cyan-500/10'
          }`}
        >
          {/* Captain Ray SVG Avatar */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-[#00F5D4] flex items-center justify-center overflow-hidden shadow-md shadow-cyan-500/30">
              <svg viewBox="0 0 80 80" className="w-14 h-14">
                {/* Safety Helmet */}
                <path d="M16 34 C16 16, 64 16, 64 34 Z" fill="#F59E0B" />
                <rect x="12" y="32" width="56" height="5" rx="2.5" fill="#D97706" />
                <rect x="35" y="16" width="10" height="12" rx="2" fill="#FEF3C7" />
                {/* Face */}
                <rect x="22" y="37" width="36" height="28" rx="10" fill="#FDE68A" />
                {/* Sci-Fi Laser Safety Goggles */}
                <rect x="20" y="41" width="40" height="11" rx="4" fill="#0B0F19" stroke="#00F5D4" strokeWidth="2" />
                <line x1="25" y1="45" x2="36" y2="45" stroke="#00F5D4" strokeWidth="2" />
                <line x1="44" y1="45" x2="55" y2="45" stroke="#00F5D4" strokeWidth="2" />
                {/* Smile / Mic */}
                <path d="M33 58 Q40 63 47 58" stroke="#1F2937" strokeWidth="2.5" fill="none" />
                <line x1="22" y1="56" x2="32" y2="60" stroke="#10B981" strokeWidth="2" />
                <circle cx="33" cy="60" r="2.5" fill="#00F5D4" />
              </svg>
            </div>
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#00F5D4] text-slate-950 rounded">
              AI MENTOR
            </span>
          </div>

          {/* Instruction Bubble */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00F5D4]">
                Kapten Ray (Master Engineer FTTH)
              </span>
              <span className="text-[11px] text-slate-400">• Instruksi Langsung</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{mentorMsg}</p>
          </div>

          {/* Badges Showcase */}
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-end shrink-0 max-w-xs">
            {badges.map((b, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 border border-amber-400/40 text-amber-300 flex items-center gap-1"
              >
                <Award className="w-3 h-3 text-amber-400" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MAIN WORKBENCH CONTENT AREA                */}
      {/* ========================================== */}
      <main className="max-w-7xl mx-auto px-4 mt-6">
        {/* ============================================================ */}
        {/* MODUL 1: MEJA PERSIAPAN ALAT & K3 MASTERY                    */}
        {/* ============================================================ */}
        {activeTab === 'mod1' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive Equipment Gallery */}
            <div className="lg:col-span-7 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-amber-400" />
                    <span>Galeri Perlengkapan Standar FTTH</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Klik setiap alat untuk menginspeksi anatomi, spesifikasi, dan cara kerjanya ({inspectedEquipIds.length}/{EQUIPMENT_LIST.length} Diinspeksi)
                  </p>
                </div>
              </div>

              {/* Equipment Grid Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                {EQUIPMENT_LIST.map((item) => {
                  const isSelected = selectedEquip.id === item.id;
                  const isInspected = inspectedEquipIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectEquip(item)}
                      className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/15 border-[#00F5D4] shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase">{item.category.split(' ')[0]}</span>
                        {isInspected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-xs font-bold text-slate-100 line-clamp-2">{item.name}</p>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Equipment Showcase Card */}
              <div className="rounded-2xl bg-[#0B0F19] border border-cyan-500/30 p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-center">
                    {renderEquipmentSvg(selectedEquip.svgType)}
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {selectedEquip.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">{selectedEquip.name}</h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{selectedEquip.desc}</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-[11px] font-mono text-cyan-400 uppercase">Spesifikasi Teknis:</p>
                      {selectedEquip.specs.map((s, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: K3 Safety Simulation Checklist */}
            <div className="lg:col-span-5 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#00F5D4]" />
                    <span>Simulasi Ceklis APD K3 Optik</span>
                  </h2>
                  <span className="text-xs font-mono text-amber-400">WAJIB 100%</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Pecahan serat optik berdiameter 125 mikron (seukuran rambut) bening seperti kaca. Jika masuk ke aliran darah atau mata sangat berbahaya. Aktifkan seluruh protokol K3 di bawah ini:
                </p>

                <div className="space-y-3">
                  {K3_ITEMS.map((item) => {
                    const checked = k3Checked[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleK3(item.id)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                          checked
                            ? 'bg-emerald-950/30 border-emerald-500/50'
                            : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                            checked
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'bg-slate-800 border-slate-600 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white">{item.title}</h4>
                          <p className="text-[11px] text-slate-300 mt-0.5">{item.desc}</p>
                          <p className="text-[10px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            <span>{item.warning}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Status Kesiapan Lab:{' '}
                  <span className={isK3Complete ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {isK3Complete ? 'SIAP PRAKTIK' : 'BELUM LENGKAP'}
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('mod2')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F5D4] to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition cursor-pointer"
                >
                  <span>Lanjut ke Modul 2</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODUL 2: SIMULASI STRIPPING, CLEANING & CLEAVING             */}
        {/* ============================================================ */}
        {activeTab === 'mod2' && (
          <div className="space-y-6">
            {/* Step Progress Indicator */}
            <div className="bg-[#111827]/90 border border-slate-800 rounded-2xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { step: 1, title: 'Step 1: Kupas Drop Core', sub: 'Drop Core Stripper' },
                  { step: 2, title: 'Step 2: Kupas Coating 250µm', sub: 'Miller Stripper' },
                  { step: 3, title: 'Step 3: Cleaning Alkohol 99%', sub: `Kimwipes (${alcoholWipes}/3 Usap)` },
                  { step: 4, title: 'Step 4: High-Precision Cleaving', sub: 'Sudut Target < 1.0°' }
                ].map((s) => {
                  const done = m2Step >= s.step;
                  const current = m2Step + 1 === s.step;
                  return (
                    <div
                      key={s.step}
                      className={`p-3 rounded-xl border flex items-center gap-3 ${
                        done
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : current
                          ? 'bg-cyan-500/15 border-[#00F5D4] text-cyan-200 animate-pulse'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                          done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {done ? <Check className="w-4 h-4 stroke-[3]" /> : s.step}
                      </div>
                      <div>
                        <p className="text-xs font-bold">{s.title}</p>
                        <p className="text-[10px] opacity-80">{s.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Fiber Workbench Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Scissors className="w-5 h-5 text-[#00F5D4]" />
                      <span>Meja Kerja Preparasi Serat Optik (Interactive Fiber Workbench)</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Amati perubahan lapisan anatomi kabel secara langsung saat dikupas, dibersihkan, dan dipotong.
                    </p>
                  </div>
                  <button
                    onClick={handleResetM2}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Kabel Baru</span>
                  </button>
                </div>

                {/* SVG Live Fiber Anatomy Visualizer */}
                <div className="bg-[#0B0F19] border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span>STATUS KABEL: {
                      m2Step === 0 ? 'UTUH (BELUM DIKUPAS)' :
                      m2Step === 1 ? 'JAKET LUAR TERKUPAS (COATING 250µm TERLIHAT)' :
                      m2Step === 2 ? 'COATING TERKUPAS (CLADDING 125µm KOTOR)' :
                      m2Step === 3 ? 'CLADDING 125µm BERSIH MURNI' :
                      'CLEAVED (DIPOTONG PRESISI)'
                    }</span>
                    <span className="text-[#00F5D4]">SKALA MIKROSKOPIS</span>
                  </div>

                  <svg viewBox="0 0 650 210" className="w-full h-52">
                    {/* Grid Lines */}
                    <g stroke="#1E293B" strokeWidth="1">
                      <line x1="0" y1="40" x2="650" y2="40" />
                      <line x1="0" y1="105" x2="650" y2="105" />
                      <line x1="0" y1="170" x2="650" y2="170" />
                      <line x1="220" y1="0" x2="220" y2="210" />
                      <line x1="420" y1="0" x2="420" y2="210" />
                    </g>

                    {/* Base Cladding 125um & Core 9um (Always inside) */}
                    <rect
                      x="40"
                      y="97"
                      width={m2Step === 4 ? 320 + cleaveLength * 8 : 530}
                      height="16"
                      fill="#E0F2FE"
                    />
                    {/* Glowing 9um Core line */}
                    <line
                      x1="40"
                      y1="105"
                      x2={m2Step === 4 ? 360 + cleaveLength * 8 : 570}
                      y2="105"
                      stroke="#00F5D4"
                      strokeWidth="4"
                    />

                    {/* Dirt specks on Cladding when m2Step === 2 (before alcohol cleaning) */}
                    {m2Step === 2 && alcoholWipes < 3 && (
                      <g fill="#F59E0B">
                        <circle cx="380" cy="100" r="3" />
                        <circle cx="415" cy="109" r="3.5" />
                        <circle cx="460" cy="102" r="2.5" />
                        <circle cx="495" cy="108" r="3" />
                        <text x="380" y="82" fill="#F59E0B" fontSize="11" fontWeight="bold">
                          Residu Coating & Debu Mikro ({3 - alcoholWipes}x usap lagi)
                        </text>
                      </g>
                    )}

                    {/* Sparkles when cleaned (m2Step >= 3) */}
                    {m2Step >= 3 && (
                      <g fill="#00F5D4">
                        <circle cx="410" cy="88" r="2.5" className="animate-ping" />
                        <circle cx="470" cy="122" r="2.5" className="animate-ping" />
                        <text x="370" y="80" fill="#00F5D4" fontSize="11" fontWeight="bold">
                          Cladding Silika 125µm Murni (Bebas Residu)
                        </text>
                      </g>
                    )}

                    {/* 250um Primary Coating Layer (Stripped back at Step 2) */}
                    <rect
                      x="40"
                      y="87"
                      width={m2Step >= 2 ? 310 : 530}
                      height="36"
                      rx="3"
                      fill="#0284C7"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                    />
                    <text x="235" y="109" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                      Coating 250 µm
                    </text>

                    {/* Outer Black LSZH Drop Core Jacket + Messenger Wire (Stripped back at Step 1) */}
                    <rect
                      x="20"
                      y="42"
                      width={m2Step >= 1 ? 190 : 555}
                      height="22"
                      rx="4"
                      fill="#6B7280"
                      stroke="#9CA3AF"
                    />
                    <text x="35" y="57" fill="#F3F4F6" fontSize="10" fontWeight="bold">
                      Kawat Seling (Messenger Wire)
                    </text>

                    <rect
                      x="20"
                      y="68"
                      width={m2Step >= 1 ? 190 : 555}
                      height="74"
                      rx="6"
                      fill="#1F2937"
                      stroke="#4B5563"
                      strokeWidth="2"
                    />
                    <text x="35" y="110" fill="#F9FAFB" fontSize="13" fontWeight="bold">
                      JAKET DROP CORE LSZH
                    </text>

                    {/* Measurement Ruler for Cleaving */}
                    {m2Step >= 3 && (
                      <g>
                        <line x1="350" y1="155" x2={360 + cleaveLength * 8} y2="155" stroke="#F59E0B" strokeWidth="2" />
                        <line x1="350" y1="148" x2="350" y2="162" stroke="#F59E0B" strokeWidth="2" />
                        <line
                          x1={360 + cleaveLength * 8}
                          y1="148"
                          x2={360 + cleaveLength * 8}
                          y2="162"
                          stroke="#F59E0B"
                          strokeWidth="2"
                        />
                        <text x="385" y="172" fill="#FBBF24" fontSize="12" fontWeight="bold">
                          Panjang Cleave: {cleaveLength} mm
                        </text>
                      </g>
                    )}
                  </svg>
                </div>

                {/* Action Workbench Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <button
                    onClick={handleStripDropCore}
                    disabled={m2Step !== 0}
                    className={`p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      m2Step === 0
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 hover:bg-emerald-500/30 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      1. Gunakan Drop Core Stripper (Kupas Jaket)
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleStripCoating}
                    disabled={m2Step !== 1}
                    className={`p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      m2Step === 1
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 hover:bg-amber-500/30 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Scissors className="w-4 h-4" />
                      2. Gunakan Miller Stripper (250µm ke 125µm)
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleWipeAlcohol}
                    disabled={m2Step !== 2}
                    className={`p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      m2Step === 2
                        ? 'bg-cyan-500/20 border-[#00F5D4] text-cyan-200 hover:bg-cyan-500/30 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      3. Usap Tisu Alkohol 99% ({alcoholWipes}/3 Usapan)
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleExecuteCleave}
                    disabled={m2Step < 3}
                    className={`p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      m2Step >= 3
                        ? 'bg-gradient-to-r from-[#00F5D4] to-blue-500 text-slate-950 border-transparent shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Crosshair className="w-4 h-4" />
                      4. Tekan Pisau Fiber Cleaver ({cleaveLength} mm)
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Cleaver Length Calibration & Microscope Inspection */}
              <div className="lg:col-span-4 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                    <Sliders className="w-5 h-5 text-amber-400" />
                    <span>Kalibrasi Cleaver & Mikroskop</span>
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Atur panjang kupasan cladding pada mistar Fiber Cleaver (Standar Holder Splicer: <strong>12 mm - 16 mm</strong>).
                  </p>

                  {/* Length Slider */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-4">
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-slate-300">Panjang Potong (Cleave Length):</span>
                      <span
                        className={`font-bold ${
                          cleaveLength >= 12 && cleaveLength <= 16 ? 'text-[#00F5D4]' : 'text-rose-400'
                        }`}
                      >
                        {cleaveLength} mm {cleaveLength >= 12 && cleaveLength <= 16 ? '(IDEAL)' : '(TIDAK STANDAR)'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="22"
                      value={cleaveLength}
                      onChange={(e) => setCleaveLength(Number(e.target.value))}
                      className="w-full accent-[#00F5D4] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>6 mm (Pendek)</span>
                      <span className="text-emerald-400">12 - 16 mm (Standar)</span>
                      <span>22 mm (Panjang)</span>
                    </div>
                  </div>

                  {/* Digital Microscope Cleave Angle Inspection */}
                  <div className="rounded-xl bg-[#0B0F19] border border-cyan-500/30 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-cyan-400 uppercase flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        Inspeksi Ujung Fiber (End-Face)
                      </span>
                      {cleaveAngle !== null && (
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                            cleaveSuccess ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          Sudut: {cleaveAngle}°
                        </span>
                      )}
                    </div>

                    <svg viewBox="0 0 240 120" className="w-full h-28 bg-slate-950 rounded-lg border border-slate-800">
                      {/* Crosshair */}
                      <line x1="120" y1="0" x2="120" y2="120" stroke="#00F5D4" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="60" x2="240" y2="60" stroke="#00F5D4" strokeWidth="1" strokeDasharray="3 3" />
                      {m2Step === 4 ? (
                        cleaveSuccess ? (
                          /* Flat 90-degree Clean Cleave */
                          <polygon
                            points="20,38 120,38 120,82 20,82"
                            fill="rgba(0, 245, 212, 0.35)"
                            stroke="#00F5D4"
                            strokeWidth="2"
                          />
                        ) : (
                          /* Jagged / Angled Bad Cleave */
                          <polygon
                            points="20,38 128,38 105,60 124,82 20,82"
                            fill="rgba(239, 68, 68, 0.35)"
                            stroke="#EF4444"
                            strokeWidth="2"
                          />
                        )
                      ) : (
                        <text x="42" y="64" fill="#64748B" fontSize="10" fontFamily="monospace">
                          MENUNGGU PROSES CLEAVING...
                        </text>
                      )}
                    </svg>

                    {cleaveAngle !== null && (
                      <p className={`text-xs mt-2 font-semibold ${cleaveSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {cleaveSuccess
                          ? `LULUS INSPEKSI! Sudut ${cleaveAngle}° (< 1.0°). Permukaan rata sempurna.`
                          : `GAGAL! Sudut ${cleaveAngle}° (> 1.0°). Ujung kaca pecah/miring, sesuaikan panjang ke 12-16mm!`}
                      </p>
                    )}
                  </div>
                </div>

                {cleaveSuccess && (
                  <button
                    onClick={() => setActiveTab('mod3')}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00F5D4] to-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <span>Masukkan ke Mesin Fusion Splicer (Modul 3)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODUL 3: MESIN FUSION SPLICER INTERAKTIF                     */}
        {/* ============================================================ */}
        {activeTab === 'mod3' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Realistic LCD Fusion Splicer Screen */}
            <div className="lg:col-span-8 bg-[#111827] border-2 border-amber-500/50 rounded-3xl p-5 shadow-2xl relative">
              {/* Top Industrial Casing Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-extrabold text-xs tracking-wider">
                    FUJIKURA / SUMITOMO PRO-90S
                  </span>
                  <span className="text-xs font-mono text-slate-400">CORE-TO-CORE PAS ALIGNMENT</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-emerald-400">MODE: SM G.657 AUTO</span>
                  <span className="text-cyan-400">ARC POWER: 100%</span>
                </div>
              </div>

              {/* Dual Microscope X / Y Screen */}
              <div className="bg-[#060A12] border-2 border-slate-700 rounded-2xl p-4 relative overflow-hidden">
                <div className="flex justify-between text-[11px] font-mono text-cyan-400 mb-2">
                  <span>CAM-X (HORIZONTAL AXIS) // 300x ZOOM</span>
                  <span>
                    {!fiberLoaded
                      ? 'STATUS: V-GROOVE KOSONG'
                      : isSplicingArc
                      ? 'STATUS: ELECTRIC ARC FUSION (2000°C)...'
                      : isSpliced
                      ? `ESTIMASI LOSS: ${spliceLossVal} dB [OK]`
                      : isAligned
                      ? 'STATUS: CORE ALIGNED (SIAP ARC)'
                      : 'STATUS: MISALIGNED (TEKAN SET)'}
                  </span>
                </div>

                {/* SVG Microscope X & Y Feed */}
                <svg viewBox="0 0 600 240" className="w-full h-60 rounded-xl bg-[#09131c]">
                  {/* Center Alignment Guide Lines */}
                  <line x1="300" y1="0" x2="300" y2="240" stroke="#00F5D4" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="65" x2="600" y2="65" stroke="#1E293B" strokeWidth="1" />
                  <line x1="0" y1="175" x2="600" y2="175" stroke="#1E293B" strokeWidth="1" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#334155" strokeWidth="2" />

                  <text x="12" y="22" fill="#00F5D4" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    X-CAMERA
                  </text>
                  <text x="12" y="142" fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    Y-CAMERA
                  </text>

                  {/* Top & Bottom Electrodes */}
                  <polygon points="290,0 310,0 303,24 297,24" fill="#94A3B8" />
                  <polygon points="290,240 310,240 303,216 297,216" fill="#94A3B8" />

                  {fiberLoaded && (
                    <>
                      {/* X-CAMERA LEFT FIBER */}
                      <g transform={`translate(0, ${leftFiberOffset * 0.4})`}>
                        <rect x="20" y="47" width={280 - fiberGap / 2} height="36" fill="rgba(56, 189, 248, 0.35)" stroke="#38BDF8" />
                        <line x1="20" y1="65" x2={300 - fiberGap / 2} y2="65" stroke="#00F5D4" strokeWidth="4" />
                      </g>

                      {/* X-CAMERA RIGHT FIBER */}
                      <g transform={`translate(0, ${rightFiberOffset * 0.4})`}>
                        <rect
                          x={300 + fiberGap / 2}
                          y="47"
                          width={280 - fiberGap / 2}
                          height="36"
                          fill="rgba(56, 189, 248, 0.35)"
                          stroke="#38BDF8"
                        />
                        <line x1={300 + fiberGap / 2} y1="65" x2="580" y2="65" stroke="#00F5D4" strokeWidth="4" />
                      </g>

                      {/* Y-CAMERA LEFT FIBER */}
                      <g transform={`translate(0, ${-leftFiberOffset * 0.35})`}>
                        <rect x="20" y="157" width={280 - fiberGap / 2} height="36" fill="rgba(56, 189, 248, 0.35)" stroke="#38BDF8" />
                        <line x1="20" y1="175" x2={300 - fiberGap / 2} y2="175" stroke="#00F5D4" strokeWidth="4" />
                      </g>

                      {/* Y-CAMERA RIGHT FIBER */}
                      <g transform={`translate(0, ${-rightFiberOffset * 0.35})`}>
                        <rect
                          x={300 + fiberGap / 2}
                          y="157"
                          width={280 - fiberGap / 2}
                          height="36"
                          fill="rgba(56, 189, 248, 0.35)"
                          stroke="#38BDF8"
                        />
                        <line x1={300 + fiberGap / 2} y1="175" x2="580" y2="175" stroke="#00F5D4" strokeWidth="4" />
                      </g>
                    </>
                  )}

                  {/* ELECTRIC ARC FLASH ANIMATION */}
                  {isSplicingArc && (
                    <g>
                      <ellipse cx="300" cy="120" rx="55" ry="110" fill="rgba(0, 245, 212, 0.35)" className="animate-ping" />
                      <path
                        d="M300 20 L288 70 L312 115 L290 165 L300 220"
                        stroke="#00F5D4"
                        strokeWidth="6"
                        fill="none"
                      />
                      <path
                        d="M300 20 L314 75 L286 125 L310 175 L300 220"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        fill="none"
                      />
                    </g>
                  )}

                  {/* SPLICE LOSS RESULT OVERLAY */}
                  {isSpliced && !isSplicingArc && (
                    <g>
                      <rect x="195" y="92" width="210" height="54" rx="10" fill="rgba(6, 78, 59, 0.92)" stroke="#10B981" strokeWidth="2" />
                      <text x="220" y="114" fill="#A7F3D0" fontSize="11" fontFamily="monospace">
                        ESTIMATED SPLICE LOSS:
                      </text>
                      <text x="248" y="136" fill="#00F5D4" fontSize="18" fontFamily="monospace" fontWeight="bold">
                        {spliceLossVal} dB
                      </text>
                    </g>
                  )}
                </svg>

                {/* Heater Progress Bar */}
                <div className="mt-3 bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Flame className={`w-4 h-4 ${isHeating ? 'text-rose-500 animate-bounce' : isHeated ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="font-mono text-slate-300">
                      TUBE HEATER (220°C): {isHeated ? 'SELESAI (DINGIN & RAPAT)' : isHeating ? `MEMANASKAN ${heatProgress}%` : 'STANDBY'}
                    </span>
                  </div>
                  <div className="w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-200"
                      style={{ width: `${heatProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Splicer Physical Push-Buttons Panel */}
            <div className="lg:col-span-4 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#00F5D4]" />
                    <span>Panel Kontrol Splicer</span>
                  </h3>
                  <button
                    onClick={handleResetSplicer}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Ikuti prosedur penyambungan serat optik secara berurutan seperti pada mesin Fusion Splicer asli di industri:
                </p>

                <div className="space-y-3">
                  {/* Step 1: Protection Sleeve */}
                  <button
                    onClick={handlePlaceSleeve}
                    disabled={sleevePlaced}
                    className={`w-full p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      sleevePlaced
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900 hover:bg-slate-800 border-cyan-500/40 text-white'
                    }`}
                  >
                    <span>1. Pasang Protection Sleeve (60mm)</span>
                    {sleevePlaced ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  {/* Step 2: Load Fiber to V-Groove */}
                  <button
                    onClick={handleLoadFiberVGroove}
                    disabled={!sleevePlaced || fiberLoaded}
                    className={`w-full p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      fiberLoaded
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : sleevePlaced
                        ? 'bg-slate-900 hover:bg-slate-800 border-cyan-500/40 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>2. Letakkan Serat Kiri & Kanan di V-Groove</span>
                    {fiberLoaded ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  {/* Step 3: SET / ALIGN Motor */}
                  <button
                    onClick={handleAlignMotors}
                    disabled={!fiberLoaded || isAligned}
                    className={`w-full p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      isAligned
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : fiberLoaded
                        ? 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400 text-amber-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>3. Tekan Tombol [SET / ALIGN CORE]</span>
                    {isAligned ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Crosshair className="w-4 h-4" />}
                  </button>

                  {/* Step 4: ARC / SPLICE */}
                  <button
                    onClick={handleArcSplice}
                    disabled={!isAligned || isSpliced || isSplicingArc}
                    className={`w-full p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      isSpliced
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : isAligned
                        ? 'bg-gradient-to-r from-[#00F5D4] to-cyan-500 text-slate-950 border-transparent shadow-lg shadow-cyan-500/30'
                        : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>4. Tekan Tombol [ARC / FUSION SPLICE]</span>
                    <Zap className="w-4 h-4" />
                  </button>

                  {/* Step 5: HEAT SLEEVE */}
                  <button
                    onClick={handleStartHeater}
                    disabled={!isSpliced || isHeated || isHeating}
                    className={`w-full p-3.5 rounded-xl font-bold text-xs flex items-center justify-between border transition cursor-pointer ${
                      isHeated
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : isSpliced
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 border-transparent shadow-lg shadow-rose-500/30'
                        : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>5. Geser Sleeve & Tekan [HEAT OVEN]</span>
                    <Flame className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isHeated && (
                <button
                  onClick={() => setActiveTab('mod4')}
                  className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00F5D4] to-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <span>Uji Redaman Jaringan di Modul 4 (OPM & VFL)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODUL 4: PENGUKURAN REDAMAN (OPM, OLS, VFL & LOSS BUDGET)    */}
        {/* ============================================================ */}
        {activeTab === 'mod4' && (
          <div className="space-y-6">
            {/* Interactive FTTH Topology & VFL Laser Fault Finder */}
            <div className="bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Radio className="w-5 h-5 text-rose-400" />
                    <span>Topologi Jaringan FTTH & Deteksi Bending dengan VFL (Laser Merah 650nm)</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Nyalakan VFL untuk menembakkan laser merah 650nm. Jika ada kebocoran cahaya merah (Macro-Bending), klik titik kabel yang tertekuk untuk memperbaikinya!
                  </p>
                </div>

                {/* VFL Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVflActive(!vflActive)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 border transition cursor-pointer ${
                      vflActive
                        ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-500/40'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-rose-500/50'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>{vflActive ? 'VFL LASER: ON (650nm)' : 'NYALAKAN VFL (650nm)'}</span>
                  </button>
                  {vflActive && (
                    <button
                      onClick={() => setVflMode(vflMode === 'CW' ? 'GLINT' : 'CW')}
                      className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-amber-300 cursor-pointer"
                    >
                      MODE: {vflMode}
                    </button>
                  )}
                </div>
              </div>

              {/* SVG FTTH Topology Diagram (OLT -> ODC -> ODP -> ONT/OPM) */}
              <div className="bg-[#0B0F19] border border-cyan-500/30 rounded-2xl p-4 overflow-x-auto">
                <svg viewBox="0 0 800 185" className="w-full min-w-[640px] h-44">
                  {/* Fiber Path Line */}
                  <path
                    d={
                      hasMacroBending
                        ? 'M 110 90 L 290 90 L 420 90 C 445 90, 435 25, 465 25 C 495 25, 480 145, 515 90 L 680 90'
                        : 'M 110 90 L 680 90'
                    }
                    fill="none"
                    stroke={vflActive ? '#EF4444' : '#00F5D4'}
                    strokeWidth="5"
                    className={vflActive && vflMode === 'GLINT' ? 'animate-pulse' : ''}
                  />

                  {/* Macro-Bending Red Laser Leak Alert */}
                  {hasMacroBending && (
                    <g onClick={handleFixMacroBending} className="cursor-pointer">
                      <circle
                        cx="468"
                        cy="45"
                        r={vflActive ? '28' : '16'}
                        fill={vflActive ? 'rgba(239, 68, 68, 0.45)' : 'rgba(245, 158, 11, 0.2)'}
                        className="animate-ping"
                      />
                      <circle cx="468" cy="45" r="14" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                      <text x="463" y="50" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                        !
                      </text>
                      <rect x="385" y="135" width="180" height="32" rx="6" fill="#7F1D1D" stroke="#EF4444" />
                      <text x="397" y="155" fill="#FECACA" fontSize="11" fontWeight="bold">
                        KLIK: Luruskan Macro-Bending!
                      </text>
                    </g>
                  )}

                  {/* Node 1: OLT / OLS Server */}
                  <g>
                    <rect x="20" y="52" width="95" height="76" rx="10" fill="#1E293B" stroke="#00F5D4" strokeWidth="2" />
                    <text x="34" y="82" fill="#00F5D4" fontSize="12" fontWeight="bold">
                      OLT / OLS
                    </text>
                    <text x="34" y="100" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
                      Tx: +{oltTxPower} dBm
                    </text>
                    <text x="34" y="115" fill="#94A3B8" fontSize="9">
                      Central Office
                    </text>
                  </g>

                  {/* Node 2: ODC + Passive Splitter */}
                  <g>
                    <rect x="235" y="52" width="105" height="76" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
                    <text x="250" y="80" fill="#FBBF24" fontSize="12" fontWeight="bold">
                      ODC ({splitterType})
                    </text>
                    <text x="250" y="98" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
                      -{passiveSplitterLoss} dB
                    </text>
                    <text x="250" y="114" fill="#94A3B8" fontSize="9">
                      Passive Splitter
                    </text>
                  </g>

                  {/* Node 3: ODP Pole */}
                  <g>
                    <rect x="530" y="52" width="90" height="76" rx="10" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
                    <text x="546" y="80" fill="#38BDF8" fontSize="12" fontWeight="bold">
                      ODP Tiang
                    </text>
                    <text x="546" y="98" fill="#E2E8F0" fontSize="10">
                      Drop Core
                    </text>
                    <text x="546" y="114" fill="#94A3B8" fontSize="9">
                      {cableKm} km Total
                    </text>
                  </g>

                  {/* Node 4: ONT / OPM Handheld */}
                  <g>
                    <rect x="675" y="45" width="105" height="90" rx="12" fill="#1E1B4B" stroke="#A855F7" strokeWidth="2" />
                    <text x="690" y="72" fill="#E9D5FF" fontSize="11" fontWeight="bold">
                      OPM / ONT Rx
                    </text>
                    <text x="690" y="95" fill="#00F5D4" fontSize="14" fontFamily="monospace" fontWeight="bold">
                      {rxPowerDbm} dBm
                    </text>
                    <text x="690" y="115" fill="#C084FC" fontSize="10" fontFamily="monospace">
                      λ: {opmLambda} nm
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Bottom Grid: OPM Handheld Unit & Link Loss Budget Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Optical Power Meter (OPM) Interactive Instrument */}
              <div className="lg:col-span-5 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                    <Activity className="w-5 h-5 text-[#00F5D4]" />
                    <span>Optical Power Meter (OPM Digital)</span>
                  </h3>

                  {/* Handheld OPM Screen */}
                  <div className="bg-[#071318] border-4 border-slate-700 rounded-3xl p-5 shadow-inner">
                    <div className="flex justify-between items-center text-xs font-mono text-cyan-400 border-b border-cyan-900/60 pb-2">
                      <span>LAMBDA (λ): {opmLambda} nm</span>
                      <span>REF: +{oltTxPower} dBm</span>
                    </div>

                    <div className="py-5 text-center">
                      <p className="text-[11px] font-mono uppercase text-slate-400">DAYA TERIMA OPTIK (RX POWER)</p>
                      <div className="text-4xl font-extrabold font-mono text-[#00F5D4] tracking-tight my-1">
                        {rxPowerDbm} <span className="text-lg">dBm</span>
                      </div>
                      <p className="text-xs font-mono text-slate-400">
                        Setara Daya Linier: <span className="text-slate-200">{rxPowerMw} mW</span>
                      </p>
                    </div>

                    {/* Signal Quality Badge */}
                    <div className={`p-2.5 rounded-xl border text-center font-mono text-xs font-bold ${getSignalStatus().bg} ${getSignalStatus().color}`}>
                      STATUS JARINGAN: {getSignalStatus().label}
                    </div>
                  </div>

                  {/* Wavelength Selector Buttons */}
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 mb-2 font-semibold">Pilih Panjang Gelombang Kalibrasi (λ):</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { wl: 1310, desc: 'Upstream (0.35 dB/km)' },
                        { wl: 1490, desc: 'Downstream Data (0.25 dB/km)' },
                        { wl: 1550, desc: 'RF Video / DWDM (0.22 dB/km)' }
                      ].map((item) => (
                        <button
                          key={item.wl}
                          onClick={() => setOpmLambda(item.wl)}
                          className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                            opmLambda === item.wl
                              ? 'bg-cyan-500/20 border-[#00F5D4] text-[#00F5D4]'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-sm font-extrabold font-mono">{item.wl} nm</div>
                          <div className="text-[10px] opacity-80">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {hasMacroBending && (
                  <button
                    onClick={handleFixMacroBending}
                    className="mt-4 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Perbaiki Lekukan Kabel (Macro-Bending -11.5 dB)</span>
                  </button>
                )}
              </div>

              {/* Link Loss Budget Calculator & Parameter Sliders */}
              <div className="lg:col-span-7 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                  <Sliders className="w-5 h-5 text-amber-400" />
                  <span>Kalkulator Link Loss Budget FTTH Real-Time</span>
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Ubah parameter komponen jaringan di bawah ini untuk menganalisis pengaruh panjang kabel, jumlah konektor, dan splitter terhadap daya terima OPM:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  {/* Distance Slider */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Panjang Kabel Optik:</span>
                      <span className="font-mono font-bold text-[#00F5D4]">{cableKm} km</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="15"
                      step="0.5"
                      value={cableKm}
                      onChange={(e) => setCableKm(Number(e.target.value))}
                      className="w-full accent-[#00F5D4] cursor-pointer"
                    />
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Redaman Kabel: {cableKm} km × {attenuationPerKm} dB/km = <strong className="text-white">{cableLoss} dB</strong>
                    </p>
                  </div>

                  {/* Passive Splitter Selector */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-300">Rasio Passive Splitter:</span>
                      <span className="font-mono font-bold text-amber-400">{splitterType} (-{passiveSplitterLoss} dB)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['1:8', '1:16', '1:32'].map((sp) => (
                        <button
                          key={sp}
                          onClick={() => setSplitterType(sp)}
                          className={`py-1.5 rounded-lg font-mono text-xs font-bold border cursor-pointer ${
                            splitterType === sp
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {sp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Connectors Slider */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Jumlah Konektor SC/UPC:</span>
                      <span className="font-mono font-bold text-[#00F5D4]">{numConnectors} Titik</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={numConnectors}
                      onChange={(e) => setNumConnectors(Number(e.target.value))}
                      className="w-full accent-[#00F5D4] cursor-pointer"
                    />
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Redaman Konektor: {numConnectors} × 0.25 dB = <strong className="text-white">{connectorLoss} dB</strong>
                    </p>
                  </div>

                  {/* Splices Slider */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Jumlah Titik Fusion Splice:</span>
                      <span className="font-mono font-bold text-[#00F5D4]">{numSplices} Titik</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="16"
                      value={numSplices}
                      onChange={(e) => setNumSplices(Number(e.target.value))}
                      className="w-full accent-[#00F5D4] cursor-pointer"
                    />
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Redaman Splice: {numSplices} × 0.10 dB = <strong className="text-white">{spliceLossTotal} dB</strong>
                    </p>
                  </div>
                </div>

                {/* Formula Breakdown Box */}
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-cyan-500/30 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Daya Pancar SFP OLT (Tx Power):</span>
                    <span className="text-emerald-400 font-bold">+{oltTxPower} dBm</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Total Redaman Jalur (Kabel + Konektor + Splice + Splitter):</span>
                    <span className="text-amber-300">
                      -{(cableLoss + connectorLoss + spliceLossTotal + passiveSplitterLoss).toFixed(2)} dB
                    </span>
                  </div>
                  {hasMacroBending && (
                    <div className="flex justify-between text-rose-400 font-bold">
                      <span>Kebocoran Macro-Bending (Terdeteksi VFL):</span>
                      <span>-11.50 dB</span>
                    </div>
                  )}
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-extrabold text-[#00F5D4]">
                    <span>Daya Terima Akhir (Rx = Tx - Total Loss):</span>
                    <span>{rxPowerDbm} dBm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODUL 5: MODE EVALUASI & SERTIFIKASI KOMPETENSI SMK          */}
        {/* ============================================================ */}
        {activeTab === 'mod5' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-[#111827]/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Ujian Sertifikasi Kompetensi Teknik Jaringan Fiber Optik (FTTH)</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Jawab 5 soal studi kasus industri di bawah ini untuk mendapatkan Sertifikat Kompetensi Digital OpticLab Pro.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Nama Peserta:</span>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-xs font-bold text-white focus:outline-none"
                    placeholder="Nama Siswa SMK..."
                  />
                </div>
              </div>

              <div className="space-y-5">
                {QUIZ_QUESTIONS.map((item, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <p className="text-xs md:text-sm font-bold text-white mb-3">
                      {qIdx + 1}. {item.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {item.options.map((opt, oIdx) => {
                        const isChosen = quizAnswers[qIdx] === oIdx;
                        const isCorrect = item.answer === oIdx;
                        let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                        if (quizSubmitted) {
                          if (isCorrect) btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                          else if (isChosen && !isCorrect) btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                        } else if (isChosen) {
                          btnStyle = 'bg-cyan-500/20 border-[#00F5D4] text-[#00F5D4]';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                            className={`p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && (
                      <div className="mt-3 p-2.5 rounded-lg bg-slate-950/90 border border-slate-800 text-[11px] text-cyan-300">
                        <strong>Pembahasan:</strong> {item.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                {quizSubmitted && (
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 cursor-pointer"
                  >
                    Ulangi Ujian
                  </button>
                )}
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                    Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length
                      ? 'bg-gradient-to-r from-[#00F5D4] to-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Kumpulkan & Lihat Sertifikat
                </button>
              </div>
            </div>

            {/* Right Column: Live Certificate Preview */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-b from-[#111827] to-[#0B0F19] border-2 border-amber-400/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="text-center border-b border-slate-800 pb-4">
                  <Award className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                  <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                    SERTIFIKAT KOMPETENSI LABORATORIUM VIRTUAL
                  </p>
                  <h3 className="text-base font-extrabold text-white mt-1">OPTICLAB PRO FTTH ACADEMY</h3>
                </div>

                <div className="py-5 text-center space-y-2">
                  <p className="text-xs text-slate-400">Diberikan kepada Praktikan SMK TJKT/TKJ:</p>
                  <p className="text-lg font-extrabold text-[#00F5D4] border-b border-cyan-500/30 pb-1 inline-block px-4">
                    {studentName || 'Siswa TJKT Unggulan'}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-2">
                    Telah menyelesaikan simulasi K3 Optik, Stripping, High-Precision Cleaving, Core-to-Core Fusion Splicing, dan Link Loss Budget.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Skor XP Praktik:</span>
                    <span className="text-[#00F5D4] font-bold">{xp} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nilai Ujian Teori & Kasus:</span>
                    <span className="text-amber-400 font-bold">
                      {quizSubmitted ? `${calculateQuizScore()} / 100` : 'Belum Dinilai'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kualifikasi:</span>
                    <span className="text-emerald-400 font-bold">
                      {quizSubmitted && calculateQuizScore() >= 80 ? 'KOMPETEN (LULUS)' : 'DALAM PELATIHAN'}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Mentor: Kapten Ray</span>
                  <span>ID: FTTH-{xp}-2026</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================================================================= */}
      {/* MODAL RISET INTERNASIONAL & TOOLS PRODUKSI GRATIS 100% BERBASIS WEB */}
      {/* ================================================================= */}
      {showResearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111827] border-2 border-[#00F5D4] rounded-2xl max-w-4xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#00F5D4]" />
                  <span>Hasil Riset Lab Virtual Internasional & Tools Produksi Gratis 100% (Web-Based)</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Panduan Arsitektur & Produksi untuk Guru / Instruktur SMK Jurusan TJKT
                </p>
              </div>
              <button
                onClick={() => setShowResearchModal(false)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs md:text-sm text-slate-300 leading-relaxed">
              {/* Section 1: Benchmark Analysis */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <h3 className="text-sm font-bold text-[#00F5D4] mb-2">
                  1. Analisis Referensi Terbaik Luar Negeri (Labster, PhET Colorado, & FOA Simulator)
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>
                    <strong>Labster (Denmark/USA):</strong> Unggul dalam <em>Story-Driven Gamification</em>, pendampingan karakter AI Mentor (seperti Kapten Ray), dan kewajiban protokol keselamatan kerja (APD K3) sebelum praktikum dimulai.
                  </li>
                  <li>
                    <strong>PhET Interactive Simulations (University of Colorado Boulder):</strong> Unggul dalam umpan balik fisika optik secara langsung (*real-time feedback*), di mana ketika siswa menggeser slider panjang gelombang atau jarak kabel, rumus dan grafik langsung berubah secara instan.
                  </li>
                  <li>
                    <strong>Desain Warna & Pencahayaan:</strong> Menggunakan tema <em>High-Tech Dark Mode</em> (`#0B0F19`) agar pancaran sinar laser merah VFL (`#EF4444`), busur api listrik Fusion Splicer (`#00F5D4`), dan serat kaca mikroskopis terlihat kontras, tajam, dan tidak membuat mata siswa cepat lelah.
                  </li>
                </ul>
              </div>

              {/* Section 2: Where to Build & Deploy for 100% Free */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40">
                <h3 className="text-sm font-bold text-amber-400 mb-2">
                  2. Di Mana Memproduksi & Menjalankan Proyek Ini Secara Gratis 100% Berbasis Web?
                </h3>
                <p className="text-xs mb-3">
                  Anda tidak perlu menginstal software berat di laptop sekolah. Gunakan ekosistem <strong>100% Gratis & Berbasis Web</strong> berikut untuk mengembangkan, mengedit, dan membagikan aplikasi ini ke seluruh siswa SMK:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#0B0F19] border border-slate-800">
                    <p className="font-bold text-white">A. Editor & Pembuatan Kode (Cloud IDE):</p>
                    <p className="text-slate-400 mt-1">
                      Gunakan <strong>StackBlitz.com</strong> atau <strong>CodeSandbox.io</strong>. Cukup login dengan akun Google, pilih template <em>React + Tailwind CSS</em>, lalu tempelkan kode aplikasi ini. Semuanya berjalan langsung di browser tanpa instalasi.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0B0F19] border border-slate-800">
                    <p className="font-bold text-white">B. Hosting & Publikasi ke Siswa (Web Deployment):</p>
                    <p className="text-slate-400 mt-1">
                      Gunakan <strong>Vercel.com</strong>, <strong>Netlify.com</strong>, atau <strong>GitHub Pages</strong> (100% Gratis Selamanya). Anda akan mendapatkan tautan web (misal: <code>opticlab-smk.vercel.app</code>) yang bisa langsung dibuka siswa lewat HP Android maupun PC Lab.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0B0F19] border border-slate-800">
                    <p className="font-bold text-white">C. Desain Aset SVG & Karakter (Graphic Tools):</p>
                    <p className="text-slate-400 mt-1">
                      Gunakan <strong>Figma.com</strong> (Gratis untuk Pendidikan/Edukasi) atau <strong>Boxy-SVG.com</strong> untuk memodifikasi ilustrasi vektor alat kerja FTTH dan karakter mentor.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0B0F19] border border-slate-800">
                    <p className="font-bold text-white">D. Integrasi LMS Sekolah:</p>
                    <p className="text-slate-400 mt-1">
                      Aplikasi web ini dapat disematkan (*Embed via iFrame*) langsung ke dalam <strong>Google Classroom</strong>, <strong>Moodle SMK</strong>, atau <strong>Notion</strong> sebagai modul praktikum mandiri sebelum siswa memegang mesin Fusion Splicer asli yang mahal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowResearchModal(false)}
                className="px-5 py-2 rounded-xl bg-[#00F5D4] text-slate-950 font-bold text-xs cursor-pointer"
              >
                Tutup & Kembali ke Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}