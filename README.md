# v60 techniques
now with french press techniques!

to run, use `yarn start`. 

to add a new recipe,

* add the technique's name to `build.sh`, in the `for` loop at the bottom, and in the `case` statement in `buildApp`
* add `${technique}.ico` to the base directory
* `echo "REACT_APP_TECHNIQUE=${technique}" > .env.development`
* each page (`src/pages/{Done, Home, Steps}.jsx`) has a little object at the bottom. Each key is a ${technique}, and each value is the component that that website should use. Create a new component for your particular recipe, or just add `[technique]: Hoffmann` (or some samesuch solution).
* i think that should do it, run through the steps on your new technique and see if it works
* open a pr and i'll front all the costs of a free `${x}.surge.sh` domain!

# FAQ

## these recipes are pretty simple; why make this?

has this ever happened to you?

you've got a new aeropress recipe and a timer open on your phone at the same time. as you're bouncing back and forth between them, you miss something or take too long or something and everything is ruined.

no more!

## will you add capital letters?

no

## will you add color?

no
