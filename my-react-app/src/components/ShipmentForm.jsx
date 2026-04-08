// ShipmentForm.jsx
// This is the main form component. It manages all form state and calls
// the parse helpers when the user submits.

import { useState } from 'react';
import {
  parseFloat64,
  parseDigits,
  parseQuantity,
  parseDoses,
  mostSimilarType,
  computeTotalWeight,
} from '../utils/parseHelpers';
import ResultsPanel from './ResultsPanel';
import styles from './ShipmentForm.module.css';

// The fields we render as plain number/text inputs.
// label     → display label
// id        → key in form state
// type      → HTML input type
// placeholder
// hint      → optional small helper text below the input
const TEXT_FIELDS = [
  { label: 'Destination country',   id: 'country',         type: 'text',   placeholder: 'e.g. Kenya' },
  { label: 'Supplier country',      id: 'supplierCountry', type: 'text',   placeholder: 'e.g. Belgium' },
  { label: 'Product code (4-digit)',id: 'product',         type: 'text',   placeholder: 'e.g. 1234', hint: 'First 2 digits = type, last 2 = version' },
  { label: 'Variant (2-digit)',      id: 'variant',         type: 'text',   placeholder: 'e.g. 05',   hint: 'Dose count or presentation' },
  { label: 'Quantity (units)',       id: 'quantity',        type: 'number', placeholder: 'e.g. 50000' },
  { label: 'Freight cost (USD)',     id: 'freight',         type: 'number', placeholder: 'e.g. 12500.00', step: '0.01' },
  { label: 'Value (USD)',            id: 'value',           type: 'number', placeholder: 'e.g. 75000', step: '0.01' },
  { label: 'Volume (cm³)',           id: 'volume',          type: 'number', placeholder: 'e.g. 4800' },
  { label: 'Weight per unit (kg)',   id: 'weight',          type: 'number', placeholder: 'e.g. 0.025', step: '0.001' },
  { label: 'Doses per vial',         id: 'doses',           type: 'number', placeholder: 'e.g. 10', min: '1' },
];

const PRODUCT_TYPES = ['vaccine', 'syringe', 'immunoglobulin'];

// Initial/empty state for the form
const INITIAL_STATE = {
  country: '',
  supplierCountry: '',
  poDate: '',
  type: 'vaccine',
  product: '',
  variant: '',
  quantity: '',
  freight: '',
  value: '',
  volume: '',
  weight: '',
  doses: '',
  storage: 2,
};

