const compose = f => g => x => f(g(x));
export const waterToCoffee = compose (Math.round) (water => water * 0.06);
export const coffeeToWater = compose (Math.round) (coffee => coffee * 16.666666666666666666666666);

export const stepDescriptions = [
	'get your plastic V60 or Hario drip decanter; your filter paper; your digital scale; spoon; kettle; beans; your water',
	water => roast => `measure out ${waterToCoffee(water)}g of coffee`,
	'grind your coffee on the finer end of medium',
	'rinse your filter paper',
	'add your grounds to the center of the V60; dig a little well in the middle',
	'boil your water',
	water => roast => 
		roast === 'light'  ? 'make sure your water is as hot as possible when your pour it'
	: roast === 'medium' ? 'keep that water hot for the pour'
	:                      'let the water sit for 15, 20 seconds before you start pouring',
	water => roast => `start your timer, then pour ${waterToCoffee(water) * 2}g of water over the coffee, evenly saturating all the grounds`,
	'give your brewer a some good swirls until it looks nice and evenly mixed',
	'let the bloom sit until 30-45 seconds',
	water => roast => `pour ${water * 0.6}g of water, spiraling from the inside out; you'll want to have this done by the 75 second mark`,
	'agitate it just a little bit; keep your cone to stay pretty full',
	water => roast => `over the next 30 seconds, pour slowly to keep the cone full, until you reach ${water}g of water`,
	water => roast => `once you've hit ${water}g, give the V60 a little stir in one direction, then a little stir in the other`,
	'allow the V60 to drain, until you feel safe giving it another little swirl',
	'when its fully drained through, you should have a nice even bed of coffee',
];
