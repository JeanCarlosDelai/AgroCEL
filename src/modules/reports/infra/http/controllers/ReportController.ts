import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import showReportUseCase from '@modules/reports/useCases/ShowReportUseCase';
import { container } from 'tsyringe';
import showFieldNotebookReportUseCase from '@modules/reports/useCases/ShowFieldNotebookReportUseCase';

export default class ReportController {
  public async report(request: Request, response: Response) {

    const property_id = request.params.property_id;

    const showReport = container.resolve(showReportUseCase);

    const reportPdf = await showReport.execute(property_id);

    return response.status(StatusCodes.OK).json({ reportPdf });

  }

  public async fieldNotebookReport(request: Request, response: Response) {

    const property_id = request.params.property_id;

    const showReport = container.resolve(showFieldNotebookReportUseCase);

    const reportPdf = await showReport.execute(property_id);

    return response.status(StatusCodes.OK).json({ reportPdf });

  }
}
