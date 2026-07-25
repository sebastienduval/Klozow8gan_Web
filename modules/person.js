export const Person = Object.freeze({
  FirstSingular: Object.freeze({ value: 1, toString: () => "première personne du singulier", toStringShort: () => "1;s;" }),
  SecondSingular: Object.freeze({ value: 2, toString: () => "deuxième personne du singulier", toStringShort: () => "2;s;" }),
  ThirdSingular: Object.freeze({ value: 3, toString: () => "troisième personne du singulier", toStringShort: () => "3;s;" }),
  FirstPluralExclusive: Object.freeze({ value: 4, toString: () => "première personne du pluriel exclusive", toStringShort: () => "1;p;ex;" }),
  FirstPluralInclusive: Object.freeze({ value: 5, toString: () => "première personne du pluriel inclusive", toStringShort: () => "1;p;in;" }),
  SecondPlural:  Object.freeze({ value: 6, toString: () => "deuxième personne du pluriel", toStringShort: () => "2;p;" }),
  ThirdPlural:  Object.freeze({ value: 7, toString: () => "troisième personne du pluriel", toStringShort: () => "3;p;" }),
});