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

- Rebuild from fixture data / update fixture data
- Update collect static to pull in missing FE static files
- Test celery on heroku
- Custom Service worker setup
- Install django debug toolbar
- Fix test --nomigrations 
- Setup offline and service worker option
- Add tests for FE and BE
- Add service worker job for API page calls
- Add pagination
- Remove jquery replace with modular libraries

- Separate Snippets in CMS by tags

## Kubernetes TO DO

- Master server instance connected to media volume as write for cms
- Slave servers instances connected to media volume as read only for website
- Connect nginx to media volume as read only
