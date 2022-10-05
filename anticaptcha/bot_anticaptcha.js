// start time setting.
const start_hours = 0,
  minutes = 00,
  seconds = 00;
const end_hours = 24,
  end_minutes = 00,
  end_seconds = 00;
const delay_captcha = 2;
const console_mode = false;
const multipleBotCount = 1;
const botDelayTimesPerCar = [0]; // this is delay time group of multiple bots per car

// current time
const start_time = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
  start_hours,
  minutes,
  seconds
);
const end_time = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
  end_hours,
  end_minutes,
  end_seconds
);

let carInfoCsv = [];
let ppts = [];
let browsers = [];
let pages = [];

let task_solutions = [];

let success_stories = [];
let fileName = '';

const ReadWriteLock = require('rwlock');

const lock = new ReadWriteLock();
const { Parser } = require('json2csv');
const fields = [
  'Engine Type',
  'App Reference Number',
  'Car Number',
];
let json2csvParser = new Parser({ fields });
const fs = require('fs');

const options = { width: 1080, height: 720 };
const config = {
  url: "https://driveonlantau1.td.gov.hk/lcrp/application/clientLogging.do?method=jumpToApp&language=en&country=HK",
};
const areas = {
  HK: "Hong Kong",
  NT: "New Territories",
  KLN: "Kowloon",
};
const districts = {
  HK: [
    {
      short: "AKN",
      long: "A KUNG NGAM, SHAU KEI WAN",
    },
    {
      short: "ABN",
      long: "ABERDEEN",
    },
    {
      short: "AMT",
      long: "ADMIRALTY",
    },
    {
      short: "ALC",
      long: "AP LEI CHAU",
    },
    {
      short: "CWB",
      long: "CAUSEWAY BAY",
    },
    {
      short: "CEW",
      long: "CENTRAL",
    },
    {
      short: "CW",
      long: "CHAI WAN",
    },
    {
      short: "CHK",
      long: "CHUNG HOM KOK",
    },
    {
      short: "DWB",
      long: "DEEP WATER BAY",
    },
    {
      short: "HV",
      long: "HAPPY VALLEY",
    },
    {
      short: "JL",
      long: "JARDINE'S LOOKOUT",
    },
    {
      short: "KNT",
      long: "KENNEDY TOWN",
    },
    {
      short: "ML",
      long: "MID-LEVELS",
    },
    {
      short: "MD",
      long: "MOUNT DAVIS",
    },
    {
      short: "NP",
      long: "NORTH POINT",
    },
    {
      short: "PFL",
      long: "POKFULAM",
    },
    {
      short: "QB",
      long: "QUARRY BAY",
    },
    {
      short: "RB",
      long: "REPULSE BAY",
    },
    {
      short: "SWH",
      long: "SAI WAN HO",
    },
    {
      short: "SYP",
      long: "SAI YING PUN",
    },
    {
      short: "SWA",
      long: "SHAM WAN, ABERDEEN",
    },
    {
      short: "SKW",
      long: "SHAU KEI WAN",
    },
    {
      short: "SO",
      long: "SHEK O",
    },
    {
      short: "SW",
      long: "SHEUNG WAN",
    },
    {
      short: "SH",
      long: "SHOUSON HILL, ABERDEEN",
    },
    {
      short: "SSW",
      long: "SIU SAI WAN",
    },
    {
      short: "SKP",
      long: "SO KON PO",
    },
    {
      short: "SB",
      long: "SOUTH BAY",
    },
    {
      short: "SLY",
      long: "STANLEY",
    },
    {
      short: "TH",
      long: "TAI HANG",
    },
    {
      short: "TT",
      long: "TAI TAM",
    },
    {
      short: "TKS",
      long: "TAIKOO SHING",
    },
    {
      short: "TP",
      long: "THE PEAK",
    },
    {
      short: "TWN",
      long: "TIN WAN, ABERDEEN",
    },
    {
      short: "WCH",
      long: "WAN CHAI",
    },
    {
      short: "WCK",
      long: "WONG CHUK HANG, ABERDEEN",
    },
    {
      short: "WNC",
      long: "WONG NAI CHUNG GAP",
    },
  ],
  KLN: [
    {
      short: "BH",
      long: "BEACON HILL",
    },
    {
      short: "CSW",
      long: "CHEUNG SHA WAN",
    },
    {
      short: "CHH",
      long: "CHOI HUNG",
    },
    {
      short: "CY",
      long: "CHUK YUEN, WONG TAI SIN",
    },
    {
      short: "DH",
      long: "DIAMOND HILL",
    },
    {
      short: "HMT",
      long: "HO MAN TIN",
    },
    {
      short: "HH",
      long: "HUNG HOM",
    },
    {
      short: "KP",
      long: "KING'S PARK, HO MAN TIN",
    },
    {
      short: "KNB",
      long: "KOWLOON BAY",
    },
    {
      short: "KCY",
      long: "KOWLOON CITY",
    },
    {
      short: "KLT",
      long: "KOWLOON TONG",
    },
    {
      short: "KWT",
      long: "KWUN TONG",
    },
    {
      short: "LCK",
      long: "LAI CHI KOK",
    },
    {
      short: "LT",
      long: "LAM TIN",
    },
    {
      short: "LYM",
      long: "LEI YUE MUN",
    },
    {
      short: "LOF",
      long: "LOK FU",
    },
    {
      short: "MTW",
      long: "MA TAU WAI",
    },
    {
      short: "MK",
      long: "MONG KOK",
    },
    {
      short: "NCW",
      long: "NGAU CHI WAN",
    },
    {
      short: "NTK",
      long: "NGAU TAU KOK",
    },
    {
      short: "PS",
      long: "PING SHEK",
    },
    {
      short: "SPK",
      long: "SAN PO KONG",
    },
    {
      short: "SMP",
      long: "SAU MAU PING",
    },
    {
      short: "SSP",
      long: "SHAM SHUI PO",
    },
    {
      short: "SKM",
      long: "SHEK KIP MEI",
    },
    {
      short: "SHL",
      long: "SHUN LEE",
    },
    {
      short: "TKT",
      long: "TAI KOK TSUI",
    },
    {
      short: "TKW",
      long: "TO KWA WAN",
    },
    {
      short: "TST",
      long: "TSIM SHA TSUI",
    },
    {
      short: "TWS",
      long: "TSZ WAN SHAN",
    },
    {
      short: "WTH",
      long: "WANG TAU HOM",
    },
    {
      short: "WK",
      long: "WEST KOWLOON",
    },
    {
      short: "WTS",
      long: "WONG TAI SIN",
    },
    {
      short: "YMT",
      long: "YAU MA TEI",
    },
    {
      short: "YT",
      long: "YAU TONG",
    },
    {
      short: "YYC",
      long: "YAU YAT CHUEN, KOWLOON TONG",
    },
  ],
  NT: [
    {
      short: "AT",
      long: "AU TAU, YUEN LONG",
    },
    {
      short: "CP",
      long: "CASTLE PEAK",
    },
    {
      short: "CKL",
      long: "CHA KWO LING",
    },
    {
      short: "CLK",
      long: "CHEK LAP KOK, LANTAU",
    },
    {
      short: "CC",
      long: "CHEUNG CHAU",
    },
    {
      short: "CS",
      long: "CHEUNG SHA, LANTAU",
    },
    {
      short: "CLW",
      long: "CLEAR WATER BAY, SAI KUNG",
    },
    {
      short: "DB",
      long: "DISCOVERY BAY, LANTAU",
    },
    {
      short: "FL",
      long: "FANLING",
    },
    {
      short: "FNS",
      long: "FEI NGO SHAN, SAI KUNG",
    },
    {
      short: "FT",
      long: "FO TAN, SHATIN",
    },
    {
      short: "HT",
      long: "HA TSUEN, YUEN LONG",
    },
    {
      short: "HAH",
      long: "HANG HAU, TSEUNG KWAN O",
    },
    {
      short: "HLC",
      long: "HEI LING CHAU",
    },
    {
      short: "HC",
      long: "HO CHUNG, SAI KUNG",
    },
    {
      short: "HSK",
      long: "HUNG SHUI KIU, YUEN LONG",
    },
    {
      short: "KT",
      long: "KAM TIN, YUEN LONG",
    },
    {
      short: "KTS",
      long: "KAU TO SHAN, SHATIN",
    },
    {
      short: "KC",
      long: "KWAI CHUNG",
    },
    {
      short: "LTE",
      long: "LAM TEI, TUEN MUN",
    },
    {
      short: "LTU",
      long: "LAM TSUEN, TAI PO",
    },
    {
      short: "LMI",
      long: "LAMMA ISLAND",
    },
    {
      short: "LNT",
      long: "LANTAU",
    },
    {
      short: "LFS",
      long: "LAU FAU SHAN, YUEN LONG",
    },
    {
      short: "LKT",
      long: "LUNG KWU TAN, TUEN MUN",
    },
    {
      short: "MOS",
      long: "MA ON SHAN, SHATIN",
    },
    {
      short: "MW",
      long: "MA WAN",
    },
    {
      short: "MUW",
      long: "MUI WO, LANTAU",
    },
    {
      short: "NSC",
      long: "NGONG SHUEN CHAU",
    },
    {
      short: "PSW",
      long: "PAK SHA WAN, SAI KUNG",
    },
    {
      short: "PH",
      long: "PAT HEUNG, YUEN LONG",
    },
    {
      short: "PC",
      long: "PENG CHAU",
    },
    {
      short: "PCU",
      long: "PING CHAU",
    },
    {
      short: "PCH",
      long: "PING CHE",
    },
    {
      short: "PSH",
      long: "PING SHAN, YUEN LONG",
    },
    {
      short: "PLC",
      long: "PLOVER COVE",
    },
    {
      short: "PTI",
      long: "PO TOI ISLAND",
    },
    {
      short: "PUO",
      long: "PUI O, LANTAU",
    },
    {
      short: "SKU",
      long: "SAI KUNG",
    },
    {
      short: "STK",
      long: "SHA TAU KOK",
    },
    {
      short: "ST",
      long: "SHAM TSENG, TSUEN WAN",
    },
    {
      short: "SPH",
      long: "SHAP PAT HEUNG, YUEN LONG",
    },
    {
      short: "SHT",
      long: "SHATIN",
    },
    {
      short: "SK",
      long: "SHEK KONG, YUEN LONG",
    },
    {
      short: "SP",
      long: "SHEK PIK, LANTAU",
    },
    {
      short: "SS",
      long: "SHEUNG SHUI",
    },
    {
      short: "SIL",
      long: "SILVERSTRAND, SAI KUNG",
    },
    {
      short: "SL",
      long: "SIU LAM, TUEN MUN",
    },
    {
      short: "SLU",
      long: "SIU LEK YUEN, SHATIN",
    },
    {
      short: "SWW",
      long: "SO KWUN WAT, TUEN MUN",
    },
    {
      short: "TAW",
      long: "TA KWU LING",
    },
    {
      short: "TMT",
      long: "TAI MONG TSAI, SAI KUNG",
    },
    {
      short: "TAO",
      long: "TAI O, LANTAU",
    },
    {
      short: "TPO",
      long: "TAI PO",
    },
    {
      short: "TTG",
      long: "TAI TONG, YUEN LONG",
    },
    {
      short: "TWI",
      long: "TAI WAI, SHATIN",
    },
    {
      short: "TM",
      long: "TAP MUN",
    },
    {
      short: "TIS",
      long: "TIN SHUI WAI, YUEN LONG",
    },
    {
      short: "TK",
      long: "TING KAU, TSUEN WAN",
    },
    {
      short: "TKL",
      long: "TIU KENG LENG",
    },
    {
      short: "TKO",
      long: "TSEUNG KWAN O",
    },
    {
      short: "TSE",
      long: "TSIM SHA TSUI EAST",
    },
    {
      short: "TLT",
      long: "TSING LUNG TAU, TSUEN WAN",
    },
    {
      short: "KWC",
      long: "TSING YI",
    },
    {
      short: "TSW",
      long: "TSUEN WAN",
    },
    {
      short: "TUM",
      long: "TUEN MUN",
    },
    {
      short: "TC",
      long: "TUNG CHUNG, LANTAU",
    },
    {
      short: "TLI",
      long: "TUNG LUNG ISLAND",
    },
    {
      short: "YKT",
      long: "YAU KOM TAU, TSUEN WAN",
    },
    {
      short: "YUL",
      long: "YUEN LONG",
    },
  ],
};

