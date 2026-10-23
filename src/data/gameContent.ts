import { NeighborCharacter, CipherWord, TrueFalseQuestion, BossQuestion, BadgeInfo, LearningGap, StudentProfile } from '../types/game';

export const NEIGHBOR_CHARACTERS: NeighborCharacter[] = [
  {
    id: 'char-1',
    name: 'Paman Burhan',
    relation: 'Paman kandung keluarga',
    religion: 'Muslim',
    correctRights: 3,
    description: 'Adik dari ayahmu yang tinggal 2 rumah di sebelah timur. Beliau sering shalat berjamaah bersama keluargamu.',
    dalilClue: 'Memiliki 3 hak: Hak sebagai tetangga dekat, Hak sesama muslim, dan Hak tali silaturahmi kekerabatan.'
  },
  {
    id: 'char-2',
    name: 'Pak Joko',
    relation: 'Warga pendatang baru',
    religion: 'Muslim',
    correctRights: 2,
    description: 'Bekerja di pabrik Beji dan menyewa rumah di depan rumahmu. Beliau muslim namun bukan saudara sedarah.',
    dalilClue: 'Memiliki 2 hak: Hak sebagai tetangga dekat dan Hak persaudaraan sesama muslim.'
  },
  {
    id: 'char-3',
    name: 'Koh Aliong',
    relation: 'Tetangga sebelah rumah',
    religion: 'Non-Muslim',
    correctRights: 1,
    description: 'Pemilik toko kelontong yang ramah di samping kiri rumahmu. Beliau beragama non-muslim yang hidup rukun berdampingan.',
    dalilClue: 'Memiliki 1 hak: Hak kemuliaan sebagai tetangga yang wajib dilindungi, dihormati, dan diperlakukan adil.'
  }
];

export const CIPHER_PIECES: CipherWord[] = [
  { id: 1, text: 'Allah tidak melarang kamu', correctIndex: 0 },
  { id: 2, text: 'berbuat baik', correctIndex: 1 },
  { id: 3, text: 'dan berlaku adil', correctIndex: 2 },
  { id: 4, text: 'terhadap orang-orang yang tiada memerangimu', correctIndex: 3 },
  { id: 5, text: 'karena agama', correctIndex: 4 },
  { id: 6, text: 'dan tidak mengusirmu dari negerimu', correctIndex: 5 }
];

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 'tf-1',
    statement: 'Boleh mencoret-coret cangkang kura-kura untuk dijadikan hiasan lucu di rumah?',
    isCorrect: false,
    explanation: 'Salah! Menyakiti atau merusak tubuh hewan demi kesenangan manusia adalah perbuatan zalim yang dilarang dalam Islam.',
    dalil: 'Rasulullah SAW melarang menyiksa atau memberi cap/tanda menyakitkan pada tubuh binatang.'
  },
  {
    id: 'tf-2',
    statement: 'Jika harus menyembelih hewan ternak (seperti ayam atau kambing), pisaunya wajib ditajamkan terlebih dahulu agar tidak menyiksa hewan?',
    isCorrect: true,
    explanation: 'Benar! Menajamkan pisau dan menyembelih dengan cepat tanpa memperlihatkan pisau di hadapan hewan lain adalah bentuk ihsan.',
    dalil: 'HR. Muslim: "Sesungguhnya Allah mewajibkan berbuat ihsan atas segala sesuatu. Jika menyembelih, hendaklah menajamkan pisaunya dan tenangkanlah hewan sembelihannya."'
  },
  {
    id: 'tf-3',
    statement: 'Memberi minum anjing jalanan yang hampir mati kehausan dengan sepatu bisa menjadi sebab diampuninya dosa seseorang?',
    isCorrect: true,
    explanation: 'Benar! Dalam hadits shahih, seorang laki-laki yang memberi minum anjing kehausan dari sumur diampuni dosanya oleh Allah SWT.',
    dalil: 'HR. Bukhari & Muslim: "Maka Allah bersyukur kepadanya lalu mengampuni dosanya. Para sahabat bertanya: Apakah ada pahala menolong hewan? Nabi menjawab: Pada setiap makhluk bernyawa ada pahalanya."'
  },
  {
    id: 'tf-4',
    statement: 'Boleh menembak burung liar dengan ketapel hanya untuk melatih ketangkasan dan iseng bermain?',
    isCorrect: false,
    explanation: 'Salah! Menjadikan makhluk hidup bernyawa sebagai sasaran tembak/lempar untuk mainan adalah perkara yang dilaknat.',
    dalil: 'HR. Bukhari & Muslim: Rasulullah SAW melaknat orang yang menjadikan sesuatu yang bernyawa sebagai sasaran bidik mainan.'
  },
  {
    id: 'tf-5',
    statement: 'Seorang wanita diancam siksa neraka karena mengurung seekor kucing tanpa memberinya makan dan minum hingga mati?',
    isCorrect: true,
    explanation: 'Benar! Menahan hewan tanpa memberinya makan serta melarangnya mencari makan sendiri di bumi adalah kezaliman berat.',
    dalil: 'HR. Bukhari: "Seorang wanita diazab karena seekor kucing yang dikurungnya sampai mati, tidak diberinya makan maupun minum, dan tidak dilepaskan mencari serangga."'
  }
];

