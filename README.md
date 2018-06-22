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

- Remove jquery global dependancy or injest into tests
- Add tests for FE and BE
- Resize images to sensible sizes
- Add service worker job for API page calls
- Add pagination
- Add 400 and 500 pages
- Setup CI
- Separate Snippets in CMS by tags
- Import all initial components dynamically?

## Kubernetes TO DO

- Master server instance connected to media volume as write for cms
- Slave servers instances connected to media volume as read only for website
- Connect nginx to media volume as read only
