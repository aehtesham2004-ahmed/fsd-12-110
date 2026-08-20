import readline from "readline/promises";
import { stdin, stdout } from "process";
import { readFile, writeFile } from "fs/promises";

const FILE = new URL("./product.json", import.meta.url);

// Read cart from file
const getCart = async () => {
  try {
    const data = await readFile(FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      await writeFile(FILE, "[]");
      return [];
    }
    throw err;
  }
};

// Save cart
const saveCart = async (myCart) => {
  await writeFile(FILE, JSON.stringify(myCart, null, 2));
};

// Add product
const addToCart = async (product) => {
  const myCart = await getCart();

  const isFound = myCart.find((item) => item.id === product.id);

  if (isFound) {
    isFound.qty += product.qty;
  } else {
    myCart.push(product);
  }

  await saveCart(myCart);
  console.log("Product added/updated successfully.");
};

// Show cart
const showCart = async () => {
  const myCart = await getCart();

  if (myCart.length === 0) {
    console.log("\nCart is empty.");
    return;
  }

  console.table(myCart);

  const total = myCart.reduce((acc, item) => acc + item.price * item.qty, 0);

  console.log("Total Amount:", total);
};

// Remove product
const removeProduct = async (pid) => {
  const myCart = await getCart();

  const newData = myCart.filter((item) => item.id !== pid);

  if (newData.length === myCart.length) {
    console.log(`Product with id ${pid} not found.`);
  } else {
    await saveCart(newData);
    console.log(`Product with id ${pid} deleted successfully.`);
  }
};

// Update quantity
const updateQuantity = async (id, qty) => {
  const myCart = await getCart();

  const product = myCart.find((item) => item.id === id);

  if (!product) {
    console.log("Product not found.");
    return;
  }

  product.qty = qty;

  await saveCart(myCart);

  console.log("Quantity updated successfully.");
};

// Checkout
const checkout = async () => {
  const myCart = await getCart();

  if (myCart.length === 0) {
    console.log("Cart is empty.");
    return;
  }

  console.table(myCart);

  const total = myCart.reduce((acc, item) => acc + item.price * item.qty, 0);

  console.log("Total Bill:", total);

  await saveCart([]);

  console.log("Thank you for shopping!");
};

// Main Menu
const main = async () => {
  const cin = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  let choice;

  do {
    console.log("\n===== Flipkart Cart =====");
    console.log("1. Show Cart");
    console.log("2. Add Product");
    console.log("3. Remove Product");
    console.log("4. Update Quantity");
    console.log("5. Checkout");
    console.log("6. Exit");

    choice = Number(await cin.question("Enter your choice: "));

    switch (choice) {
      case 1:
        await showCart();
        break;

      case 2: {
        const input = await cin.question("Enter id,name,price,qty: ");

        const [id, name, price, qty] = input
          .split(",")
          .map((item) => item.trim());

        const product = {
          id: Number(id),
          name,
          price: Number(price),
          qty: Number(qty),
        };

        await addToCart(product);
        break;
      }

      case 3: {
        const id = Number(await cin.question("Enter Product ID: "));
        await removeProduct(id);
        break;
      }

      case 4: {
        const id = Number(await cin.question("Enter Product ID: "));
        const qty = Number(await cin.question("Enter New Quantity: "));
        await updateQuantity(id, qty);
        break;
      }

      case 5:
        await checkout();
        break;

      case 6:
        console.log("Goodbye!");
        break;

      default:
        console.log("Invalid choice. Please try again.");
    }
  } while (choice !== 6);

  cin.close();
};

main();
