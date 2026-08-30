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
  ChevronUp
} from 'lucide-react';

export function CourseManager() {
  const { courses, updateCourses, showToast } = useApp();
  const [courseList, setCourseList] = useState<Course[]>(courses);
  
  // Selected course for editing (null means we are in Course List view)
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
      title: 'à¦¨à¦¤à§à¦¨ à¦¹à§‹à¦®à¦¿à¦“à¦ªà§à¦¯à¦¾à¦¥à¦¿à¦• à¦¸à§à¦ªà§‡à¦¶à¦¾à¦² à¦•à§‹à¦°à§à¦¸',
      subtitle: 'à¦¡à¦¾à¦ƒ à¦®à§‹à¦ƒ à¦—à¦¿à§Ÿà¦¾à¦¸ à¦‰à¦¦à§à¦¦à¦¿à¦¨ à¦¸à§à¦¯à¦¾à¦°à§‡à¦° à¦¬à¦¿à¦¶à§‡à¦· à¦ªà§à¦°à¦¶à¦¿à¦•à§à¦·à¦£ à¦•à¦°à§à¦®à¦¶à¦¾à¦²à¦¾ à¦“ à¦à¦•à¦¾à¦¡à§‡à¦®à¦¿à¦• à¦•à§‹à¦°à§à¦¸',
      batchType: 'basic',
      durationMonths: 6,
      admissionFee: 1000,
      monthlyFee: 500,
      liveSchedule: 'à¦¸à¦ªà§à¦¤à¦¾à¦¹à§‡ à§¨ à¦¦à¦¿à¦¨ à¦²à¦¾à¦‡à¦­ à¦•à§à¦²à¦¾à¦¸ (à¦°à¦¾à¦¤ à§¯:à§©à§¦)',
      morningSupport: 'à¦¸à¦ªà§à¦¤à¦¾à¦¹à§‡ à§¬ à¦¦à¦¿à¦¨ à¦¸à¦•à¦¾à¦² à§®:à§¦à§¦ à¦Ÿà¦¾à§Ÿ à¦²à¦¾à¦‡à¦­ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ',
      thumbnailUrl: '/assets/courses/basic-batch.jpg',
      description: 'à¦à¦‡ à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦®à¦¾à¦§à§à¦¯à¦®à§‡ à¦¹à§‹à¦®à¦¿à¦“à¦ªà§à¦¯à¦¾à¦¥à¦¿à¦• à¦…à¦°à§à¦—à¦¾à¦¨à¦¨, à¦®à§‡à¦Ÿà§‡à¦°à¦¿à§Ÿà¦¾ à¦®à§‡à¦¡à¦¿à¦•à¦¾ à¦“ à¦°à§‡à¦ªà¦¾à¦°à§à¦Ÿà¦°à¦¿à¦° à¦ªà§‚à¦°à§à¦£à¦¾à¦™à§à¦— à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à¦¿à¦• à¦œà§à¦žà¦¾à¦¨ à¦…à¦°à§à¦œà¦¨ à¦•à¦°à¦¾ à¦¯à¦¾à¦¬à§‡à¥¤',
      features: [
        'à¦¸à¦¾à¦ªà§à¦¤à¦¾à¦¹à¦¿à¦• à§¨à¦Ÿà¦¿ à¦²à¦¾à¦‡à¦­ à¦•à§à¦²à¦¾à¦¸ (Google Meet)',
        'à¦¸à¦ªà§à¦¤à¦¾à¦¹à§‡ à§¬ à¦¦à¦¿à¦¨ à¦®à¦°à§à¦¨à¦¿à¦‚ à¦•à§‡à¦¸ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ',
        'à¦…à¦§à§à¦¯à¦¾à§Ÿà¦­à¦¿à¦¤à§à¦¤à¦¿à¦• à¦¸à¦¾à¦œà¦¾à¦¨à§‹ PDF à¦²à§‡à¦•à¦šà¦¾à¦° à¦¶à¦¿à¦Ÿ',
        'PTF à¦…à¦¨à§à¦®à§‹à¦¦à¦¿à¦¤ à¦ªà§à¦°à¦«à§‡à¦¶à¦¨à¦¾à¦² à¦¸à¦¾à¦°à§à¦Ÿà¦¿à¦«à¦¿à¦•à§‡à¦Ÿ',
      ],
      curriculum: [
        {
          id: `c-${Date.now()}`,
          chapterNo: 1,
          title: 'à¦…à¦§à§à¦¯à¦¾à¦¯à¦¼ à§§: à¦®à§Œà¦²à¦¿à¦• à¦­à¦¿à¦¤à§à¦¤à¦¿ à¦“ à¦•à§à¦²à¦¾à¦¸à¦¿à¦•à§à¦¯à¦¾à¦² à¦¦à¦°à§à¦¶à¦¨',
          description: 'à¦¹à§‹à¦®à¦¿à¦“à¦ªà§à¦¯à¦¾à¦¥à¦¿à¦• à¦¨à§€à¦¤à¦¿à¦®à¦¾à¦²à¦¾à¦° à¦—à¦­à§€à¦° à¦¬à¦¿à¦¶à§à¦²à§‡à¦·à¦£ à¦“ à¦ªà§à¦°à¦¾à¦¥à¦®à¦¿à¦• à¦ªà¦¾à¦ ',
          lessons: [
            {
              id: `l-${Date.now()}`,
              title: 'à§§.à§§ à¦ªà¦°à¦¿à¦šà¦¿à¦¤à¦¿ à¦“ à¦“à¦°à¦¿à§Ÿà§‡à¦¨à§à¦Ÿà§‡à¦¶à¦¨ à¦•à§à¦²à¦¾à¦¸',
              durationMin: 45,
              isFreePreview: true,
              youtubeVideoId: 'M7lc1UVf-VE',
              pdfNotesTitle: 'Chapter-1-Notes.pdf',
              pdfNotesUrl: 'https://drive.google.com/file/d/sample/view',
            },
          ],
        },
      ],
    };

    const updated = [newCourse, ...courseList];
    setCourseList(updated);
    setEditingCourseId(newCourse.id);
    updateCourses(updated);
    showToast('à¦¨à¦¤à§à¦¨ à¦•à§‹à¦°à§à¦¸ à¦¤à§ˆà¦°à¦¿ à¦¹à§Ÿà§‡à¦›à§‡! à¦à¦–à¦¨ à¦¬à¦¿à¦¸à§à¦¤à¦¾à¦°à¦¿à¦¤ à¦¤à¦¥à§à¦¯ à¦“ à¦¸à¦¿à¦²à§‡à¦¬à¦¾à¦¸ à¦¸à¦¾à¦œà¦¾à¦¨à¥¤', 'success');
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('à¦†à¦ªà¦¨à¦¿ à¦•à¦¿ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤à¦­à¦¾à¦¬à§‡ à¦à¦‡ à¦•à§‹à¦°à§à¦¸à¦Ÿà¦¿ à¦¡à¦¿à¦²à¦¿à¦Ÿ à¦•à¦°à¦¤à§‡ à¦šà¦¾à¦¨?')) {
      const updated = courseList.filter((c) => c.id !== courseId);
      setCourseList(updated);
      if (editingCourseId === courseId) setEditingCourseId(null);
      updateCourses(updated);
      showToast('à¦•à§‹à¦°à§à¦¸ à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦¡à¦¿à¦²à¦¿à¦Ÿ à¦•à¦°à¦¾ à¦¹à§Ÿà§‡à¦›à§‡à¥¤', 'info');
    }
  };

  const handleDuplicateCourse = (course: Course) => {
    const duplicated: Course = {
      ...course,
      id: `course-${Date.now()}`,
      slug: `${course.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${course.title} (à¦•à¦ªà¦¿)`,
    };
    const updated = [duplicated, ...courseList];
    setCourseList(updated);
    updateCourses(updated);
    showToast(`'${course.title}' à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦•à¦ªà¦¿ à¦¤à§ˆà¦°à¦¿ à¦¹à§Ÿà§‡à¦›à§‡!`, 'success');
  };

  const handleSaveCourse = (updatedCourse: Course) => {
    const updatedList = courseList.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
    setCourseList(updatedList);
    updateCourses(updatedList);
    showToast('à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦¸à¦•à¦² à¦¤à¦¥à§à¦¯ à¦“ à¦¸à¦¿à¦²à§‡à¦¬à¦¾à¦¸ à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦¸à§‡à¦­ à¦¹à§Ÿà§‡à¦›à§‡!', 'success');
  };

  // Add Chapter
  const addChapter = () => {
    if (!editingCourse) return;
    const newChapterNo = editingCourse.curriculum.length + 1;
    const newChapter: Chapter = {
      id: `c-${Date.now()}`,
      chapterNo: newChapterNo,
      title: `à¦…à¦§à§à¦¯à¦¾à¦¯à¦¼ ${newChapterNo}: à¦¨à¦¤à§à¦¨ à¦…à¦§à§à¦¯à¦¾à§Ÿà§‡à¦° à¦¶à¦¿à¦°à§‹à¦¨à¦¾à¦®`,
      description: 'à¦à¦‡ à¦…à¦§à§à¦¯à¦¾à§Ÿà§‡à¦° à¦¸à¦‚à¦•à§à¦·à§‡à¦ªà¦¿à¦¤ à¦¬à¦¿à¦¬à¦°à¦£ à¦“ à¦•à§à¦²à¦¾à¦¸à§‡à¦° à¦‰à¦¦à§à¦¦à§‡à¦¶à§à¦¯',
      lessons: [
        {
          id: `l-${Date.now()}`,
          title: `${newChapterNo}.à§§ à¦ªà§à¦°à¦¥à¦® à¦²à§‡à¦•à¦šà¦¾à¦°`,
          durationMin: 50,
          isFreePreview: false,
          youtubeVideoId: 'M7lc1UVf-VE',
        },
      ],
    };
    const updated = {
      ...editingCourse,
      curriculum: [...editingCourse.curriculum, newChapter],
    };
    handleSaveCourse(updated);
    setExpandedChapterIds((prev) => [...prev, newChapter.id]);
  };

  // Delete Chapter
  const deleteChapter = (chapterId: string) => {
    if (!editingCourse) return;
    if (confirm('à¦†à¦ªà¦¨à¦¿ à¦•à¦¿ à¦à¦‡ à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦…à¦§à§à¦¯à¦¾à§Ÿà¦Ÿà¦¿ à¦®à§à¦›à§‡ à¦«à§‡à¦²à¦¤à§‡ à¦šà¦¾à¦¨?')) {
      const updatedCurriculum = editingCourse.curriculum
        .filter((c) => c.id !== chapterId)
        .map((c, idx) => ({ ...c, chapterNo: idx + 1 }));
      const updated = { ...editingCourse, curriculum: updatedCurriculum };
      handleSaveCourse(updated);
    }
  };

  // Add Lesson
  const addLesson = (chapterId: string) => {
    if (!editingCourse) return;
    const chapter = editingCourse.curriculum.find((c) => c.id === chapterId);
    if (!chapter) return;

    const newLessonNo = chapter.lessons.length + 1;
    const newLesson: Lesson = {
      id: `l-${Date.now()}`,
      title: `${chapter.chapterNo}.${newLessonNo} à¦¨à¦¤à§à¦¨ à¦­à¦¿à¦¡à¦¿à¦“ à¦²à§‡à¦•à¦šà¦¾à¦°`,
      durationMin: 50,
      isFreePreview: false,
      youtubeVideoId: 'M7lc1UVf-VE',
    };

    const updatedCurriculum = editingCourse.curriculum.map((c) =>
      c.id === chapterId ? { ...c, lessons: [...c.lessons, newLesson] } : c
    );
    const updated = { ...editingCourse, curriculum: updatedCurriculum };
    handleSaveCourse(updated);
  };

  // Delete Lesson
  const deleteLesson = (chapterId: string, lessonId: string) => {
    if (!editingCourse) return;
    const updatedCurriculum = editingCourse.curriculum.map((c) => {
      if (c.id === chapterId) {
        return { ...c, lessons: c.lessons.filter((l) => l.id !== lessonId) };
      }
      return c;
    });
    const updated = { ...editingCourse, curriculum: updatedCurriculum };
    handleSaveCourse(updated);
  };

  // Update Lesson Field
  const updateLessonField = (chapterId: string, lessonId: string, field: keyof Lesson, value: any) => {
    if (!editingCourse) return;
    const updatedCurriculum = editingCourse.curriculum.map((c) => {
      if (c.id === chapterId) {
        return {
          ...c,
          lessons: c.lessons.map((l) => (l.id === lessonId ? { ...l, [field]: value } : l)),
        };
      }
      return c;
    });
    const updated = { ...editingCourse, curriculum: updatedCurriculum };
    handleSaveCourse(updated);
  };

  // Update Chapter Title/Description
  const updateChapterField = (chapterId: string, field: keyof Chapter, value: any) => {
    if (!editingCourse) return;
    const updatedCurriculum = editingCourse.curriculum.map((c) =>
      c.id === chapterId ? { ...c, [field]: value } : c
    );
    const updated = { ...editingCourse, curriculum: updatedCurriculum };
    handleSaveCourse(updated);
  };

  // ==========================================
  // 1. COURSE LIST OVERVIEW VIEW
  // ==========================================
  if (!editingCourseId || !editingCourse) {
    return (
      <div className="space-y-6 font-bangla">
        
        {/* Top Action Header */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              à¦•à§‹à¦°à§à¦¸ à¦“ à¦¸à¦¿à¦²à§‡à¦¬à¦¾à¦¸ à¦¸à¦¿à¦à¦®à¦à¦¸ (Course Management)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              à¦¸à¦•à¦² à¦•à§‹à¦°à§à¦¸, à¦¬à§à¦¯à¦¾à¦š à¦Ÿà¦¾à¦‡à¦ª, à¦­à¦°à§à¦¤à¦¿ à¦«à¦¿, à¦®à¦¾à¦¸à¦¿à¦• à¦«à¦¿ à¦“ à¦…à¦§à§à¦¯à¦¾à§Ÿà¦­à¦¿à¦¤à§à¦¤à¦¿à¦• à¦­à¦¿à¦¡à¦¿à¦“ à¦²à§‡à¦•à¦šà¦¾à¦° à¦ªà¦°à¦¿à¦šà¦¾à¦²à¦¨à¦¾ à¦•à¦°à§à¦¨à¥¤
            </p>
          </div>

          <button
            onClick={handleCreateNewCourse}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>à¦¨à¦¤à§à¦¨ à¦•à§‹à¦°à§à¦¸ à¦¯à§‹à¦— à¦•à¦°à§à¦¨</span>
          </button>
        </div>

        {/* Filter, Search & Sort Bar */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦¨à¦¾à¦® à¦¦à¦¿à§Ÿà§‡ à¦–à§à¦à¦œà§à¦¨..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
            />
          </div>

          {/* Filter by Batch */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value as any)}
                className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
              >
                <option value="all">à¦¸à¦•à¦² à¦¬à§à¦¯à¦¾à¦š</option>
                <option value="basic">à¦¬à§‡à¦¸à¦¿à¦• à¦«à¦¾à¦‰à¦¨à§à¦¡à§‡à¦¶à¦¨</option>
                <option value="advance">à¦à¦¡à¦­à¦¾à¦¨à§à¦¸à¦¡ à¦•à§à¦²à¦¿à¦¨à¦¿à¦•à§à¦¯à¦¾à¦²</option>
                <option value="special">à¦¸à§à¦ªà§‡à¦¶à¦¾à¦² à¦•à¦°à§à¦®à¦¶à¦¾à¦²à¦¾</option>
              </select>
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
              <span className="text-[11px] text-slate-400 font-bold">à¦¸à¦°à§à¦Ÿ:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
              >
                <option value="title">à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦¨à¦¾à¦®</option>
                <option value="lessons">à¦®à§‹à¦Ÿ à¦•à§à¦²à¦¾à¦¸ à¦¸à¦‚à¦–à§à¦¯à¦¾</option>
                <option value="fee">à¦­à¦°à§à¦¤à¦¿ à¦«à¦¿</option>
              </select>
            </div>
          </div>

        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const totalLessons = course.curriculum.reduce((acc, c) => acc + c.lessons.length, 0);
            return (
              <div
                key={course.id}
                className="bg-slate-950 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-xl group space-y-6"
              >
                <div className="space-y-4">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                      {course.batchType === 'basic' && 'à¦¬à§‡à¦¸à¦¿à¦• à¦¬à§à¦¯à¦¾à¦š'}
                      {course.batchType === 'advance' && 'à¦à¦¡à¦­à¦¾à¦¨à§à¦¸à¦¡ à¦•à§à¦²à¦¿à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦¬à§à¦¯à¦¾à¦š'}
                      {course.batchType === 'special' && 'à¦¸à§à¦ªà§‡à¦¶à¦¾à¦² à¦•à¦°à§à¦®à¦¶à¦¾à¦²à¦¾'}
                    </span>

                    <span className="text-xs text-slate-400 font-english">
                      {course.durationMonths} à¦®à¦¾à¦¸ à¦•à§‹à¦°à§à¦¸
                    </span>
                  </div>

                  {/* Course Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Fee & Lessons Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">à¦­à¦°à§à¦¤à¦¿ à¦«à¦¿</span>
                      <span className="text-sm font-black text-emerald-400 font-english mt-0.5 block">
                        à§³{course.admissionFee}/-
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">à¦®à¦¾à¦¸à¦¿à¦• à¦«à¦¿</span>
                      <span className="text-sm font-black text-amber-400 font-english mt-0.5 block">
                        à§³{course.monthlyFee}/-
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">à¦•à§à¦²à¦¾à¦¸ à¦¸à¦‚à¦–à§à¦¯à¦¾</span>
                      <span className="text-sm font-black text-white font-english mt-0.5 block">
                        {totalLessons} à¦Ÿà¦¿
                      </span>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setEditingCourseId(course.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition shadow"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>à¦¸à¦¿à¦²à§‡à¦¬à¦¾à¦¸ à¦“ à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ à¦à¦¡à¦¿à¦Ÿ</span>
                  </button>

                  <button
                    onClick={() => handleDuplicateCourse(course)}
                    title="à¦•à§‹à¦°à§à¦¸ à¦•à¦ªà¦¿ à¦•à¦°à§à¦¨"
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/courses/${course.slug}`}
                    target="_blank"
                    title="à¦²à§à¦¯à¦¾à¦¨à§à¦¡à¦¿à¦‚ à¦ªà§‡à¦œà§‡ à¦¦à§‡à¦–à§à¦¨"
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-xl border border-slate-800 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    title="à¦•à§‹à¦°à§à¦¸ à¦¡à¦¿à¦²à¦¿à¦Ÿ à¦•à¦°à§à¦¨"
                    className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    );
  }

  // ==========================================
  // 2. DEDICATED COURSE EDITOR VIEW
  // ==========================================
  return (
    <div className="space-y-6 font-bangla animate-in fade-in duration-200">
      
      {/* Top Back & Header Bar */}
      <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditingCourseId(null)}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>à¦¸à¦•à¦² à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦¤à¦¾à¦²à¦¿à¦•à¦¾</span>
          </button>

          <div>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
              à¦•à§‹à¦°à§à¦¸ à¦à¦¡à¦¿à¦Ÿà¦° à¦®à§‹à¦¡
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white truncate max-w-md">
              {editingCourse.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/courses/${editingCourse.slug}`}
            target="_blank"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-800 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>à¦ªà§à¦°à¦¿à¦­à¦¿à¦‰ à¦¦à§‡à¦–à§à¦¨</span>
          </Link>

          <button
            onClick={() => handleSaveCourse(editingCourse)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition"
          >
            <Save className="w-4 h-4" />
            <span>à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¨ à¦¸à¦‚à¦°à¦•à§à¦·à¦£ à¦•à¦°à§à¦¨</span>
          </button>
        </div>
      </div>

      {/* 1. Basic Course Details Card */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-emerald-400" />
          à§§. à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦®à§Œà¦²à¦¿à¦• à¦¤à¦¥à§à¦¯ à¦“ à¦«à¦¿ à¦¸à§‡à¦Ÿà¦¿à¦‚à¦¸
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦¨à¦¾à¦® / à¦¶à¦¿à¦°à§‹à¦¨à¦¾à¦®</label>
            <input
              type="text"
              value={editingCourse.title}
              onChange={(e) => handleSaveCourse({ ...editingCourse, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">à¦•à§‹à¦°à§à¦¸à§‡à¦° à¦¸à¦¾à¦¬-à¦Ÿà¦¾à¦‡à¦Ÿà§‡à¦² / à¦¬à¦¿à¦¬à¦°à¦£</label>
            <input
              type="text"
              value={editingCourse.subtitle}
              onChange={(e) => handleSaveCourse({ ...editingCourse, subtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">à¦¬à§à¦¯à¦¾à¦š à¦Ÿà¦¾à¦‡à¦ª</label>
            <select
              value={editingCourse.batchType}
              onChange={(e) => handleSaveCourse({ ...editingCourse, batchType: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:border-emerald-500 outline-none"
            >
              <option value="basic">à¦¬à§‡à¦¸à¦¿à¦• à¦«à¦¾à¦‰à¦¨à§à¦¡à§‡à¦¶à¦¨ à¦•à§‹à¦°à§à¦¸</option>
              <option value="advance">à¦à¦¡à¦­à¦¾à¦¨à§à¦¸à¦¡ à¦•à§à¦²à¦¿à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦°à§‡à¦ªà¦¾à¦°à§à¦Ÿà¦°à¦¿ à¦•à§‹à¦°à§à¦¸</option>
              <option value="special">à¦¸à§à¦ªà§‡à¦¶à¦¾à¦² à¦•à¦°à§à¦®à¦¶à¦¾à¦²à¦¾</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">à¦•à§‹à¦°à§à¦¸ à¦®à§‡à§Ÿà¦¾à¦¦ (à¦®à¦¾à¦¸à§‡)</label>
            <input
              type="number"
              value={editingCourse.durationMonths}
              onChange={(e) => handleSaveCourse({ ...editingCourse, durationMonths: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white font-english focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">à¦à¦•à¦•à¦¾à¦²à§€à¦¨ à¦­à¦°à§à¦¤à¦¿ à¦«à¦¿ (à¦Ÿà¦¾à¦•à¦¾)</label>
            <input
              type="number"
              value={editingCourse.admissionFee}
              onChange={(e) => handleSaveCourse({ ...editingCourse, admissionFee: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-black font-english focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">à¦®à¦¾à¦¸à¦¿à¦• à¦«à¦¿ (à¦Ÿà¦¾à¦•à¦¾)</label>
            <input
              type="number"
              value={editingCourse.monthlyFee}
              onChange={(e) => handleSaveCourse({ ...editingCourse, monthlyFee: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-amber-400 font-black font-english focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-400">à¦²à¦¾à¦‡à¦­ à¦•à§à¦²à¦¾à¦¸à§‡à¦° à¦¸à¦®à§Ÿà¦¸à§‚à¦šà¦¿ à¦Ÿà§‡à¦•à§à¦¸à¦Ÿ</label>
            <input
              type="text"
              value={editingCourse.liveSchedule}
              onChange={(e) => handleSaveCourse({ ...editingCourse, liveSchedule: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Chapter & Lessons Syllabus Editor Card */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-400" />
              à§¨. à¦…à¦§à§à¦¯à¦¾à§Ÿ à¦“ à¦­à¦¿à¦¡à¦¿à¦“ à¦²à§‡à¦•à¦šà¦¾à¦° à¦•à¦¾à¦°à¦¿à¦•à§à¦²à¦¾à¦® ({editingCourse.curriculum.length} à¦Ÿà¦¿ à¦…à¦§à§à¦¯à¦¾à§Ÿ)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              à¦…à¦§à§à¦¯à¦¾à§Ÿ à¦¯à§‹à¦— à¦•à¦°à§à¦¨, à¦†à¦¨à¦²à¦¿à¦¸à§à¦Ÿà§‡à¦¡ à¦‡à¦‰à¦Ÿà¦¿à¦‰à¦¬ à¦­à¦¿à¦¡à¦¿à¦“ à¦†à¦‡à¦¡à¦¿ à¦¬à¦¸à¦¾à¦¨ à¦à¦¬à¦‚ à¦«à§à¦°à¦¿ à¦ªà§à¦°à¦¿à¦­à¦¿à¦‰ à¦¨à¦¿à¦°à§à¦§à¦¾à¦°à¦£ à¦•à¦°à§à¦¨à¥¤
            </p>
          </div>

          <button
            onClick={addChapter}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>à¦¨à¦¤à§à¦¨ à¦…à¦§à§à¦¯à¦¾à§Ÿ à¦¯à§‹à¦— à¦•à¦°à§à¦¨</span>
          </button>
        </div>

        {/* Chapters List Accordion */}
        <div className="space-y-4">
          {editingCourse.curriculum.map((chapter) => {
            const isExpanded = expandedChapterIds.includes(chapter.id);
            return (
              <div
                key={chapter.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden space-y-4 p-4 sm:p-5"
              >
                {/* Chapter Header */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    onClick={() => toggleChapter(chapter.id)}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center text-xs shrink-0">
                      {chapter.chapterNo}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-white truncate">
                        {chapter.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {chapter.lessons.length} à¦Ÿà¦¿ à¦­à¦¿à¦¡à¦¿à¦“ à¦•à§à¦²à¦¾à¦¸
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => addLesson(chapter.id)}
                      className="flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>à¦•à§à¦²à¦¾à¦¸ à¦¯à§‹à¦— à¦•à¦°à§à¦¨</span>
                    </button>

                    <button
                      onClick={() => deleteChapter(chapter.id)}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="p-1.5 text-slate-400 hover:bg-slate-800 rounded-lg transition"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Chapter Details & Lessons (Expanded) */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-4">
                    
                    {/* Chapter Edit Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">à¦…à¦§à§à¦¯à¦¾à¦¯à¦¼à§‡à¦° à¦¶à¦¿à¦°à§‹à¦¨à¦¾à¦®</label>
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => updateChapterField(chapter.id, 'title', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">à¦…à¦§à§à¦¯à¦¾à¦¯à¦¼à§‡à¦° à¦¸à¦‚à¦•à§à¦·à§‡à¦ªà¦¿à¦¤ à¦¬à¦¿à¦¬à¦°à¦£</label>
                        <input
                          type="text"
                          value={chapter.description}
                          onChange={(e) => updateChapterField(chapter.id, 'description', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Lessons List in Chapter */}
                    <div className="space-y-3 pt-2">
                      <p className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                        à¦­à¦¿à¦¡à¦¿à¦“ à¦•à§à¦²à¦¾à¦¸ à¦¤à¦¾à¦²à¦¿à¦•à¦¾:
                      </p>

                      {chapter.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                            
                            {/* Lesson Title */}
                            <div className="sm:col-span-5">
                              <label className="text-[10px] text-slate-400 font-bold block mb-1">à¦•à§à¦²à¦¾à¦¸à§‡à¦° à¦¨à¦¾à¦®</label>
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => updateLessonField(chapter.id, lesson.id, 'title', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                              />
                            </div>

                            {/* YouTube Video ID */}
                            <div className="sm:col-span-3">
                              <label className="text-[10px] text-slate-400 font-bold block mb-1">
                                YouTube Video ID <span className="text-emerald-400 font-mono font-normal">(eg: M7lc1UVf-VE)</span>
                              </label>
                              <input
                                type="text"
                                value={lesson.youtubeVideoId || ''}
                                onChange={(e) => updateLessonField(chapter.id, lesson.id, 'youtubeVideoId', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-mono text-emerald-300 focus:border-emerald-500 outline-none"
                              />
                            </div>

                            {/* Duration */}
                            <div className="sm:col-span-2">
                              <label className="text-[10px] text-slate-400 font-bold block mb-1">à¦¸à¦®à§Ÿ (à¦®à¦¿à¦¨à¦¿à¦Ÿ)</label>
                              <input
                                type="number"
                                value={lesson.durationMin}
                                onChange={(e) => updateLessonField(chapter.id, lesson.id, 'durationMin', Number(e.target.value))}
                                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-english text-white focus:border-emerald-500 outline-none"
                              />
                            </div>

                            {/* Free Preview Toggle & Delete */}
                            <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-4">
                              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-300 font-bold">
                                <input
                                  type="checkbox"
                                  checked={lesson.isFreePreview || false}
                                  onChange={(e) => updateLessonField(chapter.id, lesson.id, 'isFreePreview', e.target.checked)}
                                  className="w-4 h-4 text-emerald-600 rounded bg-slate-900 border-slate-700 focus:ring-emerald-500"
                                />
                                <span>Free</span>
                              </label>

                              <button
                                onClick={() => deleteLesson(chapter.id, lesson.id)}
                                className="p-1 text-rose-400 hover:bg-rose-500/10 rounded transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>

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