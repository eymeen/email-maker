// use this for simple tasks
function generateEmail(input) {
    var domain = input.includes("@") ? input.split("@")[1] : "gmail.com";
    var variations = [];
    function helper(current, remaining) {
        if (remaining.length === 0) {
            variations.push(current);
            return;
        }

        helper(current + remaining[0], remaining.slice(1));

        if (remaining.length > 1) {
            helper(current + remaining[0] + '.', remaining.slice(1));
        }
    }

    helper('', input);
    variations = variations.map(e => e + domain)

    // download file
    let filename = `${ input }.txt`;
    let text = variations.join("\n")
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return variations;
}

function check(input){
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let usrRegex = /^[a-zA-Z0-9._%+-]+$/;
    if(input.includes("@") && regex.test(input)){
        return 2;
    }else if(usrRegex.test(input)){
        return 3;
    }
    return 1;
}
