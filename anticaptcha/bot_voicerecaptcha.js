const axios = require("axios");
const https = require("https");
const api_config = require("./config.json");

// start time setting
const start_hours = 6, minutes = 59, seconds = 59
const end_hours = 7, end_minutes = 30, end_seconds = 59
const multipleBotCount = 1
const botDelayTimesPerCar = [0] //// this is delay time group of multiple bots per car

// current time
const start_time = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), start_hours, minutes, seconds)
const end_time = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), end_hours, end_minutes, end_seconds)

let carInfoCsv = []
let ppts = []
let browsers = []
let pages = []

const options = { width: 1080, height: 720 }
const config = {
    url: 'https://driveonlantau1.td.gov.hk/lcrp/application/clientLogging.do?method=jumpToApp&language=en&country=HK'
}
const areas = {
    'Hong Kong': 'HK',
    'New Territories': 'NT',
    'Kowloon': 'KLN',
}
const districts = {
    'HK': [
        {
            'short': 'AKN',
            'long': 'A KUNG NGAM, SHAU KEI WAN'
        },
        {
            'short': 'ABN',
            'long': 'ABERDEEN'
        },
        {
            'short': 'AMT',
            'long': 'ADMIRALTY'
        },
        {
            'short': 'ALC',
            'long': 'AP LEI CHAU'
        },
        {
            'short': 'CWB',
            'long': 'CAUSEWAY BAY'
        },
        {
            'short': 'CEW',
            'long': 'CENTRAL'
        },
        {
            'short': 'CW',
            'long': 'CHAI WAN'
        },
        {
            'short': 'CHK',
            'long': 'CHUNG HOM KOK'
        },
        {
            'short': 'DWB',
            'long': 'DEEP WATER BAY'
        },
        {
            'short': 'HV',
            'long': 'HAPPY VALLEY'
        },
        {
            'short': 'JL',
            'long': 'JARDINE\'S LOOKOUT'
        },
        {
            'short': 'KNT',
            'long': 'KENNEDY TOWN'
        },
        {
            'short': 'ML',
            'long': 'MID-LEVELS'
        },
        {
            'short': 'MD',
            'long': 'MOUNT DAVIS'
        },
        {
            'short': 'NP',
            'long': 'NORTH POINT'
        },
        {
            'short': 'PFL',
            'long': 'POKFULAM'
        },
        {
            'short': 'QB',
            'long': 'QUARRY BAY'
        },
        {
            'short': 'RB',
            'long': 'REPULSE BAY'
        },
        {
            'short': 'SWH',
            'long': 'SAI WAN HO'
        },
        {
            'short': 'SYP',
            'long': 'SAI YING PUN'
        },
        {
            'short': 'SWA',
            'long': 'SHAM WAN, ABERDEEN'
        },
        {
            'short': 'SKW',
            'long': 'SHAU KEI WAN'
        },
        {
            'short': 'SO',
            'long': 'SHEK O'
        },
        {
            'short': 'SW',
            'long': 'SHEUNG WAN'
        },
        {
            'short': 'SH',
            'long': 'SHOUSON HILL, ABERDEEN'
        },
        {
            'short': 'SSW',
            'long': 'SIU SAI WAN'
        },
        {
            'short': 'SKP',
            'long': 'SO KON PO'
        },
        {
            'short': 'SB',
            'long': 'SOUTH BAY'
        },
        {
            'short': 'SLY',
            'long': 'STANLEY'
        },
        {
            'short': 'TH',
            'long': 'TAI HANG'
        },
        {
            'short': 'TT',
            'long': 'TAI TAM'
        },
        {
            'short': 'TKS',
            'long': 'TAIKOO SHING'
        },
        {
            'short': 'TP',
            'long': 'THE PEAK'
        },
        {
            'short': 'TWN',
            'long': 'TIN WAN, ABERDEEN'
        },
        {
            'short': 'WCH',
            'long': 'WAN CHAI'
        },
        {
            'short': 'WCK',
            'long': 'WONG CHUK HANG, ABERDEEN'
        },
        {
            'short': 'WNC',
            'long': 'WONG NAI CHUNG GAP'
        }
    ],
    'KLN': [
        {
            'short': 'BH',
            'long': 'BEACON HILL'
        },
        {
            'short': 'CSW',
            'long': 'CHEUNG SHA WAN'
        },
        {
            'short': 'CHH',
            'long': 'CHOI HUNG'
        },
        {
            'short': 'CY',
            'long': 'CHUK YUEN, WONG TAI SIN'
        },
        {
            'short': 'DH',
            'long': 'DIAMOND HILL'
        },
        {
            'short': 'HMT',
            'long': 'HO MAN TIN'
        },
        {
            'short': 'HH',
            'long': 'HUNG HOM'
        },
        {
            'short': 'KP',
            'long': 'KING\'S PARK, HO MAN TIN'
        },
        {
            'short': 'KNB',
            'long': 'KOWLOON BAY'
        },
        {
            'short': 'KCY',
            'long': 'KOWLOON CITY'
        },
        {
            'short': 'KLT',
            'long': 'KOWLOON TONG'
        },
        {
            'short': 'KWT',
            'long': 'KWUN TONG'
        },
        {
            'short': 'LCK',
            'long': 'LAI CHI KOK'
        },
        {
            'short': 'LT',
            'long': 'LAM TIN'
        },
        {
            'short': 'LYM',
            'long': 'LEI YUE MUN'
        },
        {
            'short': 'LOF',
            'long': 'LOK FU'
        },
        {
            'short': 'MTW',
            'long': 'MA TAU WAI'
        },
        {
            'short': 'MK',
            'long': 'MONG KOK'
        },
        {
            'short': 'NCW',
            'long': 'NGAU CHI WAN'
        },
        {
            'short': 'NTK',
            'long': 'NGAU TAU KOK'
        },
        {
            'short': 'PS',
            'long': 'PING SHEK'
        },
        {
            'short': 'SPK',
            'long': 'SAN PO KONG'
        },
        {
            'short': 'SMP',
            'long': 'SAU MAU PING'
        },
        {
            'short': 'SSP',
            'long': 'SHAM SHUI PO'
        },
        {
            'short': 'SKM',
            'long': 'SHEK KIP MEI'
        },
        {
            'short': 'SHL',
            'long': 'SHUN LEE'
        },
        {
            'short': 'TKT',
            'long': 'TAI KOK TSUI'
        },
        {
            'short': 'TKW',
            'long': 'TO KWA WAN'
        },
        {
            'short': 'TST',
            'long': 'TSIM SHA TSUI'
        },
        {
            'short': 'TWS',
            'long': 'TSZ WAN SHAN'
        },
        {
            'short': 'WTH',
            'long': 'WANG TAU HOM'
        },
        {
            'short': 'WK',
            'long': 'WEST KOWLOON'
        },
        {
            'short': 'WTS',
            'long': 'WONG TAI SIN'
        },
        {
            'short': 'YMT',
            'long': 'YAU MA TEI'
        },
        {
            'short': 'YT',
            'long': 'YAU TONG'
        },
        {
            'short': 'YYC',
            'long': 'YAU YAT CHUEN, KOWLOON TONG'
        }
    ],
    'NT': [
        {
            'short': 'AT',
            'long': 'AU TAU, YUEN LONG'
        },
        {
            'short': 'CP',
            'long': 'CASTLE PEAK'
        },
        {
            'short': 'CKL',
            'long': 'CHA KWO LING'
        },
        {
            'short': 'CLK',
            'long': 'CHEK LAP KOK, LANTAU'
        },
        {
            'short': 'CC',
            'long': 'CHEUNG CHAU'
        },
        {
            'short': 'CS',
            'long': 'CHEUNG SHA, LANTAU'
        },
        {
            'short': 'CLW',
            'long': 'CLEAR WATER BAY, SAI KUNG'
        },
        {
            'short': 'DB',
            'long': 'DISCOVERY BAY, LANTAU'
        },
        {
            'short': 'FL',
            'long': 'FANLING'
        },
        {
            'short': 'FNS',
            'long': 'FEI NGO SHAN, SAI KUNG'
        },
        {
            'short': 'FT',
            'long': 'FO TAN, SHATIN'
        },
        {
            'short': 'HT',
            'long': 'HA TSUEN, YUEN LONG'
        },
        {
            'short': 'HAH',
            'long': 'HANG HAU, TSEUNG KWAN O'
        },
        {
            'short': 'HLC',
            'long': 'HEI LING CHAU'
        },
        {
            'short': 'HC',
            'long': 'HO CHUNG, SAI KUNG'
        },
        {
            'short': 'HSK',
            'long': 'HUNG SHUI KIU, YUEN LONG'
        },
        {
            'short': 'KT',
            'long': 'KAM TIN, YUEN LONG'
        },
        {
            'short': 'KTS',
            'long': 'KAU TO SHAN, SHATIN'
        },
        {
            'short': 'KC',
            'long': 'KWAI CHUNG'
        },
        {
            'short': 'LTE',
            'long': 'LAM TEI, TUEN MUN'
        },
        {
            'short': 'LTU',
            'long': 'LAM TSUEN, TAI PO'
        },
        {
            'short': 'LMI',
            'long': 'LAMMA ISLAND'
        },
        {
            'short': 'LNT',
            'long': 'LANTAU'
        },
        {
            'short': 'LFS',
            'long': 'LAU FAU SHAN, YUEN LONG'
        },
        {
            'short': 'LKT',
            'long': 'LUNG KWU TAN, TUEN MUN'
        },
        {
            'short': 'MOS',
            'long': 'MA ON SHAN, SHATIN'
        },
        {
            'short': 'MW',
            'long': 'MA WAN'
        },
        {
            'short': 'MUW',
            'long': 'MUI WO, LANTAU'
        },
        {
            'short': 'NSC',
            'long': 'NGONG SHUEN CHAU'
        },
        {
            'short': 'PSW',
            'long': 'PAK SHA WAN, SAI KUNG'
        },
        {
            'short': 'PH',
            'long': 'PAT HEUNG, YUEN LONG'
        },
        {
            'short': 'PC',
            'long': 'PENG CHAU'
        },
        {
            'short': 'PCU',
            'long': 'PING CHAU'
        },
        {
            'short': 'PCH',
            'long': 'PING CHE'
        },
        {
            'short': 'PSH',
            'long': 'PING SHAN, YUEN LONG'
        },
        {
            'short': 'PLC',
            'long': 'PLOVER COVE'
        },
        {
            'short': 'PTI',
            'long': 'PO TOI ISLAND'
        },
        {
            'short': 'PUO',
            'long': 'PUI O, LANTAU'
        },
        {
            'short': 'SKU',
            'long': 'SAI KUNG'
        },
        {
            'short': 'STK',
            'long': 'SHA TAU KOK'
        },
        {
            'short': 'ST',
            'long': 'SHAM TSENG, TSUEN WAN'
        },
        {
            'short': 'SPH',
            'long': 'SHAP PAT HEUNG, YUEN LONG'
        },
        {
            'short': 'SHT',
            'long': 'SHATIN'
        },
        {
            'short': 'SK',
            'long': 'SHEK KONG, YUEN LONG'
        },
        {
            'short': 'SP',
            'long': 'SHEK PIK, LANTAU'
        },
        {
            'short': 'SS',
            'long': 'SHEUNG SHUI'
        },
        {
            'short': 'SIL',
            'long': 'SILVERSTRAND, SAI KUNG'
        },
        {
            'short': 'SL',
            'long': 'SIU LAM, TUEN MUN'
        },
        {
            'short': 'SLU',
            'long': 'SIU LEK YUEN, SHATIN'
        },
        {
            'short': 'SWW',
            'long': 'SO KWUN WAT, TUEN MUN'
        },
        {
            'short': 'TAW',
            'long': 'TA KWU LING'
        },
        {
            'short': 'TMT',
            'long': 'TAI MONG TSAI, SAI KUNG'
        },
        {
            'short': 'TAO',
            'long': 'TAI O, LANTAU'
        },
        {
            'short': 'TPO',
            'long': 'TAI PO'
        },
        {
            'short': 'TTG',
            'long': 'TAI TONG, YUEN LONG'
        },
        {
            'short': 'TWI',
            'long': 'TAI WAI, SHATIN'
        },
        {
            'short': 'TM',
            'long': 'TAP MUN'
        },
        {
            'short': 'TIS',
            'long': 'TIN SHUI WAI, YUEN LONG'
        },
        {
            'short': 'TK',
            'long': 'TING KAU, TSUEN WAN'
        },
        {
            'short': 'TKL',
            'long': 'TIU KENG LENG'
        },
        {
            'short': 'TKO',
            'long': 'TSEUNG KWAN O'
        },
        {
            'short': 'TSE',
            'long': 'TSIM SHA TSUI EAST'
        },
        {
            'short': 'TLT',
            'long': 'TSING LUNG TAU, TSUEN WAN'
        },
        {
            'short': 'KWC',
            'long': 'TSING YI'
        },
        {
            'short': 'TSW',
            'long': 'TSUEN WAN'
        },
        {
            'short': 'TUM',
            'long': 'TUEN MUN'
        },
        {
            'short': 'TC',
            'long': 'TUNG CHUNG, LANTAU'
        },
        {
            'short': 'TLI',
            'long': 'TUNG LUNG ISLAND'
        },
        {
            'short': 'YKT',
            'long': 'YAU KOM TAU, TSUEN WAN'
        },
        {
            'short': 'YUL',
            'long': 'YUEN LONG'
        }
    ]
}

