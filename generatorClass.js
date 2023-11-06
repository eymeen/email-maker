import fs from "fs"

class GenerateEmail {
    constructor(input = null) {
        this.check(input)
        this.domain = input.includes("@") ? input.split("@")[1] : "gmail.com";
        this.username = input.split("@")[0];
        this.variations = [];
        this.generateVariations('', this.username);
    }

    generateVariations(current, remaining) {
        if (remaining.length === 0) {
            this.variations.push(current);
            return;
        }

        this.generateVariations(current + remaining[0], remaining.slice(1));

        if (remaining.length > 1) {
            this.generateVariations(current + remaining[0] + '.', remaining.slice(1));
        }
    }

    get(type = "arr") {
        switch (type) {
            case "arr":
                return this.variations;
            case "object":
                return Object(this.variations);
            default:
                return this.variations.join(type);
        }
    }
    log(type = "arr"){
        console.log(this.get(type))
    }
    table(){
        console.table(this.get("arr"))
    }
    download(side = "backend") {
        if(side == "frontend") return this.downloadFile();
        this.fsDownload();

    }
    fsDownload(){
        const name = `${this.username}.txt`;
        const content = this.variations.join("\n");
        fs.writeFile(name, content, (err) => {
            if (err) {
                console.error(`Error writing file: ${err}`);
            } else {
                console.log(`File ${name} has been saved.`);
            }
        });
    }
    downloadFile() {
        const name = `${this.username}.txt`;
        const content = this.variations.join("\n");
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', name);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    check(input){
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let usrRegex = /^[a-zA-Z0-9._%+-]+$/;
        if(input.includes("@") && regex.test(input)){
            throw new Error("this is not a valid email address, please write a correct one with or without the @ and what's after.")
        }else if(usrRegex.test(input)){
            throw new Error("this is not a valid username for and email address, please write a correct one.")
        }
    }

    // arithmetic
    countVariations(){
        return this.getEmailChars(this.username.length)
    }
    getEmailChars(variationCount){
        return -~Math.log2(variationCount) + 1;
    }
    getVariations(emailChars){
        return 2**(emailChars-1);
    }

}

module.exports = GenerateEmail;