export const BOSS_QUESTIONS: BossQuestion[] = [
  {
    id: 'boss-1',
    question: 'Berapakah radius batas seseorang dianggap sebagai tetangga menurut mayoritas ulama dan hadits sahabat?',
    options: ['5 rumah ke kanan dan kiri', '10 rumah di depan dan belakang', '40 rumah ke setiap arah penjuru', '100 meter dari masjid desa'],
    correctAnswer: 2,
    explanation: 'Menurut riwayat Az-Zuhri dan sahabat, tetangga adalah mencakup radius 40 rumah ke depan, belakang, kanan, dan kiri.',
    category: 'tetangga'
  },
  {
    id: 'boss-2',
    question: 'Jika tetangga kita adalah seorang Muslim sekaligus saudara paman kandung, berapa hak yang ia miliki atas diri kita?',
    options: ['Hanya 1 hak (hak kekeluargaan)', '2 hak (hak tetangga & hak keluarga)', '3 hak (hak tetangga, hak keislaman, hak kekerabatan)', '4 hak (hak tetangga, keluarga, negara, RT)'],
    correctAnswer: 2,
    explanation: 'Ia berhak atas 3 hak sekaligus: hak ketetanggaan, hak persaudaraan sesama muslim, dan hak silaturahmi kekerabatan.',
    category: 'tetangga'
  },
  {
    id: 'boss-3',
    question: 'Ibu memasak kuah gulai yang harum di dapur. Hadits Rasulullah SAW kepada sahabat Abu Dzar RA mengajarkan untuk...',
    options: ['Menutup pintu dan jendela agar baunya tidak tercium', 'Memperbanyak kuahnya lalu membagikannya kepada tetangga', 'Memakan semuanya sendiri mumpung masih hangat', 'Menjual sisa masakannya ke tetangga dengan harga murah'],
    correctAnswer: 1,
    explanation: 'HR. Muslim: "Wahai Abu Dzar, jika engkau memasak kuah sayur, maka perbanyaklah airnya dan bagilah kepada tetanggamu."',
    category: 'tetangga'
  },
  {
    id: 'boss-4',
    question: 'Surat apakah dalam Al-Qur\'an yang menjadi dasar utama tidak boleh mencampuradukkan ritual ibadah dengan non-muslim?',
    options: ['QS. Al-Ikhlas ayat 1-4', 'QS. Al-Kafirun ayat 6', 'QS. Al-Falaq ayat 1-5', 'QS. Al-Baqarah ayat 255'],
    correctAnswer: 1,
    explanation: 'QS. Al-Kafirun ayat 6: "Lakum dinukum waliyadin" (Untukmu agamamu, dan untukkulah agamaku) menegaskan batas akidah dalam toleransi.',
    category: 'non-muslim'
  },
  {
    id: 'boss-5',
    question: 'Bagaimanakah sikap seorang muslim menurut QS. Al-Mumtahanah ayat 8 terhadap warga non-muslim yang hidup damai dan tidak memerangi?',
    options: ['Boleh memusuhi dan menjauhi mereka sepenuhnya', 'Tetap wajib berbuat baik (al-birr) dan berlaku adil kepada mereka', 'Hanya menyapa jika diberi hadiah terlebih dahulu', 'Mengambil hak mereka secara diam-diam'],
    correctAnswer: 1,
    explanation: 'Allah SWT tegas memerintahkan untuk tetap berbuat baik dan berlaku adil kepada non-muslim yang hidup berdampingan secara damai.',
    category: 'non-muslim'
  },
  {
    id: 'boss-6',
    question: 'Larangan mencaci maki atau mengejek sesembahan orang non-muslim ditegaskan dalam Al-Qur\'an surat...',
    options: ['QS. Al-An\'am ayat 108', 'QS. Yasin ayat 12', 'QS. An-Nas ayat 3', 'QS. Al-Hujurat ayat 13'],
    correctAnswer: 0,
    explanation: 'QS. Al-An\'am: 108 melarang memaki sembahan non-muslim karena mereka bisa membalas memaki Allah tanpa pengetahuan.',
    category: 'non-muslim'
  },
  {
    id: 'boss-7',
    question: 'Mengapa seorang laki-laki yang kehausan diampuni dosanya oleh Allah SWT dalam hadits Rasulullah SAW?',
    options: ['Karena memenangkan sayembara desa', 'Karena memberi minum anjing yang menjulurkan lidah kehausan menggunakan sepatunya', 'Karena menyembelih sapi qurban yang paling mahal', 'Karena membersihkan kandang kuda miliknya'],
    correctAnswer: 1,
    explanation: 'Kasih sayang yang tulus kepada seekor anjing yang menderita kehausan berbuah ampunan dan rida Allah SWT (HR. Bukhari).',
    category: 'hewan'
  },
  {
    id: 'boss-8',
    question: 'Bentuk perbuatan "Ihsan" ketika seseorang harus menyembelih hewan qurban atau ternak adalah...',
    options: ['Mengasah pisau setajam mungkin dan tidak memperlihatkan pisau ke hewan', 'Membiarkan pisau tumpul agar hewannya tidak kaget', 'Menyembelih di depan anak-anak hewan ternak', 'Memukul kepala hewan terlebih dahulu sampai pingsan'],
    correctAnswer: 0,
    explanation: 'Rasulullah SAW memerintahkan agar pisau ditajamkan dan mempercepat proses sembelihan agar hewan tidak tersiksa lama (HR. Muslim).',
    category: 'hewan'
  },
  {
    id: 'boss-9',
    question: 'Di jalan pulang sekolah Kedungringin, kamu melihat anak burung terjatuh dari sarang di pohon randu. Tindakan akhlak yang paling mulia adalah...',
    options: ['Membawanya pulang lalu memasukkannya ke dalam toples rapat', 'Mengembalikannya ke sarang atau tempat aman di dahan pohon dengan hati-hati', 'Membiarkannya di jalan agar dimakan kucing kampung', 'Menjadikannya sasaran lempar batu bersama teman'],
    correctAnswer: 1,
    explanation: 'Islam memerintahkan kita berbelas kasih dan menolong hewan yang tak berdaya agar terlindung dari bahaya.',
    category: 'hewan'
  },
  {
    id: 'boss-10',
    question: 'Apakah hikmah paling utama dari menjaga akhlak mulia kepada tetangga, saudara non-muslim, dan makhluk hidup di sekitar kita?',
    options: ['Supaya dipuji oleh kepala desa dan guru di sekolah', 'Terwujudnya kedamaian lingkungan (Rahmatan lil \'Alamin) dan meraih rida Allah SWT', 'Supaya bisa meminta bantuan uang kapan saja', 'Agar ditakuti oleh orang-orang di desa lain'],
    correctAnswer: 1,
    explanation: 'Tujuan utama akhlakul karimah adalah mencerminkan Islam sebagai rahmat bagi semesta alam serta mendatangkan ampunan dan rida Allah SWT.',
    category: 'tetangga'
  }
];