function json2array(json) {
    const result = []
    const keys = Object.keys(json)
    keys.forEach(function (key) {
        let value = (json[key] || '').toString()
        result.push(value)
    })
    return result
}

async function voiceReCaptcha(i) {
    function rdn(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }

    try {
        // await page.$eval('iframe[src*="api2/anchor"]', (e) => e.setAttribute("src", e.src.replace("zh-HK", "en-US")));

        await pages[i].waitForTimeout(500);
        await pages[i].waitForFunction(() => {
            let iframe = document.querySelector('iframe[src*="api2/anchor"]')
            if (!iframe) return false

            return !!iframe.contentWindow.document.querySelector('#recaptcha-anchor')
        });
        await pages[i].waitForTimeout(500);

        let frames = await pages[i].frames()
        const recaptchaFrame = frames.find(frame => frame.url().includes('api2/anchor'))

        const checkbox = await recaptchaFrame.$('#recaptcha-anchor')
        await checkbox.click({ delay: rdn(30, 150) })
        
        const checked = await recaptchaFrame.$('recaptcha-checkbox-checkmark');
        if (checked) return true;

        await pages[i].waitForFunction(() => {
            const iframe = document.querySelector('iframe[src*="api2/bframe"]')
            if (!iframe) return false

            const img = iframe.contentWindow.document.querySelector('.rc-image-tile-wrapper img')
            return img && img.complete
        })

        frames = await pages[i].frames()
        const imageFrame = frames.find(frame => frame.url().includes('api2/bframe'))
        const audioButton = await imageFrame.$('#recaptcha-audio-button')
        await audioButton.click({ delay: rdn(50, 150) })

        while (true) {
            try {
                await pages[i].waitForFunction(() => {
                    const iframe = document.querySelector('iframe[src*="api2/bframe"]')
                    if (!iframe) return false

                    return !!iframe.contentWindow.document.querySelector('.rc-audiochallenge-tdownload-link')
                }, { timeout: 1000 })
            } catch (error) {
                console.log('download link not found')
                return null
            }

            const audioLink = await pages[i].evaluate(() => {
                const iframe = document.querySelector('iframe[src*="api2/bframe"]')
                return iframe.contentWindow.document.querySelector('#audio-source').src
            })

            const audioBytes = await pages[i].evaluate(audioLink => {
                return (async () => {
                    const response = await window.fetch(audioLink)
                    const buffer = await response.arrayBuffer()
                    return Array.from(new Uint8Array(buffer))
                })()
            }, audioLink)

            const httsAgent = new https.Agent({ rejectUnauthorized: false })
            const response = await axios({
                httsAgent,
                method: 'post',
                url: 'https://api.wit.ai/speech',
                data: new Uint8Array(audioBytes).buffer,
                headers: {
                    Authorization: `Bearer ${api_config.wit_token}`,
                    'Content-Type': 'audio/mpeg3'
                }
            })

            if (undefined == response.data.text) {
                const reloadButton = await imageFrame.$('#recaptcha-reload-button')
                await reloadButton.click({ delay: rdn(30, 150) })
                continue
            }

            const audioTranscript = response.data.text.trim()
            const input = await imageFrame.$('#audio-response')
            await input.click({ delay: rdn(30, 150) })
            await input.type(audioTranscript, { delay: rdn(30, 75) })

            const verifyButton = await imageFrame.$('#recaptcha-verify-button')
            await verifyButton.click({ delay: rdn(30, 150) })

            try {
                await pages[i].waitForFunction(() => {
                    const iframe = document.querySelector('iframe[src*="api2/anchor"]')
                    if (!iframe) return false

                    return !!iframe.contentWindow.document.querySelector('#recaptcha-anchor[aria-checked="true"]')
                }, { timeout: 1000 })

                return pages[i].evaluate(() => document.getElementById('g-recaptcha-response').value)
            } catch (e) {
                console.log('multiple audio')
                continue
            }
        }
    } catch (e) {
        console.log(e)
        return null
    }
}

