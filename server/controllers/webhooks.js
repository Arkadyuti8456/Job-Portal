import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller to manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try {
        // Create a svix instance with clerk webhooks secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Verifying headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        })

        // GEtting data from request body
        const { data, type } = req.body

        // Switch case for different events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
            }
            default:
                break;
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Webhooks Error" })
    }
}   