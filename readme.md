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

1. New Phyics Capabilities
	1. 3D Physics
	2. Add electrostatic force
	3. Add electromagnetic force
	4. Add weak force
	5. Add strong force
	6. Add relativity
	7. Add quantum physics
2. New Design Mode Capabilities
	1. Save and Load
		1. ~~universe state via TextBox with copy pasted JSON (from log output) plus OK button to submit~~
			DEFECT: larger configs cause the UI to interrupt the json string with elipsis (...)
		2. name and save in UI (per session)
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


## Technical Improvements

1. Eliminate state (interval, universe)
2. Implement Import / Export as part of Instantiation / IOC Container Strategy
3. Do not draw anything that is outside the viewport
4. ~~Decouple position in model from position on screen~~
5. ~~Decouple mass size depiction from width within model~~
6. Decouple physics timesteps from rendering intervals