function json2array(json) {
  const result = [];
  const keys = Object.keys(json);
  keys.forEach(function (key) {
    let value = (json[key] || "").toString();
    result.push(value);
  });
  return result;
}
function reCaptcha() {
  return new Promise(async (resolve, reject) => {
    //recaptcha
    let anticaptcha = require("./anticaptcha")(
      "b9ab2c0e965ad4fded7ebb943a7dd070"
    );
    const project_config = require("./config.json");
    //recaptcha key from target website
    anticaptcha.setWebsiteURL(
      "https://driveonlantau1.td.gov.hk/lcrp/application/application.do?method=readDeclaration"
    );
    let siteKey = project_config.sitekey;
    anticaptcha.setWebsiteKey(siteKey);
    //browser header parameters
    anticaptcha.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116"
    );
    // check balance first
    anticaptcha.getBalance(function (err, balance) {
      if (err) {
        resolve({});
      }
      if (balance > 0) {
        anticaptcha.createTaskProxyless(function (err, taskId) {
          if (err) {
            resolve({});
          }
          anticaptcha.getTaskSolution(
            taskId,
            function (err, taskSol) {
              if (err) {
                resolve({});
              }
              resolve(taskSol);
            },
            0,
            undefined,
            delay_captcha
          );
        });
      }
    });
  });
}

