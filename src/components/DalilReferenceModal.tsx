import React from 'react';
import { sound } from '../utils/sound';
import { BookOpen, X, Home, HeartHandshake, Sparkles } from 'lucide-react';

interface DalilReferenceModalProps {
  onClose: () => void;
}

export const DalilReferenceModal: React.FC<DalilReferenceModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg">
                Kumpulan Dalil & Rangkuman Materi PAI Kelas 6
              </h2>
              <p className="text-xs text-emerald-200">
                SDN Kedungringin 1 Beji Pasuruan
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Bagian 1: Tetangga */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-emerald-900 flex items-center gap-2 border-b border-emerald-100 pb-1.5">
              <Home className="w-4 h-4 text-emerald-700" />
              <span>1. Akhlak Terhadap Tetangga (Kampung Damai)</span>
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-900 text-xs">
                Batas Radius & 3 Tingkatan Hak:
              </div>
              <p className="text-xs text-slate-600">
                • Batas radius tetangga menurut mayoritas ulama dan sahabat adalah <strong>40 rumah</strong> ke setiap arah penjuru angin.<br />
                • <strong>Tetangga Muslim & Kerabat:</strong> Memiliki 3 Hak (Hak Tetangga, Hak Keislaman, Hak Kekerabatan).<br />
                • <strong>Tetangga Muslim bukan kerabat:</strong> Memiliki 2 Hak (Hak Tetangga, Hak Keislaman).<br />
                • <strong>Tetangga Non-Muslim:</strong> Memiliki 1 Hak (Hak Tetangga).
              </p>
            </div>
            <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 italic">
              "Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tetangganya." (HR. Bukhari & Muslim)
            </div>
            <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 italic">
              "Wahai Abu Dzar, jika engkau memasak sayur berkuah, maka perbanyaklah airnya dan bagilah kepada tetanggamu." (HR. Muslim)
            </div>
          </div>

          {/* Bagian 2: Non-Muslim */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-blue-900 flex items-center gap-2 border-b border-blue-100 pb-1.5">
              <HeartHandshake className="w-4 h-4 text-blue-700" />
              <span>2. Akhlak Terhadap Non-Muslim & Toleransi (Taman Harmoni)</span>
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-900 text-xs">
                Prinsip Keadilan & Batas Toleransi:
              </div>
              <p className="text-xs text-slate-600">
                • Wajib berbuat baik (al-birr) dan adil kepada non-muslim yang hidup berdampingan secara damai (Kafir Dzimmi/Mu'ahid).<br />
                • Dilarang mengganggu, mengejek, atau mencaci maki sesembahan mereka (QS. Al-An'am: 108).<br />
                • <strong>Batas toleransi:</strong> Dalam hal sosial dan tolong-menolong kita wajib rukun, namun dalam hal akidah dan ibadah ritual kita tidak boleh mencampuradukkannya (QS. Al-Kafirun: 6: <em>"Lakum dinukum waliyadin"</em>).
              </p>
            </div>
            <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 text-xs text-blue-950 italic">
              "Allah tidak melarang kamu berbuat baik dan berlaku adil terhadap orang-orang yang tiada memerangimu karena agama dan tidak mengusirmu dari negerimu. Sesungguhnya Allah menyukai orang-orang yang berlaku adil." (QS. Al-Mumtahanah: 8)
            </div>
          </div>

          {/* Bagian 3: Satwa */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-amber-900 flex items-center gap-2 border-b border-amber-100 pb-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>3. Akhlak Terhadap Hewan (Safari Bela Rasa)</span>
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-900 text-xs">
                Kewajiban Kasih Sayang & Ihsan:
              </div>
              <p className="text-xs text-slate-600">
                • Dilarang menyiksa, mengurung tanpa makan/minum, atau membebani hewan melebihi kemampuannya.<br />
                • Dilarang menjadikan hewan bernyawa sebagai sasaran bidik mainan/ketapel.<br />
                • Jika harus menyembelih hewan ternak, wajib berbuat ihsan dengan menajamkan pisau sembelihan agar hewan tidak tersiksa lama.
              </p>
            </div>
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 italic">
              "Seorang wanita diazab karena seekor kucing yang dikurungnya sampai mati kelaparan..." (HR. Bukhari)
            </div>
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 italic">
              "Pada setiap makhluk yang memiliki hati yang basah (bernyawa), ada pahala kebaikan." (HR. Bukhari)
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Tutup Panduan Dalil
          </button>
        </div>
      </div>
    </div>
  );
};
