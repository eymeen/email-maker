# email-maker

Generate multiple work emails from only one email. It works because most mailers ignore dots written in the emails. Playing on this glitch, system users can randomly insert dots inside the email, keeping it valid email, to create multiple email variations from a single one. I created this repo to prevent this from happening on your system. Use the class, GitHub page, or the simple function to get all of the possible variations and add the instructions to your system.

For one-time uses, visit this page: [Email Generator](https://example.com/email-generator)

## Installation

You can install the `email-maker` package using npm:

```bash
npm install email-maker
```

## Usage

```javascript
const EmailMaker = require('email-maker');

// Initialize with an email address
const emailInstance = new EmailMaker('example@gmail.com');

// Get email variations as an array
const variationsArray = emailInstance.getEmailVariations('arr');

// Get email variations as an object
const variationsObject = emailInstance.getEmailVariations('object');

// Get email variations as a string separated by a specified delimiter (default is comma)
const variationsString = emailInstance.getEmailVariations(', ');

// Log email variations to the console as an array
emailInstance.logVariations('arr');

// Log email variations to the console as a table
emailInstance.tableVariations();

// Download variations as a text file (backend-side)
emailInstance.download('backend');

// Download variations as a text file (frontend-side)
emailInstance.download('frontend');
```

## Methods

### `getEmailVariations(type: string)`

Returns email variations based on the specified type.

- `type`: The format of the output. Possible values are 'arr' (array), 'object', or any delimiter for a string.

### `logVariations(type: string)`

Logs email variations to the console based on the specified type.

- `type`: The format of the output. Possible values are 'arr' (array), 'object', or any delimiter for a string.

### `tableVariations()`

Logs email variations to the console as a table.

### `download(side: string)`

Downloads email variations as a text file.

- `side`: The side for downloading, either 'backend' or 'frontend'.

## Example

```javascript
const EmailMaker = require('email-maker');

const emailInstance = new EmailMaker('example@gmail.com');

// Log variations as a table
emailInstance.tableVariations();

// Download variations as a text file (backend-side)
emailInstance.download('backend');
```

## Compatibility

Tested on:

- gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
