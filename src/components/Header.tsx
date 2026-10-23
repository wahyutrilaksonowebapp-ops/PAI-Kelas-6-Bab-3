import React from 'react';
import { Volume2, VolumeX, ShieldCheck, Trophy, MapPin, BookOpen, MonitorPlay, Award } from 'lucide-react';
import { sound } from '../utils/sound';
import { AppMode, GameZone, StudentProfile } from '../types/game';

interface HeaderProps {
  currentZone: GameZone;
  setCurrentZone: (zone: GameZone) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  student: StudentProfile;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenDalil: () => void;
  onOpenCertificate: () => void;
  onOpenLeaderboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentZone,
  setCurrentZone,
  appMode,
  setAppMode,
  student,
  isMuted,
  setIsMuted,
  onOpenDalil,
  onOpenCertificate,
  onOpenLeaderboard
}) => {
  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text wordmark with school identity */}
        <button
          onClick={() => {
            sound.playClick();
            setAppMode('student');
            setCurrentZone('map');
          }}
          className="text-left whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
        >
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-emerald-800 group-hover:text-emerald-950 transition-colors">
            Desa Rukun
          </span>
          <span className="hidden sm:inline text-xs text-slate-500 ml-2 font-medium">
            SDN Kedungringin 1 Beji
          </span>
        </button>

        {/* Zone 2: Concise navigation links (single-line, clean typography) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              sound.playClick();
              setAppMode('student');
              setCurrentZone('map');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-emerald-800 ${
              appMode === 'student' && currentZone === 'map' ? 'text-emerald-700 font-bold' : ''
            }`}
          >
            Peta Petualangan
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-emerald-800"
          >
            Papan Peringkat
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenDalil();
            }}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-emerald-800"
          >
            Kumpulan Dalil
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setAppMode(appMode === 'teacher' ? 'student' : 'teacher');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-indigo-800 ${
              appMode === 'teacher' ? 'text-indigo-700 font-bold' : ''
            }`}
          >
            Command Center Guru
          </button>
        </nav>

        {/* Zone 3: 1 primary action group */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>

          {/* Student Status or Mode Button */}
          {appMode === 'student' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenLeaderboard();
                }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold transition-colors"
              >
                <Trophy className="w-4 h-4 text-amber-600" />
                <span className="tabular-nums">{student.score} Poin</span>
              </button>

              {student.badges.includes('badge-ksatria') && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenCertificate();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                >
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">Sertifikat</span>
                </button>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  setAppMode('teacher');
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              >
                Mode Guru
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                setAppMode('student');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Kembali ke Game Siswa
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
