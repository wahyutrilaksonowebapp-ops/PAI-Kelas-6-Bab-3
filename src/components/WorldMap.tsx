import React from 'react';
import { GameZone, StudentProfile } from '../types/game';
import { BADGES } from '../data/gameContent';
import { sound } from '../utils/sound';
import { 
  Home, 
  HeartHandshake, 
  Sparkles, 
  Flame, 
  Crown, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  School,
  Trophy,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

interface WorldMapProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onSelectZone: (zone: GameZone) => void;
  onOpenLeaderboard: () => void;
  onOpenDalil: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  student,
  setStudent,
  onSelectZone,
  onOpenLeaderboard,
  onOpenDalil
}) => {
  const AVATAR_OPTIONS = ['👦', '🧕', '🧑‍🎓', '👧', '🧒', '🌟'];

  const getActiveTitle = (): string => {
    if (student.badges.includes('badge-ksatria')) return 'Ksatria Akhlakul Karimah';
    if (student.badges.includes('badge-toleransi')) return 'Duta Toleransi Beji';
    if (student.badges.includes('badge-satwa')) return 'Penyayang Satwa';
    if (student.badges.includes('badge-tetangga')) return 'Tetangga Idaman';
    return 'Santri Petualang Beji';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Welcome & Student Banner */}
      <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Subtle decorative background village graphic overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between items-end px-4">
          <div className="w-48 h-32 border-b-2 border-emerald-400"></div>
          <div className="w-64 h-40 border-b-2 border-emerald-400"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
              <School className="w-4 h-4" />
              <span>PAI Kelas 6 · SDN Kedungringin 1 Beji Pasuruan</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shadow-inner cursor-pointer hover:bg-white/20 transition-all">
                  {student.avatar}
                </div>
                {/* Quick avatar selector dropdown on hover */}
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 hidden group-hover:flex gap-1 z-30">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      onClick={() => {
                        sound.playClick();
                        setStudent(prev => ({ ...prev, avatar: av }));
                      }}
                      className="w-8 h-8 rounded hover:bg-emerald-50 text-lg flex items-center justify-center transition-colors"
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => setStudent(prev => ({ ...prev, name: e.target.value }))}
                    className="font-display text-2xl sm:text-3xl font-extrabold bg-transparent text-white border-b border-transparent hover:border-emerald-400/50 focus:border-emerald-400 focus:outline-none transition-colors max-w-[260px] sm:max-w-md"
                    placeholder="Nama Siswa..."
                    title="Klik untuk mengubah nama"
                  />
                </div>
                <div className="text-emerald-300 text-sm font-medium flex items-center gap-2 mt-0.5">
                  <span>Gelar:</span>
                  <span className="text-amber-300 font-bold">{getActiveTitle()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Barokah Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
              <div className="text-emerald-300 text-xs font-medium">Skor Barokah</div>
              <div className="text-2xl font-black text-amber-300 tabular-nums">
                {student.score}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
              <div className="text-emerald-300 text-xs font-medium">Combo Streak</div>
              <div className="text-2xl font-black text-rose-300 flex items-center justify-center gap-1 tabular-nums">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                {student.streak}x
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
              <div className="text-emerald-300 text-xs font-medium">Lencana Raih</div>
              <div className="text-2xl font-black text-emerald-200 tabular-nums">
                {student.badges.length}/4
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Mission Map Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Peta Misi Desa Kedungringin
            </h2>
            <p className="text-sm text-slate-500">
              Selesaikan 3 Zona Akhlakul Karimah untuk membuka Babak Final melawan Monster Egois!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenDalil();
              }}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Rangkuman Dalil
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenLeaderboard();
              }}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              Live Leaderboard
            </button>
          </div>
        </div>

        {/* 3 Zones + Final Boss Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Zona 1: Kampung Damai */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Home className="w-6 h-6" />
                </div>
                {student.zoneProgress.zone1 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4" /> Tuntas
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    Zona 1
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Zona 1: Kampung Damai
                </h3>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                  Akhlak Terhadap Tetangga
                </p>
                <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                  Pahami batas 40 rumah, bedakan hak tetangga muslim kerabat vs non-muslim, dan wujudkan kepedulian berbagi kuah sup hangat.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-600">
                <div className="font-semibold text-slate-700">Misi Interaktif:</div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Misi 1.1: The 40-House Radar (Mini-puzzle)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Misi 1.2: Matching Hak Tetangga (Drag & Drop)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Misi 1.3: Aroma Sayur Sup (Roleplay)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectZone('zone1');
                }}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>{student.zoneProgress.zone1 ? 'Mainkan Ulang Zona 1' : 'Mulai Petualangan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Zona 2: Taman Harmoni */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                {student.zoneProgress.zone2 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4" /> Tuntas
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    Zona 2
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Zona 2: Taman Harmoni
                </h3>
                <p className="text-xs text-blue-700 font-medium mt-0.5">
                  Akhlak Terhadap Non-Muslim
                </p>
                <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                  Toleransi sosial tanpa mengorbankan akidah. Pecahkan sandi rahasia QS. Al-Mumtahanah: 8 dan hadapi dilema moral di Gang Mangga.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-600">
                <div className="font-semibold text-slate-700">Misi Interaktif:</div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Misi 2.1: Menjaga Harmoni Gang Mangga</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Misi 2.2: Cipher Ayat Al-Mumtahanah 8</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Prinsip Toleransi QS. Al-Kafirun 6</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectZone('zone2');
                }}
                className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>{student.zoneProgress.zone2 ? 'Mainkan Ulang Zona 2' : 'Masuk Zona 2'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Zona 3: Safari Bela Rasa */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                {student.zoneProgress.zone3 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4" /> Tuntas
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    Zona 3
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Zona 3: Safari Bela Rasa
                </h3>
                <p className="text-xs text-amber-700 font-medium mt-0.5">
                  Akhlak Terhadap Hewan
                </p>
                <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                  Selamatkan anak kucing kehausan dekat sungai Kedungringin dan buktikan ketangkasanmu dalam kuis cepat adab menyayangi hewan.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-600">
                <div className="font-semibold text-slate-700">Misi Interaktif:</div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Misi 3.1: Emergency Rescue (Anak Kucing)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Misi 3.2: True or False: Sahabat Alam</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Hikmah Ihsan & Ampunan Allah</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectZone('zone3');
                }}
                className="w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>{student.zoneProgress.zone3 ? 'Mainkan Ulang Zona 3' : 'Masuk Zona 3'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Babak Final Banner: Battle of the Champions */}
        <div className="mt-8 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 border border-purple-500/30 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full text-xs font-semibold">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Babak Puncak Kelas 6
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-amber-300">
                Battle of the Champions: Kalahkan "Monster Egois"!
              </h3>
              <p className="text-sm text-purple-200/90 leading-relaxed">
                Monster Egois sedang menyebarkan sifat serakah, acuh tak acuh kepada tetangga, dan kekerasan pada hewan di Desa Kedungringin! Jawab 10 dalil & kasus akhlak secara tepat untuk melancarkan serangan ihsan serentak!
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center sm:items-end gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectZone('boss');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5 text-slate-950" />
                <span>Masuk Arena Boss Fight!</span>
              </button>
              <span className="text-xs text-purple-300 font-medium">
                {student.zoneProgress.boss ? '🎉 Gelar Ksatria Telah Diraih!' : 'Tantang Kuis Komprehensif'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lencana & Gelar Showcase */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700" />
            Lencana & Gelar Dinamis
          </h3>
          <span className="text-xs text-slate-500">
            Terbuka otomatis saat menyelesaikan misi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {BADGES.map((b) => {
            const isEarned = student.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl border transition-all ${
                  isEarned
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                    : 'bg-slate-50/70 border-slate-200 opacity-60 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isEarned ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {b.id === 'badge-tetangga' && <Home className="w-4 h-4" />}
                    {b.id === 'badge-toleransi' && <HeartHandshake className="w-4 h-4" />}
                    {b.id === 'badge-satwa' && <Sparkles className="w-4 h-4" />}
                    {b.id === 'badge-ksatria' && <Crown className="w-4 h-4" />}
                  </div>
                  {isEarned ? (
                    <span className="text-[11px] font-bold text-emerald-700">Raih</span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                <div className="font-bold text-sm text-slate-900">{b.title}</div>
                <div className="text-xs text-slate-600 mt-1 line-clamp-2">{b.description}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
