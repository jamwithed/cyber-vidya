import { useMemo, useState } from 'react'
import { salaryConfig } from '../data/salary'
import { tracks } from '../data/tracks'
import type { TargetLevel, TrackId } from '../types'

const LEVELS: TargetLevel[] = ['Junior', 'Intermediate', 'Senior']

export function Estimator() {
  const [track, setTrack] = useState<TrackId>('soc')
  const [level, setLevel] = useState<TargetLevel>('Junior')
  const [weeklyHours, setWeeklyHours] = useState(12)

  const result = useMemo(() => {
    const hours = salaryConfig.baselineHours[track][level]
    const band = salaryConfig.salary[track][level]
    // Convert total study hours → calendar months (~4.33 weeks/month).
    const months = hours / (weeklyHours * 4.33)
    const low = Math.max(1, Math.round(months * 0.85))
    const high = Math.round(months * 1.15)
    return { band, low, high }
  }, [track, level, weeklyHours])

  return (
    <section id="estimator" className="scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 max-w-2xl">
          <span className="section-eyebrow">Plan It</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Salary &amp; Learning-Effort Estimator
          </h2>
          <p className="mt-3 text-white/65">
            Tell us your target and how much time you can commit each week. We'll
            estimate how long it takes to get job-ready and the indicative
            salary band you'd be aiming for.
          </p>
        </div>

        <div className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-display text-xs uppercase tracking-wider text-white/55">
                Track
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tracks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTrack(t.id)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      track === t.id
                        ? 'border-aqua/60 bg-aqua/10 text-white'
                        : 'border-white/12 bg-white/[0.03] text-white/75 hover:border-white/30'
                    }`}
                  >
                    {t.shortName}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-display text-xs uppercase tracking-wider text-white/55">
                Target level
              </label>
              <div className="flex gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-sm transition ${
                      level === l
                        ? 'border-aqua/60 bg-aqua/10 text-white'
                        : 'border-white/12 bg-white/[0.03] text-white/75 hover:border-white/30'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center justify-between font-display text-xs uppercase tracking-wider text-white/55">
                <span>Weekly study hours</span>
                <span className="text-aqua">{weeklyHours} hrs/wk</span>
              </label>
              <input
                type="range"
                min={2}
                max={40}
                step={1}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-[#22A7C8]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-white/40">
                <span>2</span>
                <span>40</span>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col justify-center gap-5 rounded-2xl border border-aqua/25 bg-midnight-900/50 p-6">
            <div>
              <div className="font-display text-xs uppercase tracking-wider text-white/55">
                Estimated time to {level.toLowerCase()}
              </div>
              <div className="mt-1 font-display text-4xl font-bold brand-text-gradient">
                {result.low}–{result.high} months
              </div>
              <div className="mt-1 text-xs text-white/50">
                at {weeklyHours} hrs/week of focused study &amp; practice
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <div className="font-display text-xs uppercase tracking-wider text-white/55">
                Indicative salary band
              </div>
              <div className="mt-1 font-display text-4xl font-bold text-aqua">
                ₹{result.band.minLpa}–{result.band.maxLpa} LPA
              </div>
              <div className="mt-1 text-xs text-white/50">
                {tracks.find((t) => t.id === track)?.name} · {level}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs italic text-white/45">{salaryConfig.disclaimer}</p>
      </div>
    </section>
  )
}
