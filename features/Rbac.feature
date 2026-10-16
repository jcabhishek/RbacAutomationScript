Feature: performaning end to end testing for rbac portal

  Scenario: user tries to login to the portal with valid credentials
    Given I am on the login page
    When I enter valid credentials and click on the submit button
    Then I should be redirected to the dashboard