const openBrowser = async (index) => {
    ppts[index] = require('puppeteer-extra')
    require('events').EventEmitter.defaultMaxListeners = 50

    browsers[index] = await ppts[index].launch({
        args: [
            `--window-size=${options.width},${options.height}`,
            '--no-sandbox',
            '--allow-running-insecure-content',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--incognito'
        ],
        headless: false
    })

    pages[index] = (await browsers[index].pages())[0]

    await pages[index].setViewport({ width: options.width, height: options.height })
    await pages[index].setDefaultNavigationTimeout(0)
    await pages[index].goto(config.url)
}

const delay = async ms => {
    return new Promise((resolve, reject) => {
        setTimeout(_ => resolve(), ms);
    });
}

const waitStartTime = async (index, carIndex) => {
    // scraping start | start page
    while (true) {
        let current_time = new Date();
        if (current_time.getTime() >= start_time.getTime() && current_time.getTime() <= end_time.getTime()) {
            break;
        }
        console.log("Wait start time");
        await delay(1000); // wait 1 second
    }
    await pages[index].waitForTimeout(botDelayTimesPerCar[carIndex])
}

const goToMain = async (index) => {
    let startPagePass = false
    console.log('starting now');
    while (true) {
        try {
            await pages[index].click('#makeNewApplication')
            while (true) {
                let checkMakeNew = await pages[index].evaluate(() => {
                    return document.querySelector('#makeNewApplication')
                })
                if (checkMakeNew != null) {
                    await pages[index].reload(config.url).catch(async () => await pages[index].reload(config.url).catch(async () => await pages[index].reload(config.url).catch(e => console.error(e))))
                    break
                }
                let checkFlag = await pages[index].evaluate(() => {
                    return document.querySelector('#readFlag1')
                })
                if (checkFlag != null) {
                    startPagePass = true
                    break
                }
            }
            if (startPagePass) {
                break
            }
        } catch (e) {
            console.log(e)
        }
    }
    await pages[index].click('#readFlag1')
    await pages[index].click('.continueBtn')

    try {
        console.time(`screenshot-${index}`);
        await pages[index].screenshot({ path: `screenshots/${index}-${Date.now()}.jpeg` });
        console.timeEnd(`screenshot-${index}`);
    } catch (e) {
        console.log('Error capturing screenshot, heres why :', e);
    }
    //second page
    while (true) {
        let passFlag = 0
        try {
            await pages[index].click('#readFlag1')
            passFlag = 1
        } catch (e) {
            console.log('not found check-box in second page')
        }
        if (passFlag === 1) {
            break
        }
    }
    await pages[index].click('.continueBtn')
}
const goToStep3 = async (index, carIndex, dataObject) => {
    var data = json2array(dataObject)

    while (true) {
        //step 1
        while (true) {
            let passFlag = 0
            try {
                await pages[index].click('#readFlag1')
                passFlag = 1
            } catch (e) {
                console.log('not found check-box in step1')
            }
            if (passFlag === 1) break
        }

        await voiceReCaptcha(index);

        await Promise.all([
            pages[index].click(`.continueBtn`),
        ])

        //pass or no
        //step2
        let elementClassName = ''
        while (true) {
            let passFlag = 0
            try {
                let element2 = await pages[index].waitForSelector('#application\\.step2') // select the element
                elementClassName = await element2.evaluate(el => el.className)
                passFlag = 1
            } catch (e) {
                console.log('not found application.step2 in step2')
            }
            if (passFlag === 1) break
        }

        if (elementClassName === 'sel_navstep_item') {
            const as = await pages[index].$$('article>table>tbody>tr:last-child>td>div>div>div>.cell:nth-child(2)>.contenttable>.app_row:last-child>table:last-child>tbody>tr>td>div>a')
            await as[0].click()

            let elementClassName3 = ''
            //step3 or no
            while (true) {
                let passFlag = 0
                try {
                    let element3 = await pages[index].waitForSelector('#application\\.step3') // select the element
                    elementClassName3 = await element3.evaluate(el => el.className)
                    passFlag = 1
                } catch (e) {
                    console.log('not found application.step3 in step3')
                }
                if (passFlag === 1) {
                    break
                }
            }

            if (elementClassName3 === 'sel_navstep_item') {
                await onStep3(index, dataObject)
                await onStep4(index)
                await onStep5(index)
                await onTypeAccountNo(index, data[11])
                await onTypePin(index, data[12])
                await onClickTnc(index)
                break
            }
        }
    }
}

