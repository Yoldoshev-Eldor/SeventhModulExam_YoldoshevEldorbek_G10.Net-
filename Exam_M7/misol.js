//1-misol
function countUnique(arr) {
    return new Set(arr).size;
}

const arr = [1, 2, 2, 2, 4, 4, 5];
console.log(countUnique(arr)); 


//2-misol

function capitalizeFirstLetter(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
string = "hello world";
console.log(capitalizeFirstLetter(string));

//3-misol
function isPalindrome(str) {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');  
}


console.log(isPalindrome("level")); 
console.log(isPalindrome("hello")); 