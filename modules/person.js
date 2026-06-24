export const Person = Object.freeze({
  FirstSingular: Object.freeze({ value: 1, toString: () => "première personne du singulier" }),
  SecondSingular: Object.freeze({ value: 2, toString: () => "deuxième personne du singulier" }),
  ThirdSingular: Object.freeze({ value: 3, toString: () => "troisième personne du singulier" }),
  FirstPluralExclusive: Object.freeze({ value: 4, toString: () => "première personne du pluriel exclusive" }),
  FirstPluralInclusive: Object.freeze({ value: 5, toString: () => "première personne du pluriel inclusive" }),
  SecondPlural:  Object.freeze({ value: 6, toString: () => "deuxième personne du pluriel" }),
  ThirdPlural:  Object.freeze({ value: 7, toString: () => "troisième personne du pluriel" }),
});