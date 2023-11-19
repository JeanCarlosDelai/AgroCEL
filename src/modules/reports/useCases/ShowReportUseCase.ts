import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
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

    const readFileAsync = util.promisify(fs.readFile);

    // Lendo o arquivo SVG
    const svgFilePath = path.join(__dirname, 'logo.svg');
    const svgContent = await readFileAsync(svgFilePath, 'utf-8');

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

    const scale = 0.6;

    const marginConfig = {
      top: '120px',
      bottom: '50px',
      left: '40px',
      right: '40px',
    };

    await page.setContent(renderedHtml);

    const headerTemplate = `<style>#header, #footer { padding: 0 !important; }</style>
    <div style=' font-size: 18px; width:100%; -webkit-print-color-adjust: exact;height:100px; min-height: 69px;overflow: auto;clear: both;border-bottom: 1px solid black;background: #71A151;' >
    <span style="position: relative; top: 14px;"> ${svgContent}</span>
    <h3 style="position: absolute; right: 250px; top: 18px;">Relatório Geral da Propriedade</h3>
    <span style="position: absolute; right: 15px; top: 40px;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
    </div>`;

    const footerTemplate = `<p></p>`;

    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: footerTemplate,
      scale: scale,
      margin: marginConfig,
    });

    await browser.close();

    // Converter o PDF para base64
    const reportPdf = pdfBuffer.toString('base64');

    return reportPdf;
  }

}

export default showReportUseCase;
