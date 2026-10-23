import React, { useState } from 'react';
import { StudentProfile } from '../types/game';
import { TRUE_FALSE_QUESTIONS } from '../data/gameContent';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Check, 
  X, 
  ChevronRight,
  ShieldAlert,
  Flame,
  Award
} from 'lucide-react';

interface ZoneSafariBelaRasaProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onBackToMap: () => void;
  onGoToBoss: () => void;
}

export const ZoneSafariBelaRasa: React.FC<ZoneSafariBelaRasaProps> = ({
  student,
  setStudent,
  onBackToMap,
  onGoToBoss
}) => {
  const [stage, setStage] = useState<'intro' | 'rescue' | 'truefalse' | 'completed'>('intro');

  // Misi 3.1 State: Emergency Rescue sequence
  const [selectedSequence, setSelectedSequence] = useState<number[]>([]);
  const [rescueSubmitted, setRescueSubmitted] = useState<boolean>(false);
  const [rescueCorrect, setRescueCorrect] = useState<boolean>(false);

  // Misi 3.2 State: True / False Sahabat Alam
  const [currentTfIndex, setCurrentTfIndex] = useState<number>(0);
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean>>({});
  const [tfFeedback, setTfFeedback] = useState<{ isCorrect: boolean; text: string; dalil: string } | null>(null);
  const [tfCompleted, setTfCompleted] = useState<boolean>(false);

  // Available rescue steps
  const RESCUE_STEPS = [
    { id: 1, title: 'Langkah 1: Menolong dengan Hati-hati', desc: 'Membuka celah bilah bambu perlahan agar tubuh anak kucing terlepas tanpa rasa sakit.' },
    { id: 2, title: 'Langkah 2: Memberi Air Bersih & Makanan', desc: 'Meneteskan air bersih dari wadah dan memberi sedikit makanan untuk memulihkan tenaganya.' },
    { id: 3, title: 'Langkah 3: Memastikan Keamanan Tempat', desc: 'Memindahkan anak kucing ke tempat teduh yang aman dari rel kereta dan kendaraan desa.' }
  ];

  // Handle Rescue step selection
  const handleToggleRescueStep = (id: number) => {
    if (rescueSubmitted && rescueCorrect) return;
    sound.playClick();
    if (selectedSequence.includes(id)) {
      setSelectedSequence(selectedSequence.filter(s => s !== id));
    } else {
      setSelectedSequence([...selectedSequence, id]);
    }
  };

  const handleVerifyRescue = () => {
    sound.playClick();
    // Correct sequence is 1 -> 2 -> 3
    const isCorrect = selectedSequence.length === 3 &&
      selectedSequence[0] === 1 &&
      selectedSequence[1] === 2 &&
      selectedSequence[2] === 3;

    setRescueSubmitted(true);
    setRescueCorrect(isCorrect);

    if (isCorrect) {
      sound.playCorrect();
      setStudent(prev => ({
        ...prev,
        score: prev.score + 180,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
      }));
    } else {
      sound.playIncorrect();
    }
  };

  // Handle True / False response
  const handleAnswerTf = (userPick: boolean) => {
    const q = TRUE_FALSE_QUESTIONS[currentTfIndex];
    sound.playClick();
    const isRight = userPick === q.isCorrect;

    if (isRight) {
      sound.playCorrect();
      setStudent(prev => ({
        ...prev,
        score: prev.score + 60,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
      }));
    } else {
      sound.playIncorrect();
      setStudent(prev => ({
        ...prev,
        streak: 0
      }));
    }

    setTfAnswers(prev => ({ ...prev, [q.id]: userPick }));
    setTfFeedback({
      isCorrect: isRight,
      text: q.explanation,
      dalil: q.dalil
    });
  };

  const handleNextTfQuestion = () => {
    sound.playClick();
    setTfFeedback(null);
    if (currentTfIndex + 1 < TRUE_FALSE_QUESTIONS.length) {
      setCurrentTfIndex(currentTfIndex + 1);
    } else {
      setTfCompleted(true);
      setStudent(prev => ({
        ...prev,
        score: prev.score + 150,
        zoneProgress: { ...prev.zoneProgress, zone3: true },
        badges: prev.badges.includes('badge-satwa') ? prev.badges : [...prev.badges, 'badge-satwa']
      }));
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
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
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Desa</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Kemajuan Zona 3:</span>
          <div className="flex gap-1.5">
            {['rescue', 'truefalse'].map((step, idx) => (
              <span
                key={step}
                className={`w-2.5 h-2.5 rounded-full ${
                  (idx === 0 && rescueCorrect) || (idx === 1 && tfCompleted)
                    ? 'bg-amber-600'
                    : stage === step
                    ? 'bg-amber-400'
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
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 tracking-wider uppercase">
                Zona 3 · Safari Bela Rasa Kedungringin
              </span>
              <h2 className="text-2xl font-display font-extrabold text-slate-900">
                Akhlak Terhadap Hewan & Makhluk Hidup
              </h2>
            </div>
          </div>

          {/* Dalil Card */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Dalil Pokok Kasih Sayang Terhadap Satwa:</span>
            </div>
            <div className="text-sm text-amber-950 font-medium italic border-l-2 border-amber-500 pl-3">
              "Seorang wanita diazab karena seekor kucing yang dikurungnya hingga mati kelaparan. Maka ia masuk neraka karena kucing itu, tidak memberinya makan dan minum, serta tidak melepaskannya mencari serangga di tanah."
              <span className="block text-xs font-semibold text-amber-800 not-italic mt-1">— HR. Bukhari & Muslim</span>
            </div>
            <div className="text-sm text-amber-950 font-medium italic border-l-2 border-amber-500 pl-3">
              "Pada setiap makhluk yang bernyawa, ada pahala kebaikan (jika kita menolongnya)."
              <span className="block text-xs font-semibold text-amber-800 not-italic mt-1">— HR. Bukhari (Kisah Pria & Anjing Kehausan)</span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Hewan adalah makhluk ciptaan Allah SWT yang tidak memiliki akal dan tidak dapat mengadu ketika disakiti. Islam memerintahkan manusia untuk berbuat <em>ihsan</em> (kebaikan terbaik) kepada seluruh satwa di muka bumi.
            </p>
            <p>
              Di zona ini, kamu akan menguji belas kasihmu melalui 2 simulasi:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 pl-2 font-medium text-slate-800">
              <li>Misi 3.1: <span className="text-amber-700 font-bold">Emergency Rescue</span> (Menyelamatkan anak kucing lemas di tepi sungai Kedungringin).</li>
              <li>Misi 3.2: <span className="text-amber-700 font-bold">True or False: Sahabat Alam</span> (Uji ketangkasan adab memperlakukan satwa).</li>
            </ol>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setStage('rescue');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Mulai Misi 3.1: Emergency Rescue Anak Kucing</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Misi 3.1: Emergency Rescue */}
      {stage === 'rescue' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-700 uppercase">Misi 3.1</div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Simulasi Interaktif: Emergency Rescue Anak Kucing
            </h2>
            <p className="text-sm text-slate-600">
              Saat jalan pulang di dekat sungai desa, ada anak kucing terjepit sela pagar bambu dan tampak sangat kehausan.
            </p>
          </div>

          {/* Interactive Scene */}
          <div className="bg-amber-950 text-amber-100 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-900/60 px-2.5 py-1 rounded">
                <ShieldAlert className="w-4 h-4" />
                <span>Penyelamatan Berurutan</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Urutkan 3 Langkah Penyelamatan yang Paling Bijak & Manusiawi:
              </h3>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Klik kartu langkah di bawah ini secara berturut-turut untuk menyusun urutan pertolongan yang tertib.
              </p>
            </div>

            {/* Visual Icon Illustration */}
            <div className="w-28 h-28 rounded-2xl bg-amber-900/50 border border-amber-500/30 flex flex-col items-center justify-center text-4xl shadow-inner shrink-0">
              🐱
              <span className="text-[11px] font-mono text-amber-300 mt-1">Status: Terjepit</span>
            </div>
          </div>

          {/* Steps selection */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase">
              Pilihan Langkah (Klik berurutan 1, 2, dan 3):
            </div>

            <div className="grid grid-cols-1 gap-3">
              {RESCUE_STEPS.map((step) => {
                const seqIndex = selectedSequence.indexOf(step.id);
                const isSelected = seqIndex !== -1;

                return (
                  <button
                    key={step.id}
                    disabled={rescueSubmitted && rescueCorrect}
                    onClick={() => handleToggleRescueStep(step.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/80 text-slate-900 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-slate-900">{step.title}</div>
                      <div className="text-xs text-slate-600">{step.desc}</div>
                    </div>

                    <div className="shrink-0 ml-4">
                      {isSelected ? (
                        <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center shadow">
                          {seqIndex + 1}
                        </span>
                      ) : (
                        <span className="w-8 h-8 rounded-full border border-slate-300 text-slate-400 text-xs flex items-center justify-center font-bold">
                          +
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {rescueSubmitted && (
            <div className={`p-4 rounded-xl text-sm font-medium ${
              rescueCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
            }`}>
              {rescueCorrect ? (
                <div className="space-y-1">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Luar biasa! Urutan pertolonganmu sangat teratur dan penuh kasih (+180 Skor Barokah)</span>
                  </div>
                  <p className="text-xs text-emerald-900">
                    Kucing tersebut telah bebas tanpa luka dan diberi minum hingga segar kembali. Allah SWT sangat mencintai hamba-Nya yang berbelas kasih kepada hewan yang lemah.
                  </p>
                </div>
              ) : (
                <div className="text-xs">
                  Urutan pertolongan belum tepat. Pastikan kamu melepaskannya dengan hati-hati terlebih dahulu, lalu beri air/makanan, dan pastikan ia di tempat aman. Klik kartu untuk mengubah urutan.
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            {!rescueCorrect ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVerifyRescue}
                  disabled={selectedSequence.length !== 3}
                  className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
                >
                  Verifikasi Urutan Penyelamatan
                </button>
                {selectedSequence.length > 0 && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedSequence([]);
                      setRescueSubmitted(false);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline px-2 py-1"
                  >
                    Reset Urutan
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setStage('truefalse');
                }}
                className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Lanjut ke Misi 3.2: True or False Sahabat Alam</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Misi 3.2: True or False Sahabat Alam */}
      {stage === 'truefalse' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-700 uppercase">
                Misi 3.2 · Soal {currentTfIndex + 1} dari {TRUE_FALSE_QUESTIONS.length}
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                True or False: Sahabat Alam
              </h2>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-bold tabular-nums">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Streak: {student.streak}x</span>
            </div>
          </div>

          {!tfCompleted ? (
            <div className="space-y-6">
              {/* Question Statement Box */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-4">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Pernyataan Kasus Satwa:
                </span>
                <p className="font-display font-bold text-lg sm:text-xl text-white leading-relaxed">
                  "{TRUE_FALSE_QUESTIONS[currentTfIndex].statement}"
                </p>
              </div>

              {/* Action Buttons: Benar vs Salah */}
              {tfFeedback === null ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswerTf(true)}
                    className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-xl transition-all shadow hover:shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    <Check className="w-6 h-6 stroke-[3]" />
                    <span>BENAR</span>
                  </button>
                  <button
                    onClick={() => handleAnswerTf(false)}
                    className="py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base rounded-xl transition-all shadow hover:shadow-rose-600/20 flex items-center justify-center gap-2"
                  >
                    <X className="w-6 h-6 stroke-[3]" />
                    <span>SALAH</span>
                  </button>
                </div>
              ) : (
                /* Feedback state */
                <div className="space-y-4">
                  <div className={`p-5 rounded-2xl border space-y-2 ${
                    tfFeedback.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}>
                    <div className="font-bold text-sm flex items-center gap-2">
                      {tfFeedback.isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Check className="w-5 h-5" /> Jawabanmu Benar! (+60 Skor Barokah)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-700">
                          <X className="w-5 h-5" /> Jawabanmu Kurang Tepat
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium">{tfFeedback.text}</p>
                    <div className="text-xs italic bg-white/70 p-2.5 rounded-lg border border-slate-200/50 mt-2">
                      {tfFeedback.dalil}
                    </div>
                  </div>

                  <button
                    onClick={handleNextTfQuestion}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>{currentTfIndex + 1 < TRUE_FALSE_QUESTIONS.length ? 'Lanjut ke Soal Berikutnya' : 'Selesaikan Zona 3'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Completed Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-2xl text-slate-900">
                Selamat! Lencana "Penyayang Satwa" Berhasil Diraih!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Kamu telah menyelesaikan semua 3 Zona Akhlakul Karimah di Desa Kedungringin! Kini gerbang Babak Final: "Battle of the Champions" telah terbuka lebar untuk menantang Monster Egois!
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    onBackToMap();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                >
                  Kembali ke Peta Desa
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onGoToBoss();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Masuk ke Battle of the Champions!</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
