Tommy's Universe
================

This is just a side project to build my own physics engine in order to improve my understanding 
of physics! I do not want to fake anything out at the macroscopic level. I want to implement only
the minimal standard model that I can and then seek ways over my lifetime to improve the scale and
performance until the engine can emulate something huge and meaningful at a macro level, such as biology
or a virtual classical / quantum computing device expressed as a universe configuration.

## Preview

http://htmlpreview.github.io/?https://github.com/tommysullivan/universe/blob/master/index.html

## Coming Features

1. New Physics Capabilities
	1. 3D Physics
    2. Add electromagnetic force
	3. Add weak force
	4. Add strong force
	5. Add relativity
	6. Add quantum physics
	7. Add arbitrary functions
	8. Make space / time determined
2. New Design Mode Capabilities
	1. Save and Load
		1. ~~save and load from hard drive~~
		2. quicksave in UI (as new convenient button - does not persist after refresh!)
		3. preview in the UI on hover
		4. Google Drive
		5. Search / Discover Shared by others, including software maker
		6. Ability to choose which configurations to apply (including editor configs)
		7. Ability to merge configurations together
	2. Redo / Undo / Histogram
	3. Inline configuration editor (requires paused state)
		1. Click of particle (while in editor state) highlights it in the configuration panel
		2. Focus in configuration editor causes highlight of particle
		3. WIP: Add controls for each configurable element
	4. Better gestures
	5. Mobile Apps / Web
		1. iPad
		2. Other Tablets
		3. Mobile Phones
		4. Video Game systems
		5. Classrooms
3. Social Integration / Promotion
	1. Facebook & Google
	2. Login, Sharing
	3. Youtube
	4. Javascript Sites (jsfiddle, khanacademy, et.)
4. Enhanced Rendering
	1. 3D Rendering (plus capability to configure rendering engine as 2d)
	2. Multiple Physics / Views / Controls
		1. Create as many controls, universes and views as you want
		2. Assign and reassign controls to one or more universes / views
		3. Assign each universe to one or more views
			1. When more than one universe writes to the same view,
			2. Also describe a "rendering style" to help differentiate
	3. Navigation Mode
		1. Scroll to zoom in and out
		2. Drag corner to resize viewport size
		3. Drag hand to move around in the space
		4. "Follow" a particle through the space
5. Abstract Display
	1. Map arbitrary fields to spatial properties, including color, size, position, velocity, and other
	   properties which can induce fields.
	2. Make camera a particle with those properties as well, so that the UI can vary them and thus cause
	   changes to the surrounding space and particles.

## Some Philosophy about "real Physics"

To solve question of error correcting for timestep / continuous transformation and choosing path based on least action,
design an algorithm:

For each instant in time, we can compute what the paths might look like for different timestep values, based on
what those would yield when applied to the assumed constant acceleration times the force field strength. We assume
that the current instant was the result of a previous application of the algorithm which already determined for
its previous instant, all the possible paths based on sub-timesteps and the paths they yield, and then positioned
the current instant configuration at the shortest of those (why would an iteration even care if it was shortest or not
though? it would just do its job, and if it also happened to yield only a single new config with new timestep
or if it yielded many; and whether this recursively was applied to its own definition at next timestep or
some other one at next timestep, why would it care?).

but are there not an infinity of possibly smaller timesteps which could be assumed, applying the acceleration
for a much shorter time, thus yielding different configuration of the whole system at a later time, which might
enable reapplication of the logic again and again at similar timesteps before a single application at a larger
timestep would have returned once, assuming a constant acceleration for the entirety of the step, and thus a
possibly different configuration of the space than would have been yielded by several applications of a smaller
timestep that added up to the same sum instant. Which one is more "correct"? Must we choose a discrete timestep
or can we choose any timestep? Are they quantized to a minimum that is constant, or perhaps cannot be represented
as a traditional number "1" but rather as a single function application vs. two or more, on the function graph
representing the current "state" of the universe?

Perhaps with some type of limits / calculus I can assume a given timestep, then compute sums of increasingly
smaller subtimesteps and their application on the time evolution operator of the system over the state
of the system, and somehow choose the timestep that yields the least net change in energy? or some other comparable
or predicate?

Or perhaps each configuration should just have a "reference" to its previous configuration.

The other thing is that a given configuration might have resulted from the time evolution operator with a
*different* timestep on a *different* configuration. So either we associate a given configuration with all its
possible pasts and the corresponding timesteps that yielded the given configuration (or perhaps the
timesteps can be derived from the difference between each pair); or we add the "history" of the
particular past as part of the configuration space so that what was once a single configuration space with
multiple possible pasts is now distinct configuration spaces with different history configurations
that happen to have the same position / velocity configurations. Probably these are equivalent expressions
with a different process calculus to operating on them.

What can be said is that however we arrive at a given configuration, future applications of time evolution
operator with a given dt always yield the same future configuration deterministically as a function
of the timestep and current configuration only.

Thus we can separate the space of "choosing which timestep to apply" for a given time evolution
operator from the graph of already computed configurations.

Each configuration should have a hash that can enable it to be stored as a REST resource. Computation
of the hash must be something that can be broken down and run in parallel over subsegments of
a representation of the configuration space so that large configuration spaces can have a hash computed
over them in tractable time; so that said hash can be used to identify the place of that
configuration within the space of all possible evolutions of the configuration space that have ever
been or in the future will be computed somewhere; which enables caching of computation of the
evolution of the space so that a scientist can explore it without requiring unimaginable computational
resources or wasting time recomputing things that have already been computed.

What is a way to represent a worldline? Does it have to be an infinite array of continuously transforming
configuration spaces with a constant infinitessimal dt used in consecutive applications of the time
evolution operator over the previous configuration spaces? Is there a consistent way to represent a worldline
that works for any possible series of evolution applications with any series of timesteps, however calculated?

What are the limits in how much a configuration space can change with a single evolution operator, given
all the possible timesteps?

What about all the different configurations that could be reached for a given time duration, but as
calculated by all possible different combinations of dt + evolution operator applications where
the dts add up to the full time duration?

Can we find laws that change the configuration space in ways that do not require that the values
of the fields in the configuration space are real numbers and thus uncountable? Or can we find
operators that work with real numbers yet do not yield infinitely long precise values that grow
ever more precise and long as they continue to be multiplied with eachother time and time again
for subsequent applications of the evolution operator?

Are there interesting algorithms for choosing timesteps that yield interesting sequences of
configurations?


# Technical Improvements

1. Eliminate state (interval, universe)
2. Implement Import / Export as part of Instantiation / IOC Container Strategy
3. Do not draw anything that is outside the viewport
4. ~~Decouple position in model from position on screen~~
5. ~~Decouple mass size depiction from width within model~~
6. Decouple physics timesteps from rendering intervals