// ResultsPanel.jsx
// Shows the parsed form values and the auto-fetched/computed fields
// (AIR, BDI, Distance, Openness) in the right column.
//
// Props:
//   parsedData: object | null  — the output of buildParsedData() in ShipmentForm

import styles from './ResultsPanel.module.css';

// Fields that come from background API calls or backend computation.
// Your team will wire these up to actual API calls later.
const API_FIELDS = [
  { key: 'AIR',      label: 'AIR index',       source: 'api' },
  { key: 'BDI',      label: 'BDI index',        source: 'api' },
  { key: 'Distance', label: 'Distance (km)',    source: 'computed' },
  { key: 'Openness', label: 'Openness index',   source: 'computed' },
];

export default function ResultsPanel({ parsedData }) {
  return (
    <aside className={styles.panel}>

      {/* ── Auto-fetched fields ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Background fields</h2>
        {API_FIELDS.map(({ key, label, source }) => (
          <div className={styles.field} key={key}>
            <div className={styles.fieldHeader}>
              <label>{label}</label>
              <span className={source === 'api' ? styles.badgeApi : styles.badgeComputed}>
                {source === 'api' ? 'API' : 'computed'}
              </span>
            </div>
            <input
              type="text"
              readOnly
              value={parsedData?.[key] ?? ''}
              placeholder={source === 'api' ? 'fetched on submit' : 'derived from inputs'}
              className={styles.readonlyInput}
            />
          </div>
        ))}
      </section>

      {/* ── Parsed values ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Parsed values</h2>

        {parsedData === null ? (
          <p className={styles.empty}>Click "Run prediction" to see parsed values.</p>
        ) : (
          <div className={styles.valueList}>
            {Object.entries(parsedData)
              // Don't repeat the API fields we already show above
              .filter(([key]) => !API_FIELDS.map((f) => f.key).includes(key))
              .map(([key, value]) => (
                <div className={styles.valueRow} key={key}>
                  <span className={styles.valueKey}>{key}</span>
                  <span className={styles.valueVal}>
                    {value === null || value === ''
                      ? <em className={styles.empty}>—</em>
                      : String(value)}
                  </span>
                </div>
              ))}
          </div>
        )}
      </section>
    </aside>
  );
}