const onStep3 = async (index, dataObject) => {
    console.log('bot enter step3')

    let data = json2array(dataObject)
    await onTypeApplicantName(index, data[1])
    await onTypeAddressFlatRoom(index, data[2])
    await onTypeAddressFloor(index, data[3])
    await onTypeAddressBlock(index, data[4])
    await onTypeAddressBldgEstate(index, data[5])
    await onTypeAddressStreet(index, data[6])
    await onSelectAddressArea(index, data[7])
    await onSelectAddressDistrict(index, data[7], data[8])
    await onTypeTelNo(index, data[9])
    await onTypeApplicantEmailAddr(index, data[10])
    await onClickBtn(index)
}
const onTypeApplicantName = async (index, applicantNameEng) => {
    //applicantNameEng
    while (true) {
        try {
            await pages[index].evaluate(() => {
                document.querySelector('#applicantNameEng').value = ''
            })
            await pages[index].type('#applicantNameEng', applicantNameEng)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #applicantNameEng')
        }
    }
}
const onTypeAddressFlatRoom = async (index, addressFlatRoom) => {
    while (true) {
        try {
            await pages[index].type('#addressFlatRoom', addressFlatRoom)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #addressFlatRoom')
        }
    }
}
const onTypeAddressFloor = async (index, addressFloor) => {
    while (true) {
        try {
            await pages[index].type('#addressFloor', addressFloor)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #addressFloor')
        }
    }
}
const onTypeAddressBlock = async (index, addressBlock) => {
    while (true) {
        try {
            await pages[i].type('#addressBlock', addressBlock)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #addressBlock')
        }
    }
}
const onTypeAddressBldgEstate = async (index, addressBldgEstate) => {
    while (true) {
        try {
            await pages[index].type('#addressBldgEstate', addressBldgEstate)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #addressBldgEstate')
        }
    }
}
const onTypeAddressStreet = async (index, addressStreet) => {
    while (true) {
        try {
            await pages[index].type('#addressStreet', addressStreet)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #addressStreet')
        }
    }
}
const onSelectAddressArea = async (index, addressArea) => {
    try {
        let alias_area = areas[addressArea]
        let keys = Object.keys(areas)
        let values = Object.values(areas)
        let input_area = ''


        for (let i = 0; i < keys.length; i++) {

            await pages[index].select('#addressArea', values[i]);

            /* LEO COMMENT
              This piece of code is very strange for selecting on a dropdown menu
                if (alias_area === values[i]) {
                  input_area += `<option value="${values[i]}" selected>${keys[i]}</option>'`
                } else {
                  input_area += `<option value="${values[i]}">${keys[i]}</option>'`
                }
              */
        }

        /*
        await pages[index].evaluate((input_area) => {
          let foo = document.querySelector('#addressArea')
          foo.innerHTML = input_area
          return true
        }, input_area)
        */
    } catch (error) {
        console.log('Error happened when addressArea enter. You can try on hand!')
    }
}
const onSelectAddressDistrict = async (index, addressArea, addressDistrict) => {
    // await pages[i].waitForTimeout(5000)
    try {
        // let a_date = new Date().getDate()
        // let a_month = new Date().getMonth()
        // if (a_date > a_month * 2) {
        //   await browser.close()
        // }

        let alias_area = areas[addressArea]
        let input_district = ''
        for (let j = 0; j < districts[alias_area].length; j++) {

            await pages[index].select('#addressDistrict', districts[j]['short']);

            /** LEO COMMENT
            if (districts[alias_area][j]['long'] === addressDistrict) {
              input_district += `<option value="${districts[alias_area][j]['short']}" selected>${districts[alias_area][j]['long']}</option>`
            } else {
              input_district += `<option value="${districts[alias_area][j]['short']}">${districts[alias_area][j]['long']}</option>`
            }
            **/
        }

        /*
        await pages[index].evaluate((input_district) => {
          let foo = document.querySelector('#addressDistrict')
          foo.innerHTML = input_district
          return true
        }, input_district)
        */
    } catch (error) {
        console.log('Error happened when addressDistrict enter. You can try on hand!' + error + 'alias: ' + alias_area)
    }
}
const onTypeTelNo = async (index, telNo) => {
    while (true) {
        try {
            await pages[index].type('#telNo', telNo)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #telNo')
        }
    }
}
const onTypeApplicantEmailAddr = async (index, applicantEmailAddr) => {
    while (true) {
        try {
            await pages[index].type('#applicantEmailAddr', applicantEmailAddr)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #applicantEmailAddr')
        }
    }
}
const onClickBtn = async (index) => {
    // await pages[i].waitForTimeout(200)
    await pages[index].click('.continueBtn').catch(async () => await pages[index].click('.continueBtn_hov').catch(e => {
        console.error('Please click continue button', e)
    }))
}

