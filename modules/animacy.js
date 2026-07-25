export const Animacy = Object.freeze({
  UNKNOWN: Object.freeze({value: 0, toString: () => 'UNKNOWN', toStringShort: () => 'U'}), 
  ANIMATE: Object.freeze({value: 1, toString: () => 'ANIMATE', toStringShort: () => 'A'}),
  INANIMATE: Object.freeze({value: 2, toString: () => 'INANIMATE', toStringShort: () => 'I'})
});