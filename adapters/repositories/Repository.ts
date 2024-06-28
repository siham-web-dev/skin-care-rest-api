import { EntityManager } from "typeorm";

export class Repository {
    db: EntityManager

    constructor(db: EntityManager) {
        this.db = db;
    }
}