const openBrowser = async (index) => {
  ppts[index] = require("puppeteer-extra");
  require("events").EventEmitter.defaultMaxListeners = 50;

  browsers[index] = await ppts[index].launch({
    args: [
      `--window-size=${options.width},${options.height}`,
      "--no-sandbox",
      "--allow-running-insecure-content",
    ],
    headless: console_mode,
  });

  pages[index] = (await browsers[index].pages())[0];
  task_solutions[index] = "";

  await pages[index].setViewport({
    width: options.width,
    height: options.height,
  });
  await pages[index].setDefaultNavigationTimeout(0);
  await pages[index].goto(config.url);

  pages[index].on("dialog", async (dialog) => {
    console.log(dialog.type());
    await dialog.accept();
  });
};
const delay = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), ms);
  });
};

const waitStartTime = async (index, carIndex) => {
  // scraping start | start page
  while (true) {
    let current_time = new Date();
    if (
      current_time.getTime() >= start_time.getTime() &&
      current_time.getTime() <= end_time.getTime()
    ) {
      break;
    }
    console.log("Wait start time");
    await delay(1000); // wait 1 second
  }
  await pages[index].waitForTimeout(botDelayTimesPerCar[carIndex]);
};

const goToMain = async (index) => {
  let startPagePass = false;
  console.log("starting now");
  while (true) {
    try {
      // await pages[index].click("#makeNewApplication");
      await pages[index].click(".contenttable tr:nth-of-type(1) a");
      while (true) {
        await delay(500);
        let checkMakeNew = await pages[index].evaluate(() => {
          // return document.querySelector("#makeNewApplication");
          return document.querySelector(".contenttable tr:nth-of-type(3) a");
        });
        if (checkMakeNew != null) {
          await pages[index]
            .reload(config.url)
            .catch(
              async () =>
                await pages[index]
                  .reload(config.url)
                  .catch(
                    async () =>
                      await pages[index]
                        .reload(config.url)
                        .catch((e) => console.error(e))
                  )
            );
          break;
        }
        let checkFlag = await pages[index].evaluate(() => {
          return document.querySelector("#readFlag1");
        });
        if (checkFlag != null) {
          startPagePass = true;
          break;
        }
      }
      if (startPagePass) {
        break;
      }
    } catch (e) {
      console.log(e);
    }
    await delay(3000);
  }
  await pages[index].click("#readFlag1");
  await pages[index].click(".continueBtn");

  //second page
  while (true) {
    let passFlag = 0;
    try {
      const elementHandle = await pages[index].waitForSelector("#readFlag1");
      await elementHandle.click("#readFlag1");
      passFlag = 1;
    } catch (e) {
      console.log("not found check-box in second page");
    }
    if (passFlag === 1) {
      break;
    }
    await delay(3000);
  }
  await pages[index].click(".continueBtn");
};

