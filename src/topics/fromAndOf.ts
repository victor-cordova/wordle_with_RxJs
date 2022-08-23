import { scheduled, asyncScheduler, from } from "rxjs";

from(["yellow", "grey", "blue", "red"]).subscribe(console.log);

