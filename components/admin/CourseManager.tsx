'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Course, Chapter, Lesson } from '@/lib/types';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Video, 
  FileText, 
  Check, 
  Eye, 
  ChevronDown, 
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { formatTaka, toBanglaNumber } from '@/lib/utils';

export function CourseManager() {
  const { courses, updateCourses } = useApp();
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [editingLesson, setEditingLesson] = useState<{ chapterId: string; lesson: Lesson } | null>(null);

  const currentCourse = courseList.find((c) => c.id === selectedCourseId) || courseList[0];

  const handleCourseChange = (field: keyof Course, val: any) => {
    const updated = courseList.map((c) =>
      c.id === selectedCourseId ? { ...c, [field]: val } : c
    );
    setCourseList(updated);
  };

  const handleSaveAll = async () => {
    await updateCourses(courseList);
  };

  const handleAddChapter = () => {
    if (!currentCourse) return;
    const newChapterNo = currentCourse.curriculum.length + 1;
    const newChapter: Chapter = {
      id: `c-${Date.now()}`,
      chapterNo: newChapterNo,
      title: `নতুন অধ্যায় ${toBanglaNumber(newChapterNo)}: বিষয়ের নাম লিখুন`,
      description: 'অধ্যায়ের সংক্ষিপ্ত বিবরণ',
      lessons: [
        {
          id: `l-${Date.now()}`,
          title: `${toBanglaNumber(newChapterNo)}.১ প্রথম ক্লাসের শিরোনাম`,
          durationMin: 45,
          isFreePreview: true,
          youtubeVideoId: 'M7lc1UVf-VE',
          pdfNotesTitle: `Chapter-${newChapterNo}-Notes.pdf`,
          pdfNotesUrl: '',
        },
      ],
    };

    const updatedCurriculum = [...currentCourse.curriculum, newChapter];
    handleCourseChange('curriculum', updatedCurriculum);
  };

  const handleAddLesson = (chapterId: string) => {
    if (!currentCourse) return;
    const chapter = currentCourse.curriculum.find((ch) => ch.id === chapterId);
    if (!chapter) return;

    const newLesson: Lesson = {
      id: `l-${Date.now()}`,
      title: `নতুন ক্লাস ${toBanglaNumber(chapter.lessons.length + 1)}: ক্লাসের নাম`,
      durationMin: 45,
      isFreePreview: false,
      youtubeVideoId: 'M7lc1UVf-VE',
      pdfNotesTitle: 'Lecture-Note.pdf',
      pdfNotesUrl: '',
    };

    const updatedCurriculum = currentCourse.curriculum.map((ch) =>
      ch.id === chapterId ? { ...ch, lessons: [...ch.lessons, newLesson] } : ch
    );
    handleCourseChange('curriculum', updatedCurriculum);
  };

  const handleUpdateLesson = (chapterId: string, updatedLesson: Lesson) => {
    if (!currentCourse) return;
    const updatedCurriculum = currentCourse.curriculum.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          lessons: ch.lessons.map((l) => (l.id === updatedLesson.id ? updatedLesson : l)),
        };
      }
      return ch;
    });
    handleCourseChange('curriculum', updatedCurriculum);
    setEditingLesson(null);
  };

  const handleDeleteLesson = (chapterId: string, lessonId: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই ক্লাসটি মুছে ফেলতে চান?')) return;
    if (!currentCourse) return;
    const updatedCurriculum = currentCourse.curriculum.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          lessons: ch.lessons.filter((l) => l.id !== lessonId),
        };
      }
      return ch;
    });
    handleCourseChange('curriculum', updatedCurriculum);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            কোর্স ও ভিডিও লেকচার সিএমএস (Course & Lesson Manager)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            কোর্সের নাম, ভর্তি ফি, মাসিক ফি, অধ্যায় এবং ইউটিউব ভিডিও আইডি ও পিডিএফ লিংক পরিবর্তন করুন।
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition"
        >
          <Save className="w-4 h-4" />
          <span>সকল পরিবর্তন সংরক্ষণ করুন</span>
        </button>
      </div>

      {/* Course Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {courseList.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseId(c.id)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              selectedCourseId === c.id
                ? 'bg-emerald-700 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{c.title}</span>
          </button>
        ))}
      </div>

      {currentCourse && (
        <div className="space-y-6">
          
          {/* 1. Basic Course Details */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-black text-slate-900 text-sm border-b pb-2">
              ১. কোর্সের মৌলিক তথ্য ও ফি সেটিংস
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের শিরোনাম</label>
                <input
                  type="text"
                  value={currentCourse.title}
                  onChange={(e) => handleCourseChange('title', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের সাবটাইটেল</label>
                <input
                  type="text"
                  value={currentCourse.subtitle}
                  onChange={(e) => handleCourseChange('subtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">এককালীন ভর্তি ফি (টাকা)</label>
                <input
                  type="number"
                  value={currentCourse.admissionFee}
                  onChange={(e) => handleCourseChange('admissionFee', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">মাসিক ফি (টাকা)</label>
                <input
                  type="number"
                  value={currentCourse.monthlyFee}
                  onChange={(e) => handleCourseChange('monthlyFee', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ক্লাসের শিডিউল টেক্সট</label>
                <input
                  type="text"
                  value={currentCourse.liveSchedule}
                  onChange={(e) => handleCourseChange('liveSchedule', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">মর্নিং সাপোর্ট নোট (যদি থাকে)</label>
                <input
                  type="text"
                  value={currentCourse.morningSupport || ''}
                  onChange={(e) => handleCourseChange('morningSupport', e.target.value)}
                  placeholder="যেমন: সপ্তাহে ৬ দিন সকাল ৮:০০ টায় মর্নিং কেস সাপোর্ট"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
            </div>
          </div>

          {/* 2. Chapters & Lessons Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-base">
                ২. অধ্যায় ও ভিডিও লেকচার তালিকা ({currentCourse.curriculum.length} টি অধ্যায়)
              </h4>
              <button
                onClick={handleAddChapter}
                className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>নতুন অধ্যায় যোগ করুন</span>
              </button>
            </div>

            <div className="space-y-4">
              {currentCourse.curriculum.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm space-y-3 p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {chapter.chapterNo}
                      </span>
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => {
                          const updated = currentCourse.curriculum.map((ch) =>
                            ch.id === chapter.id ? { ...ch, title: e.target.value } : ch
                          );
                          handleCourseChange('curriculum', updated);
                        }}
                        className="w-full font-bold text-sm text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-emerald-700 outline-none pb-0.5"
                      />
                    </div>

                    <button
                      onClick={() => handleAddLesson(chapter.id)}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ক্লাস যোগ করুন</span>
                    </button>
                  </div>

                  {/* Lessons list */}
                  <div className="space-y-2 pt-1">
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <div className="space-y-1 truncate pr-2">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span className="font-bold text-slate-900">{lesson.title}</span>
                            {lesson.isFreePreview && (
                              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                                ফ্রি ডেমো
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px] pl-6">
                            <span>YouTube ID: <strong className="text-slate-800">{lesson.youtubeVideoId || 'নেই'}</strong></span>
                            <span>•</span>
                            <span>{lesson.durationMin} মিনিট</span>
                            {lesson.pdfNotesTitle && (
                              <>
                                <span>•</span>
                                <span>PDF: {lesson.pdfNotesTitle}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <button
                            onClick={() => setEditingLesson({ chapterId: chapter.id, lesson })}
                            className="p-1.5 bg-white hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 transition"
                            title="সম্পাদনা করুন"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(chapter.id, lesson.id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-200 transition"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Edit Lesson Modal */}
      {editingLesson && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 font-bangla">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900 border-b pb-2">
              ক্লাসের ভিডিও ও তথ্য সম্পাদনা
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ক্লাসের শিরোনাম</label>
                <input
                  type="text"
                  value={editingLesson.lesson.title}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ইউটিউব ভিডিও আইডি (YouTube Video ID)
                </label>
                <input
                  type="text"
                  value={editingLesson.lesson.youtubeVideoId || ''}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, youtubeVideoId: e.target.value },
                    })
                  }
                  placeholder="যেমন: dQw4w9WgXcQ অথবা সম্পূর্ণ লিংক"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-emerald-900"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  * ইউটিউব ভিডিও লিংকের শেষের আইডিটি লিখুন (যেমন: youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ভিডিও দৈর্ঘ্য (মিনিট)</label>
                  <input
                    type="number"
                    value={editingLesson.lesson.durationMin}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        lesson: { ...editingLesson.lesson, durationMin: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingLesson.lesson.isFreePreview}
                      onChange={(e) =>
                        setEditingLesson({
                          ...editingLesson,
                          lesson: { ...editingLesson.lesson, isFreePreview: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                    <span>ফ্রি প্রিভিউ ডেমো ক্লাস</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PDF লেকচার শিট টাইটেল</label>
                <input
                  type="text"
                  value={editingLesson.lesson.pdfNotesTitle || ''}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, pdfNotesTitle: e.target.value },
                    })
                  }
                  placeholder="যেমন: Chapter-1-Notes.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PDF ডাউনলোড লিংক (Google Drive / Direct URL)</label>
                <input
                  type="url"
                  value={editingLesson.lesson.pdfNotesUrl || ''}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, pdfNotesUrl: e.target.value },
                    })
                  }
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t">
              <button
                onClick={() => setEditingLesson(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleUpdateLesson(editingLesson.chapterId, editingLesson.lesson)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
              >
                আপডেট করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}