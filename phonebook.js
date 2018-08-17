const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let phonebook;

let readFile = (file) =>{
    fs.readFile(file,(error, data) => {
        if (error){
            console.log(error);
        }
        else{
            phonebook = JSON.parse(data.toString());
            mainMenu();
        }
    });
};

readFile('phonebook.json');

let overwriteFile = (fileName, callback) => {
    fs.writeFile(fileName, JSON.stringify(phonebook), (error) => {
        if (error){
            console.log(error);
        }
        else{
            callback();
        }
    })
}

let printPhonebook = () => {
    console.log('');
    for (key in phonebook){
        console.log(key, phonebook[key]);
        console.log('');
    };
};

let listAll = (callback) => {
    printPhonebook();
    callback();
}

let createEntry = (callback) => {
    rl.question("What is the entry's name: ", (entryName) => {
        let newEntry = entryName;
        rl.question("What is the entry's phone number: ", (entryNumber) => {
            phonebook[newEntry] = entryNumber;
            overwriteFile("phonebook.json", () => {
                printPhonebook();
                callback();
            });
        });
    });
};

let removeEntry = (callback) => {
    rl.question("Who would you like to remove from the phonebook? ", (victim) => {
        delete phonebook[victim];
        console.log(phonebook);
        overwriteFile("phonebook.json", () => {
            printPhonebook();
            callback();
        });
    })
};

let quit = (callback) => {
    console.log("Have a great day!")
    rl.close();
}

let mainMenu = () => {
    let items = [
    "Phone Book",
    "========================",
    "1. Look up an entry", 
    "2. Set an entry", 
    "3. Delete an entry", 
    "4. List all entries", 
    "5. Quit", 
]
    items.forEach((item) => {
        console.log(item);
    });
    phonebookFunction();
};

let options = {
    "1": listAll,
    "2": createEntry,
    "3": removeEntry,
    "4": listAll,
    "5": quit
};

let phonebookFunction = () => {
    rl.question('What would you like to do? ', (answer) => {
        options[answer](mainMenu);
    });
};