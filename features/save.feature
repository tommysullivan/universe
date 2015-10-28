Feature: Save
  As a user
  In order to save current state
  I want to have a "save" I can name and store indefinitely somewhere (such as hard drive, google drive)

Background:
  Given I have created a number of particles
  And I have let the simulator run for an arbitrary amount of time

Scenario:
  When I indicate I want to save (by clicking save or by pushing COMMAND+S)
  And I choose a place on my hard drive where I would like to save
  Then a valid json state file is saved to the selected location