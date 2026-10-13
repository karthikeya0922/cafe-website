// Program 3: Functions
// Typed parameters and return values, optional/default/rest parameters,
// arrow functions, function types, overloads, generics and callbacks.
export {};

// Named function with typed parameters and return type
function addTax(amount: number, rate: number): number {
    return amount + amount * rate;
}

// Optional parameter
function greet(name: string, table?: number): string {
    return table !== undefined ? `Welcome ${name}, your table is #${table}` : `Welcome ${name}`;
}

// Default parameter
function makeCoffee(type: string = "Espresso", sugar: number = 1): string {
    return `${type} with ${sugar} sugar`;
}

// Rest parameters
function totalBill(...prices: number[]): number {
    return prices.reduce((sum, p) => sum + p, 0);
}

// Arrow function and a function type alias
type PriceFormatter = (amount: number) => string;
const formatRupees: PriceFormatter = amount => `Rs. ${amount.toFixed(2)}`;

// Function overloads: one function, different argument types
function findItem(id: number): string;
function findItem(name: string): string;
function findItem(key: number | string): string {
    const menu = ["Espresso", "Cappuccino", "Masala Chai"];
    if (typeof key === "number") {
        return menu[key] ?? "Not found";
    }
    return menu.includes(key) ? `${key} is on the menu` : `${key} is not on the menu`;
}

// Generic function: works for any type
function firstOf<T>(items: T[]): T | undefined {
    return items[0];
}

// Generic with a constraint
function cheapest<T extends { price: number }>(items: T[]): T {
    return items.reduce((min, item) => (item.price < min.price ? item : min));
}

// Higher-order function taking a callback
function applyToAll(prices: number[], fn: (p: number) => number): number[] {
    return prices.map(fn);
}

// Function returning a function (closure)
function discountOf(percent: number): (price: number) => number {
    return price => price - (price * percent) / 100;
}

console.log("=== Functions ===");
console.log("addTax(200, 0.05)      ->", addTax(200, 0.05));
console.log("greet('Ravi')          ->", greet("Ravi"));
console.log("greet('Ravi', 7)       ->", greet("Ravi", 7));
console.log("makeCoffee()           ->", makeCoffee());
console.log("makeCoffee('Latte', 2) ->", makeCoffee("Latte", 2));
console.log("totalBill(120, 90, 160)->", totalBill(120, 90, 160));
console.log("formatRupees(370)      ->", formatRupees(370));
console.log("findItem(1)            ->", findItem(1));
console.log("findItem('Mocha')      ->", findItem("Mocha"));
console.log("firstOf(['Tea','Coffee'])->", firstOf(["Tea", "Coffee"]));

const menu = [
    { name: "Espresso", price: 120 },
    { name: "Masala Chai", price: 90 },
    { name: "Cold Brew", price: 170 }
];
console.log("cheapest(menu)         ->", cheapest(menu).name);

const tenPercentOff = discountOf(10);
console.log("10% off [120, 90, 170] ->", applyToAll([120, 90, 170], tenPercentOff));
