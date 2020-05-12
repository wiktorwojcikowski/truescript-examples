import { IImportJob } from '@entities/ImportJob';
import { MemoryDao } from '../MemoryDb/MemoryDao';

export interface IImportJobDao {
    getAll: () => Promise<IImportJob[]>;
    add: (user: IImportJob) => Promise<void>;
    update: (user: IImportJob) => Promise<void>;
}

class ImportJobDao extends MemoryDao implements IImportJobDao {


    public async getAll(): Promise<IImportJob[]> {
        try {
            const db = await super.openDb();
            return db.imports;
        } catch (err) {
            throw err;
        }
    }


    public async add(job: IImportJob): Promise<void> {
        try {
            const db = await super.openDb();
            db.imports.push(job);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }

    public async update(job: IImportJob): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.imports.length; i++) {
                if (db.imports[i].id === job.id) {
                    db.imports[i] = job;
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

export default ImportJobDao;
