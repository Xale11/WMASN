import Stripe from "stripe";
import { LineItem } from "./StoreData";

const stripe = new Stripe(`sk_test_51MaPAcD2tsopsvJeFud6vunqPIBv3x0Y2SC4uM8QFMcXH4gcSpyq0O5VpDXKRoTQiehS4VblLUEEIZKpYLYHMGnT009i4TZoKj`);

const YOUR_DOMAIN = "http://localhost:5173/"

export const goToCheckout = async (lineItems: LineItem[]) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 299,
              currency: "gbp",
            },
            display_name: "Standard Delivery",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 2,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: [
          "US", // United States
          "CA", // Canada
          "GB", // United Kingdom
          "AU", // Australia
          "FR", // France
          "DE", // Germany
          "IT", // Italy
          "ES", // Spain
          "JP", // Japan
          "CN", // China
          "IN", // India
          "BR", // Brazil
          "MX", // Mexico
          "RU", // Russia
          "ZA", // South Africa
          "NG", // Nigeria
          "EG", // Egypt
          "AR", // Argentina
          "NZ", // New Zealand
          "BE", // Belgium
          "NL", // Netherlands
          "SE", // Sweden
          "NO", // Norway
          "DK", // Denmark
          "FI", // Finland
          "AT", // Austria
          "CH", // Switzerland
          "PT", // Portugal
          "GR", // Greece
          "PL", // Poland
          "CZ", // Czech Republic
          "HU", // Hungary
          "RO", // Romania
          "BG", // Bulgaria
          "SK", // Slovakia
          "SI", // Slovenia
          "HR", // Croatia
          "RS", // Serbia
          "UA", // Ukraine
          "TR", // Turkey
          "IE", // Ireland
          "LU", // Luxembourg
          "CY", // Cyprus
          "EE", // Estonia
          "LV", // Latvia
          "LT", // Lithuania
          "MT", // Malta
          "IS", // Iceland
          "MC", // Monaco
          "LI", // Liechtenstein
          // Add more country codes as needed
        ],
      },
    });
    
    return session.url as string
}

