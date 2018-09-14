Noel Wilson
===============================================================================

## Build status

[![CircleCI](https://circleci.com/gh/jwnwilson/django_react_redux_webapp.svg?style=svg)](https://circleci.com/gh/jwnwilson/django_react_redux_webapp)

## Description

My personal website rebuilt using Django 1.11, wagtail and react with redux

Features:
- CMS powered API
- Modular React Front end with code spliting
- Server side rendering and SEO for react app

## Setup

To start a local dev server for the front end and backend run:

$  make build

$  make run

## To Do

- Move from heroku to GCE for multiple processes on 1 machine
- Fix test --nomigrations 
- Setup offline and service worker option
- Add tests for FE and BE
- Add pagination
- Separate Snippets in CMS by tags

## Kubernetes TO DO

- Master server instance connected to media volume as write for cms
- Slave servers instances connected to media volume as read only for website
- Connect nginx to media volume as read only
