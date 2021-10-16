# CostumeDB Frontend

This folder contains the frontend site for CostumeDB. Generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploy

The site is deployed with Github Pages and uses [Angular CLI GithubPages](https://www.npmjs.com/package/angular-cli-ghpages). To deploy, run `ng deploy` from the frontend branch.

This will create an auto generated commit in the gh-pages branch and will be live automatically at [CostumeDatabase.com](https://costumedatabase.com/).

## Data Contracts

The group search form collects information about a group in an array. The model is defined in [costume-request.model.ts](/costumedb-frontend/src/app/models/costume-request.model.ts). A blank field indicates "any".

Example:
```json
[{
  "name": "person1",
  "gender": "male",
  "hair_color": "brown"
}, {
  "name": "person2",
  "gender": "",
  "hair_color": "red"
}]
```

The site expects a response with fields name, origin, imageUrl, fandomLink and description. The model is defined in [costume-response.model.ts](/costumedb-frontend/src/app/models/costume-response.model.ts)

Example:
```json
[
  {
    "name": "Ross and Rachel",
    "origin": "Friends",
    "imageUrl": "https://static.wikia.nocookie.net/friends/images/c/c9/Ross_and_Rachel_-_Final_Kiss_-_10x18.png",
    "fandomLink": "https://friends.fandom.com/wiki/Ross_and_Rachel",
    "description": "On again off again Rachel and Ross are one of the central couples on Friends. Were they on a break? It's up to you!"
  },
  {
    "name": "Belcher Kids",
    "origin": "Bob's Burgers",
    "imageUrl": "https://i.imgur.com/95UDajH.png",
    "fandomLink": "https://bobs-burgers.fandom.com/wiki/Belcher_Family",
    "description": "No siblings are closer than Tina, Gene, and Louise!"
  }
]
```

## TODO
- [x] read parameter on theme page
- [x] create text search results page
- [x] sanitize search
- [x] create shared service for text search and theme search
- [x] create a shared component for displaying costume results
- [x] add a link to fandom or wherever the image was sourced in costume tile
- [x] make share costume form
- [x] better mobile responsiveness - opening the menu should freeze scroll and cliking off it should close it. should reset whenever closed. 
- [x] prevent dropdown part of themes menu from staying open on scroll
- [x] update mock data to match model
- [x] loading icon
- [x] add loading for iframes
- [x] add "not found" illustration
- [x] add origin to costume tiles
- [x] add caching for theme results
- [x] flesh out text on homepage
- [x] set up deploy with github pages
- [x] buy domain
- [x] add name field
- [x] rename hair field
- [x] add privacy policy
- [x] add terms of use
- [x] fill out credits

- [ ] add google analytics
- [ ] update themes to be correct
- [ ] source database images
- [ ] fix web manifest
- [ ] reduce scss size for group search and header
