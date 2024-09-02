Feature: Styled text

Scenario: User tries to make an image of styled text
    Given the bot is online and operational
    When I selects classification of typeface and font family with text input
    Then the bot should return a message within a png image of text
