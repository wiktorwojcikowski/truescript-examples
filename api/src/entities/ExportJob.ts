import { getRandomInt } from '@shared/functions';
var moment = require('moment');

export interface IExportJob {
    id: number;
    bookId: string;
    type: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
}

class ExportJob implements IExportJob {

    public id: number;
    public bookId: string;
    public type: string;
    public state: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(bookIdOrJob: string | IExportJob, type?: string) {
        if (typeof bookIdOrJob === 'string') {
            this.id = getRandomInt();
            this.bookId = bookIdOrJob;
            this.type = type || '';
            this.state = 'pending';
            this.createdAt = moment();
            this.updatedAt = moment();
        } else {
            this.id = bookIdOrJob.id;
            this.bookId = bookIdOrJob.bookId;
            this.type = bookIdOrJob.type;
            this.state = bookIdOrJob.state;
            this.createdAt = moment(bookIdOrJob.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
            this.updatedAt = moment(bookIdOrJob.updatedAt, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
        }
    }
}

export default ExportJob;
