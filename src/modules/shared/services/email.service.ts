import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { MailtrapTransport } from 'mailtrap';
import config from 'src/config/config';

export type EmailSender = {
  name: string;
  address: string;
};

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  sender: EmailSender = {
    address: 'not-replay@cuymanager.com',
    name: 'Cuy Manager',
  };
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    this.transporter = nodemailer.createTransport(
      MailtrapTransport({
        token: this.configService.mailtrap_token,
      }),
    );
  }

  async sendRecoveryPasswordEmail(
    code: string,
    recipient: string,
    enterprise: string,
  ) {
    try {
      const templatePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'assets',
        'templates',
        'forgot-password-es.hbs',
      );
      const logoPath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'assets',
        'img',
        'logo01.png',
      );
      const html = this.getHtmlTemplate(templatePath, { code, enterprise });
      return this.transporter.sendMail({
        from: this.sender,
        to: [recipient],
        subject: 'Recuperación de contraseña',
        html: html,
        attachments: [
          {
            filename: 'logo01.png',
            path: logoPath,
            cid: 'logo@cuyManager',
          },
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private getHtmlTemplate(templatePath: string, data: any): string {
    const source = fs.readFileSync(templatePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    return template(data);
  }
}
