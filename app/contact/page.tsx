'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Phone, MessageCircle, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react';

export default function ContactPage() {
  const { settings } = useApp();

  return (
    <div className="bg-white min-h-screen font-bangla">
      
      {/* Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 text-white py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
            ????????? ? ??????
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">
            ??????? ? ????? ??????????
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90">
            ????? ????????? ?????? ?????? ???? ?????? ?? ?? ???????????? ??????? ?????
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-300 rounded-3xl p-6 flex items-start gap-4 text-amber-950">
            <div className="p-3 bg-amber-200/60 rounded-2xl text-amber-800 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1">???????????? ???????</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
                ???? ????? ????????? ??????? ????????? ???????????? ??????? ? ????????????? ???? ???? ?????????? ??????????? 
                <strong> ????? ???? ?????? ?????? ???? ???? ??? ?? ?? ??????? ???? ????? ???? ??????? ????? ?? ???</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Contact Card 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                ????????? ? ?????????
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">?????? ??? ??:</p>
                    <a href={`tel:${settings.whatsappNumber}`} className="font-bold text-slate-900 text-base hover:underline">
                      {settings.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">??????????? ???????:</p>
                    <a
                      href={`https://wa.me/880${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#25D366] text-base hover:underline"
                    >
                      {settings.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">??????? ???????:</p>
                    <p className="font-bold text-slate-900">{settings.classTime} (Google Meet)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card 2: Payment Details */}
            <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-200 space-y-6">
              <h3 className="text-xl font-bold text-emerald-950 border-b border-emerald-200 pb-3">
                ???????? ??????? ?????
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="p-4 bg-white rounded-2xl border border-pink-200 space-y-1">
                  <span className="text-xs font-bold text-pink-700 uppercase">????? ({settings.bkashType})</span>
                  <p className="text-lg font-black font-mono text-slate-900">{settings.bkashNumber}</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-orange-200 space-y-1">
                  <span className="text-xs font-bold text-orange-700 uppercase">??? ({settings.nagadType})</span>
                  <p className="text-lg font-black font-mono text-slate-900">{settings.nagadNumber}</p>
                </div>

                <p className="text-xs text-slate-500 italic">
                  * ???? ??????? ?? ?????????? ???? (TrxID) ??????? ???? ??? ????? ????? ?????? ?????
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
