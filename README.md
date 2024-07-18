# Dog Image and Facts App
This project fetches dog images and facts from external APIs and allows users to manage additional facts locally using JSON Server. The app features the ability to display images and facts for selected breeds, as well as add, update, and delete facts locally.
## features
* Fetch and display random dog images from Dog CEO's Dog API.
* Fetch and display random dog facts from Dog API and local facts.
* Add new dog facts locally.
* Update the most recently added dog fact.
* Delete the most recently added dog fact.

## setups
### Prerequisites
* Node.js and npm
* JSON Server

## installation

1.  clone yur repo into yur local machine
```
 git clone https://github.com/your-repo/dog-facts-app.git
cd dog-facts-app
```
2. install a json-server globally
```
npm install -g json-server
```
3. create a db.json file and add an object.
```
{
    "facts": []
}
```
4. now watch the end-point on port 3000.
```
json-server --watch db.json
```
5. Open index.html in your browser.

## Usage
1. Select a dog breed from the dropdown list.
2. Click the "Fetch Image and Fact" button to display a random dog image and fact.
3. Add a new fact using the form and clicking "Add Fact".
4. Update the most recently added fact by clicking "Update Last Fact".
5. Delete the most recently added fact by clicking "Delete Last Fact".

# APIs Used
Dog CEO's Dog API: Fetch random dog images.
Dog API: Fetch random dog facts.
JSON Server: Local server for managing additional dog facts.

## License
This project is licensed under the MIT License.
