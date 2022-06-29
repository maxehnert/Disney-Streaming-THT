# Project Overview

### Installation
  Requires at least Node v15
    
    $  yarn install

### Running
  Live app: https://majestic-pithivier-9c9481.netlify.app/

    $ yarn start

### Comments

Tried to keep it basic as the instructions mentioned. The only library I installed was Webpack to make development a little easier. 

Mobile use was kept in mind during development.

Walking through the app, the single page will load and render all of the tiles and rows.  Each row is scrollable. Click on a tile to open a modal with additional content about the title. Tabbing around the page works and allows for arrow scrolling of the rows.

### File Structure

get-collections - API methods and cleaning up and preparing the data for render.

tile-components - More methods for prepping the data and looping over the data sets to create the html.

tile-fragments - Create all the dynamic elements with content and add them to documentFragments.

utils - misc.

index - call our render methods and append the elements to the page.

### Method Call Order

    |-> renderTiles

        |-> fetchCollectionsAndFormatHTMLFragments

            |-> getAllCollections

                |-> getStandardCollectionAndCuratedRefIds

                    |-> getStandardCollection

                    |-> getCollectionByRef

                |-> constructTileRow

                    |-> constructTile

                        |-> constructSingleTileFragment
                        
                    |-> constructTileRowFragment

## Data API
- https://cd-static.bamgrid.com/dp-117731241344/home.json will provide data to populate a “Home” page similar to the current Disney+ experience.
- https://cd-static.bamgrid.com/dp-117731241344/sets/<ref id>.json will provide data for dynamic “ref” sets. The “ref id” will be provided in the “home.json”.

## Requirements
- Create a page that consumes the home page API and renders the pre-populated data onto the screen.
- The focused tile must be scaled up.
- The app should support navigation similar to a remote control, e.g.
up/down/left/right/enter/back/etc. Avoid mouse input.
- Minimum layout should be multiple rows of data, but please feel free to add in your
own design ideas as well!

## Extra Credit
1. Dynamically populate the “ref” sets as they come into view.
2. Allow interaction or selection of a tile. For example, show a modal with data on
selection.
3. Incorporate transitions and/or visual aesthetics.
4. Add some Disney magic.

### Working Notes

- single page with rows of individually scrollable tiles
- Each row has a header
- Each row tile has an image and some data-attributes on it
- each row needs to be created dynamically based on dynamic category names
- rows are basically carousels that start over when you reach the end, or could just be a hard stop at the end too I guess
- keyboard interactions need to work? 
    - So tab index to switch row context then arrow key handlers shift a focus?
    - arrow keys only work left right within a row and tab index to get trhough each row?


Working with API

if refId is present then make an additional query to capture this data. It indicates this is dynamic content
data.StandardCollection.containers[x].set.refId

You would loop through the first API call to fetch the base results.
Loop through each item in containers array. If there is no refId, then store the contents for later.
If there is a refId, add it to a new array of just refIds.
Once you reach the end of the first API call, you can either render the collection of static data or immediately make new fetch requests for your dynamic refID content. Then add that to the previous collection of response data and render it all together.



cover image 
  - how do you handle the version-number not being consistent? Just grab whatever for now, that is minor to overall completedness 
    - data.CuratedSet.items[0].image.tile.['version-number'].series.default.url

title (can be series or program)
  - There will either be a 'programId' or a 'seriesId' at the base object level data.CuratedSet.items[0] that can be used to determine title path
    - data.CuratedSet.items[0].text.title.['slug/full'].series.default.content
    - data.CuratedSet.items[0].text.title.['slug/full'].program.default.content



making the selected image bigger - some kind of foucsed eventlistener that applies custom css

#### TODO

* I believe there is more of a request for keyboard nav around the tiles than what I implemented. 
* Test Test TEST. There are noticeably no tests here and that's bad.
* Fetch data as needed instead of all on page load.
* handle 404s on images better, don't render that tile or try another url with backups using <picture> el.