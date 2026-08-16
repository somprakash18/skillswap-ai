import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Users, DollarSign, BookOpen, Plus, Calendar, Video, CheckCircle, XCircle, FileText, Award, Star, MessageSquare, TrendingUp, Sparkles, Clock } from 'lucide-react';
import AddTeacherContentModal from '../components/AddTeacherContentModal';

export default function TeacherDashboard({ setCurrentPage }) {
  const { user } = useAuth();
  const teacherName = user && user.fullName ? user.fullName : 'Rohan Verma (IIT Bombay AIR 142)';
  const [showAddModal, setShowAddModal] = useState(false);

  const [publishedCourses, setPublishedCourses] = useState([
    { id: 1, title: 'JEE Advanced Physics Mechanics & Calculus', category: 'JEE', enrolled: 310, rating: 5.0, earnings: '₹48,500' },
    { id: 2, title: 'NEET Biology NCERT Line-by-Line 360 Mastery', category: 'NEET', enrolled: 420, rating: 5.0, earnings: '₹42,200' },
    { id: 3, title: 'Java Spring Boot 3 & Enterprise Microservices', category: 'CODING', enrolled: 280, rating: 4.9, earnings: '₹28,800' }
  ]);

  const [pendingBookings, setPendingBookings] = useState([
    { id: 101, student: 'Priya Sharma', course: 'JEE Physics Mechanics', date: 'Tomorrow, 03:00 PM EST', credits: 15, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: 102, student: 'Alex Johnson', course: 'Java Spring Boot 3', date: 'Thu, Aug 20 • 05:00 PM EST', credits: 20, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
  ]);

  const handleAcceptBooking = (id) => {
    setPendingBookings(prev => prev.filter(b => b.id !== id));
    alert('Booking accepted! Google Meet session generated and emailed to student.');
  };

  const handleDeclineBooking = (id) => {
    setPendingBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Teacher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/40">
            Verified Mentor Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Teacher & Educator Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Welcome, {teacherName}! Manage courses, approve student bookings, and host live classes.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary text-xs font-bold px-4 py-2.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload Course / PDF / Quiz</span>
        </button>
      </div>

      {/* Teacher Key Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="theme-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18%
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1,010</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Total Enrolled Students</p>
          </div>
        </div>

        <div className="theme-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
              Payout Ready
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">₹1,19,500</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Total Educator Revenue</p>
          </div>
        </div>

        <div className="theme-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md">
              Published
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">3 Courses</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Active Content Series</p>
          </div>
        </div>

        <div className="theme-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
              5.0 Rating
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">254</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Student Reviews</p>
          </div>
        </div>

      </div>

      {/* Pending Student Bookings Approval */}
      <div className="theme-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Pending Student Session Requests ({pendingBookings.length})</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Review and Approve 1-on-1 Sessions</span>
        </div>

        {pendingBookings.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No pending booking requests right now. All requests are cleared!
          </div>
        ) : (
          <div className="space-y-3">
            {pendingBookings.map((b) => (
              <div key={b.id} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={b.avatar} alt={b.student} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{b.student}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Requested: <span className="font-semibold text-blue-600">{b.course}</span> • {b.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAcceptBooking(b.id)}
                    className="btn-primary text-xs font-semibold px-4 py-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Session</span>
                  </button>
                  <button
                    onClick={() => handleDeclineBooking(b.id)}
                    className="btn-danger text-xs font-semibold px-3 py-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Educator Courses Table */}
      <div className="theme-card space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Published Educator Content Series</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 uppercase text-[10px] font-extrabold text-slate-400">
              <tr>
                <th className="p-3">Course Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Enrolled Students</th>
                <th className="p-3">Average Rating</th>
                <th className="p-3">Course Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {publishedCourses.map((crs) => (
                <tr key={crs.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-extrabold text-slate-900 dark:text-white text-sm">{crs.title}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300">
                      {crs.category}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{crs.enrolled} Students</td>
                  <td className="p-3 font-bold text-amber-500">⭐ {crs.rating}</td>
                  <td className="p-3 font-extrabold text-emerald-600 dark:text-emerald-400">{crs.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Content Modal */}
      {showAddModal && (
        <AddTeacherContentModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => setShowAddModal(false)}
        />
      )}

    </div>
  );
}
