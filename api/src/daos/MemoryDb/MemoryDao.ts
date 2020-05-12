
export class MemoryDao {

    private readonly db = {
      imports: [],
      exports: [],
    };

    protected openDb(): any {
        return this.db;
    }

    protected saveDb(db: any): any {
        // return this.db = db;
    }
}
