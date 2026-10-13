// Program 4: Cafe billing system
// Combines interfaces, classes and functions into one small application.
export {};

type Category = "Coffee" | "Tea" | "Bakery" | "Snacks";

interface MenuItem {
    readonly id: number;
    name: string;
    category: Category;
    price: number;
}

interface CartLine {
    item: MenuItem;
    quantity: number;
}

interface Discount {
    label: string;
    apply(subtotal: number): number;
}

// Generic repository that stores anything with a numeric id
class Repository<T extends { id: number }> {
    private records = new Map<number, T>();

    add(...records: T[]): void {
        records.forEach(r => this.records.set(r.id, r));
    }

    get(id: number): T {
        const record = this.records.get(id);
        if (!record) throw new Error(`No record with id ${id}`);
        return record;
    }

    all(): T[] {
        return [...this.records.values()];
    }
}

class Cart {
    private lines: CartLine[] = [];

    add(item: MenuItem, quantity: number = 1): void {
        const existing = this.lines.find(l => l.item.id === item.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.lines.push({ item, quantity });
        }
    }

    remove(itemId: number): void {
        this.lines = this.lines.filter(l => l.item.id !== itemId);
    }

    get subtotal(): number {
        return this.lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0);
    }

    get items(): readonly CartLine[] {
        return this.lines;
    }
}

class Bill {
    private static readonly GST_RATE = 0.05;

    constructor(private cart: Cart, private discounts: Discount[] = []) {}

    print(): void {
        console.log("------------------------------------");
        console.log("           FIRE POT CAFE            ");
        console.log("------------------------------------");
        this.cart.items.forEach(({ item, quantity }) => {
            console.log(row(`${item.name} x${quantity}`, item.price * quantity));
        });

        let amount = this.cart.subtotal;
        console.log("------------------------------------");
        console.log(row("Subtotal", amount));

        for (const d of this.discounts) {
            const off = d.apply(amount);
            if (off > 0) {
                console.log(row(d.label, -off));
                amount -= off;
            }
        }

        const gst = amount * Bill.GST_RATE;
        console.log(row("GST (5%)", gst));
        console.log("------------------------------------");
        console.log(row("TOTAL", amount + gst));
    }
}

function row(label: string, amount: number): string {
    return label.padEnd(24) + `Rs. ${amount.toFixed(2)}`.padStart(12);
}

// Discounts are plain objects that match the Discount interface
const bulkDiscount: Discount = {
    label: "Bulk (5% over Rs.500)",
    apply: subtotal => (subtotal > 500 ? subtotal * 0.05 : 0)
};

const happyHour = (hour: number): Discount => ({
    label: "Happy hour (Rs.50 off)",
    apply: () => (hour >= 15 && hour < 17 ? 50 : 0)
});

const menu = new Repository<MenuItem>();
menu.add(
    { id: 1, name: "Cappuccino", category: "Coffee", price: 150 },
    { id: 2, name: "Cold Brew", category: "Coffee", price: 170 },
    { id: 3, name: "Masala Chai", category: "Tea", price: 90 },
    { id: 4, name: "Butter Croissant", category: "Bakery", price: 110 },
    { id: 5, name: "Peri Peri Fries", category: "Snacks", price: 150 }
);

console.log("=== Menu ===");
menu.all().forEach(m => console.log(`${m.id}. ${m.name.padEnd(18)} ${m.category.padEnd(8)} Rs. ${m.price}`));

const cart = new Cart();
cart.add(menu.get(1), 2);
cart.add(menu.get(4));
cart.add(menu.get(5));
cart.add(menu.get(3));
cart.add(menu.get(1)); // adds to the existing Cappuccino line
cart.remove(3);

console.log();
new Bill(cart, [bulkDiscount, happyHour(16)]).print();
