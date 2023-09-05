
// ... [provided dependencies]
const input = [
    ["t-shirt", "dress shirt"], 
    ["dress shirt", "pants"], 
    ["dress shirt", "suit jacket"],
    ["tie", "suit jacket"], 
    ["pants", "suit jacket"], 
    ["belt", "suit jacket"],
    ["suit jacket", "overcoat"], 
    ["dress shirt", "tie"], 
    ["suit jacket", "sun glasses"],
    ["sun glasses", "overcoat"], 
    ["left sock", "pants"],
    ["pants", "belt"], 
    ["suit jacket", "left shoe"], 
    ["suit jacket", "right shoe"],
    ["left shoe", "overcoat"], 
    ["right sock", "pants"],
    ["right shoe","overcoat"], 
    ["t-shirt", "suit jacket"]
];


/**
 * Determines the order of dressing based on the given dependencies.
 * @param {Array<Array<string>>} pairs - The list of dependencies.
 * @returns {Array<Array<string>>} order - The order of dressing, each inner array can be worn simultaneously.
 */
function getDressingOrder(pairs) {
    let order = [];
    
    while (pairs.length > 0) {
        let baseItems = findBaseItems(pairs);
        if (baseItems.length === 0) {
            throw new Error('Circular dependency detected');
        }
        order.push(baseItems);
        pairs = pairs.filter(pair => !baseItems.includes(pair[0]));
    }
    
   // Handle items that can be worn after the final set of base items
    const lastItems = order[order.length - 1];
    const nextItems = getNextItems(lastItems, input);
    if (nextItems.length) {
        order.push(nextItems);
    }

    return order;
}

/**
 * Given a list of dependency pairs, this function determines the base items 
 * that don't depend on any other items to be worn first. 
 * @param {Array<Array<string>>} pairs - The list of dependencies.
 * @returns {Array<string>} baseItems - List of base items.
 */
function findBaseItems(pairs) {
    let allItems = new Set();
    let dependentItems = new Set();

    pairs.forEach(pair => {
        allItems.add(pair[0]);
        dependentItems.add(pair[1]);
    });

    let baseItems = [...allItems].filter(item => !dependentItems.has(item));
    return baseItems.sort();
}

/**
 * Given a list of base items, this function finds the items that can be worn after these base items.
 * @param {Array<string>} base - The list of base items.
 * @param {Array<Array<string>>} pairs - The list of dependencies.
 * @returns {Array<string>} nextItems - List of items that can be worn after the base items.
 */
function getNextItems(base, pairs) {
    let nextItems = new Set();

    pairs.forEach(pair => {
        if (base.includes(pair[0])) {
            nextItems.add(pair[1]);
        }
    });

    return [...nextItems].sort();
}



//display the result
const result = getDressingOrder(input);

result.forEach(line => {
    console.log(line.join(', '));
});


// Total Time Complexity: O(n^2) - where n is the number of pairs
// Total Space Complexity: O(n) - where n is the number of pairs