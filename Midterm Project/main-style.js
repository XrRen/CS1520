class Car
{
    constructor(type, avaColor, descrip, price, avaImage)
    {
        this.type = type;                        
        this.availableColors = avaColor; 
        this.description = descrip; 
        this.basicPrice = price;
        this.availableImages = avaImage;
        this.insurance = '3-year Insurance'
    }
}
let carSelect;
function initCars()
{
    const ferrari = new Car('Ferrari', ['red','white','yellow'],'Description: it is a ferrari', 100000, ['/f-red.png','/Ferrari.png','/f-white.png']);
    const lambo = new Car('Lamborghini', ['blue','green','yellow'],'Description: it is a lamborghini', 100000, ['/l-blue.png','/l-green.png','/l-yellow.png']);
    const mustang = new Car('Ferrari', ['black','silver','white'],'Description: it is a Mustang', 100000, ['/m-black.png','/m-sliver.png','/m-white.png']);
    
    const carTypeDropdown = document.getElementById('type');
    carTypeDropdown.addEventListener('change', function()
    {
        const types = carTypeDropdown.value;
        if (types === 'Ferrari') {
            carSelect = ferrari;
        } else if (types === 'Lamborghini') {
            carSelect = lambo;
        } else if (types === 'Mustang') {
            carSelect = mustang;
        }
        updateColorDrop(carSelect);
        updateImg(carSelect);
        updateDes(carSelect);
    });
    const carColorDropdown = document.getElementById('color');
    carColorDropdown.addEventListener('change',function()
    {
        updateColorImg(carSelect);
        updateDes(carSelect);
    });

    const noneIns = document.getElementById('none');
    const threeYearIns = document.getElementById('three_year');
    noneIns.addEventListener('change',function()
    {
        updateIns('No insurance');
    });
    threeYearIns.addEventListener('change', function()
    {
        updateIns("3-year Insurance");
    });
    carSelect = ferrari;
    updateColorDrop(carSelect);
    updateImg(carSelect);
    updateDes(carSelect);
    //insuranceOption.checked = true;
    updateInsuranceDescription('3-year Insurance');
}

function updateColorDrop(carSelect)
{
    const carColorDropdown = document.getElementById('color');
    carColorDropdown.innerHTML = ''; // Clear current options

    for(const element of carSelect.availableColors){
        const option = document.createElement('option');
        option.value = element;
        option.text = element;
        carColorDropdown.appendChild(option);
    }
    carColorDropdown.value = carSelect.availableColors[0];
}
function updateColorImg(carSelect)
{
    const carColorDropdown = document.getElementById('color');
    const colorSelect = carColorDropdown.value;
    const selected = carSelect.availableColors.indexOf(colorSelect);
    const img = document.querySelector('img');

    if(selected !== -1)
    {
        img.src=carSelect.availableImages[selected];
    }
}
function updateImg(carSelect)
{
    const carImage = document.querySelector('img');
    carImage.src = carSelect.availableImages[0];
}
function updateIns(insType)
{
    carSelect.insurance = insType;
    updateDes(carSelect);
}
function updateDes(carSelect)
{
    const descriptionField = document.getElementById('descrip');
    const carColorDropdown = document.getElementById('color');
    const selectedColor = carColorDropdown.value;

    let insuranceCost = 0;
    if (carSelect.insurance === '3-year Insurance') {
        insuranceCost = carSelect.basicPrice * 0.3;  // 30% of basic price for 3-year insurance
    }

    const totalPrice = carSelect.basicPrice + insuranceCost;

    descriptionField.value = `Car Type: ${carSelect.type}
${carSelect.description}
Chosen Color: ${selectedColor}
Price w/o insurance: ${carSelect.basicPrice.toLocaleString()}
Insurance: ${carSelect.insurance}
Total Price: ${totalPrice.toLocaleString()}`;
}
