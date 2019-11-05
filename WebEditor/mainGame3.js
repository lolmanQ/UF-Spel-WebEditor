const reader = new FileReader();
var file_text;
var stor;
var fullObjectStored;
var rowID = 0;
var sID = 0;
var sIDLookUpTable = [];
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
        signName: "",
		signImg: "",
		tempNumb: 0
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
    stor.forEach(makeRow);
}

function makeRow(value, i){
	this.elementID = "I" + rowID;
    this.table = document.getElementById("tb01");
    this.rowElement = document.createElement("tr");
    this.rowElement.id = this.elementID;
    for(columsIndex = 0; columsIndex <= 3; columsIndex++){
        this.colomElement = document.createElement("td");
        switch(columsIndex){
            case 0:
                this.colomInputElement = document.createElement("div");
                this.inputButtonUp = document.createElement("input");
                this.inputButtonDown = document.createElement("input");
                this.inputButtonUp.type = "button";
                this.inputButtonDown.type = "button";
                this.inputButtonUp.value = "▲";
                this.inputButtonDown.value = "▼";
                this.inputButtonUp.setAttribute("onclick", "GoUpButton("+sID+", "+this.elementID+");");
                this.inputButtonDown.setAttribute("onclick", "GoDownButton("+sID+", "+this.elementID+");");
                this.colomInputElement.appendChild(this.inputButtonUp);
                this.colomInputElement.appendChild(this.inputButtonDown);
                break;
            case 1:
                this.colomInputElement = document.createElement("input");
                this.colomInputElement.type = "text";
                this.colomInputElement.value = value.signName;
                this.colomInputElement.setAttribute("onchange", "updateQuestion("+sID+", "+this.elementID+");");
                break;
            case 2:
                this.colomInputElement = document.createElement("input");
                this.colomInputElement.type = "text";
                this.colomInputElement.value = value.signImg;
                this.colomInputElement.setAttribute("onchange", "updateAnswer("+sID+", "+this.elementID+");");
                break;
            case 3:
                this.colomInputElement = document.createElement("input");
                this.colomInputElement.type = "button";
                this.colomInputElement.value = "Remove";
                this.colomInputElement.setAttribute("onclick", "removeButtonClick("+sID+", "+this.elementID+");");
                break;
		}
		stor[i].tempNumb = sID;
		sIDLookUpTable[sID] = i;
        this.colomElement.appendChild(this.colomInputElement);
        this.rowElement.appendChild(this.colomElement);
    }
    this.table.appendChild(this.rowElement);
	rowID++;
	sID++;
}

function updateQuestion(sIDTemp, inputID){
    this.inputValue = inputID.children[1].firstElementChild.value;
    stor[sIDLookUpTable[sIDTemp]].signName = this.inputValue;
}

function updateAnswer(sIDTemp, inputID){
    this.inputValue = inputID.children[2].firstElementChild.value;
    stor[sIDLookUpTable[sIDTemp]].signImg = this.inputValue;
}

function removeButtonClick(sIDTemp, inputID){
	stor.splice(sIDLookUpTable[sIDTemp],1);
	MoveSIDLookupTable1(sIDTemp);
    inputID.remove();
}

function MoveSIDLookupTable1(indexOfShift){
	for(var i = 0; i< sIDLookUpTable.length;i++){
		if(sIDLookUpTable[i] >= sIDLookUpTable[indexOfShift]){
			sIDLookUpTable[i] = sIDLookUpTable[i] -1;
		}	
	}
}

function GoUpButton(sIDTemp, inputID){
    if(sIDLookUpTable[sIDTemp] > 0){
		this.wantToMove = inputID;
    	this.wantToMoveVaribles = stor[sIDLookUpTable[sIDTemp]];
		this.rowAboveVaribles = stor[sIDLookUpTable[sIDTemp]-1];
		this.table = document.getElementById("tb01").children;
		for(var i = 0; i < this.table.length;i++){
			if(this.table[i] == this.wantToMove){
				this.rowAbove = this.table[i-1];
				this.tbody = document.getElementById("tb01");
				this.tbody.insertBefore(inputID, this.rowAbove);
				sIDLookUpTable[stor[i-1].tempNumb] = i;
				sIDLookUpTable[stor[i].tempNumb] = i-1;
				stor[i-1] = this.wantToMoveVaribles;
				stor[i] = this.rowAboveVaribles;
				break;
			}
		}
    }
}

function GoDownButton(sIDTemp, inputID){
	if(sIDLookUpTable[sIDTemp] < stor.length -1){
		this.wantToMove = inputID;
    	this.wantToMoveVaribles = stor[sIDLookUpTable[sIDTemp]];
		this.rowAboveVaribles = stor[sIDLookUpTable[sIDTemp]+1];
		this.table = document.getElementById("tb01").children;
		for(var i = 0; i < this.table.length;i++){
			if(this.table[i] == this.wantToMove){
				this.rowAbove = this.table[i+2];
				this.tbody = document.getElementById("tb01");
				this.tbody.insertBefore(inputID, this.rowAbove);
				sIDLookUpTable[stor[i+1].tempNumb] = i;
				sIDLookUpTable[stor[i].tempNumb] = i+1;
				stor[i+1] = this.wantToMoveVaribles;
				stor[i] = this.rowAboveVaribles;
				break;
			}
		}
    }
}

function createEmptyRow(){
    this.emptyValue = {
        signName: "",
		signImg: "",
		tempNumb: 0
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