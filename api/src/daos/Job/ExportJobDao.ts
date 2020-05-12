import { IExportJob } from '@entities/ExportJob';
import { MemoryDao } from '../MemoryDb/MemoryDao';

export interface IExportJobDao {
    getAll: () => Promise<IExportJob[]>;
    add: (user: IExportJob) => Promise<void>;
    update: (user: IExportJob) => Promise<void>;
}

class ExportJobDao extends MemoryDao implements IExportJobDao {


    public async getAll(): Promise<IExportJob[]> {
        try {
            const db = await super.openDb();
            return db.exports;
        } catch (err) {
            throw err;
        }
    }


    public async add(job: IExportJob): Promise<void> {
        try {
            const db = await super.openDb();
            db.exports.push(job);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }

    public async update(job: IExportJob): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.exports.length; i++) {
                if (db.exports[i].id === job.id) {
                    db.exports[i] = job;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Job not found');
        } catch (err) {
            throw err;
        }
    }


}

export default ExportJobDao;