const onClickTnc = async (index) => {
  try {
    const elementHandle = await pages[index].waitForSelector(
      'input[name="TNC"]',
      {
        visible: true,
      }
    );
    await elementHandle.click();
  } catch (err) {
    console.log("Don't Find, bot is trying to find #TNC");
  }

  await pages[index].waitForTimeout(200)

  await pages[index].click("#submitBut").catch(
    async () =>
      await pages[index].click("#submitBut").catch((e) => {
        console.error("Please click continue button", e);
      })
  );
  console.log("bot get ticket");
};


const goToStep3 = async (index, carIndex, dataObject) => {


  const selectDate = async (day) => {
    try {
      console.log("Selecting avaliable date");
      const dateSelector = ".tdStyle a";
      await pages[index].$$eval(
        dateSelector,
        (btns, day) => {
          btns.forEach((btn) => {
            const { innerText } = btn;
            if (innerText === day) btn.click();
          });
        },
        day
      );
    } catch (e) {
      console.error("Could not select date!");
    }
  };

  while (true) {
    var data = json2array(dataObject[carIndex]);

    //step 1
    while (true) {
      let passFlag = 0;
      try {
        let elementHandle = await pages[index].waitForSelector("#readFlag1");
        if (!await (await elementHandle.getProperty('checked')).jsonValue()) {
          await elementHandle.click();
        }
        passFlag = 1;
      } catch (e) {
        passFlag = 1;
        console.log("not found check-box in step1");
      }
      if (passFlag === 1) break;
    }


    let taskSolution = task_solutions[index];
    if (!taskSolution) taskSolution = await reCaptcha();

    try {
      await pages[index].evaluate(
        `document.getElementById("g-recaptcha-response").innerHTML="${taskSolution}";`
      );
    } catch (err) {

    }

    const carNumber = data[4];
    console.log(carNumber);

    try {
      // await test("2");
      // await pages[index].evaluate(() => {
      //   document.querySelector("#registrationMark").value = "";
      // });
      const elementHandle = await pages[index].waitForSelector(
        "#registrationMark"
      );
      await elementHandle.click({ clickCount: 2 })
      await elementHandle.type(carNumber);
    } catch (e) {
      console.error("could not type car number!");
    }
    await delay(2000)

    try {
      // await pages[index].evaluate(() => {
      //   document.querySelector("#registrationMarkAgain").value = "";
      // });
      const elementHandle = await pages[index].waitForSelector(
        "#registrationMarkAgain"
      );
      await elementHandle.click({ clickCount: 2 })
      await elementHandle.type(carNumber);
    } catch (e) {
      console.error("could not retype car number!");
    }


    

    Promise.all([
      pages[index].click(`.continueBtn`),
      pages[index].waitForNavigation().catch(() => { }),
    ])
    //pass or no
    //step2

    let elementInnerHTML;
    while (true) {
      let passFlag = 0;
      try {
        let element2 = await pages[index].waitForSelector(
          ".long_step_hd .step_no"
        ); // select the element
        elementInnerHTML = await element2.evaluate((el) => el.innerHTML);
        passFlag = 1;
        console.log('checking step1 is done..', elementInnerHTML)
      } catch (e) {
        console.log('step1 is not done')
      }
      if (passFlag === 1) break;
    }

    if (elementInnerHTML === "Step 2") {
      await delay(1000)
      await selectDate(data[1]);
      await delay(800)
      await selectDate(data[2]);
      await delay(800)
      await selectDate(data[3]);
      await delay(2000)
      try {
        console.log("Clicking continue button...");
        await pages[index]
          .waitForSelector(".contenttable_button #actionBtnContinue")
          .then((x) => x.click());
      } catch (e) {

      }

      let elementClassName3 = "";
      //step3 or no
      while (true) {
        let passFlag = 0;
        try {
          let element3 = await pages[index].waitForSelector(
            ".long_step_hd .step_no"
          ); // select the element
          elementClassName3 = await element3.evaluate((el) => el.className);
          passFlag = 1;
        } catch (e) {
          console.log("not found application.step3 in step3");
        }
        if (passFlag === 1) {
          break;
        }
      }
      await delay(3000);

      let isAccountPage = true;

      try {
        await pages[index].waitForSelector('input[name="ACCOUNTNO"]');
      } catch (e) {
        isAccountPage = false;
      }

      if (elementClassName3 === "step_no") {
        await onStep3(index, data);
        await onStep4(index, data);
        await onStep5(index, data);
        break;
      }

      // if (isAccountPage == true) {
      //   await onTypeAccountNo(index, data[11]);
      //   await onTypePin(index, data[12]);
      //   await onClickTnc(index);
      //   break;
      // }
      // carIndex++;
      // if (dataObject.length !== carIndex) {
      //   console.log('inputing next car info')
      //   await goToStep3(index, carIndex, dataObject)
      // } else {
      //   console.log('end of cars')
      //   return;
      // }
    } else if(elementInnerHTML === "Step 1"){
      console.log('getting errormsg')
      //step1 error
      let errormsg = 'no error';
      try{
        errormsg = await pages[index].evaluate(() => {
        let scripts = document.querySelectorAll('#errorMessage .errormsg');
        let result = '';
        scripts.forEach(script => {
          result += script.innerHTML;
        })
        return result;
      })}catch{}

      console.log(errormsg)
      carIndex++;
        if (dataObject.length !== carIndex) {
          console.log('inputing next car info')
        } else {
          console.log('end of cars')
          return
        }
    }
  }
};