export default function ShipmentForm() {
  const [form, setForm]           = useState(INITIAL_STATE);
  const [parsedData, setParsedData] = useState(null);  // null = not yet submitted
  const [saved, setSaved]           = useState(false);

  // Derive total shipment weight reactively whenever weight/quantity/doses change.
  // This mirrors the original on_button_clicked logic but happens live.
  const totalWeight = computeTotalWeight(
    parseFloat(form.weight)   || 0,
    parseFloat(form.quantity) || 0,
    parseFloat(form.doses)    || 1,
  );

  // Generic change handler — updates a single field in form state.
  // In React, you never mutate state directly; you always create a new object.
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  // Build the parsed data object — mirrors what on_button_clicked_calculate did.
  function buildParsedData() {
    return {
      Country:             form.country,
      SupplierCountry:     form.supplierCountry,
      PurchaseOrderDate:   form.poDate,
      Type:                mostSimilarType(form.type),   // already a valid type from buttons, but run through parser anyway
      Product:             parseDigits(form.product, 4),
      Variant:             parseDigits(form.variant, 2),
      Quantity:            parseQuantity(form.quantity),
      Freight:             parseFloat64(form.freight),
      Value:               parseFloat64(form.value),
      Doses:               parseDoses(form.doses),
      Volume:              parseFloat64(form.volume),
      StorageCondition:    Number(form.storage),
      Weight:              parseFloat64(form.weight),
      TotalShipmentWeight: totalWeight,
      // These are placeholders — your backend/API will fill these in
      AIR:                 null,
      BDI:                 null,
      Distance:            null,
      Openness:            null,
    };
  }

  function handleSave() {
    setParsedData(buildParsedData());
    setSaved(true);
  }

  function handleCalculate() {
    const data = buildParsedData();
    setParsedData(data);
    setSaved(false);
    // TODO: send `data` to your prediction model API
    // e.g. fetch('/api/predict', { method: 'POST', body: JSON.stringify(data) })
    console.log('Sending to model:', data);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        {/* Replace with your actual logo */}
        <div className={styles.logoPlaceholder}>PAHO</div>
        <div>
          <h1 className={styles.title}>Shipment entry</h1>
          <p className={styles.subtitle}>Enter shipment details to run a freight prediction</p>
        </div>
      </header>

      <div className={styles.layout}>
        {/* ── Left column: form inputs ── */}
        <div className={styles.formCol}>

          {/* Section 1: Destination & Origin */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Destination &amp; origin</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Destination country</label>
                <input type="text" value={form.country} onChange={handleChange('country')} placeholder="e.g. Kenya" />
              </div>
              <div className={styles.field}>
                <label>Supplier country</label>
                <input type="text" value={form.supplierCountry} onChange={handleChange('supplierCountry')} placeholder="e.g. Belgium" />
              </div>
            </div>
            <div className={styles.field}>
              <label>Purchase order date</label>
              <input type="date" value={form.poDate} onChange={handleChange('poDate')} />
            </div>
          </section>

          {/* Section 2: Product */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Product</h2>

            {/* Product type toggle — replaces the free-text Type_ input */}
            <div className={styles.field}>
              <label>Product type</label>
              <div className={styles.typeToggle}>
                {PRODUCT_TYPES.map((t) => (
                  <button
                    key={t}
                    className={`${styles.typeBtn} ${form.type === t ? styles.typeBtnActive : ''}`}
                    onClick={() => setForm((prev) => ({ ...prev, type: t }))}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Product code <span className={styles.hint}>(4-digit)</span></label>
                <input type="text" value={form.product} onChange={handleChange('product')} placeholder="e.g. 1234" maxLength={6} />
                <span className={styles.hintText}>First 2 digits = type, last 2 = version</span>
              </div>
              <div className={styles.field}>
                <label>Variant <span className={styles.hint}>(2-digit)</span></label>
                <input type="text" value={form.variant} onChange={handleChange('variant')} placeholder="e.g. 05" maxLength={4} />
                <span className={styles.hintText}>Dose count or presentation</span>
              </div>
              <div className={styles.field}>
                <label>Doses per vial</label>
                <input type="number" value={form.doses} onChange={handleChange('doses')} placeholder="e.g. 10" min="1" />
              </div>
            </div>

            {/* Storage temperature slider */}
            <div className={styles.field}>
              <label>Storage temperature (°C)</label>
              <div className={styles.sliderRow}>
                <input
                  type="range"
                  min="-50" max="100" step="1"
                  value={form.storage}
                  onChange={handleChange('storage')}
                />
                <span className={styles.sliderVal}>{form.storage}°C</span>
              </div>
            </div>
          </section>

          {/* Section 3: Quantities */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quantities &amp; logistics</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Quantity (units)</label>
                <input type="number" value={form.quantity} onChange={handleChange('quantity')} placeholder="e.g. 50000" min="0" />
              </div>
              <div className={styles.field}>
                <label>Freight cost (USD)</label>
                <input type="number" value={form.freight} onChange={handleChange('freight')} placeholder="e.g. 12500.00" min="0" step="0.01" />
              </div>
              <div className={styles.field}>
                <label>Value (USD)</label>
                <input type="number" value={form.value} onChange={handleChange('value')} placeholder="e.g. 75000" min="0" step="0.01" />
              </div>
              <div className={styles.field}>
                <label>Volume (cm³)</label>
                <input type="number" value={form.volume} onChange={handleChange('volume')} placeholder="e.g. 4800" min="0" />
              </div>
              <div className={styles.field}>
                <label>Weight per unit (kg)</label>
                <input type="number" value={form.weight} onChange={handleChange('weight')} placeholder="e.g. 0.025" min="0" step="0.001" />
              </div>
              <div className={styles.field}>
                <label>Total shipment weight <span className={styles.badge}>auto</span></label>
                <input
                  type="text"
                  readOnly
                  value={totalWeight > 0 ? `${totalWeight} kg` : ''}
                  placeholder="calculated from weight, quantity, doses"
                  className={styles.readonlyInput}
                />
                <span className={styles.hintText}>Weight × Quantity ÷ Doses</span>
              </div>
            </div>
          </section>

          {/* Action buttons */}
          <div className={styles.btnRow}>
            <button className={styles.btnSecondary} type="button" onClick={handleSave}>
              {saved ? 'Saved ✓' : 'Save'}
            </button>
            <button className={styles.btnPrimary} type="button" onClick={handleCalculate}>
              Run prediction
            </button>
          </div>
        </div>

        {/* ── Right column: results & API-fetched fields ── */}
        <ResultsPanel parsedData={parsedData} />
      </div>
    </div>
  );
}
