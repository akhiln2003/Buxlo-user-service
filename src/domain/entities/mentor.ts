export class Mentor {
  constructor(
    public name: string,
    public email: string,
    public role: string,
    public isGoogle: boolean,
    public id?: string,
    public avatar?: string,
    public bio?: string,
    public expertise?: string[],
    public yearsOfExperience?: number,
    public aadhaarFrontImage?:string,
    public aadhaarBackImage?:string,
    public aadhaarName?:string,
    public aadhaarNumber?:string,
  ) {}
}
