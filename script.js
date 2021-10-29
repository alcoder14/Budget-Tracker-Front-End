// Outcome, Income Buttons
const showOutcomeBtn = document.querySelector("#outcome-btn")
const showIncomeBtn = document.querySelector("#income-btn")

// Add New Values Elements
const descriptionInput = document.querySelector("#description")
const valueInput = document.querySelector("#value")
const addBtn = document.querySelector("#add-btn")

// Collect and Output Values
const records = document.querySelector("#records")
const no_records_message = document.querySelector("#no-records")

// Output Complete Values

const totalIncomeValue = document.querySelector("#total-income-value")
const totalOutcomeValue = document.querySelector("#total-outcome-value")
const totalDifferenceValue = document.querySelector("#total-difference-value")

// Color Switching between Outcome And Income Buttons.

let outcome_checked = true;

showOutcomeBtn.addEventListener("click", outcome_init);
showIncomeBtn.addEventListener("click", income_init);

function outcome_init(){
    showIncomeBtn.style.color = "white";
    showIncomeBtn.style.backgroundColor = "#494e6b"
    showOutcomeBtn.style.color = "#494e6b";
    showOutcomeBtn.style.backgroundColor = "white";
}

function income_init(){
    showOutcomeBtn.style.color = "white";
    showOutcomeBtn.style.backgroundColor = "#494e6b"
    showIncomeBtn.style.color = "#494e6b";
    showIncomeBtn.style.backgroundColor = "white";
}


// Starting Points For Animation

let previousIncome = 0
let previousOutcome = 0

// Visualization

const visualizationBarIncome = document.querySelector("#visualizeIncome")
const visualizationBarOutcome = document.querySelector("#visualizeOutcome")
const percentageTextIncome = document.querySelector("#percentageTextIncome")
const percentageTextOutcome = document.querySelector("#percentageTextOutcome")

// Delete All Buttons

const deleteAllBtn = document.querySelector("#deleteAll");
deleteAllBtn.addEventListener("click", deleteAll)

let outcomeOn = true; // prikaz podatkov ob nalaganju strani je outcome
let deleteAllOutcome = true;
let deleteAllIncome = false;

const title = document.querySelector("#title");

// Navigate Between Income and Outcome Workflows
showOutcomeBtn.addEventListener("click", ()=>{
    deleteAllOutcome = true;
    deleteAllIncome = false;
    outcomeOn = true;
    title.innerText = "Add New Outcome Record"
    deleteDataFromDisplaySwitch();
    displayData();
})
showIncomeBtn.addEventListener("click", ()=>{
    deleteAllOutcome = false;
    deleteAllIncome = true;
    outcomeOn = false;
    title.innerText = "Add New Income Record"
    deleteDataFromDisplaySwitch();
    displayData();
})

// 2. Sestavi elemente in jih pošlje v array
let element;
class Item{
    constructor(description, value){
        this.description = description;
        this.value = value;
    }
    addNewRecord(){ // Kreira Record
        element = document.createElement("div")
        
        let dateContainer = document.createElement("div")
        dateContainer.classList.add("elemContainer")
        let date = new Date().toDateString();
        let dateNode = document.createTextNode(date);
        let datePara = document.createElement("p")
        datePara.appendChild(dateNode)
        dateContainer.appendChild(datePara)

        let descContainer = document.createElement("div")
        descContainer.classList.add("elemContainer")
        let descPara = document.createElement("p")
        let descNode = document.createTextNode(this.description)
        descPara.append(descNode)
        descContainer.appendChild(descPara)

        let valueContainer = document.createElement("div")
        valueContainer.classList.add("elemContainer")
        let valuePara = document.createElement("p")
        let valueNode = document.createTextNode(this.value)
        valuePara.appendChild(valueNode)
        valueContainer.appendChild(valuePara)

        let btnContainer = document.createElement("div")
        let deleteBtn = document.createElement("button");
        let btnTextNode = document.createTextNode("Delete")
        deleteBtn.appendChild(btnTextNode);
        deleteBtn.classList.add("deleteBtn");
        btnContainer.classList.add("elemContainer")
        btnContainer.appendChild(deleteBtn)
        
        element.appendChild(dateContainer)
        element.appendChild(descContainer)
        element.appendChild(valueContainer)
        element.appendChild(btnContainer)

        element.classList.add("item")
        element.addEventListener("click", checkForDelete)

        deleteDataFromDisplay();

        //Place
        validate()

        no_records_message.remove() // Izbriše obvestilo, da ni recordov

        // Spremeni lastnosti okna 
        records.style.alignItems = "flex-start"
        records.style.flexDirection = "column"
        records.style.justifyContent = "unset"
        
        displayData()
    }
}

