const reader = new FileReader();
var file_text;
var stor;
var fullObjectStored;
var rowID = 0;
var fileNameString = "default";
var fileNameFull;

reader.onload = event => file_text = event.target.result;
reader.onloadend = event => loadProject();

function getFile(){
    this.fileRaw = document.getElementById("idFile");
    this.file = this.fileRaw.files[0];
    fileNameFull = this.file.name;
    return this.file;
}

function readFile(file){
    reader.readAsText(file);
    this.result = reader.result;
}

function loadProject(){
	emptyTheTabel();
    fullObjectStored = JSON.parse(file_text);
    stor = fullObjectStored.Items;
    fileNameString = fileNameFull.replace(".json", "");
    document.getElementById("fileNameID").value = fileNameString;
    makeTabell();
}

function loadSave(){
	emptyTheTabel();
	stor = JSON.parse(localStorage.getItem("myobjG2"));
	document.getElementById("fileNameID").value = localStorage.getItem("fileNameG2");
	makeTabell();
}

function saveSave(){
	localStorage.setItem("myobjG2", JSON.stringify(stor));
	localStorage.setItem("fileNameG2", fileNameString);
}

function makeEmpty(){
	emptyTheTabel();
	this.emptyValue = {
        question: "",
		answer: "",
		fake1: "",
		fake2: "",
		fake3: "",
        imageName: ""
	};
	document.getElementById("fileNameID").value = "default";
	stor = [this.emptyValue];
	makeTabell();
}

function emptyTheTabel(){
	this.table =  document.getElementById("tb01");
	while(this.table.hasChildNodes()){
		this.table.removeChild(this.table.childNodes[0]);
	}
}

function makeTabell(){
    this.amountTabellRows = stor.length;
    stor.forEach(makeRow);
}

function makeRow(value, i){
    this.elementID = "I" + rowID;
    this.table = document.getElementById("tb01");
    this.rowElement = document.createElement("tr");
    this.rowElement.id = this.elementID;
    for(columsIndex = 1; columsIndex <= 7; columsIndex++){
        this.colomElement = document.createElement("td");
        switch(columsIndex){
            case 1:
                this.colomInputElement = document.createElement("input");
                this.colomInputElement.type = "text";
                this.colomInputElement.value = value.question;
                this.colomInputElement.setAttribute("onchange", "updateQuestion("+i+", "+this.elementID+");");
                break;
            case 2:
                this.colomInputElement = document.createElement("input");
                this.colomInputElement.type = "text";
                this.colomInputElement.value = value.answer;
                this.colomInputElement.setAttribute("onchange", "updateAnswer("+i+", "+this.elementID+");");
                break;
            case 3:
				this.colomInputElement = document.createElement("input");
				this.colomInputElement.type = "text";
				this.colomInputElement.value = value.fake1;
				this.colomInputElement.setAttribute("onchange", "updateFake1("+i+", "+this.elementID+");");
				break;
			case 4:
				this.colomInputElement = document.createElement("input");
				this.colomInputElement.type = "text";
				this.colomInputElement.value = value.fake2;
				this.colomInputElement.setAttribute("onchange", "updateFake2("+i+", "+this.elementID+");");
				break;
			case 5:
				this.colomInputElement = document.createElement("input");
				this.colomInputElement.type = "text";
				this.colomInputElement.value = value.fake3;
				this.colomInputElement.setAttribute("onchange", "updateFake3("+i+", "+this.elementID+");");
				break;
			case 6:
                this.colomInputElement = document.createElement("input");
                this.colomInputElement.type = "text";
                this.colomInputElement.value = value.imageName;
                this.colomInputElement.setAttribute("onchange", "updateImage("+i+", "+this.elementID+");");
                break;
            case 7:
                this.colomInputElement = document.createElement("input");
                this.colomInputElement.type = "button";
                this.colomInputElement.value = "Remove";
                this.colomInputElement.setAttribute("onclick", "removeButtonClick("+i+", "+this.elementID+");");
                break;
        }
        this.colomElement.appendChild(this.colomInputElement);
        this.rowElement.appendChild(this.colomElement);
    }
    this.table.appendChild(this.rowElement);
    rowID++;
}

function updateQuestion(storageNumb, inputID){
    this.inputValue = inputID.children[0].firstElementChild.value;
    stor[storageNumb].question = this.inputValue;
}

function updateAnswer(storageNumb, inputID){
    this.inputValue = inputID.children[1].firstElementChild.value;
    stor[storageNumb].answer = this.inputValue;
}

function updateFake1(storageNumb, inputID){
	this.inputValue = inputID.children[2].firstElementChild.value;
    stor[storageNumb].fake1 = this.inputValue;
}

function updateFake2(storageNumb, inputID){
	this.inputValue = inputID.children[3].firstElementChild.value;
    stor[storageNumb].fake2 = this.inputValue;
}

function updateFake3(storageNumb, inputID){
	this.inputValue = inputID.children[4].firstElementChild.value;
    stor[storageNumb].fake3 = this.inputValue;
}

function updateImage(storageNumb, inputID){
    this.inputValue = inputID.children[2].firstElementChild.value;
    stor[storageNumb].imageName = this.inputValue;
}

function removeButtonClick(storageNumb, inputID){
    stor.splice(storageNumb,1);
    inputID.remove();
}

function createEmptyRow(){
    this.emptyValue = {
        question: "",
		answer: "",
		fake1: "",
		fake2: "",
		fake3: "",
        imageName: ""
    };
    if(stor == null){
		stor = [this.emptyValue];
	}
	else{
		stor.push(this.emptyValue);
	}
    makeRow(this.emptyValue, stor.length - 1);
}

function downloadFile(){
    if(fullObjectStored == null){
		fullObjectStored = {
			Items: stor
		};
	}
	else{
		fullObjectStored.Items = stor;
	}
    this.jsString = JSON.stringify(fullObjectStored);
    fileNameString = document.getElementById("fileNameID").value;
    downloadObjectAsJson(fullObjectStored, fileNameString);
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.remove();
    downloadAnchorNode.click();
}