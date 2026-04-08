// parseHelpers.js
// Ported from helper_functions.py
// Each function mirrors the logic in the original Python parse() match/case block.

/**
 * Strips all non-numeric and non-decimal characters, returns a float.
 * Used for Freight_, Value_, Volume_, Weight_, TotalShipmentWeight_
 */
export function parseFloat64(value) {
  const cleaned = String(value).replace(/[^0-9.]/g, '');
  return cleaned ? parseFloat(cleaned) : 0.0;
}

/**
 * Parses the first `maxLen` digits found in the string, returns a float.
 * Used for Product_ (maxLen=4) and Variant_ (maxLen=2)
 */
export function parseDigits(value, maxLen) {
  let result = '';
  for (const char of String(value)) {
    if (result.length >= maxLen) break;
    if (/[0-9]/.test(char)) result += char;
  }
  return result ? parseFloat(result) : 0.0;
}

/**
 * Parses all numeric characters (including decimal), returns a float.
 * Used for Quantity_
 */
export function parseQuantity(value) {
  const cleaned = String(value).replace(/[^0-9.]/g, '');
  return cleaned ? parseFloat(cleaned) : 0.0;
}

/**
 * Parses all numeric characters, returns an integer.
 * Used for Doses_
 */
export function parseDoses(value) {
  const cleaned = String(value).replace(/[^0-9.]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
}

/**
 * Finds which of 'vaccine', 'syringe', or 'immunoglobulin' the input
 * most closely resembles, by counting how many characters from each
 * target word remain after removing them from the input.
 *
 * NOTE: This is a direct port of the original Python logic.
 * It's a rough heuristic — consider replacing with a fuzzy match
 * library (e.g. fuse.js) for more robust behavior.
 *
 * @param {string} input
 * @returns {'vaccine' | 'syringe' | 'immunoglobulin' | string}
 */
export function mostSimilarType(input) {
  const lower = input.toLowerCase();

  const removeChars = (str, chars) => {
    let result = str;
    for (const c of chars) result = result.split(c).join('');
    return result;
  };

  const vaccineChars    = ['v','a','c','i','n','e'];
  const syringeChars    = ['s','y','r','i','n','g','e'];
  const immunoChars     = ['i','m','u','n','o','g','l','b'];

  const vaccineSize  = removeChars(lower, vaccineChars).length;
  const syringeSize  = removeChars(lower, syringeChars).length;
  const immunoSize   = removeChars(lower, immunoChars).length;

  if (vaccineSize < syringeSize && vaccineSize < immunoSize)   return 'vaccine';
  if (syringeSize < vaccineSize && syringeSize < immunoSize)   return 'syringe';
  if (immunoSize  < vaccineSize && immunoSize  < syringeSize)  return 'immunoglobulin';
  if (lower.length > 7) return 'immunoglobulin';

  return 'unknown — check spelling';
}

/**
 * Computes total shipment weight.
 * Formula: (weight * quantity) / doses
 *
 * @param {number} weight   - weight per unit in kg
 * @param {number} quantity - number of units
 * @param {number} doses    - doses per vial
 * @returns {number}
 */
export function computeTotalWeight(weight, quantity, doses) {
  if (!doses || doses === 0) return 0;
  return parseFloat(((weight * quantity) / doses).toFixed(4));
}

/**
 * Master parse function — mirrors the original Python parse(value, name).
 * Call this to parse any raw string value by field name.
 *
 * @param {string} value - raw input string
 * @param {string} name  - field name key (matches widget_map keys)
 * @returns {string|number}
 */
export function parse(value, name) {
  switch (name) {
    case 'Freight_':           return parseFloat64(value);
    case 'Country_':           return String(value);           // TODO: validate/normalize country names
    case 'SupplierCountry_':   return String(value);           // TODO: validate/normalize country names
    case 'PurchaseOrderDate_': return String(value);
    case 'Type_':              return mostSimilarType(value);
    case 'Product_':           return parseDigits(value, 4);
    case 'Variant_':           return parseDigits(value, 2);
    case 'Quantity_':          return parseQuantity(value);
    case 'Value_':             return parseFloat64(value);
    case 'Doses_':             return parseDoses(value);
    case 'Volume_':            return parseFloat64(value);
    case 'StorageCondition_':  return Number(value);
    case 'Weight_':            return parseFloat64(value);
    case 'TotalShipmentWeight_': return parseFloat64(value);
    default:                   return String(value);
  }
}
