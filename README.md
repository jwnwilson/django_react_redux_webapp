Noel Wilson
===============================================================================

## Build status

[![CircleCI](https://circleci.com/gh/jwnwilson/noelwilson_2017.svg?style=svg)](https://circleci.com/gh/jwnwilson/noelwilson_2017)

## Description

My personal website rebuilt using Django 1.11 and react with redux


## Setup

To start a local dev server for the front end and backend run:

$  make build

$  make run

## To Do

- Deploy to single box using docker compose up with prod image
- Deploy to Heroku & compare
- Integrate view logic with wagtail pages
  - Add new page on CMS adds new endpoint page to website
- Add component name to serializer api output as an class attr value not DB value
- Separate Snippets in CMS by tags
- Use google cloud DB system in prod
- Import all initial components dynamically?
- On page change make call to API and alter page using API data

## Kubernetes TO DO

- Move Media uploads to GCS OR
- Master server instance connected to media volume as write for cms
- Slave servers instances connected to media volume as read only for website
- Connect nginx to media volume as read only
