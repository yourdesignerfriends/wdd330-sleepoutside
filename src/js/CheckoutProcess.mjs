import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.externalServices = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    // Calculate the total dollar amount of the items in the cart
    this.itemTotal = this.list.reduce((total, item) => {
      // Use quantity instead of Quantity to match ShoppingCart.mjs
      const quantity = item.quantity || 1;
      return total + (item.FinalPrice * quantity);
    }, 0);

    // Display the subtotal
    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotal) {
      subtotal.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    // Calculate tax (6% of subtotal)
    this.tax = this.itemTotal * 0.06;

    // Calculate shipping ($10 for first item, $2 for each additional)
    const totalItems = this.list.reduce((total, item) => {
      // Use quantity instead of Quantity to match ShoppingCart.mjs
      return total + (item.quantity || 1);
    }, 0);
    
    this.shipping = totalItems > 0 ? 10 + (Math.max(0, totalItems - 1) * 2) : 0;

    // Calculate order total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Display the totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #order-total`);

    if (tax) tax.textContent = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.textContent = `$${this.shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity || 1
    }));
  }

  formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });

    return convertedJSON;
  }

  async checkout(form) {
    const formData = this.formDataToJSON(form);
    console.log('Form data:', formData);
    
    const order = {
      orderDate: new Date().toISOString(),
      fname: formData.firstName,
      lname: formData.lastName,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      cardNumber: formData.cardNumber,
      expiration: formData.expiration,
      code: formData.code,
      items: this.packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    // Ensure the order object matches the required format exactly
    const formattedOrder = {
      orderDate: order.orderDate,
      fname: order.fname,
      lname: order.lname,
      street: order.street,
      city: order.city,
      state: order.state,
      zip: order.zip,
      cardNumber: order.cardNumber,
      expiration: order.expiration,
      code: order.code,
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      orderTotal: order.orderTotal,
      shipping: order.shipping,
      tax: order.tax
    };

    console.log('Formatted order:', formattedOrder);

    try {
      const response = await this.externalServices.submitOrder(formattedOrder);
      console.log('Server response:', response);
      return response;
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    }
  }
}