function validate(){
    if(outcomeOn){
        arrayOfOutcomes.unshift(element);
        console.log(arrayOfOutcomes)
        if(arrayOfOutcomes.length == 6){
            arrayOfOutcomes.pop();
            arrayOfOutcomeValues.pop()
        }
    } else {
        arrayOfIncomes.unshift(element)
        if(arrayOfIncomes.length == 6){
            arrayOfIncomes.pop();
            arrayOfIncomeValues.pop()
        }
    }

}


// 3. Briše Recorde iz displaya vsakič, ko je ustvarjen nov

function deleteDataFromDisplay(){
    if(outcomeOn){
        if(arrayOfOutcomes.length > 0){
            for(let i = 0; i < arrayOfOutcomes.length; i++){
                arrayOfOutcomes[i].remove()
            }
        }
    } else{
        if(arrayOfIncomes.length > 0){
            for(let i = 0; i < arrayOfIncomes.length; i++){
                arrayOfIncomes[i].remove()
            }
        }
    }
}

function deleteDataFromDisplaySwitch(){
    if(!outcomeOn){
        if(arrayOfOutcomes.length > 0){
            for(let i = 0; i < arrayOfOutcomes.length; i++){
                arrayOfOutcomes[i].remove()
            }
        }
    } else{
        if(arrayOfIncomes.length > 0){
            for(let i = 0; i < arrayOfIncomes.length; i++){
                arrayOfIncomes[i].remove()
            }
        }
    }
} 

// Briše vse

function deleteAll(){
    if(deleteAllOutcome && !deleteAllIncome){
        if(arrayOfOutcomes.length > 0){
            for(let i = 0; i < arrayOfOutcomes.length; i++){
                arrayOfOutcomes[i].remove()
            }
            arrayOfOutcomes.length = 0;
            arrayOfOutcomeValues.length = 0;
            totalOutcomeValue.innerHTML = "$0.00"
            totalDifferenceValue.innerHTML = "+" + totalIncome
        }
    } else{
        if(arrayOfOutcomes.length > 0){
            for(let i = 0; i < arrayOfIncomes.length; i++){
                arrayOfIncomes[i].remove()
            }
            arrayOfIncomes.length = 0;
            arrayOfOutcomeValues.length = 0;
            totalIncomeValue.innerHTML = "$0.00";
            totalDifferenceValue.innerHTML = "-" + totalOutcome
        }
    }
    totalDiffence = totalIncome - totalOutcome
    totalDifferenceValue.innerHTML = totalDiffence
}

// 1. Pošlje podatke v class

addBtn.addEventListener("click", writeRecords)

let description, value, visualizeCounter = 0, totalIncome = 0, totalOutcome = 0, totalDiffence = 0;
function writeRecords(){
    description = descriptionInput.value
    value = parseInt(valueInput.value)
    descriptionInput.value = "";
    valueInput.value = null;
    let item = new Item(description, value);
    item.addNewRecord()

    // Writes Values Into Boxes
    
    
    if(outcomeOn){
        arrayOfOutcomeValues.unshift(value)
        totalOutcome += parseInt(value)
        totalOutcomeValue.innerHTML = "$" + totalOutcome
    } else {
        arrayOfIncomeValues.unshift(value)
        totalIncome += parseInt(value)
        totalIncomeValue.innerHTML = "$" + totalIncome
    }
    totalDiffence = totalIncome - totalOutcome
    totalDifferenceValue.innerHTML = totalDiffence

   visualization()
}

