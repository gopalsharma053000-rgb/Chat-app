// import arcjet,{shield , detectBot, slidingWindow } from "@arcjet/node";
// import { ENV } from "../lib/env.js";

// const aj = arcjet({
//     key:ENV.ARCJET_KEY,
//     rules:[
//         shield({mode:"LIVE"}),
//         detectBot({
//             mode:"LIVE",
//             allow:[
//                 "CATEGORY:SEARCH_ENGINE",
//             ],
//         }),
//         slidingWindow({
//             mode:"LIVE",
//             max:100,
//             interval:60,
//         }),
//     ],
// });


// export default aj;

import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "../lib/env.js";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      // Agar development mein ho toh DRY_RUN rakhein taaki local pe block na kare
      mode: ENV.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;