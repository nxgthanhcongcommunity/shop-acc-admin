export default interface ISendMail {
  id: number;
  from: string;
  to: string;
  subject: string;
  text: string;
  attempTimes: number;
  succeed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
