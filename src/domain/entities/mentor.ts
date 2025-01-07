export class Mentor {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: string,
    public isGoogle: boolean,
    public avatar?: string,
    public bio?: string,
    public expertise?: string[],
    public yearsOfExperience?: number
  ) {}
}
