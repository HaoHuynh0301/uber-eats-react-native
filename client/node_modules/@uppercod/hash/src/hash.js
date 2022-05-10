/**
 * Generates a hash based on [anteesor, current, successor]
 * @param {string|string[]} str
 * @returns {string}
 */
export function hash(str) {
    let total = [0, 0, 0];
    let length = str.length;
    while (length--) {
        total[0] += getValue(str[length - 1]);
        total[1] += getValue(str[length]);
        total[2] += getValue(str[length + 1]);
    }
    return total.map((value) => value.toString(16)).join("-");
}

const getValue = (value) => (value ? value.charCodeAt() : 0);
