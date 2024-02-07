/**
 * Return a 32-bit integer hashCode of key, like hashCode function in JAVA.
 * Should be defined by user for each key type, this is a default implementation.
 * @param key
 * @returns {number} 32-bit integer hashCode of key
 */

function defaultHashCodeFunction(key) {
    const str = JSON.stringify(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        // ((hash << 5) - hash) equals to 31*hash
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        // Convert to 32-bit integer
        hash |= 0;
    }
    return hash;
}

function isPowerOf2(num) {
    return num >=2 && (num & (num - 1)) === 0;
}

exports.defaultHashCodeFunction = defaultHashCodeFunction;
exports.isPowerOf2 = isPowerOf2;