var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var phonebook;

var readFile = function(file){
    fs.readFile(file, function(error, data){
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

var overwriteFile = function(fileName, callback){
    fs.writeFile(fileName, JSON.stringify(phonebook), function(error){
        if (error){
            console.log(error);
        }
        else{
            callback();
        }
    })
}

var printPhonebook = function(){
    console.log('');
    for (key in phonebook){
        console.log(key, phonebook[key]);
        console.log('');
    };
};

var listAll = function(callback){
    printPhonebook();
    callback();
}

var createEntry = function(callback){
    rl.question("What is the entry's name: ", function(entryName){
        var newEntry = entryName;
        rl.question("What is the entry's phone number: ", function(entryNumber){
            phonebook[newEntry] = entryNumber;
            overwriteFile("phonebook.json", function(){
                printPhonebook();
                callback();
            });
        });
    });
};

var removeEntry = function(callback){
    rl.question("Who would you like to remove from the phonebook? ", function(victim){
        delete phonebook[victim];
        console.log(phonebook);
        overwriteFile("phonebook.json", function(){
            printPhonebook();
            callback();
        });
    })
};

var quit = function(callback){
    console.log("Have a great day!")
    rl.close();
}

var mainMenu = function(){
    var items = [
    "Phone Book",
    "========================",
    "1. Look up an entry", 
    "2. Set an entry", 
    "3. Delete an entry", 
    "4. List all entries", 
    "5. Quit", 
]
    items.forEach(function(item){
        console.log(item);
    });
    phonebookFunction();
};

var options = {
    "1": listAll,
    "2": createEntry,
    "3": removeEntry,
    "4": listAll,
    "5": quit
};

var phonebookFunction = function(){
    rl.question('What would you like to do? ', function(answer){
        options[answer](mainMenu);
    });
};