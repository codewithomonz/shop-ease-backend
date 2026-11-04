import pg from "pg";
export declare const pool: import("pg").Pool;
/** Run `fn` inside a transaction, committing on success and rolling back on error. */
export declare function withTransaction<T>(fn: (client: pg.PoolClient) => Promise<T>): Promise<T>;
//# sourceMappingURL=db.d.ts.map