

declare namespace models {
    export class SendMailModel {
        public FromAddress: string;
        public FromAdressTitle: string;
        public ToAddress: string[];
        public CCAddress: string[];
        public Subject: string;
        public Message: string;
    }
    export class SMTPMailModel {
        public SmtpServer: string;
        public SmtpPortNumber: number;
        public SmtpFromAddress: string;
    }
}

