Feature: Navigation Mode

  Scenario: I can toggle in and out of Navigation Mode
    Given I am in editing mode
    When I indicate I want to switch to navigation mode by clicking the navigation mode button or pushing the 'n' key
    Then I am in navigation mode

  Scenario:
    Given I am in navigation mode
    When I hover over the universe
    Then the cursor becomes a hand

  Scenario:
    Given I am in navigation mode
    When I click and drag the mouse from one spot of the universe canvas to another
    Then the view moves so that I can see somewhere else in the universe

  Scenario:
    Given I am in navigation mode
    When I use the arrow keys
    Then the view moves so that I can see somewhere else in the universe

  Scenario:
    Given I am in navigation mode
    When I use the arrow keys with shift
    Then the view moves faster

  Scenario:
    Given I am in navigation mode
    When I use the scroll wheel or the < and > keys
    Then I zoom in and out

  Scenario:
    Given I am in navigation mode
    When I click on an individual particle
    Then I begin to follow that particle throughout the space
    And zooming is still available