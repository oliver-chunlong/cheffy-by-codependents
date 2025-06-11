
//TEST FILE FOR DIET


const MEATS = ['chicken', 'beef', 'pork', 'lamb', 'fish', 'anchovy', 'bacon', 'ham'];
const DAIRIES = ['milk', 'cream', 'cheese', 'butter', 'yoghurt', 'yogurt'];
const NUTS = ['almond', 'cashew', 'walnut', 'pecan', 'peanut', 'hazelnut'];
const GLUTENS = ['wheat', 'barley', 'rye', 'spelt', 'semolina', 'farro'];

export function DietClass(ingredientsArray = []) {
  const lines = ingredientsArray.map(l => l.toLowerCase());

  const containsAny = (list) =>
    lines.some(line => list.some(item => line.includes(item)));

  const hasMeat   = containsAny(MEATS);
  const hasDairy  = containsAny(DAIRIES);
  const hasNut    = containsAny(NUTS);
  const hasGluten = containsAny(GLUTENS);

  return {
    isVegetarian: !hasMeat,
    isVegan:      !hasMeat && !hasDairy,
    isDairyFree:  !hasDairy,
    isNutFree:    !hasNut,
    isGlutenFree: !hasGluten
  };
}