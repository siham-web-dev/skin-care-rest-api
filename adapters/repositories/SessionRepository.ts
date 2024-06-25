import { EntityManager } from 'typeorm';
import SessionEntity from '../../entities/session';
import AppError from '../../frameworks/ServerConfig/utils/appError';
import { Repository } from './Repository';
import User from '../../entities/User';

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

    // is auth middleware
    async findSessionBySessionIdAndUserName(session_id: number, username: string): Promise<boolean> {
        const user = await this.db.findOne(User, {
            where: [
                { username },
            ]
        })
        if (!user) {
            throw new AppError('User not found with this username', 401);
        }
        const session = await this.db.findOne(SessionEntity, {
            where: [
                { id:session_id,  user_id: user?.id },
            ],
        });

        if (!session) {
            throw new AppError('Session not found', 401);
        }

        return session?.is_active ?? false;
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
