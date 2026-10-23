import React from 'react';
import { StudentProfile } from '../types/game';
import { sound } from '../utils/sound';
import { Trophy, Flame, X, Award, CheckCircle2 } from 'lucide-react';

interface LeaderboardViewProps {
  students: StudentProfile[];
  currentStudentId: string;
  onClose: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  students,
  currentStudentId,
  onClose
}) => {
  const sorted = [...students].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-slate-900">
                Papan Peringkat "Skor Barokah"
              </h2>
              <p className="text-xs text-slate-500">
                Kelas 6 SDN Kedungringin 1 Beji Pasuruan
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="p-4 overflow-y-auto space-y-2 divide-y divide-slate-100">
          {sorted.map((std, idx) => {
            const isSelf = std.id === currentStudentId;
            const rank = idx + 1;

            return (
              <div
                key={std.id}
                className={`pt-2 flex items-center justify-between p-3 rounded-xl transition-colors ${
                  isSelf
                    ? 'bg-emerald-50 border border-emerald-300 shadow-sm'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs font-mono tabular-nums ${
                      rank === 1
                        ? 'bg-amber-400 text-slate-950'
                        : rank === 2
                        ? 'bg-slate-300 text-slate-900'
                        : rank === 3
                        ? 'bg-amber-700/80 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    #{rank}
                  </span>

                  <span className="text-2xl">{std.avatar}</span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {std.name}
                      </span>
                      {isSelf && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Kamu
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                        <Flame className="w-3 h-3 fill-amber-500" />
                        <span>Streak: {std.maxStreak}x</span>
                      </span>
                      <span>·</span>
                      <span>{std.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-black text-base text-slate-900 tabular-nums">
                    {std.score} Poin
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    {std.zoneProgress.boss ? '👑 Ksatria' : `${std.badges.length} Lencana`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
