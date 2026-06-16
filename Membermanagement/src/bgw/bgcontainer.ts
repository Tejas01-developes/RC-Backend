import bull from "bull";

export const container=new bull(
    "rc-bgw",
    "redis://127.0.0.1:6379"
)