import logo from "./logo.png";
import logo_full from "./logo_full.png";
import logo_full_dark from "./logo_full_dark.png";
import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.png";
import theme_icon from "./theme_icon.svg";
import send_icon from "./send_icon.png";
import stop_icon from "./stop_icon.png";
import mountain_img from "./mountain_img.jpg";
import menu_icon from "./menu_icon.png";
import close_icon from "./close_icon.svg";
import bin_icon from "./bin_icon.svg";
import logout_icon from "./logout_icon.svg";
import diamond_icon from "./diamond_icon.svg";
import gallery_icon from "./gallery_icon.svg";

export const assets = {
    logo,
    logo_full,
    logo_full_dark,
    search_icon,
    user_icon,
    theme_icon,
    send_icon,
    stop_icon,
    mountain_img,
    menu_icon,
    close_icon,
    bin_icon,
    logout_icon,
    diamond_icon,
    gallery_icon
};

export const dummyPlans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
];