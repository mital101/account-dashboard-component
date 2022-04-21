import * as Yup from 'yup';

export class ShareInformationData {
  constructor(readonly email: string, readonly message: string) {}

  static empty(): ShareInformationData {
    return new ShareInformationData('', '');
  }
}

export const ShareInformationSchema = (requiredEmail: string, invalidEmail: string) =>
  Yup.object().shape({
    email: Yup.string().trim().required(requiredEmail).email(invalidEmail),
  });
