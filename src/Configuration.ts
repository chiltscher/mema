import {existsSync, readFileSync} from "fs";
import {join, resolve} from "path";
import {DataService} from "tintoa-data-service";
import DS_Settings = DataService.DS_Settings;

export function getMongoConfiguration() : DS_Settings {
    const PATH = resolve(join(__dirname, "..", "config", "config.user.json"));
    if(!existsSync(PATH)) {
        throw new Error("Please create a configuration file 'config.user.json' in the config directory!");
    }
    let settingString = readFileSync(PATH).toString();
    return JSON.parse(settingString).store as DS_Settings;
}