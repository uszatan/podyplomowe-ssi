# pylint: skip-file

import re
from playwright.sync_api import Page, expect

BASE_URL = "https://www.informatyka.agh.edu.pl/pl/"


# Check if the main page loads properly
def test_open_agh_homepage(page: Page):
    page.goto(BASE_URL)
    expect(page).to_have_title(re.compile(r"Wydział Informatyki|AGH", re.IGNORECASE))


# Go to the "O Wydziale" subpage and check if the heading is visible
def test_navigate_to_about_faculty(page: Page):
    page.goto(BASE_URL)
    # Open the "Wydział" menu first so "O Wydziale" becomes visible
    page.get_by_role("link", name="Wydział", exact=True).first.hover()
    page.get_by_role("link", name="O Wydziale").first.click()
    expect(
        page.get_by_role("heading", name=re.compile(r"O Wydziale", re.IGNORECASE)).first
    ).to_be_visible()


# Go to the studies / courses section and check the content
def test_navigate_to_fields_of_study(page: Page):
    page.goto(BASE_URL)
    # In the menu, courses are under Dydaktyka / Studia / Kierunki
    studia_link = page.get_by_role(
        "link", name=re.compile(r"Dydaktyka|Studia|Kierunki", re.IGNORECASE)
    ).first
    studia_link.click()
    expect(
        page.get_by_text(re.compile(r"Informatyka|studia", re.IGNORECASE)).first
    ).to_be_visible()


# Make sure the URL actually changes after clicking a link
def test_url_changes_after_navigation(page: Page):
    page.goto(BASE_URL)
    page.get_by_role("link", name="Wydział", exact=True).first.hover()
    page.get_by_role("link", name="O Wydziale").first.click()
    expect(page).not_to_have_url(BASE_URL)
