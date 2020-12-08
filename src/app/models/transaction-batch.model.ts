import { TransactionBatchStatusEnum } from '../enums/transaction-batch-status.enum';

export class TransactionBatchModel {
  created_at: string;
  end_date_processing: string;
  id: number;
  id_requesting_user: number;
  requesting_credential: number;
  start_date_processing: string;
  status: TransactionBatchStatusEnum;
  updated_at: string;

  monitoring_transactions: any[]; // TODO
  origin: string;
}