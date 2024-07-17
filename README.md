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

{
   git clone https://github.com/your-repo/dog-facts-app.git
cd dog-facts-app

npm install -g json-server

{
    "facts": []
}

json-server --watch db.json


}

* Open index.html in your browser.

## Usage
- Select a dog breed from the dropdown list.
- Click the "Fetch Image and Fact" button to display a random dog image and fact.
- Add a new fact using the form and clicking "Add Fact".
- Update the most recently added fact by clicking "Update Last Fact".
- Delete the most recently added fact by clicking "Delete Last Fact".

# APIs Used
Dog CEO's Dog API: Fetch random dog images.
Dog API: Fetch random dog facts.
JSON Server: Local server for managing additional dog facts.

## License
This project is licensed under the MIT License.
