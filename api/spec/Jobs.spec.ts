import supertest from 'supertest';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';

import app from '@server';
import ExportJobDao from '@daos/Job/ExportJobDao';
import ImportJobDao from '@daos/Job/ImportJobDao';
import ImportJob, { IImportJob } from '@entities/ImportJob';
import ExportJob, { IExportJob } from '@entities/ExportJob';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';


describe('Jobs Routes', () => {

    const jobsPath = '/api/jobs';
    const exportsPath = `${jobsPath}/exports`;
    const importsPath = `${jobsPath}/imports`;

    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${exportsPath}"`, () => {

        it(`should return a JSON object with all the users and a status code of "${OK}" if the
            request was successful.`, (done) => {

            const jobs = [
                new ExportJob('A123', 'epub'),
                new ExportJob('A123', 'pdf'),
            ];

            spyOn(ExportJobDao.prototype, 'getAll').and.returnValue(Promise.resolve(jobs));

            agent.get(exportsPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    // Caste instance-objects to 'User' objects
                    const retJobs = res.body.pending.map((job: IExportJob, k: number) => {
                        job.createdAt = jobs[k].createdAt;
                        job.updatedAt = jobs[k].updatedAt;
                        return new ExportJob(job);
                    });
                    expect(retJobs).toEqual(jobs);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not fetch jobs.';
            spyOn(ExportJobDao.prototype, 'getAll').and.throwError(errMsg);

            agent.get(exportsPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"POST:${exportsPath}"`, () => {

        const callApi = (reqBody: object) => {
            return agent.post(exportsPath).type('form').send(reqBody);
        };

        const userData = {
            bookId: 'G11', 
            type: 'pdf',
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {

            spyOn(ExportJobDao.prototype, 'add').and.returnValue(Promise.resolve());

            agent.post(exportsPath).type('form').send(userData) // pick up here
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {

            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

    });

});
