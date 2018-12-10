import {app} from "./app/Application";

// process.env.DEBUG = "true";

app.listen(2208, () => {
    console.log("Server started @ 2208");
});