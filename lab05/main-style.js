function Car(brand, price, engine) {
    this.brand = brand;
    this.price = price;
    this.engine = engine;
    this.display = printInfo;
    this.htmlDisplay = displayInfo;
}
function Engine(horsePower, gears, cc) {
    this.horsePower = horsePower;
    this.gears = gears;
    this.cc = cc;
}
function printInfo() {
    console.log("==== Car Info ==== ");
    console.log(`Brand: ${this.brand}`);
    console.log(`Price: ${this.price}`);
    console.log("Engine Features: ");
    console.log(`Hourse Power: ${this.engine.horsePower}`);
    console.log(`Gears: ${this.engine.gears}`);
    console.log(`cc: ${this.engine.cc} cc`);
    console.log("\n");
}
function createCar(carInfo) {
    let info = carInfo.split(",");
    let engine = createEngine(info[2], info[3], info[4]);
    let car = new Car(info[0], info[1], engine);
    return car;

}
function displayInfo() {
    document.write("==== Car Info ==== <br>");
    document.write("Brand: "+ this.brand + "<br>");
    document.write("Price: " + this.price + "<br>");
    document.write("Hourse Power: " + this.engine.horsePower + " ");
    document.write("Gears: " + this.engine.gears + " ");
    document.write("cc: " + this.engine.cc + "cc" + "<br>");
}
function createEngine(horsePower, gears, cc) {
    let engine = new Engine(horsePower, gears, cc);
    return engine;
}
function createInventory() {
    const carList = new Array("Ford, 33000, 35, 6, 2000",
        "Toyota, 23000, 40, 6, 2100",
        "Mitsubishi, 44000, 45, 6, 2200",
        "Nissan, 21000, 37, 6, 2300",
        "GM, 25000, 39, 6, 2400",
        "VW, 42000, 25, 6, 2500");
    const listOfCars = new Array(6);
    for(var i = 0; i < carList.length; i++)
    {
        listOfCars[i] = createCar(carList[i]);
    }
    return listOfCars;
}
function printInventory(listOfCars) {
    for(const element of listOfCars)
    {
        element.display();
        element.htmlDisplay();
    }
}
function main() {
    let listOfCars = createInventory();
    printInventory(listOfCars);
}