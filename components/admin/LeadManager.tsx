'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { OrientationLead } from '@/lib/types';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Phone, 
  UserCheck, 
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';

export function LeadManager() {
  const { leads, settings, updateLeadStatus, submitOrientationLead, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'joined'>('all');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // New manual lead form
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualBackground, setManualBackground] = useState('à¦¹à§‹à¦®à¦¿à¦“à¦ªà§à¦¯à¦¾à¦¥à¦¿à¦• à¦ªà§à¦°à§à¦¯à¦¾à¦•à¦Ÿà¦¿à¦¶à¦¨à¦¾à¦°');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.homeoBackground.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSendWhatsApp = (lead: OrientationLead) => {
    const rawNumber = lead.phone.replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('880') ? rawNumber : `880${rawNumber.startsWith('0') ? rawNumber.slice(1) : rawNumber}`;
    const msg = `à¦†à¦¸à¦¸à¦¾à¦²à¦¾à¦®à§ à¦†à¦²à¦¾à¦‡à¦•à§à¦® ${lead.name} à¦¡à¦¾à¦•à§à¦¤à¦¾à¦° à¦¸à¦¾à¦¹à§‡à¦¬,\n\nà¦¬à¦¿à¦¡à¦¿ à¦¹à§‹à¦®à¦¿à¦“ à¦ªà§à¦°à¦¶à¦¿à¦•à§à¦·à¦£ à¦•à§‡à¦¨à§à¦¦à§à¦°à§‡à¦° à¦«à§à¦°à¦¿ à¦“à¦°à¦¿à§Ÿà§‡à¦¨à§à¦Ÿà§‡à¦¶à¦¨ à¦•à§à¦²à¦¾à¦¸à§‡ à¦°à§‡à¦œà¦¿à¦¸à§à¦Ÿà§à¦°à§‡à¦¶à¦¨ à¦•à¦°à¦¾à¦° à¦œà¦¨à§à¦¯ à¦§à¦¨à§à¦¯à¦¬à¦¾à¦¦à¥¤\n\nðŸ“… à¦²à¦¾à¦‡à¦­ à¦•à§à¦²à¦¾à¦¸à§‡à¦° à¦¸à¦®à§Ÿ: ${settings.classTime}\nðŸ”— à¦¸à¦°à¦¾à¦¸à¦°à¦¿ à¦—à§à¦—à¦² à¦®à¦¿à¦Ÿ à¦²à¦¿à¦‚à¦•: ${settings.googleMeetUrl}\n\nà¦¯à§‡à¦•à§‹à¦¨à§‹ à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨à§‡ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦…à¦«à¦¿à¦¸à¦¿à§Ÿà¦¾à¦² à¦¹à§‡à¦²à§à¦ªà¦²à¦¾à¦‡à¦¨à§‡ à¦¯à§‹à¦—à¦¾à¦¯à§‹à¦— à¦•à¦°à§à¦¨: ${settings.helplineNumber}\nâ€” à¦¡à¦¾à¦ƒ à¦®à§‹à¦ƒ à¦—à¦¿à§Ÿà¦¾à¦¸ à¦‰à¦¦à§à¦¦à¦¿à¦¨, à¦¬à¦¿à¦¡à¦¿ à¦¹à§‹à¦®à¦¿à¦“`;
    
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    updateLeadStatus(lead.id, 'contacted');
  };

  const handleManualAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    await submitOrientationLead({
      name: manualName,
      phone: manualPhone,
      homeoBackground: manualBackground,
    });

    setManualName('');
    setManualPhone('');
    setIsAddLeadModalOpen(false);
  };

  const newCount = leads.filter((l) => l.status === 'new').length;
  const contactedCount = leads.filter((l) => l.status === 'contacted').length;
  const joinedCount = leads.filter((l) => l.status === 'joined').length;

  return (
    <div className="space-y-6 font-bangla">
      
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
            à¦«à§à¦°à¦¿ à¦“à¦°à¦¿à§Ÿà§‡à¦¨à§à¦Ÿà§‡à¦¶à¦¨ à¦²à¦¿à¦¡ à¦¸à¦¿à¦†à¦°à¦à¦® (Orientation Lead CRM)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            à¦«à§à¦°à¦¿ à¦•à§à¦²à¦¾à¦¸à§‡ à¦°à§‡à¦œà¦¿à¦¸à§à¦Ÿà§à¦°à§‡à¦¶à¦¨ à¦•à¦°à¦¾ à¦†à¦—à§à¦°à¦¹à§€à¦¦à§‡à¦° à§§-à¦•à§à¦²à¦¿à¦•à§‡ à¦¹à§‹à§Ÿà¦¾à¦Ÿà¦¸à¦…à§à¦¯à¦¾à¦ªà§‡ à¦—à§à¦—à¦² à¦®à¦¿à¦Ÿ à¦²à¦¿à¦‚à¦• à¦ªà¦¾à¦ à¦¾à¦¨à¥¤
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦²à¦¿ à¦²à¦¿à¦¡ à¦¯à§‹à¦— à¦•à¦°à§à¦¨</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="à¦¨à¦¾à¦®, à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° à¦¬à¦¾ à¦¬à§à¦¯à¦¾à¦•à¦—à§à¦°à¦¾à¦‰à¦¨à§à¦¡ à¦¦à¦¿à§Ÿà§‡ à¦–à§à¦à¦œà§à¦¨..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
            >
              <option value="all">à¦¸à¦•à¦² à¦²à¦¿à¦¡ ({leads.length})</option>
              <option value="new">à¦¨à¦¤à§à¦¨ à¦²à¦¿à¦¡ ({newCount})</option>
              <option value="contacted">à¦²à¦¿à¦‚à¦• à¦ªà¦¾à¦ à¦¾à¦¨à§‹ à¦¹à§Ÿà§‡à¦›à§‡ ({contactedCount})</option>
              <option value="joined">à¦­à¦°à§à¦¤à¦¿ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤ ({joinedCount})</option>
            </select>
          </div>

        </div>

      </div>

      {/* Table */}
      {filteredLeads.length === 0 ? (
        <div className="bg-slate-950 rounded-3xl p-12 text-center border border-slate-800 text-slate-500 space-y-2">
          <MessageSquare className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-bold text-slate-400">à¦•à§‹à¦¨à§‹ à¦²à¦¿à¦¡ à¦ªà¦¾à¦“à§Ÿà¦¾ à¦¯à¦¾à§Ÿà¦¨à¦¿</p>
          <p className="text-xs">à¦²à§à¦¯à¦¾à¦¨à§à¦¡à¦¿à¦‚ à¦ªà§‡à¦œ à¦¥à§‡à¦•à§‡ à¦«à§à¦°à¦¿ à¦•à§à¦²à¦¾à¦¸à§‡à¦° à¦œà¦¨à§à¦¯ à¦«à¦°à§à¦® à¦ªà§‚à¦°à¦£ à¦•à¦°à¦²à§‡ à¦à¦–à¦¾à¦¨à§‡ à¦¦à§‡à¦–à¦¾ à¦¯à¦¾à¦¬à§‡à¥¤</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-5">à¦¨à¦¾à¦® à¦“ à¦¤à¦¥à§à¦¯</th>
                  <th className="py-4 px-5">à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦°</th>
                  <th className="py-4 px-5">à¦¹à§‹à¦®à¦¿à¦“à¦ªà§à¦¯à¦¾à¦¥à¦¿à¦• à¦¬à§à¦¯à¦¾à¦•à¦—à§à¦°à¦¾à¦‰à¦¨à§à¦¡</th>
                  <th className="py-4 px-5">à¦¸à§à¦Ÿà§à¦¯à¦¾à¦Ÿà¦¾à¦¸</th>
                  <th className="py-4 px-5 text-right">à¦¹à§‹à§Ÿà¦¾à¦Ÿà¦¸à¦…à§à¦¯à¦¾à¦ª à¦²à¦¿à¦‚à¦• à¦ªà¦¾à¦ à¦¾à¦¨</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-4 px-5 font-bold text-white text-sm">
                      {lead.name}
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-emerald-400 text-xs">
                      {lead.phone}
                    </td>
                    <td className="py-4 px-5 text-slate-300">
                      {lead.homeoBackground}
                    </td>
                    <td className="py-4 px-5">
                      {lead.status === 'new' && (
                        <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-black px-2.5 py-1 rounded-full">
                          à¦¨à¦¤à§à¦¨ à¦²à¦¿à¦¡
                        </span>
                      )}
                      {lead.status === 'contacted' && (
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> à¦²à¦¿à¦‚à¦• à¦ªà¦¾à¦ à¦¾à¦¨à§‹ à¦¹à§Ÿà§‡à¦›à§‡
                        </span>
                      )}
                      {lead.status === 'joined' && (
                        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-2.5 py-1 rounded-full">
                          à¦­à¦°à§à¦¤à¦¿ à¦¸à¦®à§à¦ªà¦¨à§à¦¨
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleSendWhatsApp(lead)}
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3.5 py-2 rounded-xl shadow transition text-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Meet à¦²à¦¿à¦‚à¦• à¦ªà¦¾à¦ à¦¾à¦¨</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦²à¦¿ à¦¨à¦¤à§à¦¨ à¦²à¦¿à¦¡ à¦¯à§à¦•à§à¦¤ à¦•à¦°à§à¦¨
              </h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddLead} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">à¦¶à¦¿à¦•à§à¦·à¦¾à¦°à§à¦¥à§€à¦° à¦¨à¦¾à¦®</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="à¦¯à§‡à¦®à¦¨: à¦¡à¦¾à¦ƒ à¦®à§‹à¦ƒ à¦°à¦«à¦¿à¦•à§à¦² à¦‡à¦¸à¦²à¦¾à¦®"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦°</label>
                <input
                  type="tel"
                  required
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="à¦¯à§‡à¦®à¦¨: 017XXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">à¦¹à§‹à¦®à¦¿à¦“à¦ªà§à¦¯à¦¾à¦¥à¦¿à¦• à¦¬à§à¦¯à¦¾à¦•à¦—à§à¦°à¦¾à¦‰à¦¨à§à¦¡</label>
                <input
                  type="text"
                  value={manualBackground}
                  onChange={(e) => setManualBackground(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition"
              >
                à¦²à¦¿à¦¡ à¦¸à§‡à¦­ à¦•à¦°à§à¦¨
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}