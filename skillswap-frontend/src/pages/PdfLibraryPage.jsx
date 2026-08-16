import React, { useState } from 'react';
import { FileText, Download, Eye, Search, Filter, BookOpen, Sparkles, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';

export default function PdfLibraryPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [previewPdf, setPreviewPdf] = useState(null);

  const pdfDocuments = [
    {
      id: 1,
      title: 'JEE Advanced Physics Mechanics & Calculus Formula Bank',
      category: 'JEE',
      subject: 'Physics',
      docType: 'Formula Sheet',
      pages: '48 Pages',
      fileSize: '4.2 MB',
      downloads: 850,
      rating: 5.0,
      url: 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/pdfs/JEE_Advanced_Physics_QA_Mastery_Bank.pdf'
    },
    {
      id: 2,
      title: 'NEET Biology NCERT Line-by-Line 360 Memory Mind Maps',
      category: 'NEET',
      subject: 'Biology',
      docType: 'Notes',
      pages: '62 Pages',
      fileSize: '5.8 MB',
      downloads: 1240,
      rating: 5.0,
      url: 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/pdfs/NEET_Biology_NCERT_360_QA_Bank.pdf'
    },
    {
      id: 3,
      title: 'Java Core & Spring Boot 3 Microservices Architecture Cheat Sheet',
      category: 'CODING',
      subject: 'Java Backend',
      docType: 'Cheat Sheet',
      pages: '36 Pages',
      fileSize: '3.4 MB',
      downloads: 620,
      rating: 4.9,
      url: 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/pdfs/Java_SpringBoot3_Microservices_QA_Bank.pdf'
    },
    {
      id: 4,
      title: 'UPSC Indian Polity & Constitution Comprehensive Revision Notes',
      category: 'UPSC',
      subject: 'Polity',
      docType: 'Revision Notes',
      pages: '84 Pages',
      fileSize: '7.1 MB',
      downloads: 410,
      rating: 4.8,
      url: 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/pdfs/JEE_Advanced_Physics_QA_Mastery_Bank.pdf'
    },
    {
      id: 5,
      title: 'CAT Quantitative Aptitude & Data Interpretation Shortcut Tricks',
      category: 'CAT',
      subject: 'Quants',
      docType: 'Formula Sheet',
      pages: '52 Pages',
      fileSize: '4.5 MB',
      downloads: 530,
      rating: 4.9,
      url: 'https://raw.githubusercontent.com/somprakash18/skillswap-ai/main/pdfs/JEE_Advanced_Physics_QA_Mastery_Bank.pdf'
    }
  ];

  const filteredPdfs = pdfDocuments.filter(pdf => {
    const matchesCat = activeCategory === 'ALL' || pdf.category === activeCategory;
    const matchesSearch = pdf.title.toLowerCase().includes(search.toLowerCase()) ||
                          pdf.subject.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (pdf) => {
    window.open(pdf.url, '_blank');
    alert(`Downloading ${pdf.title}...`);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full border border-purple-100 dark:border-purple-900/40">
            Educational Document Repository
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">PDF Resource Library & Formula Sheets</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Download verified formula sheets, NCERT memory maps, PYQs, and cheat sheets.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes, formula sheets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full theme-input pl-10 text-xs py-2"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl">
        {['ALL', 'JEE', 'NEET', 'CODING', 'UPSC', 'CAT'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === cat ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60'
            }`}
          >
            {cat === 'ALL' ? 'All Resources' : `${cat} Notes & PYQs`}
          </button>
        ))}
      </div>

      {/* PDF Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPdfs.map((pdf) => (
          <div key={pdf.id} className="theme-card space-y-4 flex flex-col justify-between hover:border-purple-500/40">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40">
                  {pdf.docType}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{pdf.pages} • {pdf.fileSize}</span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{pdf.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Subject: <strong className="text-slate-700 dark:text-slate-200">{pdf.subject}</strong></p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>📥 {pdf.downloads} Downloads</span>
              <span className="text-amber-500 font-bold">⭐ {pdf.rating}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPreviewPdf(pdf)}
                className="flex-1 btn-secondary text-xs font-semibold py-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => handleDownload(pdf)}
                className="flex-1 btn-primary text-xs font-semibold py-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Document Preview Modal */}
      {previewPdf && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{previewPdf.title}</h3>
              <button onClick={() => setPreviewPdf(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
              <p className="text-slate-600 dark:text-slate-300">Category: <strong className="text-blue-600">{previewPdf.category}</strong></p>
              <p className="text-slate-600 dark:text-slate-300">File Info: {previewPdf.pages} | {previewPdf.fileSize}</p>
              <p className="text-emerald-600 font-bold">✓ Verified High-Yield Educational Resource</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setPreviewPdf(null)} className="btn-secondary text-xs font-semibold py-2 px-4">Close</button>
              <button onClick={() => handleDownload(previewPdf)} className="btn-primary text-xs font-semibold py-2 px-5">Download Full PDF</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