export const BADGES: BadgeInfo[] = [
  {
    id: 'badge-tetangga',
    title: 'Tetangga Idaman',
    description: 'Menguasai konsep 40 rumah radar dan 3 tingkatan hak tetangga dengan sempurna.',
    icon: 'home',
    criteria: 'Selesaikan Zona 1: Kampung Damai'
  },
  {
    id: 'badge-toleransi',
    title: 'Duta Toleransi Beji',
    description: 'Menjaga harmoni Gang Mangga dan memecahkan sandi QS. Al-Mumtahanah ayat 8.',
    icon: 'heart-handshake',
    criteria: 'Selesaikan Zona 2: Taman Harmoni'
  },
  {
    id: 'badge-satwa',
    title: 'Penyayang Satwa',
    description: 'Menyelamatkan anak kucing Kedungringin dan lulus ujian adab menyayangi hewan.',
    icon: 'paw-print',
    criteria: 'Selesaikan Zona 3: Safari Bela Rasa'
  },
  {
    id: 'badge-ksatria',
    title: 'Ksatria Akhlakul Karimah SDN Kedungringin 1',
    description: 'Mengalahkan Monster Egois di Babak Final dan memulihkan kerukunan di desa.',
    icon: 'crown',
    criteria: 'Kalahkan Monster Egois di Babak Final'
  }
];

