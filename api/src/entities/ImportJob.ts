import { getRandomInt } from '@shared/functions';
var moment = require('moment');

export interface IImportJob {
    id: number;
    bookId: string;
    type: string;
    url: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
}

class ImportJob implements IImportJob {

    public id: number;
    public bookId: string;
    public type: string;
    public url: string;
    public state: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(bookIdOrJob: string | IImportJob, type?: string, url?: string) {
        if (typeof bookIdOrJob === 'string') {
            this.id = getRandomInt();
            this.bookId = bookIdOrJob;
            this.type = type || '';
            this.url = url || '';
            this.state = 'pending';
            this.createdAt = moment();
            this.updatedAt = moment();
        } else {
            this.id = bookIdOrJob.id;
            this.bookId = bookIdOrJob.bookId;
            this.type = bookIdOrJob.type;
            this.url = bookIdOrJob.url;
            this.state = bookIdOrJob.state;
            this.createdAt = moment(bookIdOrJob.createdAt);
            this.updatedAt = moment(bookIdOrJob.updatedAt);
        }
    }
}

export default ImportJob;
