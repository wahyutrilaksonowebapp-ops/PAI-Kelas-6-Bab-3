import React, { useState } from 'react';
import { StudentProfile, CipherWord } from '../types/game';
import { CIPHER_PIECES } from '../data/gameContent';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  CheckCircle2, 
  HeartHandshake, 
  BookOpen, 
  ShieldCheck, 
  Key, 
  Shuffle, 
  Check, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ZoneTamanHarmoniProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onBackToMap: () => void;
  onNextZone: () => void;
}

export const ZoneTamanHarmoni: React.FC<ZoneTamanHarmoniProps> = ({
  student,
  setStudent,
  onBackToMap,
  onNextZone
}) => {
  const [stage, setStage] = useState<'intro' | 'misi2_1' | 'misi2_2' | 'completed'>('intro');

  // Misi 2.1 State: Kasus 1 & 2
  const [caseStep, setCaseStep] = useState<number>(1);
  const [case1Choice, setCase1Choice] = useState<number | null>(null);
  const [case1Submitted, setCase1Submitted] = useState<boolean>(false);

  const [case2Choice, setCase2Choice] = useState<number | null>(null);
  const [case2Submitted, setCase2Submitted] = useState<boolean>(false);

  // Misi 2.2 State: Cipher Al-Mumtahanah 8
  const [userSequence, setUserSequence] = useState<CipherWord[]>(() => {
    // Initial scrambled order
    return [...CIPHER_PIECES].sort(() => Math.random() - 0.5);
  });
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [cipherSubmitted, setCipherSubmitted] = useState<boolean>(false);
  const [cipherCorrect, setCipherCorrect] = useState<boolean>(false);

  // Handle Case 1
  const handleConfirmCase1 = () => {
    if (case1Choice === null) return;
    setCase1Submitted(true);
    if (case1Choice === 1) {
      sound.playCorrect();
      setStudent(prev => ({
        ...prev,
        score: prev.score + 150,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
      }));
    } else {
      sound.playIncorrect();
    }
  };

  // Handle Case 2
  const handleConfirmCase2 = () => {
    if (case2Choice === null) return;
    setCase2Submitted(true);
    if (case2Choice === 1) {
      sound.playCorrect();
      setStudent(prev => ({
        ...prev,
        score: prev.score + 150,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
      }));
    } else {
      sound.playIncorrect();
    }
  };

  // Handle Cipher Swap
  const handleWordClick = (word: CipherWord) => {
    if (cipherSubmitted && cipherCorrect) return;
    sound.playClick();
    if (selectedWordId === null) {
      setSelectedWordId(word.id);
    } else {
      // Swap positions
      const firstIdx = userSequence.findIndex(w => w.id === selectedWordId);
      const secondIdx = userSequence.findIndex(w => w.id === word.id);
      if (firstIdx !== -1 && secondIdx !== -1) {
        const next = [...userSequence];
        const temp = next[firstIdx];
        next[firstIdx] = next[secondIdx];
        next[secondIdx] = temp;
        setUserSequence(next);
      }
      setSelectedWordId(null);
    }
  };

  const handleCheckCipher = () => {
    sound.playClick();
    const isAllCorrect = userSequence.every((w, idx) => w.correctIndex === idx);
    setCipherSubmitted(true);
    setCipherCorrect(isAllCorrect);

    if (isAllCorrect) {
      sound.playCorrect();
      setStudent(prev => ({
        ...prev,
        score: prev.score + 250,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1),
        zoneProgress: { ...prev.zoneProgress, zone2: true },
        badges: prev.badges.includes('badge-toleransi') ? prev.badges : [...prev.badges, 'badge-toleransi']
      }));
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      sound.playIncorrect();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <button
          onClick={() => {
            sound.playClick();
            onBackToMap();
          }}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Desa</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Kemajuan Zona 2:</span>
          <div className="flex gap-1.5">
            {['misi2_1', 'misi2_2'].map((step, idx) => (
              <span
                key={step}
                className={`w-2.5 h-2.5 rounded-full ${
                  (idx === 0 && case2Submitted && case2Choice === 1) ||
                  (idx === 1 && cipherCorrect)
                    ? 'bg-blue-600'
                    : stage === step
                    ? 'bg-blue-400'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Intro Stage */}
      {stage === 'intro' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                Zona 2 · Taman Harmoni Kedungringin
              </span>
              <h2 className="text-2xl font-display font-extrabold text-slate-900">
                Akhlak Terhadap Non-Muslim & Toleransi
              </h2>
            </div>
          </div>

          {/* Dalil Card */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Dalil Pokok Akhlak Terhadap Non-Muslim:</span>
            </div>
            <div className="text-sm text-blue-950 font-medium italic border-l-2 border-blue-500 pl-3">
              "Allah tidak melarang kamu berbuat baik dan berlaku adil terhadap orang-orang yang tidak memerangimu dalam urusan agama dan tidak mengusir kamu dari negerimu. Sesungguhnya Allah mencintai orang-orang yang berlaku adil."
              <span className="block text-xs font-semibold text-blue-800 not-italic mt-1">— QS. Al-Mumtahanah: 8</span>
            </div>
            <div className="text-sm text-blue-950 font-medium italic border-l-2 border-blue-500 pl-3">
              "Untukmu agamamu, dan untukkulah agamaku."
              <span className="block text-xs font-semibold text-blue-800 not-italic mt-1">— QS. Al-Kafirun: 6</span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Islam mengajarkan kerukunan, keadilan, dan kasih sayang (al-birr) kepada seluruh sesama manusia, termasuk warga non-muslim yang hidup berdampingan secara damai (Kafir Dzimmi / Mu'ahid).
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900">2 Prinsip Kunci yang Harus Dipegang:</div>
              <p>
                <strong>1. Toleransi Sosial (Muamalah):</strong> Boleh tolong menolong, menjenguk saat sakit, berdagang, dan bersikap santun tanpa membeda-bedakan.
              </p>
              <p>
                <strong>2. Batasan Toleransi (Akidah & Ibadah):</strong> Tidak boleh mencampuradukkan tata cara salat atau ibadah ritual, berpegang teguh pada QS. Al-Kafirun ayat 6.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setStage('misi2_1');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Mulai Misi 2.1: Menjaga Harmoni Gang Mangga</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Misi 2.1: Menjaga Harmoni Gang Mangga */}
      {stage === 'misi2_1' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <div className="text-xs font-bold text-blue-700 uppercase">Misi 2.1 · Kasus {caseStep} dari 2</div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Dilema Moral: Menjaga Harmoni Gang Mangga
            </h2>
            <p className="text-sm text-slate-600">
              Uji keputusan cepat dan ketepatan akhlakmu dalam situasi nyata bermasyarakat.
            </p>
          </div>

          {caseStep === 1 ? (
            /* Case 1: Permainan Bola & Hari Besar */
            <div className="space-y-5">
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 space-y-2">
                <div className="font-bold text-blue-900 text-sm">
                  Kasus 1: Suasana Hari Besar Tetangga
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Di Gang Mangga, keluarga Koh Aliong sedang merayakan hari besarnya bersama keluarga besar dan membutuhkan suasana yang tenang dan khidmat. Kamu dan kawan-kawan kelas 6 sedang asyik bermain sepak bola plastik di depan halaman rumahnya. Apa yang kamu lakukan?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 0,
                    text: 'A. Mengabaikannya dan tetap berteriak kencang menendang bola karena jalan gang adalah fasilitas umum.',
                    isCorrect: false,
                    reason: 'Salah! Mengganggu ketenangan ibadah atau hari besar tetangga bertentangan dengan adab akhlakul karimah.'
                  },
                  {
                    id: 1,
                    text: 'B. Mengajak teman-teman memindahkan permainan bola ke lapangan desa dan menyapa tetangga dengan santun.',
                    isCorrect: true,
                    reason: 'Tepat sekali! Menghormati ketenangan tetangga non-muslim yang sedang merayakan hari besarnya adalah wujud nyata akhlak Islam yang ramah (+150 Skor Barokah).'
                  },
                  {
                    id: 2,
                    text: 'C. Menendang bola sengaja ke pagar rumah tetangga hingga menimbulkan kegaduhan.',
                    isCorrect: false,
                    reason: 'Salah! Menyakiti atau mengganggu tetangga secara sengaja adalah perbuatan yang dilarang keras dalam hadits Nabi SAW.'
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    disabled={case1Submitted}
                    onClick={() => {
                      sound.playClick();
                      setCase1Choice(opt.id);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                      case1Choice === opt.id
                        ? case1Submitted
                          ? opt.isCorrect
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                            : 'border-rose-500 bg-rose-50 text-rose-950'
                          : 'border-blue-600 bg-blue-50 text-slate-900 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>{opt.text}</div>
                    {case1Submitted && case1Choice === opt.id && (
                      <div className={`mt-2 text-xs font-semibold ${opt.isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {opt.reason}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {!case1Submitted ? (
                  <button
                    onClick={handleConfirmCase1}
                    disabled={case1Choice === null}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
                  >
                    Pilih Keputusan Ini
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setCaseStep(2);
                    }}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Lanjut ke Kasus 2</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Case 2: Bertukar Ibadah vs Batasan QS Al-Kafirun */
            <div className="space-y-5">
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 space-y-2">
                <div className="font-bold text-blue-900 text-sm">
                  Kasus 2: Ajakan Bertukar Tata Cara Ibadah
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Seorang teman non-muslim di sekolah mengajakmu: <em>"Ayo besok Minggu kamu ikut kebaktian di tempat ibadahku, nanti Jumatnya aku ikut salat Jumat di masjidmu biar adil dan kompak!"</em> Bagaimana respon akhlak yang benar menurut ajaran PAI?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 0,
                    text: 'A. Langsung menyetujuinya agar dianggap teman yang sangat toleran dan modern.',
                    isCorrect: false,
                    reason: 'Salah! Ibadah ritual tidak boleh dicampuradukkan dengan agama lain. Toleransi Islam bukan berarti mencampur ritual.'
                  },
                  {
                    id: 1,
                    text: 'B. Menolak dengan santun dan ramah berlandaskan QS. Al-Kafirun ayat 6 ("Untukmu agamamu, untukkulah agamaku"), sambil tetap bersahabat erat dalam belajar bersama.',
                    isCorrect: true,
                    reason: 'Benar sekali! Inilah batasan toleransi Islam: tegas dalam akidah, namun tetap santun dan penuh kasih dalam persahabatan sosial (+150 Skor Barokah).'
                  },
                  {
                    id: 2,
                    text: 'C. Memaki dan membentak teman tersebut di depan kelas serta mengajaknya berkelahi.',
                    isCorrect: false,
                    reason: 'Salah! Islam melarang mencaci maki atau berlaku kasar, QS. Al-An\'am ayat 108 melarang menghina sesembahan mereka.'
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    disabled={case2Submitted}
                    onClick={() => {
                      sound.playClick();
                      setCase2Choice(opt.id);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                      case2Choice === opt.id
                        ? case2Submitted
                          ? opt.isCorrect
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                            : 'border-rose-500 bg-rose-50 text-rose-950'
                          : 'border-blue-600 bg-blue-50 text-slate-900 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>{opt.text}</div>
                    {case2Submitted && case2Choice === opt.id && (
                      <div className={`mt-2 text-xs font-semibold ${opt.isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {opt.reason}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {!case2Submitted ? (
                  <button
                    onClick={handleConfirmCase2}
                    disabled={case2Choice === null}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
                  >
                    Kunci Keputusan Kasus 2
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setStage('misi2_2');
                    }}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Lanjut ke Misi 2.2: Cipher Ayat Al-Mumtahanah 8</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Misi 2.2: Cipher Ayat Al-Mumtahanah 8 */}
      {stage === 'misi2_2' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <div className="text-xs font-bold text-blue-700 uppercase">Misi 2.2</div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Cipher Ayat: Al-Mumtahanah Ayat 8
            </h2>
            <p className="text-sm text-slate-600">
              Susun kembali potongan terjemahan ayat yang diacak berikut ini agar menjadi dalil utuh pembuka Gerbang Toleransi Kedungringin!
            </p>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between text-xs text-blue-300">
              <span className="flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-400" />
                <span>Klik 2 kartu bergantian untuk menukar posisinya:</span>
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setUserSequence([...CIPHER_PIECES].sort(() => Math.random() - 0.5));
                  setSelectedWordId(null);
                  setCipherSubmitted(false);
                }}
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Acak Ulang</span>
              </button>
            </div>

            {/* Cipher Interactive Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userSequence.map((word, idx) => {
                const isSelected = selectedWordId === word.id;
                const isCorrectPos = cipherSubmitted && word.correctIndex === idx;

                return (
                  <button
                    key={word.id}
                    onClick={() => handleWordClick(word)}
                    className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 text-amber-300 ring-2 ring-amber-400/50'
                        : isCorrectPos
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : cipherSubmitted
                        ? 'border-rose-500/50 bg-rose-500/10 text-rose-300'
                        : 'border-slate-700 bg-slate-800/80 hover:bg-slate-750 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-white/10 text-xs flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <span>{word.text}</span>
                    </div>

                    {cipherSubmitted && (
                      isCorrectPos ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                      )
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & explanation */}
          {cipherSubmitted && (
            <div className={`p-4 rounded-xl text-sm ${
              cipherCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
            }`}>
              {cipherCorrect ? (
                <div className="space-y-1 font-medium">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sandi Dalil Berhasil Terbuka Sempurna! (+250 Skor Barokah)</span>
                  </div>
                  <p className="text-xs text-emerald-900">
                    "Allah tidak melarang kamu berbuat baik dan berlaku adil terhadap orang-orang yang tiada memerangimu karena agama dan tidak mengusirmu dari negerimu." (QS. Al-Mumtahanah: 8)
                  </p>
                </div>
              ) : (
                <div className="text-xs">
                  Urutan potongan ayat masih ada yang tertukar. Perhatikan tanda nomor dan arti kalimatnya, lalu klik tombol untuk menukar posisi kata.
                </div>
              )}
            </div>
          )}

          {/* Action */}
          <div className="flex items-center justify-between pt-2">
            {!cipherCorrect ? (
              <button
                onClick={handleCheckCipher}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                Uji Urutan Sandi Ayat
              </button>
            ) : (
              <div className="w-full flex items-center justify-between">
                <div className="text-sm font-bold text-blue-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Lencana "Duta Toleransi Beji" Berhasil Diraih!</span>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNextZone();
                  }}
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Lanjut ke Zona 3: Safari Bela Rasa</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