function visualization(){
    // VISUALIZATION
    // Calculate and visualize percentage
    let percentageIncome = Math.round(calculateForVisualization(totalIncome, totalOutcome))
    let percentageOutcome = Math.round(100 - percentageIncome);

    visualizationBarIncome.style.height = percentageIncome + "%";
    visualizationBarOutcome.style.height = percentageOutcome + "%"
    
    // Write Percentage Into Visualization Bars

    if(visualizeCounter == 0){
        if(outcomeOn){
            percentageTextOutcome.innerHTML = "Outcome: " + percentageOutcome + "%"
        } else{
            percentageTextIncome.innerHTML = "Income: " + percentageIncome + "%"
        }
    } else{
        percentageTextOutcome.innerHTML = "Outcome: " + percentageOutcome + "%"
        percentageTextIncome.innerHTML = "Income: " + percentageIncome + "%"
    }
    visualizeCounter++;
}

function calculateForVisualization(totalIncome, totalOutcome){
    let total = totalIncome + totalOutcome;
    let totalFinal = totalIncome / total * 100
    Math.round(totalFinal)
    return totalFinal;
}

// VISUALIZATION ENDS HERE

// 4. Shrani podatke v array in jih prikaže

let arrayOfIncomes = [];
let arrayOfOutcomes = [];

let arrayOfIncomeValues = [];
let arrayOfOutcomeValues = [];

function displayData(){
    if(outcomeOn){
        if(arrayOfOutcomes.length > 5){  //Če je v arrayu več kot 5 stvari, izpiše samo prvih pet
            let counter = 0;
            for(let i = 0; i < arrayOfOutcomes.length; i++){ 
                if(counter == 5){
                    break;
                }  
                records.appendChild(arrayOfOutcomes[i])
                counter++;
            }
            //}
        
        } else { // Če je v arrayu 5 ali manj stvari, izpiše vse
            for(let i = 0; i < arrayOfOutcomes.length; i++){
                records.appendChild(arrayOfOutcomes[i]);
            }    
        }
    } else {
        if(arrayOfIncomes.length > 5){ // Če je v arrayu več kot 5 stvari, izpiše samo zadnjih pet
            let counter2 = 0;
            for(let i = 0; i < arrayOfOutcomes.length; i++){
                records.appendChild(arrayOfIncomes[i])
                counter2++;
                if(counter2 == 5){
                    break;
                }
            }
        }  else { // Če je v arrayu 5 ali manj stvari, izpiše vse
            for(let i = 0; i < arrayOfIncomes.length; i++){
                records.appendChild(arrayOfIncomes[i])
            }
        }
    }
}

//let i = arrayOfOutcomes.length - 1; i >= 0; i--

// Izbriše izbrani item

function checkForDelete(e){
    let targetElem = e.target
    if(targetElem.matches("button")){
        let parent = targetElem.parentElement;
        let masterParent = parent.parentElement;
        if(outcomeOn){
            for(let i = 0; i < arrayOfOutcomes.length; i++){
                if(masterParent == arrayOfOutcomes[i]){
                    arrayOfOutcomes[i].remove()
                    let result = totalOutcome - arrayOfOutcomeValues[i]
                    totalOutcome = result;
        
                    totalOutcomeValue.innerHTML = "$" + result

                    totalDiffence = totalIncome - totalOutcome
                    totalDifferenceValue.innerHTML = totalDiffence

                    visualization()

                    arrayOfOutcomeValues.splice(i, 1)
                    arrayOfOutcomes.splice(i, 1);
                    deleteDataFromDisplay()
                    displayData()
                }
            }
        } else {
            for(let i = 0; i < arrayOfIncomes.length; i++){
                if(masterParent == arrayOfIncomes[i]){
                    arrayOfIncomes[i].remove()
                    let result2 = totalIncome - arrayOfIncomeValues[i];
                    totalIncome = result2;

                    totalIncomeValue.innerHTML = "$" + result2

                    totalDiffence = totalIncome - totalOutcome
                    totalDifferenceValue.innerHTML = totalDiffence

                    visualization()

                    arrayOfIncomeValues.splice(i, 1)
                    arrayOfIncomes.splice(i, 1);
                    deleteDataFromDisplay()
                    displayData()
                }
            
            }
        }
    }
}
