const compose = f => g => x => f(g(x));
export const waterToCoffee = compose (Math.round) (water => water * 0.06);
export const coffeeToWater = compose (Math.round) (coffe => coffe / 0.06);

const Hoffmann = [
	'get your plastic V60 or Hario drip decanter; your filter paper; your digital scale; spoon; kettle; beans; your water',
	({water}) => `measure out ${waterToCoffee(water)}g of coffee`,
	'grind your coffee on the finer end of medium',
	'rinse your filter paper',
	'add your grounds to the center of the V60; dig a little well in the middle',
	'boil your water',
	({roast}) =>
		roast === 'light'  ? 'make sure your water is as hot as possible when your pour it'
	: roast === 'medium' ? 'keep that water hot for the pour'
	:                      'let the water sit for 15, 20 seconds before you start pouring',
	({water}) => `start your timer, then pour ${waterToCoffee(water) * 2}g of water over the coffee, evenly saturating all the grounds`,
	'give your brewer a some good swirls until it looks nice and evenly mixed',
	'let the bloom sit until 30-45 seconds',
	({water}) => `pour ${(waterToCoffee(water) * 2) + (water * 0.6)}g of water, spiraling from the inside out; you'll want to have this done by the 75 second mark`,
	({water}) => `over the next 30 seconds, pour slowly to keep the cone full, until you reach ${water}g of water`,
	({water}) => `once you've hit ${water}g, give the V60 a little stir in one direction, then a little stir in the other`,
	'allow the V60 to drain, until you feel safe giving it another little swirl',
	'when its fully drained through, you should have a nice even bed of coffee',
];

const Eldric = [
	'get your plastic V60, 01 Size filter paper, filtered water, coffee, 2 spoons & 2 vessels (use the smaller first).',
	'grind 23 grams of coffee around medium.',
	'rinse your filter paper',
	'add coffee to the cone; tap it a few times to settle the ground; dig a hole in the center',
	'heat your water to 94°c',
	'pour 60g of water into the hole, then spiraling outwards', //1/3 of total water
	'gently push the grounds on the edge into the middle with a spoon',
	'once the water drains, swap out the vessels',
	'pour 100g of water',
	'using 2 spoons, scoop off the foam',
	'spiral in another 70g of water',
	'once drained, add water to taste',
	'add some of the first extraction to the second, to taste (around 5.5g)'
];

export const stepVarieties = { Hoffmann, Eldric };
