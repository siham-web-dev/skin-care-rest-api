

class Session {
   id?: number;
   user_id: number;
   is_active?: boolean = true;

  constructor(user_id: number) {
    this.user_id = user_id;
  }
}

export default Session;
