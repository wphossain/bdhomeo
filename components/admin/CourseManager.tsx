'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Course, Chapter, Lesson } from '@/lib/types';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Save, 
  Video, 
  Search, 
  Filter, 
  ArrowLeft, 
  Edit3, 
  Copy, 
  ExternalLink,
  Layers,
  ChevronDown, 
  ChevronUp,
  FileText,
  FileDown,
  Sparkles
} from 'lucide-react';

export function CourseManager() {
  const { courses, updateCourses, showToast } = useApp();
  const [courseList, setCourseList] = useState<Course[]>(courses);
  
  // Selected course for editing (null means Course Overview List view)
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [batchFilter, setBatchFilter] = useState<'all' | 'basic' | 'advance' | 'special'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'lessons' | 'fee'>('title');

  // Expanded chapters in editor
  const [expandedChapterIds, setExpandedChapterIds] = useState<string[]>(['c1', 'adv-c1']);

  const editingCourse = courseList.find((c) => c.id === editingCourseId);

  // Filter courses
  const filteredCourses = courseList.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = batchFilter === 'all' || course.batchType === batchFilter;
    return matchesSearch && matchesBatch;
  }).sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'fee') return a.admissionFee - b.admissionFee;
    if (sortBy === 'lessons') {
      const aLessons = a.curriculum.reduce((acc, c) => acc + c.lessons.length, 0);
      const bLessons = b.curriculum.reduce((acc, c) => acc + c.lessons.length, 0);
      return bLessons - aLessons;
    }
    return 0;
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const handleCreateNewCourse = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: `new-homeopathy-course-${Date.now()}`,
      title: 'নতুন হোমিওপ্যাথিক স্পেশাল কোর্স',
      subtitle: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি নির্দেশনায় বিশেষ ক্লিনিক্যাল কোর্স',
      batchType: 'basic',
      durationMonths: 6,
      admissionFee: 1000,
      monthlyFee: 500,
      liveSchedule: 'সপ্তাহে ২ দিন লাইভ ক্লাস (রাত ৯:৩০)',
      morningSupport: 'সপ্তাহে ৬ দিন সকাল ৮:০০ টায় লাইভ সাপোর্ট',
      thumbnailUrl: '/assets/courses/basic-batch.jpg',
      description: 'এই কোর্সের মাধ্যমে আপনি অর্গানন, মেটেরিয়া মেডিকা ও রেপার্টরি সমন্বয়ে জটিল রোগের সমাধান শিখবেন।',
      features: [
        'সাপ্তাহিক ২টি লাইভ ক্লাস (Google Meet)',
        'সপ্তাহে ৬ দিন মর্নিং কেস সাপোর্ট',
        'অধ্যায়ভিত্তিক সাজানো PDF লেকচার শিট',
        'PTF অনুমোদিত প্রফেশনাল সার্টিফিকেট',
      ],
      curriculum: [
        {
          id: `c-${Date.now()}`,
          chapterNo: 1,
          title: 'অধ্যায় ১: অর্গানন অব মেডিসিন — পরিচিতি ও মূল দর্শন',
          description: 'হ্যানিম্যানের মৌলিক নীতিমালা ও ভাইটাল ফোর্স',
          lessons: [
            {
              id: `l-${Date.now()}`,
              title: '১.১ পরিচিতি ও ওরিয়েন্টেশন ক্লাস',
              durationMin: 45,
              isFreePreview: true,
              youtubeVideoId: 'M7lc1UVf-VE',
              pdfNotesTitle: 'Chapter-1-Notes.pdf',
              pdfNotesUrl: 'https://drive.google.com/file/d/sample/view',
              notesContent: 'অর্গাননের মূল এফোরিজম ও চিকিৎসকের আদর্শ উদ্দেশ্যের সারসংক্ষেপ।',
            },
          ],
        },
      ],
    };

    const updated = [newCourse, ...courseList];
    setCourseList(updated);
    setEditingCourseId(newCourse.id);
    updateCourses(updated);
    showToast('নতুন কোর্স যুক্ত হয়েছে! এখন সিলেবাস ও নোটস সাজান।', 'success');
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই কোর্সটি মুছে ফেলতে চান?')) {
      const updated = courseList.filter((c) => c.id !== courseId);
      setCourseList(updated);
      if (editingCourseId === courseId) setEditingCourseId(null);
      updateCourses(updated);
      showToast('কোর্সটি সফলভাবে মুছে ফেলা হয়েছে।', 'info');
    }
  };

  const handleDuplicateCourse = (course: Course) => {
    const duplicated: Course = {
      ...course,
      id: `course-${Date.now()}`,
      slug: `${course.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${course.title} (কপি)`,
    };
    const updated = [duplicated, ...courseList];
    setCourseList(updated);
    updateCourses(updated);
    showToast('কোর্সটি সফলভাবে ডুপ্লিকেট করা হয়েছে!', 'success');
  };

  const handleSaveCourses = async () => {
    await updateCourses(courseList);
    showToast('কোর্সের সকল তথ্য, সিলেবাস, ক্লাস নোটস ও PDF সফলভাবে সংরক্ষিত হয়েছে!', 'success');
  };

  // Chapter & Lesson modifiers
  const handleAddChapter = (courseId: string) => {
    const targetCourse = courseList.find((c) => c.id === courseId);
    if (!targetCourse) return;

    const newChapterNo = targetCourse.curriculum.length + 1;
    const newChapter: Chapter = {
      id: `c-${Date.now()}`,
      chapterNo: newChapterNo,
      title: `অধ্যায় ${newChapterNo}: নতুন অধ্যায়`,
      description: 'অধ্যায়ের সারসংক্ষেপ ও বিবরণ',
      lessons: [
        {
          id: `l-${Date.now()}`,
          title: `${newChapterNo}.১ নতুন ক্লাস`,
          durationMin: 45,
          isFreePreview: false,
          youtubeVideoId: 'M7lc1UVf-VE',
          pdfNotesTitle: `Chapter_${newChapterNo}_Handout.pdf`,
          pdfNotesUrl: 'https://drive.google.com/file/d/sample/view',
          notesContent: 'এই ক্লাসের গুরুত্বপূর্ণ তথ্য ও ক্লিনিক্যাল নোটস।',
        },
      ],
    };

    const updated = courseList.map((c) =>
      c.id === courseId ? { ...c, curriculum: [...c.curriculum, newChapter] } : c
    );
    setCourseList(updated);
    setExpandedChapterIds([...expandedChapterIds, newChapter.id]);
  };

  const handleDeleteChapter = (courseId: string, chapterId: string) => {
    const updated = courseList.map((c) =>
      c.id === courseId ? { ...c, curriculum: c.curriculum.filter((ch) => ch.id !== chapterId) } : c
    );
    setCourseList(updated);
  };

  const handleAddLesson = (courseId: string, chapterId: string) => {
    const updated = courseList.map((c) => {
      if (c.id !== courseId) return c;
      const curriculum = c.curriculum.map((ch) => {
        if (ch.id !== chapterId) return ch;
        const newLessonNo = `${ch.chapterNo}.${ch.lessons.length + 1}`;
        const newLesson: Lesson = {
          id: `l-${Date.now()}`,
          title: `${newLessonNo} নতুন ক্লাস লেকচার`,
          durationMin: 45,
          isFreePreview: false,
          youtubeVideoId: 'M7lc1UVf-VE',
          pdfNotesTitle: 'Class_Lecture_Notes.pdf',
          pdfNotesUrl: 'https://drive.google.com/file/d/sample/view',
          notesContent: 'এই ক্লাসের সারসংক্ষেপ ও ক্লিনিক্যাল নির্দেশিকা।',
        };
        return { ...ch, lessons: [...ch.lessons, newLesson] };
      });
      return { ...c, curriculum };
    });
    setCourseList(updated);
  };

  const handleDeleteLesson = (courseId: string, chapterId: string, lessonId: string) => {
    const updated = courseList.map((c) => {
      if (c.id !== courseId) return c;
      const curriculum = c.curriculum.map((ch) => {
        if (ch.id !== chapterId) return ch;
        return { ...ch, lessons: ch.lessons.filter((l) => l.id !== lessonId) };
      });
      return { ...c, curriculum };
    });
    setCourseList(updated);
  };

  const handleUpdateLesson = (courseId: string, chapterId: string, lessonId: string, field: keyof Lesson, val: any) => {
    const updated = courseList.map((c) => {
      if (c.id !== courseId) return c;
      const curriculum = c.curriculum.map((ch) => {
        if (ch.id !== chapterId) return ch;
        const lessons = ch.lessons.map((l) => (l.id === lessonId ? { ...l, [field]: val } : l));
        return { ...ch, lessons };
      });
      return { ...c, curriculum };
    });
    setCourseList(updated);
  };

  // ----------------------------------------------------
  // VIEW 1: DEDICATED COURSE EDITOR VIEW
  // ----------------------------------------------------
  if (editingCourse) {
    return (
      <div className="space-y-6 font-bangla">
        
        {/* Editor Top Navigation Bar */}
        <div className="bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingCourseId(null)}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition"
              title="সকল কোর্সে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Course Editor
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white truncate max-w-lg mt-0.5">
                {editingCourse.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveCourses}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition"
            >
              <Save className="w-4 h-4" />
              <span>পরিবর্তন সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>

        {/* Course Basic Information Form */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Edit3 className="w-4 h-4 text-emerald-400" />
            কোর্সের মৌলিক তথ্য ও ফি নির্ধারণ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">কোর্সের পূর্ণাঙ্গ শিরোনাম *</label>
              <input
                type="text"
                value={editingCourse.title}
                onChange={(e) => {
                  const updated = courseList.map((c) => (c.id === editingCourse.id ? { ...c, title: e.target.value } : c));
                  setCourseList(updated);
                }}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">কোর্স ইউআরএল স্লাগ (URL Slug) *</label>
              <input
                type="text"
                value={editingCourse.slug}
                onChange={(e) => {
                  const updated = courseList.map((c) => (c.id === editingCourse.id ? { ...c, slug: e.target.value } : c));
                  setCourseList(updated);
                }}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-300 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 block">সাব-টাইটেল / সংক্ষিপ্ত বিবরণ *</label>
              <input
                type="text"
                value={editingCourse.subtitle}
                onChange={(e) => {
                  const updated = courseList.map((c) => (c.id === editingCourse.id ? { ...c, subtitle: e.target.value } : c));
                  setCourseList(updated);
                }}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 block">এককালীন ভর্তি ফি (৳)</label>
                <input
                  type="number"
                  value={editingCourse.admissionFee}
                  onChange={(e) => {
                    const updated = courseList.map((c) => (c.id === editingCourse.id ? { ...c, admissionFee: Number(e.target.value) } : c));
                    setCourseList(updated);
                  }}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-bold font-english text-emerald-400 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 block">মাসিক ফি (৳)</label>
                <input
                  type="number"
                  value={editingCourse.monthlyFee}
                  onChange={(e) => {
                    const updated = courseList.map((c) => (c.id === editingCourse.id ? { ...c, monthlyFee: Number(e.target.value) } : c));
                    setCourseList(updated);
                  }}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-bold font-english text-amber-400 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 block">কোর্সের মেয়াদ (মাস)</label>
                <input
                  type="number"
                  value={editingCourse.durationMonths}
                  onChange={(e) => {
                    const updated = courseList.map((c) => (c.id === editingCourse.id ? { ...c, durationMonths: Number(e.target.value) } : c));
                    setCourseList(updated);
                  }}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-bold font-english text-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 block">ব্যাচ টাইপ</label>
                <select
                  value={editingCourse.batchType}
                  onChange={(e) => {
                    const updated = courseList.map((c) => (c.id === editingCourse.id ? { ...c, batchType: e.target.value as any } : c));
                    setCourseList(updated);
                  }}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400 outline-none"
                >
                  <option value="basic">বেসিক ব্যাচ (Basic)</option>
                  <option value="advance">এডভান্সড ব্যাচ (Advance)</option>
                  <option value="special">স্পেশাল ব্যাচ (Special)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum, Chapters, Lessons & Lecture Notes Editor */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                অধ্যায়, লেকচার ভিডিও, ক্লাস নোটস ও PDF শিট ম্যানেজার
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                প্রতিটি ক্লাসের ভিডিও আইডি, আলোচনা সারসংক্ষেপ ও PDF নোটস যুক্ত করুন।
              </p>
            </div>

            <button
              onClick={() => handleAddChapter(editingCourse.id)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন অধ্যায় যোগ করুন</span>
            </button>
          </div>

          <div className="space-y-4">
            {editingCourse.curriculum.map((chapter) => {
              const isExpanded = expandedChapterIds.includes(chapter.id);
              return (
                <div key={chapter.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                  
                  {/* Chapter Header Bar */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => {
                          const updated = courseList.map((c) => {
                            if (c.id !== editingCourse.id) return c;
                            const curriculum = c.curriculum.map((ch) =>
                              ch.id === chapter.id ? { ...ch, title: e.target.value } : ch
                            );
                            return { ...c, curriculum };
                          });
                          setCourseList(updated);
                        }}
                        placeholder="অধ্যায়ের নাম..."
                        className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white font-black flex-1 outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddLesson(editingCourse.id, chapter.id)}
                        className="text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ক্লাস যোগ</span>
                      </button>

                      <button
                        onClick={() => handleDeleteChapter(editingCourse.id, chapter.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                        title="অধ্যায় মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Lessons List in Chapter */}
                  {isExpanded && (
                    <div className="space-y-4 pt-2 border-t border-slate-800/80">
                      {chapter.lessons.map((lesson, lIdx) => (
                        <div key={lesson.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                          
                          {/* Row 1: Title & Duration */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                            <div className="sm:col-span-6">
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">ক্লাসের শিরোনাম</label>
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => handleUpdateLesson(editingCourse.id, chapter.id, lesson.id, 'title', e.target.value)}
                                placeholder="ক্লাসের নাম..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold outline-none"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">YouTube Video ID</label>
                              <input
                                type="text"
                                value={lesson.youtubeVideoId || ''}
                                onChange={(e) => handleUpdateLesson(editingCourse.id, chapter.id, lesson.id, 'youtubeVideoId', e.target.value)}
                                placeholder="যেমন: M7lc1UVf-VE"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-300 outline-none"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">সময় (মিনিট)</label>
                              <input
                                type="number"
                                value={lesson.durationMin}
                                onChange={(e) => handleUpdateLesson(editingCourse.id, chapter.id, lesson.id, 'durationMin', Number(e.target.value))}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-english text-white outline-none"
                              />
                            </div>

                            <div className="sm:col-span-1 flex items-center justify-end pt-4">
                              <button
                                onClick={() => handleDeleteLesson(editingCourse.id, chapter.id, lesson.id)}
                                className="p-1.5 text-rose-400 hover:text-rose-300"
                                title="ক্লাস মুছুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Row 2: Lecture Notes & Synopsis Text */}
                          <div>
                            <label className="text-[10px] font-bold text-emerald-400 block mb-1 flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              ক্লাসের আলোচনা নোটস ও নির্দেশিকা (Lecture Notes / Summary)
                            </label>
                            <textarea
                              rows={2}
                              value={lesson.notesContent || ''}
                              onChange={(e) => handleUpdateLesson(editingCourse.id, chapter.id, lesson.id, 'notesContent', e.target.value)}
                              placeholder="এই ক্লাসের মূল বিষয়বস্তু, লক্ষণ ও ওষুধের সারসংক্ষেপ লিখুন (যা ভিডিওর নিচে স্টুডেন্ট ড্যাশবোর্ডে শো করবে)..."
                              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-emerald-500 leading-relaxed"
                            />
                          </div>

                          {/* Row 3: PDF Handout Link */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-900">
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 block mb-1">PDF লেকচার শিটের নাম</label>
                              <input
                                type="text"
                                value={lesson.pdfNotesTitle || ''}
                                onChange={(e) => handleUpdateLesson(editingCourse.id, chapter.id, lesson.id, 'pdfNotesTitle', e.target.value)}
                                placeholder="যেমন: Organon_Chapter_1_Handout.pdf"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-bold text-slate-400 block mb-1">PDF ডাউনলোড / গুগল ড্রাইভ লিংক</label>
                              <input
                                type="url"
                                value={lesson.pdfNotesUrl || ''}
                                onChange={(e) => handleUpdateLesson(editingCourse.id, chapter.id, lesson.id, 'pdfNotesUrl', e.target.value)}
                                placeholder="https://drive.google.com/file/d/.../view"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-400 outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-bold">
                              <input
                                type="checkbox"
                                checked={lesson.isFreePreview}
                                onChange={(e) => handleUpdateLesson(editingCourse.id, chapter.id, lesson.id, 'isFreePreview', e.target.checked)}
                                className="rounded text-emerald-600 focus:ring-0"
                              />
                              <span>ফ্রি ওরিয়েন্টেশন প্রিভিউ ক্লাস (Free Preview for All)</span>
                            </label>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: COURSE OVERVIEW CARDS LIST VIEW
  // ----------------------------------------------------
  return (
    <div className="space-y-6 font-bangla">
      
      {/* Top Header & New Course Action */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            কোর্স ও সিলেবাস সিএমএস (Course Management)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            সকল কোর্স, ব্যাচ টাইপ, ভর্তি ফি, মাসিক ফি ও অধ্যায়ভিত্তিক ভিডিও লেকচার পরিচালনা করুন।
          </p>
        </div>

        <button
          onClick={handleCreateNewCourse}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কোর্স যোগ করুন</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="কোর্সের নাম দিয়ে খুঁজুন..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value as any)}
              className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
            >
              <option value="all">সকল ব্যাচ</option>
              <option value="basic">বেসিক ব্যাচ</option>
              <option value="advance">এডভান্সড ব্যাচ</option>
              <option value="special">স্পেশাল ব্যাচ</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <span className="text-xs text-slate-400 font-bold">সর্ট:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
            >
              <option value="title">কোর্সের নাম</option>
              <option value="lessons">ক্লাস সংখ্যা</option>
              <option value="fee">ভর্তি ফি</option>
            </select>
          </div>

        </div>

      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const totalLessons = course.curriculum.reduce((acc, c) => acc + c.lessons.length, 0);

          return (
            <div
              key={course.id}
              className="bg-slate-950 rounded-3xl border border-slate-800/90 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-xl group space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    course.batchType === 'advance'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {course.batchType === 'advance' ? 'এডভান্সড ক্লিনিক্যাল ব্যাচ' : 'বেসিক ব্যাচ'}
                  </span>
                  <span className="text-xs text-slate-500 font-bold font-english">
                    {course.durationMonths} মাস কোর্স
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {course.subtitle}
                  </p>
                </div>

                {/* Key Numbers */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">ভর্তি ফি</span>
                    <span className="text-xs font-black font-english text-emerald-400">৳{course.admissionFee}/-</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">মাসিক ফি</span>
                    <span className="text-xs font-black font-english text-amber-400">৳{course.monthlyFee}/-</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">মোট ক্লাস</span>
                    <span className="text-xs font-black text-white">{totalLessons} টি</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setEditingCourseId(course.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl shadow transition flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>সিলেবাস ও কনটেন্ট এডিট</span>
                </button>

                <button
                  onClick={() => handleDuplicateCourse(course)}
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition"
                  title="কোর্স ডুপ্লিকেট করুন"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <Link
                  href={`/courses/${course.slug}`}
                  target="_blank"
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition"
                  title="পাবলিক পেজ দেখুন"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="p-2.5 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-800 transition"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
