import { Order } from "../models/ordermodel.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/usermodel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = asynchandler(async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.user._id;

        // 1️⃣ Save order in DB
        const newOrder = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentStatus: "pending",
        });
        await User.findByIdAndUpdate(userId, { cartdata: {} });

        // 2️⃣ Convert cart items to Stripe format
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80,
            },
            quantity: item.quantity,
        }));
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })

        // 3️⃣ Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
        });

        // 4️⃣ Send Stripe URL to frontend
        res.status(200).json({
            success: true,
            url: session.url,
        });

    } catch (error) {
        console.error("🚨 PlaceOrder Error:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid order data',
                errors: error.errors
            });
        }

        if (error.code === '23503') { // Foreign key violation
            return res.status(400).json({
                success: false,
                message: 'Invalid product reference'
            });
        }

        // Generic server error
        res.status(500).json({
            success: false,
            message: 'Failed to place order'
        });

    }
});

export { placeOrder };
