export class User {
  constructor(
    public name: string,
    public email: string,
    public role: string,
    public id?: string,
    public isGoogle?: boolean,
    public avatar?: string,
    public premiumId?: string,
    public premiumEndDate?: Date
  ) {}
}
