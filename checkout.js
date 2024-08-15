document.addEventListener("DOMContentLoaded", function () {
    const jsonData = {
        "checkout_id": "c456d2e7-45b3-492a-bdd3-8d8d234a670e",
        "created_at": "2024-08-13T12:34:56Z",
        "customer": {
            "customer_id": "123456",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "+1234567890",
            "shipping_address": {
                "address_id": "654321",
                "first_name": "John",
                "last_name": "Doe",
                "company": "Example Corp",
                "address_line1": "123 Main St",
                "address_line2": "Apt 4B",
                "city": "New York",
                "state": "NY",
                "postal_code": "10001",
                "country": "USA"
            },
            "billing_address": {
                "address_id": "654322",
                "first_name": "John",
                "last_name": "Doe",
                "company": "Example Corp",
                "address_line1": "123 Main St",
                "address_line2": "Apt 4B",
                "city": "New York",
                "state": "NY",
                "postal_code": "10001",
                "country": "USA"
            }
        },
        "cart": {
            "items": [
                {
                    "item_id": "prod_001",
                    "product_name": "Wireless Headphones",
                    "quantity": 2,
                    "price": 99.99,
                    "discount": {
                        "type": "percentage",
                        "value": 10,
                        "applied_value": 19.998
                    },
                    "tax": {
                        "type": "percentage",
                        "value": 8.875,
                        "applied_value": 14.135
                    },
                    "total_price": 194.122,
                    "image_url": "https://www.boat-lifestyle.com/cdn/shop/products/616b4ead-bbd9-4a16-aeab-8d331a16f697_600x.png?v=1642405569"
                },
                {
                    "item_id": "prod_002",
                    "product_name": "Bluetooth Speaker",
                    "quantity": 1,
                    "price": 149.99,
                    "discount": {
                        "type": "fixed",
                        "value": 20.00,
                        "applied_value": 20.00
                    },
                    "tax": {
                        "type": "percentage",
                        "value": 8.875,
                        "applied_value": 11.496
                    },
                    "total_price": 141.486,
                    "image_url": "https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw5bf276ec/JBL_GO_3_HERO_BLUE_0077_1605x1605px.png?sw=535&sh=535"
                }
            ],
            "sub_total": 294.991,
            "total_discount": 39.998,
            "total_tax": 25.631,
            "shipping_cost": 15.00,
            "grand_total": 295.624
        },
        "shipping_method": {
            "method_id": "ship_001",
            "method_name": "Standard Shipping",
            "cost": 15.00,
            "estimated_delivery": "2024-08-20T12:00:00Z"
        },
        "payment_method": {
            "method_id": "pay_001",
            "method_name": "Credit Card",
            "transaction_id": "txn_789012",
            "payment_status": "Authorized",
            "amount": 295.624,
            "currency": "USD"
        },
        "discounts_applied": [
            {
                "discount_id": "disc_001",
                "type": "percentage",
                "description": "Summer Sale - 10% off on Wireless Headphones",
                "value": 10,
                "applied_value": 19.998
            },
            {
                "discount_id": "disc_002",
                "type": "fixed",
                "description": "Loyalty Discount - $20 off on Bluetooth Speaker",
                "value": 20.00,
                "applied_value": 20.00
            }
        ],
        "tax_details": [
            {
                "tax_id": "tax_001",
                "type": "sales_tax",
                "description": "State Sales Tax",
                "rate": 8.875,
                "applied_value": 25.631
            }
        ],
        "order_notes": "Please leave the package at the front door.",
        "status": "Pending",
        "updated_at": "2024-08-13T12:45:00Z"
    };

    const payButton = document.getElementById('payButton');
    const cardDetails = document.getElementById('card-details');
    const thankYouPage = document.getElementById('thankYouPage');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const paymentSection = document.querySelector('.container');
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const saveCard = document.getElementById('saveCard');
    
    // Populate the order summary
    const orderSummary = document.getElementById('order-summary');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const grandTotalElement = document.getElementById('grand-total');
    const orderNumber = document.getElementById('orderNumber');
    const customerName = document.getElementById('customerName');
    const confirmationNumber = document.getElementById('confirmationNumber');
    const customerEmail = document.getElementById('customerEmail');
    const paymentMethod = document.getElementById('paymentMethod');
    const shippingAddress = document.getElementById('shippingAddress');
    const billingAddress = document.getElementById('billingAddress');
    const productDetails = document.getElementById('productDetails');

    let itemsHTML = '';
    jsonData.cart.items.forEach(item => {
        const priceWithTax = item.price + item.tax.applied_value;
        itemsHTML += `
            <div class="flex items-center mb-4">
                <img src="${item.image_url}" alt="${item.product_name}" class="w-16 h-16 mr-4 object-cover rounded">
                <div class="flex-1">
                    <p class="font-semibold text-sm">${item.product_name}</p>
                    <p class="text-lg font-bold">Price: $${item.price.toFixed(2)}</p>
                    <p class="text-sm">Tax: $${item.tax.applied_value.toFixed(2)}</p>
                    <p class="text-md font-semibold text-gray-700">Total: $${priceWithTax.toFixed(2)} (Including $${item.tax.applied_value.toFixed(2)} in taxes)</p>
                </div>
            </div>
        `;
    });

    orderSummary.innerHTML = itemsHTML;
    subtotalElement.textContent = `$${jsonData.cart.sub_total.toFixed(2)}`;
    shippingElement.textContent = `$${jsonData.shipping_method.cost.toFixed(2)}`;
    grandTotalElement.textContent = `$${jsonData.cart.grand_total.toFixed(2)}`;

    payButton.addEventListener('click', function () {
        const cardNum = cardNumber.value;
        const expDate = expiryDate.value;
        const cvvCode = cvv.value;

        // Perform validation
        if (cardDetails.classList.contains('hidden') || validateCardDetails(cardNum, expDate, cvvCode)) {
            paymentSection.classList.add('hidden');
            // thankYouPage.classList.remove('hidden');
            orderConfirmation.classList.remove('hidden');

            // Populate the Thank You Page
            orderNumber.textContent = jsonData.checkout_id;
            customerName.textContent = `${jsonData.customer.first_name} ${jsonData.customer.last_name}`;
            confirmationNumber.textContent = jsonData.checkout_id;
            customerEmail.textContent = jsonData.customer.email;
            paymentMethod.textContent = `${jsonData.payment_method.method_name} - $${jsonData.payment_method.amount.toFixed(2)}`;
            shippingAddress.textContent = `${jsonData.customer.shipping_address.address_line1}, ${jsonData.customer.shipping_address.address_line2}, ${jsonData.customer.shipping_address.city}, ${jsonData.customer.shipping_address.state}, ${jsonData.customer.shipping_address.postal_code}, ${jsonData.customer.shipping_address.country}`;
            billingAddress.textContent = `${jsonData.customer.billing_address.address_line1}, ${jsonData.customer.billing_address.address_line2}, ${jsonData.customer.billing_address.city}, ${jsonData.customer.billing_address.state}, ${jsonData.customer.billing_address.postal_code}, ${jsonData.customer.billing_address.country}`;
            productDetails.innerHTML = itemsHTML;
        } else {
            alert('Please enter valid card details.');
        }
    });


    // Payment method selection
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'card') {
                cardDetails.classList.remove('hidden');
            } else {
                cardDetails.classList.add('hidden');
            }
        });
    });

    // Validate card details function
    function validateCardDetails(cardNum, expDate, cvvCode) {
        const cardNumRegex = /^[0-9]{16}$/;
        const expDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        const cvvRegex = /^[0-9]{3}$/;

        const isCardNumValid = cardNumRegex.test(cardNum);
        const isExpDateValid = expDateRegex.test(expDate) && validateExpiryDate(expDate);
        const isCvvValid = cvvRegex.test(cvvCode);

        return isCardNumValid && isExpDateValid && isCvvValid;
    }

    // Expiry date validation
    function validateExpiryDate(expiryDate) {
        const [month, year] = expiryDate.split('/');
        const expDate = new Date(`20${year}`, month);
        const today = new Date();

        return expDate > today;
    }

    // Handle discount code application
    const applyDiscountButton = document.getElementById('applyDiscount');
    const discountCodeInput = document.getElementById('discountCode');

    applyDiscountButton.addEventListener('click', function () {
        const discountCode = discountCodeInput.value.trim();
        if (discountCode) {
            // Implement discount application logic
            alert(`Discount code "${discountCode}" applied!`);
        } else {
            alert("Please enter a discount code.");
        }
    });
});
