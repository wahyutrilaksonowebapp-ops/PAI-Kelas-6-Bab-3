/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameZone, AppMode, StudentProfile } from './types/game';
import { INITIAL_CLASSMATES } from './data/gameContent';
import { sound } from './utils/sound';
import { Header } from './components/Header';
import { WorldMap } from './components/WorldMap';
import { ZoneKampungDamai } from './components/ZoneKampungDamai';
import { ZoneTamanHarmoni } from './components/ZoneTamanHarmoni';
import { ZoneSafariBelaRasa } from './components/ZoneSafariBelaRasa';
import { BossBattle } from './components/BossBattle';
import { TeacherDashboard } from './components/TeacherDashboard';
import { LeaderboardView } from './components/LeaderboardView';
import { CertificateModal } from './components/CertificateModal';
import { DalilReferenceModal } from './components/DalilReferenceModal';

export default function App() {
  const [currentZone, setCurrentZone] = useState<GameZone>('map');
  const [appMode, setAppMode] = useState<AppMode>('student');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Modals state
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isDalilOpen, setIsDalilOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [certificateStudent, setCertificateStudent] = useState<StudentProfile | null>(null);

  // Active student profile (persisted in local storage)
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('desa_rukun_student');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      id: 'current-player',
      name: 'Santri Kedungringin',
      avatar: '👦',
      score: 0,
      streak: 0,
      maxStreak: 0,
      zoneProgress: {
        zone1: false,
        zone2: false,
        zone3: false,
        boss: false
      },
      badges: [],
      lastActive: 'Aktif sekarang',
      answers: {}
    };
  });

  // Classmate roster (persisted in local storage)
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem('desa_rukun_classmates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_CLASSMATES;
  });

  // Save student updates
  useEffect(() => {
    localStorage.setItem('desa_rukun_student', JSON.stringify(student));
    // Also keep student updated in students roster
    setStudents(prev => {
      const idx = prev.findIndex(s => s.id === student.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = student;
        return next;
      } else {
        return [student, ...prev];
      }
    });
  }, [student]);

  // Save classmates updates
  useEffect(() => {
    localStorage.setItem('desa_rukun_classmates', JSON.stringify(students));
  }, [students]);

  const handleResetScores = () => {
    const freshStudent: StudentProfile = {
      id: 'current-player',
      name: student.name,
      avatar: student.avatar,
      score: 0,
      streak: 0,
      maxStreak: 0,
      zoneProgress: {
        zone1: false,
        zone2: false,
        zone3: false,
        boss: false
      },
      badges: [],
      lastActive: 'Aktif sekarang',
      answers: {}
    };
    setStudent(freshStudent);
    setStudents(INITIAL_CLASSMATES);
    sound.playClick();
  };

  const handleOpenCertificateFor = (std: StudentProfile) => {
    setCertificateStudent(std);
    setIsCertificateOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Universal Top Bar */}
      <Header
        currentZone={currentZone}
        setCurrentZone={setCurrentZone}
        appMode={appMode}
        setAppMode={setAppMode}
        student={student}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenDalil={() => setIsDalilOpen(true)}
        onOpenCertificate={() => handleOpenCertificateFor(student)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* Main App Content */}
      <main className="flex-1 pb-16">
        {appMode === 'teacher' ? (
          <TeacherDashboard
            students={students}
            onSelectStudentForCertificate={handleOpenCertificateFor}
            onResetClassScores={handleResetScores}
            onBackToStudentGame={() => {
              setAppMode('student');
              setCurrentZone('map');
            }}
          />
        ) : (
          <>
            {currentZone === 'map' && (
              <WorldMap
                student={student}
                setStudent={setStudent}
                onSelectZone={(zone) => setCurrentZone(zone)}
                onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
                onOpenDalil={() => setIsDalilOpen(true)}
              />
            )}

            {currentZone === 'zone1' && (
              <ZoneKampungDamai
                student={student}
                setStudent={setStudent}
                onBackToMap={() => setCurrentZone('map')}
                onNextZone={() => setCurrentZone('zone2')}
              />
            )}

            {currentZone === 'zone2' && (
              <ZoneTamanHarmoni
                student={student}
                setStudent={setStudent}
                onBackToMap={() => setCurrentZone('map')}
                onNextZone={() => setCurrentZone('zone3')}
              />
            )}

            {currentZone === 'zone3' && (
              <ZoneSafariBelaRasa
                student={student}
                setStudent={setStudent}
                onBackToMap={() => setCurrentZone('map')}
                onGoToBoss={() => setCurrentZone('boss')}
              />
            )}

            {currentZone === 'boss' && (
              <BossBattle
                student={student}
                setStudent={setStudent}
                onBackToMap={() => setCurrentZone('map')}
                onOpenCertificate={() => handleOpenCertificateFor(student)}
                onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Quiet, Clean Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-800">Desa Rukun: Kedungringin Adventure</span>
            <span>·</span>
            <span>Media Pembelajaran PAI & BP Kelas 6</span>
          </div>
          <div>
            UPT Satuan Pendidikan SDN Kedungringin 1 Beji, Pasuruan, Jawa Timur
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isLeaderboardOpen && (
        <LeaderboardView
          students={students}
          currentStudentId={student.id}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}

      {isDalilOpen && (
        <DalilReferenceModal
          onClose={() => setIsDalilOpen(false)}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          student={certificateStudent || student}
          onClose={() => {
            setIsCertificateOpen(false);
            setCertificateStudent(null);
          }}
        />
      )}
    </div>
  );
}