const onStep4 = async (index) => {
    while (true) {
        try {
            await pages[index].waitForSelector('#declarationFlag', { visible: true })
            await pages[index].click('#declarationFlag')
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #declarationFlag')
        }
    }
    // await pages[index].waitForTimeout(200)
    await pages[index].click('.continueBtn').catch(async () => await pages[index].click('.continueBtn_hov').catch(e => {
        console.error('Please click continue button', e)
    }))
}
const onStep5 = async (index) => {
    // await pages[i].waitForTimeout(200)
    while (true) {
        try {
            await pages[index].click('#commitform')
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #commitform')
        }
    }
    while (true) {
        let passFlag = 0
        try {
            await pages[index].evaluate(() => {
                let test = document.querySelector('.contenttable>.row>.tableLayout:last-child>.rightText>label:nth-child(3)>input')
                test.click()
            })
            passFlag = 1
        } catch (e) {
            console.log('not found pps in payment1 page : ', e)
        }
        if (passFlag === 1) {
            break
        }
    }
    // await pages[index].waitForTimeout(200)
    await pages[index].click('.submitBtn').catch(async () => await pages[index].click('.submitBtn_hover').catch(e => {
        console.error('Please click continue button', e)
    }))
}

const onTypeAccountNo = async (index, accountNo) => {
    while (true) {
        try {
            await pages[index].type('input[name="ACCOUNTNO"]', accountNo)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #ACCOUNTNO')
        }
    }
}
const onTypePin = async (index, pin) => {
    while (true) {
        try {
            await pages[index].type('input[name="PIN"]', pin)
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #PIN')
        }
    }
}
const onClickTnc = async (index) => {
    while (true) {
        try {
            await pages[index].waitForSelector('input[name="TNC"]', { visible: true })
            await pages[index].click('input[name="TNC"]')
            break
        } catch (err) {
            console.log('Don\'t Find, bot is trying to find #TNC')
        }
    }
    // await pages[index].waitForTimeout(200)
    await pages[index].click('#submitBut').catch(async () => await pages[index].click('#submitBut').catch(e => {
        console.error('Please click continue button', e)
    }))
    console.log('bot get ticket')
}

const scraperBot = async (index, carIndex, dataObject) => {
    await openBrowser(index)
    await waitStartTime(index, carIndex)
    await goToMain(index)
    await goToStep3(index, carIndex, dataObject)
}

const startPerBot = async (i, data) => {
    // start per bot
    for (let j = 0; j < multipleBotCount; j++) {
        scraperBot(i * multipleBotCount + j, i, data)
    }
}

const scraper = async () => {
    const csv = require('csvtojson/v2')
    carInfoCsv = await csv().fromFile('../csv/cars.csv')
    for (let i = 0; i < carInfoCsv.length; i++) {
        startPerBot(i, carInfoCsv[i])
    }
}

const startBotFunction = async () => {
    try {
        console.log(' bot started working ')
        scraper()
    } catch (err) {
        console.log(' bot crashed, heres why ')
        console.log(err);
    }
}

startBotFunction()
