import React, { useState } from 'react';
import { StudentProfile } from '../types/game';
import { NEIGHBOR_CHARACTERS } from '../data/gameContent';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Home, 
  HelpCircle, 
  Users, 
  Soup, 
  BookOpen, 
  Check, 
  X,
  Award,
  ChevronRight
} from 'lucide-react';

interface ZoneKampungDamaiProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onBackToMap: () => void;
  onNextZone: () => void;
}

export const ZoneKampungDamai: React.FC<ZoneKampungDamaiProps> = ({
  student,
  setStudent,
  onBackToMap,
  onNextZone
}) => {
  const [currentStage, setCurrentStage] = useState<'intro' | 'misi1' | 'misi2' | 'misi3' | 'completed'>('intro');

  // Misi 1.1 State: Radar 40 Rumah
  const [radarRadius, setRadarRadius] = useState<number>(20);
  const [radarAnswered, setRadarAnswered] = useState<boolean>(false);
  const [radarFeedback, setRadarFeedback] = useState<string | null>(null);

  // Misi 1.2 State: Matching 3 Hak Tetangga
  const [assignments, setAssignments] = useState<Record<string, number | null>>({
    'char-1': null, // Paman Burhan -> 3
    'char-2': null, // Pak Joko -> 2
    'char-3': null  // Koh Aliong -> 1
  });
  const [matchingSubmitted, setMatchingSubmitted] = useState<boolean>(false);
  const [matchingScore, setMatchingScore] = useState<number>(0);

  // Misi 1.3 State: Aroma Sayur Sup
  const [selectedSoupChoice, setSelectedSoupChoice] = useState<number | null>(null);
  const [soupSubmitted, setSoupSubmitted] = useState<boolean>(false);

  // Handle Radar Submit
  const handleCheckRadar = () => {
    sound.playClick();
    if (radarRadius === 40) {
      sound.playCorrect();
      setRadarFeedback('Tepat sekali! Menurut mayoritas ulama dan hadits para sahabat, batas tetangga adalah hingga radius 40 rumah ke setiap arah penjuru angin.');
      setRadarAnswered(true);
      setStudent(prev => ({
        ...prev,
        score: prev.score + 150,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
      }));
    } else {
      sound.playIncorrect();
      setRadarFeedback(`Radius ${radarRadius} rumah belum tepat. Coba geser radar hingga angka radius yang disepakati mayoritas ulama (petunjuk: empat puluh rumah).`);
    }
  };

  // Handle Matching Submit
  const handleCheckMatching = () => {
    sound.playClick();
    let correctCount = 0;
    if (assignments['char-1'] === 3) correctCount++;
    if (assignments['char-2'] === 2) correctCount++;
    if (assignments['char-3'] === 1) correctCount++;

    setMatchingSubmitted(true);
    setMatchingScore(correctCount);

    if (correctCount === 3) {
      sound.playCorrect();
      setStudent(prev => ({
        ...prev,
        score: prev.score + 200,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
      }));
    } else {
      sound.playIncorrect();
    }
  };

  // Handle Soup Choice
  const handleChooseSoup = (choiceIdx: number) => {
    if (soupSubmitted) return;
    sound.playClick();
    setSelectedSoupChoice(choiceIdx);
  };

  const handleConfirmSoup = () => {
    if (selectedSoupChoice === null) return;
    setSoupSubmitted(true);
    if (selectedSoupChoice === 1) {
      sound.playCorrect();
      setStudent(prev => ({
        ...prev,
        score: prev.score + 150,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1),
        zoneProgress: { ...prev.zoneProgress, zone1: true },
        badges: prev.badges.includes('badge-tetangga') ? prev.badges : [...prev.badges, 'badge-tetangga']
      }));
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      sound.playIncorrect();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <button
          onClick={() => {
            sound.playClick();
            onBackToMap();
          }}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Desa</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Kemajuan Zona 1:</span>
          <div className="flex gap-1.5">
            {['misi1', 'misi2', 'misi3'].map((step, idx) => (
              <span
                key={step}
                className={`w-2.5 h-2.5 rounded-full ${
                  (idx === 0 && radarAnswered) ||
                  (idx === 1 && matchingSubmitted && matchingScore === 3) ||
                  (idx === 2 && soupSubmitted && selectedSoupChoice === 1)
                    ? 'bg-emerald-600'
                    : currentStage === step
                    ? 'bg-emerald-400'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Intro Stage */}
      {currentStage === 'intro' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                Zona 1 · Kampung Damai Kedungringin
              </span>
              <h2 className="text-2xl font-display font-extrabold text-slate-900">
                Akhlak Terhadap Tetangga
              </h2>
            </div>
          </div>

          {/* Dalil Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Dalil Pokok Akhlak Bertetangga:</span>
            </div>
            <div className="text-sm text-emerald-950 font-medium italic border-l-2 border-emerald-500 pl-3">
              "Dan berbuat baiklah kepada dua orang ibu-bapa, karib-kerabat, anak-anak yatim, orang-orang miskin, tetangga yang dekat dan tetangga yang jauh..."
              <span className="block text-xs font-semibold text-emerald-800 not-italic mt-1">— QS. An-Nisa: 36</span>
            </div>
            <div className="text-sm text-emerald-950 font-medium italic border-l-2 border-emerald-500 pl-3">
              "Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tetangganya."
              <span className="block text-xs font-semibold text-emerald-800 not-italic mt-1">— HR. Bukhari & Muslim</span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Tetangga adalah orang yang rumahnya berada di sekitar kediaman kita. Dalam Islam, memuliakan tetangga adalah salah satu tanda kesempurnaan iman kepada Allah dan hari akhir.
            </p>
            <p>
              Di zona ini, kamu akan menghadapi 3 misi seru:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 pl-2 font-medium text-slate-800">
              <li>Misi 1.1: Menentukan radius tetangga dengan <span className="text-emerald-700 font-bold">The 40-House Radar</span>.</li>
              <li>Misi 1.2: Memasangkan <span className="text-emerald-700 font-bold">3 Tingkatan Hak Tetangga</span> pada warga yang bertamu.</li>
              <li>Misi 1.3: Mengambil keputusan roleplay dalam <span className="text-emerald-700 font-bold">Aroma Sayur Sup</span>.</li>
            </ol>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentStage('misi1');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Mulai Misi 1.1: The 40-House Radar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Misi 1.1: The 40-House Radar */}
      {currentStage === 'misi1' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-700 uppercase">Misi 1.1</div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              The 40-House Radar (Radar Radius Tetangga)
            </h2>
            <p className="text-sm text-slate-600">
              Berapa radius batas seseorang disebut tetangga menurut mayoritas ulama dan sahabat Nabi SAW?
            </p>
          </div>

          {/* Interactive Radar Visualizer */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
            {/* Visual concentric radar rings */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Target 40 marker ring */}
              <div className="absolute w-52 h-52 rounded-full border border-dashed border-emerald-500/50 flex items-center justify-center">
                <span className="absolute top-1 text-[10px] text-emerald-400 font-mono">Batas 40 Rumah</span>
              </div>

              {/* Dynamic ring controlled by slider */}
              <div
                className={`rounded-full transition-all duration-200 flex items-center justify-center ${
                  radarRadius === 40
                    ? 'bg-emerald-500/25 border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.5)]'
                    : 'bg-teal-500/15 border border-teal-300/40'
                }`}
                style={{
                  width: `${(radarRadius / 50) * 220}px`,
                  height: `${(radarRadius / 50) * 220}px`
                }}
              >
                <div className="text-center">
                  <div className="font-mono font-bold text-lg text-emerald-300">
                    {radarRadius} Rumah
                  </div>
                  <div className="text-[10px] text-slate-300">ke 4 arah mata angin</div>
                </div>
              </div>

              {/* Center Player Home */}
              <div className="absolute z-10 w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg font-bold text-xs">
                🏠
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-400 text-center">
              Geser slider di bawah ini untuk mengatur radius jangkauan tetangga:
            </div>
          </div>

          {/* Radar Slider Control */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-slate-700">Pilihan Radius Radar:</span>
              <span className="text-emerald-700 font-mono text-base font-bold">{radarRadius} Rumah</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={radarRadius}
              disabled={radarAnswered}
              onChange={(e) => setRadarRadius(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>5 rumah</span>
              <span>20 rumah</span>
              <span className="text-emerald-700 font-bold">40 rumah</span>
              <span>50 rumah</span>
            </div>
          </div>

          {/* Feedback & Action */}
          {radarFeedback && (
            <div className={`p-4 rounded-xl text-sm font-medium ${
              radarAnswered ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}>
              {radarFeedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {!radarAnswered ? (
              <button
                onClick={handleCheckRadar}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                Kunci Jawaban Radar (+150 Skor)
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentStage('misi2');
                }}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Lanjut ke Misi 1.2: Matching Hak Tetangga</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Misi 1.2: Matching Hak Tetangga */}
      {currentStage === 'misi2' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-700 uppercase">Misi 1.2</div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Matching Hak Tetangga (3 Tingkatan Hak)
            </h2>
            <p className="text-sm text-slate-600">
              Ada 3 orang warga yang bertamu ke rumahmu. Pasangkan kartu hak yang sesuai dengan status masing-masing warga!
            </p>
          </div>

          {/* Quick learning tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1">
            <span className="font-bold">Pedoman Fiqih Hak Tetangga:</span>
            <ul className="list-disc list-inside space-y-0.5 mt-1 text-slate-700">
              <li><strong>Tetangga Muslim & Kerabat:</strong> Memiliki 3 Hak (Hak Tetangga + Hak Keislaman + Hak Kekerabatan).</li>
              <li><strong>Tetangga Muslim bukan kerabat:</strong> Memiliki 2 Hak (Hak Tetangga + Hak Keislaman).</li>
              <li><strong>Tetangga Non-Muslim:</strong> Memiliki 1 Hak (Hak Tetangga).</li>
            </ul>
          </div>

          {/* Character Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NEIGHBOR_CHARACTERS.map((char) => {
              const currentVal = assignments[char.id];
              const isCorrect = matchingSubmitted && currentVal === char.correctRights;
              const isWrong = matchingSubmitted && currentVal !== char.correctRights;

              return (
                <div
                  key={char.id}
                  className={`border rounded-2xl p-4 space-y-3 flex flex-col justify-between transition-all ${
                    isCorrect
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : isWrong
                      ? 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {char.religion}
                      </span>
                      {matchingSubmitted && (
                        isCorrect ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                            <Check className="w-4 h-4" /> Tepat!
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-bold text-rose-600">
                            <X className="w-4 h-4" /> {char.correctRights} Hak
                          </span>
                        )
                      )}
                    </div>

                    <div className="font-display font-bold text-base text-slate-900">
                      {char.name}
                    </div>
                    <div className="text-xs text-emerald-700 font-medium">
                      {char.relation}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {char.description}
                    </p>
                  </div>

                  {/* Rights Selection Pills */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-600">Pilih Jumlah Hak:</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          disabled={matchingSubmitted}
                          onClick={() => {
                            sound.playClick();
                            setAssignments(prev => ({ ...prev, [char.id]: num }));
                          }}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            currentVal === num
                              ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {num} Hak
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button */}
          <div className="flex items-center justify-between pt-2">
            {!matchingSubmitted ? (
              <button
                onClick={handleCheckMatching}
                disabled={Object.values(assignments).some(v => v === null)}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                Periksa Kecocokan Hak (+200 Skor)
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentStage('misi3');
                }}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Lanjut ke Misi 1.3: Aroma Sayur Sup</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Misi 1.3: Aroma Sayur Sup */}
      {currentStage === 'misi3' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-700 uppercase">Misi 1.3</div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Roleplay Scenario: "Aroma Sayur Sup"
            </h2>
            <p className="text-sm text-slate-600">
              Sore hari di Desa Kedungringin, ibu memasak sayur sup daging yang sangat lezat dan wangi.
            </p>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Soup className="w-5 h-5 text-emerald-700" />
              <span>Konteks Skenario:</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Aroma kaldu sup yang gurih dan hangat berhembus sampai ke teras rumah tetangga sebelah yang sedang duduk santai bersama anak-anaknya. Kamu teringat pesan Rasulullah SAW kepada sahabat Abu Dzar RA saat memasak masakan berkuah.
            </p>
            <div className="text-xs text-emerald-900 font-medium italic bg-white/70 p-2.5 rounded-lg border border-emerald-100">
              "Jika engkau memasak sayur berkuah, maka perbanyaklah air kuahnya, lalu perhatikanlah keluarga tetanggamu dan berilah mereka dengan cara yang baik." (HR. Muslim)
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase">
              Tindakan apakah yang paling mencerminkan akhlakul karimah?
            </div>

            {[
              {
                id: 0,
                label: 'A. Menutup semua pintu dan jendela rapat-rapat agar aromanya tidak tercium tetangga.',
                isCorrect: false,
                reason: 'Kurang tepat! Menutup jendela untuk pelit berbagi justru bertentangan dengan anjuran memuliakan tetangga.'
              },
              {
                id: 1,
                label: 'B. Menambahkan kuah air kaldu, menyendok semangkuk sup hangat, dan mengantarkannya dengan senyum ramah ke tetangga terdekat.',
                isCorrect: true,
                reason: 'Luar biasa! Inilah pengamalan sunnah Nabi SAW yang melipatgandakan kerukunan dan mendatangkan rida Allah (+150 Skor Barokah).'
              },
              {
                id: 2,
                label: 'C. Menghabiskan seluruh kuah sup bersama keluarga sendiri sampai perut kekenyangan tanpa peduli sekitar.',
                isCorrect: false,
                reason: 'Kurang tepat! Rasulullah SAW mengingatkan bahwa bukan termasuk orang beriman yang sempurna mereka yang kenyang sementara tetangganya lapar.'
              }
            ].map((opt) => (
              <button
                key={opt.id}
                disabled={soupSubmitted}
                onClick={() => handleChooseSoup(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                  selectedSoupChoice === opt.id
                    ? soupSubmitted
                      ? opt.isCorrect
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                        : 'border-rose-500 bg-rose-50 text-rose-900'
                      : 'border-emerald-600 bg-emerald-50/60 text-slate-900 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>{opt.label}</div>
                {soupSubmitted && selectedSoupChoice === opt.id && (
                  <div className={`mt-2 text-xs font-semibold ${opt.isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {opt.reason}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Confirm or Finish */}
          <div className="flex items-center justify-between pt-2">
            {!soupSubmitted ? (
              <button
                onClick={handleConfirmSoup}
                disabled={selectedSoupChoice === null}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                Pilih Keputusan Ini
              </button>
            ) : (
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Zona 1 Telah Berhasil Diselesaikan! Lencana Diraih!</span>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNextZone();
                  }}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Lanjut ke Zona 2: Taman Harmoni</span>
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
