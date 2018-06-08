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

- Compare single machine docker compose speed to heroku
- Add 400 and 500 pages
- Separate Snippets in CMS by tags
- Add tests for FE and BE
- Setup CI
- Import all initial components dynamically?

## Kubernetes TO DO

- Master server instance connected to media volume as write for cms
- Slave servers instances connected to media volume as read only for website
- Connect nginx to media volume as read only
