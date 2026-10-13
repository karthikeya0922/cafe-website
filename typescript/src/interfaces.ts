// Program 1: Interfaces
// Optional and readonly properties, extending interfaces,
// function-type interfaces and index signatures.
export {};

// Basic interface with readonly and optional properties
interface MenuItem {
    readonly id: string;
    name: string;
    category: "Coffee" | "Tea" | "Bakery" | "Snacks";
    price: number;
    description?: string;
}

// One interface extending another
interface Person {
    name: string;
    email: string;
}

interface Customer extends Person {
    loyaltyPoints: number;
    favourite?: MenuItem;
}

// Interface describing a function's shape
interface DiscountRule {
    (amount: number, customer: Customer): number;
}

// Index signature: any string key maps to a number
interface StockLevels {
    [itemId: string]: number;
}

const latte: MenuItem = {
    id: "M001",
    name: "Hazelnut Latte",
    category: "Coffee",
    price: 160,
    description: "Smooth latte with a roasted hazelnut twist"
};

const chai: MenuItem = { id: "M005", name: "Masala Chai", category: "Tea", price: 90 };

const customer: Customer = {
    name: "Karthikeya",
    email: "karthikeya@example.com",
    loyaltyPoints: 120,
    favourite: latte
};

// 10% off for customers with 100+ loyalty points
const loyaltyDiscount: DiscountRule = (amount, c) => (c.loyaltyPoints >= 100 ? amount * 0.1 : 0);

const stock: StockLevels = { M001: 25, M005: 40 };

function describe(item: MenuItem): string {
    const extra = item.description ?? "No description";
    return `${item.id} | ${item.name} (${item.category}) - Rs. ${item.price} - ${extra}`;
}

console.log("=== Interfaces ===");
console.log(describe(latte));
console.log(describe(chai));

// latte.id = "X"; // Error: id is readonly

console.log(`\nCustomer: ${customer.name} <${customer.email}>, points: ${customer.loyaltyPoints}`);
console.log(`Favourite: ${customer.favourite?.name ?? "none"}`);

const bill = latte.price + chai.price;
const discount = loyaltyDiscount(bill, customer);
console.log(`\nBill: Rs. ${bill}, loyalty discount: Rs. ${discount}, to pay: Rs. ${bill - discount}`);

console.log("\nStock levels:");
for (const id in stock) {
    console.log(`  ${id}: ${stock[id]} left`);
}
