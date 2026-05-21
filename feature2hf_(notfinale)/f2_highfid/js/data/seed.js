/**
 * js/data/seed.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Seed generator for FaiRe demo data.
 *
 * HOW TO USE:
 *   • To change the demo applicant, edit the object inside `applicants: [...]`.
 *   • To add more applicants, push more objects into the array.
 *   • Change `activeApplicantId` to switch which applicant the Applicant View shows.
 *   • All fields are self-documenting. No other file needs to be touched.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SEED_DATA = {

  // ── Active applicant shown in the Applicant View ────────────────────────
  activeApplicantId: 'APP-001',

  // ── Applicant records ────────────────────────────────────────────────────
  applicants: [
    {
      id:              'APP-001',
      name:            'Sarah Lim',
      email:           'sarah.lim@email.com',
      role:            'Junior Data Analyst',
      company:         'Nexora Technologies',
      applicationDate: '2025-05-10',

      // 'successful' | 'unsuccessful' | 'pending'
      status: 'unsuccessful',

      // Overall match percentage (0–100)
      matchScore: 60,

      // ── Evaluation criteria table ───────────────────────────────────────
      // Each row maps directly to the "What the AI checked" table.
      criteria: [
        { name: 'Python',               required: true, found: true,  detail: '✅ Found',      result: 'Pass' },
        { name: 'SQL',                  required: true, found: true,  detail: '✅ Found',      result: 'Pass' },
        { name: 'Data Analysis',        required: true, found: true,  detail: '✅ Found',      result: 'Pass' },
        { name: 'Machine Learning',     required: true, found: false, detail: '❌ Not found',  result: 'Fail' },
        { name: '3+ Years Experience',  required: true, found: false, detail: '❌ 2 yrs only', result: 'Fail' },
      ],

      // ── Decision weighting bars ─────────────────────────────────────────
      // pct: width % of the bar. type: 'skills' (teal) | 'exp' (gradient)
      weights: [
        { label: 'Skills Match',     pct: 60, type: 'skills' },
        { label: 'Experience Match', pct: 40, type: 'exp'    },
      ],

      // Minimum match threshold required to pass
      minRequiredScore: 100,

      // ── AI model used ───────────────────────────────────────────────────
      model: {
        id:                        'MODEL-2025-001',
        lastDocumented:            '2025-05-01',
        sensitiveParamsReviewed:   true,
        sensitiveParamsNote:       'all flagged parameters were justified',
        documentationStatus:       'Fully documented',
      },
    },

    // ── Add more applicants here for richer demos ──────────────────────────
    {
      id:              'APP-002',
      name:            'Jordan Lee',
      email:           'jordan.lee@email.com',
      role:            'ML Engineer',
      company:         'DataSphere Pty Ltd',
      applicationDate: '2025-05-14',
      status:          'successful',
      matchScore:      100,
      criteria: [
        { name: 'Python',           required: true, found: true, detail: '✅ Found', result: 'Pass' },
        { name: 'Machine Learning', required: true, found: true, detail: '✅ Found', result: 'Pass' },
        { name: 'TensorFlow',       required: true, found: true, detail: '✅ Found', result: 'Pass' },
        { name: '3+ Years Exp',     required: true, found: true, detail: '✅ 5 yrs', result: 'Pass' },
      ],
      weights: [
        { label: 'Skills Match',     pct: 70, type: 'skills' },
        { label: 'Experience Match', pct: 30, type: 'exp'    },
      ],
      minRequiredScore: 100,
      model: {
        id:                      'MODEL-2025-001',
        lastDocumented:          '2025-05-01',
        sensitiveParamsReviewed: true,
        sensitiveParamsNote:     'all flagged parameters were justified',
        documentationStatus:     'Fully documented',
      },
    },
  ],
};