const onStep3 = async (index, data) => {
  console.log("bot enter step3");

  const elementHandle = ".contentpage .contenttable .contentRow2:nth-child(4) .display_field_bold.col-50-right";
  success_stories[index] = {};
  success_stories[index]['engine_type'] = await pages[index].$eval(elementHandle, (element) => {
    return element.innerHTML
  });

  await onTypeApplicantName(index, data[5]);
  await onTypeAddressFlatRoom(index, data[6]);
  await onTypeAddressFloor(index, data[7]);
  await onTypeAddressBlock(index, data[8]);
  await onTypeAddressBldgEstate(index, data[9]);
  await onTypeAddressStreet(index, data[10]);
  await onSelectAddressArea(index, data[11]);
  await onSelectAddressDistrict(index, data[12]);
  await onTypeTelNo(index, data[13]);
  await onTypeApplicantEmailAddr(index, data[14]);
  await onClickBtn(index);
};
const onTypeApplicantName = async (index, applicantNameEng) => {
  //applicantNameEng
  try {
    await pages[index].evaluate(() => {
      document.querySelector("#applicantNameEng").value = "";
    });
    const elementHandle = await pages[index].waitForSelector(
      "#applicantNameEng"
    );
    await elementHandle.type(applicantNameEng);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #applicantNameEng");
  }
};
const onTypeAddressFlatRoom = async (index, addressFlatRoom) => {
  try {
    const elementHandle = await pages[index].waitForSelector(
      "#addressFlatRoom"
    );
    await elementHandle.type(addressFlatRoom);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #addressFlatRoom");
  }
};
const onTypeAddressFloor = async (index, addressFloor) => {
  try {
    const elementHandle = await pages[index].waitForSelector("#addressFloor");
    await elementHandle.type(addressFloor);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #addressFloor");
  }
};
const onTypeAddressBlock = async (index, addressBlock) => {
  try {
    const elementHandle = await pages[index].waitForSelector("#addressBlock");
    await elementHandle.type(addressBlock);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #addressBlock");
  }
};
const onTypeAddressBldgEstate = async (index, addressBldgEstate) => {
  try {
    const elementHandle = await pages[index].waitForSelector(
      "#addressBldgEstate"
    );
    await elementHandle.type(addressBldgEstate);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #addressBldgEstate");
  }
};
const onTypeAddressStreet = async (index, addressStreet) => {
  try {
    const elementHandle = await pages[index].waitForSelector("#addressStreet");
    await elementHandle.type(addressStreet);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #addressStreet");
  }
};

