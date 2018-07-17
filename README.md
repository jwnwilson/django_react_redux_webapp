Noel Wilson
===============================================================================

## Build status

[![CircleCI](https://circleci.com/gh/jwnwilson/django_react_redux_webapp.svg?style=svg)](https://circleci.com/gh/jwnwilson/django_react_redux_webapp)

## Description

My personal website rebuilt using Django 1.11 and react with redux


## Setup

To start a local dev server for the front end and backend run:

$  make build

$  make run

## To Do

- Initial HTML generation for faster load times
    - Create celery worker that will built html using react + API data for each page. (mircoservice?)
    - Wagtail triger page rebuild on publish
    - Add server logic to load RAW html from worker process
    - Fall back to loading page normally with React build divs on front end
    - Remove hardcoded initial react component loading
- Look at javascript image optimisation

- Add 400 and 500 pages
- Setup offline and service worker option
- Remove jquery replace with modular libraries
- Improve lighthouse score 
- Fix test --nomigrations try new data set?
- Pre-render html option?
- Add tests for FE and BE
- Resize images to sensible sizes
- Add service worker job for API page calls
- Add pagination

- Separate Snippets in CMS by tags
- Import all initial components dynamically?

## Kubernetes TO DO

- Master server instance connected to media volume as write for cms
- Slave servers instances connected to media volume as read only for website
- Connect nginx to media volume as read only
