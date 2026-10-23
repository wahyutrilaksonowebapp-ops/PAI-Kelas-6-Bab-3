import React from 'react';
import { StudentProfile } from '../types/game';
import { sound } from '../utils/sound';
import { Printer, X, Award, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  student: StudentProfile;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  student,
  onClose
}) => {
  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl my-8 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Controls Toolbar (Hidden on print) */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Pratinjau Piagam Penghargaan Siswa</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
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
        </div>

        {/* Printable Certificate Canvas */}
        <div id="printable-certificate" className="p-8 sm:p-12 bg-white border-[10px] border-double border-emerald-900 relative text-slate-900">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600"></div>
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600"></div>

          {/* School Letterhead */}
          <div className="text-center space-y-1 border-b-2 border-slate-900 pb-4">
            <div className="text-[11px] sm:text-xs font-bold tracking-widest text-slate-700 uppercase">
              Pemerintah Kabupaten Pasuruan · Dinas Pendidikan dan Kebudayaan
            </div>
            <h1 className="font-display font-black text-xl sm:text-2xl text-emerald-950 tracking-tight">
              UPT SATUAN PENDIDIKAN SDN KEDUNGRINGIN 1 BEJI
            </h1>
            <div className="text-xs text-slate-600 font-medium">
              Alamat: Jl. Kedungringin, Kec. Beji, Kabupaten Pasuruan, Jawa Timur 67154
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center py-6 space-y-1">
            <div className="text-xs font-extrabold tracking-widest text-amber-800 uppercase">
              PIAGAM PENGHARGAAN
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-emerald-900">
              KSATRIA AKHLAKUL KARIMAH
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Nomor: 421.2/088/PAI-KDG1/X/2026
            </div>
          </div>

          {/* Award Recipient */}
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="text-sm text-slate-600 font-serif italic">
              Dengan penuh kebanggaan dan rasa syukur, piagam ini dianugerahkan kepada:
            </div>

            <div className="py-2 border-b-2 border-dashed border-emerald-800">
              <div className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                {student.name}
              </div>
              <div className="text-xs font-bold text-emerald-800 mt-1">
                Siswa Kelas 6 · SDN Kedungringin 1 Beji
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
              Telah berhasil menyelesaikan seluruh tantangan edukasi interaktif <strong>"DESA RUKUN: KEDUNGRINGIN ADVENTURE"</strong> dengan membuktikan pemahaman dalil dan penerapan akhlak mulia terhadap <em>Tetangga</em>, <em>Warga Non-Muslim</em>, serta <em>Kasih Sayang Satwa</em> dengan total perolehan:
            </p>

            <div className="inline-block bg-amber-50 border border-amber-300 rounded-xl px-6 py-2">
              <span className="text-xs text-amber-800 font-medium">Total Skor Barokah: </span>
              <span className="font-display font-black text-lg text-amber-950 font-mono tabular-nums">
                {student.score} Poin
              </span>
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-10 pt-6 flex items-end justify-between text-xs sm:text-sm text-slate-800">
            <div className="text-center space-y-12">
              <div className="font-medium">Mengetahui,<br />Kepala Sekolah SDN Kedungringin 1</div>
              <div>
                <div className="font-bold underline text-slate-900">M. Sulaiman, S.Pd., M.M.</div>
                <div className="text-[11px] text-slate-600">NIP. 19780512 200501 1 008</div>
              </div>
            </div>

            <div className="text-center space-y-12">
              <div className="font-medium">Beji, Pasuruan, 23 Oktober 2026<br />Guru Mata Pelajaran PAI & BP</div>
              <div>
                <div className="font-bold underline text-slate-900">Wahyu Trilaksono, S.Pd.I</div>
                <div className="text-[11px] text-slate-600">NIP. 19910314 201903 1 005</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
