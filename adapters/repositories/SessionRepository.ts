import { EntityManager } from 'typeorm';
import UserSession from '../../frameworks/DBConfig/models/SessionModel';
import SessionEntity from '../../entities/session';
import AppError from '../../frameworks/ServerConfig/utils/appError';
import { Repository } from './Repository';
import User from '../../frameworks/DBConfig/models/UserModel';

export class SessionRepository extends Repository {

    constructor(db: EntityManager) {
        super(db);
    }
     
    async createSession(session: SessionEntity): Promise<UserSession> {
        const createdSession = new UserSession();
        const user = await this.db.findOne(User, {
            where: [
                { id: session.userId },
            ]
        })
        createdSession.user = user as User;
        await this.db.save(createdSession);

        return createdSession;
    }

    // is auth middleware
    async findSessionBySessionIdAndUserName(session_id: number, username: string) {
        const user = await this.db.findOne(User, {
            where: [
                { username },
            ]
        })
        if (!user) {
            throw new AppError('User not found with this username', 401);
        }
        const session = await this.db.findOne(UserSession, {
            where: [
                { id:session_id },
            ],
            relations: ['user']
        });

        if (!session) {
            throw new AppError('Session not found', 401);
        }

        if (session.user.id !== user.id) {
            throw new AppError('this session does not belong to this user', 401);
        }

        const userInfo = {
            is_active:  session.is_active,
            userId: user.id,
            role: user.role
        }

        return userInfo;
    }

    async findSessionById(id: number): Promise<SessionEntity | null> {
        const session = await this.db.findOne(UserSession, {
            where: [
                { id },
            ],
            relations: ['user']
        });

        return { ...session, userId: session?.user.id as number };
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
           await this.db.update(UserSession, { id: session.id }, { is_active: false });
        } catch (error: any) {
            throw new Error(error);
        }
    }

}

export default SessionRepository
