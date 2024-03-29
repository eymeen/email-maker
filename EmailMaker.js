// import fs from 'fs';

export default class EmailMaker {
    constructor(input = null) {
        this.validateInput(input);
        this.domain = input.includes("@") ? input.split("@")[1] : "gmail.com";
        this.username = input.split("@")[0];
        this.variations = [];
        this.generateUsernameVariations('', this.username);
    }

    generateUsernameVariations(current, remaining) {
        if (remaining.length === 0) {
            this.variations.push(current);
            return;
        }

        this.generateUsernameVariations(current + remaining[0], remaining.slice(1));

        if (remaining.length > 1) {
            this.generateUsernameVariations(current + remaining[0] + '.', remaining.slice(1));
        }
    }

    getEmailVariations(type = "arr") {
        switch (type) {
            case "arr":
                return this.variations;
            case "object":
                return Object(this.variations);
            default:
                return this.variations.join(type);
        }
    }

    logVariations(type = "arr") {
        console.log(this.getEmailVariations(type));
    }

    tableVariations() {
        console.table(this.getEmailVariations("arr"));
    }

    download(side = "backend") {
        // if (side === "frontend")
        return this.blobDownload;
        // this.fsDownload();
    }


    // causes problem on front-end
    // fsDownload() {
    //     const filename = `${this.username}_variations.txt`;
    //     const content = this.variations.join("\n");
    //     fs.writeFile(filename, content, (err) => {
    //         if (err) {
    //             console.error(`Error writing file: ${err}`);
    //         } else {
    //             console.log(`File ${filename} has been saved.`);
    //         }
    //     });
    // }

    blobDownload() {
        const filename = `${this.username}_variations.txt`;
        const content = this.variations.join("\n");
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    validateInput(input) {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let usernameRegex = /^[a-zA-Z0-9._%+-]+$/;
        if (input.includes("@") && emailRegex.test(input)) {
            throw new Error("Invalid email address. Please provide a correct one with or without the @ and domain.");
        } else if (usernameRegex.test(input)) {
            throw new Error("Invalid username for an email address. Please provide a correct one.");
        }
        return true;
    }

    // Arithmetic
    countUsernameVariations() {
        return this.getEmailCharsCount(this.username.length);
    }

    getEmailCharsCount(variationCount) {
        return -~Math.log2(variationCount) + 1;
    }

    getVariationsCount(emailChars) {
        return 2 ** (emailChars - 1);
    }
}
