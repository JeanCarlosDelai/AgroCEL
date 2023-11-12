import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';
import fs from 'fs';
import path from 'path';
import util from 'util';
import puppeteer from 'puppeteer';
import { IReportRepository } from '../domain/repositories/IReportRepository';
import handlebars from 'handlebars';
import moment from 'moment';

@injectable()
class showReportUseCase {
  constructor(
    @inject('ReportsRepository')
    private reportsRepository: IReportRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(
    property_Id: string,
  ): Promise<any | null> {
    const result = await this.reportsRepository.findReport(
      property_Id,
    );

    if (!result) {
      throw new CustomAPIError.BadRequestError('Report not found.');
    }

    const { property, areas } = result;

    if (!property) {
      throw new CustomAPIError.BadRequestError('Property not exist.');
    }

    if (!areas) {
      throw new CustomAPIError.BadRequestError('Area not exist.');
    }

    // console.log(property);
    console.log(areas[1].otherActivities);



    const readFileAsync = util.promisify(fs.readFile);

    const filePath = path.join(__dirname, 'report.hbs');
    const htmlTemplate = await readFileAsync(filePath, 'utf-8');

    handlebars.registerHelper('formatDate', function (date) {
      const formattedDate = moment(date).format('DD/MM/YYYY');
      return formattedDate;
    });

    const renderedHtml = handlebars.compile(htmlTemplate)({ property, areas });

    // Gera o PDF a partir do HTML usando puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
    });

    const page = await browser.newPage();

    await page.setContent(renderedHtml);

    const pdfBuffer = await page.pdf();

    await browser.close();

    // Converter o PDF para base64
    const reportPdf = pdfBuffer.toString('base64');

    return reportPdf;
  }

}

export default showReportUseCase;
