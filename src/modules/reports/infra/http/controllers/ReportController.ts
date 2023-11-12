import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import showReportUseCase from '@modules/reports/useCases/ShowReportUseCase';
import { container } from 'tsyringe';

export default class ReportController {
  public async index(request: Request, response: Response) {

    const property_id = request.params.property_id;

    const showReport = container.resolve(showReportUseCase);

    const reportPdf = await showReport.execute(property_id);

    return response.status(StatusCodes.OK).json({ reportPdf });

  }
}
