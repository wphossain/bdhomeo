'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  Settings, 
  Save, 
  Phone, 
  Megaphone, 
  Video, 
  Clock, 
  Globe, 
  Youtube, 
  Facebook, 
  CreditCard,
  User,
  Sparkles
} from 'lucide-react';

export function SiteSettingsForm() {
  const { settings, updateSettings, showToast } = useApp();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings(formData);
    setIsSaving(false);
    showToast('à¦“à§Ÿà§‡à¦¬à¦¸à¦¾à¦‡à¦Ÿà§‡à¦° à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ à¦“ à¦¨à¦®à§à¦¬à¦° à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦†à¦ªà¦¡à§‡à¦Ÿ à¦¹à§Ÿà§‡à¦›à§‡!', 'success');
  };

  return (
    <div className="space-y-6 font-bangla">
      
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-400" />
            à¦¸à¦¾à¦‡à¦Ÿ à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ à¦“ à¦¨à¦®à§à¦¬à¦° à¦¸à§‡à¦Ÿà¦¿à¦‚à¦¸ (Site Settings CMS)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            à¦¬à¦¿à¦•à¦¾à¦¶ à¦®à¦¾à¦°à§à¦šà§‡à¦¨à§à¦Ÿ à¦¨à¦®à§à¦¬à¦°, à¦¹à§‹à§Ÿà¦¾à¦Ÿà¦¸à¦…à§à¦¯à¦¾à¦ª à¦¨à¦®à§à¦¬à¦°, à¦¹à§‡à¦²à§à¦ªà¦²à¦¾à¦‡à¦¨, à¦¨à§‹à¦Ÿà¦¿à¦¶ à¦à¦¬à¦‚ à¦²à§à¦¯à¦¾à¦¨à§à¦¡à¦¿à¦‚ à¦ªà§‡à¦œà§‡à¦° à¦¬à¦¿à¦¬à¦°à¦£ à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¨ à¦•à¦°à§à¦¨à¥¤
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'à¦¸à¦‚à¦°à¦•à§à¦·à¦£ à¦¹à¦šà§à¦›à§‡...' : 'à¦¸à¦•à¦² à¦¸à§‡à¦Ÿà¦¿à¦‚à¦¸ à¦¸à¦‚à¦°à¦•à§à¦·à¦£ à¦•à¦°à§à¦¨'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Official Payment Numbers */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            à§§. à¦…à¦«à¦¿à¦¸à¦¿à§Ÿà¦¾à¦² à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¨à¦®à§à¦¬à¦° à¦¸à§‡à¦Ÿà¦¿à¦‚à¦¸ (bKash Merchant & Nagad)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* bKash */}
            <div className="space-y-3 p-4 bg-slate-900 rounded-2xl border border-pink-500/30">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-pink-400">
                  à¦¬à¦¿à¦•à¦¾à¦¶ à¦®à¦¾à¦°à§à¦šà§‡à¦¨à§à¦Ÿ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¨à¦®à§à¦¬à¦° (Payment Option)
                </label>
                <span className="bg-pink-500/20 text-pink-300 text-[10px] font-black px-2 py-0.5 rounded">
                  Merchant
                </span>
              </div>
              <input
                type="text"
                value={formData.bkashNumber}
                onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                className="w-full bg-slate-950 border border-pink-500/40 rounded-xl px-3.5 py-2.5 text-sm font-mono font-black text-white outline-none focus:border-pink-500"
              />
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-pink-300">
                  <input
                    type="radio"
                    name="bkashType"
                    checked={formData.bkashType === 'Merchant'}
                    onChange={() => setFormData({ ...formData, bkashType: 'Merchant' })}
                  />
                  <span>Merchant (Payment)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                  <input
                    type="radio"
                    name="bkashType"
                    checked={formData.bkashType === 'Personal'}
                    onChange={() => setFormData({ ...formData, bkashType: 'Personal' })}
                  />
                  <span>Personal (Send Money)</span>
                </label>
              </div>
            </div>

            {/* Nagad */}
            <div className="space-y-3 p-4 bg-slate-900 rounded-2xl border border-orange-500/30">
              <label className="text-xs font-bold text-orange-400 block">
                à¦¨à¦—à¦¦ à¦¨à¦®à§à¦¬à¦° (Send Money / Payment)
              </label>
              <input
                type="text"
                value={formData.nagadNumber}
                onChange={(e) => setFormData({ ...formData, nagadNumber: e.target.value })}
                className="w-full bg-slate-950 border border-orange-500/40 rounded-xl px-3.5 py-2.5 text-sm font-mono font-black text-white outline-none focus:border-orange-500"
              />
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-orange-300">
                  <input
                    type="radio"
                    name="nagadType"
                    checked={formData.nagadType === 'Personal'}
                    onChange={() => setFormData({ ...formData, nagadType: 'Personal' })}
                  />
                  <span>Personal (Send Money)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                  <input
                    type="radio"
                    name="nagadType"
                    checked={formData.nagadType === 'Merchant'}
                    onChange={() => setFormData({ ...formData, nagadType: 'Merchant' })}
                  />
                  <span>Merchant (Payment)</span>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Helpline & Social Media */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone className="w-5 h-5 text-emerald-400" />
            à§¨. à¦¸à§à¦¯à¦¾à¦°à§‡à¦° à¦®à§‚à¦² à¦¹à§‡à¦²à§à¦ªà¦²à¦¾à¦‡à¦¨, à¦¹à§‹à§Ÿà¦¾à¦Ÿà¦¸à¦…à§à¦¯à¦¾à¦ª à¦“ à¦¸à§‹à¦¶à§à¦¯à¦¾à¦² à¦²à¦¿à¦‚à¦•
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/30 space-y-2">
              <label className="text-xs font-bold text-emerald-400 block">
                à¦¹à§‹à§Ÿà¦¾à¦Ÿà¦¸à¦…à§à¦¯à¦¾à¦ª à¦¨à¦®à§à¦¬à¦° (WhatsApp Floating à¦“ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-white outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-400">à¦¡à¦¿à¦«à¦²à§à¦Ÿ: 01811-123993</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/30 space-y-2">
              <label className="text-xs font-bold text-emerald-400 block">
                à¦¸à¦°à¦¾à¦¸à¦°à¦¿ à¦«à§‹à¦¨ à¦•à¦² à¦“ à¦¹à§‡à¦²à§à¦ªà¦²à¦¾à¦‡à¦¨ à¦¨à¦®à§à¦¬à¦°
              </label>
              <input
                type="text"
                value={formData.helplineNumber}
                onChange={(e) => setFormData({ ...formData, helplineNumber: e.target.value })}
                className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-white outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-400">à¦¡à¦¿à¦«à¦²à§à¦Ÿ: 01811-123993</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">à¦‡à¦‰à¦Ÿà¦¿à¦‰à¦¬ à¦šà§à¦¯à¦¾à¦¨à§‡à¦² à¦²à¦¿à¦‚à¦• (YouTube URL)</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">à¦¸à§à¦¯à¦¾à¦°à§‡à¦° à¦«à§‡à¦¸à¦¬à§à¦• à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦² à¦²à¦¿à¦‚à¦• (Facebook URL)</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 3. Live Class Google Meet & Notice Bar */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Megaphone className="w-5 h-5 text-emerald-400" />
            à§©. à¦—à§à¦—à¦² à¦®à¦¿à¦Ÿ à¦²à¦¾à¦‡à¦­ à¦•à§à¦²à¦¾à¦¸à¦°à§à¦® à¦“ à¦¶à§€à¦°à§à¦· à¦˜à§‹à¦·à¦£à¦¾ à¦¨à§‹à¦Ÿà¦¿à¦¶
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">à¦—à§à¦—à¦² à¦®à¦¿à¦Ÿ (Google Meet) à¦•à§à¦²à¦¾à¦¸à¦°à§à¦® à¦²à¦¿à¦‚à¦•</label>
              <input
                type="url"
                value={formData.googleMeetUrl}
                onChange={(e) => setFormData({ ...formData, googleMeetUrl: e.target.value })}
                className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-emerald-300 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">à¦•à§à¦²à¦¾à¦¸à§‡à¦° à¦¸à¦®à§Ÿà¦¸à§‚à¦šà¦¿ à¦Ÿà§‡à¦•à§à¦¸à¦Ÿ</label>
              <input
                type="text"
                value={formData.classTime}
                onChange={(e) => setFormData({ ...formData, classTime: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">à¦ªà§à¦°à¦¤à¦¿à¦·à§à¦ à¦¾à¦¨à§‡à¦° à¦¸à§à¦²à§‹à¦—à¦¾à¦¨</label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">à¦¶à§€à¦°à§à¦· à¦˜à§‹à¦·à¦£à¦¾ à¦¨à§‹à¦Ÿà¦¿à¦¶ (Announcement Marquee)</label>
              <textarea
                rows={2}
                value={formData.noticeText}
                onChange={(e) => setFormData({ ...formData, noticeText: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}