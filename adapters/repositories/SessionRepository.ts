import { EntityManager } from 'typeorm';
import SessionEntity from '../../entities/session';
import AppError from '../../frameworks/ServerConfig/utils/appError';
import { Repository } from './Repository';

export class SessionRepository extends Repository {

    constructor(db: EntityManager) {
        super(db);
    }
     
    async createSession(session: SessionEntity): Promise<SessionEntity> {
        const { user_id } = session;
        const sessionEntity = new SessionEntity(user_id);

        await this.db.save(sessionEntity);
        return sessionEntity;
    }
    
    // is not auth middleware
    async findSessionByUserId(user_id: number): Promise<SessionEntity | null> {
        const session = await this.db.findOne(SessionEntity, {
            where: [
                { user_id },
            ],
        });

        return session;
    }

    async findSessionById(id: number): Promise<SessionEntity | null> {
        const session = await this.db.findOne(SessionEntity, {
            where: [
                { id },
            ],
        });

        return session;
    }
    
    // sign out 
    async desactivateSession(id: number): Promise<void> {
        const session = await this.findSessionById(id);
        if(!session) {
            throw new AppError('Session not found',404);
        }

        if(!session.is_active) {
            throw new AppError('Session already desactivated', 400);
        }

        try {
            session.is_active = false;
            await this.db.save(session);
        } catch (error: any) {
            throw new Error(error);
        }

    }


 


}

export default SessionRepository
