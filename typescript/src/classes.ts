// Program 2: Classes
// Access modifiers, parameter properties, getters/setters, static members,
// abstract classes, inheritance, method overriding and implementing interfaces.
export {};

interface Printable {
    print(): void;
}

// Abstract base class: cannot be created directly
abstract class Beverage implements Printable {
    private static count = 0;

    constructor(
        public readonly name: string,
        protected basePrice: number,
        private _size: "Small" | "Medium" | "Large" = "Medium"
    ) {
        Beverage.count++;
    }

    // Getter and setter for a private field
    get size(): string {
        return this._size;
    }

    set size(value: "Small" | "Medium" | "Large") {
        this._size = value;
    }

    // Every subclass must say how it is prepared
    abstract prepare(): string;

    get price(): number {
        const multiplier = { Small: 0.8, Medium: 1, Large: 1.3 }[this._size];
        return Math.round(this.basePrice * multiplier);
    }

    print(): void {
        console.log(`${this.name} (${this._size}) - Rs. ${this.price}: ${this.prepare()}`);
    }

    static get totalMade(): number {
        return Beverage.count;
    }
}

class Coffee extends Beverage {
    constructor(name: string, basePrice: number, private shots: number = 1) {
        super(name, basePrice);
    }

    prepare(): string {
        return `pulling ${this.shots} espresso shot(s)`;
    }

    // Override: each extra shot costs Rs. 30
    override get price(): number {
        return super.price + (this.shots - 1) * 30;
    }
}

class Tea extends Beverage {
    constructor(name: string, basePrice: number, private steepMinutes: number) {
        super(name, basePrice, "Small");
    }

    prepare(): string {
        return `steeping for ${this.steepMinutes} minutes`;
    }
}

class Order implements Printable {
    private static nextId = 1001;
    readonly id: number;
    private items: Beverage[] = [];

    constructor(public customerName: string) {
        this.id = Order.nextId++;
    }

    add(item: Beverage): this {
        this.items.push(item);
        return this; // returning this allows chaining
    }

    get total(): number {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    print(): void {
        console.log(`\nOrder #${this.id} for ${this.customerName}`);
        this.items.forEach(item => item.print());
        console.log(`Total: Rs. ${this.total}`);
    }
}

console.log("=== Classes ===");

const espresso = new Coffee("Espresso", 120);
const doubleLatte = new Coffee("Latte", 150, 2);
doubleLatte.size = "Large";
const chai = new Tea("Masala Chai", 90, 4);

// const b = new Beverage("x", 10); // Error: cannot create an abstract class
// espresso.basePrice;              // Error: basePrice is protected

new Order("Karthikeya").add(espresso).add(doubleLatte).print();
new Order("Ananya").add(chai).add(new Tea("Green Tea", 100, 3)).print();

console.log(`\nBeverages made today: ${Beverage.totalMade}`);
