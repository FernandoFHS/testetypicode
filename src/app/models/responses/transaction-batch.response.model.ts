import { TransactionBatchModel } from '../transaction-batch.model';
import { BaseResponseModel } from './base/base.response.model';

export class TransactionBatchResponseModel extends BaseResponseModel {
  content: TransactionBatchModel[];

  // static mock(): MonitoringRuleResponseModel {
  //   return MonitoringRuleResponseMock;
  // }
}