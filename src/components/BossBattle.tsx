import React, { useState } from 'react';
import { StudentProfile } from '../types/game';
import { BOSS_QUESTIONS } from '../data/gameContent';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Crown, 
  Flame, 
  ShieldAlert, 
  Zap, 
  Award, 
  Trophy, 
  Check, 
  X, 
  RotateCcw,
  Sparkles,
  Printer
} from 'lucide-react';

interface BossBattleProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onBackToMap: () => void;
  onOpenCertificate: () => void;
  onOpenLeaderboard: () => void;
}

export const BossBattle: React.FC<BossBattleProps> = ({
  student,
  setStudent,
  onBackToMap,
  onOpenCertificate,
  onOpenLeaderboard
}) => {
  const [bossHp, setBossHp] = useState<number>(1000);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [lastDamage, setLastDamage] = useState<number | null>(null);
  const [bossAnimation, setBossAnimation] = useState<'idle' | 'hit' | 'roar'>('idle');
  const [isDefeated, setIsDefeated] = useState<boolean>(false);

  const currentQ = BOSS_QUESTIONS[currentQIndex];

  // Calculate combo multiplier
  const getMultiplier = (streak: number): number => {
    if (streak >= 5) return 2.5;
    if (streak >= 3) return 2.0;
    if (streak >= 1) return 1.5;
    return 1.0;
  };

  const handleSelectAnswer = (idx: number) => {
    if (isAnswerSubmitted || isDefeated) return;
    sound.playClick();
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    const mult = getMultiplier(student.streak);
    const damage = Math.round(100 * mult);

    if (isCorrect) {
      sound.playBossHit();
      setBossAnimation('hit');
      setLastDamage(damage);
      const nextHp = Math.max(0, bossHp - damage);
      setBossHp(nextHp);

      const nextStreak = student.streak + 1;
      const scoreGain = Math.round(100 * mult);

      setStudent(prev => ({
        ...prev,
        score: prev.score + scoreGain,
        streak: nextStreak,
        maxStreak: Math.max(prev.maxStreak, nextStreak),
        answers: { ...prev.answers, [currentQ.id]: true }
      }));

      setTimeout(() => setBossAnimation('idle'), 500);

      // Check if boss defeated or last question
      if (nextHp === 0 || currentQIndex === BOSS_QUESTIONS.length - 1) {
        setIsDefeated(true);
        sound.playVictory();
        setStudent(prev => ({
          ...prev,
          zoneProgress: { ...prev.zoneProgress, boss: true },
          badges: prev.badges.includes('badge-ksatria') ? prev.badges : [...prev.badges, 'badge-ksatria']
        }));
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    } else {
      sound.playIncorrect();
      setBossAnimation('roar');
      setStudent(prev => ({
        ...prev,
        streak: 0,
        answers: { ...prev.answers, [currentQ.id]: false }
      }));
      setTimeout(() => setBossAnimation('idle'), 600);
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setLastDamage(null);

    if (currentQIndex + 1 < BOSS_QUESTIONS.length && bossHp > 0) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setIsDefeated(true);
      sound.playVictory();
      setStudent(prev => ({
        ...prev,
        zoneProgress: { ...prev.zoneProgress, boss: true },
        badges: prev.badges.includes('badge-ksatria') ? prev.badges : [...prev.badges, 'badge-ksatria']
      }));
    }
  };

  const handleRestartBattle = () => {
    sound.playClick();
    setBossHp(1000);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setLastDamage(null);
    setIsDefeated(false);
  };

  const hpPercentage = Math.round((bossHp / 1000) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <button
          onClick={() => {
            sound.playClick();
            onBackToMap();
          }}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-purple-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Desa</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Babak Final SDN Kedungringin 1
          </span>
        </div>
      </div>

      {/* Boss Stage Arena */}
      <div className="bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl border border-purple-500/30">
        {/* Boss Status Bar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">👹</span>
              <div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-amber-300 tracking-tight">
                  MONSTER EGOIS
                </h2>
                <div className="text-xs text-purple-300">
                  Penyebar sifat serakah & perusak kerukunan desa
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-purple-300">Darah Boss (HP)</div>
                <div className="text-lg font-black font-mono text-rose-400 tabular-nums">
                  {bossHp} / 1000 HP
                </div>
              </div>
            </div>
          </div>

          {/* HP Bar */}
          <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-purple-400/40">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                hpPercentage > 50
                  ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                  : hpPercentage > 20
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-rose-600 animate-pulse'
              }`}
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
        </div>

        {/* Visual Boss Canvas / Hit Reaction */}
        <div className="relative py-8 flex flex-col items-center justify-center min-h-[160px]">
          <div
            className={`text-7xl sm:text-8xl transition-all duration-200 select-none ${
              bossAnimation === 'hit'
                ? 'scale-90 rotate-6 translate-y-2 opacity-80 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]'
                : bossAnimation === 'roar'
                ? 'scale-110 -rotate-3 filter drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]'
                : 'hover:scale-105'
            }`}
          >
            {isDefeated ? '✨🕊️✨' : '👹'}
          </div>

          {/* Floating Damage Marker */}
          {lastDamage !== null && (
            <div className="absolute top-2 animate-bounce bg-rose-600 text-white font-black text-sm px-3 py-1 rounded-full shadow-lg border border-white/20">
              -{lastDamage} HP!
            </div>
          )}

          {/* Combo Multiplier Meter */}
          <div className="mt-4 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Streak Serangan: {student.streak}x</span>
            <span className="text-amber-300 ml-1">
              (Pengali: x{getMultiplier(student.streak).toFixed(1)})
            </span>
          </div>
        </div>
      </div>

      {/* Question / Battle Interaction Section */}
      {!isDefeated ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center">
                {currentQIndex + 1}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Soal {currentQIndex + 1} dari {BOSS_QUESTIONS.length} · Topik: {currentQ.category.toUpperCase()}
              </span>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              +{Math.round(100 * getMultiplier(student.streak))} Poin Serangan
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = isAnswerSubmitted && idx === currentQ.correctAnswer;
              const isWrongSelection = isAnswerSubmitted && isSelected && idx !== currentQ.correctAnswer;

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${
                    isCorrect
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30'
                      : isWrongSelection
                      ? 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/30'
                      : isSelected
                      ? 'border-purple-600 bg-purple-50 text-purple-950 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center ${
                      isSelected ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswerSubmitted && (
                    isCorrect ? (
                      <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : isWrongSelection ? (
                      <X className="w-5 h-5 text-rose-600 shrink-0" />
                    ) : null
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl text-sm font-medium ${
              selectedAnswer === currentQ.correctAnswer
                ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                : 'bg-rose-50 text-rose-950 border border-rose-200'
            }`}>
              <div className="font-bold mb-1">
                {selectedAnswer === currentQ.correctAnswer ? 'Serangan Akhlak Berhasil!' : 'Jawaban Kurang Tepat!'}
              </div>
              <p className="text-xs leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-between pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Lancarkan Serangan Jawaban!</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                {currentQIndex + 1 < BOSS_QUESTIONS.length && bossHp > 0
                  ? 'Soal Selanjutnya'
                  : 'Lihat Hasil Kemenangan!'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Victory Modal / Card */
        <div className="bg-white border-2 border-amber-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center text-4xl shadow-inner">
            <Crown className="w-10 h-10 text-amber-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Kemenangan Sempurna!
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
              Monster Egois Telah Ditaklukkan!
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Selamat untuk <strong className="text-slate-900">{student.name}</strong>! Dengan kekuatan dalil akhlak kepada tetangga, saudara non-muslim, dan kasih sayang pada satwa, kedamaian di Desa Kedungringin telah pulih sepenuhnya!
            </p>
          </div>

          {/* Final Score & Badge Earned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="text-xs text-amber-800 font-semibold">Total Skor Barokah</div>
              <div className="text-3xl font-black text-amber-900 tabular-nums font-mono mt-1">
                {student.score}
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="text-xs text-emerald-800 font-semibold">Gelar Tertinggi Diraih</div>
              <div className="text-sm font-bold text-emerald-950 mt-1">
                Ksatria Akhlakul Karimah SDN Kedungringin 1
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan Sertifikat Resmi</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenLeaderboard();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow"
            >
              <Trophy className="w-4 h-4" />
              <span>Cek Posisi di Leaderboard Kelas</span>
            </button>

            <button
              onClick={handleRestartBattle}
              className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tanding Ulang</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