const onSelectAddressArea = async (index, addressArea) => {
  try {
    const alias_area = addressArea.trim().toUpperCase();

    // console.log("Area =>", newArea);
    const areaSel = "#addressArea";
    console.log(`Waiting for Area ${alias_area} Selector...`);
    await pages[index].waitForSelector(areaSel);

    const optionValue = await pages[index].$$eval(
      "#addressArea option",
      (opts, alias_area) =>
        (opts.find((opt) => opt.text.trim().toUpperCase() === alias_area) || {})
          .value,
      alias_area
    );

    if (!optionValue) console.log("Option not avaliable!");
    else {
      await pages[index].select(areaSel, optionValue);
      // await onSelectAddressDistrict(index, data[8]);
    }
  } catch (e) {
    console.log(
      "Error happened when addressArea enter. You can try on hand!",
      e
    );
  }
};
const onSelectAddressDistrict = async (index, addressDistrict) => {
  console.log("District => ", addressDistrict);
  // await pages[index].waitForTimeout(12 * 60 * 1000);
  try {
    const areaDistricts = addressDistrict.trim().toUpperCase();
    const districtSel = "#addressDistrict";

    console.log("District =>", areaDistricts);
    console.log(`Waiting for District${areaDistricts} Selector...`);

    await pages[index].waitForSelector(districtSel);

    const optionValue = await pages[index].$$eval(
      "#addressDistrict option",
      (opts, areaDistricts) =>
        (
          opts.find((opt) => opt.text.trim().toUpperCase() === areaDistricts) ||
          {}
        ).value,
      areaDistricts
    );
    if (!optionValue) console.log("Option not avaliable!");
    else await pages[index].select(districtSel, optionValue);
  } catch (error) {
    console.log(
      "Error happened when addressDistrict enter. You can try on hand!",
      error
    );
  }
};
const onTypeTelNo = async (index, telNo) => {
  try {
    const elementhandle = await pages[index].waitForSelector("#telNo");
    await elementhandle.type(telNo);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #telNo");
  }
};
const onTypeApplicantEmailAddr = async (index, applicantEmailAddr) => {
  try {
    const elementHandle = await pages[index].waitForSelector(
      "#applicantEmailAddr"
    );
    await elementHandle.type(applicantEmailAddr);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #applicantEmailAddr");
  }
};
const onClickBtn = async (index) => {
  // await pages[i].waitForTimeout(200)
  await pages[index].click(".continueBtn").catch(
    async () =>
      await pages[index].click(".continueBtn_hov").catch((e) => {
        console.error("Please click continue button", e);
      })
  );
};

