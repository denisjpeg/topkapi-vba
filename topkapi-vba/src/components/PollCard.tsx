import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { PollItem } from '../data/defaultContent';
import { FORMSPREE_POLL_ENDPOINT } from '../config/site';

const VOTES_KEY = 'topkapi_vba_poll_votes_v1';

function readVotes(): Record<string, { choice: string; counts: Record<string, number> }> {
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writeVotes(votes: Record<string, { choice: string; counts: Record<string, number> }>) {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

const isConfigured = FORMSPREE_POLL_ENDPOINT.includes('YOUR_POLL_FORM_ID') === false;

export function PollCard({ poll }: { poll: PollItem }) {
  const [votes, setVotes] = useState(readVotes());
  const [submitting, setSubmitting] = useState(false);
  const record = votes[poll.id];
  const hasVoted = Boolean(record);

  const totalVotes = record ? Object.values(record.counts).reduce((a, b) => a + b, 0) : 0;

  const vote = async (optionId: string, optionLabel: string) => {
    if (hasVoted || submitting) return;
    setSubmitting(true);

    if (isConfigured) {
      try {
        await fetch(FORMSPREE_POLL_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ anket: poll.question, secim: optionLabel }),
        });
      } catch {
        // sessizce yut — yerel oy yine de kaydedilir
      }
    }

    const counts: Record<string, number> = Object.fromEntries(poll.options.map((o) => [o.id, 0]));
    counts[optionId] = 1;
    const next = { ...votes, [poll.id]: { choice: optionId, counts } };
    writeVotes(next);
    setVotes(next);
    setSubmitting(false);
  };

  return (
    <div className="p-6 rounded-md border border-line bg-panel/60">
      <h3 className="font-display font-semibold text-lg text-paper leading-snug">{poll.question}</h3>
      {poll.description && (
        <p className="mt-2 text-sm text-mist-500 leading-relaxed">{poll.description}</p>
      )}

      <div className="mt-5 space-y-2">
        {poll.options.map((opt) => {
          const count = record?.counts[opt.id] ?? 0;
          const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isChoice = record?.choice === opt.id;

          if (hasVoted) {
            return (
              <div key={opt.id} className="relative overflow-hidden rounded-sm border border-line">
                <div
                  className="absolute inset-y-0 left-0 bg-steel-900/50"
                  style={{ width: `${pct}%` }}
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-between px-4 py-3 text-sm">
                  <span className={`flex items-center gap-2 ${isChoice ? 'text-paper font-medium' : 'text-mist-300'}`}>
                    {isChoice && <CheckCircle2 size={14} className="text-steel-400" />}
                    {opt.label}
                  </span>
                  <span className="font-mono text-xs text-mist-500">{pct}%</span>
                </div>
              </div>
            );
          }

          return (
            <button
              key={opt.id}
              onClick={() => vote(opt.id, opt.label)}
              disabled={submitting}
              className="focus-ring w-full text-left px-4 py-3 rounded-sm border border-line text-sm text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors disabled:opacity-60"
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {hasVoted ? (
        <p className="mt-4 text-xs text-mist-500">Oyun kaydedildi — teşekkürler.</p>
      ) : (
        <p className="mt-4 text-xs text-mist-500">Bir seçenek seç, oyun tek tıkla kaydedilsin.</p>
      )}
      {!isConfigured && (
        <p className="mt-1 text-[11px] text-mist-500">
          Not: Anket sonuçları şu an sadece kendi tarayıcında görünür; kulüp yönetimi için toplu sonuç almak üzere{' '}
          <code className="text-steel-400">FORMSPREE_POLL_ENDPOINT</code> ayarlanmalı.
        </p>
      )}
    </div>
  );
}
