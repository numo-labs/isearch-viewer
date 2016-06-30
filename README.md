## ISEARCH BLOG VIEWER

A React Component of a stripped down version of the [isearch ui](https://github.com/numo-labs/isearch-ui) for use in blogs. The component can included into other websites to display a grid of tiles based on a set of tags and search options that are passed as props.

![example implementation](https://cloud.githubusercontent.com/assets/5912647/16493786/b22c455e-3ede-11e6-8e07-aff28e2a6ee5.png)

There is no routing within this component - when a user clicks on a tile they are redirected to the article/package on the actual website ([inspirationalsearch.spies.dk](https://inspirationalsearch.spies.dk)).

## PROPS

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| tags | geo:geonames.2510769 | `array` | An array of tag ids for the search (default is the id for Spain) |
| searchOptions | `{}` | `func` | An object with all the search options |
| containerStyle | `` | `string` | css class to apply to the grid container |

### searchOptions

The searchOptions object can have the following keys:

| Key  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| numberOfChildren | `0` | `number` | Number of children travelling |
| numberOfAdults | `2` | `number` | Number of adults travelling |
| childAges | `[]` | `array` | An array of numbers of the child ages |
| departureAirport | `Copenhagen - CPH` | `string` | The name and code of the departure airport |
| durationWeeks | `1` | `number` | The duration of the trip in weeks |

The default departure date is set to a Friday 3 months from today's date.

## Running the project

Clone the repo and run `npm install`. Then type `npm run dev:serve` and point your browser to `localhost:8080`

## TODO

* [ ] Change the Tag array prop to take an array of strings for which an autocomplete query is launched to find the closest matching tags.
* [ ] Title for the grid which shows the tag names and search options
* [ ] Copy over the relevant tests from the isearch UI project
* [ ] Publish as an npm module!!
