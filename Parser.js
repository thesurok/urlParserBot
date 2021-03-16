const puppeteer = require('puppeteer');
const moment = require('moment');

module.exports = class ClubhouseParser {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async init() {
        this.browser = await puppeteer.launch({
            'args': [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
    }

    async parseUrls(input) {
        const urls = input.split(/(?:,|\n| )+/);
        let result = '';
        for (const url of urls) {
            const parsedUrl = await this.parseUrl(url);
            result = result.concat(parsedUrl);
        }
        return result;
    }

    async parseUrl(url) {
        this.page = await this.browser.newPage();
        await this.page.goto(url);
        const time = await this.getFormattedTime();
        const title = await this.getTitleName();
        const description = await this.getDescription();
        const descriptionSubtitle = description.length ? 'Из описания комнаты:' : 'Комната без описания.'

        const formattedString = `➖${time}\n${title}\n${url}\n${descriptionSubtitle}\n${description}\n`;
        await this.page.close();
        return formattedString;
    }

    async getNodeTextFromXPath(xpath) {
        const [node] = await this.page.$x(xpath);
        const rawText = await node.getProperty("textContent");
        const parsedText = await rawText.jsonValue();
        return parsedText;
    }

    async getNodeTextFromQuerySelector(selector) {
        const node = await this.page.$(selector);
        const rawText = await node.getProperty("textContent");
        const parsedText = await rawText.jsonValue();
        return parsedText;
    }

    async getTitleName() {
        const titleName = await this.getNodeTextFromXPath('//*[@id="identity_container"]/a/span/div/div/div[2]');
        const boldTitleName = `<b>«${titleName}»</b>`;
        return boldTitleName;
    }

    async getFormattedTime() {
        let unformattedDate = await this.getNodeTextFromXPath('//*[@id="identity_container"]/a/span/div/div/div[1]/div[2]');
        let month, date, time, ampm, format;
        //parse month
        let i = 0;
        while (unformattedDate.charAt(i) !== ' ') i++;
        month = unformattedDate.substring(0, i).trim();
        //parse date
        unformattedDate = unformattedDate.substring(i).trim();
        i = 0;
        while (unformattedDate.charAt(i) !== ',') i++;
        date = unformattedDate.substring(0, i).trim();
        unformattedDate = unformattedDate.substring(i + 2).trim();
        //parse time
        i = 0;
        while (unformattedDate.charAt(i) !== ' ') i++;
        time = unformattedDate.substring(0, i).trim();
        if (time.length === 1) time = `0${time}:00`;
        if (time.length === 2) time = `${time}:00`;
        if (time.length === 4) time = `0${time}`;
        unformattedDate = unformattedDate.substring(i).trim();
        //parse ampm
        i = 0;
        while (unformattedDate.charAt(i) !== ' ') i++;
        ampm = unformattedDate.substring(0, i).trim();
        unformattedDate = unformattedDate.substring(i).trim();
        //parse format
        format = unformattedDate.replace(/\(|\)/gm, '').trim();

        const formattedDate = `${month} ${date} ${time} ${ampm} ${format}`
        const formattedTime = moment(formattedDate).utcOffset(2).format('HH:mm');
        return formattedTime;
    }


    async getDescription() {
        const unformattedDescription = await this.getNodeTextFromQuerySelector('div.text-sm.font-thin.mt-2');
        const unusedPart = await this.getNodeTextFromQuerySelector('div.text-sm.font-thin.mt-2 em');

        const slicedDescription = unformattedDescription.replace(unusedPart, '').trim();
        const formattedDescription = `«${slicedDescription.substring(1).trim()}»\n`;

        return slicedDescription.length > 0 ? formattedDescription : slicedDescription;
    }
}