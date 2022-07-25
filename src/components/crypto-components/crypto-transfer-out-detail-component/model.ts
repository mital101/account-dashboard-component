import * as Yup from "yup";

export class SendCryptoData {
  constructor(
    readonly recipientAddress?: string,
    readonly network?: string,
    readonly amountToSend?: string
  ) {}

  static init(
    recipientAddress?: string,
    network?: string,
    amountToSend?: string
  ): SendCryptoData {
    return new SendCryptoData(
      recipientAddress ?? "",
      network ?? "",
      amountToSend ?? ""
    );
  }
}

export const SendCryptoSchema = Yup.object().shape({
  recipientAddress: Yup.string().required(
    "Cannot detect QR code in image uploaded, please check the image and try again"
  ),
  network: Yup.string().required("required"),
  amountToSend: Yup.number().required(
    "The amount you entered will exceed your daily limit of 0.3 BTC"
  )
});

export class RecipientData {
  constructor(
    readonly firstName?: string,
    readonly lastName?: string,
    readonly receivingName?: string
  ) {}

  static init(
    firstName?: string,
    lastName?: string,
    receivingName?: string
  ): RecipientData {
    return new RecipientData(
      firstName ?? "",
      lastName ?? "",
      receivingName ?? ""
    );
  }
}

export const RecipientSchema = Yup.object().shape({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  receivingName: Yup.number().required("required")
});
