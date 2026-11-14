export const VerbalOrder = Object.freeze({
  UNKNOWN: Object.freeze({value: 0, toString: () => 'UNKNOWN', toStringShort: () => 'U'}), 
  INDEPENDENT: Object.freeze({value: 1, toString: () => 'INDEPENDANT', toStringShort: () => 'IND'}),
  CONJUNCT: Object.freeze({value: 2, toString: () => 'CONJONCTIF', toStringShort: () => 'CONJ'}),
  IMPERATIVE: Object.freeze({value: 3, toString: () => 'IMPERATIF', toStringShort: () => 'IMP'})  
});