import React, { useState } from 'react';
import { StudentProfile, LearningGap } from '../types/game';
import { INITIAL_LEARNING_GAPS, BADGES } from '../data/gameContent';
import { sound } from '../utils/sound';
import { 
  Users, 
  BarChart3, 
  MonitorPlay, 
  AlertTriangle, 
  CheckCircle2, 
  Trophy, 
  Search, 
  RefreshCw, 
  Printer, 
  Award, 
  ShieldCheck, 
  School,
  Maximize2,
  Minimize2,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface TeacherDashboardProps {
  students: StudentProfile[];
  onSelectStudentForCertificate: (student: StudentProfile) => void;
  onResetClassScores: () => void;
  onBackToStudentGame: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  students,
  onSelectStudentForCertificate,
  onResetClassScores,
  onBackToStudentGame
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'roster' | 'projector'>('analytics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [learningGaps, setLearningGaps] = useState<LearningGap[]>(INITIAL_LEARNING_GAPS);
  const [isProjectorFullscreen, setIsProjectorFullscreen] = useState<boolean>(false);

  // Filter students based on search query
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorted students by score descending
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);

  // Overall class statistics
  const totalClass = students.length;
  const completedBoss = students.filter(s => s.zoneProgress.boss).length;
  const inZone3 = students.filter(s => s.zoneProgress.zone3 && !s.zoneProgress.boss).length;
  const inZone2 = students.filter(s => s.zoneProgress.zone2 && !s.zoneProgress.zone3).length;
  const inZone1 = students.filter(s => s.zoneProgress.zone1 && !s.zoneProgress.zone2).length;
  const averageScore = Math.round(students.reduce((acc, s) => acc + s.score, 0) / (totalClass || 1));

  return (
    <div className={`space-y-6 ${isProjectorFullscreen ? 'fixed inset-0 z-50 bg-slate-950 text-white p-6 overflow-y-auto' : 'max-w-7xl mx-auto px-4 py-8'}`}>
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Teacher Command Center · Kelas 6 PAI
              </span>
              <span className="text-xs font-medium text-slate-500">
                SDN Kedungringin 1 Beji Pasuruan
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-slate-900">
              Dashboard Guru & Analisis Pembelajaran
            </h1>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('analytics');
                setIsProjectorFullscreen(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Analisis Gap
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('roster');
                setIsProjectorFullscreen(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'roster'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daftar Siswa ({totalClass})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('projector');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'projector'
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <MonitorPlay className="w-3.5 h-3.5" />
              <span>Mode Proyektor Kelas</span>
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onBackToStudentGame();
            }}
            className="px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
          >
            Game Siswa
          </button>
        </div>
      </div>

      {/* KPI Class Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Jumlah Siswa Terdaftar</div>
          <div className="text-2xl font-display font-extrabold text-slate-900 mt-1 tabular-nums">
            {totalClass} Siswa
          </div>
          <div className="text-xs text-slate-500 mt-1">Kelas 6 SDN Kedungringin 1</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Rata-rata Skor Barokah</div>
          <div className="text-2xl font-display font-extrabold text-indigo-700 mt-1 tabular-nums">
            {averageScore}
          </div>
          <div className="text-xs text-indigo-600 font-medium mt-1">Target KKM: 1.200 Poin</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Tuntas Boss Monster Egois</div>
          <div className="text-2xl font-display font-extrabold text-emerald-700 mt-1 tabular-nums">
            {completedBoss} / {totalClass}
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-1">
            {Math.round((completedBoss / (totalClass || 1)) * 100)}% Kelulusan Penuh
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Tingkat Retensi Dalil</div>
          <div className="text-2xl font-display font-extrabold text-amber-700 mt-1 tabular-nums">
            86.4%
          </div>
          <div className="text-xs text-amber-700 font-medium mt-1">QS. An-Nisa & Al-Mumtahanah</div>
        </div>
      </div>

      {/* TAB 1: ANALYTICS & LEARNING GAPS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Live Progress Stage of Class in Village Map */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  Sebaran Siswa di Peta Petualangan Desa
                </h3>
                <p className="text-xs text-slate-500">
                  Pantau pergerakan siswa secara langsung di setiap pos zona pembelajaran
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Zona 1: Tetangga</span>
                  <span className="text-emerald-700">{inZone1} Siswa</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(inZone1 / totalClass) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500">40 Rumah & Hak Tetangga</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Zona 2: Harmoni</span>
                  <span className="text-blue-700">{inZone2} Siswa</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${(inZone2 / totalClass) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500">Toleransi & Sandi Ayat 8</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Zona 3: Satwa</span>
                  <span className="text-amber-700">{inZone3} Siswa</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full"
                    style={{ width: `${(inZone3 / totalClass) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500">Bela Rasa & Adab Ihsan</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Arena Final Boss</span>
                  <span className="text-purple-700">{completedBoss} Siswa</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full"
                    style={{ width: `${(completedBoss / totalClass) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500">Ksatria Akhlakul Karimah</div>
              </div>
            </div>
          </div>

          {/* Learning Gap Analysis */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Analisis Learning Gap (Kesenjangan Konsep Siswa)
              </h3>
              <p className="text-xs text-slate-500">
                Data diagnostik otomatis berdasarkan persentase kesalahan siswa di setiap materi dalil
              </p>
            </div>

            <div className="space-y-4">
              {learningGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className={`border rounded-xl p-4.5 space-y-3 transition-colors ${
                    gap.status === 'critical'
                      ? 'border-rose-300 bg-rose-50/40'
                      : gap.status === 'moderate'
                      ? 'border-amber-300 bg-amber-50/40'
                      : 'border-emerald-200 bg-emerald-50/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          gap.status === 'critical'
                            ? 'bg-rose-100 text-rose-800'
                            : gap.status === 'moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {gap.topic}
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          {gap.affectedCount} dari {gap.totalTested} siswa mengalami kesulitan
                        </span>
                      </div>
                      <div className="font-bold text-sm text-slate-900 mt-1">
                        {gap.concept}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs text-slate-500">Tingkat Kekeliruan</div>
                      <div className={`text-xl font-black font-mono tabular-nums ${
                        gap.status === 'critical' ? 'text-rose-600' : gap.status === 'moderate' ? 'text-amber-600' : 'text-emerald-700'
                      }`}>
                        {gap.failureRate}%
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Box */}
                  <div className="bg-white/80 border border-slate-200/80 rounded-lg p-3 text-xs text-slate-700 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Rekomendasi Tindak Lanjut Guru:</strong> {gap.recommendation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROSTER & INDIVIDUAL REPORT */}
      {activeTab === 'roster' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Daftar Capaian Siswa Kelas 6 SDN Kedungringin 1
              </h3>
              <p className="text-xs text-slate-500">
                Pilih siswa untuk melihat rincian jawaban atau mencetak Sertifikat Ksatria Akhlakul Karimah
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari nama siswa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 w-48 sm:w-64"
                />
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onResetClassScores();
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                title="Reset Skor untuk Sesi Pembelajaran Baru"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Skor Sesi</span>
              </button>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Peringkat</th>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Skor Barokah</th>
                  <th className="py-3 px-4">Combo Tertinggi</th>
                  <th className="py-3 px-4">Status Posisi Misi</th>
                  <th className="py-3 px-4">Lencana Diperoleh</th>
                  <th className="py-3 px-4 text-right">Aksi Guru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredStudents.map((std, idx) => (
                  <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                      #{idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{std.avatar}</span>
                        <span className="font-bold text-slate-900">{std.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-black text-emerald-800 tabular-nums text-sm">
                      {std.score}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums">
                      {std.maxStreak}x
                    </td>
                    <td className="py-3 px-4">
                      {std.zoneProgress.boss ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Tuntas Penuh
                        </span>
                      ) : std.zoneProgress.zone3 ? (
                        <span className="text-amber-700 font-semibold">Menghadapi Boss</span>
                      ) : std.zoneProgress.zone2 ? (
                        <span className="text-blue-700 font-semibold">Di Zona 3 Satwa</span>
                      ) : (
                        <span className="text-slate-600 font-semibold">Di Zona 1/2</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {std.badges.map((bId) => (
                          <span
                            key={bId}
                            className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center"
                            title={BADGES.find(b => b.id === bId)?.title}
                          >
                            ✓
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          sound.playClick();
                          onSelectStudentForCertificate(std);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 hover:text-white bg-emerald-50 hover:bg-emerald-700 rounded-lg transition-colors border border-emerald-200 hover:border-emerald-700"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Cetak Sertifikat</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTOR FULLSCREEN LIVE MODE FOR CLASSROOM */}
      {activeTab === 'projector' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Layar Proyektor Kelas · SDN Kedungringin 1 Beji
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                Live Leaderboard "Skor Barokah" Kelas 6
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsProjectorFullscreen(!isProjectorFullscreen)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                {isProjectorFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span>{isProjectorFullscreen ? 'Keluar Fullscreen' : 'Fullscreen Proyektor'}</span>
              </button>
            </div>
          </div>

          {/* Podium Top 3 */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {/* 2nd Place */}
            {sortedStudents[1] && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center flex flex-col justify-end items-center h-48 order-1">
                <div className="text-3xl mb-1">{sortedStudents[1].avatar}</div>
                <div className="font-display font-bold text-sm text-slate-200 truncate max-w-full">
                  {sortedStudents[1].name}
                </div>
                <div className="text-xs text-amber-300 font-mono font-bold tabular-nums">
                  {sortedStudents[1].score} Poin
                </div>
                <div className="mt-2 w-full py-1.5 bg-slate-700/80 rounded-lg text-xs font-black text-slate-300">
                  🥈 Juara 2
                </div>
              </div>
            )}

            {/* 1st Place */}
            {sortedStudents[0] && (
              <div className="bg-gradient-to-t from-amber-950/60 to-slate-800 border-2 border-amber-400 rounded-2xl p-4 text-center flex flex-col justify-end items-center h-56 order-2 shadow-lg shadow-amber-500/10">
                <div className="text-amber-400 mb-1">
                  <Trophy className="w-6 h-6 mx-auto animate-bounce" />
                </div>
                <div className="text-4xl mb-1">{sortedStudents[0].avatar}</div>
                <div className="font-display font-black text-base text-amber-200 truncate max-w-full">
                  {sortedStudents[0].name}
                </div>
                <div className="text-sm text-amber-400 font-mono font-black tabular-nums">
                  {sortedStudents[0].score} Poin
                </div>
                <div className="mt-2 w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-lg text-xs font-black">
                  👑 JUARA 1
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {sortedStudents[2] && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center flex flex-col justify-end items-center h-44 order-3">
                <div className="text-3xl mb-1">{sortedStudents[2].avatar}</div>
                <div className="font-display font-bold text-sm text-slate-200 truncate max-w-full">
                  {sortedStudents[2].name}
                </div>
                <div className="text-xs text-amber-300 font-mono font-bold tabular-nums">
                  {sortedStudents[2].score} Poin
                </div>
                <div className="mt-2 w-full py-1 bg-amber-900/40 rounded-lg text-xs font-black text-amber-400">
                  🥉 Juara 3
                </div>
              </div>
            )}
          </div>

          {/* Rest of the Class in High Legibility List */}
          <div className="space-y-2 mt-4">
            {sortedStudents.slice(3).map((std, idx) => (
              <div
                key={std.id}
                className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-400 w-6">#{idx + 4}</span>
                  <span className="text-xl">{std.avatar}</span>
                  <span className="font-semibold text-slate-100">{std.name}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400 font-mono">Streak: {std.maxStreak}x</span>
                  <span className="font-mono font-black text-amber-400 tabular-nums">
                    {std.score} Poin
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
