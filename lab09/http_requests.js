window.addEventListener("load", addEventListeners);

var blogURL = new URL("http://localhost:8000/blogs");

function addEventListeners() {
    let viewAllBlogsButton = document.getElementById("viewAllBlogEntriesButton");
    viewAllBlogsButton.addEventListener("click", retrieveAndDisplayAllBlogEntries);

    let viewABlogButton = document.getElementById("getOneBlogEntryButton");
    viewABlogButton.addEventListener("click", retrieveAndDisplayOneBlogEntry);

    let addNewBlogButton = document.getElementById("addNewBlogButton");
    addNewBlogButton.addEventListener("click", addOneBlogEntry);

    let updateExistingBlogButton = document.getElementById("updateExistingBlogButton");
    updateExistingBlogButton.addEventListener("click", updateExistingBlog);

    let deleteExistingBlogButton = document.getElementById("deleteExistingBlogButton");
    deleteExistingBlogButton.addEventListener("click", deleteExistingBlog)
    // ADD EVENT LISTENER FOR THE DELETE BUTTON HERE

}

async function retrieveAndDisplayAllBlogEntries() {
    // issuing an HTTP Get request to get all the blogs
    let phones = await httpGetRequest(blogURL)
    // cleaning up the output display for the new data
    let resultElement = document.getElementById("displayDivID");
    resultElement.innerHTML = "";

    // looping over all the blogs and creating the necessary HTML elements
    for (let phone of phones) {
        let title = document.createElement("h2");
        title.innerHTML = `${phone.id} - ${phone.brand}`;
        let priceElement = document.createElement("h3");
        priceElement.innerHTML = `${phone.price}`;
        let resultElement = document.getElementById("displayDivID");
        resultElement.append(title, priceElement);
    }
}

async function retrieveAndDisplayOneBlogEntry() {
    // issuing an HTTP Get request to get all the blogs

    // cleaning up the output display for the new data
    let resultElement = document.getElementById("displayDivID");
    resultElement.innerHTML = "";
    let inputElement = document.getElementById("SmartphoneNumberTextInput");
    let input = inputElement.value;
    let phones = await httpGetRequest(blogURL)
    for (let phone of phones) {
        if (phone.id == input) {
            let title = document.createElement("p");
            title.innerHTML = `${phone.id} - ${phone.brand}`;
            let priceElement = document.createElement("p");
            priceElement.innerHTML = `${phone.price}`;
            let sceenElement = document.createElement("p");
            sceenElement.innerHTML = `${phone.sceen}`;
            let pixelElement = document.createElement("p");
            pixelElement.innerHTML = `${phone.pixel}`;
            let resolutionElement = document.createElement("p");
            resolutionElement.innerHTML = `${phone.resolution}`;
            let storageElement = document.createElement("p");
            storageElement.innerHTML = `${phone.storage}`;
            let ramElement = document.createElement("p");
            ramElement.innerHTML = `${phone.ram}`;
            let batteryElement = document.createElement("p");
            batteryElement.innerHTML = `${phone.battery}`;
            let weightElement = document.createElement("p");
            weightElement.innerHTML = `${phone.weight}`;


            resultElement.append(title, priceElement, sceenElement, pixelElement, resolutionElement, storageElement, ramElement, batteryElement, weightElement);
        }
    }

}

async function addOneBlogEntry() {

    let titleElement = document.getElementById("insertNewBlogBrandTextInput");
    let title = titleElement.value;
    let priceElement = document.getElementById("insertNewBlogPriceTextInput");
    let price = priceElement.value;
    let sceenElement = document.getElementById("insertNewBlogScreenSizeTextInput");
    let sceen = sceenElement.value;
    let pixelElement = document.getElementById("insertNewBlogPixelsTextInput");
    let pixel = pixelElement.value;
    let resolutionElement = document.getElementById("insertNewBlogScreenResTextInput");
    let resolution = resolutionElement.value;
    let storageElement = document.getElementById("insertNewBlogStorageTextInput");
    let storage = storageElement.value;
    let ramElement = document.getElementById("insertNewBlogRAMTextInput");
    let ram = ramElement.value;
    let batteryElement = document.getElementById("insertNewBlogBatteryTextInput");
    let battery = batteryElement.value;
    let weightElement = document.getElementById("insertNewBlogWeightTextInput");
    let weight = weightElement.value;

    // issuing an HTTP Post Request
    let newPhone = {};
    newPhone["brand"] = title;
    newPhone["price"] = price;
    newPhone["screen"]= sceen;
    newPhone["pixels"]= pixel;
    newPhone["resolution"]= resolution;
    newPhone["storage"]=storage;
    newPhone["ram"]= ram;
    newPhone["battery"]=battery;
    newPhone["weight"]=weight;
    // emptying the display area
    await httpPostRequest(`${blogURL}`,newPhone);

    titleElement.value = "";
    priceElement.value = "";
    sceenElement.value = "";
    pixelElement.value = "";
    resolutionElement.value = "";
    storageElement.value = "";
    ramElement.value = "";
    batteryElement.value = "";
    weightElement.value = "";
}

async function updateExistingBlog() {
    let inputElement = document.getElementById("updateNewBlogIDTextInput");
    let input = inputElement.value;
    let priceElement = document.getElementById("updateNewBlogPriceTextInput");
    let price = priceElement.value;
    let newPhone = {};
    newPhone["price"] = price;
    await httpPatchRequest(`${blogURL}/${input}`, newPhone);

    priceElement.value = "";
    inputElement.value = "";
}

async function deleteExistingBlog() {
    // getting the number of the blog to be deleted
    let inputElement = document.getElementById("deleteExistingBlogNumberTextInput");
    let input = inputElement.value;
    // issuing a delete request for that given blog number
    await httpDeleteRequest(`${blogURL}/${input}`);
    // emptying the display area
    inputElement.value = "";
}

async function httpGetRequest(theUrl) {
    return await fetch(theUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
};

async function httpPostRequest(theUrl, newBlog) {
    return await fetch(theUrl, {
        method: 'POST',
        body: JSON.stringify(newBlog),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .catch(error => console.error('Error:', error));
}

async function httpPatchRequest(theUrl, updatedField) {
    return await fetch(theUrl, {
        method: 'PATCH',
        body: JSON.stringify(updatedField),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .catch(error => console.error('Error:', error));
}

async function httpDeleteRequest(theUrl) {
    return await fetch(theUrl, {
        method: 'DELETE'
    })
        .catch(error => console.error('Error:', error));
}
