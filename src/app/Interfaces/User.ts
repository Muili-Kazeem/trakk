export interface IUser {
  id: string,
  name: {
    firstName: string,
    lastName: string
  },
  mail: string,
  age: number,
  createdAt: Date,
}
