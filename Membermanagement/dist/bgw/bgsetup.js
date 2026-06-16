import { sendemail } from "emailsending";
import { container } from "./bgcontainer.js";
container.process(async (job) => {
    try {
        const { to, subject, text } = job.data;
        console.log("Processing email....");
        await sendemail(to, subject, text);
        console.log("email send");
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=bgsetup.js.map