import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

import ImportJobDao from '@daos/Job/ImportJobDao';
import ImportJob from '@entities/ImportJob';
import ExportJobDao from '@daos/Job/ExportJobDao';
import ExportJob from '@entities/ExportJob';
import { paramMissingError } from '@shared/constants';
import { sleep, mapToObject } from '@shared/functions';

// Init shared
const router = Router();
const importJobDao = new ImportJobDao();
const exportJobDao = new ExportJobDao();


router.get('/', async (req: Request, res: Response) => {
    return res.status(OK);
});


router.get('/exports', async (req: Request, res: Response) => {
    const jobs = await exportJobDao.getAll();
    const groupped = jobs.reduce<Map<string, any>>(
        (entryMap, e) => entryMap.set(e.state, [...entryMap.get(e.state)||[], e]),
        new Map()
    );
    return res.status(OK).json(mapToObject(groupped));
    return res.status(OK);
});

router.post('/exports', async (req: Request, res: Response) => {
    const job = req.body;
    if (!job || !job.bookId || !['epub', 'pdf'].includes(job.type) ) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const exportJob = new ExportJob(job.bookId, job.type);
    await exportJobDao.add(exportJob);
    res.status(CREATED).json(exportJob).end();

    if (exportJob.type == 'epub') {
        await sleep(10000);
    }
    else {
        await sleep(25000);
    }
    exportJob.state = 'finished';
    exportJob.updatedAt = new Date();
    await exportJobDao.update(exportJob);

    return;
});


router.get('/imports', async (req: Request, res: Response) => {
    const jobs = await importJobDao.getAll();
    const groupped = jobs.reduce<Map<string, any>>(
        (entryMap, e) => entryMap.set(e.state, [...entryMap.get(e.state)||[], e]),
        new Map()
    );
    return res.status(OK).json(mapToObject(groupped));
});

router.post('/imports', async (req: Request, res: Response) => {
    const job = req.body;
    if (!job || !job.bookId || !['word', 'pdf', 'wattpad', 'evernote'].includes(job.type) || !job.url) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const importJob = new ImportJob(job.bookId, job.type, job.url);
    await importJobDao.add(importJob);
    res.status(CREATED).json(importJob).end();

    await sleep(60000);
    importJob.state = 'finished';
    importJob.updatedAt = new Date();
    await importJobDao.update(importJob);

    return;
});


export default router;
