import type { SalaryEstimateConfig } from '../types'

/**
 * Drives the salary / learning-effort estimator.
 * Edit these numbers freely — no component hard-codes salaries.
 *
 * `salary`        — indicative India bands (LPA) per track & target level.
 * `baselineHours` — total study hours typically needed to reach each level;
 *                   the estimator divides this by the learner's weekly hours.
 */
export const salaryConfig: SalaryEstimateConfig = {
  salary: {
    soc: {
      Junior: { minLpa: 4, maxLpa: 7 },
      Intermediate: { minLpa: 7, maxLpa: 13 },
      Senior: { minLpa: 13, maxLpa: 24 },
    },
    pentest: {
      Junior: { minLpa: 5, maxLpa: 9 },
      Intermediate: { minLpa: 9, maxLpa: 16 },
      Senior: { minLpa: 16, maxLpa: 30 },
    },
    cloud: {
      Junior: { minLpa: 6, maxLpa: 11 },
      Intermediate: { minLpa: 11, maxLpa: 20 },
      Senior: { minLpa: 20, maxLpa: 36 },
    },
    grc: {
      Junior: { minLpa: 5, maxLpa: 9 },
      Intermediate: { minLpa: 9, maxLpa: 16 },
      Senior: { minLpa: 16, maxLpa: 28 },
    },
  },
  baselineHours: {
    soc: { Junior: 320, Intermediate: 720, Senior: 1500 },
    pentest: { Junior: 480, Intermediate: 1000, Senior: 2000 },
    cloud: { Junior: 420, Intermediate: 900, Senior: 1800 },
    grc: { Junior: 300, Intermediate: 650, Senior: 1300 },
  },
  disclaimer:
    'Estimates are approximate and for guidance only. Real salaries and timelines vary widely by city, company, prior experience, certifications and interview performance.',
}