const onStep4 = async (index, data) => {
  try {
    const elementHandle = await pages[index].waitForSelector(
      "#declarationFlag"
    );
    await elementHandle.click();
  } catch (err) {
    console.log("Don't Find, bot is trying to find #declarationFlag");
  }
  // await pages[index].waitForTimeout(200)
  const elementHandle = ".continueBtn";
  await pages[index]
    .waitForSelector(elementHandle)
    .then(() =>
      Promise.all([
        pages[index].click(elementHandle),
        pages[index].waitForNavigation().catch(() => { }),
      ])
    )
    .catch(
      async () =>
        await pages[index].click(".continueBtn_hov").catch((e) => {
          console.error("Please click continue button", e);
        })
    );
};
const onStep5 = async (index, data) => {
  try {
    const elementHandle = ".contenttable .contentRow:nth-child(4)";

    let appRefNumber = await pages[index].$eval(elementHandle, (element) => {
      return element.innerHTML
    });

    let regex = /&(nbsp|amp|quot|lt|gt);/g;

    success_stories[index]['app_ref_number'] = appRefNumber.split(':')[1].replace(regex, " ");

    success_stories[index]['registration_mark'] = data[4];
    console.log(success_stories[index]['app_ref_number'])

    json2csvParser = new Parser({ header: false });
    let csv = json2csvParser.parse(success_stories[index]);
    lock.writeLock(function (release) {
      // do stuff
      fs.appendFile(fileName, '\r\n' + csv, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      release();
    });

  } catch (err) {
    console.log("Don't Find, bot is trying to find #commitform");
  }


  // while (true) {
  //   let passFlag = 0;
  //   try {
  //     await pages[index].evaluate(() => {
  //       let test = document.querySelector(
  //         ".contenttable>.row>.tableLayout:last-child>.rightText>label:nth-child(3)>input"
  //       );
  //       test.click();
  //     });
  //     passFlag = 1;
  //   } catch (e) {
  //     console.log("not found pps in payment1 page : ", e);
  //   }
  //   if (passFlag === 1) {
  //     break;
  //   }
  // }
  // // await pages[index].waitForTimeout(200)

  // const elementHandle = ".submitBtn";
  // await pages[index]
  //   .waitForSelector(elementHandle)
  //   .then((x) =>
  //     Promise.all([pages[index].waitForNavigation().catch(() => { }), x.click()])
  //   )
  //   .catch(
  //     async () =>
  //       await pages[index].click(".submitBtn_hover").catch((e) => {
  //         console.error("Please click continue button", e);
  //       })
  //   );
  // await pages[index].click(elementHandle);
  // await pages[index].click(elementHandle);
};

const onTypeAccountNo = async (index, accountNo) => {
  try {
    const elementHandle = await pages[index].waitForSelector(
      'input[name="ACCOUNTNO"]'
    );
    await elementHandle.type(accountNo);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #ACCOUNTNO");
  }
};
const onTypePin = async (index, pin) => {
  try {
    const elementHandle = await pages[index].waitForSelector(
      'input[name="PIN"]'
    );
    elementHandle.type(pin);
  } catch (err) {
    console.log("Don't Find, bot is trying to find #PIN");
  }
};

const getSolutions = async () => {
  pages.forEach(async (_, index) => {
    let taskSolution = await reCaptcha();
    task_solutions[index] = taskSolution;
  });
};

const scraperBot = async (index, carIndex, dataObject) => {
  await openBrowser(index);
  await waitStartTime(index, carIndex);
  await getSolutions();
  await goToMain(index);
  await goToStep3(index, carIndex, dataObject);
};

const startPerBot = async (i, data) => {
  // start per bot
  for (let j = 0; j < multipleBotCount; j++) {
    scraperBot(i * multipleBotCount + j, i, data);
  }
};

const scraper = async () => {
  const csv = require("csvtojson/v2");
  carInfoCsv = await csv().fromFile("../csv/applications2.csv");
  let index = 0;
  startPerBot(index, carInfoCsv);
};

const startBotFunction = async () => {

  let moment = new Date();
  fileName = 'file-' + moment.getMilliseconds() + '.csv';
  await fs.writeFile(fileName, fields.join(','), function (err) {
    if (err) throw err;
    console.log('file saved');
  });



  try {

    console.log(" bot started working ");
    scraper();
  } catch (err) {
    console.log("bot crashed, heres why ");
    console.log(err);
  }



};

startBotFunction();
