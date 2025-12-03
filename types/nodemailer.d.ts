declare module 'nodemailer' {
  interface SendMailOptions {
    from?: string;
    to?: string;
    subject?: string;
    text?: string;
  }

  interface TransportOptions {
    host: string;
    port: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
  }

  interface Transporter {
    sendMail(mailOptions: SendMailOptions): Promise<unknown>;
  }

  function createTransport(options: TransportOptions): Transporter;

  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export { createTransport, Transporter, SendMailOptions, TransportOptions };
  export default nodemailer;
}