export const INITIAL_CLASSMATES: StudentProfile[] = [
  {
    id: 'std-1',
    name: 'Ahmad Faiz',
    avatar: '👦',
    score: 1850,
    streak: 6,
    maxStreak: 8,
    zoneProgress: { zone1: true, zone2: true, zone3: true, boss: true },
    badges: ['badge-tetangga', 'badge-toleransi', 'badge-satwa', 'badge-ksatria'],
    lastActive: 'Baru saja',
    answers: { 'boss-1': true, 'boss-2': true, 'boss-3': true, 'boss-4': true, 'boss-5': true }
  },
  {
    id: 'std-2',
    name: 'Siti Nur Azizah',
    avatar: '🧕',
    score: 1720,
    streak: 5,
    maxStreak: 7,
    zoneProgress: { zone1: true, zone2: true, zone3: true, boss: true },
    badges: ['badge-tetangga', 'badge-toleransi', 'badge-satwa', 'badge-ksatria'],
    lastActive: '2 menit lalu',
    answers: { 'boss-1': true, 'boss-2': true, 'boss-3': true, 'boss-4': true, 'boss-5': true }
  },
  {
    id: 'std-3',
    name: 'Budi Santoso',
    avatar: '👦',
    score: 1480,
    streak: 4,
    maxStreak: 5,
    zoneProgress: { zone1: true, zone2: true, zone3: true, boss: false },
    badges: ['badge-tetangga', 'badge-toleransi', 'badge-satwa'],
    lastActive: '5 menit lalu',
    answers: { 'boss-1': true, 'boss-2': false, 'boss-3': true }
  },
  {
    id: 'std-4',
    name: 'Fatimah Az-Zahra',
    avatar: '🧕',
    score: 1390,
    streak: 3,
    maxStreak: 4,
    zoneProgress: { zone1: true, zone2: true, zone3: true, boss: false },
    badges: ['badge-tetangga', 'badge-toleransi', 'badge-satwa'],
    lastActive: '8 menit lalu',
    answers: { 'boss-1': true, 'boss-2': true, 'boss-3': true }
  },
  {
    id: 'std-5',
    name: 'Rizky Ramadhan',
    avatar: '👦',
    score: 1120,
    streak: 2,
    maxStreak: 3,
    zoneProgress: { zone1: true, zone2: true, zone3: false, boss: false },
    badges: ['badge-tetangga', 'badge-toleransi'],
    lastActive: '12 menit lalu',
    answers: { 'boss-1': false, 'boss-2': false }
  },
  {
    id: 'std-6',
    name: 'Dewi Ayu Pertiwi',
    avatar: '🧕',
    score: 950,
    streak: 3,
    maxStreak: 3,
    zoneProgress: { zone1: true, zone2: false, zone3: false, boss: false },
    badges: ['badge-tetangga'],
    lastActive: '15 menit lalu',
    answers: { 'boss-1': true }
  },
  {
    id: 'std-7',
    name: 'Kevin Pratama',
    avatar: '👦',
    score: 890,
    streak: 1,
    maxStreak: 2,
    zoneProgress: { zone1: true, zone2: false, zone3: false, boss: false },
    badges: ['badge-tetangga'],
    lastActive: '18 menit lalu',
    answers: { 'boss-1': true }
  },
  {
    id: 'std-8',
    name: 'Zahra Maulida',
    avatar: '🧕',
    score: 740,
    streak: 2,
    maxStreak: 2,
    zoneProgress: { zone1: true, zone2: false, zone3: false, boss: false },
    badges: ['badge-tetangga'],
    lastActive: '20 menit lalu',
    answers: { 'boss-1': false }
  }
];

export const INITIAL_LEARNING_GAPS: LearningGap[] = [
  {
    topic: 'Hak Tetangga',
    concept: 'Membedakan 3 Hak Tetangga (Muslim Kerabat vs Muslim Non-Kerabat vs Non-Muslim)',
    failureRate: 78,
    affectedCount: 22,
    totalTested: 28,
    status: 'critical',
    recommendation: 'Tekankan kembali konsep bahwa tetangga non-muslim tetap berhak atas 1 hak (hak ketetanggaan), sedangkan kerabat muslim mendapat akumulasi 3 hak.'
  },
  {
    topic: 'Toleransi Beragama',
    concept: 'Batas Toleransi: Menolak Bertukar Ibadah Sesuai QS. Al-Kafirun Ayat 6',
    failureRate: 32,
    affectedCount: 9,
    totalTested: 28,
    status: 'moderate',
    recommendation: 'Jelaskan perbedaan mendasar antara toleransi muamalah sosial (wajib rukun) dengan ritual akidah ibadah (masing-masing).'
  },
  {
    topic: 'Adab Terhadap Satwa',
    concept: 'Prinsip Ihsan Menajamkan Pisau & Tidak Menyiksa Hewan Sembelihan',
    failureRate: 14,
    affectedCount: 4,
    totalTested: 28,
    status: 'mastered',
    recommendation: 'Sebagian besar siswa telah memahami hadits riwayat Muslim tentang kewajiban ihsan pada hewan sembelihan.'
  },
  {
    topic: 'Radius Ketetanggaan',
    concept: 'Batas 40 Rumah Sesuai Riwayat Sahabat & Fatwa Ulama',
    failureRate: 25,
    affectedCount: 7,
    totalTested: 28,
    status: 'mastered',
    recommendation: 'Pemahaman tentang 40 rumah ke 4 penjuru sudah sangat baik melalui visualisasi radar interaktif.'
  }
];
