export interface TPaymentDetails {
    userId: string;
    email: string;
    payment_processor: string;
    bank_trxid: string;
    amount: number;
    pg_txnid: string;
    mer_txnid: string;
    payment_type: string;
  }