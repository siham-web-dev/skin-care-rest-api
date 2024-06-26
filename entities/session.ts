

class Session {
   id?: number;
   userId: number;
   is_active?: boolean = true;

  constructor(user_id: number) {
    this.userId = user_id;
  }
}

export default Session;
